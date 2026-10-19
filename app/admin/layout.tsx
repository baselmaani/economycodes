import type { Metadata } from "next";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";

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

// Every admin route depends on the session cookie; never prerender one (a
// prerendered auth redirect would be served to signed-in users too).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Economy Codes admin" },
  robots: { index: false, follow: false },
};

/**
 * Separate root layout for the admin dashboard (the public site's root
 * layout is app/[locale]/layout.tsx). Not localized, and excluded from the
 * next-intl proxy matcher in proxy.ts.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${notoSansArabic.variable} h-full antialiased`}
    >
      <body className="bg-muted/40 min-h-full font-sans">{children}</body>
    </html>
  );
}
