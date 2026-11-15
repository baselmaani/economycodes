import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  Globe2,
  MessagesSquare,
  ShieldCheck,
} from "lucide-react";

import type { Localized } from "./types";

export const homeMeta = {
  title: {
    sv: "Redovisning, bokföringsprogram och marknadsföring | Economy Codes",
    en: "Accounting, accounting software and marketing | Economy Codes",
    ar: "المحاسبة وبرنامج المحاسبة والتسويق | Economy Codes",
  } satisfies Localized<string>,
  description: {
    sv: "Srf-auktoriserad redovisningsbyrå med eget bokföringsprogram och digital marknadsföring. Vi sköter ekonomin åt dig – eller så bokför du själv i vårt program.",
    en: "Srf-authorized accounting firm with its own accounting software and digital marketing. We handle your books for you – or you do them yourself in our software.",
    ar: "مكتب محاسبة معتمد من Srf لديه برنامج محاسبة خاص وخدمات تسويق رقمي. نتولى حساباتك نيابةً عنك، أو تمسك دفاترك بنفسك في برنامجنا.",
  } satisfies Localized<string>,
};

export const heroContent = {
  title: {
    sv: "Redovisning, bokföringsprogram och marknadsföring för småföretag",
    en: "Accounting, accounting software and marketing for small businesses",
    ar: "المحاسبة وبرنامج المحاسبة والتسويق الرقمي للشركات الصغيرة",
  } satisfies Localized<string>,
  subtitle: {
    sv: "Economy Codes AB är en auktoriserad redovisningsbyrå. Låt oss sköta bokföringen åt dig, gör den själv i vårt eget bokföringsprogram eller få hjälp att nå fler kunder online – på svenska, engelska och arabiska.",
    en: "Economy Codes AB is an authorized accounting firm. Let us handle your bookkeeping, do it yourself in our own accounting software, or get help reaching more customers online – in Swedish, English and Arabic.",
    ar: "Economy Codes AB مكتب محاسبة معتمد. دعنا نتولى مسك دفاترك، أو تولَّه بنفسك في برنامج المحاسبة الخاص بنا، أو احصل على مساعدة للوصول إلى عملاء أكثر عبر الإنترنت – بالسويدية والإنجليزية والعربية.",
  } satisfies Localized<string>,
  imageAlt: {
    sv: "Economy Codes, redovisning och företagsrådgivning",
    en: "Economy Codes, accounting and business advisory",
    ar: "Economy Codes، محاسبة واستشارات أعمال",
  } satisfies Localized<string>,
};

/**
 * Content for the "Verified authorization and trust" and "Why choose an
 * authorized accounting firm?" homepage sections. Facts reflect the
 * confirmed authorization: Economy Codes AB is an Srf Auktoriserad
 * Redovisningsbyrå, and Hadi Al Maani personally holds both Auktoriserad
 * Redovisningskonsult and Auktoriserad Lönekonsult, all via Srf konsulterna.
 * No Srf register URL is confirmed yet, so no verification link is included.
 */
export const authorizationContent = {
  intro: {
    sv: "Economy Codes AB är en auktoriserad redovisningsbyrå, godkänd av Srf konsulterna som Srf Auktoriserad Redovisningsbyrå. Hadi Al Maani är dessutom personligen auktoriserad redovisningskonsult och auktoriserad lönekonsult. Det innebär att vår verksamhet följer branschens krav på kompetens, kvalitet och yrkesetik.",
    en: "Economy Codes AB is an authorized accounting firm, certified by Srf konsulterna as an Srf Auktoriserad Redovisningsbyrå (Srf-authorized accounting firm). Hadi Al Maani is also personally authorized as an Auktoriserad Redovisningskonsult (authorized accounting consultant) and Auktoriserad Lönekonsult (authorized payroll consultant). This means our work follows the industry's requirements for competence, quality, and professional ethics.",
    ar: "شركة Economy Codes AB مكتب محاسبة معتمد، حاصل على شهادة Srf Auktoriserad Redovisningsbyrå (مكتب محاسبة معتمد) من منظمة Srf konsulterna السويدية. كما يحمل هادي المعاني اعتماد Auktoriserad Redovisningskonsult (مستشار محاسبة معتمد) و Auktoriserad Lönekonsult (مستشار رواتب معتمد) بشكل فردي. ويعني ذلك أن عملنا يلتزم بمتطلبات القطاع من الكفاءة والجودة والأخلاقيات المهنية.",
  } satisfies Localized<string>,
  firm: {
    /** Proper-noun designation, kept consistent across locales. */
    credential: "Srf Auktoriserad Redovisningsbyrå",
    body: {
      sv: "Vår byrå är auktoriserad av Srf konsulterna, branschorganisationen för redovisnings- och lönekonsulter i Sverige. Auktorisationen innebär regelbunden kvalitetskontroll och krav på fortlöpande kompetensutveckling.",
      en: "Our firm is authorized by Srf konsulterna, the industry organization for accounting and payroll consultants in Sweden. The authorization involves regular quality reviews and requirements for continuing professional education.",
      ar: "مكتبنا معتمد من منظمة Srf konsulterna، وهي الهيئة المهنية لمستشاري المحاسبة والرواتب في السويد. ويستوجب هذا الاعتماد خضوعنا لمراجعات جودة دورية والالتزام بمتطلبات التطوير المهني المستمر.",
    } satisfies Localized<string>,
  },
  person: {
    /** Proper-noun designations, kept consistent across locales. */
    credentials: [
      "Auktoriserad Redovisningskonsult",
      "Auktoriserad Lönekonsult",
    ],
    body: {
      sv: "Hadi är personligen auktoriserad redovisningskonsult och auktoriserad lönekonsult, vilket innebär att han uppfyller Srf:s krav på utbildning, erfarenhet och yrkesetik inom både redovisning och lönehantering.",
      en: "Hadi is personally authorized as both an accounting consultant and a payroll consultant, meeting Srf's requirements for education, experience, and professional ethics in both accounting and payroll.",
      ar: "هادي معتمد شخصيًا كمستشار محاسبة ومستشار رواتب، ما يعني استيفاءه لمتطلبات منظمة Srf من التعليم والخبرة والأخلاقيات المهنية في كل من المحاسبة والرواتب.",
    } satisfies Localized<string>,
    /**
     * Per-credential detail, used on the /om-hadi page. Generic descriptions
     * of what each Srf authorization covers (industry-standard scope, not a
     * specific claim about Hadi's individual experience) -- same register as
     * `consultantVsAuditor` below.
     */
    credentialDetails: [
      {
        label: "Auktoriserad Redovisningskonsult",
        body: {
          sv: "Innebär att Hadi uppfyller Srf:s krav på utbildning, erfarenhet och yrkesetik inom löpande redovisning, bokslut och ekonomisk rådgivning till företag.",
          en: "Means Hadi meets Srf's requirements for education, experience, and professional ethics in ongoing bookkeeping, annual accounts, and financial advisory for businesses.",
          ar: "يعني أن هادي يستوفي متطلبات منظمة Srf من التعليم والخبرة والأخلاقيات المهنية في مسك الدفاتر المستمر والحسابات الختامية والاستشارات المالية للشركات.",
        } satisfies Localized<string>,
      },
      {
        label: "Auktoriserad Lönekonsult",
        body: {
          sv: "Innebär att Hadi uppfyller Srf:s krav på utbildning, erfarenhet och yrkesetik inom löneadministration och arbetsgivarfrågor.",
          en: "Means Hadi meets Srf's requirements for education, experience, and professional ethics in payroll administration and employer-related matters.",
          ar: "يعني أن هادي يستوفي متطلبات منظمة Srf من التعليم والخبرة والأخلاقيات المهنية في إدارة الرواتب والمسائل المتعلقة بأصحاب العمل.",
        } satisfies Localized<string>,
      },
    ] satisfies { label: string; body: Localized<string> }[],
  },
  issuingBody: {
    /** Proper noun, kept consistent across locales. */
    name: "Srf konsulterna",
    description: {
      sv: "Srf konsulterna är branschorganisationen för redovisnings- och lönekonsulter i Sverige. Auktorisationen är en branschcertifiering, inte ett statligt tillstånd, och bygger på fastställda krav på utbildning, erfarenhet, försäkring och löpande kvalitetskontroll.",
      en: "Srf konsulterna is the industry organization for accounting and payroll consultants in Sweden. The authorization is an industry certification, not a government license, and is based on set requirements for education, experience, insurance, and ongoing quality control.",
      ar: "منظمة Srf konsulterna هي الهيئة المهنية لمستشاري المحاسبة والرواتب في السويد. والاعتماد هو شهادة مهنية صادرة عن القطاع وليس ترخيصًا حكوميًا، ويستند إلى متطلبات محددة تتعلق بالتعليم والخبرة والتأمين ومراقبة الجودة المستمرة.",
    } satisfies Localized<string>,
  },
  consultantVsAuditor: {
    consultant: {
      label: {
        sv: "Auktoriserad redovisningskonsult",
        en: "Authorized accounting consultant",
        ar: "مستشار المحاسبة المعتمد",
      } satisfies Localized<string>,
      body: {
        sv: "En auktoriserad redovisningskonsult arbetar löpande med bokföring, lön, moms och rådgivning åt sina kunder.",
        en: "An authorized accounting consultant works on an ongoing basis with bookkeeping, payroll, VAT, and advisory support for clients.",
        ar: "يعمل مستشار المحاسبة المعتمد بشكل مستمر على مسك الدفاتر والرواتب وضريبة القيمة المضافة وتقديم الاستشارات للعملاء.",
      } satisfies Localized<string>,
    },
    auditor: {
      label: {
        sv: "Revisor",
        en: "Auditor (revisor)",
        ar: "المدقق (Revisor)",
      } satisfies Localized<string>,
      body: {
        sv: "En revisor har i stället en oberoende, granskande roll och uttalar sig om ett företags årsredovisning i en revisionsberättelse.",
        en: "An auditor (revisor), by contrast, holds an independent, reviewing role and issues an opinion on a company's annual accounts in an audit report.",
        ar: "أما المدقق (Revisor) فيتولى دورًا رقابيًا مستقلًا، إذ يبدي رأيه في القوائم المالية السنوية للشركة ضمن تقرير تدقيق.",
      } satisfies Localized<string>,
    },
    note: {
      sv: "De flesta små och medelstora aktiebolag i Sverige har inte revisionsplikt, men kan ändå ha nytta av en auktoriserad redovisningskonsult för sin löpande ekonomi. Auktorisationen ger dig som kund en tydlig referenspunkt: du kan alltid kontrollera en konsults auktorisation direkt hos Srf konsulterna.",
      en: "Most small and medium-sized Swedish limited companies aren't required to have an auditor, but can still benefit from an authorized accounting consultant for their day-to-day finances. The authorization gives you, as a customer, a clear reference point — you can always verify a consultant's authorization directly with Srf konsulterna.",
      ar: "ولا تخضع معظم الشركات المحدودة الصغيرة والمتوسطة في السويد لالتزام إلزامي بالتدقيق، لكنها قد تستفيد رغم ذلك من مستشار محاسبة معتمد لإدارة شؤونها المالية اليومية. ويمنحك هذا الاعتماد كعميل نقطة مرجعية واضحة، إذ يمكنك دائمًا التحقق من اعتماد أي مستشار مباشرة لدى منظمة Srf konsulterna.",
    } satisfies Localized<string>,
  },
};

export const digitalNationwideContent = {
  body: {
    sv: "Economy Codes AB arbetar digitalt med företag i hela Sverige, inte bara i närheten av våra kontor. Med digitala verktyg för bokföring, säker filöverföring och tydlig kommunikation kan vi hjälpa dig oavsett var ditt företag är registrerat eller var du bor.",
    en: "Economy Codes AB works digitally with businesses across Sweden, not only near our offices. With digital bookkeeping tools, secure file sharing, and clear communication, we can help you regardless of where your company is registered or where you live.",
    ar: "تعمل Economy Codes AB رقميًا مع الشركات في جميع أنحاء السويد، وليس فقط بالقرب من مكاتبنا. وباستخدام أدوات المحاسبة الرقمية ومشاركة الملفات الآمنة والتواصل الواضح، يمكننا مساعدتك بغض النظر عن مكان تسجيل شركتك أو مكان إقامتك.",
  } satisfies Localized<string>,
  points: {
    sv: [
      "Digital insamling och delning av underlag",
      "Möten på telefon eller video när det passar dig",
      "Arbete i Fortnox och andra molnbaserade system",
      "Fysiska kontor i Mellerud och Trollhättan för dig som vill träffas på plats",
    ],
    en: [
      "Digital collection and sharing of documentation",
      "Meetings by phone or video whenever it suits you",
      "Work in Fortnox and other cloud-based systems",
      "Physical offices in Mellerud and Trollhättan for clients who prefer to meet in person",
    ],
    ar: [
      "جمع المستندات ومشاركتها رقميًا",
      "اجتماعات عبر الهاتف أو الفيديو في الوقت الذي يناسبك",
      "العمل على نظام Fortnox وأنظمة سحابية أخرى",
      "مكاتب فعلية في ميلَّروود وتروللهاتان لمن يفضل اللقاء الشخصي",
    ],
  } satisfies Localized<string[]>,
};

export const languageSupportContent = {
  body: {
    sv: "Vi vet att det kan vara svårt att förklara sin ekonomiska situation på ett språk som inte är ens modersmål. Därför kan du kommunicera med oss på svenska, engelska eller arabiska — oavsett om du precis har startat företag i Sverige eller drivit verksamhet i många år.",
    en: "We know it can be difficult to explain your financial situation in a language that isn't your own. That's why you can communicate with us in Swedish, English, or Arabic — whether you've just started a business in Sweden or have been running one for years.",
    ar: "ندرك أنه قد يكون من الصعب شرح وضعك المالي بلغة ليست لغتك الأم. لذلك يمكنك التواصل معنا بالسويدية أو الإنجليزية أو العربية — سواء كنت قد بدأت للتو نشاطًا تجاريًا في السويد أو تدير عملك منذ سنوات.",
  } satisfies Localized<string>,
};

export const whoWeHelp: Localized<string[]> = {
  sv: [
    "Enskilda näringsidkare",
    "Aktiebolag och andra företagsformer",
    "Ideella föreningar",
    "Utländska grundare som etablerar sig i Sverige",
    "Arabisktalande företagare",
  ],
  en: [
    "Sole traders",
    "Limited companies and other business forms",
    "Non-profit associations",
    "Foreign founders establishing themselves in Sweden",
    "Arabic-speaking business owners",
  ],
  ar: [
    "المنشآت الفردية",
    "الشركات المحدودة وأشكال الأعمال الأخرى",
    "الجمعيات غير الربحية",
    "المؤسسون الأجانب الذين يتأسسون في السويد",
    "أصحاب الأعمال الناطقون بالعربية",
  ],
};

export interface ProcessStep {
  title: Localized<string>;
  body: Localized<string>;
}

export const processSteps: ProcessStep[] = [
  {
    title: {
      sv: "Vi lyssnar på ditt behov",
      en: "We listen to what you need",
      ar: "نستمع إلى احتياجك",
    },
    body: {
      sv: "Du berättar vad du behöver hjälp med, på det språk du är mest bekväm med.",
      en: "You tell us what you need help with, in the language you're most comfortable with.",
      ar: "تخبرنا بما تحتاج مساعدة فيه، باللغة التي تشعر فيها بالراحة أكثر.",
    },
  },
  {
    title: {
      sv: "Vi går igenom din situation",
      en: "We review your situation",
      ar: "نراجع وضعك",
    },
    body: {
      sv: "Vi kartlägger vad som gäller för just ditt företag innan vi föreslår nästa steg.",
      en: "We map out what applies specifically to your company before suggesting next steps.",
      ar: "نحدد ما ينطبق تحديدًا على شركتك قبل اقتراح الخطوات التالية.",
    },
  },
  {
    title: {
      sv: "Vi hjälper dig genomföra",
      en: "We help you carry it out",
      ar: "نساعدك على التنفيذ",
    },
    body: {
      sv: "Vi stöttar dig praktiskt genom processen, steg för steg.",
      en: "We support you practically through the process, step by step.",
      ar: "ندعمك عمليًا خلال العملية، خطوة بخطوة.",
    },
  },
  {
    title: {
      sv: "Vi finns kvar",
      en: "We stay with you",
      ar: "نبقى بجانبك",
    },
    body: {
      sv: "Löpande kontakt när nya frågor dyker upp.",
      en: "Ongoing contact whenever new questions come up.",
      ar: "تواصل مستمر عند ظهور أي أسئلة جديدة.",
    },
  },
];

export interface Benefit {
  icon: LucideIcon;
  title: Localized<string>;
  body: Localized<string>;
}

export const benefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: {
      sv: "Ordning och reda",
      en: "Order and structure",
      ar: "التنظيم والوضوح",
    },
    body: {
      sv: "Tydlig struktur på din bokföring och rapportering.",
      en: "A clear structure for your bookkeeping and reporting.",
      ar: "هيكل واضح لمحاسبتك وتقاريرك.",
    },
  },
  {
    icon: MessagesSquare,
    title: {
      sv: "Flerspråkig kommunikation",
      en: "Multilingual communication",
      ar: "تواصل متعدد اللغات",
    },
    body: {
      sv: "Svenska, engelska och arabiska efter behov.",
      en: "Swedish, English, and Arabic as needed.",
      ar: "بالسويدية والإنجليزية والعربية بحسب الحاجة.",
    },
  },
  {
    icon: Globe2,
    title: {
      sv: "Praktisk kunskap om Sverige",
      en: "Practical knowledge of Sweden",
      ar: "معرفة عملية بالسويد",
    },
    body: {
      sv: "Vägledning genom svenska myndigheter och processer.",
      en: "Guidance through Swedish authorities and processes.",
      ar: "توجيه عبر الجهات الرسمية السويدية وإجراءاتها.",
    },
  },
  {
    icon: CheckCircle2,
    title: {
      sv: "Rak kommunikation",
      en: "Straightforward communication",
      ar: "تواصل صريح",
    },
    body: {
      sv: "Tydliga svar, utan att lova mer än vad vi vet håller.",
      en: "Clear answers, without promising more than we know holds true.",
      ar: "إجابات واضحة، دون الوعد بأكثر مما نعلم أنه صحيح.",
    },
  },
];

/**
 * The three business areas shown as quick-choice cards under the hero
 * (components/sections/home/AreasSection.tsx). Order is fixed: the links and
 * icons for accounting, marketing and the accounting software live in code.
 */
export const homeAreas = {
  lead: {
    sv: "Med redovisning sköter vi bokföringen åt dig. Med bokföringsprogrammet gör du den själv. Vill du ha fler kunder hjälper vi dig att synas online, och behöver du en app eller ett eget system bygger vi det.",
    en: "With accounting services, we do the bookkeeping for you. With the accounting software, you do it yourself. If you want more customers, we help you get found online, and if you need an app or a system of your own, we build it.",
    ar: "مع خدمات المحاسبة نتولى مسك الدفاتر نيابةً عنك. ومع برنامج المحاسبة تتولاه بنفسك. وإذا كنت تريد عملاء أكثر فنساعدك على الظهور عبر الإنترنت، وإذا كنت تحتاج إلى تطبيق أو نظام خاص فنحن نبنيه.",
  } satisfies Localized<string>,
  eyebrow: {
    sv: "Välj rätt hjälp",
    en: "Choose the right help",
    ar: "اختر المساعدة المناسبة",
  } satisfies Localized<string>,
  title: {
    sv: "Redovisning eller bokföringsprogram – vad passar dig?",
    en: "Accounting services or accounting software – which suits you?",
    ar: "خدمات المحاسبة أم برنامج المحاسبة – أيهما يناسبك؟",
  } satisfies Localized<string>,
  items: [
    {
      title: { sv: "Redovisning", en: "Accounting", ar: "المحاسبة" },
      body: {
        sv: "Passar dig som vill lämna över bokföring, lön, moms, bokslut och deklaration till en Srf-auktoriserad redovisningsbyrå.",
        en: "For you who want to hand over bookkeeping, payroll, VAT, annual accounts and tax returns to an Srf-authorized accounting firm.",
        ar: "مناسب لك إذا كنت تريد تسليم مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية إلى مكتب محاسبة معتمد من Srf.",
      },
    },
    {
      title: {
        sv: "Digital marknadsföring",
        en: "Digital marketing",
        ar: "التسويق الرقمي",
      },
      body: {
        sv: "Passar dig som vill att fler kunder hittar företaget, med webbplats, SEO, annonsering och sociala medier.",
        en: "For you who want more customers to find your business, with a website, SEO, advertising and social media.",
        ar: "مناسب لك إذا كنت تريد أن يجد المزيد من العملاء شركتك، عبر موقع إلكتروني وتحسين محركات البحث والإعلانات ووسائل التواصل الاجتماعي.",
      },
    },
    {
      title: {
        sv: "Bokföringsprogram",
        en: "Accounting software",
        ar: "برنامج المحاسبة",
      },
      body: {
        sv: "Passar dig som vill sköta fakturering, bokföring och lön själv, i ett program byggt för svenska småföretag.",
        en: "For you who want to handle invoicing, bookkeeping and payroll yourself, in software built for Swedish small businesses.",
        ar: "مناسب لك إذا كنت تريد إدارة الفوترة ومسك الدفاتر والرواتب بنفسك، في برنامج مصمم للشركات السويدية الصغيرة.",
      },
    },
    {
      title: {
        sv: "Systemutveckling",
        en: "Software development",
        ar: "تطوير البرمجيات",
      },
      body: {
        sv: "Passar dig som behöver en app, en SaaS-produkt eller ett eget system som är byggt för hur ditt företag arbetar.",
        en: "For you who need an app, a SaaS product or a system of your own, built around how your business works.",
        ar: "مناسب لك إذا كنت تحتاج إلى تطبيق أو منتج SaaS أو نظام خاص مبني وفق طريقة عمل شركتك.",
      },
    },
  ] satisfies { title: Localized<string>; body: Localized<string> }[],
};

/** Accounting software teaser on the homepage (components/sections/home/SoftwareSection.tsx). */
export const homeSoftware = {
  eyebrow: {
    sv: "Bokföringsprogram",
    en: "Accounting software",
    ar: "برنامج المحاسبة",
  } satisfies Localized<string>,
  title: {
    sv: "Sköt fakturering, bokföring och lön i Economy Codes",
    en: "Handle invoicing, bookkeeping and payroll in Economy Codes",
    ar: "أدِر الفوترة ومسك الدفاتر والرواتب في Economy Codes",
  } satisfies Localized<string>,
  lead: {
    sv: "Vårt eget bokföringsprogram för svenska småföretag. Skicka fakturor och följ betalningarna, bokför med kvitton som underlag, redovisa moms, flytta bokföring med SIE och skapa lönebesked.",
    en: "Our own accounting software for Swedish small businesses. Send invoices and follow payments, book with receipts attached, report VAT, move your books with SIE and create payslips.",
    ar: "برنامج المحاسبة الخاص بنا للشركات السويدية الصغيرة. أرسل الفواتير وتابع المدفوعات، وسجّل القيود مع إرفاق الإيصالات، وصرّح بالضريبة، وانقل دفاترك عبر SIE، وأنشئ قسائم الرواتب.",
  } satisfies Localized<string>,
  cta: {
    sv: "Läs mer om bokföringsprogrammet",
    en: "Read more about the software",
    ar: "اقرأ المزيد عن البرنامج",
  } satisfies Localized<string>,
};

/** Eyebrows and one-line descriptions that give every homepage section the same header. */
export const homeSectionHeaders = {
  processEyebrow: { sv: "Så arbetar vi", en: "How we work", ar: "كيف نعمل" },
  processLead: {
    sv: "Fyra steg från första kontakt till löpande stöd.",
    en: "Four steps from the first conversation to ongoing support.",
    ar: "أربع خطوات من التواصل الأول إلى الدعم المستمر.",
  },
  aboutEyebrow: { sv: "Din konsult", en: "Your consultant", ar: "مستشارك" },
  aboutLead: {
    sv: "Personlig service från en auktoriserad redovisnings- och lönekonsult.",
    en: "Personal service from an authorized accounting and payroll consultant.",
    ar: "خدمة شخصية من مستشار محاسبة ورواتب معتمد.",
  },
  faqEyebrow: {
    sv: "Frågor och svar",
    en: "Questions and answers",
    ar: "أسئلة وأجوبة",
  },
  faqLead: {
    sv: "Svar på det våra kunder oftast undrar över – hittar du inte ditt svar, kontakta oss.",
    en: "Answers to what our clients ask most often – if yours isn't here, contact us.",
    ar: "إجابات عن أكثر ما يسأل عنه عملاؤنا – إن لم تجد إجابتك فتواصل معنا.",
  },
} satisfies Record<string, Localized<string>>;
