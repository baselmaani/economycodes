import type { ContentBlock, Faq, Localized } from "./types";

/**
 * Landing pages for the two real offices (content/locations.ts). Local
 * searches ("redovisningsbyrå Trollhättan", "accountant Mellerud") need a page
 * per office; there are deliberately no pages for cities without an office.
 * Claims stay within what the rest of the site already says: in-person
 * meetings at both offices, digital service nationwide, sv/en/ar. Opening
 * hours and walk-in service are unconfirmed (CLIENT-TODO item 11) -- don't add
 * them here.
 */
export interface LocationPage {
  /** Matches Location.id in content/locations.ts. */
  locationId: string;
  slug: Localized<string>;
  /** City as written in running text per locale. */
  cityName: Localized<string>;
  /** <title> without the " | Economy Codes" suffix; <= 44 characters. */
  metaTitle: Localized<string>;
  /** 70-160 characters. */
  metaDescription: Localized<string>;
  title: Localized<string>;
  /** Answer-first paragraph, quotable on its own by search and AI answers. */
  intro: Localized<string>;
  /** Towns and areas served from this office, for the page and areaServed. */
  nearbyAreas: string[];
  body: Localized<ContentBlock[]>;
  /** Services featured on the page, by service key. */
  serviceKeys: string[];
  faqs: Faq[];
}

const SERVICE_KEYS = [
  "bookkeeping",
  "payroll",
  "tax-reporting",
  "annual-closing",
  "business-registration",
  "seo",
];

export const locationPages: LocationPage[] = [
  {
    locationId: "trollhattan",
    slug: { sv: "trollhattan", en: "trollhattan", ar: "تروللهاتان" },
    cityName: { sv: "Trollhättan", en: "Trollhättan", ar: "تروللهاتان" },
    metaTitle: {
      sv: "Redovisningsbyrå i Trollhättan",
      en: "Accounting firm in Trollhättan",
      ar: "مكتب محاسبة في تروللهاتان",
    },
    metaDescription: {
      sv: "Srf-auktoriserad redovisningsbyrå i Trollhättan: bokföring, lön, moms, bokslut och deklaration för företag i Trollhättan, Vänersborg och Uddevalla.",
      en: "Srf-authorized accounting firm in Trollhättan: bookkeeping, payroll, VAT, annual accounts and tax returns. Service in Swedish, English and Arabic.",
      ar: "مكتب محاسبة معتمد من Srf في تروللهاتان: مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية، بالعربية والسويدية والإنجليزية.",
    },
    title: {
      sv: "Redovisningsbyrå i Trollhättan",
      en: "Accounting firm in Trollhättan",
      ar: "مكتب محاسبة في تروللهاتان",
    },
    intro: {
      sv: "Economy Codes AB är en Srf-auktoriserad redovisningsbyrå med kontor på Åkerssjövägen 10 i Trollhättan. Vi hjälper små och medelstora företag i Trollhättan, Vänersborg, Uddevalla och resten av Västra Götaland med bokföring, lön, moms, bokslut och deklaration — på svenska, engelska och arabiska.",
      en: "Economy Codes AB is an Srf-authorized accounting firm with an office at Åkerssjövägen 10 in Trollhättan. We help small and medium-sized businesses in Trollhättan, Vänersborg, Uddevalla and the rest of Västra Götaland with bookkeeping, payroll, VAT, annual accounts and tax returns — in Swedish, English and Arabic.",
      ar: "Economy Codes AB مكتب محاسبة معتمد من Srf، ولديه مكتب في Åkerssjövägen 10 في تروللهاتان. نساعد الشركات الصغيرة والمتوسطة في تروللهاتان وفينرسبوري وأوديفالا وبقية منطقة Västra Götaland في مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية — بالعربية والسويدية والإنجليزية.",
    },
    nearbyAreas: [
      "Trollhättan",
      "Vänersborg",
      "Uddevalla",
      "Lilla Edet",
      "Grästorp",
      "Västra Götaland",
    ],
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Lokal redovisningskonsult med digital service",
        },
        {
          type: "paragraph",
          text: "Du kan träffa oss på kontoret i Trollhättan när du vill gå igenom din ekonomi på plats, och sköta resten digitalt. Underlag som kvitton, fakturor och kontoutdrag skickar du in digitalt, ofta via Fortnox, och vi bokför och stämmer av löpande.",
        },
        {
          type: "heading",
          level: 2,
          text: "Redovisning för företag i Trollhättan och Vänersborg",
        },
        {
          type: "paragraph",
          text: "Vi arbetar med aktiebolag, enskilda firmor och föreningar i Trollhättan med omnejd. Hadi Al Maani är auktoriserad redovisningskonsult och auktoriserad lönekonsult, och du får samma kontaktperson genom hela samarbetet.",
        },
        {
          type: "list",
          items: [
            "Löpande bokföring och avstämningar",
            "Lönehantering och arbetsgivardeklarationer",
            "Moms- och skattedeklarationer till Skatteverket",
            "Bokslut och årsredovisning för aktiebolag",
            "Hjälp att starta och registrera företag",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Marknadsföringsbyrå för företag i Trollhättan",
        },
        {
          type: "paragraph",
          text: "Economy Codes är också en digital marknadsföringsbyrå. Vi bygger webbplatser och arbetar med SEO och annonsering i Google och sociala medier, så att fler kunder i Trollhättan och resten av Sverige hittar ditt företag.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "A local accountant with digital service",
        },
        {
          type: "paragraph",
          text: "You can meet us at the office in Trollhättan when you want to go through your finances in person, and handle everything else digitally. You send documents such as receipts, invoices and bank statements digitally, often through Fortnox, and we record and reconcile them on an ongoing basis.",
        },
        {
          type: "heading",
          level: 2,
          text: "Accounting for businesses in Trollhättan and Vänersborg",
        },
        {
          type: "paragraph",
          text: "We work with limited companies, sole traders and associations in and around Trollhättan. Hadi Al Maani is an authorized accounting consultant and authorized payroll consultant, and you keep the same contact person throughout.",
        },
        {
          type: "list",
          items: [
            "Ongoing bookkeeping and reconciliations",
            "Payroll and employer tax returns",
            "VAT and tax returns to Skatteverket",
            "Annual accounts and annual reports for limited companies",
            "Help starting and registering a company",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "A marketing agency for businesses in Trollhättan",
        },
        {
          type: "paragraph",
          text: "Economy Codes is also a digital marketing agency. We build websites and work with SEO and advertising on Google and social media, so more customers in Trollhättan and the rest of Sweden find your business.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "محاسب محلي بخدمة رقمية",
        },
        {
          type: "paragraph",
          text: "يمكنك مقابلتنا في مكتبنا في تروللهاتان عندما ترغب في مراجعة أوضاعك المالية شخصيًا، وإنجاز بقية الأمور رقميًا. ترسل مستنداتك مثل الإيصالات والفواتير وكشوف الحساب إلكترونيًا، غالبًا عبر Fortnox، ونقوم بتسجيلها ومطابقتها بشكل مستمر.",
        },
        {
          type: "heading",
          level: 2,
          text: "محاسبة للشركات في تروللهاتان وفينرسبوري",
        },
        {
          type: "paragraph",
          text: "نعمل مع الشركات المحدودة والمنشآت الفردية والجمعيات في تروللهاتان وما حولها. هادي المعاني مستشار محاسبة معتمد ومستشار رواتب معتمد، ويبقى لديك الشخص نفسه للتواصل طوال فترة التعاون.",
        },
        {
          type: "list",
          items: [
            "مسك الدفاتر والمطابقات المستمرة",
            "إدارة الرواتب وإقرارات صاحب العمل",
            "إقرارات ضريبة القيمة المضافة والضرائب إلى Skatteverket",
            "الإغلاق السنوي والقوائم المالية للشركات المحدودة",
            "المساعدة في تأسيس الشركات وتسجيلها",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "وكالة تسويق للشركات في تروللهاتان",
        },
        {
          type: "paragraph",
          text: "Economy Codes هي أيضًا وكالة تسويق رقمي. نبني المواقع الإلكترونية ونعمل على تحسين محركات البحث SEO والإعلانات على جوجل ووسائل التواصل الاجتماعي، ليصل مزيد من العملاء في تروللهاتان وبقية السويد إلى شركتك.",
        },
      ],
    },
    serviceKeys: SERVICE_KEYS,
    faqs: [
      {
        id: "faq-location-trollhattan-meet",
        scope: { locationId: "trollhattan" },
        question: {
          sv: "Kan jag träffa en redovisningskonsult i Trollhättan?",
          en: "Can I meet an accountant in Trollhättan?",
          ar: "هل يمكنني مقابلة محاسب في تروللهاتان؟",
        },
        answer: {
          sv: "Ja. Vi har kontor på Åkerssjövägen 10 i Trollhättan för dig som föredrar att träffas på plats. Kontakta oss först så bokar vi en tid som passar.",
          en: "Yes. We have an office at Åkerssjövägen 10 in Trollhättan for clients who prefer to meet in person. Contact us first and we'll book a time that suits you.",
          ar: "نعم. لدينا مكتب في Åkerssjövägen 10 في تروللهاتان لمن يفضل اللقاء الشخصي. تواصل معنا أولًا وسنحدد موعدًا يناسبك.",
        },
      },
      {
        id: "faq-location-trollhattan-area",
        scope: { locationId: "trollhattan" },
        question: {
          sv: "Hjälper ni företag utanför Trollhättan?",
          en: "Do you help businesses outside Trollhättan?",
          ar: "هل تساعدون شركات خارج تروللهاتان؟",
        },
        answer: {
          sv: "Ja. Vi hjälper företag i Vänersborg, Uddevalla och resten av Västra Götaland, och arbetar digitalt med kunder i hela Sverige oavsett var företaget är registrerat.",
          en: "Yes. We help businesses in Vänersborg, Uddevalla and the rest of Västra Götaland, and work digitally with clients across Sweden regardless of where the company is registered.",
          ar: "نعم. نساعد الشركات في فينرسبوري وأوديفالا وبقية منطقة Västra Götaland، ونعمل رقميًا مع العملاء في جميع أنحاء السويد بغض النظر عن مكان تسجيل الشركة.",
        },
      },
    ],
  },
  {
    locationId: "mellerud",
    slug: { sv: "mellerud", en: "mellerud", ar: "ميلروود" },
    cityName: { sv: "Mellerud", en: "Mellerud", ar: "ميلَّروود" },
    metaTitle: {
      sv: "Redovisningsbyrå i Mellerud och Dalsland",
      en: "Accounting firm in Mellerud and Dalsland",
      ar: "مكتب محاسبة في ميلَّروود ودالسلاند",
    },
    metaDescription: {
      sv: "Srf-auktoriserad redovisningsbyrå i Mellerud: bokföring, lön, moms, bokslut och deklaration för företag i Mellerud, Åmål, Bengtsfors och hela Dalsland.",
      en: "Srf-authorized accounting firm in Mellerud: bookkeeping, payroll, VAT, annual accounts and tax returns for businesses across Dalsland, in English and Arabic.",
      ar: "مكتب محاسبة معتمد من Srf في ميلَّروود: مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية للشركات في دالسلاند، بالعربية.",
    },
    title: {
      sv: "Redovisningsbyrå i Mellerud och Dalsland",
      en: "Accounting firm in Mellerud and Dalsland",
      ar: "مكتب محاسبة في ميلَّروود ودالسلاند",
    },
    intro: {
      sv: "Economy Codes AB är en Srf-auktoriserad redovisningsbyrå med kontor på Backegatan 13C i Mellerud. Vi hjälper små och medelstora företag i Mellerud, Åmål, Bengtsfors, Färgelanda och resten av Dalsland med bokföring, lön, moms, bokslut och deklaration — på svenska, engelska och arabiska.",
      en: "Economy Codes AB is an Srf-authorized accounting firm with an office at Backegatan 13C in Mellerud. We help small and medium-sized businesses in Mellerud, Åmål, Bengtsfors, Färgelanda and the rest of Dalsland with bookkeeping, payroll, VAT, annual accounts and tax returns — in Swedish, English and Arabic.",
      ar: "Economy Codes AB مكتب محاسبة معتمد من Srf، ولديه مكتب في Backegatan 13C في ميلَّروود. نساعد الشركات الصغيرة والمتوسطة في ميلَّروود وأومول وبنغتسفورش وفيرغيلاندا وبقية منطقة دالسلاند في مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية — بالعربية والسويدية والإنجليزية.",
    },
    nearbyAreas: [
      "Mellerud",
      "Åmål",
      "Bengtsfors",
      "Färgelanda",
      "Dals-Ed",
      "Vänersborg",
      "Dalsland",
    ],
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Redovisningskonsult i Dalsland",
        },
        {
          type: "paragraph",
          text: "Från kontoret i Mellerud hjälper vi företag i hela Dalsland. Du kan träffa oss på plats när du vill gå igenom din ekonomi, och sköta det löpande digitalt — underlag skickar du in digitalt, ofta via Fortnox, och vi bokför och stämmer av löpande.",
        },
        {
          type: "heading",
          level: 2,
          text: "Det här hjälper vi företag i Mellerud med",
        },
        {
          type: "list",
          items: [
            "Löpande bokföring och avstämningar",
            "Lönehantering och arbetsgivardeklarationer",
            "Moms- och skattedeklarationer till Skatteverket",
            "Bokslut och årsredovisning för aktiebolag",
            "Hjälp att starta och registrera företag eller förening",
          ],
        },
        {
          type: "paragraph",
          text: "Hadi Al Maani är auktoriserad redovisningskonsult och auktoriserad lönekonsult. Du har samma kontaktperson genom hela samarbetet och kan kommunicera på svenska, engelska eller arabiska.",
        },
        {
          type: "heading",
          level: 2,
          text: "Digital marknadsföring för företag i Dalsland",
        },
        {
          type: "paragraph",
          text: "Vi är också en digital marknadsföringsbyrå. Vi bygger webbplatser och arbetar med SEO och annonsering i Google och sociala medier för företag i Mellerud, Dalsland och resten av Sverige.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "An accounting consultant in Dalsland",
        },
        {
          type: "paragraph",
          text: "From the office in Mellerud we help businesses across Dalsland. You can meet us in person when you want to go through your finances, and handle the day-to-day digitally — you send documents digitally, often through Fortnox, and we record and reconcile them on an ongoing basis.",
        },
        {
          type: "heading",
          level: 2,
          text: "How we help businesses in Mellerud",
        },
        {
          type: "list",
          items: [
            "Ongoing bookkeeping and reconciliations",
            "Payroll and employer tax returns",
            "VAT and tax returns to Skatteverket",
            "Annual accounts and annual reports for limited companies",
            "Help starting and registering a company or association",
          ],
        },
        {
          type: "paragraph",
          text: "Hadi Al Maani is an authorized accounting consultant and authorized payroll consultant. You keep the same contact person throughout and can communicate in Swedish, English or Arabic.",
        },
        {
          type: "heading",
          level: 2,
          text: "Digital marketing for businesses in Dalsland",
        },
        {
          type: "paragraph",
          text: "We are also a digital marketing agency. We build websites and work with SEO and advertising on Google and social media for businesses in Mellerud, Dalsland and the rest of Sweden.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "مستشار محاسبة في دالسلاند",
        },
        {
          type: "paragraph",
          text: "من مكتبنا في ميلَّروود نساعد الشركات في جميع أنحاء دالسلاند. يمكنك مقابلتنا شخصيًا عندما ترغب في مراجعة أوضاعك المالية، وإنجاز الأمور اليومية رقميًا — ترسل مستنداتك إلكترونيًا، غالبًا عبر Fortnox، ونقوم بتسجيلها ومطابقتها بشكل مستمر.",
        },
        {
          type: "heading",
          level: 2,
          text: "كيف نساعد الشركات في ميلَّروود",
        },
        {
          type: "list",
          items: [
            "مسك الدفاتر والمطابقات المستمرة",
            "إدارة الرواتب وإقرارات صاحب العمل",
            "إقرارات ضريبة القيمة المضافة والضرائب إلى Skatteverket",
            "الإغلاق السنوي والقوائم المالية للشركات المحدودة",
            "المساعدة في تأسيس شركة أو جمعية وتسجيلها",
          ],
        },
        {
          type: "paragraph",
          text: "هادي المعاني مستشار محاسبة معتمد ومستشار رواتب معتمد. يبقى لديك الشخص نفسه للتواصل طوال فترة التعاون، ويمكنك التواصل بالعربية أو السويدية أو الإنجليزية.",
        },
        {
          type: "heading",
          level: 2,
          text: "تسويق رقمي للشركات في دالسلاند",
        },
        {
          type: "paragraph",
          text: "نحن أيضًا وكالة تسويق رقمي. نبني المواقع الإلكترونية ونعمل على تحسين محركات البحث SEO والإعلانات على جوجل ووسائل التواصل الاجتماعي للشركات في ميلَّروود ودالسلاند وبقية السويد.",
        },
      ],
    },
    serviceKeys: SERVICE_KEYS,
    faqs: [
      {
        id: "faq-location-mellerud-meet",
        scope: { locationId: "mellerud" },
        question: {
          sv: "Kan jag träffa en redovisningskonsult i Mellerud?",
          en: "Can I meet an accountant in Mellerud?",
          ar: "هل يمكنني مقابلة محاسب في ميلَّروود؟",
        },
        answer: {
          sv: "Ja. Vi har kontor på Backegatan 13C i Mellerud för dig som föredrar att träffas på plats. Kontakta oss först så bokar vi en tid som passar.",
          en: "Yes. We have an office at Backegatan 13C in Mellerud for clients who prefer to meet in person. Contact us first and we'll book a time that suits you.",
          ar: "نعم. لدينا مكتب في Backegatan 13C في ميلَّروود لمن يفضل اللقاء الشخصي. تواصل معنا أولًا وسنحدد موعدًا يناسبك.",
        },
      },
      {
        id: "faq-location-mellerud-area",
        scope: { locationId: "mellerud" },
        question: {
          sv: "Hjälper ni företag i resten av Dalsland?",
          en: "Do you help businesses in the rest of Dalsland?",
          ar: "هل تساعدون الشركات في بقية دالسلاند؟",
        },
        answer: {
          sv: "Ja. Vi hjälper företag i Åmål, Bengtsfors, Färgelanda, Dals-Ed och Vänersborg, och arbetar digitalt med kunder i hela Sverige oavsett var företaget är registrerat.",
          en: "Yes. We help businesses in Åmål, Bengtsfors, Färgelanda, Dals-Ed and Vänersborg, and work digitally with clients across Sweden regardless of where the company is registered.",
          ar: "نعم. نساعد الشركات في أومول وبنغتسفورش وفيرغيلاندا وDals-Ed وفينرسبوري، ونعمل رقميًا مع العملاء في جميع أنحاء السويد بغض النظر عن مكان تسجيل الشركة.",
        },
      },
    ],
  },
];
