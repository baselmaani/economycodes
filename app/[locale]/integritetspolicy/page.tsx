import { Fragment } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAbsoluteUrl, getAlternateLinks } from "@/lib/routes";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getPageContent } from "@/lib/cms/content";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { business } from "@/content/business";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("integritetspolicy", locale, {
    alternates: getAlternateLinks("/integritetspolicy"),
  });
}

/** Simple "heading + one paragraph" sections, in display order. */
const SECTIONS = [
  "dataCollected",
  "purposes",
  "legalBasis",
  "whatsapp",
  "sharing",
  "transfers",
  "retention",
  "security",
] as const;

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [nav, common, page] = await Promise.all([
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "common" }),
    getPageContent("integritetspolicy"),
  ]);
  const t = (key: string) => getLocalized(page.text[key], locale);

  const emailLink = <a href={`mailto:${business.email}`}>{business.email}</a>;

  return (
    <Container
      as="article"
      size="content"
      className="prose prose-neutral py-12 sm:py-16"
    >
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          {
            name: t("title"),
            url: getAbsoluteUrl("/integritetspolicy", locale),
          },
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

      <h2>{t("controllerHeading")}</h2>
      <p>
        {t("controllerIntro")} {business.legalName}. {t("controllerBodyPrefix")}{" "}
        {emailLink} {t("controllerBodySuffix")}{" "}
        <a href={business.phoneHref}>
          <span dir="ltr">{business.phone}</span>
        </a>
        .
      </p>

      {SECTIONS.map((key) => (
        <Fragment key={key}>
          <h2>{t(`${key}Heading`)}</h2>
          <p>{t(`${key}Body`)}</p>
        </Fragment>
      ))}

      <h2>{t("rightsHeading")}</h2>
      <p>
        {t("rightsBody")} {emailLink} {t("rightsBodySuffix")}
      </p>

      {/* Linked from Meta's "data deletion instructions" field -- keep the id stable. */}
      <h2 id="radera-uppgifter">{t("deletionHeading")}</h2>
      <p>
        {t("deletionBodyPrefix")} {emailLink} {t("deletionBodySuffix")}
      </p>

      <h2>{t("analyticsHeading")}</h2>
      <p>{t("analyticsBody")}</p>

      <h2>{t("changesHeading")}</h2>
      <p>{t("changesBody")}</p>
    </Container>
  );
}
