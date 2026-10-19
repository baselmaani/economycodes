import type { StaticAppPathname } from "@/i18n/routing";
import type { Localized, MediaRef } from "@/content/types";
import { heroContent, benefitsImage, homeMeta } from "@/content/home";
import { digitalHero, digitalMeta } from "@/content/digital-marketing";
import { hadi } from "@/content/people";
import { cookiePolicy, privacyPolicy, termsPage } from "@/content/legal";
import { servicesList } from "@/content/services";
import { serviceMeta } from "@/content/service-meta";
import { locationPages } from "@/content/location-pages";
import svMessages from "@/messages/sv.json";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

/**
 * Registry of everything the admin dashboard can override on a page. The
 * `default` values are the existing content/ data, so a page with no DB
 * override renders exactly as before. Field keys are stable identifiers
 * stored in page_overrides.data -- renaming one orphans saved overrides.
 */

export interface TextFieldDef {
  key: string;
  label: string;
  kind: "text" | "textarea";
  default: Localized<string>;
}

export interface ImageFieldDef {
  key: string;
  label: string;
  /** Shown in the editor so a replacement image is cropped to the right shape. */
  hint?: string;
  default: MediaRef;
}

export interface PageDef {
  key: string;
  label: string;
  group: "Pages" | "Legal" | "Services";
  /** Static route for "View page"; service pages are linked via their slug instead. */
  routeKey?: StaticAppPathname;
  serviceKey?: string;
  /** Office landing pages are linked via their slug, like services. */
  locationId?: string;
  seo: {
    title: Localized<string>;
    description: Localized<string>;
    /** Title bypasses the layout's "%s | Economy Codes" template (already branded). */
    absoluteTitle?: boolean;
  };
  text: TextFieldDef[];
  images: ImageFieldDef[];
}

function message(
  pick: (messages: typeof svMessages) => string,
): Localized<string> {
  return {
    sv: pick(svMessages),
    en: pick(enMessages as typeof svMessages),
    ar: pick(arMessages as typeof svMessages),
  };
}

/** First ~155 characters, matching what the legal pages previously sliced inline. */
function truncate(value: Localized<string>, length = 155): Localized<string> {
  return {
    sv: value.sv.slice(0, length),
    en: value.en?.slice(0, length),
    ar: value.ar?.slice(0, length),
  };
}

const staticPages: PageDef[] = [
  {
    key: "home",
    label: "Home",
    group: "Pages",
    routeKey: "/",
    seo: {
      title: homeMeta.title,
      description: homeMeta.description,
      absoluteTitle: true,
    },
    text: [
      {
        key: "heroTitle",
        label: "Hero headline",
        kind: "text",
        default: heroContent.title,
      },
      {
        key: "heroSubtitle",
        label: "Hero subtitle",
        kind: "textarea",
        default: heroContent.subtitle,
      },
    ],
    images: [
      {
        key: "heroPhoto",
        label: "Hero photo",
        hint: "Portrait, about 400:439 (e.g. 800 × 878)",
        default: hadi.heroPhoto,
      },
      {
        key: "benefitsImage",
        label: "Benefits section image",
        hint: "Landscape, about 3:2",
        default: benefitsImage,
      },
    ],
  },
  {
    key: "om-hadi",
    label: "About Hadi",
    group: "Pages",
    routeKey: "/om-hadi",
    seo: {
      title: {
        sv: "Hadi Al Maani, redovisningskonsult i Sverige",
        en: "Hadi Al Maani, accountant in Sweden",
        ar: "هادي المعاني، محاسب معتمد في السويد",
      },
      description: {
        sv: "Hadi Al Maani är auktoriserad redovisningskonsult och lönekonsult via Srf konsulterna och driver Economy Codes AB. Service på svenska, engelska och arabiska.",
        en: "Hadi Al Maani is an Srf-authorized accounting and payroll consultant who runs Economy Codes AB. Service in Swedish, English and Arabic.",
        ar: "هادي المعاني مستشار محاسبة ورواتب معتمد من Srf konsulterna ويدير Economy Codes AB. خدمة بالعربية والسويدية والإنجليزية.",
      },
    },
    text: [
      { key: "bio", label: "Biography", kind: "textarea", default: hadi.bio },
    ],
    images: [
      {
        key: "heroPhoto",
        label: "Hero photo",
        hint: "Portrait, about 400:439 (e.g. 800 × 878)",
        default: hadi.heroPhoto,
      },
      {
        key: "photo",
        label: "Small profile photo (final call to action)",
        hint: "Square",
        default: hadi.photo,
      },
    ],
  },
  {
    key: "tjanster",
    label: "Services overview",
    group: "Pages",
    routeKey: "/tjanster",
    seo: {
      title: {
        sv: "Redovisning och marknadsföring i Sverige",
        en: "Accounting & marketing services in Sweden",
        ar: "خدمات المحاسبة والتسويق في السويد",
      },
      description: {
        sv: "Redovisning, lön, moms, bokslut och digital marknadsföring för företag i hela Sverige från en Srf-auktoriserad byrå. På svenska, engelska och arabiska.",
        en: "Accounting, bookkeeping, payroll, VAT, annual accounts and digital marketing for businesses across Sweden from an Srf-authorized firm. In English and Arabic.",
        ar: "المحاسبة ومسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والتسويق الرقمي للشركات في جميع أنحاء السويد من مكتب معتمد من Srf، بالعربية.",
      },
    },
    text: [
      {
        key: "heading",
        label: "Page heading (H1)",
        kind: "text",
        default: {
          sv: "Redovisning och marknadsföring för företag i Sverige",
          en: "Accounting and marketing services in Sweden",
          ar: "خدمات المحاسبة والتسويق للشركات في السويد",
        },
      },
      {
        key: "intro",
        label: "Intro under the heading",
        kind: "textarea",
        default: message((m) => m.home.servicesSubtitle),
      },
    ],
    images: [],
  },
  {
    key: "digital-marknadsforing",
    label: "Digital marketing",
    group: "Pages",
    routeKey: "/digital-marknadsforing",
    seo: { title: digitalMeta.title, description: digitalMeta.description },
    text: [
      {
        key: "heroTitle",
        label: "Hero headline",
        kind: "text",
        default: digitalHero.title,
      },
      {
        key: "heroLead",
        label: "Hero intro",
        kind: "textarea",
        default: digitalHero.lead,
      },
    ],
    images: [],
  },
  {
    key: "kontakt",
    label: "Contact",
    group: "Pages",
    routeKey: "/kontakt",
    seo: {
      title: {
        sv: "Kontakt – Mellerud, Trollhättan & digitalt",
        en: "Contact us – Mellerud, Trollhättan & online",
        ar: "اتصل بنا – ميلَّروود وتروللهاتان وعن بُعد",
      },
      description: {
        sv: "Kontakta Economy Codes för redovisning, lön, deklaration eller digital marknadsföring. Kontor i Mellerud och Trollhättan, digital service i hela Sverige.",
        en: "Contact Economy Codes about accounting, payroll, tax returns or digital marketing. Offices in Mellerud and Trollhättan, digital service across Sweden.",
        ar: "تواصل مع Economy Codes بخصوص المحاسبة والرواتب والإقرارات الضريبية أو التسويق الرقمي. مكاتب في ميلَّروود وتروللهاتان وخدمة رقمية في جميع أنحاء السويد.",
      },
    },
    text: [
      {
        key: "intro",
        label: "Intro under the heading",
        kind: "textarea",
        default: message((m) => m.home.finalCtaSubtitle),
      },
    ],
    images: [],
  },
  {
    key: "artiklar",
    label: "Articles overview",
    group: "Pages",
    routeKey: "/artiklar",
    seo: {
      title: {
        sv: "Artiklar om redovisning och skatt i Sverige",
        en: "Accounting and tax guides for Sweden",
        ar: "مقالات عن المحاسبة والضرائب في السويد",
      },
      description: {
        sv: "Guider om redovisning, bokföring, skatt, att starta företag och digital marknadsföring i Sverige, skrivna av auktoriserade redovisningskonsulten Hadi Al Maani.",
        en: "Guides to accounting, bookkeeping, tax, starting a company and digital marketing in Sweden, written by authorized accounting consultant Hadi Al Maani.",
        ar: "أدلة حول المحاسبة ومسك الدفاتر والضرائب وتأسيس الشركات والتسويق الرقمي في السويد، بقلم مستشار المحاسبة المعتمد هادي المعاني.",
      },
    },
    text: [
      {
        key: "heading",
        label: "Page heading (H1)",
        kind: "text",
        default: {
          sv: "Artiklar om redovisning, skatt och marknadsföring i Sverige",
          en: "Guides to accounting, tax and marketing in Sweden",
          ar: "مقالات عن المحاسبة والضرائب والتسويق في السويد",
        },
      },
    ],
    images: [],
  },
  {
    key: "integritetspolicy",
    label: "Privacy policy",
    group: "Legal",
    routeKey: "/integritetspolicy",
    seo: {
      title: privacyPolicy.title,
      description: truncate(privacyPolicy.dataCollectedBody),
    },
    text: [],
    images: [],
  },
  {
    key: "cookies",
    label: "Cookie policy",
    group: "Legal",
    routeKey: "/cookies",
    seo: { title: cookiePolicy.title, description: cookiePolicy.intro },
    text: [],
    images: [],
  },
  {
    key: "villkor",
    label: "Terms",
    group: "Legal",
    routeKey: "/villkor",
    seo: { title: termsPage.title, description: truncate(termsPage.intro) },
    text: [],
    images: [],
  },
];

const servicePages: PageDef[] = servicesList.map((service) => {
  const meta = serviceMeta[service.key];
  return {
    key: `service:${service.key}`,
    label: service.name.sv,
    group: "Services",
    serviceKey: service.key,
    seo: {
      title: meta?.title ?? service.name,
      description: meta?.description ?? service.summary,
    },
    text: [],
    images: [],
  };
});

const locationPageDefs: PageDef[] = locationPages.map((page) => ({
  key: locationPageKey(page.locationId),
  label: `Office: ${page.cityName.sv}`,
  group: "Pages",
  locationId: page.locationId,
  seo: { title: page.metaTitle, description: page.metaDescription },
  text: [
    {
      key: "intro",
      label: "Intro under the heading",
      kind: "textarea",
      default: page.intro,
    },
  ],
  images: [],
}));

export const pageDefs: PageDef[] = [
  ...staticPages,
  ...locationPageDefs,
  ...servicePages,
];

export function getPageDef(key: string): PageDef | undefined {
  return pageDefs.find((page) => page.key === key);
}

export type StaticPageKey =
  | "home"
  | "om-hadi"
  | "tjanster"
  | "digital-marknadsforing"
  | "kontakt"
  | "artiklar"
  | "integritetspolicy"
  | "cookies"
  | "villkor";

/** Page key under which an office landing page's overrides are stored. */
export function locationPageKey(locationId: string): string {
  return `location:${locationId}`;
}

/** Page key under which a service's SEO overrides are stored. */
export function servicePageKey(serviceKey: string): string {
  return `service:${serviceKey}`;
}
