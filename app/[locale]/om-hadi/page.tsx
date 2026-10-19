import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Languages,
  MessageCircle,
  Phone,
  ShieldCheck,
  UserCheck,
  Wallet,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import {
  getAbsoluteUrl,
  getAlternateLinks,
  getServiceSlug,
} from "@/lib/routes";
import { getPageContent } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealScale } from "@/components/motion/RevealScale";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { hadi } from "@/content/people";
import { business } from "@/content/business";
import { faqs } from "@/content/faqs";
import { servicesList } from "@/content/services";
import { authorizationContent } from "@/content/home";
import {
  serviceGroups,
  getServiceGroup,
  getServiceIcon,
  type ServiceGroup,
} from "@/content/service-icons";
import { buildPersonJsonLd } from "@/lib/structured-data/person";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";

const GROUP_ORDER: ServiceGroup[] = ["core", "advisory", "specialist"];
const ABOUT_FAQ_IDS = [
  "faq-global-what-is-authorized-firm",
  "faq-global-why-hire-authorized",
  "faq-global-consultant-vs-auditor",
  "faq-global-arabic-support",
];
const CREDENTIAL_ICONS = [UserCheck, Wallet];
const LANGUAGE_LABELS = ["Svenska", "English", "العربية"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("om-hadi", locale, {
    alternates: getAlternateLinks("/om-hadi"),
  });
}

export default async function AboutHadiPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const tAbout = await getTranslations({ locale, namespace: "about" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const page = await getPageContent("om-hadi");

  const aboutUrl = getAbsoluteUrl("/om-hadi", locale);
  const personJsonLd = buildPersonJsonLd(hadi, locale, aboutUrl);
  const aboutFaqs = ABOUT_FAQ_IDS.map((id) =>
    faqs.find((faq) => faq.id === id),
  ).filter((faq) => faq !== undefined);
  const groupedServices = GROUP_ORDER.map((group) => ({
    group,
    label: serviceGroups[group][locale],
    services: servicesList.filter((s) => getServiceGroup(s.key) === group),
  })).filter((g) => g.services.length > 0);

  return (
    <>
      <JsonLd data={personJsonLd} />
      {aboutFaqs.length > 0 && (
        <JsonLd data={buildFaqJsonLd(aboutFaqs, locale)} />
      )}
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: nav("about"), url: aboutUrl },
        ])}
      />

      <Section tone="base" className="py-6 sm:py-8">
        <Container>
          <Breadcrumbs
            items={[
              { label: nav("home"), routeKey: "/" },
              { label: nav("about") },
            ]}
          />
        </Container>
      </Section>

      {/* Profile hero */}
      <Section tone="gradient" bleed className="pt-2 pb-16 sm:pt-4 sm:pb-20">
        <GridPattern className="inset-0 hidden size-full text-white/[0.08] sm:block" />
        <RadialGlow className="-end-40 top-1/3 size-[42rem] -translate-y-1/2" />

        <Container>
          <div className="relative grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 flex flex-col gap-6 md:order-1">
              <Reveal delay={0}>
                <span className="text-brand-bright text-sm font-semibold tracking-wide uppercase">
                  {nav("about")}
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-page-h1 font-semibold text-balance text-white">
                  {hadi.name}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="text-brand-bright text-lg font-medium text-balance">
                  {getLocalized(hadi.title, locale)}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-body max-w-prose text-white/80">
                  {getLocalized(page.text.bio, locale)}
                </p>
              </Reveal>
              <Reveal delay={260}>
                <div className="flex flex-wrap gap-2">
                  {authorizationContent.person.credentials.map(
                    (credential) => (
                      <span
                        key={credential}
                        dir="ltr"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                      >
                        <ShieldCheck
                          size={14}
                          className="text-brand-bright shrink-0"
                          aria-hidden="true"
                        />
                        {credential}
                      </span>
                    ),
                  )}
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button
                    render={<Link href="/kontakt" />}
                    variant="shine"
                    size="xl"
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
                    className="inline-flex items-center gap-2 px-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                  >
                    <Phone
                      size={16}
                      aria-hidden="true"
                      className="text-brand-bright"
                    />
                    <span dir="ltr">{business.phone}</span>
                  </a>
                  {business.whatsappHref && (
                    <a
                      href={business.whatsappHref}
                      className="inline-flex items-center gap-2 px-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                    >
                      <MessageCircle
                        size={16}
                        aria-hidden="true"
                        className="text-brand-bright"
                      />
                      WhatsApp
                    </a>
                  )}
                  <a
                    href={hadi.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("facebook")}
                    className="inline-flex items-center px-2 text-white/90 transition-colors hover:text-white"
                  >
                    <FacebookIcon size={18} />
                  </a>
                </div>
              </Reveal>
            </div>

            <RevealScale delay={200} className="relative order-1 md:order-2">
              <div className="relative mx-auto aspect-[400/439] max-w-xs sm:max-w-sm">
                <div
                  aria-hidden="true"
                  className="absolute inset-4 -rotate-2 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-sm"
                />
                <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                  <Image
                    src={page.images.heroPhoto.src}
                    alt={getLocalized(page.images.heroPhoto.alt, locale)}
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 640px) 384px, 320px"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="from-brand-navy/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                  />
                </div>

                <div
                  dir="ltr"
                  className="absolute start-6 -top-4 flex items-center gap-2 rounded-xl border border-white/15 bg-brand-navy/90 px-3 py-2 shadow-md backdrop-blur-sm animate-[eco-float_5s_ease-in-out_infinite] [animation-delay:-2s]"
                >
                  <ShieldCheck
                    size={16}
                    className="text-brand-bright shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold whitespace-nowrap text-white">
                    {authorizationContent.firm.credential}
                  </span>
                </div>
                <div
                  dir="ltr"
                  className="absolute -end-4 bottom-8 rounded-full border border-white/15 bg-brand-navy/90 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-md backdrop-blur-sm animate-[eco-float_4.5s_ease-in-out_infinite] [animation-delay:-1.3s]"
                >
                  Svenska · English · العربية
                </div>
              </div>
            </RevealScale>
          </div>
        </Container>
      </Section>

      {/* Personal authorization detail */}
      <Section tone="base">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              eyebrow={authorizationContent.issuingBody.name}
              title={tAbout("credentialsTitle")}
              lead={getLocalized(authorizationContent.person.body, locale)}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {authorizationContent.person.credentialDetails.map(
              (credential, index) => {
                const Icon = CREDENTIAL_ICONS[index] ?? UserCheck;
                return (
                  <Reveal key={credential.label} delay={120 + index * 80}>
                    <FeatureCard>
                      <IconTile icon={Icon} tone="primary" size="lg" />
                      <span
                        dir="ltr"
                        className="border-primary/20 text-primary inline-block w-fit rounded-full border-2 px-4 py-1.5 text-sm font-semibold"
                      >
                        {credential.label}
                      </span>
                      <p className="text-muted-foreground text-body">
                        {getLocalized(credential.body, locale)}
                      </p>
                    </FeatureCard>
                  </Reveal>
                );
              },
            )}
          </div>
        </Container>
      </Section>

      {/* Areas of expertise */}
      <Section tone="tint">
        <Container>
          <Reveal>
            <SectionHeading
              title={tAbout("expertiseTitle")}
              lead={tAbout("expertiseLead")}
            />
          </Reveal>

          <div className="mt-12 flex flex-col gap-10">
            {groupedServices.map(({ group, label, services }) => (
              <div key={group}>
                <h3 className="text-muted-foreground mb-5 text-sm font-semibold tracking-wide uppercase">
                  {label}
                </h3>
                <RevealGroup
                  step={50}
                  className="flex flex-wrap gap-3"
                >
                  {services.map((service) => {
                    const Icon = getServiceIcon(service.key);
                    return (
                      <Link
                        key={service.key}
                        href={{
                          pathname: "/tjanster/[slug]",
                          params: { slug: getServiceSlug(locale, service) },
                        }}
                        className="border-border bg-card hover:border-primary/40 hover:text-primary flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 ease-(--ease-standard) hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <Icon
                          size={16}
                          className="text-primary shrink-0"
                          aria-hidden="true"
                        />
                        {getLocalized(service.name, locale)}
                      </Link>
                    );
                  })}
                </RevealGroup>
              </div>
            ))}
          </div>

          <Reveal delay={120}>
            <Button
              render={<Link href="/tjanster" />}
              variant="outline"
              size="lg"
              className="mt-10 gap-2"
            >
              {tAbout("seeAllServices")}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="rtl:rotate-180"
              />
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Languages */}
      <Section tone="gradient" bleed>
        <Container size="narrow" className="relative text-center">
          <Reveal>
            <IconTile icon={Languages} tone="white" className="mx-auto" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-section-h2 mt-5 font-semibold text-balance">
              {tAbout("languagesTitle")}
            </h2>
          </Reveal>
          <div
            dir="ltr"
            className="mt-6 flex justify-center gap-2 text-sm font-medium text-white/70"
          >
            {LANGUAGE_LABELS.map((label, index) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Reveal delay={160 + index * 80} className="inline-block">
                  <span>{label}</span>
                </Reveal>
                {index < LANGUAGE_LABELS.length - 1 && (
                  <span aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      {aboutFaqs.length > 0 && (
        <Section tone="tint">
          <Container size="narrow">
            <Reveal>
              <h2 className="text-section-h2 text-center font-semibold text-balance">
                {t("faqTitle")}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10">
                <FaqAccordion faqs={aboutFaqs} locale={locale} />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Final CTA */}
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
            <div className="border-border relative aspect-square w-24 overflow-hidden rounded-2xl border-2 border-white/30 shadow-lg">
              <Image
                src={page.images.photo.src}
                alt={getLocalized(page.images.photo.alt, locale)}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-section-h2 font-semibold text-balance">
              {tAbout("ctaTitle")}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-body max-w-prose text-white/85">
              {tAbout("ctaSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                render={<Link href="/kontakt" />}
                size="xl"
                variant="secondary"
              >
                {t("contactUs")}
              </Button>
              <Button
                render={<a href={business.phoneHref} />}
                size="xl"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Phone size={18} aria-hidden="true" />
                {t("callUs")}
              </Button>
              {business.whatsappHref && (
                <Button
                  render={<a href={business.whatsappHref} />}
                  size="xl"
                  variant="whatsapp"
                  className="gap-2"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  WhatsApp
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
