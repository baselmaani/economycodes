import { accountingHero } from "@/content/accounting";
import { definePage, message } from "./types";

export const servicesOverviewPage = definePage({
  key: "tjanster",
  label: "Redovisning (accounting hub)",
  group: "Pages",
  routeKey: "/tjanster",
  seo: {
    title: {
      sv: "Redovisningsbyrå för småföretag i hela Sverige",
      en: "Accounting firm for small businesses in Sweden",
      ar: "مكتب محاسبة للشركات الصغيرة في السويد",
    },
    description: {
      sv: "Srf-auktoriserad redovisningsbyrå för småföretag: bokföring, lön, moms, bokslut och deklaration. Digitalt i hela Sverige, kontor i Mellerud och Trollhättan.",
      en: "Srf-authorized accounting firm for small businesses: bookkeeping, payroll, VAT, annual accounts and tax returns. Digital across Sweden, in English and Arabic too.",
      ar: "مكتب محاسبة معتمد من Srf للشركات الصغيرة: مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية، رقميًا في كل السويد وبالعربية.",
    },
  },
  text: [
    {
      key: "heading",
      label: "Page heading (H1)",
      kind: "text",
      default: accountingHero.title,
    },
    {
      key: "intro",
      label: "Intro under the heading (answers what the firm does)",
      kind: "textarea",
      default: accountingHero.lead,
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
      sv: "Kontakta Economy Codes om redovisning, digital marknadsföring eller en demo av bokföringsprogrammet. Kontor i Mellerud och Trollhättan, digitalt i hela Sverige.",
      en: "Contact Economy Codes about accounting, digital marketing or a demo of the accounting software. Offices in Mellerud and Trollhättan, digital across Sweden.",
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
      default: {
        sv: "Kontakta Economy Codes",
        en: "Contact Economy Codes",
        ar: "تواصل مع Economy Codes",
      },
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
