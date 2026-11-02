import { definePage, message } from "./types";

export const servicesOverviewPage = definePage({
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
});

export const contactPage = definePage({
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
    {
      key: "heading",
      label: "Page heading (H1)",
      kind: "text",
      default: message((m) => m.nav.contact),
    },
    {
      key: "responseTime",
      label: "Response time note",
      kind: "text",
      default: message((m) => m.home.contactResponseTime),
    },
    {
      key: "formTitle",
      label: "Form title",
      kind: "text",
      default: message((m) => m.home.contactFormTitle),
    },
  ],
});

export const articlesPage = definePage({
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
});
