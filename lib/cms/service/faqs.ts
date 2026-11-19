import "server-only";

import { z } from "zod";

import type { ActionResult } from "@/lib/admin/action-result";
import { getPageOverride } from "@/lib/cms/admin";
import { FAQS_KEY, getPageDef, type CollectionItem } from "@/lib/cms/pages";
import { resolvePage } from "@/lib/cms/resolve";
import {
  formatIssues,
  localizedString,
  partialLocalizedString,
} from "@/lib/cms/schemas";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import type { Localized } from "@/content/types";
import { patchPage } from "./pages";
import type { Invalidate } from "./types";

/**
 * The site-wide FAQ list (the "settings:faqs" registry entry) as individual
 * records. Every write stores the whole list, like the dashboard editor.
 */

export interface FaqRecord {
  id: string;
  /** "global", "digital", "service:<serviceKey>" or "location:<locationId>". */
  scope: string;
  question: Localized<string>;
  answer: Localized<string>;
}

const faqIdSchema = z
  .string()
  .trim()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase a-z, 0-9 and hyphens (e.g. faq-vat-deadline)",
  );

export function isValidFaqScope(scope: string): boolean {
  if (scope === "global" || scope === "digital") return true;
  if (scope.startsWith("service:")) return scope.slice(8) in services;
  if (scope.startsWith("location:")) {
    return locations.some((location) => location.id === scope.slice(9));
  }
  return false;
}

export function faqScopeOptions(): string[] {
  return [
    "global",
    "digital",
    ...Object.keys(services).map((key) => `service:${key}`),
    ...locations.map((location) => `location:${location.id}`),
  ];
}

const scopeSchema = z.string().trim().refine(isValidFaqScope, {
  message: `Unknown scope. Use "global", "digital", "service:<serviceKey>" or "location:<locationId>"`,
});

export const faqCreateSchema = z.object({
  id: faqIdSchema,
  scope: scopeSchema,
  question: localizedString,
  answer: localizedString,
});

export const faqUpdateSchema = z.object({
  scope: scopeSchema.optional(),
  question: partialLocalizedString.optional(),
  answer: partialLocalizedString.optional(),
});

function toRecord(item: CollectionItem): FaqRecord {
  return {
    id: item.id.sv,
    scope: item.scope.sv,
    question: item.question,
    answer: item.answer,
  };
}

function toItem(faq: FaqRecord): CollectionItem {
  return {
    id: { sv: faq.id },
    scope: { sv: faq.scope },
    question: faq.question,
    answer: faq.answer,
  };
}

/** Every FAQ in display order (uncached). */
export async function listFaqs(): Promise<FaqRecord[]> {
  const def = getPageDef(FAQS_KEY)!;
  const resolved = resolvePage(def, await getPageOverride(FAQS_KEY));
  return resolved.collections.items.map(toRecord);
}

async function saveAll(
  faqs: FaqRecord[],
  invalidate: Invalidate,
): Promise<ActionResult> {
  const result = await patchPage(
    FAQS_KEY,
    { collections: { items: faqs.map(toItem) } },
    invalidate,
  );
  return result.ok ? { ok: true } : result;
}

export async function createFaq(
  input: unknown,
  invalidate: Invalidate,
  position?: number,
): Promise<ActionResult<{ faq: FaqRecord }>> {
  const parsed = faqCreateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };
  const faqs = await listFaqs();
  if (faqs.some((faq) => faq.id === parsed.data.id)) {
    return {
      ok: false,
      errors: [`id: FAQ "${parsed.data.id}" already exists`],
    };
  }
  const index =
    position === undefined
      ? faqs.length
      : Math.max(0, Math.min(position, faqs.length));
  faqs.splice(index, 0, parsed.data);
  const result = await saveAll(faqs, invalidate);
  return result.ok ? { ok: true, data: { faq: parsed.data } } : result;
}

export async function updateFaq(
  id: string,
  input: unknown,
  invalidate: Invalidate,
): Promise<ActionResult<{ faq: FaqRecord }>> {
  const parsed = faqUpdateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };
  const faqs = await listFaqs();
  const index = faqs.findIndex((faq) => faq.id === id);
  if (index === -1) return { ok: false, errors: [`FAQ "${id}" not found`] };

  const current = faqs[index];
  const merge = (
    base: Localized<string>,
    patch: z.infer<typeof partialLocalizedString> | undefined,
  ): Localized<string> => ({
    sv: patch?.sv ?? base.sv,
    en: patch?.en ?? base.en,
    ar: patch?.ar ?? base.ar,
  });
  const next: FaqRecord = {
    id,
    scope: parsed.data.scope ?? current.scope,
    question: merge(current.question, parsed.data.question),
    answer: merge(current.answer, parsed.data.answer),
  };
  faqs[index] = next;
  const result = await saveAll(faqs, invalidate);
  return result.ok ? { ok: true, data: { faq: next } } : result;
}

export async function deleteFaq(
  id: string,
  invalidate: Invalidate,
): Promise<ActionResult> {
  const faqs = await listFaqs();
  const kept = faqs.filter((faq) => faq.id !== id);
  if (kept.length === faqs.length) {
    return { ok: false, errors: [`FAQ "${id}" not found`] };
  }
  return saveAll(kept, invalidate);
}
