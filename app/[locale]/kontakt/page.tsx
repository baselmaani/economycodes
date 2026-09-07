import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { LocationCard } from "@/components/marketing/LocationCard";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { business } from "@/content/business";
import { locations } from "@/content/locations";

const metaDescription = {
  sv: "Kontakta Economy Codes för redovisning, skattedeklaration eller andra företagsfrågor.",
  en: "Contact Economy Codes for accounting, tax returns, or other business questions.",
  ar: "تواصل مع Economy Codes بخصوص المحاسبة أو الإقرارات الضريبية أو أي استفسارات أخرى متعلقة بالأعمال.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  return buildMetadata({
    locale,
    title: nav("contact"),
    description: getLocalized(metaDescription, locale),
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
  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const home = await getTranslations({ locale, namespace: "home" });

  return (
    <Container className="py-12 sm:py-16">
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
          {home("finalCtaSubtitle")}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <Reveal delay={80}>
          <div>
            <div className="border-border bg-card mb-8 flex flex-col gap-3 rounded-2xl border p-5">
              <a
                href={business.phoneHref}
                className="text-foreground hover:text-primary flex items-center gap-2 font-medium transition-colors"
              >
                <Phone size={18} aria-hidden="true" className="text-primary" />
                <span dir="ltr">{business.phone}</span>
              </a>
              <a
                href={`mailto:${business.email}`}
                className="text-foreground hover:text-primary flex items-center gap-2 font-medium transition-colors"
              >
                <Mail size={18} aria-hidden="true" className="text-primary" />
                {business.email}
              </a>
              <a
                href={business.whatsappHref}
                className="text-foreground hover:text-primary flex items-center gap-2 font-medium transition-colors"
              >
                <MessageCircle
                  size={18}
                  aria-hidden="true"
                  className="text-primary"
                />
                WhatsApp
              </a>
            </div>
            <ContactForm locale={locale} />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal>
            <h2 className="text-lg font-semibold">{t("locationsTitle")}</h2>
          </Reveal>
          <RevealGroup step={100} className="flex flex-col gap-6">
            {locations.map((location) => (
              <div key={location.id} className="flex flex-col gap-3">
                <LocationCard
                  location={location}
                  locale={locale}
                  directionsLabel={t("getDirections")}
                />
                <div className="border-border overflow-hidden rounded-2xl border">
                  <iframe
                    title={getLocalized(location.name, locale)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${location.streetAddress}, ${location.postalCode} ${location.city}, ${location.country}`,
                    )}&output=embed`}
                    className="h-64 w-full border-0"
                  />
                </div>
              </div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Container>
  );
}
