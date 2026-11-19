"use server";

import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import { resetPage, savePage } from "@/lib/cms/service/pages";

const invalidate = (tags: string[]) => tags.forEach((tag) => updateTag(tag));

export async function savePageAction(
  key: string,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const result = await savePage(key, input, invalidate);
  return result.ok ? { ok: true } : result;
}

export async function resetPageAction(key: string): Promise<ActionResult> {
  await requireAdmin();
  return resetPage(key, invalidate);
}
