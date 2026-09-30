import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MessageCircle, Phone, TrendingUp } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import {
  getAbsoluteUrl,
  getAlternateLinks,
  getServiceAlternateLinks,
} from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getDigitalMarketingOgImageUrl } from "@/lib/seo/og-image";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { buildServiceCatalogJsonLd } from "@/lib/structured-data/service";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { IconTile } from "@/components/marketing/IconTile";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealScale } from "@/components/motion/RevealScale";
import { cn } from "@/lib/utils";
import { business } from "@/content/business";
import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import {
  DIGITAL_HUB_FAQ_IDS,
  digitalAreas,
  digitalBenefits,
  digitalFacts,
  digitalHero,
  digitalIntro,
  digitalMeta,
  digitalProcessSteps,
} from "@/content/digital-marketing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: getLocalized(digitalMeta.title, locale),
    description: getLocalized(digitalMeta.description, locale),
    alternates: getAlternateLinks("/digital-marknadsforing"),
    ogImage: getDigitalMarketingOgImageUrl(locale),
  });
}

export default async function DigitalMarketingPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const d = await getTranslations({ locale, namespace: "digital" });

  const hubFaqs = DIGITAL_HUB_FAQ_IDS.map((id) =>
    faqs.find((faq) => faq.id === id),
  ).filter((faq) => faq !== undefined);
  const areas = digitalAreas.map((area) => ({
    ...area,
    services: area.serviceKeys.map((key) => services[key]).filter(Boolean),
  }));
  const hubUrl = getAbsoluteUrl("/digital-marknadsforing", locale);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: nav("digitalMarketing"), url: hubUrl },
        ])}
      />
      <JsonLd
        data={buildServiceCatalogJsonLd({
          name: getLocalized(digitalMeta.title, locale),
          serviceType: "Digital marketing",
          description: getLocalized(digitalMeta.description, locale),
          url: hubUrl,
          locale,
          entries: areas.flatMap((area) =>
            area.services.map((service) => ({
              name: getLocalized(service.name, locale),
              description: getLocalized(service.summary, locale),
              url: getServiceAlternateLinks(service)[locale],
            })),
          ),
        })}
      />
      <JsonLd data={buildFaqJsonLd(hubFaqs, locale)} />

      {/* Hero */}
      <Section tone="tint" bleed>
        <GridPattern className="inset-0 hidden size-full sm:block" />
        <RadialGlow className="-end-32 -top-24 size-[32rem] opacity-10" />

        <Container size="wide" className="relative">
          <Breadcrumbs
            items={[
              { label: nav("home"), routeKey: "/" },
              { label: nav("digitalMarketing") },
            ]}
          />

          <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <div>
                <Badge className="h-auto gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
                  <TrendingUp size={14} aria-hidden="true" />
                  {d("eyebrow")}
                </Badge>
                <h1 className="text-page-h1 mt-4 font-semibold text-balance">
                  {getLocalized(digitalHero.title, locale)}
                </h1>
                <p className="text-muted-foreground text-body mt-4">
                  {getLocalized(digitalHero.lead, locale)}
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
                    <Phone
                      size={16}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    <span dir="ltr">{business.phone}</span>
                  </a>
                  <a
                    href={business.whatsappHref}
                    className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <MessageCircle
                      size={16}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <RevealScale delay={120} className="order-first md:order-last">
              <AbstractDocumentPanel icon={TrendingUp} tone="light" />
            </RevealScale>
          </div>
        </Container>
      </Section>

      {/* Answer-first definition + quotable facts, for featured snippets and AI answers */}
      <Section tone="base">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-section-h2 font-semibold text-balance">
                  {getLocalized(digitalIntro.title, locale)}
                </h2>
                {getLocalized(digitalIntro.paragraphs, locale).map(
                  (paragraph) => (
                    <p
                      key={paragraph}
                      className="text-muted-foreground text-body mt-4"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <aside className="border-border bg-card rounded-2xl border p-6 shadow-sm sm:p-8">
                <h2 className="text-lg font-semibold">
                  {getLocalized(digitalFacts.title, locale)}
                </h2>
                <dl className="divide-border mt-4 divide-y">
                  {digitalFacts.items.map(({ label, value }) => (
                    <div
                      key={label.sv}
                      className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"
                    >
                      <dt className="text-muted-foreground text-sm font-medium">
                        {getLocalized(label, locale)}
                      </dt>
                      <dd className="text-sm">{getLocalized(value, locale)}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* All digital services, grouped by area */}
      <Section tone="tint">
        <Container>
          <Reveal>
            <SectionHeading title={d("servicesTitle")} />
          </Reveal>
          <div className="mt-12 flex flex-col gap-12">
            {areas.map(({ icon, label, services: areaServices }) => (
              <div key={label.sv}>
                <div className="mb-5 flex items-center gap-3">
                  <IconTile icon={icon} size="sm" />
                  <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                    {getLocalized(label, locale)}
                  </h3>
                </div>
                <RevealGroup
                  step={60}
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {areaServices.map((service) => (
                    <ServiceCard
                      key={service.key}
                      service={service}
                      locale={locale}
                      readMoreLabel={t("readMore")}
                    />
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How we work */}
      <Section tone="base">
        <Container size="wide">
          <Reveal>
            <SectionHeading title={d("processTitle")} />
          </Reveal>
          <Reveal delay={120}>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {digitalProcessSteps.map((step, index) => (
                <li key={index} className="flex flex-col gap-3">
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
          </Reveal>
        </Container>
      </Section>

      {/* Why us */}
      <Section tone="tint">
        <Container>
          <Reveal>
            <SectionHeading title={d("benefitsTitle")} />
          </Reveal>
          <RevealGroup
            step={100}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {digitalBenefits.map(({ icon, title, body }, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl p-6",
                  index % 2 === 0 && "bg-card border-border border shadow-sm",
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

      {/* FAQ */}
      <Section tone="base">
        <Container size="content">
          <Reveal>
            <h2 className="text-section-h2 text-center font-semibold text-balance">
              {t("faqTitle")}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10">
              <FaqAccordion faqs={hubFaqs} locale={locale} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="gradient" bleed>
        <GridPattern className="inset-0 hidden size-full text-white/[0.08] sm:block" />
        <Container
          size="narrow"
          className="relative flex flex-col items-center gap-6 text-center"
        >
          <Reveal>
            <h2 className="text-section-h2 font-semibold text-balance">
              {d("ctaTitle")}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-body max-w-prose text-white/85">
              {d("ctaSubtitle")}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Button
              render={<Link href="/kontakt" />}
              size="xl"
              variant="secondary"
              className="gap-2"
            >
              {t("contactUs")}
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="rtl:rotate-180"
              />
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
