import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Placeholder } from "@/components/common/Placeholder";
import { business } from "@/content/business";
import { termsPage } from "@/content/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: getLocalized(termsPage.title, locale),
    description: getLocalized(termsPage.intro, locale).slice(0, 155),
    alternates: getAlternateLinks("/villkor"),
  });
}

export default async function TermsPage({
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
          { label: t(termsPage.title) },
        ]}
      />
      <h1>{t(termsPage.title)}</h1>
      <p className="text-muted-foreground text-sm">
        {common("lastReviewed")}: {termsPage.lastUpdated}
      </p>

      <p>{t(termsPage.intro)}</p>

      <h2>{t(termsPage.engagementHeading)}</h2>
      <p>{t(termsPage.engagementBody)}</p>

      <h2>{t(termsPage.privacyHeading)}</h2>
      <p>
        {t(termsPage.privacyBodyPrefix)}{" "}
        <Link href="/integritetspolicy">{t(termsPage.privacyLinkLabel)}</Link>
        {t(termsPage.privacyBodySuffix)
          ? ` ${t(termsPage.privacyBodySuffix)}`
          : "."}
      </p>

      <h2>{t(termsPage.liabilityHeading)}</h2>
      <p>
        {t(termsPage.liabilityBody)} <Placeholder />.
      </p>

      <h2>{t(termsPage.contactHeading)}</h2>
      <p>
        {t(termsPage.contactBodyPrefix)}{" "}
        <a href={`mailto:${business.email}`}>{business.email}</a>.
      </p>
    </Container>
  );
}
