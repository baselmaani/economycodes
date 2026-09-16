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
 * Absolute URL of a service's own opengraph-image route (see
 * app/[locale]/tjanster/[slug]/opengraph-image.tsx). Uses the literal
 * internal "tjanster" route segment, same as getDefaultOgImageUrl() above --
 * not the next-intl-localized pathname (e.g. "/services", "/الخدمات").
 */
export function getServiceOgImageUrl(locale: AppLocale, slug: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return new URL(
    `${prefix}/tjanster/${slug}/opengraph-image`,
    siteUrl,
  ).toString();
}

/** Absolute URL of the services listing page's own opengraph-image route. */
export function getServicesListOgImageUrl(locale: AppLocale): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return new URL(`${prefix}/tjanster/opengraph-image`, siteUrl).toString();
}

/**
 * Absolute URL of an article's own opengraph-image route (see
 * app/[locale]/artiklar/[slug]/opengraph-image.tsx). Uses the literal
 * internal "artiklar" route segment, same as getDefaultOgImageUrl() above --
 * not the next-intl-localized pathname.
 */
export function getArticleOgImageUrl(locale: AppLocale, slug: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return new URL(
    `${prefix}/artiklar/${slug}/opengraph-image`,
    siteUrl,
  ).toString();
}

/**
 * Per-page branded OG card (eyebrow + title), reusing the default card's
 * navy/blue gradient and typography. `rtl` mirrors the whole layout to the
 * right edge for Arabic; the caller is responsible for passing an
 * Arabic-capable font to `ImageResponse` in that case, since Satori's
 * default fallback only covers Latin.
 */
export function buildBrandedOgCard({
  eyebrow,
  title,
  rtl = false,
}: {
  eyebrow?: string;
  title: string;
  rtl?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: rtl ? "flex-end" : "flex-start",
        padding: "80px",
        backgroundColor: "#1b2436",
        backgroundImage: "linear-gradient(135deg, #1b2436 0%, #282b66 100%)",
        fontFamily: rtl ? "Noto Sans Arabic" : "sans-serif",
        direction: rtl ? "rtl" : "ltr",
      }}
    >
      {eyebrow && (
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            color: "#4b93b6",
            letterSpacing: "-0.01em",
          }}
        >
          {eyebrow}
        </div>
      )}
      <div
        style={{
          display: "flex",
          marginTop: eyebrow ? 24 : 0,
          fontSize: 64,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 24,
          color: "#8fa0c2",
          fontFamily: "sans-serif",
          direction: "ltr",
        }}
      >
        Economy Codes AB
      </div>
    </div>
  );
}
