import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { servicesList } from "@/content/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  const home = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale,
    title: nav("services"),
    description: home("servicesSubtitle"),
    alternates: getAlternateLinks("/tjanster"),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const home = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: nav("home"), routeKey: "/" }, { label: nav("services") }]}
      />
      <h1 className="mt-4 text-4xl font-semibold">{nav("services")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">
        {home("servicesSubtitle")}
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicesList.map((service) => (
          <ServiceCard
            key={service.key}
            service={service}
            locale={locale}
            readMoreLabel={t("readMore")}
          />
        ))}
      </div>
    </div>
  );
}
