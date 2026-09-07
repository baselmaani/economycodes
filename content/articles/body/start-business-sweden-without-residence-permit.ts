import type { ContentBlock, Localized } from "@/content/types";
import { INVESTMENT_DISCLAIMER } from "@/content/disclaimers";

export const body: Localized<ContentBlock[]> = {
  sv: [
    {
      type: "paragraph",
      text: "En vanlig fråga från utländska entreprenörer är om det går att starta eller etablera ett företag i Sverige utan att redan ha uppehållstillstånd. Kort svar: registrering av ett företag och ansökan om uppehållstillstånd är två helt separata processer, som hanteras av olika myndigheter.",
    },
    { type: "heading", level: 2, text: "Vem hanterar vad?" },
    {
      type: "list",
      items: [
        "Bolagsverket registrerar företaget och dess bolagsform",
        "Skatteverket hanterar F-skatt, moms och andra skattefrågor",
        "Migrationsverket hanterar frågor om uppehållstillstånd",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Innebär etablering av företag att jag får uppehållstillstånd?",
    },
    {
      type: "paragraph",
      text: "Nej. Att bilda eller etablera ett företag i Sverige är en separat process från migrationsärenden och innebär inte i sig något löfte om uppehållstillstånd eller medborgarskap. Om din situation även rör uppehållstillstånd behöver den frågan hanteras separat, direkt med Migrationsverket.",
    },
    { type: "heading", level: 2, text: "Vad kan vi hjälpa dig med?" },
    {
      type: "paragraph",
      text: "Vår hjälp gäller den företagsekonomiska och administrativa sidan av att starta och driva verksamhet i Sverige — till exempel val av bolagsform, registrering och praktiska frågor kring uppstart. Vi hjälper både svensktalande och arabisktalande grundare, och vi går igenom exakt vad som är relevant för just din situation.",
    },
    {
      type: "paragraph",
      text: "Funderar du på att starta företag i Sverige och vill förstå vad som faktiskt krävs? Kontakta oss så reder vi ut vad som gäller för dig.",
    },
    { type: "disclaimer", text: INVESTMENT_DISCLAIMER.sv },
  ],
  en: [
    {
      type: "paragraph",
      text: "A common question from foreign entrepreneurs is whether it's possible to start or establish a business in Sweden without already holding a residence permit. Short answer: registering a company and applying for a residence permit are two entirely separate processes, handled by different authorities.",
    },
    { type: "heading", level: 2, text: "Who handles what?" },
    {
      type: "list",
      items: [
        "Bolagsverket registers the company and its company type",
        "Skatteverket handles F-tax, VAT, and other tax matters",
        "Migrationsverket handles residence permit questions",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "Does establishing a company mean I'll get a residence permit?",
    },
    {
      type: "paragraph",
      text: "No. Forming or establishing a company in Sweden is a separate process from immigration matters and does not, on its own, imply any promise of a residence permit or citizenship. If your situation also involves a residence permit, that question needs to be handled separately, directly with Migrationsverket.",
    },
    { type: "heading", level: 2, text: "What can we help with?" },
    {
      type: "paragraph",
      text: "Our help covers the business and administrative side of starting and running a company in Sweden — for example choosing a company type, registration, and the practical questions around getting started. We help both Swedish- and Arabic-speaking founders, and we go through exactly what's relevant to your specific situation.",
    },
    {
      type: "paragraph",
      text: "Thinking about starting a business in Sweden and want to understand what's actually required? Contact us and we'll clarify what applies to you.",
    },
    { type: "disclaimer", text: INVESTMENT_DISCLAIMER.en },
  ],
  ar: [
    {
      type: "paragraph",
      text: "من الأسئلة الشائعة لدى رواد الأعمال الأجانب هو ما إذا كان بالإمكان تأسيس شركة أو إنشاؤها في السويد دون امتلاك تصريح إقامة مسبقًا. والإجابة المختصرة: تسجيل الشركة والتقدم بطلب تصريح الإقامة عمليتان منفصلتان تمامًا، تتولاهما جهتان مختلفتان.",
    },
    { type: "heading", level: 2, text: "من يتولى ماذا؟" },
    {
      type: "list",
      items: [
        "Bolagsverket يسجل الشركة ونوعها",
        "Skatteverket يتولى ضريبة F وضريبة القيمة المضافة وسائر المسائل الضريبية",
        "Migrationsverket يتولى مسائل تصاريح الإقامة",
      ],
    },
    {
      type: "heading",
      level: 2,
      text: "هل يعني تأسيس شركة أنني سأحصل على تصريح إقامة؟",
    },
    {
      type: "paragraph",
      text: "لا. تأسيس شركة أو إنشاؤها في السويد عملية منفصلة تمامًا عن معاملات الهجرة، ولا تعني في حد ذاتها أي وعد بالحصول على تصريح إقامة أو الجنسية. وإذا كان وضعك يتعلق أيضًا بتصريح الإقامة، فيجب معالجة تلك المسألة بشكل منفصل، مباشرة مع هيئة الهجرة السويدية (Migrationsverket).",
    },
    { type: "heading", level: 2, text: "بماذا يمكننا مساعدتك؟" },
    {
      type: "paragraph",
      text: "تغطي مساعدتنا الجانب التجاري والإداري لتأسيس شركة وإدارتها في السويد — مثل اختيار نوع الشركة والتسجيل والمسائل العملية المتعلقة ببدء النشاط. نساعد المؤسسين الناطقين بالسويدية والعربية على حد سواء، ونراجع معك بالتحديد ما يخص وضعك.",
    },
    {
      type: "paragraph",
      text: "هل تفكر في تأسيس شركة في السويد وتريد فهم ما هو مطلوب فعليًا؟ تواصل معنا وسنوضح لك ما ينطبق على حالتك.",
    },
    { type: "disclaimer", text: INVESTMENT_DISCLAIMER.ar },
  ],
};
