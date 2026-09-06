import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { DirectionProvider } from "@base-ui/react/direction-provider";

import { routing, isRtlLocale, type AppLocale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/marketing/StickyActionBar";
import { FloatingContactButtons } from "@/components/marketing/FloatingContactButtons";
import { SkipLink } from "@/components/common/SkipLink";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
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

  return (
    <NextIntlClientProvider locale={locale as AppLocale}>
      <DirectionProvider direction={direction}>
        <SkipLink />
        <Header locale={locale as AppLocale} />
        <main
          id="main-content"
          className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0"
        >
          {children}
        </main>
        <Footer locale={locale as AppLocale} />
        <StickyActionBar />
        <FloatingContactButtons />
      </DirectionProvider>
    </NextIntlClientProvider>
  );
}
