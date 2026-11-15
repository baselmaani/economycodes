import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Calculator, LayoutDashboard } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getAbsoluteUrl, getAlternateLinks } from "@/lib/routes";
import { getInquiryHref } from "@/lib/contact-links";
import { getLocalized } from "@/lib/i18n-content";
import { getPageContent } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getServicesListOgImageUrl } from "@/lib/seo/og-image";
import { cn } from "@/lib/utils";
import {
  ACCOUNTING_HUB_FAQ_IDS,
  accountingFit,
  accountingHero,
  accountingSections,
} from "@/content/accounting";
import { faqs } from "@/content/faqs";
import { processSteps } from "@/content/home";
import { offerings } from "@/content/offerings";
import { servicesList } from "@/content/services";
import { ACCOUNTING_GROUPS, groupServices } from "@/content/service-icons";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { IconTile } from "@/components/marketing/IconTile";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { CheckList } from "@/components/page/CheckList";
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
  return buildPageMetadata("tjanster", locale, {
    alternates: getAlternateLinks("/tjanster"),
    ogImage: getServicesListOgImageUrl(locale),
  });
}

/**
 * Redovisning: the accounting offering's landing page. Marketing services
 * have their own hub (/digital-marknadsforing) and are not listed here.
 */
export default async function AccountingHubPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations({ locale, namespace: "common" });
  const page = await getPageContent("tjanster");
  const offering = offerings.redovisning;
  const label = getLocalized(offering.label, locale);
  const pageUrl = getAbsoluteUrl("/tjanster", locale);
  const intro = getLocalized(page.text.intro, locale);

  const grouped = groupServices(servicesList, ACCOUNTING_GROUPS, locale);
  const hubFaqs = ACCOUNTING_HUB_FAQ_IDS.map((id) =>
    faqs.find((faq) => faq.id === id),
  ).filter((faq) => faq !== undefined);
  const consultation = (tone: "light" | "dark", ctaId: string) => (
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
        name={getLocalized(page.text.heading, locale)}
        serviceType={label}
        description={intro}
        url={pageUrl}
        services={grouped.flatMap((group) => group.services)}
      />

      <PageHero
        breadcrumbs={
          <PageBreadcrumbs
            locale={locale}
            items={[{ label }]}
            currentUrl={pageUrl}
          />
        }
        eyebrow={getLocalized(accountingHero.eyebrow, locale)}
        eyebrowIcon={Calculator}
        title={getLocalized(page.text.heading, locale)}
        lead={<p>{intro}</p>}
        actions={consultation("light", "accounting-hero")}
        visual={<AbstractDocumentPanel icon={Calculator} tone="light" />}
        hideVisualOnMobile
      />

      {/* Who it's for, and the difference from doing it yourself in the software */}
      <Section tone="base">
        <Container>
          <Reveal>
            <SectionHeading
              title={getLocalized(accountingFit.title, locale)}
              lead={getLocalized(accountingFit.lead, locale)}
            />
          </Reveal>
          <RevealGroup step={100} className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="border-primary/40 bg-card ring-primary/10 flex h-full flex-col gap-5 rounded-2xl border p-6 shadow-sm ring-4 sm:p-8">
              <div className="flex items-center gap-3">
                <IconTile icon={Calculator} />
                <h3 className="text-xl font-semibold">
                  {getLocalized(accountingFit.firm.title, locale)}
                </h3>
              </div>
              <CheckList
                items={getLocalized(accountingFit.firm.points, locale)}
              />
            </div>
            <div className="border-border bg-card flex h-full flex-col gap-5 rounded-2xl border p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <IconTile icon={LayoutDashboard} />
                <h3 className="text-xl font-semibold">
                  {getLocalized(accountingFit.software.title, locale)}
                </h3>
              </div>
              <CheckList
                items={getLocalized(accountingFit.software.points, locale)}
              />
              <Link
                href="/bokforingsprogram"
                className="text-primary focus-visible:ring-ring/50 mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-sm text-sm font-semibold hover:underline focus-visible:ring-3 focus-visible:outline-none"
              >
                {getLocalized(accountingFit.software.link, locale)}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="rtl:rotate-180"
                />
              </Link>
            </div>
          </RevealGroup>
        </Container>
      </Section>

      {/* What's included: every accounting service, grouped */}
      <Section tone="tint" id="tjanster" className="scroll-mt-20">
        <Container>
          <Reveal>
            <SectionHeading
              title={getLocalized(accountingSections.servicesTitle, locale)}
              lead={getLocalized(accountingSections.servicesLead, locale)}
            />
          </Reveal>
          <div className="mt-12 flex flex-col gap-12">
            {grouped.map(({ group, label: groupLabel, services }) => {
              const isCore = group === "core";
              return (
                <div key={group}>
                  <h3 className="text-muted-foreground mb-5 text-sm font-semibold tracking-wide uppercase">
                    {groupLabel}
                  </h3>
                  <RevealGroup
                    step={60}
                    className={cn(
                      "grid gap-4",
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

      <ProcessSteps
        locale={locale}
        title={getLocalized(accountingSections.processTitle, locale)}
        steps={processSteps}
      />

      <FaqBlock
        faqs={hubFaqs}
        locale={locale}
        title={common("faqTitle")}
        tone="tint"
      />

      <CtaBand
        title={getLocalized(accountingSections.ctaTitle, locale)}
        body={getLocalized(accountingSections.ctaBody, locale)}
        actions={consultation("dark", "accounting-cta-band")}
      />
    </>
  );
}
