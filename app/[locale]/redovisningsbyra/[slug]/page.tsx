import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MapPin, Phone } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  getAbsoluteUrl,
  getLocationAlternateLinks,
  getLocationSlug,
  locationPages,
  resolveLocationBySlug,
  services,
} from "@/lib/routes";
import { getPageContent } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { locationPageKey } from "@/lib/cms/pages";
import { getLocalized } from "@/lib/i18n-content";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { buildOfficeJsonLd } from "@/lib/structured-data/organization";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ArticleBody } from "@/components/content/ArticleBody";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { business } from "@/content/business";
import { locations } from "@/content/locations";

interface LocationPageParams {
  locale: AppLocale;
  slug: string;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    locationPages.map((page) => ({
      locale,
      slug: getLocationSlug(locale, page),
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocationPageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = resolveLocationBySlug(locale, slug);
  if (!page) return {};

  return buildPageMetadata(locationPageKey(page.locationId), locale, {
    alternates: getLocationAlternateLinks(page),
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<LocationPageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = resolveLocationBySlug(locale, slug);
  const location = locations.find((l) => l.id === page?.locationId);
  if (!page || !location) notFound();

  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const l = await getTranslations({ locale, namespace: "location" });
  const content = await getPageContent(locationPageKey(page.locationId));

  const city = getLocalized(page.cityName, locale);
  const title = getLocalized(page.title, locale);
  const pageUrl = getLocationAlternateLinks(page)[locale];
  const featuredServices = page.serviceKeys
    .map((key) => services[key])
    .filter(Boolean);
  const otherOffices = locationPages.filter(
    (other) => other.locationId !== page.locationId,
  );

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          ...buildOfficeJsonLd(business, location, {
            url: pageUrl,
            areaServed: page.nearbyAreas,
          }),
          description: getLocalized(content.text.intro, locale),
        }}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: nav("contact"), url: getAbsoluteUrl("/kontakt", locale) },
          { name: title, url: pageUrl },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(page.faqs, locale)} />

      <Section tone="tint" bleed>
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: nav("home"), routeKey: "/" },
              { label: nav("contact"), routeKey: "/kontakt" },
              { label: title },
            ]}
          />
          <Reveal>
            <h1 className="text-page-h1 mt-6 max-w-3xl font-semibold text-balance">
              {title}
            </h1>
            <p className="text-muted-foreground text-body mt-4 max-w-2xl">
              {getLocalized(content.text.intro, locale)}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button
                render={<Link href="/kontakt" />}
                variant="shine"
                size="lg"
                className="gap-2"
              >
                {t("contactUs")}
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="rtl:rotate-180"
                />
              </Button>
              <a
                href={business.phoneHref}
                className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <Phone size={16} className="text-primary" aria-hidden="true" />
                <span dir="ltr">{business.phone}</span>
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Container size="content" className="py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <section className="border-border bg-card rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">
              {l("officeTitle", { city })}
            </h2>
            <address className="text-muted-foreground mt-3 not-italic">
              <span dir="ltr" className="block text-start">
                {getLocalized(location.name, locale)}
                <br />
                {location.streetAddress}
                <br />
                {location.postalCode} {location.city}
              </span>
            </address>
            <a
              href={location.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <MapPin size={16} aria-hidden="true" />
              {t("getDirections")}
            </a>
          </section>
          <section className="border-border bg-card rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">{l("areasTitle")}</h2>
            <ul className="text-muted-foreground mt-3 flex flex-wrap gap-2">
              {page.nearbyAreas.map((area) => (
                <li
                  key={area}
                  className="bg-secondary/60 rounded-full px-3 py-1 text-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="prose prose-neutral mt-10 max-w-none">
          <ArticleBody blocks={getLocalized(page.body, locale)} />
        </div>
      </Container>

      <Section tone="tint">
        <Container size="content">
          <h2 className="text-2xl font-semibold">
            {l("servicesTitle", { city })}
          </h2>
          <RevealGroup
            step={80}
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.key}
                service={service}
                locale={locale}
                readMoreLabel={t("readMore")}
              />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Container size="content" className="py-12">
        <Reveal>
          <h2 className="text-2xl font-semibold">{t("faqTitle")}</h2>
          <div className="mt-4">
            <FaqAccordion faqs={page.faqs} locale={locale} />
          </div>
        </Reveal>

        {otherOffices.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold">{l("otherOfficeTitle")}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {otherOffices.map((other) => (
                <li key={other.locationId}>
                  <Link
                    href={{
                      pathname: "/redovisningsbyra/[slug]",
                      params: { slug: getLocationSlug(locale, other) },
                    }}
                    className="text-primary font-medium hover:underline"
                  >
                    {getLocalized(other.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </article>
  );
}
