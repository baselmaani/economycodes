import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildOrganizationJsonLd } from "@/lib/structured-data/organization";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/marketing/Hero";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { LocationCard } from "@/components/marketing/LocationCard";
import { PersonProfileCard } from "@/components/marketing/PersonProfileCard";
import { AuthorizationSection } from "@/components/marketing/AuthorizationSection";
import { WhyAuthorizedSection } from "@/components/marketing/WhyAuthorizedSection";
import { NationwideDigitalSection } from "@/components/marketing/NationwideDigitalSection";
import { LanguageSupportSection } from "@/components/marketing/LanguageSupportSection";
import { IndustriesSection } from "@/components/marketing/IndustriesSection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/button";
import { business } from "@/content/business";
import { locations } from "@/content/locations";
import { hadi } from "@/content/people";
import { servicesList } from "@/content/services";
import { faqs } from "@/content/faqs";
import { benefits, heroContent, homeMeta, processSteps } from "@/content/home";
import {
  serviceGroups,
  getServiceGroup,
  type ServiceGroup,
} from "@/content/service-icons";

const GROUP_ORDER: ServiceGroup[] = ["core", "advisory", "specialist"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = getLocalized(homeMeta.title, locale);
  const meta = buildMetadata({
    locale,
    title,
    description: getLocalized(homeMeta.description, locale),
    alternates: getAlternateLinks("/"),
  });
  // The homepage title already includes its own "| Economy Codes AB" suffix
  // (required verbatim), so it must bypass the root layout's "%s | Economy
  // Codes" title template rather than being templated a second time.
  return { ...meta, title: { absolute: title } };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const common = await getTranslations({ locale, namespace: "common" });

  const globalFaqs = faqs.filter((faq) => faq.scope === "global");
  const groupedServices = GROUP_ORDER.map((group) => ({
    group,
    label: serviceGroups[group][locale],
    services: servicesList.filter((s) => getServiceGroup(s.key) === group),
  })).filter((g) => g.services.length > 0);

  return (
    <>
      <JsonLd
        data={buildOrganizationJsonLd(
          business,
          locations,
          getLocalized(homeMeta.description, locale),
        )}
      />
      <JsonLd data={buildFaqJsonLd(globalFaqs, locale)} />

      {/* 1. Hero (includes compact trust row) */}
      <Hero
        locale={locale}
        eyebrow={t("heroEyebrow")}
        title={getLocalized(heroContent.title, locale)}
        subtitle={getLocalized(heroContent.subtitle, locale)}
        primaryCtaLabel={t("heroCtaPrimary")}
        servicesCtaLabel={t("heroCtaServices")}
        image={{
          src: "/media/optimized/hero.webp",
          width: 1600,
          height: 1068,
          alt: heroContent.imageAlt,
        }}
      />

      {/* 2. Verified authorization and trust */}
      <AuthorizationSection locale={locale} heading={t("trustTitle")} />

      {/* 3. Why choose an authorized accounting firm? */}
      <WhyAuthorizedSection
        locale={locale}
        heading={t("whyAuthorizedTitle")}
        subheading={t("authorizationMeaningTitle")}
      />

      {/* 4. Accounting services overview, grouped */}
      <Section tone="tint">
        <Container>
          <SectionHeading
            title={t("servicesTitle")}
            lead={t("servicesSubtitle")}
          />
          <div className="mt-12 flex flex-col gap-12">
            {groupedServices.map(({ group, label, services }) => (
              <div key={group}>
                <h3 className="text-muted-foreground mb-5 text-sm font-semibold tracking-wide uppercase">
                  {label}
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.key}
                      service={service}
                      locale={locale}
                      readMoreLabel={common("readMore")}
                      featured={group === "core"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. Digital accounting for companies throughout Sweden + who we help */}
      <NationwideDigitalSection
        locale={locale}
        heading={t("nationwideTitle")}
        whoWeHelpHeading={common("whoWeHelp")}
      />

      {/* 6. How the digital collaboration works */}
      <Section tone="tint">
        <Container size="wide">
          <SectionHeading title={t("collaborationTitle")} />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={index} className="relative flex flex-col gap-2">
                <span
                  dir="ltr"
                  aria-hidden="true"
                  className="text-primary/15 -mb-2 text-5xl font-bold"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold">
                  {getLocalized(step.title, locale)}
                </h3>
                <p className="text-muted-foreground text-body">
                  {getLocalized(step.body, locale)}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 7. About Hadi Al Maani */}
      <Section tone="base">
        <Container size="narrow">
          <h2 className="text-section-h2 mb-8 font-semibold text-balance">
            {t("aboutTitle")}
          </h2>
          <PersonProfileCard
            person={hadi}
            locale={locale}
            learnMoreLabel={common("learnMore")}
          />
        </Container>
      </Section>

      {/* 8. Swedish, English and Arabic support */}
      <LanguageSupportSection
        locale={locale}
        heading={t("languageSupportTitle")}
        linkLabel={common("learnMore")}
      />

      {/* 9. Industries Economy Codes knows */}
      <IndustriesSection
        locale={locale}
        heading={t("industriesTitle")}
        readMoreLabel={common("readMore")}
        contactLabel={common("contactUs")}
      />

      {/* 10. Benefits */}
      <Section tone="tint">
        <Container>
          <SectionHeading title={t("benefitsTitle")} />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon, title, body }, index) => (
              <div key={index} className="flex flex-col gap-3">
                <IconTile icon={icon} />
                <h3 className="font-semibold">{getLocalized(title, locale)}</h3>
                <p className="text-muted-foreground text-body">
                  {getLocalized(body, locale)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 11. Frequently asked questions */}
      <Section tone="base">
        <Container size="narrow">
          <h2 className="text-section-h2 text-center font-semibold text-balance">
            {common("faqTitle")}
          </h2>
          <div className="mt-8">
            <FaqAccordion faqs={globalFaqs} locale={locale} />
          </div>
        </Container>
      </Section>

      {/* 12. Locations */}
      <Section tone="tint">
        <Container>
          <h2 className="text-section-h2 text-center font-semibold text-balance">
            {common("locationsTitle")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                locale={locale}
                directionsLabel={common("getDirections")}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* 13. Contact and consultation CTA */}
      <section className="bg-primary text-primary-foreground py-16 sm:py-20 lg:py-24">
        <Container
          size="narrow"
          className="flex flex-col items-center gap-6 text-center"
        >
          <h2 className="text-section-h2 font-semibold text-balance">
            {t("finalCtaTitle")}
          </h2>
          <p className="text-primary-foreground/85 text-body max-w-prose">
            {t("finalCtaSubtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              render={<Link href="/kontakt" />}
              size="lg"
              variant="secondary"
            >
              {t("heroCtaPrimary")}
            </Button>
            <Button
              render={<a href={business.phoneHref} />}
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              {t("heroCtaSecondary")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
