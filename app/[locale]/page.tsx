import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { getPageContent } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { PageSections } from "@/components/sections/PageSections";
import { homeSections } from "@/components/sections/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // The homepage title already includes its own "| Economy Codes AB" suffix,
  // so its registry entry (lib/cms/pages/home.ts) sets absoluteTitle to bypass
  // the root layout's "%s | Economy Codes" template.
  return buildPageMetadata("home", locale, {
    alternates: getAlternateLinks("/"),
  });
}

/**
 * Each section is its own component in components/sections/home; their order
 * and visibility are set in the dashboard (Pages → Home → Page layout).
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await getPageContent("home");

  return (
    <PageSections locale={locale} content={content} registry={homeSections} />
  );
}
