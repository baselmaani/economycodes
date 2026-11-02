import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAbsoluteUrl, getAlternateLinks } from "@/lib/routes";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getPageContent } from "@/lib/cms/content";
import { getLocalized } from "@/lib/i18n-content";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { business } from "@/content/business";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("villkor", locale, {
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
  const [nav, common, page] = await Promise.all([
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "common" }),
    getPageContent("villkor"),
  ]);
  const t = (key: string) => getLocalized(page.text[key], locale);

  return (
    <Container
      as="article"
      size="content"
      className="prose prose-neutral py-12 sm:py-16"
    >
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: t("title"), url: getAbsoluteUrl("/villkor", locale) },
        ])}
      />
      <Breadcrumbs
        items={[{ label: nav("home"), routeKey: "/" }, { label: t("title") }]}
      />
      <h1>{t("title")}</h1>
      <p className="text-muted-foreground text-sm">
        {common("lastReviewed")}: {t("lastUpdated")}
      </p>

      <p>{t("intro")}</p>

      <h2>{t("servicesHeading")}</h2>
      <p>{t("servicesBody")}</p>

      <h2>{t("engagementHeading")}</h2>
      <p>{t("engagementBody")}</p>

      <h2>{t("whatsappHeading")}</h2>
      <p>{t("whatsappBody")}</p>

      <h2>{t("acceptableUseHeading")}</h2>
      <p>{t("acceptableUseBody")}</p>

      <h2>{t("privacyHeading")}</h2>
      <p>
        {t("privacyBodyPrefix")}{" "}
        <Link href="/integritetspolicy">{t("privacyLinkLabel")}</Link>
        {t("privacyBodySuffix") ? ` ${t("privacyBodySuffix")}` : "."}
      </p>

      <h2>{t("intellectualPropertyHeading")}</h2>
      <p>{t("intellectualPropertyBody")}</p>

      <h2>{t("liabilityHeading")}</h2>
      <p>{t("liabilityBody")}</p>

      <h2>{t("lawHeading")}</h2>
      <p>{t("lawBody")}</p>

      <h2>{t("changesHeading")}</h2>
      <p>{t("changesBody")}</p>

      <h2>{t("contactHeading")}</h2>
      <p>
        {t("contactBodyPrefix")}{" "}
        <a href={`mailto:${business.email}`}>{business.email}</a>{" "}
        {t("contactBodySuffix")}{" "}
        <a href={business.phoneHref}>
          <span dir="ltr">{business.phone}</span>
        </a>
        .
      </p>
    </Container>
  );
}
