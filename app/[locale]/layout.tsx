import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { DirectionProvider } from "@base-ui/react/direction-provider";

import { routing, isRtlLocale, type AppLocale } from "@/i18n/routing";
import { defaultMetadataBase } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/marketing/StickyActionBar";
import { FloatingContactButtons } from "@/components/marketing/FloatingContactButtons";
import { SkipLink } from "@/components/common/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildSiteGraphJsonLd } from "@/lib/structured-data/organization";
import { getLocalized } from "@/lib/i18n-content";
import { business } from "@/content/business";
import { locations } from "@/content/locations";
import { homeMeta } from "@/content/home";
import { locationPages } from "@/content/location-pages";
import { getLocationAlternateLinks } from "@/lib/routes";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: defaultMetadataBase,
  title: {
    default: "Economy Codes",
    template: "%s | Economy Codes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#20275e",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Next.js allows the root layout to live under a dynamic segment
 * (app/[locale]/layout.tsx) for i18n -- this IS the root layout, owning
 * <html>/<body>. Reading locale from `params` (rather than the dynamic,
 * request-scoped next-intl getLocale()) keeps it static: known at build
 * time via generateStaticParams, so every page below can be fully
 * prerendered instead of server-rendered on every request. A URL that
 * doesn't match any locale segment at all is handled by
 * app/global-not-found.tsx, which supplies its own <html>/<body> since it
 * bypasses this layout entirely.
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale's pages.
  setRequestLocale(locale);

  const direction = isRtlLocale(locale) ? "rtl" : "ltr";
  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={direction}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${notoSansArabic.variable} h-full antialiased`}
    >
      <body
        // Bottom padding reserves room for the fixed mobile StickyActionBar
        // under the footer (not just under <main>), so nothing is hidden behind it.
        className={`flex min-h-full flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0 ${isArabic ? "font-arabic" : "font-sans"}`}
      >
        <link rel="llms.txt" href={`${siteUrl}/llms.txt`} />
        {/* Organization + WebSite on every page, so each page's Service,
            Article, Person and Breadcrumb nodes resolve to the same entity. */}
        <JsonLd
          data={buildSiteGraphJsonLd(
            business,
            locations,
            getLocalized(homeMeta.description, locale),
            (location) => {
              const page = locationPages.find(
                (p) => p.locationId === location.id,
              );
              return page
                ? {
                    url: getLocationAlternateLinks(page)[locale],
                    areaServed: page.nearbyAreas,
                  }
                : {};
            },
          )}
        />
        <NextIntlClientProvider locale={locale as AppLocale}>
          <DirectionProvider direction={direction}>
            <SkipLink />
            <Header locale={locale as AppLocale} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer locale={locale as AppLocale} />
            <StickyActionBar />
            <FloatingContactButtons />
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
