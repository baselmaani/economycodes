import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
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
import { getInquiryHref } from "@/lib/contact-links";
import { buildOfficeJsonLd } from "@/lib/structured-data/organization";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArticleBody } from "@/components/content/ArticleBody";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ContactActions } from "@/components/page/ContactActions";
import { FaqBlock } from "@/components/page/FaqBlock";
import { PageBreadcrumbs } from "@/components/page/PageBreadcrumbs";
import { PageHero } from "@/components/page/PageHero";
import { accountingHero } from "@/content/accounting";
import { offerings } from "@/content/offerings";
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
  const content = await getPageContent(locationPageKey(page.locationId));

  const city = getLocalized(page.cityName, locale);
  // Headings, areas, FAQs and body as edited in the dashboard (lib/cms/pages/locations.ts).
  const text = (key: string) =>
    getLocalized(content.text[key], locale).replace("{city}", city);
  const title = text("title");
  const nearbyAreas = getLocalized(content.lists.nearbyAreas, locale);
  const pageFaqs = content.collections.faqs.map((faq, index) => ({
    id: `${page.locationId}-faq-${index}`,
    question: faq.question,
    answer: faq.answer,
  }));
  const offering = offerings.redovisning;
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
            areaServed: nearbyAreas,
          }),
          description: getLocalized(content.text.intro, locale),
        }}
      />
      <PageHero
        breadcrumbs={
          <PageBreadcrumbs
            locale={locale}
            items={[
              {
                label: getLocalized(offering.label, locale),
                routeKey: offering.route,
              },
              { label: title },
            ]}
            currentUrl={pageUrl}
          />
        }
        eyebrow={getLocalized(accountingHero.eyebrow, locale)}
        eyebrowIcon={MapPin}
        title={title}
        lead={<p>{getLocalized(content.text.intro, locale)}</p>}
        actions={
          <ContactActions
            href={getInquiryHref(locale, offering.inquiry)}
            label={getLocalized(offering.cta, locale)}
            ctaId="location-hero"
          />
        }
      />

      <Container size="content" className="py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <section className="border-border bg-card rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">{text("officeTitle")}</h2>
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
            <h2 className="text-xl font-semibold">{text("areasTitle")}</h2>
            <ul className="text-muted-foreground mt-3 flex flex-wrap gap-2">
              {nearbyAreas.map((area) => (
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
          <ArticleBody blocks={getLocalized(content.blocks.body, locale)} />
        </div>
      </Container>

      <Section tone="tint">
        <Container size="content">
          <h2 className="text-2xl font-semibold">{text("servicesTitle")}</h2>
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

      <FaqBlock faqs={pageFaqs} locale={locale} title={text("faqTitle")} />

      <Container size="content" className="pb-16">
        {otherOffices.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold">
              {text("otherOfficeTitle")}
            </h2>
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
