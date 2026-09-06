import type { Metadata } from "next";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import { getLocale } from "next-intl/server";

import { isRtlLocale } from "@/i18n/routing";
import { defaultMetadataBase } from "@/lib/seo/metadata";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: defaultMetadataBase,
  title: {
    default: "Economy Codes",
    template: "%s | Economy Codes",
  },
};

/**
 * This is the true root layout, so it owns the single <html>/<body> tag.
 * It reads the negotiated locale via getLocale() (resolved by middleware),
 * NOT via params, since the [locale] segment is a child route -- a layout
 * only receives params for its own segment chain, not descendants. The
 * nested app/[locale]/layout.tsx below adds NextIntlClientProvider, RTL
 * direction context, and the page chrome.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";
  const isArabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${manrope.variable} ${notoSansArabic.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col ${isArabic ? "font-arabic" : "font-sans"}`}
      >
        {children}
      </body>
    </html>
  );
}
