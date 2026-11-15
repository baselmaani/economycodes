import type { StaticAppPathname } from "@/i18n/routing";
import type { InquiryTopicKey } from "./inquiries";
import { softwarePages } from "./software";
import type { Localized } from "./types";

/**
 * The four things Economy Codes AB offers, in the order of the homepage
 * entry points (hero and "areas" cards). Utveckling was added last so that
 * the dashboard's saved "areas" cards, which are matched by position, stay
 * with their offering. Navigation, footer and contact topics set their own
 * order.
 * Imported by client components via content/nav.ts, so keep it free of
 * large content modules.
 *
 * The main distinction visitors need is between Redovisning (we do the
 * bookkeeping for you) and Bokföringsprogram (you do it yourself in our
 * software); `whoDoesIt` states that in one line on every entry point.
 */
export type OfferingKey =
  "redovisning" | "marknadsforing" | "utveckling" | "bokforingsprogram";

export interface Offering {
  key: OfferingKey;
  /** Hub page; keep in sync with i18n/routing.ts. */
  route: StaticAppPathname;
  label: Localized<string>;
  /** Shorter nav label where the full one doesn't fit at 1024px. */
  navLabel: Localized<string>;
  /** Who does the work / who it's for, in a few words. */
  whoDoesIt: Localized<string>;
  /** One sentence for entry-point cards and menus. */
  summary: Localized<string>;
  /** The hub's primary call to action. */
  cta: Localized<string>;
  inquiry: InquiryTopicKey;
}

export const offerings: Record<OfferingKey, Offering> = {
  redovisning: {
    key: "redovisning",
    route: "/tjanster",
    label: { sv: "Redovisning", en: "Accounting", ar: "المحاسبة" },
    navLabel: { sv: "Redovisning", en: "Accounting", ar: "المحاسبة" },
    whoDoesIt: {
      sv: "Vi sköter ekonomin åt dig",
      en: "We handle your books for you",
      ar: "نتولى حساباتك نيابةً عنك",
    },
    summary: {
      sv: "Bokföring, lön, moms, bokslut och deklaration från en Srf-auktoriserad redovisningsbyrå.",
      en: "Bookkeeping, payroll, VAT, annual accounts and tax returns from an Srf-authorized accounting firm.",
      ar: "مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية من مكتب محاسبة معتمد من Srf.",
    },
    cta: {
      sv: "Boka en konsultation",
      en: "Book a consultation",
      ar: "احجز استشارة",
    },
    inquiry: "redovisning",
  },
  marknadsforing: {
    key: "marknadsforing",
    route: "/digital-marknadsforing",
    label: {
      sv: "Digital marknadsföring",
      en: "Digital marketing",
      ar: "التسويق الرقمي",
    },
    navLabel: { sv: "Marknadsföring", en: "Marketing", ar: "التسويق الرقمي" },
    whoDoesIt: {
      sv: "Fler kunder hittar ditt företag",
      en: "More customers find your business",
      ar: "يجد المزيد من العملاء شركتك",
    },
    summary: {
      sv: "Webbplatser, SEO, annonsering och sociala medier som hjälper fler kunder att hitta ditt företag.",
      en: "Websites, SEO, advertising and social media that help more customers find your business.",
      ar: "مواقع إلكترونية وتحسين محركات البحث والإعلانات ووسائل التواصل الاجتماعي لتساعد المزيد من العملاء في العثور على شركتك.",
    },
    cta: {
      sv: "Berätta om ditt projekt",
      en: "Tell us about your project",
      ar: "أخبرنا عن مشروعك",
    },
    inquiry: "marknadsforing",
  },
  bokforingsprogram: {
    key: "bokforingsprogram",
    route: "/bokforingsprogram",
    label: softwarePages.overview.navLabel,
    navLabel: softwarePages.overview.navLabel,
    whoDoesIt: {
      sv: "Du sköter bokföringen själv",
      en: "You do your own bookkeeping",
      ar: "تتولى مسك دفاترك بنفسك",
    },
    summary: {
      sv: "Fakturering, bokföring och lön på ett ställe i vårt eget program för svenska småföretag.",
      en: "Invoicing, bookkeeping and payroll in one place, in our own software for Swedish small businesses.",
      ar: "الفوترة ومسك الدفاتر والرواتب في مكان واحد، في برنامجنا الخاص للشركات السويدية الصغيرة.",
    },
    cta: { sv: "Boka en demo", en: "Book a demo", ar: "احجز عرضًا توضيحيًا" },
    inquiry: "demo",
  },
  utveckling: {
    key: "utveckling",
    route: "/systemutveckling",
    label: {
      sv: "Systemutveckling",
      en: "Software development",
      ar: "تطوير البرمجيات",
    },
    navLabel: { sv: "Utveckling", en: "Development", ar: "البرمجة" },
    whoDoesIt: {
      sv: "Vi bygger det system du behöver",
      en: "We build the system you need",
      ar: "نبني النظام الذي تحتاجه",
    },
    summary: {
      sv: "Appar, webbtjänster, SaaS och skräddarsydda system, designade och byggda för hur ditt företag faktiskt arbetar.",
      en: "Apps, web services, SaaS and custom systems, designed and built around how your business actually works.",
      ar: "تطبيقات وخدمات ويب ومنصات SaaS وأنظمة مخصصة، نصممها ونبنيها وفق طريقة عمل شركتك الفعلية.",
    },
    cta: {
      sv: "Berätta om ditt projekt",
      en: "Tell us about your project",
      ar: "أخبرنا عن مشروعك",
    },
    inquiry: "utveckling",
  },
};

export const offeringList: Offering[] = Object.values(offerings);
