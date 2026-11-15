import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAbsoluteUrl, getAlternateLinks } from "@/lib/routes";
import { CONTACT_FORM_ID } from "@/lib/contact-links";
import { getPageContent } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceOptions } from "@/lib/service-lookup";
import { inquiryTopicList } from "@/content/inquiries";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInquiryPrefill } from "@/components/forms/ContactInquiryPrefill";
import { ContactMethods } from "@/components/marketing/ContactMethods";
import { Reveal } from "@/components/motion/Reveal";
import { PageBreadcrumbs } from "@/components/page/PageBreadcrumbs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata("kontakt", locale, {
    alternates: getAlternateLinks("/kontakt"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });
  const page = await getPageContent("kontakt");

  return (
    <Container className="py-12 sm:py-16">
      <PageBreadcrumbs
        locale={locale}
        items={[{ label: nav("contact") }]}
        currentUrl={getAbsoluteUrl("/kontakt", locale)}
      />
      <h1 className="text-page-h1 mt-4 font-semibold text-balance">
        {getLocalized(page.text.heading, locale)}
      </h1>
      <p className="text-muted-foreground text-body mt-3 max-w-2xl">
        {getLocalized(page.text.intro, locale)}
      </p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal delay={80} className="order-last lg:order-first">
          <div className="flex flex-col gap-4">
            <ContactMethods />
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <Clock size={16} aria-hidden="true" className="text-primary" />
              {getLocalized(page.text.responseTime, locale)}
            </p>
          </div>
        </Reveal>
        <div id={CONTACT_FORM_ID} className="scroll-mt-24">
          <ContactForm
            locale={locale}
            serviceOptions={getServiceOptions(locale)}
            variant="card"
            title={getLocalized(page.text.formTitle, locale)}
            titleAs="h2"
          />
          <Suspense fallback={null}>
            <ContactInquiryPrefill
              topics={inquiryTopicList.map((topic) => ({
                query: topic.query,
                value: topic.value,
                message: getLocalized(topic.message, locale),
              }))}
            />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
