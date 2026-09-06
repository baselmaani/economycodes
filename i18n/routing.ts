import { defineRouting } from "next-intl/routing";

export const locales = ["sv", "en", "ar"] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "sv";

export const rtlLocales: readonly AppLocale[] = ["ar"];

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale as AppLocale);
}

/**
 * Static path segments only. Dynamic segment *values* (service slugs, article
 * slugs) are resolved separately via lib/routes.ts against content/*.ts, since
 * next-intl's pathnames config cannot translate the value of a [slug] param.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: {
    mode: "as-needed",
  },
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/om-hadi": {
      sv: "/om-hadi",
      en: "/about-hadi",
      ar: "/عن-هادي",
    },
    "/tjanster": {
      sv: "/tjanster",
      en: "/services",
      ar: "/الخدمات",
    },
    "/tjanster/[slug]": {
      sv: "/tjanster/[slug]",
      en: "/services/[slug]",
      ar: "/الخدمات/[slug]",
    },
    "/kontakt": {
      sv: "/kontakt",
      en: "/contact",
      ar: "/اتصل-بنا",
    },
    "/artiklar": {
      sv: "/artiklar",
      en: "/insights",
      ar: "/مقالات",
    },
    "/artiklar/[slug]": {
      sv: "/artiklar/[slug]",
      en: "/insights/[slug]",
      ar: "/مقالات/[slug]",
    },
    "/integritetspolicy": {
      sv: "/integritetspolicy",
      en: "/privacy-policy",
      ar: "/سياسة-الخصوصية",
    },
    "/cookies": {
      sv: "/cookies",
      en: "/cookies",
      ar: "/ملفات-تعريف-الارتباط",
    },
    "/villkor": {
      sv: "/villkor",
      en: "/terms",
      ar: "/الشروط",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

/** Static pathnames only -- excludes dynamic routes like "/tjanster/[slug]", which must be linked via the {pathname, params} object form instead. */
export type StaticAppPathname = Exclude<AppPathname, `${string}[${string}`>;
