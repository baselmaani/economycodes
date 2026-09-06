import type { Service } from "./types";

const LAST_REVIEWED = "2026-09-06";

const TAX_LEGAL_DISCLAIMER = {
  sv: "Innehållet på den här sidan är allmän information och ersätter inte individuell skatte- eller juridisk rådgivning. Kontakta oss för att gå igenom din specifika situation.",
  en: "The content on this page is general information and does not replace individual tax or legal advice. Contact us to go through your specific situation.",
  ar: "المحتوى في هذه الصفحة معلومات عامة ولا يغني عن استشارة ضريبية أو قانونية فردية. تواصل معنا لمراجعة وضعك الخاص.",
};

const CONTRACT_DISCLAIMER = {
  sv: "Vår hjälp med avtal och kontrakt är administrativt och praktiskt stöd, inte juridisk representation. Vid behov av kvalificerad juridisk rådgivning hänvisar vi dig vidare till en jurist eller advokat.",
  en: "Our help with agreements and contracts is administrative and practical support, not legal representation. If you need qualified legal advice, we'll refer you to a lawyer or solicitor.",
  ar: "مساعدتنا في العقود والاتفاقيات هي دعم إداري وعملي، وليست تمثيلًا قانونيًا. وعند الحاجة إلى استشارة قانونية متخصصة، سنحيلك إلى محامٍ مختص.",
};

const INVESTMENT_DISCLAIMER = {
  sv: "Att bilda eller etablera ett företag i Sverige är en separat process från migrationsärenden. Det innebär inget löfte om uppehållstillstånd, medborgarskap eller finansiering. Frågor om uppehållstillstånd hanteras av Migrationsverket.",
  en: "Forming or establishing a company in Sweden is a separate process from immigration matters. It does not imply any promise of a residence permit, citizenship, or financing. Residence permit questions are handled by Migrationsverket.",
  ar: "يُعد تأسيس شركة أو إنشاؤها في السويد عملية منفصلة عن معاملات الهجرة. ولا يعني ذلك أي وعد بالحصول على تصريح إقامة أو الجنسية أو التمويل. وتتولى هيئة الهجرة السويدية (Migrationsverket) البتّ في مسائل تصاريح الإقامة.",
};

export const services: Record<string, Service> = {
  bookkeeping: {
    key: "bookkeeping",
    order: 1,
    slug: { sv: "bokforing", en: "bookkeeping", ar: "المحاسبة" },
    name: { sv: "Bokföring", en: "Bookkeeping", ar: "المحاسبة" },
    summary: {
      sv: "Bokföring för småföretag, aktiebolag och enskilda firmor i Sverige. Vi hjälper dig att hålla ordning på verifikationer, moms och rapportering så att din bokföring är aktuell och redo när den behövs — för dig själv, myndigheter eller banker.",
      en: "Bookkeeping for small businesses, limited companies, and sole traders in Sweden. We help you keep your vouchers, VAT, and reporting in order, so your bookkeeping is always current and ready when you need it — for yourself, the authorities, or your bank.",
      ar: "محاسبة للشركات الصغيرة والشركات المحدودة والمنشآت الفردية في السويد. نساعدك على تنظيم المستندات وضريبة القيمة المضافة والتقارير، بحيث تكون محاسبتك دائمًا محدّثة وجاهزة عند الحاجة إليها — سواء لك أو للجهات الرسمية أو للبنوك.",
    },
    whoItsFor: {
      sv: [
        "Nystartade och etablerade små och medelstora företag",
        "Enskilda näringsidkare som vill lämna över det löpande arbetet",
        "Företagare som behöver kommunicera på svenska, engelska eller arabiska",
      ],
      en: [
        "New and established small and medium-sized businesses",
        "Sole traders who want to hand off the day-to-day work",
        "Business owners who need to communicate in Swedish, English, or Arabic",
      ],
      ar: [
        "الشركات الصغيرة والمتوسطة الناشئة والراسخة",
        "أصحاب المنشآت الفردية الراغبين في تسليم العمل اليومي لجهة متخصصة",
        "أصحاب الأعمال الذين يحتاجون إلى التواصل بالسويدية أو الإنجليزية أو العربية",
      ],
    },
    whatsIncluded: {
      sv: [
        "Löpande registrering av affärshändelser och underlag",
        "Avstämning av bokföring mot bank och kvitton",
        "Hjälp inför moms- och periodrapportering",
        "Kontakt och avstämning löpande under året",
      ],
      en: [
        "Ongoing recording of transactions and supporting documents",
        "Reconciling your bookkeeping against your bank and receipts",
        "Help preparing VAT and periodic reporting",
        "Ongoing contact and reconciliation throughout the year",
      ],
      ar: [
        "تسجيل مستمر للمعاملات والمستندات الداعمة",
        "مطابقة المحاسبة مع كشوف البنك والإيصالات",
        "المساعدة في إعداد تقارير ضريبة القيمة المضافة والتقارير الدورية",
        "تواصل ومطابقة مستمرَّين على مدار العام",
      ],
    },
    process: {
      sv: [
        "Vi går igenom ditt företag, din verksamhet och vilket underlag som finns",
        "Vi kommer överens om hur underlag ska skickas in och hur ofta",
        "Vi sköter den löpande registreringen och stämmer av med dig vid behov",
        "Du får löpande återkoppling så att du alltid vet var ditt företag står",
      ],
      en: [
        "We go through your company, your business, and what documentation exists",
        "We agree on how and how often documentation should be sent in",
        "We handle the ongoing recording and reconcile with you as needed",
        "You get ongoing feedback so you always know where your company stands",
      ],
      ar: [
        "نراجع معك شركتك ونشاطها والمستندات المتوفرة",
        "نتفق على طريقة إرسال المستندات وتكرارها",
        "نتولى التسجيل المستمر ونطابقه معك عند الحاجة",
        "تحصل على تحديثات مستمرة لتعرف دائمًا وضع شركتك",
      ],
    },
    whatToPrepare: {
      sv: [
        "Grundläggande företagsuppgifter (organisationsnummer, bolagsform)",
        "Tillgång till kvitton, fakturor och kontoutdrag",
        "Eventuell tidigare bokföring om du byter till oss",
      ],
      en: [
        "Basic company details (organisation number, company type)",
        "Access to receipts, invoices, and bank statements",
        "Any previous bookkeeping, if you're switching to us",
      ],
      ar: [
        "بيانات الشركة الأساسية (الرقم التنظيمي، نوع الشركة)",
        "إتاحة الإيصالات والفواتير وكشوف الحساب البنكي",
        "أي محاسبة سابقة، في حال انتقالك إلينا",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Varför löpande bokföring är viktigt",
        },
        {
          type: "paragraph",
          text: "Alla som driver näringsverksamhet i Sverige är enligt bokföringslagen skyldiga att bokföra sina affärshändelser. En löpande, korrekt bokföring gör det enklare att följa upp lönsamhet, planera skatt och moms, och ha rätt underlag redo inför bokslut eller om Skatteverket efterfrågar det.",
        },
        { type: "heading", level: 2, text: "Så arbetar vi med din bokföring" },
        {
          type: "paragraph",
          text: "Vi anpassar arbetssättet efter hur ditt företag redan hanterar underlag idag, snarare än att kräva att du byter system eller rutin i onödan. Målet är att bokföringen ska kännas begriplig för dig, inte bara vara en teknisk formalitet.",
        },
      ],
      en: [
        { type: "heading", level: 2, text: "Why ongoing bookkeeping matters" },
        {
          type: "paragraph",
          text: "Everyone running a business in Sweden is required under the Bookkeeping Act to record their transactions. Accurate, ongoing bookkeeping makes it easier to track profitability, plan for tax and VAT, and have the right documentation ready for your annual accounts or if Skatteverket asks for it.",
        },
        {
          type: "heading",
          level: 2,
          text: "How we work with your bookkeeping",
        },
        {
          type: "paragraph",
          text: "We adapt our way of working to how your company already handles its documentation today, rather than requiring you to switch systems or routines unnecessarily. The goal is for your bookkeeping to feel understandable to you, not just a technical formality.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "لماذا تُعد المحاسبة المستمرة مهمة",
        },
        {
          type: "paragraph",
          text: "يلتزم كل من يمارس نشاطًا تجاريًا في السويد بموجب قانون المحاسبة بتسجيل معاملاته التجارية. تجعل المحاسبة الدقيقة والمستمرة من السهل متابعة الربحية والتخطيط للضرائب وضريبة القيمة المضافة، وتوفر المستندات الصحيحة الجاهزة عند إعداد الحسابات الختامية أو إذا طلبتها هيئة الضرائب (Skatteverket).",
        },
        { type: "heading", level: 2, text: "كيف نعمل على محاسبتك" },
        {
          type: "paragraph",
          text: "نكيّف طريقة عملنا مع الطريقة التي تدير بها شركتك مستنداتها بالفعل اليوم، بدلاً من مطالبتك بتغيير الأنظمة أو الروتين دون داعٍ. الهدف أن تكون محاسبتك مفهومة بالنسبة لك، لا مجرد إجراء شكلي تقني.",
        },
      ],
    },
    faqIds: ["faq-bookkeeping-what", "faq-bookkeeping-software"],
    heroImage: {
      src: "/media/optimized/bokforing.webp",
      width: 1024,
      height: 683,
      alt: {
        sv: "Bokföring och löpande redovisning för företag",
        en: "Bookkeeping and ongoing accounting for businesses",
        ar: "المحاسبة والحسابات المستمرة للشركات",
      },
    },
    lastReviewed: LAST_REVIEWED,
  },

  "tax-reporting": {
    key: "tax-reporting",
    order: 2,
    slug: { sv: "skattedeklaration", en: "tax-return", ar: "الإقرار-الضريبي" },
    name: { sv: "Skattedeklaration", en: "Tax return", ar: "الإقرار الضريبي" },
    summary: {
      sv: "Hjälp med moms och deklaration för företag i Sverige, så att du lämnar in rätt underlag i tid till Skatteverket. Vi går igenom vad som gäller för just ditt företag och håller koll på viktiga datum tillsammans med dig.",
      en: "Help with VAT and tax returns for businesses in Sweden, so you submit the right documentation on time to Skatteverket. We go through what applies to your company and keep track of important dates together with you.",
      ar: "مساعدة في ضريبة القيمة المضافة والإقرارات الضريبية للشركات في السويد، بحيث تقدّم المستندات الصحيحة في الوقت المحدد إلى هيئة الضرائب (Skatteverket). نراجع معك ما ينطبق على شركتك ونتابع معك المواعيد المهمة.",
    },
    whoItsFor: {
      sv: [
        "Aktiebolag och enskilda firmor med löpande skatteskyldigheter",
        "Företagare som vill undvika förseningsavgifter",
        "Verksamheter som behöver hjälp att tolka underlag inför deklaration",
      ],
      en: [
        "Limited companies and sole traders with ongoing tax obligations",
        "Business owners who want to avoid late fees",
        "Businesses that need help interpreting documentation before filing",
      ],
      ar: [
        "الشركات المحدودة والمنشآت الفردية ذات الالتزامات الضريبية المستمرة",
        "أصحاب الأعمال الراغبين في تجنّب رسوم التأخير",
        "المنشآت التي تحتاج إلى مساعدة في تفسير المستندات قبل تقديم الإقرار",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av vilka deklarationer och rapporter som gäller för ditt företag",
        "Sammanställning av underlag inför inlämning",
        "Bevakning av viktiga datum tillsammans med dig",
        "Kontakt vid frågor från Skatteverket kopplade till inlämnat underlag",
      ],
      en: [
        "A review of which returns and reports apply to your company",
        "Compiling documentation ahead of submission",
        "Tracking important dates together with you",
        "Contact if Skatteverket has questions related to your submitted documentation",
      ],
      ar: [
        "مراجعة الإقرارات والتقارير المنطبقة على شركتك",
        "تجميع المستندات استعدادًا للتقديم",
        "متابعة المواعيد المهمة معك",
        "التواصل في حال وجود استفسارات من هيئة الضرائب متعلقة بالمستندات المقدَّمة",
      ],
    },
    process: {
      sv: [
        "Vi kartlägger vilka skatteskyldigheter som gäller för ditt företag",
        "Vi sätter en tidsplan utifrån relevanta deadlines hos Skatteverket",
        "Vi sammanställer och kvalitetssäkrar underlaget tillsammans med dig",
        "Deklarationen lämnas in och du får en kopia för dina egna register",
      ],
      en: [
        "We map out which tax obligations apply to your company",
        "We set a timeline based on the relevant Skatteverket deadlines",
        "We compile and quality-check the documentation together with you",
        "The return is filed and you receive a copy for your own records",
      ],
      ar: [
        "نحدد الالتزامات الضريبية المنطبقة على شركتك",
        "نضع جدولًا زمنيًا استنادًا إلى المواعيد النهائية المعنية لدى هيئة الضرائب",
        "نجمّع المستندات ونتحقق من جودتها معك",
        "يُقدَّم الإقرار وتحصل على نسخة منه لسجلاتك الخاصة",
      ],
    },
    whatToPrepare: {
      sv: [
        "Bokföring för aktuell period",
        "Eventuella tidigare beslut eller kommunikation från Skatteverket",
        "Uppgifter om löner, förmåner eller andra skattepliktiga poster om aktuellt",
      ],
      en: [
        "Bookkeeping for the relevant period",
        "Any previous decisions or correspondence from Skatteverket",
        "Information on salaries, benefits, or other taxable items, if applicable",
      ],
      ar: [
        "المحاسبة الخاصة بالفترة المعنية",
        "أي قرارات أو مراسلات سابقة من هيئة الضرائب",
        "بيانات الرواتب أو المزايا أو أي بنود خاضعة للضريبة، إن وجدت",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Vilka deklarationer kan bli aktuella",
        },
        {
          type: "paragraph",
          text: "Beroende på bolagsform och verksamhet kan det bland annat handla om momsdeklaration, arbetsgivardeklaration och inkomstdeklaration. Vi hjälper dig att förstå vad som gäller specifikt för ditt företag, snarare än att utgå från en generell mall.",
        },
        { type: "heading", level: 2, text: "Kontakt med Skatteverket" },
        {
          type: "paragraph",
          text: "Skatteverket är den myndighet som hanterar skattedeklarationer i Sverige. Vi hjälper dig att ta fram och kvalitetssäkra underlaget, men det är alltid du som företagare som ytterst ansvarar för att deklarationen är korrekt.",
        },
        { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.sv },
      ],
      en: [
        { type: "heading", level: 2, text: "Which returns might apply" },
        {
          type: "paragraph",
          text: "Depending on your company type and business, this may include VAT returns, employer returns, and income tax returns, among others. We help you understand what specifically applies to your company, rather than working from a generic template.",
        },
        { type: "heading", level: 2, text: "Working with Skatteverket" },
        {
          type: "paragraph",
          text: "Skatteverket is the authority that handles tax returns in Sweden. We help you prepare and quality-check the documentation, but as the business owner you remain ultimately responsible for the return being correct.",
        },
        { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.en },
      ],
      ar: [
        { type: "heading", level: 2, text: "الإقرارات التي قد تنطبق" },
        {
          type: "paragraph",
          text: "بحسب نوع شركتك ونشاطها، قد يشمل ذلك إقرار ضريبة القيمة المضافة وإقرار صاحب العمل وإقرار ضريبة الدخل، من بين أمور أخرى. نساعدك على فهم ما ينطبق تحديدًا على شركتك، بدلًا من الاعتماد على نموذج عام.",
        },
        { type: "heading", level: 2, text: "التواصل مع هيئة الضرائب" },
        {
          type: "paragraph",
          text: "هيئة الضرائب السويدية (Skatteverket) هي الجهة المسؤولة عن الإقرارات الضريبية في السويد. نساعدك في إعداد المستندات والتحقق من جودتها، لكن صاحب العمل يتحمل في النهاية مسؤولية صحة الإقرار.",
        },
        { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-tax-deadlines", "faq-tax-general"],
    // No heroImage: the legacy stock photo for this topic has the Skatteverket
    // logo overlaid, which would wrongly imply endorsement -- see CLIENT-TODO.md.
    lastReviewed: LAST_REVIEWED,
  },

  "business-registration": {
    key: "business-registration",
    order: 3,
    slug: {
      sv: "foretagsregistrering",
      en: "company-registration",
      ar: "تسجيل-الشركات",
    },
    name: {
      sv: "Företagsregistrering",
      en: "Company registration",
      ar: "تسجيل الشركات",
    },
    summary: {
      sv: "Hjälp att starta företag i Sverige, från val av bolagsform till praktiska steg hos Bolagsverket och Skatteverket. Tjänsten passar dig som redan bor eller verkar i Sverige — är du utländsk investerare som etablerar verksamhet från utlandet, se i stället vår tjänst för att etablera företag i Sverige.",
      en: "Help starting a company in Sweden, from choosing a company type to the practical steps with Bolagsverket and Skatteverket. This service is for people already living or working in Sweden — if you're a foreign investor establishing a business from abroad, see our dedicated service for establishing a company in Sweden instead.",
      ar: "مساعدة في تأسيس شركة في السويد، بدءًا من اختيار نوع الشركة وحتى الخطوات العملية لدى مكتب تسجيل الشركات (Bolagsverket) وهيئة الضرائب (Skatteverket). هذه الخدمة موجهة لمن يقيم أو يعمل بالفعل في السويد؛ أما المستثمرون الأجانب الراغبون في التأسيس من الخارج، فنوجههم إلى خدمتنا المخصصة لتأسيس شركة في السويد.",
    },
    whoItsFor: {
      sv: [
        "Personer som vill starta eget företag i Sverige",
        "Företagare som funderar på att byta bolagsform",
        "Internationella grundare som är nya i det svenska systemet",
      ],
      en: [
        "People who want to start their own business in Sweden",
        "Business owners considering changing company type",
        "International founders who are new to the Swedish system",
      ],
      ar: [
        "الأشخاص الراغبون في تأسيس أعمالهم الخاصة في السويد",
        "أصحاب الأعمال الذين يفكرون في تغيير نوع شركتهم",
        "المؤسسون الدوليون الجدد على النظام السويدي",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av olika bolagsformer och vad de innebär",
        "Hjälp att sammanställa underlag inför registrering",
        "Vägledning genom registreringsprocessen hos Bolagsverket och Skatteverket",
        "Praktisk rådgivning kring nästa steg efter registrering",
      ],
      en: [
        "A review of the different company types and what they involve",
        "Help compiling documentation ahead of registration",
        "Guidance through the registration process with Bolagsverket and Skatteverket",
        "Practical advice on next steps after registration",
      ],
      ar: [
        "مراجعة لأنواع الشركات المختلفة وما تتضمنه",
        "المساعدة في تجميع المستندات استعدادًا للتسجيل",
        "التوجيه خلال عملية التسجيل لدى مكتب تسجيل الشركات وهيئة الضرائب",
        "استشارة عملية حول الخطوات التالية بعد التسجيل",
      ],
    },
    process: {
      sv: [
        "Vi går igenom din affärsidé och dina förutsättningar",
        "Vi resonerar tillsammans kring lämplig bolagsform",
        "Vi hjälper dig att förbereda och lämna in underlag för registrering",
        "Vi går igenom vad som händer efter att företaget är registrerat",
      ],
      en: [
        "We go through your business idea and your circumstances",
        "We discuss the appropriate company type together",
        "We help you prepare and submit the registration documentation",
        "We go through what happens after your company is registered",
      ],
      ar: [
        "نراجع معك فكرة عملك وظروفك",
        "نناقش معًا نوع الشركة المناسب",
        "نساعدك على إعداد مستندات التسجيل وتقديمها",
        "نستعرض معك ما يحدث بعد تسجيل شركتك",
      ],
    },
    whatToPrepare: {
      sv: [
        "Beskrivning av din planerade verksamhet",
        "Legitimation och eventuella tidigare företagsuppgifter",
        "Uppgift om vilka som ska vara delägare eller styrelseledamöter, om aktuellt",
      ],
      en: [
        "A description of your planned business",
        "ID and any previous company details",
        "Names of who will be co-owners or board members, if applicable",
      ],
      ar: [
        "وصف لنشاطك التجاري المخطط له",
        "إثبات الهوية وأي بيانات لشركات سابقة",
        "أسماء من سيكونون شركاء أو أعضاء في مجلس الإدارة، إن وُجد",
      ],
    },
    body: {
      sv: [
        { type: "heading", level: 2, text: "Bolagsverket och Skatteverket" },
        {
          type: "paragraph",
          text: "Att registrera ett företag i Sverige sker i huvudsak via Bolagsverket och Skatteverket, bland annat för registrering, F-skatt och momsregistrering. Kraven skiljer sig åt beroende på om du väljer enskild firma, handelsbolag, aktiebolag eller en annan form.",
        },
        { type: "heading", level: 2, text: "Ett bra första steg" },
        {
          type: "paragraph",
          text: "Många av de beslut du fattar vid registreringen påverkar hur enkelt det blir att driva företaget senare. Därför är det värt att gå igenom din situation innan du lämnar in ansökan, snarare än att bara följa en generell checklista.",
        },
      ],
      en: [
        { type: "heading", level: 2, text: "Bolagsverket and Skatteverket" },
        {
          type: "paragraph",
          text: "Registering a company in Sweden mainly takes place through Bolagsverket and Skatteverket, covering things like registration, F-tax, and VAT registration. The requirements differ depending on whether you choose a sole trader business, a trading partnership, a limited company, or another form.",
        },
        { type: "heading", level: 2, text: "A good first step" },
        {
          type: "paragraph",
          text: "Many of the decisions you make when registering affect how easy it will be to run the company later on. It's worth going through your situation before submitting your application, rather than simply following a generic checklist.",
        },
      ],
      ar: [
        { type: "heading", level: 2, text: "مكتب تسجيل الشركات وهيئة الضرائب" },
        {
          type: "paragraph",
          text: "يتم تسجيل الشركة في السويد بشكل أساسي عبر مكتب تسجيل الشركات (Bolagsverket) وهيئة الضرائب (Skatteverket)، ويشمل ذلك التسجيل والضريبة من نوع F والتسجيل في ضريبة القيمة المضافة. وتختلف المتطلبات بحسب اختيارك بين المنشأة الفردية أو شركة التضامن أو الشركة المحدودة أو شكل آخر.",
        },
        { type: "heading", level: 2, text: "خطوة أولى جيدة" },
        {
          type: "paragraph",
          text: "تؤثر كثير من القرارات التي تتخذها عند التسجيل على مدى سهولة إدارة الشركة لاحقًا. لذا يستحق الأمر مراجعة وضعك قبل تقديم الطلب، بدلًا من اتباع قائمة عامة فقط.",
        },
      ],
    },
    faqIds: ["faq-registration-time", "faq-registration-form"],
    heroImage: {
      src: "/media/optimized/foretagsregistrering.webp",
      width: 370,
      height: 245,
      alt: {
        sv: "Registrering av nytt företag i Sverige",
        en: "Registering a new company in Sweden",
        ar: "تسجيل شركة جديدة في السويد",
      },
    },
    lastReviewed: LAST_REVIEWED,
  },

  "association-formation": {
    key: "association-formation",
    order: 4,
    slug: {
      sv: "starta-forening",
      en: "starting-an-association",
      ar: "تأسيس-جمعية",
    },
    name: {
      sv: "Bildande av föreningar",
      en: "Forming associations",
      ar: "تأسيس الجمعيات",
    },
    summary: {
      sv: "Praktisk hjälp att bilda och administrera föreningar i Sverige — från stadgar och konstituerande möte till löpande administration. Vi hjälper er att strukturera underlaget så att föreningen kommer igång på rätt sätt.",
      en: "Practical help forming and administering associations in Sweden — from bylaws and the founding meeting to ongoing administration. We help you structure the documentation so your association gets off to the right start.",
      ar: "مساعدة عملية في تأسيس الجمعيات وإدارتها في السويد — من النظام الأساسي والاجتماع التأسيسي وحتى الإدارة المستمرة. نساعدكم على تنظيم المستندات حتى تنطلق جمعيتكم بالشكل الصحيح.",
    },
    whoItsFor: {
      sv: [
        "Grupper som vill bilda en ny ideell förening",
        "Befintliga föreningar som behöver hjälp med administration",
        "Styrelser som vill få bättre struktur på sina rutiner",
      ],
      en: [
        "Groups who want to form a new non-profit association",
        "Existing associations that need help with administration",
        "Boards who want better structure in their routines",
      ],
      ar: [
        "المجموعات الراغبة في تأسيس جمعية غير ربحية جديدة",
        "الجمعيات القائمة التي تحتاج إلى مساعدة في الإدارة",
        "مجالس الإدارة الراغبة في تنظيم أفضل لإجراءاتها",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av vad som krävs för att bilda en förening",
        "Hjälp att strukturera stadgar och underlag inför konstituerande möte",
        "Stöd kring löpande föreningsadministration",
        "Praktisk rådgivning till styrelsen vid behov",
      ],
      en: [
        "A review of what's required to form an association",
        "Help structuring bylaws and documentation ahead of the founding meeting",
        "Support with ongoing association administration",
        "Practical advice to the board when needed",
      ],
      ar: [
        "مراجعة لما هو مطلوب لتأسيس جمعية",
        "المساعدة في تنظيم النظام الأساسي والمستندات قبل الاجتماع التأسيسي",
        "دعم في الإدارة المستمرة للجمعية",
        "استشارة عملية لمجلس الإدارة عند الحاجة",
      ],
    },
    process: {
      sv: [
        "Vi går igenom föreningens syfte och vilka som ska vara medlemmar",
        "Vi hjälper er att strukturera underlag inför det konstituerande mötet",
        "Föreningen bildas formellt genom beslut på det konstituerande mötet",
        "Vi kan fortsätta stötta med löpande administration efter bildandet",
      ],
      en: [
        "We go through the association's purpose and who its members will be",
        "We help you structure documentation ahead of the founding meeting",
        "The association is formally formed through a decision at the founding meeting",
        "We can continue supporting ongoing administration after formation",
      ],
      ar: [
        "نراجع معكم غرض الجمعية ومن سيكون أعضاءها",
        "نساعدكم على تنظيم المستندات قبل الاجتماع التأسيسي",
        "تُؤسَّس الجمعية رسميًا بقرار في الاجتماع التأسيسي",
        "يمكننا الاستمرار في دعم الإدارة المستمرة بعد التأسيس",
      ],
    },
    whatToPrepare: {
      sv: [
        "Beskrivning av föreningens syfte och planerade verksamhet",
        "Namn på de personer som ska ingå i en interimsstyrelse",
        "Eventuellt befintliga stadgar, om föreningen redan finns",
      ],
      en: [
        "A description of the association's purpose and planned activities",
        "Names of the people who will make up an interim board",
        "Any existing bylaws, if the association already exists",
      ],
      ar: [
        "وصف لغرض الجمعية ونشاطها المخطط له",
        "أسماء الأشخاص الذين سيشكّلون مجلس إدارة مؤقتًا",
        "أي نظام أساسي قائم، إن كانت الجمعية موجودة بالفعل",
      ],
    },
    body: {
      sv: [
        { type: "heading", level: 2, text: "Att bilda en ideell förening" },
        {
          type: "paragraph",
          text: "En ideell förening bildas normalt genom att ett antal personer går samman, antar stadgar och väljer en styrelse vid ett konstituerande möte. Det finns ingen enskild myndighet som registrerar ideella föreningar generellt, men beroende på verksamhet kan registrering hos till exempel Skatteverket bli aktuell.",
        },
      ],
      en: [
        { type: "heading", level: 2, text: "Forming a non-profit association" },
        {
          type: "paragraph",
          text: "A non-profit association is normally formed when a number of people come together, adopt bylaws, and elect a board at a founding meeting. There's no single authority that registers non-profit associations in general, but depending on the activity, registration with, for example, Skatteverket may become relevant.",
        },
      ],
      ar: [
        { type: "heading", level: 2, text: "تأسيس جمعية غير ربحية" },
        {
          type: "paragraph",
          text: "تُؤسَّس الجمعية غير الربحية عادةً عندما يجتمع عدد من الأشخاص ويعتمدون نظامًا أساسيًا وينتخبون مجلس إدارة في اجتماع تأسيسي. لا توجد جهة واحدة مسؤولة عن تسجيل الجمعيات غير الربحية بشكل عام، لكن بحسب طبيعة النشاط قد يصبح التسجيل لدى جهة مثل هيئة الضرائب أمرًا ذا صلة.",
        },
      ],
    },
    faqIds: ["faq-association-difference"],
    heroImage: {
      src: "/media/optimized/etablering-av-foreningar.webp",
      width: 780,
      height: 520,
      alt: {
        sv: "Bildande och administration av föreningar",
        en: "Forming and administering associations",
        ar: "تأسيس الجمعيات وإدارتها",
      },
    },
    lastReviewed: LAST_REVIEWED,
  },

  "feasibility-budget": {
    key: "feasibility-budget",
    order: 5,
    slug: {
      sv: "affarsplan-och-budget",
      en: "business-plan-and-budget",
      ar: "خطة-العمل-والميزانية",
    },
    name: {
      sv: "Affärsplan och budget",
      en: "Business plan and budget",
      ar: "خطة العمل والميزانية",
    },
    summary: {
      sv: "Genomförbarhetsstudier, affärsplaner och budgetar som hjälper dig att se om din idé bär sig ekonomiskt innan du satsar tid och kapital. Ett tydligt underlag som du kan använda själv eller visa för banker och andra parter.",
      en: "Feasibility studies, business plans, and budgets that help you see whether your idea is financially viable before you commit time and capital. A clear document you can use yourself or show to banks and other parties.",
      ar: "دراسات جدوى وخطط عمل وميزانيات تساعدك على معرفة ما إذا كانت فكرتك مجدية ماليًا قبل الالتزام بالوقت ورأس المال. مستند واضح يمكنك استخدامه بنفسك أو عرضه على البنوك وجهات أخرى.",
    },
    whoItsFor: {
      sv: [
        "Personer som planerar att starta ett nytt företag",
        "Befintliga företag som planerar en investering eller expansion",
        "Företagare som behöver underlag inför kontakt med bank eller finansiär",
      ],
      en: [
        "People planning to start a new business",
        "Existing businesses planning an investment or expansion",
        "Business owners who need documentation for a bank or financier",
      ],
      ar: [
        "الأشخاص الذين يخططون لتأسيس عمل جديد",
        "الأعمال القائمة التي تخطط لاستثمار أو توسع",
        "أصحاب الأعمال المحتاجون إلى مستندات للتعامل مع بنك أو ممول",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av affärsidén och dess grundläggande förutsättningar",
        "Sammanställning av en realistisk budget",
        "En strukturerad genomförbarhetsstudie som underlag för beslut",
        "Ett dokument du kan använda internt eller gentemot externa parter",
      ],
      en: [
        "A review of the business idea and its basic assumptions",
        "Compiling a realistic budget",
        "A structured feasibility study as a basis for decisions",
        "A document you can use internally or with external parties",
      ],
      ar: [
        "مراجعة لفكرة العمل وافتراضاتها الأساسية",
        "إعداد ميزانية واقعية",
        "دراسة جدوى منظمة كأساس لاتخاذ القرار",
        "مستند يمكنك استخدامه داخليًا أو مع أطراف خارجية",
      ],
    },
    process: {
      sv: [
        "Vi går igenom din affärsidé och dina mål",
        "Vi samlar in relevanta antaganden och siffror tillsammans med dig",
        "Vi sammanställer budget och genomförbarhetsstudie",
        "Vi går igenom resultatet med dig och diskuterar eventuella justeringar",
      ],
      en: [
        "We go through your business idea and your goals",
        "We gather the relevant assumptions and figures together with you",
        "We compile the budget and feasibility study",
        "We go through the results with you and discuss any adjustments",
      ],
      ar: [
        "نراجع معك فكرة عملك وأهدافك",
        "نجمع الافتراضات والأرقام ذات الصلة معك",
        "نُعِدّ الميزانية ودراسة الجدوى",
        "نراجع النتائج معك ونناقش أي تعديلات",
      ],
    },
    whatToPrepare: {
      sv: [
        "En kort beskrivning av affärsidén",
        "Uppskattade kostnader och intäkter, om sådana redan finns",
        "Eventuellt underlag från tidigare verksamhet, om relevant",
      ],
      en: [
        "A brief description of the business idea",
        "Estimated costs and revenue, if already available",
        "Any documentation from previous business activity, if relevant",
      ],
      ar: [
        "وصف موجز لفكرة العمل",
        "تقديرات التكاليف والإيرادات، إن توفرت",
        "أي مستندات من نشاط تجاري سابق، إن كانت ذات صلة",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Varför en budget innan du startar",
        },
        {
          type: "paragraph",
          text: "En budget och en genomförbarhetsstudie hjälper dig att se om siffrorna går ihop innan du binder upp tid, pengar och andra resurser. Det gör det också enklare att förklara din idé för till exempel en bank eller annan finansiär.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Why you need a budget before you start",
        },
        {
          type: "paragraph",
          text: "A budget and a feasibility study help you see whether the numbers add up before you commit time, money, and other resources. It also makes it easier to explain your idea to, for example, a bank or other financier.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "لماذا تحتاج إلى ميزانية قبل البدء",
        },
        {
          type: "paragraph",
          text: "تساعدك الميزانية ودراسة الجدوى على معرفة ما إذا كانت الأرقام متوازنة قبل الالتزام بالوقت والمال والموارد الأخرى. كما تسهّل شرح فكرتك لجهة مثل بنك أو ممول آخر.",
        },
      ],
    },
    faqIds: ["faq-budget-purpose"],
    heroImage: {
      src: "/media/optimized/genomforbarhet-och-budget-studier.webp",
      width: 540,
      height: 367,
      alt: {
        sv: "Affärsplan, budget och genomförbarhetsstudie",
        en: "Business plan, budget, and feasibility study",
        ar: "خطة العمل والميزانية ودراسة الجدوى",
      },
    },
    lastReviewed: LAST_REVIEWED,
  },

  contracts: {
    key: "contracts",
    order: 6,
    slug: {
      sv: "avtal-och-kontrakt",
      en: "contracts-and-agreements",
      ar: "العقود-والاتفاقيات",
    },
    name: {
      sv: "Avtal och kontrakt",
      en: "Contracts and agreements",
      ar: "العقود والاتفاقيات",
    },
    summary: {
      sv: "Praktiskt stöd med avtal och kontrakt kopplade till din verksamhet, till exempel att strukturera och gå igenom underlag inför avtalstecknande. Vid behov av kvalificerad juridisk rådgivning hänvisar vi dig vidare.",
      en: "Practical support with contracts and agreements related to your business, such as structuring and reviewing documentation before signing. If qualified legal advice is needed, we'll refer you onward.",
      ar: "دعم عملي في العقود والاتفاقيات المتعلقة بنشاطك، مثل تنظيم المستندات ومراجعتها قبل التوقيع. وعند الحاجة إلى استشارة قانونية متخصصة، سنحيلك إلى الجهة المناسبة.",
    },
    whoItsFor: {
      sv: [
        "Företagare som behöver strukturera avtal med kunder eller leverantörer",
        "Verksamheter som vill ha ett andra par ögon på ett avtalsunderlag",
        "Företag som är nya i det svenska affärsklimatet",
      ],
      en: [
        "Business owners who need to structure agreements with customers or suppliers",
        "Businesses who want a second pair of eyes on contract documentation",
        "Companies that are new to the Swedish business environment",
      ],
      ar: [
        "أصحاب الأعمال الذين يحتاجون إلى تنظيم اتفاقيات مع العملاء أو الموردين",
        "المنشآت الراغبة في مراجعة إضافية لمستندات العقود",
        "الشركات الجديدة على بيئة الأعمال السويدية",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av avtalets praktiska och administrativa delar",
        "Hjälp att strukturera underlag inför avtalstecknande",
        "Rådgivning kring vad som är rimligt att reglera i ett avtal",
        "Hänvisning vidare till jurist eller advokat vid behov av kvalificerad juridisk rådgivning",
      ],
      en: [
        "A review of the practical and administrative parts of the agreement",
        "Help structuring documentation ahead of signing",
        "Advice on what's reasonable to regulate in an agreement",
        "Referral to a lawyer or solicitor when qualified legal advice is needed",
      ],
      ar: [
        "مراجعة للجوانب العملية والإدارية للاتفاقية",
        "المساعدة في تنظيم المستندات قبل التوقيع",
        "استشارة حول ما هو معقول تنظيمه في الاتفاقية",
        "الإحالة إلى محامٍ مختص عند الحاجة إلى استشارة قانونية متخصصة",
      ],
    },
    process: {
      sv: [
        "Vi går igenom vilket avtal eller kontrakt det handlar om",
        "Vi kartlägger vilka frågor som behöver regleras",
        "Vi hjälper dig att strukturera och kvalitetssäkra underlaget",
        "Vid behov hänvisar vi dig vidare till kvalificerad juridisk rådgivning",
      ],
      en: [
        "We go through which agreement or contract is involved",
        "We map out which issues need to be regulated",
        "We help you structure and quality-check the documentation",
        "We refer you on for qualified legal advice when needed",
      ],
      ar: [
        "نراجع معك الاتفاقية أو العقد المعني",
        "نحدد المسائل التي تحتاج إلى تنظيم",
        "نساعدك في تنظيم المستندات والتحقق من جودتها",
        "نحيلك للحصول على استشارة قانونية متخصصة عند الحاجة",
      ],
    },
    whatToPrepare: {
      sv: [
        "Utkast till avtal, om ett sådant redan finns",
        "Information om motparten och vad avtalet ska reglera",
        "Eventuella tidigare avtal som är relevanta för jämförelse",
      ],
      en: [
        "A draft agreement, if one already exists",
        "Information about the other party and what the agreement should regulate",
        "Any previous agreements relevant for comparison",
      ],
      ar: [
        "مسودة الاتفاقية، إن وُجدت",
        "معلومات عن الطرف الآخر وما ينبغي أن تنظمه الاتفاقية",
        "أي اتفاقيات سابقة ذات صلة للمقارنة",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Administrativt stöd, inte juridisk representation",
        },
        {
          type: "paragraph",
          text: "Vi hjälper dig att strukturera och förbereda avtal och kontrakt på ett praktiskt plan. I ärenden som kräver kvalificerad juridisk bedömning eller representation hänvisar vi dig vidare till en jurist eller advokat.",
        },
        { type: "disclaimer", text: CONTRACT_DISCLAIMER.sv },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Administrative support, not legal representation",
        },
        {
          type: "paragraph",
          text: "We help you structure and prepare agreements and contracts on a practical level. For matters requiring qualified legal assessment or representation, we'll refer you on to a lawyer or solicitor.",
        },
        { type: "disclaimer", text: CONTRACT_DISCLAIMER.en },
      ],
      ar: [
        { type: "heading", level: 2, text: "دعم إداري، لا تمثيل قانوني" },
        {
          type: "paragraph",
          text: "نساعدك على تنظيم العقود والاتفاقيات وإعدادها على المستوى العملي. أما في المسائل التي تتطلب تقييمًا أو تمثيلًا قانونيًا متخصصًا، فسنحيلك إلى محامٍ مختص.",
        },
        { type: "disclaimer", text: CONTRACT_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-contracts-legal-advice"],
    heroImage: {
      src: "/media/optimized/kontrakt-och-avtal.webp",
      width: 1024,
      height: 683,
      alt: {
        sv: "Stöd med avtal och kontrakt för företag",
        en: "Support with contracts and agreements for businesses",
        ar: "دعم في العقود والاتفاقيات للشركات",
      },
    },
    lastReviewed: LAST_REVIEWED,
  },

  "investment-establishment": {
    key: "investment-establishment",
    order: 7,
    slug: {
      sv: "etablera-foretag-i-sverige",
      en: "start-a-company-in-sweden",
      ar: "تأسيس-شركة-في-السويد",
    },
    name: {
      sv: "Etablera företag i Sverige",
      en: "Establishing a business in Sweden",
      ar: "تأسيس شركة في السويد",
    },
    summary: {
      sv: "Hjälp till dig som vill etablera verksamhet eller investera i Sverige, med praktisk vägledning genom de svenska stegen för företagsetablering. Det här är inte en migrationstjänst — frågor om uppehållstillstånd hanteras separat av Migrationsverket.",
      en: "Help for those who want to establish a business or invest in Sweden, with practical guidance through the Swedish steps of business establishment. This is not an immigration service — residence permit questions are handled separately by Migrationsverket.",
      ar: "مساعدة لمن يرغب في تأسيس نشاط تجاري أو الاستثمار في السويد، مع توجيه عملي خلال خطوات تأسيس الأعمال في السويد. هذه ليست خدمة هجرة — تتولى هيئة الهجرة السويدية (Migrationsverket) البتّ في مسائل تصاريح الإقامة بشكل منفصل.",
    },
    whoItsFor: {
      sv: [
        "Utländska företagare och investerare som vill etablera verksamhet i Sverige",
        "Grundare som är nya i det svenska affärsklimatet",
        "Arabisktalande företagare som vill kunna kommunicera på sitt eget språk",
      ],
      en: [
        "Foreign business owners and investors who want to establish a business in Sweden",
        "Founders who are new to the Swedish business environment",
        "Arabic-speaking business owners who want to communicate in their own language",
      ],
      ar: [
        "أصحاب الأعمال والمستثمرون الأجانب الراغبون في تأسيس نشاط تجاري في السويد",
        "المؤسسون الجدد على بيئة الأعمال السويدية",
        "أصحاب الأعمال الناطقون بالعربية الراغبون في التواصل بلغتهم",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av vad som praktiskt krävs för att etablera verksamhet i Sverige",
        "Vägledning kring val av bolagsform utifrån din situation",
        "Praktisk hjälp genom registreringsprocessen",
        "Rådgivning kring nästa steg efter etablering",
      ],
      en: [
        "A review of what's practically required to establish a business in Sweden",
        "Guidance on choosing a company type based on your situation",
        "Practical help through the registration process",
        "Advice on next steps after establishment",
      ],
      ar: [
        "مراجعة لما هو مطلوب عمليًا لتأسيس نشاط تجاري في السويد",
        "توجيه حول اختيار نوع الشركة بناءً على وضعك",
        "مساعدة عملية خلال عملية التسجيل",
        "استشارة حول الخطوات التالية بعد التأسيس",
      ],
    },
    process: {
      sv: [
        "Vi går igenom din bakgrund, idé och mål med etableringen",
        "Vi kartlägger vilka praktiska steg som är relevanta för dig",
        "Vi hjälper dig genom registrering och uppstart",
        "Vi diskuterar vad som är rimliga nästa steg för din verksamhet",
      ],
      en: [
        "We go through your background, idea, and goals for the establishment",
        "We map out which practical steps are relevant for you",
        "We help you through registration and getting started",
        "We discuss what reasonable next steps look like for your business",
      ],
      ar: [
        "نراجع معك خلفيتك وفكرتك وأهدافك من التأسيس",
        "نحدد الخطوات العملية ذات الصلة بحالتك",
        "نساعدك خلال التسجيل والانطلاق في النشاط",
        "نناقش معك الخطوات التالية المعقولة لعملك",
      ],
    },
    whatToPrepare: {
      sv: [
        "Beskrivning av din affärsidé och bakgrund",
        "Eventuell dokumentation du redan har om ditt bolag eller din verksamhet",
        "Tydlighet kring vilka frågor som är viktigast för dig att få svar på",
      ],
      en: [
        "A description of your business idea and background",
        "Any documentation you already have about your company or business",
        "Clarity on which questions matter most for you to have answered",
      ],
      ar: [
        "وصف لفكرة عملك وخلفيتك",
        "أي مستندات لديك بالفعل عن شركتك أو نشاطك",
        "توضيح للأسئلة الأهم بالنسبة لك للحصول على إجابات عنها",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "En separat process från migrationsärenden",
        },
        {
          type: "paragraph",
          text: "Att bilda eller etablera företag i Sverige regleras av Bolagsverket och Skatteverket och är inte samma process som ansökan om uppehållstillstånd, som i stället hanteras av Migrationsverket. Vi rekommenderar att du tar reda på vad som gäller för din specifika situation innan du fattar beslut som rör din vistelse i Sverige.",
        },
        { type: "disclaimer", text: INVESTMENT_DISCLAIMER.sv },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "A separate process from immigration matters",
        },
        {
          type: "paragraph",
          text: "Forming or establishing a business in Sweden is regulated by Bolagsverket and Skatteverket and is not the same process as applying for a residence permit, which is instead handled by Migrationsverket. We recommend finding out what applies to your specific situation before making decisions related to your stay in Sweden.",
        },
        { type: "disclaimer", text: INVESTMENT_DISCLAIMER.en },
      ],
      ar: [
        { type: "heading", level: 2, text: "عملية منفصلة عن معاملات الهجرة" },
        {
          type: "paragraph",
          text: "يخضع تأسيس شركة أو إنشاؤها في السويد لتنظيم مكتب تسجيل الشركات (Bolagsverket) وهيئة الضرائب (Skatteverket)، وهو ليس العملية نفسها المتعلقة بطلب تصريح الإقامة، والتي تتولاها هيئة الهجرة السويدية (Migrationsverket) بدلًا من ذلك. نوصي بمعرفة ما ينطبق على وضعك الخاص قبل اتخاذ قرارات متعلقة بإقامتك في السويد.",
        },
        { type: "disclaimer", text: INVESTMENT_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-investment-guarantee", "faq-investment-scope"],
    heroImage: {
      src: "/media/optimized/investeringar-i-sverige.webp",
      width: 1024,
      height: 512,
      alt: {
        sv: "Etablera företag och investera i Sverige",
        en: "Establishing a business and investing in Sweden",
        ar: "تأسيس شركة والاستثمار في السويد",
      },
    },
    lastReviewed: LAST_REVIEWED,
  },

  payroll: {
    key: "payroll",
    order: 8,
    slug: { sv: "loneadministration", en: "payroll", ar: "الرواتب" },
    name: { sv: "Löneadministration", en: "Payroll", ar: "الرواتب" },
    summary: {
      sv: "Löpande löneadministration för aktiebolag och andra företag i Sverige. Vi hjälper dig med lönekörning, arbetsgivardeklaration och kontakt med anställda kring lön, så att utbetalningarna blir korrekta och i tid varje månad.",
      en: "Ongoing payroll administration for limited companies and other businesses in Sweden. We help with payroll runs, employer tax returns, and communication with employees about pay, so payments are accurate and on time every month.",
      ar: "إدارة رواتب مستمرة للشركات المحدودة وغيرها من الشركات في السويد. نساعدك في تنفيذ الرواتب وإقرار صاحب العمل والتواصل مع الموظفين بشأن رواتبهم، لضمان دقة المدفوعات وانتظامها كل شهر.",
    },
    whoItsFor: {
      sv: [
        "Företag med anställda som behöver löpande lönehantering",
        "Arbetsgivare som vill vara säkra på att arbetsgivardeklarationen blir rätt",
        "Företagare som vill lämna över lönearbetet till någon annan",
      ],
      en: [
        "Companies with employees that need ongoing payroll handling",
        "Employers who want to be confident their employer tax return is correct",
        "Business owners who want to hand off payroll work to someone else",
      ],
      ar: [
        "الشركات التي لديها موظفون وتحتاج إلى إدارة رواتب مستمرة",
        "أصحاب العمل الراغبون في التأكد من صحة إقرار صاحب العمل",
        "أصحاب الأعمال الراغبون في تسليم مهام الرواتب لجهة أخرى",
      ],
    },
    whatsIncluded: {
      sv: [
        "Beräkning och utbetalning av lön",
        "Hantering av skatteavdrag och arbetsgivaravgifter",
        "Arbetsgivardeklaration till Skatteverket varje månad",
        "Lönebesked och underlag till anställda",
      ],
      en: [
        "Calculating and processing pay",
        "Handling tax deductions and employer contributions",
        "Monthly employer tax returns to Skatteverket",
        "Payslips and documentation for employees",
      ],
      ar: [
        "احتساب الرواتب وصرفها",
        "التعامل مع الاستقطاعات الضريبية واشتراكات صاحب العمل",
        "تقديم إقرار صاحب العمل الشهري إلى هيئة الضرائب",
        "توفير قسائم الرواتب والمستندات للموظفين",
      ],
    },
    process: {
      sv: [
        "Vi går igenom antal anställda, anställningsvillkor och nuvarande rutiner",
        "Vi sätter upp en lönerutin och tidsplan för varje löneperiod",
        "Vi beräknar och kör lönen samt lämnar arbetsgivardeklaration",
        "Du och dina anställda får tydliga underlag varje månad",
      ],
      en: [
        "We review your number of employees, employment terms, and current routines",
        "We set up a payroll routine and timeline for each pay period",
        "We calculate and run payroll and file the employer tax return",
        "You and your employees get clear documentation every month",
      ],
      ar: [
        "نراجع عدد موظفيك وشروط توظيفهم والإجراءات الحالية",
        "نضع روتينًا وجدولًا زمنيًا لكل فترة رواتب",
        "نحتسب الرواتب وننفذها ونقدّم إقرار صاحب العمل",
        "تحصل أنت وموظفوك على مستندات واضحة كل شهر",
      ],
    },
    whatToPrepare: {
      sv: [
        "Lista över anställda och deras anställningsvillkor",
        "Uppgifter om eventuella förmåner, frånvaro eller ändringar",
        "Tidigare lönebesked om du byter till oss mitt i året",
      ],
      en: [
        "A list of employees and their employment terms",
        "Information on any benefits, absence, or changes",
        "Previous payslips, if you're switching to us mid-year",
      ],
      ar: [
        "قائمة بالموظفين وشروط توظيفهم",
        "بيانات عن أي مزايا أو غياب أو تغييرات",
        "قسائم رواتب سابقة، في حال انتقالك إلينا خلال العام",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Arbetsgivarens ansvar för lön och arbetsgivaravgifter",
        },
        {
          type: "paragraph",
          text: "Som arbetsgivare i Sverige ansvarar du för att lön beräknas rätt, att skatteavdrag och arbetsgivaravgifter hanteras korrekt och att arbetsgivardeklaration lämnas till Skatteverket varje månad. Fel i löneadministrationen kan påverka både dina anställda och din relation till Skatteverket.",
        },
        {
          type: "heading",
          level: 2,
          text: "Så arbetar vi med din löneadministration",
        },
        {
          type: "paragraph",
          text: "Vi anpassar lönerutinen efter ditt företags storlek och behov, oavsett om du har en eller flera anställda. Målet är att lönehanteringen ska fungera smidigt varje månad, utan överraskningar för dig eller dina anställda.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "The employer's responsibility for pay and employer contributions",
        },
        {
          type: "paragraph",
          text: "As an employer in Sweden, you're responsible for calculating pay correctly, handling tax deductions and employer contributions properly, and filing an employer tax return with Skatteverket every month. Payroll errors can affect both your employees and your relationship with Skatteverket.",
        },
        { type: "heading", level: 2, text: "How we work with your payroll" },
        {
          type: "paragraph",
          text: "We adapt the payroll routine to your company's size and needs, whether you have one employee or many. The goal is for payroll to run smoothly every month, without surprises for you or your employees.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "مسؤولية صاحب العمل عن الرواتب واشتراكات صاحب العمل",
        },
        {
          type: "paragraph",
          text: "بصفتك صاحب عمل في السويد، تقع على عاتقك مسؤولية احتساب الرواتب بشكل صحيح والتعامل مع الاستقطاعات الضريبية واشتراكات صاحب العمل بدقة وتقديم إقرار صاحب العمل إلى هيئة الضرائب كل شهر. يمكن أن تؤثر الأخطاء في إدارة الرواتب على موظفيك وعلى علاقتك بهيئة الضرائب.",
        },
        { type: "heading", level: 2, text: "كيف نعمل على إدارة رواتبك" },
        {
          type: "paragraph",
          text: "نكيّف روتين الرواتب مع حجم شركتك واحتياجاتها، سواء كان لديك موظف واحد أو عدة موظفين. والهدف أن تسير إدارة الرواتب بسلاسة كل شهر، دون مفاجآت لك أو لموظفيك.",
        },
      ],
    },
    faqIds: ["faq-payroll-what", "faq-payroll-frequency"],
    lastReviewed: LAST_REVIEWED,
  },

  "annual-closing": {
    key: "annual-closing",
    order: 9,
    slug: {
      sv: "bokslut-och-arsredovisning",
      en: "annual-accounts",
      ar: "الإغلاق-السنوي",
    },
    name: {
      sv: "Bokslut och årsredovisning",
      en: "Annual accounts",
      ar: "الإغلاق السنوي",
    },
    summary: {
      sv: "Hjälp med bokslut och årsredovisning för aktiebolag och andra företag i Sverige. Vi sammanställer räkenskapsåret, säkerställer att underlaget stämmer och hjälper dig att färdigställa och, där det krävs, lämna in årsredovisningen till Bolagsverket i tid.",
      en: "Help with annual accounts and annual reports for limited companies and other businesses in Sweden. We compile the financial year, make sure the figures add up, and help you finalize and, where required, submit the annual report to Bolagsverket on time.",
      ar: "مساعدة في إعداد الحسابات الختامية والقوائم المالية السنوية للشركات المحدودة وغيرها من الشركات في السويد. نجمّع بيانات السنة المالية، ونتأكد من صحة الأرقام، ونساعدك على استكمال القوائم المالية السنوية وتقديمها إلى مكتب تسجيل الشركات (Bolagsverket) في الوقت المحدد عند الاقتضاء.",
    },
    whoItsFor: {
      sv: [
        "Aktiebolag som ska upprätta årsredovisning",
        "Enskilda firmor och handelsbolag som ska göra bokslut",
        "Företag som vill ha ett bokslut som är kvalitetssäkrat inför deklaration",
      ],
      en: [
        "Limited companies that need to prepare annual reports",
        "Sole traders and trading partnerships that need annual accounts",
        "Businesses that want a quality-checked closing before filing their tax return",
      ],
      ar: [
        "الشركات المحدودة التي يتعين عليها إعداد قوائم مالية سنوية",
        "المنشآت الفردية وشركات التضامن التي تحتاج إلى إغلاق حسابات سنوي",
        "الشركات الراغبة في إغلاق حسابات موثوق قبل تقديم الإقرار الضريبي",
      ],
    },
    whatsIncluded: {
      sv: [
        "Sammanställning och avstämning av räkenskapsårets bokföring",
        "Upprättande av bokslut enligt gällande regelverk",
        "Färdigställande av årsredovisning för aktiebolag där det krävs",
        "Genomgång av resultatet med dig innan inlämning",
      ],
      en: [
        "Compiling and reconciling the financial year's bookkeeping",
        "Preparing the closing in line with applicable rules",
        "Finalizing the annual report for limited companies where required",
        "Reviewing the result with you before submission",
      ],
      ar: [
        "تجميع محاسبة السنة المالية ومطابقتها",
        "إعداد الإغلاق الحسابي وفق الأنظمة المعمول بها",
        "استكمال القوائم المالية السنوية للشركات المحدودة عند الاقتضاء",
        "مراجعة النتيجة معك قبل التقديم",
      ],
    },
    process: {
      sv: [
        "Vi går igenom bokföringen för hela räkenskapsåret",
        "Vi stämmer av och rättar eventuella avvikelser tillsammans med dig",
        "Vi upprättar bokslut och, där det krävs, årsredovisning",
        "Du får underlaget för genomläsning innan det färdigställs och lämnas in",
      ],
      en: [
        "We go through the bookkeeping for the entire financial year",
        "We reconcile and correct any discrepancies together with you",
        "We prepare the closing and, where required, the annual report",
        "You get the documentation to review before it's finalized and submitted",
      ],
      ar: [
        "نراجع المحاسبة لكامل السنة المالية",
        "نطابق البيانات ونصحح أي تباينات معك",
        "نُعِدّ الإغلاق الحسابي والقوائم المالية السنوية عند الاقتضاء",
        "تحصل على المستندات لمراجعتها قبل استكمالها وتقديمها",
      ],
    },
    whatToPrepare: {
      sv: [
        "Fullständig bokföring för räkenskapsåret",
        "Kontoutdrag och avstämningsunderlag",
        "Uppgifter om eventuella särskilda händelser under året, till exempel investeringar eller ägarförändringar",
      ],
      en: [
        "Complete bookkeeping for the financial year",
        "Bank statements and reconciliation documentation",
        "Information on any special events during the year, such as investments or ownership changes",
      ],
      ar: [
        "محاسبة كاملة للسنة المالية",
        "كشوف حساب بنكية ومستندات مطابقة",
        "معلومات عن أي أحداث خاصة خلال العام، مثل الاستثمارات أو تغييرات الملكية",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Bokslut och årsredovisning – vad är skillnaden?",
        },
        {
          type: "paragraph",
          text: "Ett bokslut är sammanställningen av räkenskapsårets bokföring och ligger till grund för både den interna uppföljningen och deklarationen. En årsredovisning är den formella handling som aktiebolag i de flesta fall ska upprätta enligt årsredovisningslagen och lämna in till Bolagsverket.",
        },
        { type: "heading", level: 2, text: "Ett bra underlag för framtiden" },
        {
          type: "paragraph",
          text: "Ett tydligt bokslut gör det enklare att följa upp företagets utveckling år för år, och är ofta efterfrågat av banker och andra parter.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Annual accounts and annual reports – what's the difference?",
        },
        {
          type: "paragraph",
          text: "Annual accounts are the compilation of the financial year's bookkeeping, forming the basis for both internal follow-up and your tax return. An annual report is the formal document that limited companies in Sweden are, in most cases, required to prepare under the Annual Accounts Act and submit to Bolagsverket.",
        },
        { type: "heading", level: 2, text: "A solid basis for the future" },
        {
          type: "paragraph",
          text: "A clear closing makes it easier to track your company's development year by year, and is often requested by banks and other parties.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "الحسابات الختامية والقوائم المالية السنوية – ما الفرق؟",
        },
        {
          type: "paragraph",
          text: "الحسابات الختامية هي تجميع لمحاسبة السنة المالية، وتشكّل الأساس للمتابعة الداخلية والإقرار الضريبي. أما القوائم المالية السنوية فهي المستند الرسمي الذي يجب على الشركات المحدودة في معظم الحالات إعداده وفق قانون القوائم المالية السنوية وتقديمه إلى مكتب تسجيل الشركات.",
        },
        { type: "heading", level: 2, text: "أساس جيد للمستقبل" },
        {
          type: "paragraph",
          text: "يسهّل الإغلاق الحسابي الواضح متابعة تطور شركتك عامًا بعد عام، وغالبًا ما تطلبه البنوك وأطراف أخرى.",
        },
      ],
    },
    faqIds: ["faq-annual-closing-difference", "faq-annual-closing-timing"],
    lastReviewed: LAST_REVIEWED,
  },

  advisory: {
    key: "advisory",
    order: 10,
    slug: {
      sv: "ekonomisk-radgivning",
      en: "business-advisory",
      ar: "الاستشارات-المالية",
    },
    name: {
      sv: "Ekonomisk rådgivning",
      en: "Business advisory",
      ar: "الاستشارات المالية",
    },
    summary: {
      sv: "Ekonomisk rådgivning för företag som redan är igång och vill få bättre koll på lönsamhet, likviditet och ekonomisk utveckling. Vi går igenom din situation tillsammans med dig och ger konkreta, praktiska råd utifrån ditt företags faktiska siffror.",
      en: "Business advisory for companies that are already up and running and want a clearer picture of profitability, cash flow, and financial development. We go through your situation together with you and give concrete, practical advice based on your company's actual numbers.",
      ar: "استشارات مالية للشركات القائمة الراغبة في فهم أفضل لربحيتها وسيولتها وتطورها المالي. نراجع وضعك معك ونقدّم نصائح عملية وملموسة استنادًا إلى الأرقام الفعلية لشركتك.",
    },
    whoItsFor: {
      sv: [
        "Företag som vill följa upp lönsamhet och likviditet löpande",
        "Företagare som funderar på prissättning eller nya investeringar",
        "Verksamheter som vill ha ett bollplank kring ekonomiska beslut",
      ],
      en: [
        "Businesses that want to track profitability and cash flow on an ongoing basis",
        "Business owners considering pricing or new investments",
        "Companies that want a sounding board for financial decisions",
      ],
      ar: [
        "الشركات الراغبة في متابعة الربحية والسيولة بشكل مستمر",
        "أصحاب الأعمال الذين يفكرون في التسعير أو استثمارات جديدة",
        "الشركات الراغبة في استشاري تثق به لاتخاذ قراراتها المالية",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av företagets ekonomiska nyckeltal",
        "Rådgivning kring lönsamhet, prissättning och kostnader",
        "Uppföljning av likviditet och betalningsförmåga",
        "Praktiska rekommendationer utifrån ditt företags situation",
      ],
      en: [
        "A review of your company's key financial figures",
        "Advice on profitability, pricing, and costs",
        "Cash flow and payment capacity follow-up",
        "Practical recommendations based on your company's situation",
      ],
      ar: [
        "مراجعة المؤشرات المالية الرئيسية لشركتك",
        "استشارة حول الربحية والتسعير والتكاليف",
        "متابعة السيولة والقدرة على السداد",
        "توصيات عملية تناسب وضع شركتك",
      ],
    },
    process: {
      sv: [
        "Vi går igenom din ekonomi och dina mål",
        "Vi identifierar vilka nyckeltal som är viktigast att följa",
        "Vi ger konkreta rekommendationer utifrån din situation",
        "Vi följer upp löpande så att rådgivningen hänger ihop med din bokföring",
      ],
      en: [
        "We go through your finances and your goals",
        "We identify which key figures matter most to track",
        "We give concrete recommendations based on your situation",
        "We follow up on an ongoing basis so the advice stays connected to your bookkeeping",
      ],
      ar: [
        "نراجع وضعك المالي وأهدافك",
        "نحدد أهم المؤشرات التي ينبغي متابعتها",
        "نقدّم توصيات ملموسة تناسب وضعك",
        "نتابع بشكل مستمر لضمان ارتباط الاستشارة بمحاسبتك",
      ],
    },
    whatToPrepare: {
      sv: [
        "Aktuell bokföring eller senaste bokslut",
        "En beskrivning av vilka frågor du vill ha hjälp med",
        "Eventuella tidigare budgetar eller prognoser",
      ],
      en: [
        "Current bookkeeping or your most recent annual accounts",
        "A description of what questions you want help with",
        "Any previous budgets or forecasts",
      ],
      ar: [
        "محاسبة حالية أو آخر إغلاق حسابي",
        "وصف للأسئلة التي تحتاج مساعدة بشأنها",
        "أي ميزانيات أو توقعات سابقة",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Löpande rådgivning, inte en engångsinsats",
        },
        {
          type: "paragraph",
          text: "Till skillnad från en affärsplan eller budget inför en start eller enskild investering, är ekonomisk rådgivning ett löpande stöd för dig som redan driver verksamhet och vill fatta bättre beslut utifrån aktuella siffror.",
        },
        {
          type: "heading",
          level: 2,
          text: "Rådgivning kopplad till din bokföring",
        },
        {
          type: "paragraph",
          text: "Vi utgår från din faktiska bokföring, inte generella branschsiffror, vilket gör rådgivningen konkret och relevant för just ditt företag.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Ongoing advisory, not a one-off effort",
        },
        {
          type: "paragraph",
          text: "Unlike a business plan or budget for a launch or a single investment, business advisory is ongoing support for a company that's already running and wants to make better decisions based on current numbers.",
        },
        {
          type: "heading",
          level: 2,
          text: "Advisory grounded in your bookkeeping",
        },
        {
          type: "paragraph",
          text: "We work from your actual bookkeeping, not generic industry figures, which makes the advice concrete and relevant to your specific company.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "استشارة مستمرة، وليست جهدًا لمرة واحدة",
        },
        {
          type: "paragraph",
          text: "على عكس خطة العمل أو الميزانية اللازمتين قبل الانطلاق أو لاستثمار واحد، تُعد الاستشارات المالية دعمًا مستمرًا لمن يدير عملاً قائمًا بالفعل ويريد اتخاذ قرارات أفضل بناءً على الأرقام الحالية.",
        },
        { type: "heading", level: 2, text: "استشارة مرتبطة بمحاسبتك" },
        {
          type: "paragraph",
          text: "نستند إلى محاسبتك الفعلية وليس إلى أرقام عامة للقطاع، ما يجعل الاستشارة ملموسة وملائمة لشركتك تحديدًا.",
        },
      ],
    },
    faqIds: ["faq-advisory-scope", "faq-advisory-difference"],
    lastReviewed: LAST_REVIEWED,
  },

  "bookkeeping-correction": {
    key: "bookkeeping-correction",
    order: 11,
    slug: {
      sv: "ratta-fel-i-bokforingen",
      en: "correcting-bookkeeping-errors",
      ar: "تصحيح-اخطاء-المحاسبة",
    },
    name: {
      sv: "Rätta fel i bokföringen",
      en: "Correcting bookkeeping errors",
      ar: "تصحيح أخطاء المحاسبة",
    },
    summary: {
      sv: "Hjälp att rätta fel i bokföringen för dig som upptäckt felaktiga poster, saknade verifikationer eller bokföring som inte stämmer mot bank och kvitton. Vi går igenom vad som behöver korrigeras och ser till att bokföringen blir korrekt igen.",
      en: "Help correcting bookkeeping errors for businesses that have found incorrect entries, missing vouchers, or bookkeeping that doesn't match the bank and receipts. We review what needs correcting and make sure your bookkeeping is accurate again.",
      ar: "مساعدة في تصحيح أخطاء المحاسبة لمن اكتشف قيودًا خاطئة أو مستندات مفقودة أو محاسبة لا تتطابق مع كشوف البنك والإيصالات. نراجع ما يحتاج إلى تصحيح ونضمن استعادة دقة محاسبتك.",
    },
    whoItsFor: {
      sv: [
        "Företag som upptäckt fel i sin bokföring",
        "Verksamheter som bytt bokföringssystem eller ansvarig utan tydlig överlämning",
        "Företagare som vill kvalitetssäkra bokföringen inför bokslut eller deklaration",
      ],
      en: [
        "Businesses that have discovered errors in their bookkeeping",
        "Companies that changed bookkeeping systems or staff without a clear handover",
        "Business owners who want their bookkeeping quality-checked before closing or filing",
      ],
      ar: [
        "الشركات التي اكتشفت أخطاء في محاسبتها",
        "المنشآت التي غيّرت نظام المحاسبة أو المسؤول عنها دون تسليم واضح",
        "أصحاب الأعمال الراغبون في التحقق من جودة محاسبتهم قبل الإغلاق أو تقديم الإقرار",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av bokföringen för att identifiera felaktigheter",
        "Avstämning mot bank, kvitton och tidigare rapportering",
        "Korrigering av felaktiga poster och saknade verifikationer",
        "Rekommendationer för att undvika liknande fel framöver",
      ],
      en: [
        "A review of your bookkeeping to identify errors",
        "Reconciliation against your bank, receipts, and previous reporting",
        "Correcting incorrect entries and missing vouchers",
        "Recommendations to avoid similar errors going forward",
      ],
      ar: [
        "مراجعة محاسبتك لتحديد الأخطاء",
        "المطابقة مع كشوف البنك والإيصالات والتقارير السابقة",
        "تصحيح القيود الخاطئة والمستندات المفقودة",
        "توصيات لتفادي أخطاء مشابهة مستقبلًا",
      ],
    },
    process: {
      sv: [
        "Vi går igenom din bokföring och identifierar avvikelser",
        "Vi kartlägger orsaken till felen tillsammans med dig",
        "Vi korrigerar bokföringen och stämmer av mot underlag",
        "Vi går igenom resultatet med dig och föreslår rutiner framöver",
      ],
      en: [
        "We go through your bookkeeping and identify discrepancies",
        "We map out the cause of the errors together with you",
        "We correct the bookkeeping and reconcile it against your documentation",
        "We go through the result with you and suggest routines going forward",
      ],
      ar: [
        "نراجع محاسبتك ونحدد التباينات",
        "نحدد سبب الأخطاء معك",
        "نصحح المحاسبة ونطابقها مع المستندات",
        "نراجع النتيجة معك ونقترح إجراءات للمستقبل",
      ],
    },
    whatToPrepare: {
      sv: [
        "Tillgång till bokföringen för den period felen gäller",
        "Kvitton, fakturor och kontoutdrag för samma period",
        "Beskrivning av vad du själv har upptäckt eller misstänker",
      ],
      en: [
        "Access to the bookkeeping for the period the errors relate to",
        "Receipts, invoices, and bank statements for the same period",
        "A description of what you've noticed or suspect yourself",
      ],
      ar: [
        "إتاحة المحاسبة للفترة المعنية بالأخطاء",
        "الإيصالات والفواتير وكشوف الحساب البنكي لنفس الفترة",
        "وصف لما لاحظته أو تشك فيه بنفسك",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Vanliga orsaker till fel i bokföringen",
        },
        {
          type: "paragraph",
          text: "Fel uppstår ofta vid systembyten, personalbyten eller när underlag hanterats manuellt under en period. Oavsett orsak är det viktigt att felen rättas så att bokföringen speglar verkligheten.",
        },
        {
          type: "heading",
          level: 2,
          text: "Så rättar vi bokföringen tillsammans",
        },
        {
          type: "paragraph",
          text: "Vi går systematiskt igenom perioden det gäller, jämför med bank och kvitton, och korrigerar de poster som behöver ändras — med tydlig dokumentation av vad som justerats och varför.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Common causes of bookkeeping errors",
        },
        {
          type: "paragraph",
          text: "Errors often arise when switching systems, changing staff, or when documentation has been handled manually for a period. Whatever the cause, it's important the errors are corrected so your bookkeeping reflects reality.",
        },
        {
          type: "heading",
          level: 2,
          text: "How we correct your bookkeeping together",
        },
        {
          type: "paragraph",
          text: "We systematically go through the relevant period, compare it against your bank and receipts, and correct the entries that need changing — with clear documentation of what was adjusted and why.",
        },
      ],
      ar: [
        { type: "heading", level: 2, text: "الأسباب الشائعة لأخطاء المحاسبة" },
        {
          type: "paragraph",
          text: "غالبًا ما تنشأ الأخطاء عند تغيير الأنظمة أو تغيير الموظفين أو عندما تُدار المستندات يدويًا لفترة من الزمن. وأيًا كان السبب، من المهم تصحيح الأخطاء بحيث تعكس المحاسبة الواقع الفعلي.",
        },
        { type: "heading", level: 2, text: "كيف نصحح محاسبتك معًا" },
        {
          type: "paragraph",
          text: "نراجع الفترة المعنية بشكل منهجي، ونقارنها بكشوف البنك والإيصالات، ونصحح القيود التي تحتاج إلى تعديل — مع توثيق واضح لما تم تعديله وسبب ذلك.",
        },
      ],
    },
    faqIds: ["faq-correction-when", "faq-correction-consequence"],
    lastReviewed: LAST_REVIEWED,
  },

  "fortnox-support": {
    key: "fortnox-support",
    order: 12,
    slug: { sv: "fortnox-hjalp", en: "fortnox-support", ar: "دعم-فورتنوكس" },
    name: { sv: "Fortnox-hjälp", en: "Fortnox support", ar: "دعم فورتنوكس" },
    summary: {
      sv: "Fortnox bokföringshjälp för dig som redan använder Fortnox eller funderar på att börja. Vi hjälper dig med löpande bokföring i systemet, avstämningar och praktiska frågor kring hur olika funktioner används.",
      en: "Fortnox bookkeeping support for businesses already using Fortnox, or considering getting started with it. We help with ongoing bookkeeping in the system, reconciliations, and practical questions about how different features work.",
      ar: "مساعدة في المحاسبة عبر برنامج Fortnox لمن يستخدمه بالفعل أو يفكر في البدء باستخدامه. نساعدك في المحاسبة المستمرة على النظام والمطابقات والمسائل العملية المتعلقة باستخدام مختلف الميزات.",
    },
    whoItsFor: {
      sv: [
        "Företag som redan bokför i Fortnox",
        "Verksamheter som funderar på att börja använda Fortnox",
        "Företagare som vill ha hjälp att komma igång med rätt inställningar",
      ],
      en: [
        "Businesses already doing their bookkeeping in Fortnox",
        "Companies considering starting to use Fortnox",
        "Business owners who want help getting set up correctly from the start",
      ],
      ar: [
        "الشركات التي تستخدم Fortnox بالفعل في محاسبتها",
        "المنشآت التي تفكر في بدء استخدام Fortnox",
        "أصحاب الأعمال الراغبون في مساعدة للبدء بالإعدادات الصحيحة",
      ],
    },
    whatsIncluded: {
      sv: [
        "Löpande bokföring och avstämning i Fortnox",
        "Hjälp att sätta upp konton och rutiner i systemet",
        "Praktiskt stöd kring fakturering, kvitton och integrationer",
        "Svar på frågor som uppstår i det dagliga arbetet",
      ],
      en: [
        "Ongoing bookkeeping and reconciliation in Fortnox",
        "Help setting up accounts and routines in the system",
        "Practical support with invoicing, receipts, and integrations",
        "Answers to questions that come up in day-to-day use",
      ],
      ar: [
        "محاسبة ومطابقة مستمرة عبر Fortnox",
        "المساعدة في إعداد الحسابات والإجراءات في النظام",
        "دعم عملي في الفوترة والإيصالات والتكاملات",
        "الإجابة عن الأسئلة التي تظهر في الاستخدام اليومي",
      ],
    },
    process: {
      sv: [
        "Vi går igenom hur du använder eller planerar att använda Fortnox",
        "Vi ställer in eller justerar konton och rutiner vid behov",
        "Vi sköter eller stöttar den löpande bokföringen i systemet",
        "Du får svar när frågor om Fortnox dyker upp",
      ],
      en: [
        "We review how you use, or plan to use, Fortnox",
        "We set up or adjust accounts and routines as needed",
        "We handle or support the ongoing bookkeeping in the system",
        "You get answers whenever questions about Fortnox come up",
      ],
      ar: [
        "نراجع كيفية استخدامك أو خطتك لاستخدام Fortnox",
        "نُعِدّ أو نعدّل الحسابات والإجراءات عند الحاجة",
        "نتولى أو ندعم المحاسبة المستمرة في النظام",
        "تحصل على إجابات كلما ظهرت أسئلة حول Fortnox",
      ],
    },
    whatToPrepare: {
      sv: [
        "Inloggningsuppgifter eller behörighet till ditt Fortnox-konto, om du redan har ett",
        "En beskrivning av hur du använder systemet idag",
        "Eventuella specifika frågor eller problem du stött på",
      ],
      en: [
        "Login details or access to your Fortnox account, if you already have one",
        "A description of how you currently use the system",
        "Any specific questions or issues you've run into",
      ],
      ar: [
        "بيانات الدخول أو صلاحية الوصول إلى حساب Fortnox الخاص بك، إن وُجد",
        "وصف لكيفية استخدامك الحالي للنظام",
        "أي أسئلة أو مشكلات محددة واجهتها",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Fortnox som verktyg för din bokföring",
        },
        {
          type: "paragraph",
          text: "Fortnox är ett molnbaserat system som många svenska företag använder för bokföring, fakturering och lön. Rätt inställningar och rutiner från början gör det enklare att hålla ordning löpande.",
        },
        {
          type: "heading",
          level: 2,
          text: "Stöd oavsett var du är i processen",
        },
        {
          type: "paragraph",
          text: "Oavsett om du precis ska börja använda Fortnox eller redan arbetar i systemet sedan tidigare, hjälper vi dig med det som är relevant för din situation.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Fortnox as a tool for your bookkeeping",
        },
        {
          type: "paragraph",
          text: "Fortnox is a cloud-based system many Swedish businesses use for bookkeeping, invoicing, and payroll. Getting the settings and routines right from the start makes it easier to stay organized going forward.",
        },
        {
          type: "heading",
          level: 2,
          text: "Support wherever you are in the process",
        },
        {
          type: "paragraph",
          text: "Whether you're just about to start using Fortnox or have already been working in the system for a while, we help you with whatever's relevant to your situation.",
        },
      ],
      ar: [
        { type: "heading", level: 2, text: "Fortnox كأداة لمحاسبتك" },
        {
          type: "paragraph",
          text: "برنامج Fortnox نظام سحابي تستخدمه العديد من الشركات السويدية للمحاسبة والفوترة والرواتب. ويؤدي ضبط الإعدادات والإجراءات بشكل صحيح منذ البداية إلى تسهيل الحفاظ على التنظيم لاحقًا.",
        },
        { type: "heading", level: 2, text: "دعم أينما كنت في العملية" },
        {
          type: "paragraph",
          text: "سواء كنت على وشك البدء باستخدام Fortnox أو تعمل عليه بالفعل منذ فترة، نساعدك فيما يناسب وضعك تحديدًا.",
        },
      ],
    },
    faqIds: ["faq-fortnox-existing", "faq-fortnox-help"],
    lastReviewed: LAST_REVIEWED,
  },

  "car-dealership-accounting": {
    key: "car-dealership-accounting",
    order: 13,
    slug: {
      sv: "bokforing-bilhandel-vmb",
      en: "car-dealership-accounting",
      ar: "محاسبة-تجار-السيارات",
    },
    name: {
      sv: "Bokföring för bilhandel och VMB",
      en: "Accounting for car dealerships",
      ar: "محاسبة تجار السيارات",
    },
    summary: {
      sv: "Bokföring och VMB för bilhandel och andra som köper och säljer begagnade fordon i Sverige. Vi hjälper dig att hantera vinstmarginalbeskattning korrekt och hålla ordning på bokföringen kring varje fordonsaffär.",
      en: "Accounting and VMB (profit margin taxation) support for car dealerships and others buying and selling used vehicles in Sweden. We help you handle profit margin VAT correctly and keep the bookkeeping for each vehicle transaction in order.",
      ar: "محاسبة ودعم في نظام VMB (ضريبة هامش الربح) لتجار السيارات وغيرهم ممن يشترون ويبيعون مركبات مستعملة في السويد. نساعدك على التعامل الصحيح مع ضريبة هامش الربح والحفاظ على تنظيم المحاسبة لكل صفقة مركبة.",
    },
    whoItsFor: {
      sv: [
        "Bilhandlare som köper och säljer begagnade fordon",
        "Verksamheter som tillämpar eller överväger vinstmarginalbeskattning (VMB)",
        "Företag inom bilbranschen som vill ha branschanpassad bokföring",
      ],
      en: [
        "Car dealers who buy and sell used vehicles",
        "Businesses applying, or considering, profit margin taxation (VMB)",
        "Companies in the car trade who want industry-adapted bookkeeping",
      ],
      ar: [
        "تجار السيارات الذين يشترون ويبيعون مركبات مستعملة",
        "المنشآت التي تطبق أو تفكر في تطبيق ضريبة هامش الربح (VMB)",
        "الشركات في قطاع السيارات الراغبة في محاسبة متخصصة تناسب طبيعة نشاطها",
      ],
    },
    whatsIncluded: {
      sv: [
        "Löpande bokföring anpassad för fordonsaffärer",
        "Hjälp att tillämpa vinstmarginalbeskattning (VMB) korrekt per affär",
        "Avstämning av lager och genomförda affärer",
        "Stöd inför moms- och periodrapportering för verksamheten",
      ],
      en: [
        "Ongoing bookkeeping adapted for vehicle transactions",
        "Help applying profit margin taxation (VMB) correctly per deal",
        "Reconciling inventory and completed transactions",
        "Support ahead of VAT and periodic reporting for the business",
      ],
      ar: [
        "محاسبة مستمرة تناسب صفقات المركبات",
        "المساعدة في تطبيق ضريبة هامش الربح (VMB) بشكل صحيح لكل صفقة",
        "مطابقة المخزون والصفقات المنجزة",
        "الدعم في إعداد تقارير ضريبة القيمة المضافة والتقارير الدورية للنشاط",
      ],
    },
    process: {
      sv: [
        "Vi går igenom din verksamhet och hur du hanterar fordonsaffärer idag",
        "Vi går igenom vilka affärer som omfattas av VMB och hur de ska redovisas",
        "Vi sköter den löpande bokföringen och avstämningen mot ditt lager",
        "Vi hjälper dig inför moms- och periodrapportering",
      ],
      en: [
        "We review your business and how you currently handle vehicle deals",
        "We go through which transactions fall under VMB and how they should be recorded",
        "We handle the ongoing bookkeeping and reconciliation against your inventory",
        "We help you ahead of VAT and periodic reporting",
      ],
      ar: [
        "نراجع نشاطك وكيفية تعاملك حاليًا مع صفقات المركبات",
        "نحدد الصفقات الخاضعة لنظام VMB وكيفية تسجيلها",
        "نتولى المحاسبة المستمرة والمطابقة مع مخزونك",
        "نساعدك في إعداد تقارير ضريبة القيمة المضافة والتقارير الدورية",
      ],
    },
    whatToPrepare: {
      sv: [
        "Underlag för köpta och sålda fordon under perioden",
        "Uppgift om vilka affärer som ska VMB-redovisas",
        "Eventuell tidigare bokföring om du byter till oss",
      ],
      en: [
        "Documentation for vehicles bought and sold during the period",
        "Information on which transactions should be reported under VMB",
        "Any previous bookkeeping, if you're switching to us",
      ],
      ar: [
        "مستندات المركبات المشتراة والمباعة خلال الفترة",
        "بيانات الصفقات التي يجب تسجيلها ضمن نظام VMB",
        "أي محاسبة سابقة، في حال انتقالك إلينا",
      ],
    },
    body: {
      sv: [
        { type: "heading", level: 2, text: "Vad är VMB och när gäller det?" },
        {
          type: "paragraph",
          text: "Vinstmarginalbeskattning (VMB) är en särskild momsmetod som bland annat kan tillämpas vid handel med begagnade bilar, där moms beräknas på skillnaden mellan inköps- och försäljningspris i stället för hela försäljningsbeloppet. Reglerna ställer särskilda krav på hur varje affär dokumenteras och bokförs.",
        },
        {
          type: "heading",
          level: 2,
          text: "Branschanpassad bokföring för bilhandlare",
        },
        {
          type: "paragraph",
          text: "Vi hjälper dig att sätta upp rutiner som gör det enklare att hålla koll på VMB-affärer och vanlig momsredovisning parallellt, så att bokföringen speglar din verksamhet korrekt.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "What is VMB, and when does it apply?",
        },
        {
          type: "paragraph",
          text: "Profit margin taxation (VMB) is a special VAT method that can apply to, among other things, trade in used cars, where VAT is calculated on the difference between the purchase and sale price rather than the full sale amount. The rules place particular demands on how each deal is documented and recorded.",
        },
        {
          type: "heading",
          level: 2,
          text: "Industry-adapted bookkeeping for car dealers",
        },
        {
          type: "paragraph",
          text: "We help you set up routines that make it easier to keep track of VMB deals alongside regular VAT reporting, so your bookkeeping accurately reflects your business.",
        },
      ],
      ar: [
        { type: "heading", level: 2, text: "ما هو نظام VMB ومتى ينطبق؟" },
        {
          type: "paragraph",
          text: "ضريبة هامش الربح (VMB) هي طريقة خاصة لاحتساب ضريبة القيمة المضافة يمكن تطبيقها، من بين حالات أخرى، على تجارة السيارات المستعملة، حيث تُحتسب الضريبة على الفرق بين سعر الشراء والبيع بدلًا من كامل مبلغ البيع. وتفرض هذه القواعد متطلبات خاصة بشأن كيفية توثيق كل صفقة وتسجيلها محاسبيًا.",
        },
        { type: "heading", level: 2, text: "محاسبة متخصصة لتجار السيارات" },
        {
          type: "paragraph",
          text: "نساعدك على وضع إجراءات تسهّل متابعة صفقات VMB جنبًا إلى جنب مع تقارير ضريبة القيمة المضافة العادية، بحيث تعكس محاسبتك نشاطك بدقة.",
        },
      ],
    },
    faqIds: ["faq-cardealer-vmb", "faq-cardealer-who"],
    lastReviewed: LAST_REVIEWED,
  },

  "arabic-speaking-accounting": {
    key: "arabic-speaking-accounting",
    order: 14,
    slug: {
      sv: "arabisk-redovisningskonsult",
      en: "arabic-speaking-accountant-sweden",
      ar: "محاسب-عربي-في-السويد",
    },
    name: {
      sv: "Arabisk redovisningskonsult i Sverige",
      en: "Arabic-speaking accountant in Sweden",
      ar: "محاسب عربي في السويد",
    },
    summary: {
      sv: "Arabisk redovisningskonsult i Sverige för dig som vill kunna beskriva din ekonomiska situation på arabiska. Economy Codes AB erbjuder samma tjänster som på svenska och engelska — bokföring, lön, moms, bokslut och deklaration — med personlig service på arabiska genom hela processen.",
      en: "Arabic-speaking accountant in Sweden for business owners who want to communicate in Arabic. Economy Codes AB offers the same services as in Swedish and English — bookkeeping, payroll, VAT, annual accounts, and tax returns — with personal service in Arabic throughout the process.",
      ar: "تقدّم Economy Codes AB خدمات المحاسبة الرقمية للشركات الصغيرة والمتوسطة في جميع أنحاء السويد، بما يشمل مسك الدفاتر والرواتب وضريبة القيمة المضافة والإقرارات الضريبية والإغلاق السنوي والاستشارات المالية، مع خدمة شخصية باللغة العربية من مستشار محاسبة يتحدث العربية بطلاقة، إلى جانب السويدية والإنجليزية.",
    },
    whoItsFor: {
      sv: [
        "Arabisktalande företagare i Sverige",
        "Nya invånare som vill driva företag men är osäkra på det svenska systemet",
        "Företag som vill kunna kommunicera med sin redovisningskonsult på arabiska",
      ],
      en: [
        "Arabic-speaking business owners in Sweden",
        "New residents who want to run a business but are unfamiliar with the Swedish system",
        "Companies who want to communicate with their accounting consultant in Arabic",
      ],
      ar: [
        "أصحاب الأعمال الناطقون بالعربية في السويد",
        "المقيمون الجدد الراغبون في إدارة أعمالهم لكن غير المتمرسين بالنظام السويدي",
        "الشركات الراغبة في التواصل مع مستشار محاسبتها باللغة العربية",
      ],
    },
    whatsIncluded: {
      sv: [
        "Bokföring, lön, moms, bokslut och deklaration på arabiska, svenska eller engelska",
        "Praktisk vägledning genom svenska myndigheter som Skatteverket och Bolagsverket",
        "Möjlighet att beskriva din situation på det språk du är mest bekväm med",
        "Samma kvalitet och auktorisation som våra övriga tjänster",
      ],
      en: [
        "Bookkeeping, payroll, VAT, annual accounts, and tax returns available in Arabic, Swedish, or English",
        "Practical guidance through Swedish authorities such as Skatteverket and Bolagsverket",
        "The ability to describe your situation in the language you're most comfortable with",
        "The same quality and authorization as our other services",
      ],
      ar: [
        "مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية باللغة العربية أو السويدية أو الإنجليزية",
        "توجيه عملي خلال التعامل مع الجهات السويدية مثل هيئة الضرائب (Skatteverket) ومكتب تسجيل الشركات (Bolagsverket)",
        "إمكانية شرح وضعك باللغة التي تشعر فيها بالراحة أكثر",
        "المستوى نفسه من الجودة والاعتماد المهني الذي يميز جميع خدماتنا",
      ],
    },
    process: {
      sv: [
        "Du berättar om ditt företag och dina behov på arabiska, svenska eller engelska",
        "Vi går igenom vilka tjänster som är relevanta för din situation",
        "Vi hjälper dig praktiskt med bokföring, lön, moms eller andra frågor",
        "Vi finns kvar för löpande kontakt på det språk du föredrar",
      ],
      en: [
        "You tell us about your business and your needs in Arabic, Swedish, or English",
        "We go through which services are relevant to your situation",
        "We help you practically with bookkeeping, payroll, VAT, or other matters",
        "We stay available for ongoing contact in the language you prefer",
      ],
      ar: [
        "تخبرنا عن شركتك واحتياجاتك بالعربية أو السويدية أو الإنجليزية",
        "نراجع الخدمات المناسبة لوضعك",
        "نساعدك عمليًا في المحاسبة أو الرواتب أو ضريبة القيمة المضافة أو أي مسائل أخرى",
        "نبقى على تواصل مستمر معك باللغة التي تفضلها",
      ],
    },
    whatToPrepare: {
      sv: [
        "En kort beskrivning av ditt företag och vad du behöver hjälp med",
        "Grundläggande företagsuppgifter, om du redan har ett registrerat företag",
        "Eventuella tidigare underlag eller frågor du vill ha svar på",
      ],
      en: [
        "A brief description of your business and what you need help with",
        "Basic company details, if you already have a registered company",
        "Any previous documentation or questions you'd like answered",
      ],
      ar: [
        "وصف موجز لشركتك وما تحتاج مساعدة فيه",
        "بيانات الشركة الأساسية، إن كان لديك شركة مسجلة بالفعل",
        "أي مستندات سابقة أو أسئلة تود الحصول على إجابات عنها",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Samma tjänster, på ditt eget språk",
        },
        {
          type: "paragraph",
          text: "Economy Codes AB erbjuder inte en separat tjänst för arabisktalande kunder, utan samma fullständiga redovisningstjänster som för alla våra kunder — med möjligheten att kommunicera på arabiska genom hela processen, från första kontakt till löpande samarbete.",
        },
        {
          type: "heading",
          level: 2,
          text: "Praktisk kunskap om det svenska systemet",
        },
        {
          type: "paragraph",
          text: "Många arabisktalande företagare är nya i det svenska systemet med myndigheter som Skatteverket och Bolagsverket. Vi hjälper dig att förstå vad som gäller, steg för steg och på det språk som känns tydligast för dig.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "The same services, in your own language",
        },
        {
          type: "paragraph",
          text: "Economy Codes AB doesn't offer a separate service for Arabic-speaking clients — you get the same full range of accounting services as all our clients, with the ability to communicate in Arabic throughout the process, from first contact to ongoing collaboration.",
        },
        {
          type: "heading",
          level: 2,
          text: "Practical knowledge of the Swedish system",
        },
        {
          type: "paragraph",
          text: "Many Arabic-speaking business owners are new to the Swedish system of authorities such as Skatteverket and Bolagsverket. We help you understand what applies, step by step, in whichever language is clearest for you.",
        },
      ],
      ar: [
        { type: "heading", level: 2, text: "الخدمات نفسها، بلغتك" },
        {
          type: "paragraph",
          text: "لا تقدّم Economy Codes AB خدمة منفصلة للعملاء الناطقين بالعربية، بل تقدّم مجموعة الخدمات المحاسبية الكاملة نفسها المتاحة لجميع عملائها، مع إمكانية التواصل باللغة العربية طوال العملية، من التواصل الأول وحتى التعاون المستمر.",
        },
        { type: "heading", level: 2, text: "معرفة عملية بالنظام السويدي" },
        {
          type: "paragraph",
          text: "كثير من أصحاب الأعمال الناطقين بالعربية جدد على النظام السويدي والجهات الرسمية مثل هيئة الضرائب (Skatteverket) ومكتب تسجيل الشركات (Bolagsverket). نساعدك على فهم ما ينطبق على وضعك خطوة بخطوة وباللغة الأوضح بالنسبة لك.",
        },
      ],
    },
    faqIds: ["faq-arabic-scope"],
    lastReviewed: LAST_REVIEWED,
  },
};

export const servicesList: Service[] = Object.values(services).sort(
  (a, b) => a.order - b.order,
);
