import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Placeholder } from "@/components/common/Placeholder";
import { business } from "@/content/business";
import { privacyPolicy } from "@/content/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: getLocalized(privacyPolicy.title, locale),
    description: getLocalized(privacyPolicy.dataCollectedBody, locale).slice(0, 155),
    alternates: getAlternateLinks("/integritetspolicy"),
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });
  const common = await getTranslations({ locale, namespace: "common" });
  const t = (v: { sv: string; en?: string; ar?: string }) => getLocalized(v, locale);

  return (
    <article className="prose prose-neutral mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: t(privacyPolicy.title) },
        ]}
      />
      <h1>{t(privacyPolicy.title)}</h1>
      <p className="text-muted-foreground text-sm">
        {common("lastReviewed")}: {privacyPolicy.lastUpdated}
      </p>

      <h2>{t(privacyPolicy.controllerHeading)}</h2>
      <p>
        {t(privacyPolicy.controllerIntro)} <Placeholder /> (
        {t(privacyPolicy.orgNumberLabel)}: <Placeholder />)
      </p>

      <h2>{t(privacyPolicy.dataCollectedHeading)}</h2>
      <p>{t(privacyPolicy.dataCollectedBody)}</p>

      <h2>{t(privacyPolicy.retentionHeading)}</h2>
      <p>{t(privacyPolicy.retentionBody)}</p>

      <h2>{t(privacyPolicy.rightsHeading)}</h2>
      <p>
        {t(privacyPolicy.rightsBody)}{" "}
        <a href={`mailto:${business.email}`}>{business.email}</a>{" "}
        {t(privacyPolicy.rightsBodySuffix)}
      </p>

      <h2>{t(privacyPolicy.analyticsHeading)}</h2>
      <p>
        {t(privacyPolicy.analyticsBody)} <Placeholder />.
      </p>
    </article>
  );
}
