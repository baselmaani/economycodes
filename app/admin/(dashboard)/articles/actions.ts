"use server";

import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import {
  deleteArticle,
  importArticles,
  saveArticle,
  setArticleStatus,
} from "@/lib/cms/service/articles";
import type { ArticleInput } from "@/lib/cms/schemas";

const invalidate = (tags: string[]) => tags.forEach((tag) => updateTag(tag));

export async function saveArticleAction(
  raw: unknown,
  mode: "create" | "update",
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();
  return saveArticle(raw, mode, invalidate);
}

/**
 * Imports one article or an array from pasted/uploaded JSON. All-or-nothing:
 * nothing is saved unless every article validates.
 */
export async function importArticlesAction(
  json: string,
  options: { overwrite: boolean; status: "keep" | ArticleInput["status"] },
): Promise<ActionResult<{ ids: string[] }>> {
  await requireAdmin();

  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch (error) {
    return {
      ok: false,
      errors: [
        `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
      ],
    };
  }
  return importArticles(raw, options, invalidate);
}

export async function deleteArticleAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  return deleteArticle(id, invalidate);
}

export async function setArticleStatusAction(
  id: string,
  status: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  return setArticleStatus(id, status, invalidate);
}
