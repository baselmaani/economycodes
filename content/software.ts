import type { StaticAppPathname } from "@/i18n/routing";
import type { Localized } from "./types";

/**
 * The Economy Codes accounting software section (/bokforingsprogram).
 *
 * Every product claim in content/software-*.ts was checked against the app's
 * code (economycodes-faktura). Features that are not live for customers
 * (Peppol sending/receiving, Lager, live INK2/årsredovisning filing) are left
 * out on purpose; see CLIENT-TODO.md before adding them.
 */

export const APP_LOGIN_URL = "https://app.economycodes.com/";

/** Contact form "service" value for a product-demo inquiry (lib/validation/contact.ts). */
export const SOFTWARE_DEMO_INQUIRY = "bokforingsprogram-demo";

export const softwareDemoInquiryLabel: Localized<string> = {
  sv: "Demo av bokföringsprogrammet",
  en: "Demo of the accounting software",
  ar: "عرض توضيحي لبرنامج المحاسبة",
};

export type SoftwarePageKey =
  "overview" | "fakturering" | "bokforing" | "lon" | "skatteverket" | "aiMcp";

export interface SoftwarePageEntry {
  key: SoftwarePageKey;
  route: StaticAppPathname;
  /** CMS page key (lib/cms/pages/software.ts). */
  cmsKey: string;
  /**
   * "pending" pages are prepared but answer 404 and stay out of nav, sitemap,
   * llms.txt and internal links until their customer workflow is verified in
   * production. Flip to "live" to publish.
   */
  status: "live" | "pending";
  navLabel: Localized<string>;
  /** One line for nav menus and cross-links. */
  summary: Localized<string>;
}

export const softwarePages: Record<SoftwarePageKey, SoftwarePageEntry> = {
  overview: {
    key: "overview",
    route: "/bokforingsprogram",
    cmsKey: "bokforingsprogram",
    status: "live",
    navLabel: {
      sv: "Bokföringsprogram",
      en: "Accounting software",
      ar: "برنامج المحاسبة",
    },
    summary: {
      sv: "Fakturering, bokföring och lön på ett ställe",
      en: "Invoicing, bookkeeping and payroll in one place",
      ar: "الفوترة ومسك الدفاتر والرواتب في مكان واحد",
    },
  },
  fakturering: {
    key: "fakturering",
    route: "/bokforingsprogram/fakturering",
    cmsKey: "bokforingsprogram-fakturering",
    status: "live",
    navLabel: { sv: "Fakturering", en: "Invoicing", ar: "الفوترة" },
    summary: {
      sv: "Skicka fakturor och följ upp betalningar",
      en: "Send invoices and follow up payments",
      ar: "أرسل الفواتير وتابع المدفوعات",
    },
  },
  bokforing: {
    key: "bokforing",
    route: "/bokforingsprogram/bokforing",
    cmsKey: "bokforingsprogram-bokforing",
    status: "live",
    navLabel: { sv: "Bokföring", en: "Bookkeeping", ar: "مسك الدفاتر" },
    summary: {
      sv: "Inköp, underlag, verifikationer, moms och SIE",
      en: "Purchases, documents, vouchers, VAT and SIE",
      ar: "المشتريات والمستندات والقيود والضريبة وSIE",
    },
  },
  lon: {
    key: "lon",
    route: "/bokforingsprogram/lon",
    cmsKey: "bokforingsprogram-lon",
    status: "live",
    navLabel: { sv: "Lön", en: "Payroll", ar: "الرواتب" },
    summary: {
      sv: "Lönebesked, utbetalning och bokföring av löner",
      en: "Payslips, salary payments and payroll entries",
      ar: "قسائم الرواتب والدفع وقيود الرواتب",
    },
  },
  skatteverket: {
    key: "skatteverket",
    route: "/bokforingsprogram/integrationer/skatteverket",
    cmsKey: "bokforingsprogram-skatteverket",
    status: "live",
    navLabel: {
      sv: "Arbetsgivardeklaration",
      en: "Employer declaration",
      ar: "إقرار صاحب العمل",
    },
    summary: {
      sv: "Skicka arbetsgivardeklarationen till Skatteverket för signering",
      en: "Send the employer declaration to Skatteverket for signing",
      ar: "أرسل إقرار صاحب العمل إلى Skatteverket للتوقيع",
    },
  },
  aiMcp: {
    key: "aiMcp",
    route: "/bokforingsprogram/integrationer/ai-mcp",
    cmsKey: "bokforingsprogram-ai-mcp",
    status: "live",
    navLabel: {
      sv: "AI-assistent (MCP)",
      en: "AI assistant (MCP)",
      ar: "مساعد الذكاء الاصطناعي (MCP)",
    },
    summary: {
      sv: "Låt din AI-assistent svara på frågor om företagets ekonomi",
      en: "Let your AI assistant answer questions about your finances",
      ar: "دع مساعد الذكاء الاصطناعي يجيب عن أسئلة حول مالية شركتك",
    },
  },
};

export const softwarePageList: SoftwarePageEntry[] =
  Object.values(softwarePages);

/** Preview builds (SOFTWARE_PREVIEW=1) also render pending pages, always noindexed. */
export function isSoftwarePreview(): boolean {
  return process.env.SOFTWARE_PREVIEW === "1";
}

export function isSoftwarePagePublic(key: SoftwarePageKey): boolean {
  return softwarePages[key].status === "live" || isSoftwarePreview();
}

/** Pages that are live for everyone: nav, sitemap, llms.txt and cross-links use only these. */
export function liveSoftwarePages(): SoftwarePageEntry[] {
  return softwarePageList.filter((page) => page.status === "live");
}

/** Subpages a visitor can actually open in this build (live, or pending in preview). */
export function visibleSoftwareSubpages(): SoftwarePageEntry[] {
  return softwarePageList.filter(
    (page) => page.key !== "overview" && isSoftwarePagePublic(page.key),
  );
}
