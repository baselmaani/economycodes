import {
  Calculator,
  Handshake,
  Languages,
  Layers,
  Rocket,
  Wrench,
} from "lucide-react";

import type { Localized } from "./types";
import type { Benefit, ProcessStep } from "./home";

/**
 * Copy for the /systemutveckling hub page and the homepage development
 * section. The services themselves live in content/services-digital.ts
 * (group "development" in content/service-icons.ts). Scope, delivery and
 * pricing are pending client confirmation (CLIENT-TODO item 21) -- keep
 * claims general, built only from what the service pages already say.
 */
export const developmentMeta = {
  title: {
    sv: "Systemutveckling, appar och SaaS för företag i Sverige",
    en: "Software, app and SaaS development for businesses in Sweden",
    ar: "تطوير الأنظمة والتطبيقات ومنصات SaaS للشركات في السويد",
  } satisfies Localized<string>,
  description: {
    sv: "Systemutveckling för företag i Sverige: skräddarsydda system, SaaS-produkter, mobilappar för iOS och Android och UI/UX-design – från en byrå som också är redovisningsbyrå.",
    en: "Software development for businesses in Sweden: custom systems, SaaS products, iOS and Android apps and UI/UX design – from a firm that is also an accounting firm.",
    ar: "تطوير البرمجيات للشركات في السويد: أنظمة مخصصة ومنتجات SaaS وتطبيقات iOS وAndroid وتصميم UI/UX – من شركة هي أيضًا مكتب محاسبة.",
  } satisfies Localized<string>,
};

export const developmentHero = {
  title: {
    sv: "Systemutveckling och appar för företag i hela Sverige",
    en: "Software and app development for businesses across Sweden",
    ar: "تطوير الأنظمة والتطبيقات للشركات في جميع أنحاء السويد",
  } satisfies Localized<string>,
  /** Direct answer near the top: what we build, for whom, in which languages. */
  lead: {
    sv: "Economy Codes AB designar och bygger digitala produkter för företag och startups: skräddarsydda system och interna verktyg, SaaS-produkter, mobilappar för iOS och Android och användarvänlig UI/UX-design – på svenska, engelska och arabiska.",
    en: "Economy Codes AB designs and builds digital products for businesses and startups: custom systems and internal tools, SaaS products, iOS and Android apps and user-friendly UI/UX design – in Swedish, English and Arabic.",
    ar: "تصمم Economy Codes AB وتبني منتجات رقمية للشركات والشركات الناشئة: أنظمة مخصصة وأدوات داخلية ومنتجات SaaS وتطبيقات iOS وAndroid وتصميم UI/UX سهل الاستخدام – بالسويدية والإنجليزية والعربية.",
  } satisfies Localized<string>,
};

/**
 * Answer-first definition block near the top of the hub. The first
 * paragraph is written to be quotable on its own (featured snippets, AI
 * answers), so keep it short and self-contained.
 */
export const developmentIntro = {
  title: {
    sv: "Vad är systemutveckling?",
    en: "What is software development?",
    ar: "ما هو تطوير البرمجيات؟",
  } satisfies Localized<string>,
  paragraphs: {
    sv: [
      "Systemutveckling är arbetet med att ta fram programvara som löser ett verkligt problem i verksamheten: från att kartlägga behoven och designa hur systemet ska fungera, till att bygga, testa, lansera och vidareutveckla det. Det kan vara en app för dina kunder, en SaaS-produkt du säljer eller ett internt verktyg som ersätter manuellt arbete.",
      "Economy Codes tar hand om hela vägen — användarflöden och design, utveckling och integrationer med de program du redan använder. Vi börjar ofta med en avgränsad första version eller de delar som sparar mest tid, och bygger vidare utifrån hur systemet används. Eftersom vi också är en redovisningsbyrå förstår vi ekonomiflöden, fakturering och administration, vilket gör oss till en naturlig partner för system som rör företagets ekonomi.",
    ],
    en: [
      "Software development is the work of creating software that solves a real business problem: from mapping the needs and designing how the system should work, to building, testing, launching and improving it. It could be an app for your customers, a SaaS product you sell, or an internal tool that replaces manual work.",
      "Economy Codes handles the whole journey — user flows and design, development, and integrations with the software you already use. We often start with a focused first version or the parts that save the most time, then build on it based on how the system is used. Because we're also an accounting firm, we understand financial flows, invoicing and administration, which makes us a natural partner for systems that touch your company's finances.",
    ],
    ar: [
      "تطوير البرمجيات هو العمل على إنشاء برنامج يحل مشكلة حقيقية في نشاطك التجاري: من تحديد الاحتياجات وتصميم طريقة عمل النظام، إلى بنائه واختباره وإطلاقه وتطويره. قد يكون تطبيقًا لعملائك، أو منتج SaaS تبيعه، أو أداة داخلية تحل محل العمل اليدوي.",
      "تتولى Economy Codes المسار كاملًا — تدفقات المستخدم والتصميم والتطوير والربط مع البرامج التي تستخدمها بالفعل. غالبًا ما نبدأ بنسخة أولى محددة أو بالأجزاء التي توفر أكبر قدر من الوقت، ثم نبني عليها وفق طريقة استخدام النظام. ولأننا مكتب محاسبة أيضًا، نفهم التدفقات المالية والفوترة والإدارة، ما يجعلنا شريكًا طبيعيًا للأنظمة المرتبطة بمالية شركتك.",
    ],
  } satisfies Localized<string[]>,
};

/**
 * Plain facts about the development offer, rendered as a <dl> so search
 * engines and AI tools can lift them verbatim. Verified facts only
 * (offices, languages) plus the service list -- see CLIENT-TODO item 21.
 */
export const developmentFacts = {
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
        sv: "Skräddarsydda system och integrationer, SaaS- och MVP-utveckling, mobilappar för iOS och Android, UI/UX-design",
        en: "Custom systems and integrations, SaaS and MVP development, iOS and Android apps, UI/UX design",
        ar: "الأنظمة المخصصة والتكاملات، وتطوير SaaS وMVP، وتطبيقات iOS وAndroid، وتصميم UI/UX",
      },
    },
    {
      label: { sv: "Arbetssätt", en: "Approach", ar: "طريقة العمل" },
      value: {
        sv: "I etapper, med början i det som ger mest nytta",
        en: "In stages, starting with what delivers the most value",
        ar: "على مراحل، بدءًا بما يحقق أكبر فائدة",
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
  ] satisfies { label: Localized<string>; value: Localized<string> }[],
};

export const developmentProcessSteps: ProcessStep[] = [
  {
    title: {
      sv: "Behov och mål",
      en: "Needs and goals",
      ar: "الاحتياجات والأهداف",
    },
    body: {
      sv: "Vi går igenom problemet som ska lösas, vilka som ska använda systemet och vilka program det ska kopplas till.",
      en: "We go through the problem to solve, who will use the system and which software it needs to connect to.",
      ar: "نراجع المشكلة المطلوب حلها، ومن سيستخدم النظام، والبرامج التي يجب ربطه بها.",
    },
  },
  {
    title: {
      sv: "Design och plan",
      en: "Design and plan",
      ar: "التصميم والخطة",
    },
    body: {
      sv: "Användarflöden och prototyper visar hur det ska fungera, och du får en plan för vad som byggs först.",
      en: "User flows and prototypes show how it will work, and you get a plan for what gets built first.",
      ar: "توضح تدفقات المستخدم والنماذج الأولية طريقة العمل، وتحصل على خطة لما سيُبنى أولًا.",
    },
  },
  {
    title: {
      sv: "Utveckling i etapper",
      en: "Development in stages",
      ar: "التطوير على مراحل",
    },
    body: {
      sv: "Vi bygger och testar i omgångar, så att du kan se och prova resultatet längs vägen.",
      en: "We build and test in rounds, so you can see and try the result along the way.",
      ar: "نبني ونختبر على دفعات، لتتمكن من رؤية النتيجة وتجربتها خلال العمل.",
    },
  },
  {
    title: {
      sv: "Lansering och vidareutveckling",
      en: "Launch and further development",
      ar: "الإطلاق والتطوير المستمر",
    },
    body: {
      sv: "Efter lanseringen hjälper vi till med underhåll, uppdateringar och nya funktioner utifrån hur systemet används.",
      en: "After launch, we help with maintenance, updates and new features based on how the system is used.",
      ar: "بعد الإطلاق، نساعد في الصيانة والتحديثات والميزات الجديدة وفق طريقة استخدام النظام.",
    },
  },
];

export const developmentBenefits: Benefit[] = [
  {
    icon: Calculator,
    title: {
      sv: "Vi förstår ekonomin",
      en: "We understand the finances",
      ar: "نفهم الجانب المالي",
    },
    body: {
      sv: "Som redovisningsbyrå kan vi fakturering, moms och administration – värdefullt i system som hanterar pengar.",
      en: "As an accounting firm, we know invoicing, VAT and administration – valuable in systems that handle money.",
      ar: "بصفتنا مكتب محاسبة، نعرف الفوترة وضريبة القيمة المضافة والإدارة – وهذا مفيد في الأنظمة التي تتعامل مع المال.",
    },
  },
  {
    icon: Layers,
    title: {
      sv: "Design och utveckling samlat",
      en: "Design and development together",
      ar: "التصميم والتطوير معًا",
    },
    body: {
      sv: "Samma team tar fram flöden, design och kod, så att inget tappas bort på vägen.",
      en: "The same team works on flows, design and code, so nothing gets lost along the way.",
      ar: "يعمل الفريق نفسه على التدفقات والتصميم والبرمجة، فلا يضيع شيء خلال العمل.",
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
      sv: "Appar och system på svenska, engelska och arabiska, inklusive höger-till-vänster.",
      en: "Apps and systems in Swedish, English and Arabic, including right-to-left.",
      ar: "تطبيقات وأنظمة بالسويدية والإنجليزية والعربية، بما في ذلك الكتابة من اليمين إلى اليسار.",
    },
  },
  {
    icon: Handshake,
    title: {
      sv: "Tydliga avtal om koden",
      en: "Clear agreements on the code",
      ar: "اتفاقات واضحة بشأن الشيفرة",
    },
    body: {
      sv: "Ägande av kod och rättigheter regleras i avtalet innan projektet startar.",
      en: "Ownership of the code and rights is agreed in the contract before the project starts.",
      ar: "تُحدَّد ملكية الشيفرة والحقوق في العقد قبل بدء المشروع.",
    },
  },
];

/** The hub page groups the development services into these areas, in display order. */
export const developmentAreas = [
  {
    icon: Rocket,
    label: {
      sv: "Appar och SaaS",
      en: "Apps and SaaS",
      ar: "التطبيقات وSaaS",
    } satisfies Localized<string>,
    serviceKeys: ["saas-development", "mobile-app-development"],
  },
  {
    icon: Wrench,
    label: {
      sv: "System och design",
      en: "Systems and design",
      ar: "الأنظمة والتصميم",
    } satisfies Localized<string>,
    serviceKeys: ["custom-system-development", "ui-ux-design"],
  },
];

/** FAQs shown on the hub page, in display order (all scoped to a development service). */
export const DEVELOPMENT_HUB_FAQ_IDS = [
  "faq-systems-cost",
  "faq-saas-mvp",
  "faq-saas-ownership",
  "faq-systems-integrations",
  "faq-mobile-app-ios-android",
  "faq-uiux-difference",
];

/** Development teaser on the homepage (components/sections/home/DevelopmentSection.tsx). */
export const homeDevelopment = {
  eyebrow: {
    sv: "Systemutveckling",
    en: "Software development",
    ar: "تطوير البرمجيات",
  } satisfies Localized<string>,
  title: {
    sv: "Appar och system byggda för hur du arbetar",
    en: "Apps and systems built for how you work",
    ar: "تطبيقات وأنظمة مبنية وفق طريقة عملك",
  } satisfies Localized<string>,
  lead: {
    sv: "SaaS-produkter, mobilappar för iOS och Android, skräddarsydda system och UI/UX-design – från första prototyp till lansering och vidareutveckling.",
    en: "SaaS products, iOS and Android apps, custom systems and UI/UX design – from the first prototype to launch and further development.",
    ar: "منتجات SaaS وتطبيقات iOS وAndroid وأنظمة مخصصة وتصميم UI/UX – من النموذج الأولي إلى الإطلاق والتطوير المستمر.",
  } satisfies Localized<string>,
  cta: {
    sv: "Utforska systemutveckling",
    en: "Explore software development",
    ar: "استكشف تطوير البرمجيات",
  } satisfies Localized<string>,
};
