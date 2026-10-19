import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";
import { getDefaultOgImageUrl, size as ogImageSize } from "@/lib/seo/og-image";
import { siteUrl } from "@/lib/site";

// ar_AR is Facebook's generic Arabic locale: the audience is Arabic speakers in
// Sweden, not Saudi Arabia.
const ogLocaleMap: Record<AppLocale, string> = {
  sv: "sv_SE",
  en: "en_US",
  ar: "ar_AR",
};

export interface BuildMetadataOptions {
  locale: AppLocale;
  title: string;
  description: string;
  /** Alternates map produced by getAlternateLinks()/getServiceAlternateLinks(). */
  alternates: Record<AppLocale | "x-default", string>;
  /** Absolute image URL for social sharing; falls back to the default OG image. */
  ogImage?: string;
  /** Set from the admin dashboard: keeps the page out of search results (and the sitemap). */
  noindex?: boolean;
  /** Marks the page as an article for social cards (og:type article + dates). */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    authors?: string[];
  };
}

export function buildMetadata({
  locale,
  title,
  description,
  alternates,
  ogImage,
  noindex,
  article,
}: BuildMetadataOptions): Metadata {
  const canonical = alternates[locale];
  const images = ogImage
    ? [{ url: ogImage }]
    : [
        {
          url: getDefaultOgImageUrl(locale),
          width: ogImageSize.width,
          height: ogImageSize.height,
        },
      ];

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Economy Codes",
      locale: ogLocaleMap[locale],
      alternateLocale: Object.entries(ogLocaleMap)
        .filter(([other]) => other !== locale)
        .map(([, ogLocale]) => ogLocale),
      images,
      ...(article
        ? { type: "article" as const, ...article }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images[0].url],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

export const defaultMetadataBase = new URL(siteUrl);
