import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Handshake, MessageCircle, MessagesSquare, Search } from "lucide-react";

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
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealLine } from "@/components/motion/RevealLine";
import { cn } from "@/lib/utils";
import { business } from "@/content/business";
import { locations } from "@/content/locations";
import { hadi } from "@/content/people";
import { servicesList } from "@/content/services";
import { faqs } from "@/content/faqs";
import {
  authorizationContent,
  benefits,
  heroContent,
  homeMeta,
  processSteps,
} from "@/content/home";
import {
  serviceGroups,
  getServiceGroup,
  type ServiceGroup,
} from "@/content/service-icons";

const GROUP_ORDER: ServiceGroup[] = ["core", "advisory", "specialist"];
const PROCESS_STEP_ICONS = [MessagesSquare, Search, Handshake, MessageCircle];

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
          <Reveal>
            <SectionHeading
              title={t("servicesTitle")}
              lead={t("servicesSubtitle")}
            />
          </Reveal>
          <div className="mt-12 flex flex-col gap-12">
            {groupedServices.map(({ group, label, services }) => {
              const isCore = group === "core";
              return (
                <div key={group}>
                  <h3 className="text-muted-foreground mb-5 text-sm font-semibold tracking-wide uppercase">
                    {label}
                  </h3>
                  <RevealGroup
                    step={60}
                    className={cn(
                      "grid gap-6",
                      isCore
                        ? "sm:grid-cols-2"
                        : "sm:grid-cols-2 lg:grid-cols-3",
                    )}
                  >
                    {services.map((service) => (
                      <ServiceCard
                        key={service.key}
                        service={service}
                        locale={locale}
                        readMoreLabel={common("readMore")}
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
          <Reveal>
            <SectionHeading title={t("collaborationTitle")} />
          </Reveal>
          <div className="relative mt-14">
            <RevealLine
              axis="x"
              className="absolute inset-x-[12%] top-6 hidden h-px lg:block"
            >
              <div className="bg-border h-full w-full" />
            </RevealLine>
            <RevealLine
              axis="y"
              className="absolute start-6 top-0 bottom-0 w-px lg:hidden"
            >
              <div className="bg-border h-full w-full" />
            </RevealLine>
            <Reveal delay={120}>
              <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, index) => {
                  const StepIcon = PROCESS_STEP_ICONS[index] ?? MessageCircle;
                  return (
                    <li
                      key={index}
                      className="relative flex flex-col gap-3 ps-12 lg:ps-0"
                    >
                      <div className="bg-background border-border lg:bg-primary/10 absolute start-0 top-0 flex size-9 items-center justify-center rounded-full border lg:static lg:mb-1 lg:size-11 lg:border-0">
                        <StepIcon
                          size={18}
                          className="text-primary"
                          aria-hidden="true"
                        />
                      </div>
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
                  );
                })}
              </ol>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 7. About Hadi Al Maani */}
      <Section tone="tint">
        <Container size="narrow">
          <Reveal>
            <h2 className="text-section-h2 mb-8 font-semibold text-balance">
              {t("aboutTitle")}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="border-border bg-card rounded-3xl border p-8 shadow-md sm:p-10">
              <PersonProfileCard
                person={hadi}
                locale={locale}
                learnMoreLabel={common("learnMore")}
              />
              <div className="border-border mt-6 flex flex-wrap gap-2 border-t pt-6">
                {authorizationContent.person.credentials.map((credential) => (
                  <span
                    key={credential}
                    dir="ltr"
                    className="border-border bg-secondary/40 text-secondary-foreground rounded-full border px-3 py-1 text-sm font-medium"
                  >
                    {credential}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
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
          <Reveal>
            <SectionHeading title={t("benefitsTitle")} />
          </Reveal>
          <RevealGroup step={100} className="mt-12 grid gap-6 sm:grid-cols-2">
            {benefits.map(({ icon, title, body }, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl p-6",
                  index % 2 === 0 && "bg-card border-border border shadow-sm",
                  index % 2 === 1 && "lg:mt-8",
                )}
              >
                <IconTile icon={icon} />
                <h3 className="font-semibold">{getLocalized(title, locale)}</h3>
                <p className="text-muted-foreground text-body">
                  {getLocalized(body, locale)}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 11. Frequently asked questions */}
      <Section tone="base">
        <Container size="wide">
          <Reveal>
            <h2 className="text-section-h2 text-center font-semibold text-balance">
              {common("faqTitle")}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
              <FaqAccordion
                faqs={globalFaqs.slice(0, Math.ceil(globalFaqs.length / 2))}
                locale={locale}
              />
              <FaqAccordion
                faqs={globalFaqs.slice(Math.ceil(globalFaqs.length / 2))}
                locale={locale}
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 12. Locations */}
      <Section tone="tint">
        <Container>
          <Reveal>
            <h2 className="text-section-h2 text-center font-semibold text-balance">
              {common("locationsTitle")}
            </h2>
          </Reveal>
          <RevealGroup step={100} className="mt-10 grid gap-6 sm:grid-cols-2">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                locale={locale}
                directionsLabel={common("getDirections")}
              />
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 13. Contact and consultation CTA */}
      <Section tone="gradient" bleed>
        <Image
          src="/media/optimized/logo-stacked.webp"
          alt=""
          aria-hidden="true"
          width={280}
          height={280}
          className="pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.06]"
        />
        <div
          aria-hidden="true"
          className="bg-radial-glow pointer-events-none absolute top-0 left-1/2 size-[32rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        />
        <Container
          size="narrow"
          className="relative flex flex-col items-center gap-6 text-center"
        >
          <Reveal>
            <h2 className="text-section-h2 font-semibold text-balance">
              {t("finalCtaTitle")}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-body max-w-prose text-white/85">
              {t("finalCtaSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                render={<Link href="/kontakt" />}
                size="xl"
                variant="secondary"
              >
                {t("heroCtaPrimary")}
              </Button>
              <Button
                render={<a href={business.phoneHref} />}
                size="xl"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {t("heroCtaSecondary")}
              </Button>
              <Button
                render={<a href={business.whatsappHref} />}
                size="xl"
                variant="whatsapp"
                className="gap-2"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
