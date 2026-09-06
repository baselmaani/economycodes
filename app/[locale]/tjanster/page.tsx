import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { servicesList } from "@/content/services";
import {
  getServiceGroup,
  serviceGroups,
  type ServiceGroup,
} from "@/content/service-icons";

const GROUP_ORDER: ServiceGroup[] = ["core", "advisory", "specialist"];

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

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    label: serviceGroups[group][locale],
    services: servicesList.filter((s) => getServiceGroup(s.key) === group),
  })).filter((g) => g.services.length > 0);

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("services") },
        ]}
      />
      <h1 className="text-page-h1 mt-4 font-semibold text-balance">
        {nav("services")}
      </h1>
      <p className="text-muted-foreground text-body mt-3 max-w-2xl">
        {home("servicesSubtitle")}
      </p>

      <div className="mt-12 flex flex-col gap-14">
        {grouped.map(({ group, label, services }) => (
          <div key={group}>
            <h2 className="text-muted-foreground mb-5 text-sm font-semibold tracking-wide uppercase">
              {label}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.key}
                  service={service}
                  locale={locale}
                  readMoreLabel={t("readMore")}
                  featured={group === "core"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
