import type { Locale, Localized } from "./types";
import { SOFTWARE_SHOT_IDS, type SoftwareShotId } from "./software-shot-ids";
import sizes from "./software-screenshots.json";

export { SOFTWARE_SHOT_IDS, type SoftwareShotId };

/**
 * Screens from the Economy Codes app, captured with the fictional demo company
 * "Demo Installation AB" (scripts/capture-app-screenshots.ts). Each locale has
 * its own capture in the app's matching language.
 */
export const softwareShotAlt: Record<SoftwareShotId, Localized<string>> = {
  dashboard: {
    sv: "Översikten i Economy Codes: en förfallen faktura att åtgärda, total intäkt, kassaflöde och åldersanalys av kundfordringar.",
    en: "The Economy Codes overview: one overdue invoice to deal with, total revenue, cash flow and an ageing analysis of receivables.",
    ar: "نظرة عامة في Economy Codes: فاتورة متأخرة تحتاج إلى متابعة، وإجمالي الإيرادات، والتدفق النقدي، وتحليل أعمار الذمم.",
  },
  "invoice-edit": {
    sv: "En faktura till Brf Solgläntan under arbete, med kund, fakturadatum, förfallodatum och knapparna Skapa faktura och Spara utkast.",
    en: "An invoice to Brf Solgläntan in progress, with customer, invoice date, due date and the buttons to create or save it as a draft.",
    ar: "فاتورة قيد الإعداد إلى Brf Solgläntan، مع العميل وتاريخ الفاتورة وتاريخ الاستحقاق وأزرار الإنشاء والحفظ كمسودة.",
  },
  "invoice-list": {
    sv: "Listan Kundfakturor med förfallodatum och status per faktura: utkast, skickad, betald och en förfallen faktura.",
    en: "The customer invoice list with each invoice's due date and status: draft, sent, paid and one overdue invoice.",
    ar: "قائمة فواتير العملاء مع تاريخ استحقاق كل فاتورة وحالتها: مسودة ومرسلة ومدفوعة وفاتورة متأخرة.",
  },
  "invoice-paid": {
    sv: "Faktura 2 med statusen Betald. Kvar att betala är 0,00 kr och fakturan är kopplad till projektet P-104.",
    en: "Invoice 2 with the status Paid. Nothing is left to pay and the invoice is linked to project P-104.",
    ar: "الفاتورة 2 بحالة مدفوعة. لا يتبقى شيء للدفع والفاتورة مرتبطة بالمشروع P-104.",
  },
  "invoice-rot": {
    sv: "Uppgifter om arbetet för en ROT-faktura: fastighetsbeteckning, 16 timmar VVS-arbete och 4 timmar elarbete.",
    en: "Work details for a ROT invoice: property designation, 16 hours of plumbing work and 4 hours of electrical work.",
    ar: "بيانات العمل لفاتورة ROT: رقم العقار و16 ساعة أعمال سباكة و4 ساعات أعمال كهربائية.",
  },
  "supplier-invoice": {
    sv: "Leverantörsfaktura 881907 från Rör & Värme Grossist AB, bokförd på konto 4010 och kopplad till projekt P-104, med förfallodatum och obetalt belopp.",
    en: "Supplier invoice 881907 from Rör & Värme Grossist AB, booked to account 4010 and linked to project P-104, with due date and unpaid amount.",
    ar: "فاتورة المورد 881907 من Rör & Värme Grossist AB، مقيدة على الحساب 4010 ومرتبطة بالمشروع P-104، مع تاريخ الاستحقاق والمبلغ غير المدفوع.",
  },
  underlag: {
    sv: "Sidan Underlag med kvitton, fakturor och lönebesked. Ett kvitto är ännu inte kopplat till någon verifikation.",
    en: "The documents page with receipts, invoices and payslips. One receipt is not yet linked to a voucher.",
    ar: "صفحة المستندات مع الإيصالات والفواتير وقسائم الرواتب. إيصال واحد لم يُربط بعد بأي قيد.",
  },
  voucher: {
    sv: "Verifikation A1 för drivmedel: 800 kr på konto 5611, 200 kr ingående moms och 1 000 kr från företagskontot, med kvittot som underlag.",
    en: "Voucher A1 for fuel: 800 kr on account 5611, 200 kr input VAT and 1,000 kr from the business account, with the receipt attached.",
    ar: "القيد A1 للوقود: 800 كرونة على الحساب 5611 و200 كرونة ضريبة مدخلات و1000 كرونة من حساب الشركة، مع الإيصال مرفقًا.",
  },
  ledger: {
    sv: "Huvudboken under Kontoanalys, med konto 1510 Kundfordringar och de verifikationer som påverkat saldot.",
    en: "The general ledger under account analysis, showing account 1510 Accounts receivable and the vouchers behind its balance.",
    ar: "دفتر الأستاذ العام ضمن تحليل الحسابات، ويعرض الحساب 1510 الذمم المدينة والقيود المؤثرة في رصيده.",
  },
  sie: {
    sv: "Sidan SIE – import och export av bokföringsdata, med export av ett räkenskapsår och import av en SIE-fil.",
    en: "The SIE import and export page, with export of a fiscal year and import of an SIE file.",
    ar: "صفحة استيراد وتصدير SIE، مع تصدير سنة مالية واستيراد ملف SIE.",
  },
  payslips: {
    sv: "Lönekörningen med lönebesked för två anställda: oktober betald och november godkänd och klar att skicka.",
    en: "Salary runs with payslips for two employees: October paid and November approved and ready to send.",
    ar: "مسيرات الرواتب مع قسائم لموظفَين: أكتوبر مدفوع ونوفمبر معتمد وجاهز للإرسال.",
  },
  project: {
    sv: "Projektet P-104 Värmepumpsbyte Brf Solgläntan med bokförda intäkter och kostnader mot budget samt fakturerat och betalt.",
    en: "Project P-104 heat pump replacement for Brf Solgläntan, with booked revenue and costs against budget, and invoiced and paid amounts.",
    ar: "المشروع P-104 لاستبدال مضخة حرارية لـ Brf Solgläntan، مع الإيرادات والتكاليف المقيدة مقابل الميزانية والمبالغ المفوترة والمدفوعة.",
  },
};

export interface SoftwareShot {
  id: SoftwareShotId;
  src: string;
  /** Pixel size of the 2x capture. */
  width: number;
  height: number;
  alt: string;
}

const shotSizes = sizes as Record<
  Locale,
  Record<SoftwareShotId, { width: number; height: number }>
>;

export function getSoftwareShot(
  id: SoftwareShotId,
  locale: Locale,
): SoftwareShot {
  const size = shotSizes[locale]?.[id] ?? shotSizes.sv[id];
  return {
    id,
    src: `/media/software/${locale}/${id}.webp`,
    width: size.width,
    height: size.height,
    alt: softwareShotAlt[id][locale] ?? softwareShotAlt[id].sv,
  };
}
