import { routing } from "@/i18n/routing";
import type { Locale } from "@/content/types";
import type { ArticleMeta } from "@/content/articles/types";
import type { ContentBlock, Localized, MediaRef } from "@/content/types";
import type { ArticleInput, SeoFields } from "@/lib/cms/schemas";

/**
 * Pure helpers for the article JSON format (import, export, template) and
 * the editor. No server-only imports: used by client components too.
 */

type ArticleLike = ArticleMeta & {
  status: ArticleInput["status"];
  body: Localized<ContentBlock[]>;
  seo: SeoFields;
};

/** An article in the import/export JSON shape (drops internal fields like authorId). */
export function toArticleInput(article: ArticleLike): ArticleInput {
  return {
    id: article.id,
    status: article.status,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body,
    coverImage: article.coverImage,
    faqIds: article.faqIds ?? [],
    publishedAt: article.publishedAt,
    ...(article.updatedAt && { updatedAt: article.updatedAt }),
    seo: article.seo,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Removes empty en/ar translations ("" strings, [] block lists) so a
 * half-filled locale is treated as "not translated" (falls back to sv)
 * instead of failing validation. Leaves everything else untouched for zod.
 */
export function cleanArticleJson(raw: unknown): unknown {
  if (!isRecord(raw)) return raw;
  const out: Record<string, unknown> = { ...raw };

  for (const key of ["slug", "title", "excerpt", "body"]) {
    const value = out[key];
    if (!isRecord(value)) continue;
    const cleaned: Record<string, unknown> = { ...value };
    for (const locale of ["en", "ar"]) {
      const localeValue = cleaned[locale];
      if (
        localeValue === undefined ||
        localeValue === null ||
        (typeof localeValue === "string" && localeValue.trim() === "") ||
        (Array.isArray(localeValue) && localeValue.length === 0)
      ) {
        delete cleaned[locale];
      }
    }
    out[key] = cleaned;
  }

  if (isRecord(out.coverImage) && isRecord(out.coverImage.alt)) {
    const alt = { ...out.coverImage.alt };
    for (const locale of ["en", "ar"]) {
      if (typeof alt[locale] === "string" && !(alt[locale] as string).trim()) {
        delete alt[locale];
      }
    }
    out.coverImage = { ...out.coverImage, alt };
  }

  if (out.updatedAt === "" || out.updatedAt === null) delete out.updatedAt;
  return out;
}

/** "Hur bokför jag moms?" → "hur-bokfor-jag-moms"; keeps Arabic letters as-is. */
export function slugify(text: string): string {
  return (
    text
      // Strip diacritics from Latin letters only (å → a); decomposing Arabic
      // would split letters like ئ into a base letter plus a combining mark.
      .replace(/[À-ɏ]/g, (char) => char.normalize("NFD").replace(/[̀-ͯ]/g, ""))
      .toLowerCase()
      .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
  );
}

/** Public path of an article, mirroring the "/artiklar/[slug]" entry in i18n/routing.ts. */
export function articlePath(locale: Locale, slug: string): string {
  const template = routing.pathnames["/artiklar/[slug]"][locale];
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${template.replace("[slug]", slug)}`;
}

/** Editor state: like ArticleInput, but the cover image may not be chosen yet. */
export type ArticleDraft = Omit<ArticleInput, "coverImage"> & {
  coverImage?: MediaRef;
};

export function emptyArticle(): ArticleDraft {
  return {
    id: "",
    status: "draft",
    slug: { sv: "" },
    title: { sv: "" },
    excerpt: { sv: "" },
    body: { sv: [{ type: "paragraph", text: "" }] },
    faqIds: [],
    publishedAt: new Date().toISOString().slice(0, 10),
    seo: {},
  };
}

/** The downloadable example shown on the import page. */
export const ARTICLE_TEMPLATE: ArticleInput = {
  id: "vat-registration-guide",
  status: "draft",
  slug: {
    sv: "momsregistrering-guide",
    en: "vat-registration-guide",
    ar: "دليل-التسجيل-في-ضريبة-القيمة-المضافة",
  },
  title: {
    sv: "Så momsregistrerar du ditt företag",
    en: "How to Register Your Business for VAT",
    ar: "كيف تسجل شركتك في ضريبة القيمة المضافة",
  },
  excerpt: {
    sv: "En kort genomgång av när och hur ett företag i Sverige ska momsregistreras.",
    en: "A short walkthrough of when and how a business in Sweden registers for VAT.",
    ar: "شرح مختصر لمتى وكيف تسجل الشركة في السويد في ضريبة القيمة المضافة.",
  },
  body: {
    sv: [
      { type: "paragraph", text: "Inledande stycke…" },
      { type: "heading", level: 2, text: "När måste jag momsregistrera mig?" },
      { type: "paragraph", text: "Brödtext…" },
      { type: "list", items: ["Första punkten", "Andra punkten"] },
      {
        type: "disclaimer",
        text: "Informationen är allmän och ersätter inte individuell rådgivning.",
      },
    ],
    en: [
      { type: "paragraph", text: "Intro paragraph…" },
      { type: "heading", level: 2, text: "When do I need to register?" },
      { type: "paragraph", text: "Body text…" },
      { type: "list", items: ["First point", "Second point"] },
    ],
  },
  coverImage: {
    src: "/media/optimized/bokforing.webp",
    width: 1024,
    height: 683,
    alt: {
      sv: "Bokföring och kvitton",
      en: "Bookkeeping and receipts",
      ar: "محاسبة وإيصالات",
    },
  },
  faqIds: ["faq-bookkeeping-what"],
  publishedAt: "2026-10-14",
  seo: {
    title: { sv: "Momsregistrering – guide för företag" },
    description: {
      sv: "Lär dig när ditt företag måste momsregistreras och hur du gör det steg för steg.",
    },
  },
};
