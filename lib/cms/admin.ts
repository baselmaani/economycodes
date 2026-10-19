import "server-only";

import { desc, eq, ne, sql } from "drizzle-orm";

import { articlesTable, getDb, mediaTable, pageOverridesTable } from "@/lib/db";
import { rowToArticle, type CmsArticle } from "@/lib/cms/content";
import type { ArticleInput, PageOverrideData } from "@/lib/cms/schemas";
import type { Localized } from "@/content/types";

/**
 * Uncached reads and all writes for the admin dashboard. Callers (server
 * actions) are responsible for requireAdmin() and for invalidating the
 * public cache tags in lib/cms/content.ts.
 */

export async function listArticles(): Promise<CmsArticle[]> {
  const rows = await getDb()
    .select()
    .from(articlesTable)
    .orderBy(desc(articlesTable.publishedAt), desc(articlesTable.createdAt));
  return rows.map(rowToArticle);
}

export async function getArticle(id: string): Promise<CmsArticle | undefined> {
  const [row] = await getDb()
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, id));
  return row ? rowToArticle(row) : undefined;
}

/**
 * Per-locale slugs of `input` already used by a different article, as
 * human-readable messages. Slugs only need to be unique within a locale.
 */
export async function findSlugConflicts(
  input: Pick<ArticleInput, "id" | "slug">,
): Promise<string[]> {
  const others = await getDb()
    .select({ id: articlesTable.id, slug: articlesTable.slug })
    .from(articlesTable)
    .where(ne(articlesTable.id, input.id));

  const conflicts: string[] = [];
  for (const locale of ["sv", "en", "ar"] as const) {
    const slug = input.slug[locale] ?? input.slug.sv;
    const clash = others.find(
      (other) => (other.slug[locale] ?? other.slug.sv) === slug,
    );
    if (clash) {
      conflicts.push(
        `slug.${locale}: "${slug}" is already used by article "${clash.id}"`,
      );
    }
  }
  return conflicts;
}

export async function upsertArticle(input: ArticleInput): Promise<void> {
  const values = {
    id: input.id,
    status: input.status,
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    body: input.body,
    coverImage: input.coverImage,
    faqIds: input.faqIds,
    seo: input.seo,
    publishedAt: input.publishedAt,
    updatedAt: input.updatedAt ?? null,
  };
  await getDb()
    .insert(articlesTable)
    .values(values)
    .onConflictDoUpdate({
      target: articlesTable.id,
      set: { ...values, modifiedAt: new Date() },
    });
}

export async function articleExists(id: string): Promise<boolean> {
  const [row] = await getDb()
    .select({ id: articlesTable.id })
    .from(articlesTable)
    .where(eq(articlesTable.id, id));
  return Boolean(row);
}

export async function deleteArticle(id: string): Promise<void> {
  await getDb().delete(articlesTable).where(eq(articlesTable.id, id));
}

export async function setArticleStatus(
  id: string,
  status: ArticleInput["status"],
): Promise<void> {
  await getDb()
    .update(articlesTable)
    .set({ status, modifiedAt: new Date() })
    .where(eq(articlesTable.id, id));
}

export async function getPageOverride(
  key: string,
): Promise<PageOverrideData | null> {
  const [row] = await getDb()
    .select({ data: pageOverridesTable.data })
    .from(pageOverridesTable)
    .where(eq(pageOverridesTable.key, key));
  return row?.data ?? null;
}

export async function listPageOverrideTimes(): Promise<Map<string, Date>> {
  const rows = await getDb()
    .select({
      key: pageOverridesTable.key,
      modifiedAt: pageOverridesTable.modifiedAt,
    })
    .from(pageOverridesTable);
  return new Map(rows.map((row) => [row.key, row.modifiedAt]));
}

export async function savePageOverride(
  key: string,
  data: PageOverrideData,
): Promise<void> {
  await getDb()
    .insert(pageOverridesTable)
    .values({ key, data })
    .onConflictDoUpdate({
      target: pageOverridesTable.key,
      set: { data, modifiedAt: new Date() },
    });
}

export async function deletePageOverride(key: string): Promise<void> {
  await getDb()
    .delete(pageOverridesTable)
    .where(eq(pageOverridesTable.key, key));
}

export async function listMedia() {
  return getDb().select().from(mediaTable).orderBy(desc(mediaTable.createdAt));
}

export async function getMedia(id: string) {
  const [row] = await getDb()
    .select()
    .from(mediaTable)
    .where(eq(mediaTable.id, id));
  return row;
}

export async function createMedia(values: typeof mediaTable.$inferInsert) {
  const [row] = await getDb().insert(mediaTable).values(values).returning();
  return row;
}

export async function updateMediaAlt(id: string, alt: Localized<string>) {
  await getDb().update(mediaTable).set({ alt }).where(eq(mediaTable.id, id));
}

export async function deleteMediaRow(id: string) {
  await getDb().delete(mediaTable).where(eq(mediaTable.id, id));
}

/** Where an image URL is still referenced (article covers/OG images, page overrides). */
export async function findMediaUsage(url: string): Promise<string[]> {
  const pattern = `%${url}%`;
  const [articles, pages] = await Promise.all([
    getDb()
      .select({ id: articlesTable.id })
      .from(articlesTable)
      .where(
        sql`${articlesTable.coverImage}::text like ${pattern} or ${articlesTable.seo}::text like ${pattern}`,
      ),
    getDb()
      .select({ key: pageOverridesTable.key })
      .from(pageOverridesTable)
      .where(sql`${pageOverridesTable.data}::text like ${pattern}`),
  ]);
  return [
    ...articles.map((row) => `article "${row.id}"`),
    ...pages.map((row) => `page "${row.key}"`),
  ];
}

export async function getOverview() {
  const db = getDb();
  const [articleCounts, mediaCount, recentArticles, recentPages] =
    await Promise.all([
      db
        .select({
          status: articlesTable.status,
          count: sql<number>`count(*)::int`,
        })
        .from(articlesTable)
        .groupBy(articlesTable.status),
      db.select({ count: sql<number>`count(*)::int` }).from(mediaTable),
      db
        .select({
          id: articlesTable.id,
          title: articlesTable.title,
          status: articlesTable.status,
          modifiedAt: articlesTable.modifiedAt,
        })
        .from(articlesTable)
        .orderBy(desc(articlesTable.modifiedAt))
        .limit(5),
      db
        .select({
          key: pageOverridesTable.key,
          modifiedAt: pageOverridesTable.modifiedAt,
        })
        .from(pageOverridesTable)
        .orderBy(desc(pageOverridesTable.modifiedAt))
        .limit(5),
    ]);
  const count = (status: string) =>
    articleCounts.find((row) => row.status === status)?.count ?? 0;
  return {
    published: count("published"),
    drafts: count("draft"),
    media: mediaCount[0]?.count ?? 0,
    recentArticles,
    recentPages,
  };
}
