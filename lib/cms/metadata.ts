import "server-only";

import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/site";
import { getPageContent, type CmsArticle } from "@/lib/cms/content";

export function absoluteImageUrl(src: string): string {
  return new URL(src, siteUrl).toString();
}

/**
 * generateMetadata() for a CMS-registered page: SEO title/description from
 * the dashboard override (falling back to content/ defaults), an optional
 * custom OG image, and noindex.
 */
export async function buildPageMetadata(
  key: string,
  locale: AppLocale,
  options: {
    alternates: Record<AppLocale | "x-default", string>;
    /** The page's generated OG card, used unless an OG image is set in the dashboard. */
    ogImage?: string;
  },
): Promise<Metadata> {
  const { seo } = await getPageContent(key);
  const title = getLocalized(seo.title, locale);
  const meta = buildMetadata({
    locale,
    title,
    description: getLocalized(seo.description, locale),
    alternates: options.alternates,
    ogImage: seo.ogImage ? absoluteImageUrl(seo.ogImage.src) : options.ogImage,
    noindex: seo.noindex,
  });
  return seo.absoluteTitle ? { ...meta, title: { absolute: title } } : meta;
}

/** SEO title/description for an article, preferring its dashboard SEO fields over title/excerpt. */
export function getArticleSeo(article: CmsArticle, locale: AppLocale) {
  return {
    title: article.seo.title?.[locale] || getLocalized(article.title, locale),
    description:
      article.seo.description?.[locale] ||
      getLocalized(article.excerpt, locale),
  };
}
