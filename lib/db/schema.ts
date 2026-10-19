import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import type { ContentBlock, Localized, MediaRef } from "@/content/types";
import type { PageOverrideData, SeoFields } from "@/lib/cms/schemas";

export const articlesTable = pgTable("articles", {
  id: text("id").primaryKey(),
  status: text("status", { enum: ["draft", "published"] })
    .notNull()
    .default("draft"),
  slug: jsonb("slug").$type<Localized<string>>().notNull(),
  title: jsonb("title").$type<Localized<string>>().notNull(),
  excerpt: jsonb("excerpt").$type<Localized<string>>().notNull(),
  body: jsonb("body").$type<Localized<ContentBlock[]>>().notNull(),
  coverImage: jsonb("cover_image").$type<MediaRef>().notNull(),
  faqIds: text("faq_ids").array().notNull().default([]),
  seo: jsonb("seo").$type<SeoFields>().notNull().default({}),
  /** Content dates shown on the page (YYYY-MM-DD), distinct from row timestamps. */
  publishedAt: text("published_at").notNull(),
  updatedAt: text("updated_at"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  modifiedAt: timestamp("modified_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pageOverridesTable = pgTable("page_overrides", {
  key: text("key").primaryKey(),
  data: jsonb("data").$type<PageOverrideData>().notNull().default({}),
  modifiedAt: timestamp("modified_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const mediaTable = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull().unique(),
  pathname: text("pathname").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  alt: jsonb("alt").$type<Localized<string>>().notNull(),
  contentType: text("content_type").notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type ArticleRow = typeof articlesTable.$inferSelect;
export type MediaRow = typeof mediaTable.$inferSelect;
