import type { Localized } from "@/content/types";
import { softwarePages, type SoftwarePageKey } from "@/content/software";
import { softwareOverview, softwareSubpages } from "@/content/software-pages";
import { definePage, type PageDef } from "./types";

/**
 * The /bokforingsprogram pages: SEO fields plus the hero heading and intro are
 * editable in the dashboard; the rest of the copy lives in content/software-pages.ts.
 */

const seo: Record<
  SoftwarePageKey,
  {
    title: Localized<string>;
    description: Localized<string>;
    absoluteTitle?: boolean;
  }
> = {
  overview: {
    title: {
      sv: "Bokföringsprogram för småföretag | Economy Codes",
      en: "Accounting software for small businesses | Economy Codes",
      ar: "برنامج محاسبة للشركات الصغيرة | Economy Codes",
    },
    absoluteTitle: true,
    description: {
      sv: "Bokföringsprogram för småföretag: skapa fakturor, följ betalningar, bokför med underlag och hantera lön på ett ställe. Byggt för svenska företag.",
      en: "Accounting software for small businesses in Sweden: create invoices, follow payments, book with documents and run payroll in one place.",
      ar: "برنامج محاسبة للشركات الصغيرة في السويد: أنشئ الفواتير وتابع المدفوعات وسجّل القيود مع المستندات وأدِر الرواتب في مكان واحد.",
    },
  },
  fakturering: {
    title: {
      sv: "Faktureringsprogram för småföretag",
      en: "Invoicing software for small businesses",
      ar: "برنامج فوترة للشركات الصغيرة",
    },
    description: {
      sv: "Skapa och skicka fakturor, se vad som är obetalt eller förfallet och använd återkommande fakturor, OCR, betal-QR och ROT/RUT i Economy Codes.",
      en: "Create and send invoices, see what is unpaid or overdue, and use recurring invoices, OCR, payment QR codes and ROT/RUT in Economy Codes.",
      ar: "أنشئ الفواتير وأرسلها، واعرف ما لم يُدفع أو تأخر، واستخدم الفواتير المتكررة وOCR ورموز الدفع QR وROT/RUT في Economy Codes.",
    },
  },
  bokforing: {
    title: {
      // "Bokföring för småföretag" is the accounting service's title (/tjanster/bokforing).
      sv: "Bokför själv – verifikationer, moms och SIE",
      en: "Bookkeeping software for small businesses",
      ar: "برنامج مسك الدفاتر للشركات الصغيرة",
    },
    description: {
      sv: "Bokför verifikationer med kvitton som underlag, registrera leverantörsfakturor, redovisa moms och flytta bokföring med SIE 4 i Economy Codes.",
      en: "Book vouchers with receipts attached, register supplier invoices, report VAT and move your books with SIE 4 in Economy Codes.",
      ar: "سجّل القيود مع إرفاق الإيصالات، وسجّل فواتير الموردين، وصرّح بالضريبة، وانقل دفاترك عبر SIE 4 في Economy Codes.",
    },
  },
  lon: {
    title: {
      sv: "Löneprogram för småföretag – lönebesked",
      en: "Payroll software for small businesses",
      ar: "برنامج رواتب للشركات الصغيرة – قسائم الرواتب",
    },
    description: {
      sv: "Skapa lönebesked med skatt enligt skattetabell, godkänn och skicka dem per e-post eller post, och betala och bokför lönerna i Economy Codes.",
      en: "Create payslips with tax from the tax tables, approve and send them by e-mail or post, then pay and book salaries in Economy Codes.",
      ar: "أنشئ قسائم الرواتب بالضريبة وفق الجداول، واعتمدها وأرسلها بالبريد الإلكتروني أو العادي، ثم ادفع الرواتب وقيّدها في Economy Codes.",
    },
  },
  skatteverket: {
    title: {
      sv: "Arbetsgivardeklaration med Economy Codes",
      en: "Employer declarations with Economy Codes",
      ar: "إقرار صاحب العمل مع Economy Codes",
    },
    // Already names the brand, so skip the " | Economy Codes" template.
    absoluteTitle: true,
    description: {
      sv: "Förbered arbetsgivardeklarationen i Economy Codes, skicka den till Skatteverket och signera på Mina sidor.",
      en: "Prepare the employer declaration in Economy Codes, send it to Skatteverket and sign it on Mina sidor.",
      ar: "جهّز إقرار صاحب العمل في Economy Codes وأرسله إلى Skatteverket ووقّعه في صفحتي.",
    },
  },
  aiMcp: {
    title: {
      sv: "Anslut din AI-assistent till Economy Codes",
      en: "Connect your AI assistant to Economy Codes",
      ar: "اربط مساعد الذكاء الاصطناعي بـ Economy Codes",
    },
    // Already names the brand, so skip the " | Economy Codes" template.
    absoluteTitle: true,
    description: {
      sv: "Låt en kompatibel AI-assistent svara på frågor om företagets fakturor och bokföring via MCP, med den behörighet du väljer.",
      en: "Let a compatible AI assistant answer questions about your invoices and books via MCP, with the access you choose.",
      ar: "دع مساعد ذكاء اصطناعي متوافقًا يجيب عن أسئلة حول فواتيرك ودفاترك عبر MCP، بالصلاحية التي تختارها.",
    },
  },
};

function heroDefaults(key: SoftwarePageKey) {
  return key === "overview"
    ? softwareOverview.hero
    : softwareSubpages[key].hero;
}

const labels: Record<SoftwarePageKey, string> = {
  overview: "Accounting software",
  fakturering: "Accounting software – Invoicing",
  bokforing: "Accounting software – Bookkeeping",
  lon: "Accounting software – Payroll",
  skatteverket: "Accounting software – Skatteverket (AGI)",
  aiMcp: "Accounting software – AI / MCP",
};

export const softwarePageDefs: PageDef[] = (
  Object.keys(softwarePages) as SoftwarePageKey[]
).map((key) =>
  definePage({
    key: softwarePages[key].cmsKey,
    label: labels[key],
    group: "Pages",
    routeKey: softwarePages[key].route,
    seo: seo[key],
    sections: [
      {
        key: "hero",
        label: "Hero",
        description:
          "Feature sections, steps and FAQs are edited in content/software-pages.ts, since they quote the app's own labels.",
      },
    ],
    text: [
      {
        key: "heroTitle",
        label: "Page heading (H1)",
        kind: "text",
        section: "hero",
        default: heroDefaults(key).title,
      },
      {
        key: "heroLead",
        label: "Intro under the heading",
        kind: "textarea",
        section: "hero",
        default: heroDefaults(key).lead,
      },
    ],
  }),
);
