import "server-only";

import type { ActionResult } from "@/lib/admin/action-result";
import {
  articleExists,
  deleteArticle as deleteArticleRow,
  findSlugConflicts,
  getArticle,
  setArticleStatus as setArticleStatusRow,
  upsertArticle,
} from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import { cleanArticleJson, toArticleInput } from "@/lib/cms/article-json";
import {
  articleInputSchema,
  articleStatusSchema,
  formatIssues,
  type ArticleInput,
} from "@/lib/cms/schemas";
import { listFaqs } from "./faqs";
import type { Invalidate } from "./types";

/**
 * Article writes shared by the dashboard (Server Actions) and the MCP
 * endpoint. Callers check auth; `invalidate` marks the article tag stale.
 */

const LOCALES = ["sv", "en", "ar"] as const;

async function knownFaqIds(): Promise<Set<string>> {
  return new Set((await listFaqs()).map((faq) => faq.id));
}

/** Schema validation plus the checks zod can't do: unknown FAQ ids and slug clashes. */
async function validate(
  raw: unknown,
  faqIds: Set<string>,
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
      .filter((id) => !faqIds.has(id))
      .map((id) => `faqIds: unknown FAQ "${id}"`),
    ...(await findSlugConflicts(article)),
  ].map((issue) => prefix + issue);
  return { article, errors };
}

export async function saveArticle(
  raw: unknown,
  mode: "create" | "update",
  invalidate: Invalidate,
): Promise<ActionResult<{ id: string }>> {
  const { article, errors } = await validate(raw, await knownFaqIds());
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
  invalidate([CMS_TAGS.articles]);
  return { ok: true, data: { id: article.id } };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Partial update: top-level fields replace, except the localized ones
 * (slug, title, excerpt, body) and seo.title/description, which merge per
 * locale. A locale set to null or "" is removed (falls back to Swedish);
 * coverImage/updatedAt set to null are cleared. The id can't be changed.
 */
export async function patchArticle(
  id: string,
  patch: unknown,
  invalidate: Invalidate,
): Promise<ActionResult<{ id: string }>> {
  const existing = await getArticle(id);
  if (!existing) return { ok: false, errors: [`Article "${id}" not found`] };
  if (!isRecord(patch))
    return { ok: false, errors: ["patch must be an object"] };

  const next: Record<string, unknown> = { ...toArticleInput(existing) };
  const mergeLocales = (base: unknown, value: unknown) => {
    if (!isRecord(value)) return value;
    const out: Record<string, unknown> = isRecord(base) ? { ...base } : {};
    for (const locale of LOCALES) {
      if (!(locale in value)) continue;
      const v = value[locale];
      if (v === null || v === "") delete out[locale];
      else out[locale] = v;
    }
    return out;
  };

  for (const [key, value] of Object.entries(patch)) {
    if (key === "id") continue;
    if (["slug", "title", "excerpt", "body"].includes(key)) {
      next[key] = mergeLocales(next[key], value);
    } else if (key === "seo" && isRecord(value)) {
      const seo: Record<string, unknown> = isRecord(next.seo)
        ? { ...next.seo }
        : {};
      for (const [seoKey, seoValue] of Object.entries(value)) {
        if (seoValue === null) delete seo[seoKey];
        else if (seoKey === "title" || seoKey === "description") {
          seo[seoKey] = mergeLocales(seo[seoKey], seoValue);
        } else seo[seoKey] = seoValue;
      }
      next.seo = seo;
    } else if (value === null) {
      delete next[key];
    } else {
      next[key] = value;
    }
  }
  return saveArticle(next, "update", invalidate);
}

/**
 * Imports one article or an array. All-or-nothing: nothing is saved unless
 * every article validates.
 */
export async function importArticles(
  raw: unknown,
  options: { overwrite: boolean; status: "keep" | ArticleInput["status"] },
  invalidate: Invalidate,
): Promise<ActionResult<{ ids: string[] }>> {
  const items = Array.isArray(raw) ? raw : [raw];
  if (items.length === 0) return { ok: false, errors: ["No articles found"] };

  const faqIds = await knownFaqIds();
  const articles: ArticleInput[] = [];
  const errors: string[] = [];
  for (const [index, item] of items.entries()) {
    const prefix = items.length > 1 ? `[${index}] ` : "";
    const result = await validate(item, faqIds, prefix);
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
      for (const locale of LOCALES) {
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
  invalidate([CMS_TAGS.articles]);
  return { ok: true, data: { ids: articles.map((article) => article.id) } };
}

export async function deleteArticle(
  id: string,
  invalidate: Invalidate,
): Promise<ActionResult> {
  await deleteArticleRow(id);
  invalidate([CMS_TAGS.articles]);
  return { ok: true };
}

export async function setArticleStatus(
  id: string,
  status: unknown,
  invalidate: Invalidate,
): Promise<ActionResult> {
  const parsed = articleStatusSchema.safeParse(status);
  if (!parsed.success) return { ok: false, errors: ["Invalid status"] };
  await setArticleStatusRow(id, parsed.data);
  invalidate([CMS_TAGS.articles]);
  return { ok: true };
}
