"use server";

import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import {
  articleExists,
  deleteArticle,
  findSlugConflicts,
  setArticleStatus,
  upsertArticle,
} from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import { cleanArticleJson } from "@/lib/cms/article-json";
import {
  articleInputSchema,
  articleStatusSchema,
  formatIssues,
  type ArticleInput,
} from "@/lib/cms/schemas";
import { faqs } from "@/content/faqs";

const knownFaqIds = new Set(faqs.map((faq) => faq.id));

/** Schema validation plus the checks zod can't do: unknown FAQ ids and slug clashes. */
async function validate(
  raw: unknown,
  prefix = "",
): Promise<{ article?: ArticleInput; errors: string[] }> {
  const parsed = articleInputSchema.safeParse(cleanArticleJson(raw));
  if (!parsed.success) {
    return {
      errors: formatIssues(parsed.error).map((issue) => prefix + issue),
    };
  }
  const article = parsed.data;
  const errors = [
    ...article.faqIds
      .filter((id) => !knownFaqIds.has(id))
      .map((id) => `faqIds: unknown FAQ "${id}"`),
    ...(await findSlugConflicts(article)),
  ].map((issue) => prefix + issue);
  return { article, errors };
}

export async function saveArticleAction(
  raw: unknown,
  mode: "create" | "update",
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();
  const { article, errors } = await validate(raw);
  if (!article || errors.length) return { ok: false, errors };

  const exists = await articleExists(article.id);
  if (mode === "create" && exists) {
    return {
      ok: false,
      errors: [`id: an article with id "${article.id}" already exists`],
    };
  }
  if (mode === "update" && !exists) {
    return { ok: false, errors: [`Article "${article.id}" no longer exists`] };
  }

  await upsertArticle(article);
  updateTag(CMS_TAGS.articles);
  return { ok: true, data: { id: article.id } };
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

  const items = Array.isArray(raw) ? raw : [raw];
  if (items.length === 0) return { ok: false, errors: ["No articles found"] };

  const articles: ArticleInput[] = [];
  const errors: string[] = [];
  for (const [index, item] of items.entries()) {
    const prefix = items.length > 1 ? `[${index}] ` : "";
    const result = await validate(item, prefix);
    errors.push(...result.errors);
    if (!result.article) continue;

    const article =
      options.status === "keep"
        ? result.article
        : { ...result.article, status: options.status };
    if (!options.overwrite && (await articleExists(article.id))) {
      errors.push(
        `${prefix}id: "${article.id}" already exists (tick "overwrite" to replace it)`,
      );
    }
    for (const other of articles) {
      if (other.id === article.id) {
        errors.push(`${prefix}id: "${article.id}" appears twice in this file`);
      }
      for (const locale of ["sv", "en", "ar"] as const) {
        const slug = article.slug[locale] ?? article.slug.sv;
        if ((other.slug[locale] ?? other.slug.sv) === slug) {
          errors.push(
            `${prefix}slug.${locale}: "${slug}" is also used by "${other.id}" in this file`,
          );
        }
      }
    }
    articles.push(article);
  }
  if (errors.length) return { ok: false, errors };

  for (const article of articles) await upsertArticle(article);
  updateTag(CMS_TAGS.articles);
  return { ok: true, data: { ids: articles.map((article) => article.id) } };
}

export async function deleteArticleAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  await deleteArticle(id);
  updateTag(CMS_TAGS.articles);
  return { ok: true };
}

export async function setArticleStatusAction(
  id: string,
  status: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = articleStatusSchema.safeParse(status);
  if (!parsed.success) return { ok: false, errors: ["Invalid status"] };
  await setArticleStatus(id, parsed.data);
  updateTag(CMS_TAGS.articles);
  return { ok: true };
}
