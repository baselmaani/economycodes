import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";
import { getDefaultOgImageUrl, size as ogImageSize } from "@/lib/seo/og-image";
import { siteUrl } from "@/lib/site";

const ogLocaleMap: Record<AppLocale, string> = {
  sv: "sv_SE",
  en: "en_US",
  ar: "ar_SA",
};

export interface BuildMetadataOptions {
  locale: AppLocale;
  title: string;
  description: string;
  /** Alternates map produced by getAlternateLinks()/getServiceAlternateLinks(). */
  alternates: Record<AppLocale | "x-default", string>;
  /** Absolute image URL for social sharing; falls back to the default OG image. */
  ogImage?: string;
}

export function buildMetadata({
  locale,
  title,
  description,
  alternates,
  ogImage,
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
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images[0].url],
    },
  };
}

export const defaultMetadataBase = new URL(siteUrl);
