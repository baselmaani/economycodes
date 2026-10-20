"use server";

import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import { deletePageOverride, savePageOverride } from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import { getPageDef, type PageDef } from "@/lib/cms/pages";
import {
  formatIssues,
  pageOverrideSchema,
  type PageOverrideData,
  type PartialLocalized,
} from "@/lib/cms/schemas";

function hasText(
  value: PartialLocalized | undefined,
): value is PartialLocalized {
  return Boolean(value && (value.sv || value.en || value.ar));
}

/** True when at least one locale is set (lists/blocks arrive with empty locales already dropped). */
function hasAnyLocale(value: object | undefined): boolean {
  return Boolean(value && Object.values(value).some(Boolean));
}

/** Keeps only the entries whose key the page defines and that pass `keep`. */
function pick<T>(
  record: Record<string, T> | undefined,
  fields: { key: string }[],
  keep: (value: T) => boolean = () => true,
): Record<string, T> {
  const keys = fields.map((field) => field.key);
  return Object.fromEntries(
    Object.entries(record ?? {}).filter(
      ([key, value]) => keys.includes(key) && keep(value),
    ),
  );
}

/** Drops empty values and keys the page doesn't define, so stored overrides stay minimal. */
function compact(data: PageOverrideData, def: PageDef): PageOverrideData {
  const text = pick(data.text, def.text, hasText);
  const lists = pick(data.lists, def.lists, hasAnyLocale);
  const blocks = pick(data.blocks, def.blocks, hasAnyLocale);
  const images = pick(data.images, def.images);
  const seo = {
    ...(hasText(data.seo?.title) && { title: data.seo.title }),
    ...(hasText(data.seo?.description) && {
      description: data.seo.description,
    }),
    ...(data.seo?.ogImage && { ogImage: data.seo.ogImage }),
    ...(data.seo?.noindex && { noindex: true }),
  };
  return {
    ...(Object.keys(seo).length > 0 && { seo }),
    ...(Object.keys(text).length > 0 && { text }),
    ...(Object.keys(lists).length > 0 && { lists }),
    ...(Object.keys(blocks).length > 0 && { blocks }),
    ...(Object.keys(images).length > 0 && { images }),
  };
}

export async function savePageAction(
  key: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const def = getPageDef(key);
  if (!def) return { ok: false, errors: [`Unknown page "${key}"`] };

  const parsed = pageOverrideSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };

  const data = compact(parsed.data, def);
  if (Object.keys(data).length === 0) {
    await deletePageOverride(key);
  } else {
    await savePageOverride(key, data);
  }
  updateTag(CMS_TAGS.page(key));
  return { ok: true };
}

export async function resetPageAction(key: string): Promise<ActionResult> {
  await requireAdmin();
  if (!getPageDef(key)) return { ok: false, errors: [`Unknown page "${key}"`] };
  await deletePageOverride(key);
  updateTag(CMS_TAGS.page(key));
  return { ok: true };
}
