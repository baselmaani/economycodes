import "server-only";

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { getArticle, listArticles } from "@/lib/cms/admin";
import { ARTICLE_TEMPLATE, toArticleInput } from "@/lib/cms/article-json";
import {
  deleteArticle,
  importArticles,
  patchArticle,
  saveArticle,
  setArticleStatus,
} from "@/lib/cms/service/articles";
import { getArticleAlternateLinks } from "@/lib/routes";
import {
  fail,
  fromResult,
  invalidate,
  localeSchema,
  ok,
  pickLocale,
  safe,
} from "./util";

const ARTICLE_FORMAT = `Article JSON:
{
  "id": "vat-registration-guide",          // lowercase a-z, 0-9, hyphens; permanent
  "status": "draft" | "published",          // default draft
  "slug":    { "sv": "momsregistrering-guide", "en": "...", "ar": "..." },   // URL part per language, unique
  "title":   { "sv": "...", "en": "...", "ar": "..." },
  "excerpt": { "sv": "...", ... },          // 1–2 sentence summary
  "body":    { "sv": [ContentBlock, ...], "en": [...], "ar": [...] },
  "coverImage": MediaRef,                   // optional, from list_media/upload tools ("mediaRef")
  "faqIds": ["faq-id", ...],                // optional, ids from list_faqs
  "publishedAt": "YYYY-MM-DD",
  "updatedAt": "YYYY-MM-DD",                // optional
  "seo": { "title": {sv,en,ar}, "description": {sv,en,ar}, "ogImage": MediaRef, "noindex": boolean }   // optional
}
ContentBlock = {"type":"heading","level":2|3,"text":"..."} | {"type":"paragraph","text":"..."} | {"type":"list","items":["..."]} | {"type":"disclaimer","text":"..."}
Swedish (sv) is required everywhere; en/ar fall back to Swedish when left out.`;

const articleObject = z
  .record(z.string(), z.unknown())
  .describe("Article JSON (see the description)");

export function registerArticleTools(server: McpServer) {
  server.registerTool(
    "list_articles",
    {
      title: "List articles",
      description:
        "All articles (drafts and published), newest first, with their public URLs.",
      inputSchema: {
        status: z.enum(["draft", "published"]).optional(),
      },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ status }) => {
      const articles = await listArticles();
      return ok(
        articles
          .filter((article) => !status || article.status === status)
          .map((article) => ({
            id: article.id,
            status: article.status,
            title: article.title.sv,
            languages: (["sv", "en", "ar"] as const).filter(
              (locale) => article.title[locale],
            ),
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt ?? null,
            noindex: Boolean(article.seo.noindex),
            url: getArticleAlternateLinks(article).sv,
          })),
      );
    }),
  );

  server.registerTool(
    "get_article",
    {
      title: "Get an article",
      description:
        "One article in the editable JSON format (the same shape create_article and update_article take), plus its public URLs.",
      inputSchema: { id: z.string(), locale: localeSchema.optional() },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ id, locale }) => {
      const article = await getArticle(id);
      if (!article) return fail(`Article "${id}" not found`);
      const body = {
        article: toArticleInput(article),
        urls: getArticleAlternateLinks(article),
      };
      return ok(locale ? pickLocale(body, locale) : body);
    }),
  );

  server.registerTool(
    "get_article_template",
    {
      title: "Get the article template",
      description: "A complete example article and the format rules.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    safe(async () => ok({ format: ARTICLE_FORMAT, example: ARTICLE_TEMPLATE })),
  );

  server.registerTool(
    "create_article",
    {
      title: "Create an article",
      description: `Creates a new article. It stays a draft (not on the site) unless status is "published".
${ARTICLE_FORMAT}`,
      inputSchema: { article: articleObject },
    },
    safe(async ({ article }) =>
      fromResult(await saveArticle(article, "create", invalidate), (data) => ({
        ok: true,
        id: data.id,
      })),
    ),
  );

  server.registerTool(
    "update_article",
    {
      title: "Edit an article",
      description: `Partial update of an existing article; only the fields you pass change. slug/title/excerpt/body and seo.title/description merge per language (a language set to null or "" falls back to Swedish). Other fields replace; coverImage/updatedAt set to null are removed. The id can't be changed.
${ARTICLE_FORMAT}`,
      inputSchema: {
        id: z.string(),
        patch: z
          .record(z.string(), z.unknown())
          .describe('Fields to change, e.g. {"title":{"en":"..."}}'),
      },
      annotations: { idempotentHint: true },
    },
    safe(async ({ id, patch }) =>
      fromResult(await patchArticle(id, patch, invalidate), (data) => ({
        ok: true,
        id: data.id,
      })),
    ),
  );

  server.registerTool(
    "set_article_status",
    {
      title: "Publish or unpublish an article",
      description:
        "published = live on /artiklar, in the sitemap and every language; draft = hidden from the site.",
      inputSchema: { id: z.string(), status: z.enum(["draft", "published"]) },
      annotations: { idempotentHint: true },
    },
    safe(async ({ id, status }) => {
      if (!(await getArticle(id))) return fail(`Article "${id}" not found`);
      return fromResult(await setArticleStatus(id, status, invalidate), () => ({
        ok: true,
        id,
        status,
      }));
    }),
  );

  server.registerTool(
    "delete_article",
    {
      title: "Delete an article",
      description:
        "Permanently deletes an article. Consider set_article_status draft instead, or get_article first to keep a copy.",
      inputSchema: { id: z.string() },
      annotations: { destructiveHint: true },
    },
    safe(async ({ id }) => {
      if (!(await getArticle(id))) return fail(`Article "${id}" not found`);
      return fromResult(await deleteArticle(id, invalidate), () => ({
        ok: true,
        message: `Deleted "${id}".`,
      }));
    }),
  );

  server.registerTool(
    "import_articles",
    {
      title: "Import several articles",
      description: `Creates or replaces several articles at once. All-or-nothing: nothing is saved unless every article is valid.
${ARTICLE_FORMAT}`,
      inputSchema: {
        articles: z.array(articleObject).min(1),
        overwrite: z
          .boolean()
          .default(false)
          .describe("Replace articles whose id already exists"),
        status: z
          .enum(["keep", "draft", "published"])
          .default("keep")
          .describe("Force every article to this status"),
      },
      annotations: { destructiveHint: true },
    },
    safe(async ({ articles, overwrite, status }) =>
      fromResult(
        await importArticles(articles, { overwrite, status }, invalidate),
      ),
    ),
  );
}
