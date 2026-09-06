import { routing, type AppLocale } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

export const alt = "Economy Codes AB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Absolute URL of the locale-scoped opengraph-image/twitter-image route
 * (see app/[locale]/opengraph-image.tsx). Next.js's file-convention fallback
 * only applies to pages that don't define their own `openGraph` metadata --
 * every page here does (via buildMetadata()), so buildMetadata() links to
 * this URL explicitly instead of relying on that auto-merge.
 */
export function getDefaultOgImageUrl(locale: AppLocale): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return new URL(`${prefix}/opengraph-image`, siteUrl).toString();
}

/**
 * One universal, locale-agnostic brand card, reused as the site-wide default
 * whenever a page doesn't pass a more specific `ogImage` to buildMetadata().
 * Deliberately plain text/CSS (no embedded logo asset, no custom fonts) so it
 * renders reliably through Satori/resvg without format or bundle-size risk.
 */
export const ogCardElement = (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px",
      backgroundColor: "#1b2436",
      backgroundImage: "linear-gradient(135deg, #1b2436 0%, #282b66 100%)",
      fontFamily: "sans-serif",
    }}
  >
    <div
      style={{
        width: 72,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#4b93b6",
        marginBottom: 40,
      }}
    />
    <div
      style={{
        display: "flex",
        fontSize: 72,
        fontWeight: 700,
        color: "#ffffff",
        letterSpacing: "-0.02em",
      }}
    >
      Economy Codes AB
    </div>
    <div
      style={{
        display: "flex",
        marginTop: 24,
        fontSize: 32,
        color: "#c7d1e6",
      }}
    >
      Authorized Accounting Firm in Sweden
    </div>
    <div
      style={{
        display: "flex",
        marginTop: 48,
        fontSize: 24,
        color: "#8fa0c2",
      }}
    >
      Bookkeeping · Payroll · Tax Returns · Business Advisory
    </div>
  </div>
);
