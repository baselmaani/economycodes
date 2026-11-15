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
    "/digital-marknadsforing": {
      sv: "/digital-marknadsforing",
      en: "/digital-marketing-agency-sweden",
      ar: "/شركة-تسويق-رقمي-في-السويد",
    },
    "/digital-marknadsforing/[slug]": {
      sv: "/digital-marknadsforing/[slug]",
      en: "/digital-marketing-agency-sweden/[slug]",
      ar: "/شركة-تسويق-رقمي-في-السويد/[slug]",
    },
    "/systemutveckling": {
      sv: "/systemutveckling",
      en: "/software-development",
      ar: "/تطوير-البرمجيات",
    },
    "/systemutveckling/[slug]": {
      sv: "/systemutveckling/[slug]",
      en: "/software-development/[slug]",
      ar: "/تطوير-البرمجيات/[slug]",
    },
    "/bokforingsprogram": {
      sv: "/bokforingsprogram",
      en: "/accounting-software",
      ar: "/برنامج-محاسبة",
    },
    "/bokforingsprogram/fakturering": {
      sv: "/bokforingsprogram/fakturering",
      en: "/accounting-software/invoicing",
      ar: "/برنامج-محاسبة/الفوترة",
    },
    "/bokforingsprogram/bokforing": {
      sv: "/bokforingsprogram/bokforing",
      en: "/accounting-software/bookkeeping",
      ar: "/برنامج-محاسبة/مسك-الدفاتر",
    },
    "/bokforingsprogram/lon": {
      sv: "/bokforingsprogram/lon",
      en: "/accounting-software/payroll",
      ar: "/برنامج-محاسبة/الرواتب",
    },
    "/bokforingsprogram/integrationer/skatteverket": {
      sv: "/bokforingsprogram/integrationer/skatteverket",
      en: "/accounting-software/integrations/skatteverket",
      ar: "/برنامج-محاسبة/التكاملات/skatteverket",
    },
    "/bokforingsprogram/integrationer/ai-mcp": {
      sv: "/bokforingsprogram/integrationer/ai-mcp",
      en: "/accounting-software/integrations/ai-mcp",
      ar: "/برنامج-محاسبة/التكاملات/ai-mcp",
    },
    "/redovisningsbyra/[slug]": {
      sv: "/redovisningsbyra/[slug]",
      en: "/accounting-firm/[slug]",
      ar: "/مكتب-محاسبة/[slug]",
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
