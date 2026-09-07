import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { cookiePolicy } from "@/content/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: getLocalized(cookiePolicy.title, locale),
    description: getLocalized(cookiePolicy.intro, locale),
    alternates: getAlternateLinks("/cookies"),
  });
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });
  const common = await getTranslations({ locale, namespace: "common" });
  const t = (v: { sv: string; en?: string; ar?: string }) =>
    getLocalized(v, locale);

  return (
    <Container
      as="article"
      size="content"
      className="prose prose-neutral py-12 sm:py-16"
    >
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: t(cookiePolicy.title) },
        ]}
      />
      <h1>{t(cookiePolicy.title)}</h1>
      <p className="text-muted-foreground text-sm">
        {common("lastReviewed")}: {cookiePolicy.lastUpdated}
      </p>

      <p>{t(cookiePolicy.intro)}</p>

      <h2>{t(cookiePolicy.necessaryHeading)}</h2>
      <p>{t(cookiePolicy.necessaryBody)}</p>

      <h2>{t(cookiePolicy.analyticsHeading)}</h2>
      <p>{t(cookiePolicy.analyticsBody)}</p>

      <h2>{t(cookiePolicy.manageHeading)}</h2>
      <p>{t(cookiePolicy.manageBody)}</p>
    </Container>
  );
}
