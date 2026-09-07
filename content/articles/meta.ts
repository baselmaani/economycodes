import type { ArticleMeta } from "./types";

const PUBLISHED_AT = "2026-09-06";

export const articles: ArticleMeta[] = [
  {
    id: "bookkeeping-records-sweden",
    slug: {
      sv: "bokforingsunderlag-smaforetag-sverige",
      en: "bookkeeping-records-sweden",
      ar: "مستندات-المحاسبة-في-السويد",
    },
    title: {
      sv: "Vilka bokföringsunderlag måste jag spara som småföretagare i Sverige?",
      en: "What Bookkeeping Records Must You Keep as a Small Business in Sweden?",
      ar: "ما مستندات المحاسبة التي يجب حفظها كصاحب عمل صغير في السويد؟",
    },
    excerpt: {
      sv: "Vilka verifikationer och underlag måste du som småföretagare spara enligt bokföringslagen — och vad händer om något saknas?",
      en: "Which vouchers and records small businesses in Sweden must keep under the Bookkeeping Act — and what to do if something's missing.",
      ar: "ما مستندات الإثبات التي يجب على أصحاب الأعمال الصغيرة حفظها بموجب قانون المحاسبة السويدي — وماذا تفعل إن كانت ناقصة.",
    },
    publishedAt: PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: [
      "faq-bookkeeping-what",
      "faq-bookkeeping-software",
      "faq-global-digital-bookkeeping",
    ],
    coverImage: {
      src: "/media/optimized/bokforing.webp",
      width: 1024,
      height: 683,
      alt: {
        sv: "Bokföring och sparade kvitton för ett litet företag",
        en: "Bookkeeping and saved receipts for a small business",
        ar: "محاسبة وإيصالات محفوظة لشركة صغيرة",
      },
    },
  },
  {
    id: "register-aktiebolag-sweden-foreigner",
    slug: {
      sv: "registrera-aktiebolag-utlandsk-grundare",
      en: "register-aktiebolag-sweden-foreigner",
      ar: "تسجيل-شركة-محدودة-في-السويد",
    },
    title: {
      sv: "Så registrerar du ett aktiebolag i Sverige som utländsk grundare",
      en: "How to Register a Limited Company (Aktiebolag) in Sweden as a Foreign Founder",
      ar: "كيف تُسجّل شركة محدودة (Aktiebolag) في السويد كمؤسس أجنبي",
    },
    excerpt: {
      sv: "En genomgång av processen att registrera ett aktiebolag i Sverige som utländsk grundare, från bolagsform till registrering.",
      en: "A walkthrough of registering a limited company (aktiebolag) in Sweden as a foreign founder, from choosing a company type to registration.",
      ar: "شرح لعملية تسجيل شركة محدودة في السويد كمؤسس أجنبي، من اختيار نوع الشركة إلى التسجيل.",
    },
    publishedAt: PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: [
      "faq-registration-time",
      "faq-registration-form",
      "faq-investment-guarantee",
    ],
    coverImage: {
      src: "/media/optimized/foretagsregistrering.webp",
      width: 370,
      height: 245,
      alt: {
        sv: "Registrering av aktiebolag i Sverige",
        en: "Registering a limited company in Sweden",
        ar: "تسجيل شركة محدودة في السويد",
      },
    },
  },
  {
    id: "sweden-business-tax-deadlines",
    slug: {
      sv: "skattedeadlines-foretag-sverige",
      en: "sweden-business-tax-deadlines",
      ar: "المواعيد-الضريبية-للشركات-في-السويد",
    },
    title: {
      sv: "Skattedeadlines för företag i Sverige – vad händer om du missar en?",
      en: "Business Tax Deadlines in Sweden — What Happens If You Miss One?",
      ar: "المواعيد الضريبية للشركات في السويد — ماذا يحدث إذا فاتك أحدها؟",
    },
    excerpt: {
      sv: "Vilka återkommande skattedeadlines gäller för företag i Sverige, och vad Skatteverket gör om en deadline missas.",
      en: "The recurring tax filing obligations Swedish businesses face, and what Skatteverket does if a deadline is missed.",
      ar: "الالتزامات الضريبية المتكررة للشركات في السويد، وما تفعله هيئة الضرائب في حال فوات موعد التقديم.",
    },
    publishedAt: PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: ["faq-tax-deadlines", "faq-tax-general"],
    coverImage: {
      src: "/media/optimized/hero.webp",
      width: 1600,
      height: 1068,
      alt: {
        sv: "Företagare som planerar inför en skattedeadline",
        en: "Business owner planning ahead of a tax deadline",
        ar: "صاحب عمل يخطط قبل موعد ضريبي",
      },
    },
  },
  {
    id: "start-business-sweden-without-residence-permit",
    slug: {
      sv: "starta-foretag-sverige-utan-uppehallstillstand",
      en: "start-business-sweden-without-residence-permit",
      ar: "تأسيس-شركة-في-السويد-بدون-تصريح-إقامة",
    },
    title: {
      sv: "Kan jag starta företag i Sverige utan uppehållstillstånd?",
      en: "Can You Start a Business in Sweden Without a Residence Permit?",
      ar: "هل يمكنك تأسيس شركة في السويد دون تصريح إقامة؟",
    },
    excerpt: {
      sv: "Är företagsregistrering och uppehållstillstånd samma sak? En genomgång av vad som faktiskt krävs för att starta företag i Sverige.",
      en: "Are company registration and a residence permit the same thing? A look at what actually starting a business in Sweden requires.",
      ar: "هل تسجيل الشركة وتصريح الإقامة أمر واحد؟ نظرة على ما يتطلبه تأسيس شركة في السويد فعليًا.",
    },
    publishedAt: PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: ["faq-investment-guarantee", "faq-investment-scope"],
    coverImage: {
      src: "/media/optimized/investeringar-i-sverige.webp",
      width: 1024,
      height: 512,
      alt: {
        sv: "Etablera företag och investera i Sverige",
        en: "Establishing a business and investing in Sweden",
        ar: "تأسيس شركة والاستثمار في السويد",
      },
    },
  },
  {
    id: "arabic-speaking-accountant-sweden-why",
    slug: {
      sv: "arabisktalande-redovisningskonsult-sverige",
      en: "arabic-speaking-accountant-sweden-why",
      ar: "محاسب-يتحدث-العربية-في-السويد",
    },
    title: {
      sv: "Varför anlita en arabisktalande redovisningskonsult i Sverige?",
      en: "Why Work With an Arabic-Speaking Accountant in Sweden?",
      ar: "لماذا تستعين بمحاسب يتحدث العربية في السويد؟",
    },
    excerpt: {
      sv: "Varför fler arabisktalande företagare i Sverige väljer att anlita en redovisningskonsult som talar deras eget språk.",
      en: "Why more Arabic-speaking business owners in Sweden choose an accounting consultant who speaks their own language.",
      ar: "لماذا يختار مزيد من أصحاب الأعمال الناطقين بالعربية في السويد الاستعانة بمستشار محاسبة يتحدث لغتهم.",
    },
    publishedAt: PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: [
      "faq-arabic-scope",
      "faq-global-arabic-support",
      "faq-global-nationwide",
    ],
    coverImage: {
      src: "/media/optimized/hero.webp",
      width: 1600,
      height: 1068,
      alt: {
        sv: "Rådgivning på arabiska för företagare i Sverige",
        en: "Advisory in Arabic for business owners in Sweden",
        ar: "استشارات باللغة العربية لأصحاب الأعمال في السويد",
      },
    },
  },
];
