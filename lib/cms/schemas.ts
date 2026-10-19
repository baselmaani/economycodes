import { z } from "zod";

import type { ContentBlock, Localized, MediaRef } from "@/content/types";

/**
 * Validation shared by the admin dashboard, the article JSON import, and the
 * seed script. Shapes mirror content/types.ts so DB rows and the static
 * content/ defaults are interchangeable.
 */

const nonEmpty = z.string().trim().min(1, "Required");

/** Matches Localized<T>: `sv` required, `en`/`ar` optional (absent = falls back to sv). */
export function localized<T extends z.ZodType>(value: T) {
  return z.object({
    sv: value,
    en: value.optional(),
    ar: value.optional(),
  });
}

/** Per-locale override where every locale is optional; empty strings are dropped. */
const optionalText = z
  .string()
  .trim()
  .transform((value) => value || undefined)
  .optional();

export const partialLocalizedString = z.object({
  sv: optionalText,
  en: optionalText,
  ar: optionalText,
});
export type PartialLocalized = z.infer<typeof partialLocalizedString>;

export const localizedString = localized(nonEmpty);

/** Lowercase words joined by hyphens; any script, so the existing Arabic slugs validate. */
export const slugSchema = z
  .string()
  .trim()
  .regex(
    /^[\p{Ll}\p{Lo}\p{M}\p{N}]+(?:-[\p{Ll}\p{Lo}\p{M}\p{N}]+)*$/u,
    "Use lowercase letters, numbers and single hyphens",
  );

export const imageSrcSchema = z
  .string()
  .trim()
  .refine(
    (value) => value.startsWith("/") || /^https:\/\//.test(value),
    "Must be a site path (/media/...) or an https URL",
  );

export const mediaRefSchema = z.object({
  src: imageSrcSchema,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: localizedString,
}) satisfies z.ZodType<MediaRef>;

export const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("heading"),
    level: z.union([z.literal(2), z.literal(3)]),
    text: nonEmpty,
  }),
  z.object({ type: z.literal("paragraph"), text: nonEmpty }),
  z.object({
    type: z.literal("list"),
    items: z.array(nonEmpty).min(1, "A list needs at least one item"),
  }),
  z.object({ type: z.literal("disclaimer"), text: nonEmpty }),
]) satisfies z.ZodType<ContentBlock>;

export const blocksSchema = z
  .array(contentBlockSchema)
  .min(1, "The body needs at least one block");

export const seoFieldsSchema = z.object({
  title: partialLocalizedString.optional(),
  description: partialLocalizedString.optional(),
  ogImage: mediaRefSchema.optional(),
  noindex: z.boolean().optional(),
});
export type SeoFields = z.infer<typeof seoFieldsSchema>;

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the YYYY-MM-DD format");

export const articleStatusSchema = z.enum(["draft", "published"]);
export type ArticleStatus = z.infer<typeof articleStatusSchema>;

/** The article JSON import format (also what "Export JSON" produces). */
export const articleInputSchema = z.object({
  id: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase a-z, 0-9 and hyphens (e.g. vat-guide-2026)",
    ),
  status: articleStatusSchema.default("draft"),
  slug: localized(slugSchema),
  title: localizedString,
  excerpt: localizedString,
  body: localized(blocksSchema),
  coverImage: mediaRefSchema,
  faqIds: z.array(z.string()).default([]),
  publishedAt: dateSchema,
  updatedAt: dateSchema.optional(),
  seo: seoFieldsSchema.default({}),
});
export type ArticleInput = z.output<typeof articleInputSchema>;

/** A single article object, or an array of them. */
export const articleImportSchema = z.union([
  articleInputSchema,
  z.array(articleInputSchema).min(1),
]);

export const pageOverrideSchema = z.object({
  seo: seoFieldsSchema.optional(),
  text: z.record(z.string(), partialLocalizedString).optional(),
  images: z.record(z.string(), mediaRefSchema).optional(),
});
export type PageOverrideData = z.infer<typeof pageOverrideSchema>;

export const mediaInputSchema = z.object({
  url: z.url().refine((value) => value.startsWith("https://"), "https only"),
  pathname: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: localizedString,
  contentType: z.string().regex(/^image\//, "Images only"),
  size: z.number().int().nonnegative(),
});

/** "path.to.field: message" lines for showing zod errors to an editor. */
export function formatIssues(error: z.ZodError): string[] {
  return error.issues.map((issue) => {
    const path = issue.path.join(".");
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}

export type { Localized };
