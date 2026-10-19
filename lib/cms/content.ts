import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { desc, eq } from "drizzle-orm";

import type { AppLocale } from "@/i18n/routing";
import type { ArticleMeta } from "@/content/articles/types";
import type { ContentBlock, Localized } from "@/content/types";
import { articles as staticArticles } from "@/content/articles/meta";
import { articleBodies } from "@/content/articles/body";
import {
  articlesTable,
  getDb,
  hasDatabase,
  pageOverridesTable,
  type ArticleRow,
} from "@/lib/db";
import { getPageDef } from "@/lib/cms/pages";
import { resolvePage, type ResolvedPage } from "@/lib/cms/resolve";
import type {
  ArticleStatus,
  PageOverrideData,
  SeoFields,
} from "@/lib/cms/schemas";

/** Cache tags invalidated by the admin server actions (see app/admin). */
export const CMS_TAGS = {
  articles: "cms:articles",
  page: (key: string) => `cms:page:${key}`,
  media: "cms:media",
} as const;

export interface CmsArticle extends ArticleMeta {
  status: ArticleStatus;
  body: Localized<ContentBlock[]>;
  seo: SeoFields;
}

export function rowToArticle(row: ArticleRow): CmsArticle {
  return {
    id: row.id,
    status: row.status,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    coverImage: row.coverImage,
    faqIds: row.faqIds,
    seo: row.seo ?? {},
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt ?? undefined,
    authorId: "hadi-almaani",
  };
}

/** The content/articles/* files, used as-is when no database is configured. */
export function getStaticArticles(): CmsArticle[] {
  return staticArticles.map((meta) => ({
    ...meta,
    status: "published",
    body: articleBodies[meta.id] ?? { sv: [] },
    seo: {},
  }));
}

const loadPublishedArticles = unstable_cache(
  async (): Promise<CmsArticle[]> => {
    const rows = await getDb()
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.status, "published"))
      .orderBy(desc(articlesTable.publishedAt), desc(articlesTable.createdAt));
    return rows.map(rowToArticle);
  },
  ["cms-published-articles"],
  { tags: [CMS_TAGS.articles] },
);

/** Published articles, newest first. */
export const getPublishedArticles = cache(async (): Promise<CmsArticle[]> =>
  hasDatabase ? loadPublishedArticles() : getStaticArticles(),
);

/** Same defensive decoding as lib/service-lookup.ts (Arabic slugs can arrive percent-encoded). */
function decodeSlug(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function getArticleBySlug(
  locale: AppLocale,
  slugParam: string,
): Promise<CmsArticle | undefined> {
  const decoded = decodeSlug(slugParam);
  const published = await getPublishedArticles();
  return published.find(
    (article) => (article.slug[locale] ?? article.slug.sv) === decoded,
  );
}

/**
 * A page's editable content: registry defaults (content/*) merged with the
 * dashboard override. Each key is cached under its own tag so saving one
 * page doesn't invalidate the others.
 */
export const getPageContent = cache(
  async (key: string): Promise<ResolvedPage> => {
    const def = getPageDef(key);
    if (!def) throw new Error(`Unknown CMS page key: ${key}`);
    if (!hasDatabase) return resolvePage(def, null);

    const override = await unstable_cache(
      async (): Promise<PageOverrideData | null> => {
        const [row] = await getDb()
          .select({ data: pageOverridesTable.data })
          .from(pageOverridesTable)
          .where(eq(pageOverridesTable.key, key));
        return row?.data ?? null;
      },
      ["cms-page", key],
      { tags: [CMS_TAGS.page(key)] },
    )();
    return resolvePage(def, override);
  },
);
