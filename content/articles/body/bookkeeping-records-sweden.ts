import type { ContentBlock, Localized } from "@/content/types";
import { TAX_LEGAL_DISCLAIMER } from "@/content/disclaimers";

export const body: Localized<ContentBlock[]> = {
  sv: [
    {
      type: "paragraph",
      text: "Som företagare i Sverige är du bokföringsskyldig enligt bokföringslagen, oavsett om du driver enskild firma, handelsbolag eller aktiebolag. Det innebär att du löpande behöver registrera och spara underlag för företagets affärshändelser — inte bara vid deklarationstillfället, utan under hela året.",
    },
    {
      type: "heading",
      level: 2,
      text: "Vilka underlag räknas som verifikationer?",
    },
    {
      type: "paragraph",
      text: "En verifikation är det underlag som styrker en affärshändelse, till exempel en faktura, ett kvitto, ett kontoutdrag eller ett kvitto på en betalning. Varje registrerad post i bokföringen ska kunna kopplas till en verifikation, så att det går att följa och förstå affärshändelsen i efterhand.",
    },
    {
      type: "list",
      items: [
        "Kund- och leverantörsfakturor",
        "Kvitton för inköp och utlägg",
        "Kontoutdrag och betalningsbekräftelser",
        "Lönespecifikationer, om du har anställda",
        "Avtal som ligger till grund för större affärshändelser",
      ],
    },
    { type: "heading", level: 2, text: "Digital eller fysisk lagring?" },
    {
      type: "paragraph",
      text: "De flesta företag i Sverige sköter i dag sin löpande bokföring digitalt, ofta via ett molnbaserat program som Fortnox. Du skickar in underlag digitalt, vi registrerar och stämmer av löpande, och du kan följa din ekonomi utan att behöva besöka ett kontor.",
    },
    { type: "heading", level: 2, text: "Vad händer om underlag saknas?" },
    {
      type: "paragraph",
      text: "Om du upptäcker att verifikationer saknas, eller att bokföringen inte stämmer mot bank och kvitton, är det bättre att rätta till det tidigt än att vänta. Ju tidigare fel eller luckor upptäcks och åtgärdas, desto enklare blir det vanligtvis att få bokföringen komplett igen.",
    },
    {
      type: "paragraph",
      text: "Är du osäker på vilka underlag just ditt företag behöver spara, eller vill du få hjälp att strukturera den löpande bokföringen? Kontakta oss så går vi igenom din specifika situation.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.sv },
  ],
  en: [
    {
      type: "paragraph",
      text: "As a business owner in Sweden, you're required to keep books under the Swedish Bookkeeping Act (bokföringslagen), whether you run a sole trader business, a trading partnership, or a limited company. That means recording and keeping supporting documents for your business's transactions on an ongoing basis — not just when it's time to file, but throughout the year.",
    },
    { type: "heading", level: 2, text: "What counts as a voucher?" },
    {
      type: "paragraph",
      text: "A voucher (verifikation) is the document that supports a transaction — for example an invoice, a receipt, a bank statement, or proof of payment. Every entry recorded in your bookkeeping should be traceable back to a voucher, so the transaction can be followed and understood afterwards.",
    },
    {
      type: "list",
      items: [
        "Customer and supplier invoices",
        "Receipts for purchases and expenses",
        "Bank statements and payment confirmations",
        "Payslips, if you have employees",
        "Contracts underlying larger transactions",
      ],
    },
    { type: "heading", level: 2, text: "Digital or physical storage?" },
    {
      type: "paragraph",
      text: "Most businesses in Sweden today handle their ongoing bookkeeping digitally, often through a cloud-based platform such as Fortnox. You submit documentation digitally, we record and reconcile it on an ongoing basis, and you can follow your finances without needing to visit an office.",
    },
    {
      type: "heading",
      level: 2,
      text: "What happens if documentation is missing?",
    },
    {
      type: "paragraph",
      text: "If you discover that vouchers are missing, or that your bookkeeping doesn't match your bank and receipts, it's better to correct it early than to wait. The earlier gaps or errors are found and addressed, the easier it usually is to get your bookkeeping complete again.",
    },
    {
      type: "paragraph",
      text: "Not sure which records your business needs to keep, or want help structuring your ongoing bookkeeping? Contact us and we'll go through your specific situation.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.en },
  ],
  ar: [
    {
      type: "paragraph",
      text: "بصفتك صاحب عمل في السويد، أنت ملزم بمسك الدفاتر وفق قانون المحاسبة السويدي (bokföringslagen)، سواء كنت تدير منشأة فردية أو شركة تضامن أو شركة محدودة. ويعني ذلك تسجيل وحفظ مستندات معاملات شركتك بشكل مستمر — ليس فقط عند موعد تقديم الإقرار، بل على مدار العام.",
    },
    {
      type: "heading",
      level: 2,
      text: "ما الذي يُعد مستند إثبات (verifikation)؟",
    },
    {
      type: "paragraph",
      text: "مستند الإثبات هو الوثيقة التي تدعم معاملة تجارية، مثل الفاتورة أو الإيصال أو كشف الحساب البنكي أو إثبات الدفع. ويجب أن يكون بالإمكان ربط كل قيد مُسجَّل في المحاسبة بمستند إثبات، بحيث يمكن تتبع المعاملة وفهمها لاحقًا.",
    },
    {
      type: "list",
      items: [
        "فواتير العملاء والموردين",
        "إيصالات المشتريات والنفقات",
        "كشوف الحساب البنكي وتأكيدات الدفع",
        "كشوف الرواتب، في حال وجود موظفين",
        "العقود التي تستند إليها المعاملات الكبرى",
      ],
    },
    { type: "heading", level: 2, text: "حفظ رقمي أم ورقي؟" },
    {
      type: "paragraph",
      text: "تدير معظم الشركات في السويد اليوم محاسبتها المستمرة رقميًا، غالبًا عبر برنامج سحابي مثل Fortnox. ترسل مستنداتك إلكترونيًا، ونقوم بتسجيلها ومطابقتها باستمرار، ويمكنك متابعة وضعك المالي دون الحاجة لزيارة مكتب.",
    },
    { type: "heading", level: 2, text: "ماذا يحدث في حال وجود مستندات ناقصة؟" },
    {
      type: "paragraph",
      text: "إذا اكتشفت أن بعض مستندات الإثبات مفقودة، أو أن محاسبتك لا تتطابق مع كشوف البنك والإيصالات، فمن الأفضل تصحيح ذلك مبكرًا بدلًا من الانتظار. وكلما اكتُشفت الفجوات أو الأخطاء وعولجت مبكرًا، كان استكمال المحاسبة أسهل عادةً.",
    },
    {
      type: "paragraph",
      text: "هل لديك شك حول المستندات التي يجب أن تحفظها شركتك تحديدًا، أو ترغب في مساعدة لتنظيم محاسبتك المستمرة؟ تواصل معنا وسنراجع وضعك الخاص.",
    },
    { type: "disclaimer", text: TAX_LEGAL_DISCLAIMER.ar },
  ],
};
