import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Code2 } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getAbsoluteUrl, getAlternateLinks } from "@/lib/routes";
import { getInquiryHref } from "@/lib/contact-links";
import { getPageContent } from "@/lib/cms/content";
import { getCmsIcon } from "@/lib/cms/icons";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getDevelopmentOgImageUrl } from "@/lib/seo/og-image";
import { getLocalized } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";
import { faqs } from "@/content/faqs";
import { offerings } from "@/content/offerings";
import { services } from "@/content/services";
import {
  DEVELOPMENT_HUB_FAQ_IDS,
  developmentAreas,
} from "@/content/development";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { IconTile } from "@/components/marketing/IconTile";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ContactActions } from "@/components/page/ContactActions";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqBlock } from "@/components/page/FaqBlock";
import { PageBreadcrumbs } from "@/components/page/PageBreadcrumbs";
import { PageHero } from "@/components/page/PageHero";
import { ProcessSteps } from "@/components/page/ProcessSteps";
import { ServiceCatalogJsonLd } from "@/components/page/ServiceCatalogJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("systemutveckling", locale, {
    alternates: getAlternateLinks("/systemutveckling"),
    ogImage: getDevelopmentOgImageUrl(locale),
  });
}

/**
 * Systemutveckling: the software development offering's landing page. Every
 * heading, list and collection below is editable in the dashboard
 * (lib/cms/pages/development.ts); the services themselves live in
 * content/services-digital.ts (group "development").
 */
export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations({ locale, namespace: "common" });
  const page = await getPageContent("systemutveckling");
  const { text, lists, collections } = page;
  const offering = offerings.utveckling;
  const hubUrl = getAbsoluteUrl("/systemutveckling", locale);
  const t = (key: string) => getLocalized(text[key], locale);

  const hubFaqs = DEVELOPMENT_HUB_FAQ_IDS.map((id) =>
    faqs.find((faq) => faq.id === id),
  ).filter((faq) => faq !== undefined);
  // Area icons and labels come from the CMS; which services sit in each
  // area is fixed in content/development.ts.
  const areas = developmentAreas.map((area, index) => ({
    key: area.label.sv,
    icon: getCmsIcon(collections.areas?.[index]?.icon?.sv),
    label: getLocalized(
      collections.areas?.[index]?.label ?? area.label,
      locale,
    ),
    services: area.serviceKeys.map((key) => services[key]).filter(Boolean),
  }));
  const inquiry = (tone: "light" | "dark", ctaId: string) => (
    <ContactActions
      href={getInquiryHref(locale, offering.inquiry)}
      label={getLocalized(offering.cta, locale)}
      tone={tone}
      ctaId={ctaId}
    />
  );

  return (
    <>
      <ServiceCatalogJsonLd
        locale={locale}
        name={t("heroTitle")}
        serviceType={getLocalized(offering.label, locale)}
        description={getLocalized(page.seo.description, locale)}
        url={hubUrl}
        services={areas.flatMap((area) => area.services)}
      />

      <PageHero
        breadcrumbs={
          <PageBreadcrumbs
            locale={locale}
            items={[{ label: getLocalized(offering.label, locale) }]}
            currentUrl={hubUrl}
          />
        }
        eyebrow={t("eyebrow")}
        eyebrowIcon={Code2}
        title={t("heroTitle")}
        lead={<p>{t("heroLead")}</p>}
        actions={inquiry("light", "development-hero")}
        visual={<AbstractDocumentPanel icon={Code2} tone="light" />}
        hideVisualOnMobile
      />

      {/* Answer-first definition + quotable facts, for featured snippets and AI answers */}
      <Section tone="base">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="text-section-h2 font-semibold text-balance">
                  {t("introTitle")}
                </h2>
                {getLocalized(lists.introParagraphs, locale).map(
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
                <h2 className="text-lg font-semibold">{t("factsTitle")}</h2>
                <dl className="divide-border mt-4 divide-y">
                  {collections.facts.map(({ label, value }, index) => (
                    <div
                      key={index}
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

      {/* All development services, grouped by area */}
      <Section tone="tint" id="tjanster" className="scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading title={t("servicesTitle")} />
          </Reveal>
          <div className="mt-12 flex flex-col gap-12">
            {areas.map(({ key, icon, label, services: areaServices }) => (
              <div key={key}>
                <div className="mb-5 flex items-center gap-3">
                  <IconTile icon={icon} size="sm" />
                  <h3 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                    {label}
                  </h3>
                </div>
                <RevealGroup step={60} className="grid gap-4 sm:grid-cols-2">
                  {areaServices.map((service) => (
                    <ServiceCard
                      key={service.key}
                      service={service}
                      locale={locale}
                      readMoreLabel={common("readMore")}
                    />
                  ))}
                </RevealGroup>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <ProcessSteps
        locale={locale}
        title={t("processTitle")}
        steps={collections.processSteps.map(({ title, body }) => ({
          title,
          body,
        }))}
      />

      {/* Why us */}
      <Section tone="tint">
        <Container>
          <Reveal>
            <SectionHeading title={t("benefitsTitle")} />
          </Reveal>
          <RevealGroup
            step={100}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {collections.benefits.map(({ icon, title, body }, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl p-6",
                  index % 2 === 0 && "bg-card border-border border shadow-sm",
                )}
              >
                <IconTile icon={getCmsIcon(icon?.sv)} />
                <h3 className="font-semibold">{getLocalized(title, locale)}</h3>
                <p className="text-muted-foreground text-body">
                  {getLocalized(body, locale)}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <FaqBlock faqs={hubFaqs} locale={locale} title={t("faqTitle")} />

      <CtaBand
        title={t("ctaTitle")}
        body={t("ctaSubtitle")}
        actions={inquiry("dark", "development-cta-band")}
      />
    </>
  );
}
