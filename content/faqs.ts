import type { Faq } from "./types";

export const faqs: Faq[] = [
  {
    id: "faq-global-what-is-authorized-firm",
    scope: "global",
    question: {
      sv: "Vad är en auktoriserad redovisningsbyrå?",
      en: "What is an authorized accounting firm?",
      ar: "ما هو مكتب المحاسبة المعتمد؟",
    },
    answer: {
      sv: "En auktoriserad redovisningsbyrå har godkänts av en branschorganisation, i vårt fall Srf konsulterna, efter att ha uppfyllt krav på utbildning, erfarenhet, försäkring och kvalitetskontroll. Economy Codes AB är en Srf Auktoriserad Redovisningsbyrå, och Hadi Al Maani är dessutom personligen auktoriserad redovisningskonsult och auktoriserad lönekonsult.",
      en: "An authorized accounting firm has been approved by an industry organization — in our case, Srf konsulterna — after meeting requirements for education, experience, insurance, and quality control. Economy Codes AB is an Srf Auktoriserad Redovisningsbyrå (Srf-authorized accounting firm), and Hadi Al Maani is also personally authorized as an accounting consultant and payroll consultant.",
      ar: "مكتب المحاسبة المعتمد هو مكتب حصل على موافقة هيئة مهنية متخصصة، وهي في حالتنا منظمة Srf konsulterna، بعد استيفائه لمتطلبات التعليم والخبرة والتأمين ومراقبة الجودة. وتُعد Economy Codes AB مكتب محاسبة معتمدًا من Srf، كما أن هادي المعاني معتمد شخصيًا كمستشار محاسبة ومستشار رواتب.",
    },
  },
  {
    id: "faq-global-why-hire-authorized",
    scope: "global",
    question: {
      sv: "Varför ska jag anlita en auktoriserad redovisningsbyrå?",
      en: "Why should I hire an authorized accounting firm?",
      ar: "لماذا يجب أن أستعين بمكتب محاسبة معتمد؟",
    },
    answer: {
      sv: "En auktoriserad byrå har genomgått extern kvalitetskontroll och måste följa branschens etiska regler och krav på fortlöpande kompetensutveckling. Det ger dig som kund en tydlig kvalitetsnivå att förhålla dig till, jämfört med att anlita någon utan oberoende granskning.",
      en: "An authorized firm has undergone external quality review and must follow the industry's code of ethics and requirements for continuing professional development. This gives you, as a customer, a clear quality benchmark to rely on, compared with hiring someone without independent oversight.",
      ar: "يخضع المكتب المعتمد لمراجعة جودة خارجية، ويجب عليه الالتزام بميثاق الأخلاقيات المهنية لهذا القطاع ومتطلبات التطوير المهني المستمر. وهذا يمنحك كعميل معيار جودة واضحًا يمكنك الاعتماد عليه، مقارنة بالاستعانة بجهة لا تخضع لأي رقابة مستقلة.",
    },
  },
  {
    id: "faq-global-consultant-vs-auditor",
    scope: "global",
    question: {
      sv: "Vad är skillnaden mellan en redovisningskonsult och en revisor?",
      en: "What's the difference between an accounting consultant and an auditor?",
      ar: "ما الفرق بين مستشار المحاسبة والمدقق؟",
    },
    answer: {
      sv: "En redovisningskonsult arbetar löpande med bokföring, lön, moms och rådgivning åt företaget. En revisor har en oberoende, granskande roll och uttalar sig i en revisionsberättelse om företagets årsredovisning. De flesta mindre aktiebolag i Sverige har inte revisionsplikt, men kan ändå ha nytta av en auktoriserad redovisningskonsult.",
      en: "An accounting consultant works on an ongoing basis with bookkeeping, payroll, VAT, and advisory support for a business. An auditor (revisor) holds an independent, reviewing role and issues an opinion on the company's annual accounts in an audit report. Most smaller Swedish limited companies aren't required to have an auditor, but can still benefit from an authorized accounting consultant.",
      ar: "يعمل مستشار المحاسبة بشكل مستمر على مسك الدفاتر والرواتب وضريبة القيمة المضافة وتقديم الاستشارات للشركة. أما المدقق (Revisor) فيتولى دورًا رقابيًا مستقلًا ويبدي رأيه في القوائم المالية السنوية للشركة ضمن تقرير تدقيق. ولا تخضع معظم الشركات المحدودة الصغيرة في السويد لإلزامية التدقيق، لكنها قد تستفيد رغم ذلك من مستشار محاسبة معتمد.",
    },
  },
  {
    id: "faq-global-nationwide",
    scope: "global",
    question: {
      sv: "Kan Economy Codes hjälpa företag i hela Sverige?",
      en: "Can Economy Codes help businesses across all of Sweden?",
      ar: "هل يمكن لـ Economy Codes مساعدة الشركات في جميع أنحاء السويد؟",
    },
    answer: {
      sv: "Ja. Vi arbetar digitalt med kunder i hela Sverige via säker filöverföring, telefon och video, oavsett var företaget är registrerat. Vi har också fysiska kontor i Mellerud och Trollhättan för dig som föredrar att träffas på plats.",
      en: "Yes. We work digitally with clients throughout Sweden using secure file sharing, phone, and video, regardless of where the company is registered. We also have physical offices in Mellerud and Trollhättan for clients who prefer to meet in person.",
      ar: "نعم. نعمل رقميًا مع العملاء في جميع أنحاء السويد عبر مشاركة ملفات آمنة والهاتف والفيديو، بغض النظر عن مكان تسجيل الشركة. ولدينا أيضًا مكاتب فعلية في ميلَّروود وتروللهاتان لمن يفضل اللقاء الشخصي.",
    },
  },
  {
    id: "faq-global-digital-bookkeeping",
    scope: "global",
    question: {
      sv: "Hur fungerar digital bokföring?",
      en: "How does digital bookkeeping work?",
      ar: "كيف تعمل المحاسبة الرقمية؟",
    },
    answer: {
      sv: "Du skickar in underlag som kvitton, fakturor och kontoutdrag digitalt, ofta via ett molnbaserat bokföringsprogram som Fortnox. Vi registrerar och stämmer av löpande, och du kan följa din ekonomi och kommunicera med oss utan att behöva besöka ett kontor.",
      en: "You submit documentation such as receipts, invoices, and bank statements digitally, often through a cloud-based bookkeeping platform such as Fortnox. We record and reconcile it on an ongoing basis, and you can follow your finances and reach us without needing to visit an office.",
      ar: "ترسل مستنداتك، مثل الإيصالات والفواتير وكشوف الحساب البنكي، إلكترونيًا، غالبًا عبر برنامج محاسبة سحابي مثل Fortnox. ونقوم بتسجيلها ومطابقتها بشكل مستمر، ويمكنك متابعة وضعك المالي والتواصل معنا دون الحاجة لزيارة مكتب.",
    },
  },
  {
    id: "faq-global-switch-firm",
    scope: "global",
    question: {
      sv: "Kan jag byta från min nuvarande redovisningsbyrå?",
      en: "Can I switch from my current accounting firm?",
      ar: "هل يمكنني الانتقال من مكتب المحاسبة الحالي الخاص بي؟",
    },
    answer: {
      sv: "Ja, det går bra. Vi hjälper dig att gå igenom vilket underlag som behöver överföras och ser till att övergången blir så smidig som möjligt, utan luckor i din löpande bokföring.",
      en: "Yes, that's no problem. We'll help you go through what documentation needs to be transferred and make sure the switch happens smoothly, without gaps in your ongoing bookkeeping.",
      ar: "نعم، لا مشكلة في ذلك. سنساعدك في تحديد المستندات التي يجب نقلها ونضمن أن يتم الانتقال بسلاسة، دون أي فجوات في محاسبتك المستمرة.",
    },
  },
  {
    id: "faq-global-company-types",
    scope: "global",
    question: {
      sv: "Vilka företagsformer hjälper Economy Codes?",
      en: "Which company types does Economy Codes help?",
      ar: "ما أشكال الشركات التي تساعدها Economy Codes؟",
    },
    answer: {
      sv: "Vi hjälper enskilda näringsidkare, aktiebolag, handelsbolag och ideella föreningar, samt utländska grundare som vill etablera verksamhet i Sverige.",
      en: "We help sole traders, limited companies, trading partnerships, and non-profit associations, as well as foreign founders establishing a business in Sweden.",
      ar: "نساعد المنشآت الفردية والشركات المحدودة وشركات التضامن والجمعيات غير الربحية، إضافة إلى المؤسسين الأجانب الراغبين في تأسيس نشاط تجاري في السويد.",
    },
  },
  {
    id: "faq-global-arabic-support",
    scope: "global",
    question: {
      sv: "Kan jag få redovisningshjälp på arabiska?",
      en: "Can I get accounting help in Arabic?",
      ar: "هل يمكنني الحصول على مساعدة محاسبية باللغة العربية؟",
    },
    answer: {
      sv: "Ja. Hadi Al Maani och Economy Codes kommunicerar på arabiska, utöver svenska och engelska, så att du kan beskriva din situation på det språk du är mest bekväm med.",
      en: "Yes. Hadi Al Maani and Economy Codes communicate in Arabic, in addition to Swedish and English, so you can describe your situation in the language you're most comfortable with.",
      ar: "نعم. يتواصل هادي المعاني وفريق Economy Codes باللغة العربية، إضافة إلى السويدية والإنجليزية، حتى تتمكن من شرح وضعك باللغة التي تشعر فيها بالراحة أكثر.",
    },
  },
  {
    id: "faq-global-fortnox",
    scope: "global",
    question: {
      sv: "Arbetar Economy Codes med Fortnox?",
      en: "Does Economy Codes work with Fortnox?",
      ar: "هل تعمل Economy Codes مع برنامج Fortnox؟",
    },
    answer: {
      sv: "Ja, vi arbetar löpande i Fortnox och kan hjälpa dig både med den löpande bokföringen där och med praktiska frågor kring hur programmet används.",
      en: "Yes, we work in Fortnox on an ongoing basis and can help you both with day-to-day bookkeeping there and with practical questions about how to use the software.",
      ar: "نعم، نعمل باستمرار على برنامج Fortnox ويمكننا مساعدتك في كل من المحاسبة اليومية عليه والمسائل العملية المتعلقة باستخدام البرنامج.",
    },
  },
  {
    id: "faq-global-getting-started",
    scope: "global",
    question: {
      sv: "Hur börjar jag samarbeta med Economy Codes?",
      en: "How do I get started working with Economy Codes?",
      ar: "كيف أبدأ التعاون مع Economy Codes؟",
    },
    answer: {
      sv: "Boka ett första samtal via kontaktformuläret eller ring oss direkt. Vi går igenom din situation och berättar konkret hur vi kan hjälpa dig vidare.",
      en: "Book a first consultation through the contact form or call us directly. We'll go through your situation and tell you concretely how we can help you move forward.",
      ar: "احجز استشارة أولى عبر نموذج التواصل أو اتصل بنا مباشرة. سنراجع وضعك ونوضح لك بشكل محدد كيف يمكننا مساعدتك في المضي قدمًا.",
    },
  },
  {
    id: "faq-bookkeeping-what",
    scope: { serviceKey: "bookkeeping" },
    question: {
      sv: "Vad innebär löpande bokföring i praktiken?",
      en: "What does ongoing bookkeeping actually involve?",
      ar: "ما الذي تعنيه المحاسبة المستمرة عمليًا؟",
    },
    answer: {
      sv: "Löpande bokföring innebär att företagets affärshändelser, till exempel fakturor, kvitton och betalningar, registreras och sorteras kontinuerligt så att du alltid har en aktuell bild av företagets ekonomi och kan uppfylla bokföringsskyldigheten enligt bokföringslagen.",
      en: "Ongoing bookkeeping means your company's transactions — invoices, receipts, and payments — are recorded and organised continuously, so you always have an up-to-date picture of your finances and meet the bookkeeping obligations set out in the Swedish Bookkeeping Act.",
      ar: "تعني المحاسبة المستمرة تسجيل وتنظيم معاملات شركتك — كالفواتير والإيصالات والمدفوعات — بشكل متواصل، بحيث تحصل دائمًا على صورة محدّثة لوضعك المالي وتفي بالتزامات المحاسبة المنصوص عليها في قانون المحاسبة السويدي.",
    },
  },
  {
    id: "faq-bookkeeping-software",
    scope: { serviceKey: "bookkeeping" },
    question: {
      sv: "Måste jag använda ett visst bokföringsprogram?",
      en: "Do I have to use a specific bookkeeping software?",
      ar: "هل يجب أن أستخدم برنامج محاسبة معينًا؟",
    },
    answer: {
      sv: "Vi anpassar oss i första hand efter vad som är praktiskt för dig. Hör av dig så går vi igenom vilka underlag och vilket arbetssätt som passar ditt företag bäst.",
      en: "We adapt to whatever is practical for you. Get in touch and we'll go through which documentation and working method suits your business best.",
      ar: "نتكيف في المقام الأول مع ما هو عملي بالنسبة لك. تواصل معنا وسنراجع معًا المستندات وطريقة العمل الأنسب لشركتك.",
    },
  },
  {
    id: "faq-tax-deadlines",
    scope: { serviceKey: "tax-reporting" },
    question: {
      sv: "Vad händer om jag missar en deklarationsdeadline?",
      en: "What happens if I miss a filing deadline?",
      ar: "ماذا يحدث إذا فاتني موعد تقديم الإقرار؟",
    },
    answer: {
      sv: "Skatteverket kan ta ut förseningsavgifter om en deklaration lämnas in för sent. Hör av dig i god tid innan en deadline så att vi tillsammans kan planera för att underlaget hinner bli klart.",
      en: "Skatteverket (the Swedish Tax Agency) can charge late fees if a return is filed after the deadline. Get in touch well ahead of a deadline so we can plan together and make sure your documentation is ready in time.",
      ar: "يمكن أن تفرض هيئة الضرائب السويدية (Skatteverket) رسوم تأخير إذا قُدّم الإقرار بعد الموعد المحدد. تواصل معنا قبل الموعد النهائي بوقت كافٍ حتى نخطط معًا لإنجاز المستندات في الوقت المناسب.",
    },
  },
  {
    id: "faq-tax-general",
    scope: { serviceKey: "tax-reporting" },
    question: {
      sv: "Ger ni skatterådgivning eller bara hjälp med deklarationen?",
      en: "Do you provide tax advice, or just help with filing?",
      ar: "هل تقدمون استشارات ضريبية أم مجرد مساعدة في تقديم الإقرار؟",
    },
    answer: {
      sv: "Omfattningen skiljer sig från fall till fall. Kontakta oss med din specifika fråga så berättar vi konkret vad vi kan hjälpa dig med i just ditt ärende.",
      en: "The scope varies case by case. Contact us with your specific question and we'll tell you concretely what we can help with in your situation.",
      ar: "يختلف نطاق الخدمة من حالة إلى أخرى. تواصل معنا بسؤالك المحدد وسنوضح لك بدقة ما يمكننا مساعدتك به في حالتك.",
    },
  },
  {
    id: "faq-registration-time",
    scope: { serviceKey: "business-registration" },
    question: {
      sv: "Hur lång tid tar en företagsregistrering?",
      en: "How long does registering a company take?",
      ar: "كم يستغرق تسجيل شركة؟",
    },
    answer: {
      sv: "Handläggningstiden bestäms av Bolagsverket och Skatteverket och kan variera beroende på bolagsform och hur komplett ansökan är. Vi hjälper dig att få underlaget så komplett som möjligt inför inlämning.",
      en: "Processing time is set by Bolagsverket (the Swedish Companies Registration Office) and Skatteverket, and varies depending on the company type and how complete the application is. We help you get your documentation as complete as possible before submission.",
      ar: "تحدد مدة المعالجة كل من مكتب تسجيل الشركات السويدي (Bolagsverket) وهيئة الضرائب (Skatteverket)، وتختلف بحسب نوع الشركة ومدى اكتمال الطلب. نساعدك على جعل مستنداتك مكتملة قدر الإمكان قبل التقديم.",
    },
  },
  {
    id: "faq-registration-form",
    scope: { serviceKey: "business-registration" },
    question: {
      sv: "Vilken bolagsform ska jag välja?",
      en: "Which company type should I choose?",
      ar: "أي نوع شركة ينبغي أن أختار؟",
    },
    answer: {
      sv: "Valet mellan till exempel enskild firma, handelsbolag eller aktiebolag beror på din situation, verksamhet och riskbild. Vi går igenom dina förutsättningar tillsammans med dig innan du bestämmer dig.",
      en: "The choice between, for example, a sole trader business, a trading partnership, or a limited company depends on your situation, your business, and your risk profile. We go through your circumstances together with you before you decide.",
      ar: "يعتمد الاختيار بين أشكال مثل المنشأة الفردية أو شركة التضامن أو الشركة المحدودة على وضعك ونشاطك ومستوى المخاطرة الذي تقبله. نراجع معك ظروفك بالتفصيل قبل أن تقرر.",
    },
  },
  {
    id: "faq-association-difference",
    scope: { serviceKey: "association-formation" },
    question: {
      sv: "Vad krävs för att bilda en ideell förening?",
      en: "What does it take to form a non-profit association?",
      ar: "ما المطلوب لتأسيس جمعية غير ربحية؟",
    },
    answer: {
      sv: "En ideell förening bildas normalt genom att medlemmar antar stadgar och väljer en styrelse vid ett konstituerande möte. Vi hjälper er att strukturera underlaget inför och under den processen.",
      en: "A non-profit association is normally formed when members adopt a set of bylaws and elect a board at a founding meeting. We help you structure the documentation before and during that process.",
      ar: "تُؤسَّس الجمعية غير الربحية عادةً عندما يعتمد الأعضاء نظامًا أساسيًا وينتخبون مجلس إدارة في اجتماع تأسيسي. نساعدكم على تنظيم المستندات قبل هذه العملية وأثناءها.",
    },
  },
  {
    id: "faq-budget-purpose",
    scope: { serviceKey: "feasibility-budget" },
    question: {
      sv: "Varför behöver jag en budget innan jag startar?",
      en: "Why do I need a budget before I start?",
      ar: "لماذا أحتاج إلى ميزانية قبل البدء؟",
    },
    answer: {
      sv: "En realistisk budget och en genomförbarhetsstudie hjälper dig att se om idén bär sig ekonomiskt innan du binder upp tid och kapital, och är ofta ett underlag som efterfrågas av banker, långivare eller andra parter.",
      en: "A realistic budget and feasibility study help you see whether the idea is financially viable before you commit time and capital, and is often the kind of documentation banks, lenders, or other parties will ask for.",
      ar: "تساعدك الميزانية الواقعية ودراسة الجدوى على معرفة ما إذا كانت الفكرة مجدية ماليًا قبل أن تلتزم بالوقت ورأس المال، وغالبًا ما تكون هذه المستندات مما تطلبه البنوك أو الجهات المُقرِضة أو أطراف أخرى.",
    },
  },
  {
    id: "faq-contracts-legal-advice",
    scope: { serviceKey: "contracts" },
    question: {
      sv: "Ger ni juridisk rådgivning om avtal?",
      en: "Do you provide legal advice on contracts?",
      ar: "هل تقدمون استشارات قانونية بخصوص العقود؟",
    },
    answer: {
      sv: "Omfattningen av vår hjälp med avtal och kontrakt varierar per ärende. Om ditt ärende kräver kvalificerad juridisk rådgivning eller representation hänvisar vi dig vid behov vidare till en jurist eller advokat.",
      en: "The scope of our help with agreements and contracts varies by case. If your matter requires qualified legal advice or representation, we'll refer you on to a lawyer or solicitor where needed.",
      ar: "يختلف نطاق مساعدتنا في الاتفاقيات والعقود بحسب الحالة. وإذا تطلبت حالتك استشارة قانونية متخصصة أو تمثيلًا قانونيًا، فسنحيلك عند الحاجة إلى محامٍ مختص.",
    },
  },
  {
    id: "faq-investment-guarantee",
    scope: { serviceKey: "investment-establishment" },
    question: {
      sv: "Innebär hjälp att etablera företag i Sverige att jag får uppehållstillstånd?",
      en: "Does help establishing a company in Sweden mean I'll get a residence permit?",
      ar: "هل تعني المساعدة في تأسيس شركة في السويد أنني سأحصل على تصريح إقامة؟",
    },
    answer: {
      sv: "Nej. Att bilda eller etablera ett företag i Sverige är en separat process från migrationsärenden och innebär inte i sig något löfte om uppehållstillstånd eller medborgarskap. Frågor som rör uppehållstillstånd hanteras av Migrationsverket.",
      en: "No. Forming or establishing a company in Sweden is a separate process from immigration matters and does not, on its own, imply any promise of a residence permit or citizenship. Residence permit questions are handled by Migrationsverket (the Swedish Migration Agency).",
      ar: "لا. تأسيس شركة أو إنشاؤها في السويد عملية منفصلة تمامًا عن معاملات الهجرة، ولا تعني في حد ذاتها أي وعد بالحصول على تصريح إقامة أو الجنسية. تتولى هيئة الهجرة السويدية (Migrationsverket) البتّ في مسائل تصاريح الإقامة.",
    },
  },
  {
    id: "faq-investment-scope",
    scope: { serviceKey: "investment-establishment" },
    question: {
      sv: "Vad ingår i hjälpen att etablera företag i Sverige?",
      en: "What's included in help establishing a company in Sweden?",
      ar: "ما الذي تتضمنه المساعدة في تأسيس شركة في السويد؟",
    },
    answer: {
      sv: "Det beror på ditt ärende — till exempel val av bolagsform, registrering och praktiska frågor kring uppstart. Kontakta oss så går vi igenom exakt vad som är relevant för dig.",
      en: "It depends on your situation — for example, choosing a company type, registration, and the practical questions around getting started. Contact us and we'll go through exactly what's relevant to you.",
      ar: "يعتمد ذلك على وضعك — مثل اختيار نوع الشركة والتسجيل والمسائل العملية المتعلقة ببدء النشاط. تواصل معنا وسنراجع معك بالتحديد ما يناسب حالتك.",
    },
  },
  {
    id: "faq-payroll-what",
    scope: { serviceKey: "payroll" },
    question: {
      sv: "Vad ingår i löneadministration?",
      en: "What does payroll administration involve?",
      ar: "ما الذي تتضمنه إدارة الرواتب؟",
    },
    answer: {
      sv: "Löneadministration innebär bland annat beräkning och utbetalning av lön, hantering av skatter och arbetsgivaravgifter samt arbetsgivardeklaration till Skatteverket.",
      en: "Payroll administration includes, among other things, calculating and paying salaries, handling taxes and employer contributions, and filing the employer tax return with Skatteverket.",
      ar: "تشمل إدارة الرواتب، من بين أمور أخرى، احتساب الرواتب وصرفها والتعامل مع الضرائب واشتراكات صاحب العمل وتقديم إقرار صاحب العمل إلى هيئة الضرائب.",
    },
  },
  {
    id: "faq-payroll-frequency",
    scope: { serviceKey: "payroll" },
    question: {
      sv: "Hur ofta behöver jag skicka in löneunderlag?",
      en: "How often do I need to send in payroll documentation?",
      ar: "كم مرة يجب أن أرسل مستندات الرواتب؟",
    },
    answer: {
      sv: "Det beror på hur ofta du betalar ut lön, oftast månadsvis. Vi kommer överens om en rutin som passar ditt företag.",
      en: "It depends on how often you pay salaries, usually monthly. We'll agree on a routine that suits your company.",
      ar: "يعتمد ذلك على وتيرة صرف الرواتب لديك، وغالبًا ما تكون شهرية. سنتفق على روتين يناسب شركتك.",
    },
  },
  {
    id: "faq-annual-closing-difference",
    scope: { serviceKey: "annual-closing" },
    question: {
      sv: "Vad är skillnaden mellan bokslut och årsredovisning?",
      en: "What's the difference between annual accounts and an annual report?",
      ar: "ما الفرق بين الحسابات الختامية والقوائم المالية السنوية؟",
    },
    answer: {
      sv: "Ett bokslut sammanställer räkenskapsåret internt, medan en årsredovisning är den formella handling som aktiebolag ska upprätta och i de flesta fall skicka in till Bolagsverket.",
      en: "Annual accounts compile the financial year internally, while an annual report is the formal document limited companies must prepare and, in most cases, submit to Bolagsverket.",
      ar: "تُجمّع الحسابات الختامية بيانات السنة المالية داخليًا، بينما تُعد القوائم المالية السنوية المستند الرسمي الذي يجب على الشركات المحدودة إعداده وتقديمه في معظم الحالات إلى مكتب تسجيل الشركات.",
    },
  },
  {
    id: "faq-annual-closing-timing",
    scope: { serviceKey: "annual-closing" },
    question: {
      sv: "När ska bokslutet vara klart?",
      en: "When does the closing need to be ready?",
      ar: "متى يجب أن يكون الإغلاق الحسابي جاهزًا؟",
    },
    answer: {
      sv: "Det styrs av ditt räkenskapsår och gällande lagkrav. Vi hjälper dig att planera i god tid så att bokslut och eventuell årsredovisning blir klara inom rätt tidsram.",
      en: "That's determined by your financial year and applicable legal requirements. We help you plan well in advance so the closing and any annual report are ready within the right timeframe.",
      ar: "يتحدد ذلك وفق سنتك المالية والمتطلبات القانونية المعمول بها. نساعدك على التخطيط مسبقًا بوقت كافٍ حتى يكون الإغلاق الحسابي وأي قوائم مالية سنوية جاهزة ضمن الإطار الزمني الصحيح.",
    },
  },
  {
    id: "faq-advisory-scope",
    scope: { serviceKey: "advisory" },
    question: {
      sv: "Vad kan jag få rådgivning om?",
      en: "What can I get advice on?",
      ar: "ما الذي يمكنني الحصول على استشارة بشأنه؟",
    },
    answer: {
      sv: "Till exempel lönsamhet, likviditet, prissättning och ekonomisk uppföljning av ditt företag. Vi utgår från din specifika situation snarare än generella råd.",
      en: "For example, profitability, cash flow, pricing, and ongoing financial follow-up of your business. We work from your specific situation rather than generic advice.",
      ar: "على سبيل المثال الربحية والسيولة والتسعير والمتابعة المالية لشركتك. ننطلق من وضعك الخاص وليس من نصائح عامة.",
    },
  },
  {
    id: "faq-advisory-difference",
    scope: { serviceKey: "advisory" },
    question: {
      sv: "Skiljer sig rådgivning från affärsplan och budget?",
      en: "Is advisory different from a business plan and budget?",
      ar: "هل تختلف الاستشارات المالية عن خطة العمل والميزانية؟",
    },
    answer: {
      sv: "Ja. Affärsplan och budget handlar om att lägga grunden inför start eller en enskild investering, medan ekonomisk rådgivning är löpande stöd för ett företag som redan är igång.",
      en: "Yes. A business plan and budget are about laying the groundwork before a launch or a single investment, while business advisory is ongoing support for a company that's already up and running.",
      ar: "نعم. تتعلق خطة العمل والميزانية بوضع الأساس قبل الانطلاق أو لاستثمار واحد، بينما تُعد الاستشارات المالية دعمًا مستمرًا لشركة قائمة بالفعل.",
    },
  },
  {
    id: "faq-correction-when",
    scope: { serviceKey: "bookkeeping-correction" },
    question: {
      sv: "När behöver jag rätta fel i bokföringen?",
      en: "When do I need to correct errors in my bookkeeping?",
      ar: "متى أحتاج إلى تصحيح أخطاء في محاسبتي؟",
    },
    answer: {
      sv: "Till exempel om du upptäcker felaktiga bokföringsposter, saknade verifikationer eller att bokföringen inte stämmer mot bank och kvitton. Vi går igenom vad som behöver korrigeras och hur.",
      en: "For example, if you discover incorrect bookkeeping entries, missing vouchers, or bookkeeping that doesn't match your bank and receipts. We review what needs correcting and how.",
      ar: "على سبيل المثال إذا اكتشفت قيودًا محاسبية خاطئة أو مستندات مفقودة أو محاسبة لا تتطابق مع كشوف البنك والإيصالات. نراجع ما يحتاج إلى تصحيح وكيفية ذلك.",
    },
  },
  {
    id: "faq-correction-consequence",
    scope: { serviceKey: "bookkeeping-correction" },
    question: {
      sv: "Kan felaktig bokföring få konsekvenser?",
      en: "Can incorrect bookkeeping have consequences?",
      ar: "هل يمكن أن يكون للمحاسبة الخاطئة عواقب؟",
    },
    answer: {
      sv: "Ja, det kan påverka både din egen överblick och underlag till Skatteverket. Ju tidigare fel upptäcks och rättas, desto enklare blir det vanligtvis.",
      en: "Yes, it can affect both your own overview and the documentation you submit to Skatteverket. The earlier errors are found and corrected, the easier it usually is.",
      ar: "نعم، يمكن أن يؤثر ذلك على رؤيتك الخاصة لوضعك وعلى المستندات المقدَّمة إلى هيئة الضرائب. وكلما اكتُشفت الأخطاء وصُححت مبكرًا، كان ذلك أسهل عادةً.",
    },
  },
  {
    id: "faq-fortnox-existing",
    scope: { serviceKey: "fortnox-support" },
    question: {
      sv: "Måste jag redan ha Fortnox för att få hjälp?",
      en: "Do I need to already have Fortnox to get help?",
      ar: "هل يجب أن أمتلك Fortnox بالفعل للحصول على المساعدة؟",
    },
    answer: {
      sv: "Nej. Vi hjälper både dig som redan använder Fortnox och dig som funderar på att börja använda det.",
      en: "No. We help both businesses already using Fortnox and those considering getting started with it.",
      ar: "لا. نساعد كلًا من الشركات التي تستخدم Fortnox بالفعل والراغبة في بدء استخدامه.",
    },
  },
  {
    id: "faq-fortnox-help",
    scope: { serviceKey: "fortnox-support" },
    question: {
      sv: "Vilken typ av hjälp kan jag få med Fortnox?",
      en: "What kind of help can I get with Fortnox?",
      ar: "ما نوع المساعدة التي يمكنني الحصول عليها في Fortnox؟",
    },
    answer: {
      sv: "Till exempel löpande bokföring i systemet, avstämningar och praktiska frågor om hur olika funktioner används.",
      en: "For example, ongoing bookkeeping in the system, reconciliations, and practical questions about how different features work.",
      ar: "على سبيل المثال المحاسبة المستمرة في النظام والمطابقات والمسائل العملية المتعلقة باستخدام مختلف الميزات.",
    },
  },
  {
    id: "faq-cardealer-vmb",
    scope: { serviceKey: "car-dealership-accounting" },
    question: {
      sv: "Vad är VMB och varför är det viktigt för bilhandlare?",
      en: "What is VMB, and why does it matter for car dealers?",
      ar: "ما هو نظام VMB ولماذا هو مهم لتجار السيارات؟",
    },
    answer: {
      sv: "VMB (vinstmarginalbeskattning) är en särskild momsmetod för handel med begagnade varor, bland annat bilar, där moms beräknas på vinstmarginalen i stället för hela försäljningspriset. Det ställer särskilda krav på bokföringen.",
      en: "VMB (profit margin taxation) is a special VAT method for trade in used goods, including cars, where VAT is calculated on the profit margin instead of the full sale price. It places particular demands on your bookkeeping.",
      ar: "نظام VMB (ضريبة هامش الربح) هو طريقة خاصة لاحتساب ضريبة القيمة المضافة على تجارة السلع المستعملة، بما فيها السيارات، حيث تُحتسب الضريبة على هامش الربح بدلًا من كامل سعر البيع. ويفرض ذلك متطلبات خاصة على المحاسبة.",
    },
  },
  {
    id: "faq-cardealer-who",
    scope: { serviceKey: "car-dealership-accounting" },
    question: {
      sv: "Vem passar tjänsten för?",
      en: "Who is this service for?",
      ar: "لمن تناسب هذه الخدمة؟",
    },
    answer: {
      sv: "Bilhandlare och andra som köper och säljer begagnade fordon och behöver bokföring som hanterar VMB korrekt.",
      en: "Car dealers and others buying and selling used vehicles who need bookkeeping that handles VMB correctly.",
      ar: "تجار السيارات وغيرهم ممن يشترون ويبيعون مركبات مستعملة ويحتاجون إلى محاسبة تتعامل مع نظام VMB بشكل صحيح.",
    },
  },
  {
    id: "faq-arabic-scope",
    scope: { serviceKey: "arabic-speaking-accounting" },
    question: {
      sv: "Vilka tjänster kan jag få på arabiska?",
      en: "Which services can I get in Arabic?",
      ar: "ما الخدمات التي يمكنني الحصول عليها باللغة العربية؟",
    },
    answer: {
      sv: "Samma tjänster som vi erbjuder på svenska och engelska — bokföring, lön, moms, bokslut, deklaration och rådgivning — men med möjlighet att kommunicera på arabiska genom hela processen.",
      en: "The same services we offer in Swedish and English — bookkeeping, payroll, VAT, annual accounts, tax returns, and advisory — but with the ability to communicate in Arabic throughout the process.",
      ar: "الخدمات نفسها التي نقدّمها بالسويدية والإنجليزية — مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية والاستشارات — مع إمكانية التواصل باللغة العربية طوال العملية.",
    },
  },
];
