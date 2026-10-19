import type { Localized } from "./types";

/**
 * Search-result copy for each service page: a keyword-led <title> (without
 * the " | Economy Codes" suffix the layout adds) and a meta description.
 * Kept separate from content/services.ts, whose `summary` is 200-350
 * characters -- right for the page itself but cut off in search results.
 * Limits enforced by tests/unit/content-integrity.test.ts: title <= 44
 * characters (60 with the suffix), description 70-160 characters. Claims must
 * stay within what each service's own summary already says.
 */
export interface ServiceMeta {
  title: Localized<string>;
  description: Localized<string>;
}

export const serviceMeta: Record<string, ServiceMeta> = {
  bookkeeping: {
    title: {
      sv: "Bokföring för småföretag i Sverige",
      en: "Bookkeeping for small businesses in Sweden",
      ar: "المحاسبة ومسك الدفاتر في السويد",
    },
    description: {
      sv: "Bokföring för aktiebolag och enskilda firmor i hela Sverige från en Srf-auktoriserad redovisningsbyrå. Service på svenska, engelska och arabiska.",
      en: "Bookkeeping for limited companies and sole traders across Sweden from an Srf-authorized accounting firm. Service in Swedish, English and Arabic.",
      ar: "محاسبة ومسك دفاتر للشركات المحدودة والمنشآت الفردية في جميع أنحاء السويد من مكتب محاسبة معتمد من Srf. خدمة بالعربية والسويدية والإنجليزية.",
    },
  },
  "tax-reporting": {
    title: {
      sv: "Moms och skattedeklaration i Sverige",
      en: "VAT and tax returns for businesses in Sweden",
      ar: "الضريبة والإقرار الضريبي للشركات في السويد",
    },
    description: {
      sv: "Hjälp med moms och deklaration för företag i Sverige – rätt underlag i tid till Skatteverket. Srf-auktoriserad byrå, service på svenska, engelska och arabiska.",
      en: "Help with VAT and tax returns for businesses in Sweden – the right documents to Skatteverket on time. Srf-authorized firm, service in English and Arabic.",
      ar: "مساعدة في ضريبة القيمة المضافة والإقرارات الضريبية للشركات في السويد، وتقديم المستندات الصحيحة إلى Skatteverket في الوقت المحدد. خدمة بالعربية.",
    },
  },
  "business-registration": {
    title: {
      sv: "Starta företag i Sverige – registrering",
      en: "Register a company in Sweden – step by step",
      ar: "تسجيل شركة في السويد خطوة بخطوة",
    },
    description: {
      sv: "Hjälp att starta företag i Sverige: val av bolagsform och praktiska steg hos Bolagsverket och Skatteverket. På svenska, engelska och arabiska.",
      en: "Help starting a company in Sweden: choosing a company type and the practical steps with Bolagsverket and Skatteverket. In Swedish, English and Arabic.",
      ar: "مساعدة في تأسيس شركة في السويد: اختيار نوع الشركة والخطوات العملية لدى Bolagsverket وSkatteverket. بالعربية والسويدية والإنجليزية.",
    },
  },
  "association-formation": {
    title: {
      sv: "Bilda förening i Sverige – stadgar & start",
      en: "Forming an association in Sweden",
      ar: "تأسيس جمعية في السويد",
    },
    description: {
      sv: "Praktisk hjälp att bilda och administrera föreningar i Sverige – stadgar, konstituerande möte och löpande administration. På svenska, engelska och arabiska.",
      en: "Practical help forming and running an association in Sweden – bylaws, the founding meeting and ongoing administration. In Swedish, English and Arabic.",
      ar: "مساعدة عملية في تأسيس الجمعيات وإدارتها في السويد: النظام الأساسي والاجتماع التأسيسي والإدارة المستمرة. بالعربية والسويدية والإنجليزية.",
    },
  },
  "feasibility-budget": {
    title: {
      sv: "Affärsplan, budget och genomförbarhetsstudie",
      en: "Business plan, budget and feasibility study",
      ar: "خطة العمل والميزانية ودراسة الجدوى",
    },
    description: {
      sv: "Affärsplan, budget och genomförbarhetsstudie som visar om din idé bär sig ekonomiskt – ett tydligt underlag för dig, banken och andra parter.",
      en: "A business plan, budget and feasibility study that show whether your idea is financially viable – a clear document for you, your bank and partners.",
      ar: "خطة عمل وميزانية ودراسة جدوى توضح ما إذا كانت فكرتك مجدية ماليًا — مستند واضح لك وللبنك وللشركاء.",
    },
  },
  contracts: {
    title: {
      sv: "Avtal och kontrakt – praktiskt stöd",
      en: "Contracts and agreements – practical support",
      ar: "دعم عملي في العقود والاتفاقيات",
    },
    description: {
      sv: "Praktiskt stöd med avtal och kontrakt för din verksamhet – struktur och genomgång av underlag före signering. Juridisk rådgivning hänvisas vidare.",
      en: "Practical support with business contracts and agreements – structuring and reviewing documents before signing. Legal advice is referred onward.",
      ar: "دعم عملي في عقود واتفاقيات نشاطك التجاري — تنظيم المستندات ومراجعتها قبل التوقيع، مع الإحالة إلى مختص عند الحاجة إلى استشارة قانونية.",
    },
  },
  "investment-establishment": {
    title: {
      sv: "Etablera företag i Sverige från utlandet",
      en: "Establish a business in Sweden from abroad",
      ar: "تأسيس شركة في السويد من الخارج",
    },
    description: {
      sv: "Praktisk vägledning för dig som vill etablera verksamhet eller investera i Sverige. Service på svenska, engelska och arabiska. Inte en migrationstjänst.",
      en: "Practical guidance for investors and founders establishing a business in Sweden, in English, Arabic or Swedish. Not an immigration service.",
      ar: "توجيه عملي للمستثمرين ورواد الأعمال الراغبين في تأسيس نشاط تجاري في السويد، بالعربية والإنجليزية والسويدية. ليست خدمة هجرة.",
    },
  },
  payroll: {
    title: {
      sv: "Löneadministration för företag i Sverige",
      en: "Payroll services for businesses in Sweden",
      ar: "إدارة الرواتب للشركات في السويد",
    },
    description: {
      sv: "Lönekörning och arbetsgivardeklaration, korrekt och i tid varje månad. Auktoriserad lönekonsult med service på svenska, engelska och arabiska.",
      en: "Payroll runs and employer tax returns, accurate and on time every month. Authorized payroll consultant, service in Swedish, English and Arabic.",
      ar: "تنفيذ الرواتب وإقرارات صاحب العمل بدقة وفي الموعد كل شهر. مستشار رواتب معتمد، وخدمة بالعربية والسويدية والإنجليزية.",
    },
  },
  "annual-closing": {
    title: {
      sv: "Bokslut och årsredovisning för aktiebolag",
      en: "Annual accounts and annual reports in Sweden",
      ar: "الإغلاق السنوي والقوائم المالية في السويد",
    },
    description: {
      sv: "Bokslut och årsredovisning för aktiebolag och andra företag – sammanställt, avstämt och inlämnat till Bolagsverket i tid. Srf-auktoriserad byrå.",
      en: "Annual accounts and annual reports for limited companies – compiled, checked and filed with Bolagsverket on time. Srf-authorized accounting firm.",
      ar: "إعداد الحسابات الختامية والقوائم المالية السنوية للشركات المحدودة وتقديمها إلى Bolagsverket في الوقت المحدد. مكتب محاسبة معتمد من Srf.",
    },
  },
  advisory: {
    title: {
      sv: "Ekonomisk rådgivning för företag i Sverige",
      en: "Financial advice for businesses in Sweden",
      ar: "استشارات مالية للشركات في السويد",
    },
    description: {
      sv: "Få bättre koll på lönsamhet, likviditet och utveckling. Konkreta råd utifrån ditt företags faktiska siffror – på svenska, engelska eller arabiska.",
      en: "Get a clearer view of profitability, cash flow and growth. Concrete advice based on your company's actual numbers – in Swedish, English or Arabic.",
      ar: "افهم ربحية شركتك وسيولتها وتطورها بشكل أفضل. نصائح عملية مبنية على الأرقام الفعلية لشركتك — بالعربية أو السويدية أو الإنجليزية.",
    },
  },
  "bookkeeping-correction": {
    title: {
      sv: "Rätta fel i bokföringen – hjälp i Sverige",
      en: "Fix bookkeeping errors – help in Sweden",
      ar: "تصحيح أخطاء المحاسبة في السويد",
    },
    description: {
      sv: "Felaktiga poster, saknade verifikationer eller bokföring som inte stämmer mot banken? Vi går igenom och rättar så att bokföringen blir korrekt igen.",
      en: "Incorrect entries, missing vouchers or books that don't match the bank? We review and correct them so your bookkeeping is accurate again.",
      ar: "قيود خاطئة أو مستندات مفقودة أو محاسبة لا تتطابق مع البنك؟ نراجعها ونصححها لتعود محاسبتك دقيقة من جديد.",
    },
  },
  "fortnox-support": {
    title: {
      sv: "Fortnox-hjälp – bokföring i Fortnox",
      en: "Fortnox help – bookkeeping in Fortnox",
      ar: "مساعدة في Fortnox للمحاسبة",
    },
    description: {
      sv: "Hjälp med Fortnox: löpande bokföring, avstämningar och praktiska frågor om funktionerna – för dig som använder Fortnox eller funderar på att börja.",
      en: "Help with Fortnox: ongoing bookkeeping, reconciliations and practical questions about features – whether you already use Fortnox or are starting.",
      ar: "مساعدة في Fortnox: المحاسبة المستمرة والمطابقات والأسئلة العملية حول الميزات — سواء كنت تستخدمه بالفعل أو تفكر في البدء.",
    },
  },
  "car-dealership-accounting": {
    title: {
      sv: "Bokföring för bilhandlare och VMB",
      en: "Car dealership accounting and VMB in Sweden",
      ar: "محاسبة تجار السيارات وضريبة هامش الربح",
    },
    description: {
      sv: "Bokföring och vinstmarginalbeskattning (VMB) för bilhandlare och andra som köper och säljer begagnade fordon – korrekt moms för varje fordonsaffär.",
      en: "Bookkeeping and profit margin taxation (VMB) for car dealers and others trading used vehicles in Sweden – correct VAT on every vehicle deal.",
      ar: "محاسبة وضريبة هامش الربح (VMB) لتجار السيارات ومن يبيعون ويشترون المركبات المستعملة في السويد — ضريبة صحيحة لكل صفقة.",
    },
  },
  "arabic-speaking-accounting": {
    title: {
      sv: "Arabisktalande redovisningskonsult i Sverige",
      en: "Arabic-speaking accountant in Sweden",
      ar: "محاسب يتحدث العربية في السويد",
    },
    description: {
      sv: "Auktoriserad redovisningskonsult som talar arabiska – bokföring, lön, moms, bokslut och deklaration för företag i hela Sverige.",
      en: "Authorized accounting consultant who speaks Arabic – bookkeeping, payroll, VAT, annual accounts and tax returns for businesses across Sweden.",
      ar: "مستشار محاسبة معتمد يتحدث العربية: مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية للشركات في كل السويد.",
    },
  },
  "website-creation": {
    title: {
      sv: "Hemsida för företag – webbyrå i Sverige",
      en: "Website design for businesses in Sweden",
      ar: "تصميم مواقع إلكترونية للشركات في السويد",
    },
    description: {
      sv: "Snabba, mobilanpassade hemsidor för småföretag – även flerspråkiga på svenska, engelska och arabiska. Byggda med SEO och tydliga kontaktvägar.",
      en: "Fast, mobile-friendly websites for small businesses in Sweden – including multilingual sites in Swedish, English and Arabic, built with SEO.",
      ar: "مواقع سريعة ومتوافقة مع الجوال للشركات الصغيرة في السويد، بما فيها مواقع متعددة اللغات بالعربية والسويدية والإنجليزية ومهيأة لمحركات البحث.",
    },
  },
  seo: {
    title: {
      sv: "SEO-byrå – sökmotoroptimering i Sverige",
      en: "SEO services for businesses in Sweden",
      ar: "خدمات تحسين محركات البحث SEO في السويد",
    },
    description: {
      sv: "Syns på Google när kunderna söker. Teknisk SEO, innehåll, lokal synlighet och Google-företagsprofil – med tydliga rapporter om utvecklingen.",
      en: "Get found on Google when customers search. Technical SEO, content, local visibility and Google Business Profile – with clear progress reports.",
      ar: "اظهر في جوجل عندما يبحث العملاء. تحسين تقني ومحتوى وظهور محلي وملف النشاط التجاري على جوجل — مع تقارير واضحة عن التقدم.",
    },
  },
  aeo: {
    title: {
      sv: "AEO – syns i Googles svar och AI-svar",
      en: "AEO – answer engine optimization",
      ar: "تحسين محركات الإجابة AEO",
    },
    description: {
      sv: "Answer Engine Optimization: vi strukturerar ditt innehåll med tydliga svar, vanliga frågor och strukturerad data som Google och AI-assistenter återger.",
      en: "Answer engine optimization: we structure your content with clear answers, FAQs and structured data so Google and AI assistants can present it.",
      ar: "تحسين محركات الإجابة: ننظّم محتواك بإجابات واضحة وأسئلة شائعة وبيانات منظمة ليعرضه جوجل ومساعدو الذكاء الاصطناعي.",
    },
  },
  geo: {
    title: {
      sv: "GEO – synas i ChatGPT och AI-sök",
      en: "GEO – get recommended by ChatGPT & AI search",
      ar: "الظهور في ChatGPT وبحث الذكاء الاصطناعي GEO",
    },
    description: {
      sv: "Generative Engine Optimization: hjälp att ditt företag nämns av ChatGPT, Gemini, Perplexity och Googles AI-översikter, med korrekt information.",
      en: "Generative engine optimization: help your business get mentioned by ChatGPT, Gemini, Perplexity and Google AI Overviews, with accurate information.",
      ar: "تحسين الظهور في محركات الذكاء الاصطناعي: ساعد شركتك على الظهور في ChatGPT وGemini وPerplexity وملخصات جوجل بمعلومات دقيقة.",
    },
  },
  "social-media-ads": {
    title: {
      sv: "Annonsering på Facebook, Instagram & TikTok",
      en: "Facebook, Instagram & TikTok advertising",
      ar: "إعلانات فيسبوك وإنستغرام وتيك توك",
    },
    description: {
      sv: "Annonser på Facebook, Instagram, TikTok och LinkedIn för småföretag – rätt målgrupp, språk och område, mätt i förfrågningar och försäljning.",
      en: "Ad campaigns on Facebook, Instagram, TikTok and LinkedIn for small businesses – the right audience, language and area, measured on enquiries and sales.",
      ar: "حملات إعلانية على فيسبوك وإنستغرام وتيك توك ولينكدإن للشركات الصغيرة — الجمهور واللغة والمنطقة المناسبة، مع قياس الاستفسارات والمبيعات.",
    },
  },
  "google-ads": {
    title: {
      sv: "Google Ads-hjälp för företag i Sverige",
      en: "Google Ads management in Sweden",
      ar: "إدارة إعلانات جوجل في السويد",
    },
    description: {
      sv: "Syns högst upp när kunderna söker. Sökannonser, Performance Max och YouTube med konverteringsspårning – så att du ser vad varje förfrågan kostar.",
      en: "Appear at the top when customers search. Search ads, Performance Max and YouTube with conversion tracking – so you can see what each enquiry costs.",
      ar: "اظهر في أعلى النتائج عندما يبحث العملاء. إعلانات البحث وPerformance Max ويوتيوب مع تتبع التحويلات لتعرف تكلفة كل استفسار.",
    },
  },
  "social-media-management": {
    title: {
      sv: "Sociala medier för företag i Sverige",
      en: "Social media management in Sweden",
      ar: "إدارة وسائل التواصل للشركات في السويد",
    },
    description: {
      sv: "Aktiva, professionella sociala medier – innehållsplan, inlägg, bilder och korta videor på svenska, engelska och arabiska, utan att det tar din tid.",
      en: "Active, professional social media – content plan, posts, images and short videos in Swedish, English and Arabic, without taking up your time.",
      ar: "حسابات تواصل اجتماعي نشطة واحترافية — خطة محتوى ومنشورات وصور وفيديوهات قصيرة بالعربية والسويدية والإنجليزية دون أن تأخذ من وقتك.",
    },
  },
  "saas-development": {
    title: {
      sv: "SaaS- och webbapputveckling i Sverige",
      en: "SaaS and web app development in Sweden",
      ar: "تطوير تطبيقات الويب وSaaS في السويد",
    },
    description: {
      sv: "Skräddarsydda webbapplikationer och SaaS – kundportaler, bokningssystem och interna verktyg. Vi börjar med en MVP och bygger vidare med säker teknik.",
      en: "Custom web applications and SaaS – customer portals, booking systems and internal tools. We start with an MVP and build on it with modern, secure tech.",
      ar: "تطبيقات ويب ومنتجات SaaS مخصصة: بوابات عملاء وأنظمة حجز وأدوات داخلية. نبدأ بنسخة MVP ونطورها بتقنيات حديثة وآمنة.",
    },
  },
  "mobile-app-development": {
    title: {
      sv: "Apputveckling iOS & Android i Sverige",
      en: "iOS and Android app development in Sweden",
      ar: "تطوير تطبيقات iOS وأندرويد في السويد",
    },
    description: {
      sv: "Mobilappar för iOS och Android – från idé och design till App Store och Google Play, med en gemensam kodbas som håller nere tid och kostnad.",
      en: "Mobile apps for iOS and Android – from idea and design to the App Store and Google Play, with one shared codebase that keeps time and cost down.",
      ar: "تطبيقات جوال لنظامي iOS وأندرويد — من الفكرة والتصميم إلى App Store وGoogle Play، بشيفرة مشتركة تقلل الوقت والتكلفة.",
    },
  },
};
