import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import {
  getAbsoluteUrl,
  getAlternateLinks,
  getServiceAlternateLinks,
} from "@/lib/routes";
import { getLocalized } from "@/lib/i18n-content";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildServiceCatalogJsonLd } from "@/lib/structured-data/service";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServicesListOgImageUrl } from "@/lib/seo/og-image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/utils";
import { servicesList } from "@/content/services";
import {
  getServiceGroup,
  serviceGroups,
  type ServiceGroup,
} from "@/content/service-icons";

const GROUP_ORDER: ServiceGroup[] = [
  "core",
  "advisory",
  "specialist",
  "digital",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const home = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale,
    title: getLocalized(
      {
        sv: "Tjänster: redovisning, lön & marknadsföring",
        en: "Services: accounting, payroll & marketing",
        ar: "خدماتنا: المحاسبة والرواتب والتسويق",
      },
      locale,
    ),
    description: home("servicesSubtitle"),
    alternates: getAlternateLinks("/tjanster"),
    ogImage: getServicesListOgImageUrl(locale),
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
  const digital = await getTranslations({ locale, namespace: "digital" });

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    label: serviceGroups[group][locale],
    services: servicesList.filter((s) => getServiceGroup(s.key) === group),
  })).filter((g) => g.services.length > 0);

  const pageUrl = getAbsoluteUrl("/tjanster", locale);

  return (
    <Container className="py-12 sm:py-16">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: nav("services"), url: pageUrl },
        ])}
      />
      <JsonLd
        data={buildServiceCatalogJsonLd({
          name: nav("services"),
          serviceType: "Accounting and business services",
          description: home("servicesSubtitle"),
          url: pageUrl,
          locale,
          entries: grouped.flatMap(({ services }) =>
            services.map((service) => ({
              name: getLocalized(service.name, locale),
              description: getLocalized(service.summary, locale),
              url: getServiceAlternateLinks(service)[locale],
            })),
          ),
        })}
      />
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("services") },
        ]}
      />
      <Reveal>
        <h1 className="text-page-h1 mt-4 font-semibold text-balance">
          {nav("services")}
        </h1>
        <p className="text-muted-foreground text-body mt-3 max-w-2xl">
          {home("servicesSubtitle")}
        </p>
      </Reveal>

      <div className="mt-12 flex flex-col gap-14">
        {grouped.map(({ group, label, services }) => {
          const isCore = group === "core";
          return (
            <div key={group}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                  {label}
                </h2>
                {group === "digital" && (
                  <Link
                    href="/digital-marknadsforing"
                    className="text-primary inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                  >
                    {digital("seeAll")}
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="rtl:rotate-180"
                    />
                  </Link>
                )}
              </div>
              <RevealGroup
                step={60}
                className={cn(
                  "grid gap-4",
                  isCore ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
                )}
              >
                {services.map((service) => (
                  <ServiceCard
                    key={service.key}
                    service={service}
                    locale={locale}
                    readMoreLabel={t("readMore")}
                    featured={isCore}
                    size={isCore ? "lg" : "default"}
                  />
                ))}
              </RevealGroup>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
