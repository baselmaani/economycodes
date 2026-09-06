import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Placeholder } from "@/components/common/Placeholder";
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
  const t = (v: { sv: string; en?: string; ar?: string }) => getLocalized(v, locale);

  return (
    <article className="prose prose-neutral mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
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
      <p>
        {t(cookiePolicy.analyticsBody)} <Placeholder />.
      </p>

      <h2>{t(cookiePolicy.manageHeading)}</h2>
      <p>{t(cookiePolicy.manageBody)}</p>
    </article>
  );
}
