import type { Localized } from "./types";

/**
 * Copy for the Redovisning hub (/tjanster). Built only from facts already
 * published elsewhere on the site (service pages, global FAQs, the Srf
 * authorization); see CLIENT-TODO.md items 7-9 before widening the scope.
 * The H1, lead and SEO fields are editable in the dashboard
 * (lib/cms/pages/misc.ts, "tjanster").
 */

export const accountingHero = {
  eyebrow: {
    sv: "Srf-auktoriserad redovisningsbyrå",
    en: "Srf-authorized accounting firm",
    ar: "مكتب محاسبة معتمد من Srf",
  } satisfies Localized<string>,
  title: {
    sv: "Redovisningsbyrå för småföretag i hela Sverige",
    en: "Accounting firm for small businesses across Sweden",
    ar: "مكتب محاسبة للشركات الصغيرة في جميع أنحاء السويد",
  } satisfies Localized<string>,
  /** Direct answer near the top of the page, for readers and answer engines. */
  lead: {
    sv: "Economy Codes AB är en Srf-auktoriserad redovisningsbyrå som sköter bokföring, lön, moms, bokslut och deklaration åt små och medelstora företag. Du skickar underlagen digitalt och vi tar hand om resten – med kunder i hela Sverige och kontor i Mellerud och Trollhättan.",
    en: "Economy Codes AB is an Srf-authorized accounting firm that handles bookkeeping, payroll, VAT, annual accounts and tax returns for small and medium-sized businesses. You send your documents digitally and we take care of the rest – with clients across Sweden and offices in Mellerud and Trollhättan.",
    ar: "Economy Codes AB مكتب محاسبة معتمد من Srf يتولى مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية للشركات الصغيرة والمتوسطة. ترسل مستنداتك رقميًا ونتولى نحن الباقي – مع عملاء في جميع أنحاء السويد ومكاتب في ميلرود وترولهتان.",
  } satisfies Localized<string>,
};

/** "Who is it for" and the accounting-vs-software comparison. */
export const accountingFit = {
  title: {
    sv: "Redovisningsbyrå eller bokföringsprogram?",
    en: "Accounting firm or accounting software?",
    ar: "مكتب محاسبة أم برنامج محاسبة؟",
  } satisfies Localized<string>,
  lead: {
    sv: "Vi hjälper enskilda näringsidkare, aktiebolag, handelsbolag och ideella föreningar, samt utländska grundare som vill etablera verksamhet i Sverige. Välj hur mycket du vill göra själv.",
    en: "We help sole traders, limited companies, trading partnerships and non-profit associations, as well as foreign founders setting up a business in Sweden. Choose how much you want to do yourself.",
    ar: "نساعد أصحاب المنشآت الفردية والشركات المساهمة والشركات التضامنية والجمعيات غير الربحية، وكذلك المؤسسين الأجانب الذين يرغبون في تأسيس نشاط في السويد. اختر مقدار ما تريد القيام به بنفسك.",
  } satisfies Localized<string>,
  firm: {
    title: {
      sv: "Redovisning – vi sköter det åt dig",
      en: "Accounting – we handle it for you",
      ar: "المحاسبة – نتولاها نيابةً عنك",
    } satisfies Localized<string>,
    points: {
      sv: [
        "Du skickar kvitton, fakturor och kontoutdrag digitalt",
        "Vi bokför och stämmer av löpande",
        "Vi tar hand om lön, moms, bokslut och deklaration",
        "Du har en auktoriserad konsult att fråga",
      ],
      en: [
        "You send receipts, invoices and bank statements digitally",
        "We book and reconcile on an ongoing basis",
        "We take care of payroll, VAT, annual accounts and tax returns",
        "You have an authorized consultant to ask",
      ],
      ar: [
        "ترسل الإيصالات والفواتير وكشوف الحساب رقميًا",
        "نسجّل القيود ونطابقها بشكل مستمر",
        "نتولى الرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية",
        "لديك مستشار معتمد يمكنك سؤاله",
      ],
    } satisfies Localized<string[]>,
  },
  software: {
    title: {
      sv: "Bokföringsprogram – du gör det själv",
      en: "Accounting software – you do it yourself",
      ar: "برنامج المحاسبة – تتولاه بنفسك",
    } satisfies Localized<string>,
    points: {
      sv: [
        "Du skapar fakturor och följer betalningarna",
        "Du bokför med kvitton och fakturor som underlag",
        "Moms, SIE-filer och lönebesked i samma program",
      ],
      en: [
        "You create invoices and follow the payments",
        "You book with receipts and invoices attached",
        "VAT, SIE files and payslips in the same software",
      ],
      ar: [
        "تنشئ الفواتير وتتابع المدفوعات",
        "تسجّل القيود مع إرفاق الإيصالات والفواتير",
        "ضريبة القيمة المضافة وملفات SIE وقسائم الرواتب في البرنامج نفسه",
      ],
    } satisfies Localized<string[]>,
    link: {
      sv: "Se bokföringsprogrammet",
      en: "See the accounting software",
      ar: "اطّلع على برنامج المحاسبة",
    } satisfies Localized<string>,
  },
};

export const accountingSections = {
  servicesTitle: {
    sv: "Det här ingår i våra redovisningstjänster",
    en: "What our accounting services include",
    ar: "ما تشمله خدمات المحاسبة لدينا",
  } satisfies Localized<string>,
  servicesLead: {
    sv: "Välj en tjänst för att se vad som ingår, vem den passar och hur det går till.",
    en: "Choose a service to see what is included, who it suits and how it works.",
    ar: "اختر خدمة لترى ما تشمله ولمن تناسب وكيف تتم.",
  } satisfies Localized<string>,
  processTitle: {
    sv: "Så kommer du igång",
    en: "How to get started",
    ar: "كيف تبدأ",
  } satisfies Localized<string>,
  ctaTitle: {
    sv: "Vill du lämna över bokföringen?",
    en: "Want to hand over your bookkeeping?",
    ar: "هل تريد تسليم مسك الدفاتر؟",
  } satisfies Localized<string>,
  ctaBody: {
    sv: "Berätta om ditt företag och vad du behöver hjälp med, så går vi igenom din situation och föreslår nästa steg.",
    en: "Tell us about your company and what you need help with, and we will go through your situation and suggest the next step.",
    ar: "أخبرنا عن شركتك وما تحتاج إليه، وسنراجع وضعك ونقترح الخطوة التالية.",
  } satisfies Localized<string>,
};

/** Global FAQs shown on the hub, in this order (content/faqs.ts). */
export const ACCOUNTING_HUB_FAQ_IDS = [
  "faq-global-what-is-authorized-firm",
  "faq-global-consultant-vs-auditor",
  "faq-global-company-types",
  "faq-global-digital-bookkeeping",
  "faq-global-switch-firm",
  "faq-global-nationwide",
  "faq-global-getting-started",
];
