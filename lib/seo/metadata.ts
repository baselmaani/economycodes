import type { Metadata } from "next";

import type { AppLocale } from "@/i18n/routing";
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
      // Omitting `images` entirely (rather than setting it to `undefined`)
      // lets Next.js fall back to the file-based opengraph-image route --
      // an explicit `images` key, even undefined, suppresses that fallback.
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export const defaultMetadataBase = new URL(siteUrl);
