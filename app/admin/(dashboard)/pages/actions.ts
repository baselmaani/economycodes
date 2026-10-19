"use server";

import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import { deletePageOverride, savePageOverride } from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import { getPageDef } from "@/lib/cms/pages";
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

/** Drops empty values and keys the page doesn't define, so stored overrides stay minimal. */
function compact(
  data: PageOverrideData,
  textKeys: string[],
  imageKeys: string[],
): PageOverrideData {
  const text = Object.fromEntries(
    Object.entries(data.text ?? {}).filter(
      ([key, value]) => textKeys.includes(key) && hasText(value),
    ),
  );
  const images = Object.fromEntries(
    Object.entries(data.images ?? {}).filter(([key]) =>
      imageKeys.includes(key),
    ),
  );
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

  const data = compact(
    parsed.data,
    def.text.map((field) => field.key),
    def.images.map((field) => field.key),
  );
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
