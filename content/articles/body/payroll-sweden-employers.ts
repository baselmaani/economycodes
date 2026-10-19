import type { ContentBlock, Localized } from "@/content/types";
import { TAX_LEGAL_DISCLAIMER } from "@/content/disclaimers";

export const body: Localized<ContentBlock[]> = {
  sv: [
    {
      type: "paragraph",
      text: "Att betala ut lön i Sverige innebär mer än själva utbetalningen. Som arbetsgivare ska du vara registrerad hos Skatteverket, dra preliminärskatt från lönen, betala arbetsgivaravgifter och varje månad lämna en arbetsgivardeklaration med uppgifter för varje anställd.",
    },
    { type: "heading", level: 2, text: "Innan den första lönen" },
    {
      type: "list",
      items: [
        "Registrera företaget som arbetsgivare hos Skatteverket",
        "Ta reda på om ett kollektivavtal gäller för branschen eller arbetsplatsen",
        "Skriv anställningsavtal och samla in uppgifter som personnummer, skattetabell och bankkonto",
        "Bestäm löneperiod och utbetalningsdag",
      ],
    },
    { type: "heading", level: 2, text: "Varje lönekörning" },
    {
      type: "paragraph",
      text: "Bruttolönen beräknas utifrån avtalad lön, frånvaro, övertid och eventuella förmåner. Från den drar du preliminärskatt enligt den anställdes skattetabell, och ovanpå lönen betalar företaget arbetsgivaravgifter. Lönen och avdragen bokförs, och den anställde får en lönespecifikation.",
    },
    {
      type: "heading",
      level: 2,
      text: "Arbetsgivardeklaration varje månad",
    },
    {
      type: "paragraph",
      text: "Arbetsgivardeklarationen lämnas till Skatteverket varje månad och innehåller uppgifter på individnivå för varje anställd: utbetald lön, förmåner och avdragen skatt. Skatten och arbetsgivaravgifterna betalas in till skattekontot. Förseningsavgift kan tas ut om deklarationen kommer in för sent.",
    },
    {
      type: "heading",
      level: 2,
      text: "Semester, sjuklön och förmåner",
    },
    {
      type: "paragraph",
      text: "Enligt semesterlagen har anställda rätt till minst 25 semesterdagar per år, och semesterersättning ska hanteras korrekt. Arbetsgivaren betalar sjuklön under de första dagarna av en sjukperiod. Förmåner som bil eller kost är skattepliktiga och ska värderas och redovisas.",
    },
    {
      type: "heading",
      level: 2,
      text: "Lämna lönerna till en lönekonsult",
    },
    {
      type: "paragraph",
      text: "Många mindre företag låter en auktoriserad lönekonsult sköta lönerna, så att beräkningar, deklarationer och bokföring blir rätt varje månad. Hadi Al Maani på Economy Codes är auktoriserad lönekonsult och hjälper företag i hela Sverige — på svenska, engelska och arabiska.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.sv },
  ],
  en: [
    {
      type: "paragraph",
      text: "Paying salaries in Sweden involves more than the payment itself. As an employer you must be registered with Skatteverket (the Swedish Tax Agency), withhold preliminary income tax from salaries, pay employer contributions, and file an employer tax return every month with details for each employee.",
    },
    { type: "heading", level: 2, text: "Before the first payroll" },
    {
      type: "list",
      items: [
        "Register the company as an employer with Skatteverket",
        "Find out whether a collective agreement applies to your industry or workplace",
        "Sign employment contracts and collect details such as personal identity number, tax table and bank account",
        "Decide the pay period and payday",
      ],
    },
    { type: "heading", level: 2, text: "Every payroll run" },
    {
      type: "paragraph",
      text: "Gross pay is calculated from the agreed salary, absence, overtime and any benefits. Preliminary tax is withheld according to the employee's tax table, and the company pays employer contributions on top of the salary. The salary and deductions are recorded in the books, and the employee receives a payslip.",
    },
    {
      type: "heading",
      level: 2,
      text: "A monthly employer tax return",
    },
    {
      type: "paragraph",
      text: "The employer tax return (arbetsgivardeklaration) is filed with Skatteverket every month and contains individual-level details for each employee: salary paid, benefits and tax withheld. The tax and employer contributions are paid into the company's tax account. A late-filing fee can be charged if the return arrives late.",
    },
    {
      type: "heading",
      level: 2,
      text: "Holidays, sick pay and benefits",
    },
    {
      type: "paragraph",
      text: "Under the Swedish Annual Leave Act, employees are entitled to at least 25 days of paid holiday a year, and holiday pay must be handled correctly. The employer pays sick pay for the first days of a sick period. Benefits such as a company car or meals are taxable and must be valued and reported.",
    },
    {
      type: "heading",
      level: 2,
      text: "Handing payroll to a payroll consultant",
    },
    {
      type: "paragraph",
      text: "Many smaller businesses let an authorized payroll consultant run payroll, so calculations, returns and bookkeeping are right every month. Hadi Al Maani at Economy Codes is an authorized payroll consultant and helps businesses across Sweden — in Swedish, English and Arabic.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.en },
  ],
  ar: [
    {
      type: "paragraph",
      text: "صرف الرواتب في السويد يتجاوز عملية الدفع نفسها. فبصفتك صاحب عمل يجب أن تكون مسجلًا لدى هيئة الضرائب (Skatteverket)، وأن تقتطع ضريبة الدخل الأولية من الرواتب، وتدفع رسوم صاحب العمل، وتقدّم كل شهر إقرار صاحب العمل متضمنًا بيانات كل موظف.",
    },
    { type: "heading", level: 2, text: "قبل صرف أول راتب" },
    {
      type: "list",
      items: [
        "تسجيل الشركة كصاحب عمل لدى Skatteverket",
        "التحقق مما إذا كانت هناك اتفاقية جماعية تنطبق على قطاعك أو مكان عملك",
        "توقيع عقود العمل وجمع بيانات مثل الرقم الشخصي وجدول الضريبة والحساب البنكي",
        "تحديد فترة الراتب ويوم الصرف",
      ],
    },
    { type: "heading", level: 2, text: "في كل دورة رواتب" },
    {
      type: "paragraph",
      text: "يُحسب الراتب الإجمالي بناءً على الراتب المتفق عليه والغياب والعمل الإضافي وأي مزايا. وتُقتطع الضريبة الأولية وفق جدول الضريبة الخاص بالموظف، وتدفع الشركة رسوم صاحب العمل إضافة إلى الراتب. ثم يُسجَّل الراتب والاستقطاعات في الدفاتر، ويحصل الموظف على كشف راتب.",
    },
    {
      type: "heading",
      level: 2,
      text: "إقرار صاحب العمل الشهري",
    },
    {
      type: "paragraph",
      text: "يُقدَّم إقرار صاحب العمل (arbetsgivardeklaration) إلى Skatteverket كل شهر، ويتضمن بيانات فردية لكل موظف: الراتب المدفوع والمزايا والضريبة المقتطعة. وتُدفع الضريبة ورسوم صاحب العمل إلى الحساب الضريبي للشركة. وقد تُفرض رسوم تأخير إذا وصل الإقرار متأخرًا.",
    },
    {
      type: "heading",
      level: 2,
      text: "الإجازات والأجر المرضي والمزايا",
    },
    {
      type: "paragraph",
      text: "وفق قانون الإجازات السويدي، يحق للموظفين 25 يوم إجازة مدفوعة على الأقل سنويًا، ويجب احتساب بدل الإجازة بشكل صحيح. ويدفع صاحب العمل الأجر المرضي عن الأيام الأولى من فترة المرض. أما المزايا مثل سيارة الشركة أو الوجبات فهي خاضعة للضريبة ويجب تقييمها والإبلاغ عنها.",
    },
    {
      type: "heading",
      level: 2,
      text: "تسليم الرواتب إلى مستشار رواتب",
    },
    {
      type: "paragraph",
      text: "تُسند كثير من الشركات الصغيرة إدارة الرواتب إلى مستشار رواتب معتمد، لتكون الحسابات والإقرارات والقيود صحيحة كل شهر. هادي المعاني في Economy Codes مستشار رواتب معتمد ويساعد الشركات في جميع أنحاء السويد — بالعربية والسويدية والإنجليزية.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.ar },
  ],
};
