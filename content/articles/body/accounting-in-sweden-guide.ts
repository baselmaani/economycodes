import type { ContentBlock, Localized } from "@/content/types";
import { TAX_LEGAL_DISCLAIMER } from "@/content/disclaimers";

export const body: Localized<ContentBlock[]> = {
  sv: [
    {
      type: "paragraph",
      text: "Redovisning i Sverige innebär att alla företag ska bokföra sina affärshändelser löpande, spara underlaget, redovisa moms och arbetsgivaravgifter till Skatteverket och avsluta varje räkenskapsår med ett bokslut. Aktiebolag lämnar dessutom en årsredovisning till Bolagsverket. Exakt vad som gäller beror på bolagsform, storlek och om du har anställda.",
    },
    { type: "heading", level: 2, text: "Vilka regler styr redovisningen?" },
    {
      type: "paragraph",
      text: "Grunden är bokföringslagen, som säger att alla näringsidkare ska ha en ordnad bokföring och spara räkenskapsinformationen i sju år. Aktiebolag följer också årsredovisningslagen. Hur bokslut och årsredovisning ska upprättas styrs av Bokföringsnämndens regelverk, där mindre företag ofta kan välja det förenklade K2 och större företag tillämpar K3.",
    },
    {
      type: "heading",
      level: 2,
      text: "Det här behöver ett företag i Sverige göra",
    },
    {
      type: "list",
      items: [
        "Bokföra alla affärshändelser löpande, med en verifikation för varje händelse",
        "Lämna momsdeklaration månadsvis, kvartalsvis eller årsvis beroende på omsättning",
        "Lämna arbetsgivardeklaration varje månad om företaget betalar ut lön",
        "Upprätta bokslut när räkenskapsåret är slut",
        "Lämna inkomstdeklaration till Skatteverket en gång per år",
        "För aktiebolag: lämna årsredovisningen till Bolagsverket inom sju månader efter räkenskapsårets slut",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Enskild firma eller aktiebolag – vad är skillnaden?",
    },
    {
      type: "paragraph",
      text: "En enskild firma gör ett årsbokslut, och med en nettoomsättning som normalt understiger tre miljoner kronor räcker ofta ett förenklat årsbokslut. Ett aktiebolag gör alltid en årsredovisning som blir offentlig hos Bolagsverket. Mindre aktiebolag behöver inte alltid ha en revisor — det beror på bolagets storlek.",
    },
    {
      type: "heading",
      level: 2,
      text: "Redovisningskonsult, redovisningsbyrå eller revisor?",
    },
    {
      type: "paragraph",
      text: "En redovisningskonsult sköter bokföring, löner, deklarationer och bokslut åt företaget. En revisor granskar i stället redovisningen i efterhand och är oberoende av företaget. En auktoriserad redovisningsbyrå, som en Srf Auktoriserad Redovisningsbyrå, har genomgått krav på utbildning, erfarenhet och kvalitetskontroll.",
    },
    {
      type: "heading",
      level: 2,
      text: "Kan redovisningen skötas digitalt?",
    },
    {
      type: "paragraph",
      text: "Ja. De flesta företag i Sverige skickar i dag in kvitton, fakturor och kontoutdrag digitalt, ofta via ett molnbaserat program som Fortnox. Det gör att du kan anlita en redovisningsbyrå var som helst i landet. Economy Codes hjälper företag i hela Sverige digitalt och har kontor i Mellerud och Trollhättan — på svenska, engelska och arabiska.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.sv },
  ],
  en: [
    {
      type: "paragraph",
      text: "Accounting in Sweden means that every business must record its transactions on an ongoing basis, keep the supporting documents, report VAT and employer contributions to Skatteverket (the Swedish Tax Agency), and close each financial year with year-end accounts. Limited companies also file an annual report with Bolagsverket (the Swedish Companies Registration Office). Exactly what applies depends on your company type, its size and whether you have employees.",
    },
    {
      type: "heading",
      level: 2,
      text: "Which rules govern accounting in Sweden?",
    },
    {
      type: "paragraph",
      text: "The foundation is the Swedish Bookkeeping Act (bokföringslagen), which requires every business to keep orderly accounts and to retain its accounting records for seven years. Limited companies also follow the Annual Accounts Act (årsredovisningslagen). How year-end accounts are prepared is set by the Swedish Accounting Standards Board: smaller companies can often choose the simplified K2 framework, while larger companies apply K3.",
    },
    {
      type: "heading",
      level: 2,
      text: "What a business in Sweden needs to do",
    },
    {
      type: "list",
      items: [
        "Record every business transaction on an ongoing basis, with a voucher for each one",
        "File VAT returns monthly, quarterly or yearly depending on turnover",
        "File an employer tax return every month if the company pays salaries",
        "Prepare year-end accounts when the financial year ends",
        "File an income tax return with Skatteverket once a year",
        "For limited companies: file the annual report with Bolagsverket within seven months of the end of the financial year",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Sole trader or limited company — what's the difference?",
    },
    {
      type: "paragraph",
      text: "A sole trader (enskild firma) prepares year-end accounts, and with net turnover normally below three million kronor a simplified version is often enough. A limited company (aktiebolag) always prepares an annual report, which becomes public at Bolagsverket. Smaller limited companies don't always need an auditor — it depends on the company's size.",
    },
    {
      type: "heading",
      level: 2,
      text: "Accounting consultant, accounting firm or auditor?",
    },
    {
      type: "paragraph",
      text: "An accounting consultant handles bookkeeping, payroll, tax returns and year-end accounts for the business. An auditor, by contrast, reviews the accounts afterwards and is independent of the company. An authorized accounting firm, such as an Srf Auktoriserad Redovisningsbyrå, has met requirements for education, experience and quality control.",
    },
    {
      type: "heading",
      level: 2,
      text: "Can accounting be handled digitally?",
    },
    {
      type: "paragraph",
      text: "Yes. Most businesses in Sweden now send receipts, invoices and bank statements digitally, often through a cloud-based platform such as Fortnox. That means you can work with an accounting firm anywhere in the country. Economy Codes helps businesses across Sweden digitally and has offices in Mellerud and Trollhättan — in Swedish, English and Arabic.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.en },
  ],
  ar: [
    {
      type: "paragraph",
      text: "تعني المحاسبة في السويد أن على كل شركة تسجيل معاملاتها بشكل مستمر، وحفظ المستندات المؤيدة، والإبلاغ عن ضريبة القيمة المضافة ورسوم صاحب العمل إلى هيئة الضرائب (Skatteverket)، وإغلاق كل سنة مالية بحسابات ختامية. كما تقدّم الشركات المحدودة تقريرًا سنويًا إلى هيئة تسجيل الشركات (Bolagsverket). ويعتمد ما ينطبق عليك تحديدًا على شكل الشركة وحجمها ووجود موظفين لديك.",
    },
    {
      type: "heading",
      level: 2,
      text: "ما القواعد التي تنظّم المحاسبة في السويد؟",
    },
    {
      type: "paragraph",
      text: "الأساس هو قانون المحاسبة السويدي (bokföringslagen)، الذي يُلزم كل نشاط تجاري بمسك دفاتر منظمة وحفظ المعلومات المحاسبية لمدة سبع سنوات. وتلتزم الشركات المحدودة أيضًا بقانون القوائم المالية السنوية (årsredovisningslagen). وتحدد هيئة المعايير المحاسبية السويدية طريقة إعداد الحسابات الختامية، إذ يمكن للشركات الصغيرة غالبًا اختيار الإطار المبسّط K2، بينما تطبّق الشركات الأكبر إطار K3.",
    },
    {
      type: "heading",
      level: 2,
      text: "ما الذي يجب على الشركة في السويد القيام به",
    },
    {
      type: "list",
      items: [
        "تسجيل كل معاملة تجارية بشكل مستمر، مع مستند إثبات لكل معاملة",
        "تقديم إقرار ضريبة القيمة المضافة شهريًا أو ربع سنويًا أو سنويًا حسب حجم المبيعات",
        "تقديم إقرار صاحب العمل كل شهر إذا كانت الشركة تصرف رواتب",
        "إعداد الحسابات الختامية عند انتهاء السنة المالية",
        "تقديم إقرار ضريبة الدخل إلى Skatteverket مرة واحدة سنويًا",
        "بالنسبة للشركات المحدودة: تقديم التقرير السنوي إلى Bolagsverket خلال سبعة أشهر من نهاية السنة المالية",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "منشأة فردية أم شركة محدودة — ما الفرق؟",
    },
    {
      type: "paragraph",
      text: "تُعدّ المنشأة الفردية (enskild firma) حسابات ختامية سنوية، وإذا كان صافي المبيعات عادةً أقل من ثلاثة ملايين كرونة فغالبًا ما تكفي الحسابات الختامية المبسّطة. أما الشركة المحدودة (aktiebolag) فتُعدّ دائمًا تقريرًا سنويًا يصبح علنيًا لدى Bolagsverket. ولا تحتاج الشركات المحدودة الصغيرة دائمًا إلى مدقق حسابات — فذلك يعتمد على حجم الشركة.",
    },
    {
      type: "heading",
      level: 2,
      text: "مستشار محاسبة أم مكتب محاسبة أم مدقق حسابات؟",
    },
    {
      type: "paragraph",
      text: "يتولى مستشار المحاسبة مسك الدفاتر والرواتب والإقرارات الضريبية والحسابات الختامية للشركة. أما مدقق الحسابات فيراجع الحسابات لاحقًا ويكون مستقلًا عن الشركة. ومكتب المحاسبة المعتمد، مثل مكتب معتمد من Srf، قد استوفى متطلبات التعليم والخبرة ومراقبة الجودة.",
    },
    {
      type: "heading",
      level: 2,
      text: "هل يمكن إنجاز المحاسبة رقميًا؟",
    },
    {
      type: "paragraph",
      text: "نعم. ترسل معظم الشركات في السويد اليوم الإيصالات والفواتير وكشوف الحساب إلكترونيًا، غالبًا عبر برنامج سحابي مثل Fortnox، ما يعني أنه يمكنك التعامل مع مكتب محاسبة في أي مكان في البلاد. تساعد Economy Codes الشركات في جميع أنحاء السويد رقميًا، ولديها مكاتب في ميلَّروود وتروللهاتان — بالعربية والسويدية والإنجليزية.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.ar },
  ],
};
