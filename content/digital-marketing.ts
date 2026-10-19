import {
  Languages,
  Layers,
  LineChart,
  Megaphone,
  Search,
  Target,
  Wrench,
} from "lucide-react";

import type { Localized } from "./types";
import type { Benefit, ProcessStep } from "./home";

/**
 * Copy for the /digital-marknadsforing hub page and the homepage digital
 * marketing section. The services themselves live in
 * content/services-digital.ts. Scope, delivery and pricing are pending
 * client confirmation (CLIENT-TODO item 21) -- keep claims general.
 */
export const digitalMeta = {
  title: {
    sv: "Digital marknadsföringsbyrå i Sverige",
    en: "Digital marketing agency in Sweden",
    ar: "وكالة تسويق رقمي في السويد",
  } satisfies Localized<string>,
  description: {
    sv: "Digital marknadsföringsbyrå i Sverige: webbplatser, SEO, AEO, GEO, Google Ads, sociala medier, SaaS och mobilappar — på svenska, engelska och arabiska.",
    en: "Digital marketing agency in Sweden: websites, SEO, AEO, GEO, Google Ads, social media ads, SaaS, and mobile apps — in Swedish, English, and Arabic.",
    ar: "وكالة تسويق رقمي في السويد: مواقع إلكترونية وSEO وAEO وGEO وإعلانات جوجل ووسائل التواصل وتطبيقات SaaS والجوال — بالسويدية والإنجليزية والعربية.",
  } satisfies Localized<string>,
};

export const digitalHero = {
  title: {
    sv: "Digital marknadsföringsbyrå för företag i hela Sverige",
    en: "Digital marketing agency for businesses across Sweden",
    ar: "وكالة تسويق رقمي للشركات في جميع أنحاء السويد",
  } satisfies Localized<string>,
  lead: {
    sv: "Economy Codes AB hjälper små och medelstora företag i hela Sverige att få fler kunder online. Vi bygger webbplatser, webbappar och mobilappar för iOS och Android, arbetar med SEO, AEO och GEO för synlighet i Google och AI-sök, och driver annonsering på Google, Facebook, Instagram, TikTok och LinkedIn — på svenska, engelska och arabiska.",
    en: "Economy Codes AB helps small and medium-sized businesses across Sweden win more customers online. We build websites, web apps, and iOS and Android apps, work with SEO, AEO, and GEO for visibility in Google and AI search, and run advertising on Google, Facebook, Instagram, TikTok, and LinkedIn — in Swedish, English, and Arabic.",
    ar: "Economy Codes AB شركة تسويق رقمي تساعد الشركات الصغيرة والمتوسطة في جميع أنحاء السويد على كسب مزيد من العملاء عبر الإنترنت. نبني المواقع وتطبيقات الويب وتطبيقات iOS وأندرويد، ونعمل على SEO وAEO وGEO للظهور في جوجل وبحث الذكاء الاصطناعي، وندير الإعلانات على جوجل وفيسبوك وإنستغرام وتيك توك ولينكدإن — بالسويدية والإنجليزية والعربية.",
  } satisfies Localized<string>,
};

/**
 * Answer-first definition block near the top of the hub. The first
 * paragraph is written to be quotable on its own (featured snippets, AI
 * answers), so keep it short and self-contained.
 */
export const digitalIntro = {
  title: {
    sv: "Vad är digital marknadsföring?",
    en: "What is digital marketing?",
    ar: "ما هو التسويق الرقمي؟",
  } satisfies Localized<string>,
  paragraphs: {
    sv: [
      "Digital marknadsföring är allt ett företag gör för att nå och vinna kunder online: en webbplats som gör besökare till kunder, synlighet i Google och AI-tjänster, annonsering i sökmotorer och sociala medier, och innehåll som bygger förtroende. Till skillnad från traditionell reklam går nästan allt att mäta.",
      "Economy Codes arbetar med hela kedjan — från att bygga webbplatsen till att driva trafik och följa upp vad varje krona ger. Eftersom vi också är en redovisningsbyrå kan vi visa vad marknadsföringen betyder för företagets intäkter och lönsamhet, inte bara för klick och visningar.",
    ],
    en: [
      "Digital marketing is everything a business does to reach and win customers online: a website that turns visitors into customers, visibility in Google and AI tools, advertising on search engines and social media, and content that builds trust. Unlike traditional advertising, almost all of it can be measured.",
      "Economy Codes works across the whole chain — from building the website to driving traffic and tracking what every krona delivers. Because we're also an accounting firm, we can show what your marketing means for your company's revenue and profitability, not just clicks and impressions.",
    ],
    ar: [
      "التسويق الرقمي هو كل ما تفعله الشركة للوصول إلى العملاء وكسبهم عبر الإنترنت: موقع إلكتروني يحوّل الزوار إلى عملاء، وظهور في جوجل وأدوات الذكاء الاصطناعي، وإعلانات في محركات البحث ووسائل التواصل الاجتماعي، ومحتوى يبني الثقة. وعلى عكس الإعلان التقليدي، يمكن قياس كل شيء تقريبًا.",
      "تعمل Economy Codes على السلسلة كاملة — من بناء الموقع إلى جلب الزيارات ومتابعة العائد من كل كرونة. ولأننا مكتب محاسبة أيضًا، يمكننا أن نوضح لك أثر التسويق على إيرادات شركتك وربحيتها، لا على النقرات ومرات الظهور فحسب.",
    ],
  } satisfies Localized<string[]>,
};

/**
 * Plain facts about the digital marketing offer, rendered as a <dl> so
 * search engines and AI tools can lift them verbatim. Verified facts only
 * (offices, languages) plus the service list -- see CLIENT-TODO item 21.
 */
export const digitalFacts = {
  title: {
    sv: "Kort om oss",
    en: "At a glance",
    ar: "لمحة سريعة",
  } satisfies Localized<string>,
  items: [
    {
      label: { sv: "Företag", en: "Company", ar: "الشركة" },
      value: {
        sv: "Economy Codes AB",
        en: "Economy Codes AB",
        ar: "Economy Codes AB",
      },
    },
    {
      label: { sv: "Tjänster", en: "Services", ar: "الخدمات" },
      value: {
        sv: "Webbplatser, SEO, AEO, GEO, Google Ads, annonsering och hantering av sociala medier, SaaS- och webbapputveckling, mobilappar för iOS och Android",
        en: "Websites, SEO, AEO, GEO, Google Ads, social media advertising and management, SaaS and web app development, iOS and Android apps",
        ar: "المواقع الإلكترونية وSEO وAEO وGEO وإعلانات جوجل وإعلانات وإدارة وسائل التواصل وتطوير تطبيقات الويب وSaaS وتطبيقات الجوال",
      },
    },
    {
      label: { sv: "Område", en: "Area served", ar: "نطاق الخدمة" },
      value: {
        sv: "Företag i hela Sverige, digitalt",
        en: "Businesses across Sweden, remotely",
        ar: "الشركات في جميع أنحاء السويد، عن بُعد",
      },
    },
    {
      label: { sv: "Kontor", en: "Offices", ar: "المكاتب" },
      value: {
        sv: "Mellerud och Trollhättan",
        en: "Mellerud and Trollhättan",
        ar: "ميلَّروود وتروللهاتان",
      },
    },
    {
      label: { sv: "Språk", en: "Languages", ar: "اللغات" },
      value: {
        sv: "Svenska, engelska och arabiska",
        en: "Swedish, English, and Arabic",
        ar: "السويدية والإنجليزية والعربية",
      },
    },
    {
      label: { sv: "Uppföljning", en: "Reporting", ar: "المتابعة" },
      value: {
        sv: "Regelbundna rapporter om kostnad och resultat",
        en: "Regular reports on cost and results",
        ar: "تقارير منتظمة عن التكلفة والنتائج",
      },
    },
  ] satisfies { label: Localized<string>; value: Localized<string> }[],
};

export const digitalProcessSteps: ProcessStep[] = [
  {
    title: {
      sv: "Nulägesanalys",
      en: "Current-state review",
      ar: "تحليل الوضع الحالي",
    },
    body: {
      sv: "Vi går igenom din webbplats, dina kanaler, konkurrenter och hur kunder hittar dig i dag.",
      en: "We review your website, channels, competitors, and how customers find you today.",
      ar: "نراجع موقعك ومنصاتك ومنافسيك وكيف يجدك العملاء حاليًا.",
    },
  },
  {
    title: {
      sv: "Plan och prioritering",
      en: "Plan and priorities",
      ar: "الخطة والأولويات",
    },
    body: {
      sv: "Du får en tydlig plan med de åtgärder som ger mest effekt för din budget först.",
      en: "You get a clear plan, starting with the actions that give the most impact for your budget.",
      ar: "تحصل على خطة واضحة تبدأ بالإجراءات الأكثر أثرًا مقارنة بميزانيتك.",
    },
  },
  {
    title: {
      sv: "Genomförande",
      en: "Execution",
      ar: "التنفيذ",
    },
    body: {
      sv: "Vi bygger, optimerar och lanserar — och håller dig uppdaterad på ditt språk.",
      en: "We build, optimize, and launch — and keep you updated in your language.",
      ar: "نبني ونحسّن ونطلق — ونبقيك على اطلاع بلغتك.",
    },
  },
  {
    title: {
      sv: "Uppföljning",
      en: "Follow-up",
      ar: "المتابعة",
    },
    body: {
      sv: "Regelbundna rapporter visar vad marknadsföringen kostar och vad den ger.",
      en: "Regular reports show what your marketing costs and what it delivers.",
      ar: "تقارير منتظمة توضح تكلفة التسويق وما يحققه.",
    },
  },
];

export const digitalBenefits: Benefit[] = [
  {
    icon: LineChart,
    title: {
      sv: "Marknadsföring kopplad till ekonomin",
      en: "Marketing tied to your finances",
      ar: "تسويق مرتبط بالوضع المالي",
    },
    body: {
      sv: "Som redovisningsbyrå kan vi ställa annonskostnader och resultat mot intäkterna i din bokföring.",
      en: "As an accounting firm, we can set ad spend and results against the revenue in your books.",
      ar: "بصفتنا مكتب محاسبة، يمكننا مقارنة تكاليف الإعلانات ونتائجها بالإيرادات في محاسبتك.",
    },
  },
  {
    icon: Languages,
    title: {
      sv: "Tre språk, en kontakt",
      en: "Three languages, one contact",
      ar: "ثلاث لغات وجهة تواصل واحدة",
    },
    body: {
      sv: "Innehåll, annonser och webbplatser på svenska, engelska och arabiska.",
      en: "Content, ads, and websites in Swedish, English, and Arabic.",
      ar: "محتوى وإعلانات ومواقع بالسويدية والإنجليزية والعربية.",
    },
  },
  {
    icon: Layers,
    title: {
      sv: "Allt på ett ställe",
      en: "Everything in one place",
      ar: "كل شيء في مكان واحد",
    },
    body: {
      sv: "Webbplats, sök, annonser och sociala medier som samverkar i stället för att spreta.",
      en: "Website, search, ads, and social media working together instead of pulling apart.",
      ar: "الموقع والبحث والإعلانات ووسائل التواصل تعمل معًا بدلًا من أن تتشتت.",
    },
  },
  {
    icon: Target,
    title: {
      sv: "Tydliga mål, öppen rapportering",
      en: "Clear goals, open reporting",
      ar: "أهداف واضحة وتقارير شفافة",
    },
    body: {
      sv: "Vi kommer överens om vad som ska mätas och redovisar resultaten utan krångel.",
      en: "We agree on what to measure and report the results plainly.",
      ar: "نتفق على ما سيتم قياسه ونعرض النتائج بوضوح ودون تعقيد.",
    },
  },
];

/** The hub page groups the digital services into these three areas, in display order. */
export const digitalAreas = [
  {
    icon: Wrench,
    label: {
      sv: "Bygga",
      en: "Build",
      ar: "البناء",
    } satisfies Localized<string>,
    serviceKeys: [
      "website-creation",
      "saas-development",
      "mobile-app-development",
    ],
  },
  {
    icon: Search,
    label: {
      sv: "Synas",
      en: "Get found",
      ar: "الظهور",
    } satisfies Localized<string>,
    serviceKeys: ["seo", "aeo", "geo"],
  },
  {
    icon: Megaphone,
    label: {
      sv: "Nå ut",
      en: "Reach out",
      ar: "الوصول",
    } satisfies Localized<string>,
    serviceKeys: ["google-ads", "social-media-ads", "social-media-management"],
  },
];

/** FAQs shown on the hub page, in display order: hub-scoped first, then a few service-scoped ones. */
export const DIGITAL_HUB_FAQ_IDS = [
  "faq-digital-what-agency-does",
  "faq-digital-cost",
  "faq-digital-area",
  "faq-digital-languages",
  "faq-digital-why-accounting-firm",
  "faq-seo-vs-ads",
  "faq-geo-what",
  "faq-aeo-what",
];
