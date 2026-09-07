import type { ContentBlock, Localized } from "@/content/types";
import { INVESTMENT_DISCLAIMER } from "@/content/disclaimers";

export const body: Localized<ContentBlock[]> = {
  sv: [
    {
      type: "paragraph",
      text: "Sverige är öppet för utländska grundare som vill starta och driva aktiebolag, och registreringen i sig ställer inga krav på medborgarskap. Processen hanteras av Bolagsverket och Skatteverket, oavsett var grundaren kommer ifrån.",
    },
    { type: "heading", level: 2, text: "Vilken bolagsform ska jag välja?" },
    {
      type: "paragraph",
      text: "Valet mellan till exempel enskild firma, handelsbolag eller aktiebolag beror på din situation, verksamhet och riskbild. Ett aktiebolag ger ett tydligt avgränsat ansvar för ägarna men kräver mer formalia än en enskild firma. Vi går igenom dina förutsättningar tillsammans med dig innan du bestämmer dig.",
    },
    {
      type: "heading",
      level: 2,
      text: "Vad krävs för att registrera ett aktiebolag?",
    },
    {
      type: "paragraph",
      text: "Ett privat aktiebolag kräver bland annat ett aktiekapital enligt gällande lagkrav (kontakta oss eller Bolagsverket för det aktuella beloppet, eftersom kraven kan ändras över tid), en eller flera styrelseledamöter samt en bolagsordning som registreras hos Bolagsverket. Efter registrering behöver bolaget i regel också registrera sig hos Skatteverket för F-skatt och, i förekommande fall, moms och arbetsgivaravgifter.",
    },
    {
      type: "list",
      items: [
        "Aktiekapital enligt gällande lagkrav",
        "Bolagsordning och styrelse",
        "Registrering hos Bolagsverket",
        "Registrering hos Skatteverket (F-skatt, moms, arbetsgivare vid behov)",
      ],
    },
    { type: "heading", level: 2, text: "Handläggningstid" },
    {
      type: "paragraph",
      text: "Handläggningstiden bestäms av Bolagsverket och Skatteverket och kan variera beroende på bolagsform och hur komplett ansökan är. Vi hjälper dig att få underlaget så komplett som möjligt inför inlämning, vilket i regel gör processen snabbare.",
    },
    {
      type: "heading",
      level: 2,
      text: "Företagsregistrering är inte samma sak som uppehållstillstånd",
    },
    {
      type: "paragraph",
      text: "Att bilda eller etablera ett företag i Sverige är en separat process från migrationsärenden. Det innebär inget löfte om uppehållstillstånd, medborgarskap eller finansiering. Frågor om uppehållstillstånd hanteras av Migrationsverket.",
    },
    {
      type: "paragraph",
      text: "Funderar du på att registrera ett aktiebolag i Sverige? Kontakta oss så går vi igenom vad som gäller för just din situation.",
    },
    { type: "disclaimer", text: INVESTMENT_DISCLAIMER.sv },
  ],
  en: [
    {
      type: "paragraph",
      text: "Sweden is open to foreign founders who want to start and run a limited company (aktiebolag), and the registration itself doesn't require citizenship. The process is handled by Bolagsverket (the Companies Registration Office) and Skatteverket (the Tax Agency), regardless of where the founder is from.",
    },
    {
      type: "heading",
      level: 2,
      text: "Which company type should you choose?",
    },
    {
      type: "paragraph",
      text: "The choice between, for example, a sole trader business, a trading partnership, or a limited company depends on your situation, your business, and your risk profile. A limited company gives owners clearly limited liability but requires more formalities than a sole trader business. We go through your circumstances together with you before you decide.",
    },
    {
      type: "heading",
      level: 2,
      text: "What does registering a limited company require?",
    },
    {
      type: "paragraph",
      text: "A private limited company requires, among other things, share capital at the legally required minimum (contact us or Bolagsverket for the current amount, since requirements can change over time), one or more board members, and articles of association registered with Bolagsverket. After registration, the company generally also needs to register with Skatteverket for F-tax and, where relevant, VAT and employer contributions.",
    },
    {
      type: "list",
      items: [
        "Share capital at the legally required minimum",
        "Articles of association and a board",
        "Registration with Bolagsverket",
        "Registration with Skatteverket (F-tax, VAT, employer registration where relevant)",
      ],
    },
    { type: "heading", level: 2, text: "Processing time" },
    {
      type: "paragraph",
      text: "Processing time is set by Bolagsverket and Skatteverket and varies depending on the company type and how complete the application is. We help you get your documentation as complete as possible before submission, which generally speeds up the process.",
    },
    {
      type: "heading",
      level: 2,
      text: "Company registration is not the same as a residence permit",
    },
    {
      type: "paragraph",
      text: "Forming or establishing a company in Sweden is a separate process from immigration matters. It does not imply any promise of a residence permit, citizenship, or financing. Residence permit questions are handled by Migrationsverket.",
    },
    {
      type: "paragraph",
      text: "Thinking about registering a limited company in Sweden? Contact us and we'll go through what applies to your specific situation.",
    },
    { type: "disclaimer", text: INVESTMENT_DISCLAIMER.en },
  ],
  ar: [
    {
      type: "paragraph",
      text: "السويد مفتوحة أمام المؤسسين الأجانب الراغبين في تأسيس وإدارة شركة محدودة (aktiebolag)، ولا يشترط التسجيل نفسه حمل الجنسية السويدية. وتتولى كل من مكتب تسجيل الشركات (Bolagsverket) وهيئة الضرائب (Skatteverket) إدارة هذه العملية، بغض النظر عن بلد المؤسس.",
    },
    { type: "heading", level: 2, text: "أي نوع شركة عليك اختياره؟" },
    {
      type: "paragraph",
      text: "يعتمد الاختيار بين أشكال مثل المنشأة الفردية أو شركة التضامن أو الشركة المحدودة على وضعك ونشاطك ومستوى المخاطرة الذي تقبله. تمنح الشركة المحدودة أصحابها مسؤولية محدودة بوضوح، لكنها تتطلب إجراءات شكلية أكثر من المنشأة الفردية. نراجع معك ظروفك بالتفصيل قبل أن تقرر.",
    },
    { type: "heading", level: 2, text: "ما المطلوب لتسجيل شركة محدودة؟" },
    {
      type: "paragraph",
      text: "تتطلب الشركة المحدودة الخاصة، من بين أمور أخرى، رأس مال وفق الحد الأدنى الذي يحدده القانون (تواصل معنا أو مع Bolagsverket لمعرفة المبلغ الحالي، لأن المتطلبات قد تتغير بمرور الوقت)، وعضوًا واحدًا أو أكثر في مجلس الإدارة، ونظامًا أساسيًا يُسجَّل لدى Bolagsverket. وبعد التسجيل، تحتاج الشركة عادةً أيضًا إلى التسجيل لدى Skatteverket لضريبة F، وضريبة القيمة المضافة واشتراكات صاحب العمل عند الاقتضاء.",
    },
    {
      type: "list",
      items: [
        "رأس مال وفق الحد الأدنى الذي يحدده القانون",
        "نظام أساسي ومجلس إدارة",
        "التسجيل لدى Bolagsverket",
        "التسجيل لدى Skatteverket (ضريبة F، ضريبة القيمة المضافة، تسجيل صاحب العمل عند الاقتضاء)",
      ],
    },
    { type: "heading", level: 2, text: "مدة المعالجة" },
    {
      type: "paragraph",
      text: "تحدد كل من Bolagsverket وSkatteverket مدة المعالجة، وتختلف بحسب نوع الشركة ومدى اكتمال الطلب. نساعدك على جعل مستنداتك مكتملة قدر الإمكان قبل التقديم، ما يسرّع العملية عادةً.",
    },
    { type: "heading", level: 2, text: "تسجيل الشركة ليس تصريح إقامة" },
    {
      type: "paragraph",
      text: "يُعد تأسيس شركة أو إنشاؤها في السويد عملية منفصلة عن معاملات الهجرة. ولا يعني ذلك أي وعد بالحصول على تصريح إقامة أو الجنسية أو التمويل. وتتولى هيئة الهجرة السويدية (Migrationsverket) البتّ في مسائل تصاريح الإقامة.",
    },
    {
      type: "paragraph",
      text: "هل تفكر في تسجيل شركة محدودة في السويد؟ تواصل معنا وسنراجع معك ما ينطبق على وضعك الخاص.",
    },
    { type: "disclaimer", text: INVESTMENT_DISCLAIMER.ar },
  ],
};
