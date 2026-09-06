import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildOrganizationJsonLd } from "@/lib/structured-data/organization";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/marketing/Hero";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { LocationCard } from "@/components/marketing/LocationCard";
import { PersonProfileCard } from "@/components/marketing/PersonProfileCard";
import { AuthorizationSection } from "@/components/marketing/AuthorizationSection";
import { WhyAuthorizedSection } from "@/components/marketing/WhyAuthorizedSection";
import { NationwideDigitalSection } from "@/components/marketing/NationwideDigitalSection";
import { LanguageSupportSection } from "@/components/marketing/LanguageSupportSection";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/button";
import { business } from "@/content/business";
import { locations } from "@/content/locations";
import { hadi } from "@/content/people";
import { servicesList } from "@/content/services";
import { faqs } from "@/content/faqs";
import { benefits, heroContent, homeMeta, processSteps, whoWeHelp } from "@/content/home";

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

      {/* 1. Hero */}
      <Hero
        locale={locale}
        eyebrow={t("heroEyebrow")}
        title={getLocalized(heroContent.title, locale)}
        subtitle={getLocalized(heroContent.subtitle, locale)}
        primaryCtaLabel={t("heroCtaPrimary")}
        secondaryCtaLabel={t("heroCtaSecondary")}
        image={{
          src: "/media/optimized/hero.webp",
          width: 1600,
          height: 1068,
          alt: heroContent.imageAlt,
        }}
      />

      <section className="border-border bg-secondary/40 border-y">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-8 text-center sm:px-6 lg:px-8">
          <span dir="ltr" className="text-muted-foreground text-sm font-medium">
            Svenska · English · العربية
          </span>
          <span
            dir="ltr"
            className="text-muted-foreground inline-block text-sm font-medium"
          >
            {business.phone}
          </span>
        </div>
      </section>

      {/* 2. Verified authorization and trust */}
      <AuthorizationSection locale={locale} heading={t("trustTitle")} />

      {/* 3. Accounting services overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold">{t("servicesTitle")}</h2>
          <p className="text-muted-foreground mt-3">{t("servicesSubtitle")}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service) => (
            <ServiceCard
              key={service.key}
              service={service}
              locale={locale}
              readMoreLabel={common("readMore")}
            />
          ))}
        </div>
      </section>

      {/* 4. Why choose an authorized accounting firm? */}
      <WhyAuthorizedSection
        locale={locale}
        heading={t("whyAuthorizedTitle")}
        subheading={t("authorizationMeaningTitle")}
      />

      {/* 5. Digital accounting for companies throughout Sweden */}
      <NationwideDigitalSection locale={locale} heading={t("nationwideTitle")} />

      {/* 6. Who Economy Codes helps */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold">
            {common("whoWeHelp")}
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {getLocalized(whoWeHelp, locale).map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2
                  className="text-primary mt-0.5 shrink-0"
                  size={18}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. How the digital collaboration works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold">
          {t("collaborationTitle")}
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={index} className="flex flex-col gap-2">
              <span dir="ltr" className="text-primary text-sm font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold">{getLocalized(step.title, locale)}</h3>
              <p className="text-muted-foreground text-sm">
                {getLocalized(step.body, locale)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. About Hadi Al Maani */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-semibold">{t("aboutTitle")}</h2>
          <PersonProfileCard
            person={hadi}
            locale={locale}
            learnMoreLabel={common("learnMore")}
          />
        </div>
      </section>

      {/* 9. Swedish, English and Arabic support */}
      <LanguageSupportSection
        locale={locale}
        heading={t("languageSupportTitle")}
        linkLabel={common("learnMore")}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold">
          {t("benefitsTitle")}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, body }, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Icon className="text-primary" size={24} aria-hidden="true" />
              <h3 className="font-semibold">{getLocalized(title, locale)}</h3>
              <p className="text-muted-foreground text-sm">
                {getLocalized(body, locale)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Frequently asked questions */}
      <section className="bg-secondary/30 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold">
            {common("faqTitle")}
          </h2>
          <div className="mt-8">
            <FaqAccordion faqs={globalFaqs} locale={locale} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold">
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
      </section>

      {/* 11. Contact and consultation CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold">{t("finalCtaTitle")}</h2>
          <p className="text-primary-foreground/85 max-w-prose">
            {t("finalCtaSubtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button render={<Link href="/kontakt" />} size="lg" variant="secondary">
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
        </div>
      </section>
    </>
  );
}
