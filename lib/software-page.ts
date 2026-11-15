import "server-only";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getSoftwareOgImageUrl } from "@/lib/seo/og-image";
import {
  isSoftwarePagePublic,
  softwarePages,
  type SoftwarePageKey,
} from "@/content/software";

/** generateMetadata() for a /bokforingsprogram page. Pending pages are always noindex. */
export async function buildSoftwareMetadata(
  key: SoftwarePageKey,
  locale: AppLocale,
): Promise<Metadata> {
  const page = softwarePages[key];
  const metadata = await buildPageMetadata(page.cmsKey, locale, {
    alternates: getAlternateLinks(page.route),
    ogImage: getSoftwareOgImageUrl(locale, page.route),
  });
  return page.status === "live"
    ? metadata
    : { ...metadata, robots: { index: false, follow: false } };
}

/** 404 for a pending page outside preview builds. */
export function assertSoftwarePageVisible(key: SoftwarePageKey) {
  if (!isSoftwarePagePublic(key)) notFound();
}
