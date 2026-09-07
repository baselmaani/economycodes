import type { ContentBlock, Localized } from "@/content/types";
import { TAX_LEGAL_DISCLAIMER } from "@/content/disclaimers";

export const body: Localized<ContentBlock[]> = {
  sv: [
    {
      type: "paragraph",
      text: "Företag i Sverige har flera återkommande skyldigheter gentemot Skatteverket, oavsett bolagsform. Vilka som gäller för just ditt företag beror bland annat på om du har anställda, är momsregistrerad och vilken redovisningsperiod du har.",
    },
    { type: "heading", level: 2, text: "Vanliga återkommande deklarationer" },
    {
      type: "list",
      items: [
        "Momsdeklaration, för momsregistrerade företag",
        "Arbetsgivardeklaration, om du har anställda och betalar ut lön",
        "Inkomstdeklaration, en gång per år",
        "Bokslut och, för aktiebolag, årsredovisning till Bolagsverket",
      ],
    },
    {
      type: "paragraph",
      text: "Hur ofta och när respektive deklaration ska lämnas beror på ditt företags specifika förutsättningar. Vi går igenom vad som gäller för dig och sätter upp en rutin så att inget missas.",
    },
    {
      type: "heading",
      level: 2,
      text: "Vad händer om jag missar en deadline?",
    },
    {
      type: "paragraph",
      text: "Skatteverket kan ta ut förseningsavgifter om en deklaration lämnas in för sent. Hör av dig i god tid innan en deadline så att vi tillsammans kan planera för att underlaget hinner bli klart — det är alltid enklare att förebygga en försening än att hantera den i efterhand.",
    },
    {
      type: "heading",
      level: 2,
      text: "Rådgivning eller bara hjälp med deklarationen?",
    },
    {
      type: "paragraph",
      text: "Omfattningen av vår hjälp skiljer sig från fall till fall — vissa kunder vill enbart ha hjälp med själva inlämningen, andra vill ha löpande rådgivning kring sin skattesituation. Kontakta oss med din specifika fråga så berättar vi konkret vad vi kan hjälpa dig med.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.sv },
  ],
  en: [
    {
      type: "paragraph",
      text: "Businesses in Sweden have several recurring obligations toward Skatteverket, regardless of company type. Which ones apply to your business depends on factors such as whether you have employees, are VAT-registered, and which reporting period you use.",
    },
    { type: "heading", level: 2, text: "Common recurring filings" },
    {
      type: "list",
      items: [
        "VAT return, for VAT-registered businesses",
        "Employer tax return, if you have employees and pay salaries",
        "Income tax return, once a year",
        "Annual accounts and, for limited companies, an annual report to Bolagsverket",
      ],
    },
    {
      type: "paragraph",
      text: "How often and when each filing is due depends on your business's specific circumstances. We go through what applies to you and set up a routine so nothing gets missed.",
    },
    { type: "heading", level: 2, text: "What happens if you miss a deadline?" },
    {
      type: "paragraph",
      text: "Skatteverket can charge late fees if a return is filed after the deadline. Get in touch well ahead of a deadline so we can plan together and make sure your documentation is ready in time — it's always easier to prevent a delay than to deal with one after the fact.",
    },
    { type: "heading", level: 2, text: "Advice, or just help with filing?" },
    {
      type: "paragraph",
      text: "The scope of our help varies by client — some only want help with the filing itself, others want ongoing advice on their tax situation. Contact us with your specific question and we'll tell you concretely what we can help with.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.en },
  ],
  ar: [
    {
      type: "paragraph",
      text: "تقع على عاتق الشركات في السويد عدة التزامات متكررة تجاه هيئة الضرائب (Skatteverket)، بصرف النظر عن شكل الشركة. وتعتمد الالتزامات المحددة التي تخص شركتك على عوامل مثل وجود موظفين لديك، وتسجيلك في ضريبة القيمة المضافة، والفترة المحاسبية المعتمدة لديك.",
    },
    { type: "heading", level: 2, text: "الإقرارات المتكررة الشائعة" },
    {
      type: "list",
      items: [
        "إقرار ضريبة القيمة المضافة، للشركات المسجلة فيها",
        "إقرار صاحب العمل، في حال وجود موظفين وصرف رواتب",
        "إقرار ضريبة الدخل، مرة واحدة سنويًا",
        "الحسابات الختامية، وبالنسبة للشركات المحدودة، القوائم المالية السنوية المقدَّمة إلى Bolagsverket",
      ],
    },
    {
      type: "paragraph",
      text: "يعتمد عدد مرات تقديم كل إقرار وموعده على ظروف شركتك الخاصة. نراجع معك ما ينطبق عليك ونضع روتينًا يضمن عدم إغفال أي موعد.",
    },
    { type: "heading", level: 2, text: "ماذا يحدث إذا فاتك موعد نهائي؟" },
    {
      type: "paragraph",
      text: "يمكن أن تفرض هيئة الضرائب رسوم تأخير إذا قُدّم الإقرار بعد الموعد المحدد. تواصل معنا قبل الموعد النهائي بوقت كافٍ حتى نخطط معًا لإنجاز المستندات في الوقت المناسب — فمنع التأخير دائمًا أسهل من معالجته لاحقًا.",
    },
    { type: "heading", level: 2, text: "استشارة أم مجرد مساعدة في التقديم؟" },
    {
      type: "paragraph",
      text: "يختلف نطاق مساعدتنا من عميل إلى آخر — يريد بعض العملاء المساعدة في عملية التقديم فقط، بينما يرغب آخرون في استشارات مستمرة بشأن وضعهم الضريبي. تواصل معنا بسؤالك المحدد وسنوضح لك بدقة ما يمكننا مساعدتك به.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.ar },
  ],
};
