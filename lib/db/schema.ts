import {
  boolean,
  index,
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
  coverImage: jsonb("cover_image").$type<MediaRef>(),
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

/** Contact-form messages, stored alongside the email so none are lost if sending fails. */
export const contactSubmissionsTable = pgTable(
  "contact_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    status: text("status", { enum: ["new", "read", "archived"] })
      .notNull()
      .default("new"),
    locale: text("locale").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    preferredContact: text("preferred_contact").notNull(),
    /** Inquiry topic or service key picked in the form, if any. */
    service: text("service"),
    message: text("message").notNull(),
    emailSent: boolean("email_sent").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("contact_submissions_created_at_idx").on(table.createdAt)],
);

export type ArticleRow = typeof articlesTable.$inferSelect;
export type MediaRow = typeof mediaTable.$inferSelect;
export type ContactSubmissionRow = typeof contactSubmissionsTable.$inferSelect;
