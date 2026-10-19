import type { ArticleMeta } from "./types";

const PUBLISHED_AT = "2026-09-06";
const GUIDES_PUBLISHED_AT = "2026-10-19";

export const articles: ArticleMeta[] = [
  {
    id: "accounting-in-sweden-guide",
    slug: {
      sv: "redovisning-i-sverige-guide",
      en: "accounting-in-sweden-guide",
      ar: "المحاسبة-في-السويد",
    },
    title: {
      sv: "Redovisning i Sverige: en guide för företagare",
      en: "Accounting in Sweden: A Guide for Business Owners",
      ar: "المحاسبة في السويد: دليل لأصحاب الأعمال",
    },
    excerpt: {
      sv: "Vad redovisning i Sverige innebär: bokföring, moms, arbetsgivardeklaration, bokslut och årsredovisning — och skillnaden mellan enskild firma och aktiebolag.",
      en: "What accounting in Sweden involves: bookkeeping, VAT, employer returns, year-end accounts and annual reports, and how sole traders and limited companies differ.",
      ar: "ما تعنيه المحاسبة في السويد: مسك الدفاتر وضريبة القيمة المضافة وإقرار صاحب العمل والحسابات الختامية، والفرق بين المنشأة الفردية والشركة المحدودة.",
    },
    publishedAt: GUIDES_PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: [
      "faq-bookkeeping-what",
      "faq-annual-closing-difference",
      "faq-global-what-is-authorized-firm",
    ],
    coverImage: {
      src: "/media/optimized/bokforing.webp",
      width: 1024,
      height: 683,
      alt: {
        sv: "Redovisning och bokföring för ett företag i Sverige",
        en: "Accounting and bookkeeping for a business in Sweden",
        ar: "محاسبة ومسك دفاتر لشركة في السويد",
      },
    },
  },
  {
    id: "choose-marketing-agency-sweden",
    slug: {
      sv: "valja-marknadsforingsbyra-sverige",
      en: "choose-marketing-agency-sweden",
      ar: "اختيار-وكالة-تسويق-في-السويد",
    },
    title: {
      sv: "Så väljer du marknadsföringsbyrå i Sverige",
      en: "How to Choose a Marketing Agency in Sweden",
      ar: "كيف تختار وكالة تسويق في السويد",
    },
    excerpt: {
      sv: "Vad en digital marknadsföringsbyrå gör, vilka frågor du ska ställa innan du väljer byrå, och vilka varningssignaler du ska se upp med.",
      en: "What a digital marketing agency does, the questions to ask before you choose one, and the warning signs to look out for.",
      ar: "ما الذي تقدمه وكالة التسويق الرقمي، والأسئلة التي يجب طرحها قبل اختيارها، والعلامات التحذيرية التي يجب الانتباه إليها.",
    },
    publishedAt: GUIDES_PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: [
      "faq-digital-what-agency-does",
      "faq-seo-vs-ads",
      "faq-geo-what",
      "faq-digital-why-accounting-firm",
    ],
    coverImage: {
      src: "/media/optimized/home-benefits.webp",
      width: 1600,
      height: 1067,
      alt: {
        sv: "Företagare som planerar digital marknadsföring",
        en: "Business owner planning digital marketing",
        ar: "صاحب عمل يخطط للتسويق الرقمي",
      },
    },
  },
  {
    id: "payroll-sweden-employers",
    slug: {
      sv: "lon-i-sverige-arbetsgivare",
      en: "payroll-in-sweden-employers",
      ar: "الرواتب-في-السويد",
    },
    title: {
      sv: "Lön i Sverige: vad arbetsgivare måste göra varje månad",
      en: "Payroll in Sweden: What Employers Must Do Each Month",
      ar: "الرواتب في السويد: ما يجب على صاحب العمل فعله كل شهر",
    },
    excerpt: {
      sv: "Från registrering som arbetsgivare till skatteavdrag, arbetsgivaravgifter och den månatliga arbetsgivardeklarationen — så fungerar lön i Sverige.",
      en: "From registering as an employer to tax withholding, employer contributions and the monthly employer tax return — how payroll works in Sweden.",
      ar: "من التسجيل كصاحب عمل إلى اقتطاع الضريبة ورسوم صاحب العمل وإقرار صاحب العمل الشهري — هكذا تعمل الرواتب في السويد.",
    },
    publishedAt: GUIDES_PUBLISHED_AT,
    authorId: "hadi-almaani",
    faqIds: ["faq-payroll-what", "faq-payroll-frequency"],
    coverImage: {
      src: "/media/optimized/hero.webp",
      width: 1600,
      height: 1068,
      alt: {
        sv: "Arbetsgivare som går igenom lönerna",
        en: "Employer reviewing payroll",
        ar: "صاحب عمل يراجع الرواتب",
      },
    },
  },
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
