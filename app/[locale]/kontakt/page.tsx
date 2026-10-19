import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAbsoluteUrl, getAlternateLinks } from "@/lib/routes";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPageContent } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { ContactMethods } from "@/components/marketing/ContactMethods";

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
  const home = await getTranslations({ locale, namespace: "home" });
  const page = await getPageContent("kontakt");

  return (
    <Container className="py-12 sm:py-16">
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: nav("contact"), url: getAbsoluteUrl("/kontakt", locale) },
        ])}
      />
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("contact") },
        ]}
      />
      <Reveal>
        <h1 className="text-page-h1 mt-4 font-semibold text-balance">
          {nav("contact")}
        </h1>
        <p className="text-muted-foreground text-body mt-3 max-w-2xl">
          {getLocalized(page.text.intro, locale)}
        </p>
      </Reveal>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal delay={80}>
          <div className="flex flex-col gap-4">
            <ContactMethods />
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <Clock size={16} aria-hidden="true" className="text-primary" />
              {home("contactResponseTime")}
            </p>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <ContactForm
            locale={locale}
            variant="card"
            title={home("contactFormTitle")}
            titleAs="h2"
          />
        </Reveal>
      </div>
    </Container>
  );
}
