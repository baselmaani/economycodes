"use server";

import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import { deletePageOverride, savePageOverride } from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import { getPageDef } from "@/lib/cms/pages";
import { compactOverride, validateOverride } from "@/lib/cms/override";
import { formatIssues, pageOverrideSchema } from "@/lib/cms/schemas";

export async function savePageAction(
  key: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const def = getPageDef(key);
  if (!def) return { ok: false, errors: [`Unknown page "${key}"`] };

  const parsed = pageOverrideSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };

  const data = compactOverride(parsed.data, def);
  const errors = validateOverride(data, def);
  if (errors.length > 0) return { ok: false, errors };
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
