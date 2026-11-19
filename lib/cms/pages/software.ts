import type { Localized } from "@/content/types";
import { softwarePages, type SoftwarePageKey } from "@/content/software";
import {
  softwareCommon,
  softwareIntegrations,
  softwareOrAccounting,
  softwareOverview,
  softwareSubpages,
} from "@/content/software-pages";
import { SOFTWARE_SHOT_IDS } from "@/content/software-shot-ids";
import {
  faqToItem,
  featureToItem,
  integrationToItem,
  overviewFeatureToItem,
  stepToItem,
} from "@/lib/cms/software-content";
import {
  definePage,
  type CollectionFieldDef,
  type CollectionItemFieldDef,
  type PageDef,
  type SectionDef,
  type TextFieldDef,
} from "./types";

/**
 * The /bokforingsprogram pages. Every text on them is editable; the coded
 * defaults live in content/software-pages.ts and are converted to and from
 * dashboard collections by lib/cms/software-content.ts.
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

const SHOT_HINT = `Screenshot id, or empty for none: ${SOFTWARE_SHOT_IDS.join(", ")}`;
const PAGE_HINT = `Software page the card links to: ${Object.keys(softwarePages).join(", ")}`;

const labels: Record<SoftwarePageKey, string> = {
  overview: "Accounting software",
  fakturering: "Accounting software – Invoicing",
  bokforing: "Accounting software – Bookkeeping",
  lon: "Accounting software – Payroll",
  skatteverket: "Accounting software – Skatteverket (AGI)",
  aiMcp: "Accounting software – AI / MCP",
};

function textField(
  key: string,
  label: string,
  section: string,
  value: Localized<string> | undefined,
  kind: TextFieldDef["kind"] = "text",
  hint?: string,
): TextFieldDef {
  return { key, label, section, kind, default: value ?? { sv: "" }, hint };
}

const stepFields: CollectionItemFieldDef[] = [
  { key: "title", label: "Title", kind: "text" },
  { key: "body", label: "Text", kind: "textarea" },
  {
    key: "shot",
    label: "Screenshot id (optional)",
    kind: "plain",
    optional: true,
  },
];

const faqFields: CollectionItemFieldDef[] = [
  { key: "id", label: "ID (optional)", kind: "plain", optional: true },
  { key: "question", label: "Question", kind: "text" },
  { key: "answer", label: "Answer", kind: "textarea" },
];

function faqCollection(
  defaults: Parameters<typeof faqToItem>[0][],
): CollectionFieldDef {
  return {
    key: "faqs",
    label: "Questions and answers",
    itemLabel: "Question",
    section: "faqs",
    fields: faqFields,
    default: defaults.map(faqToItem),
  };
}

const heroSection: SectionDef = { key: "hero", label: "Hero" };
const faqSection: SectionDef = { key: "faqs", label: "FAQ" };

const overviewDef = definePage({
  key: softwarePages.overview.cmsKey,
  label: labels.overview,
  group: "Pages",
  routeKey: softwarePages.overview.route,
  seo: seo.overview,
  sections: [
    heroSection,
    { key: "walkthrough", label: "Walkthrough (steps)" },
    { key: "intro", label: "Intro" },
    {
      key: "features",
      label: "Feature cards",
      description: `Each card links to a software page. ${SHOT_HINT}.`,
    },
    { key: "integrations", label: "Integrations and files" },
    { key: "example", label: "Demo company and accounting service" },
    faqSection,
  ],
  text: [
    textField(
      "heroEyebrow",
      "Label above the heading",
      "hero",
      softwareCommon.eyebrow,
    ),
    textField(
      "heroTitle",
      "Page heading (H1)",
      "hero",
      softwareOverview.hero.title,
    ),
    textField(
      "heroLead",
      "Intro under the heading",
      "hero",
      softwareOverview.hero.lead,
      "textarea",
    ),
    textField(
      "walkthroughTitle",
      "Heading",
      "walkthrough",
      softwareOverview.walkthrough.title,
    ),
    textField(
      "walkthroughLead",
      "Intro",
      "walkthrough",
      softwareOverview.walkthrough.lead,
      "textarea",
    ),
    textField("introTitle", "Heading", "intro", softwareOverview.intro.title),
    textField(
      "featuresTitle",
      "Heading",
      "features",
      softwareOverview.featuresTitle,
    ),
    textField(
      "featuresLead",
      "Intro",
      "features",
      softwareOverview.featuresLead,
      "textarea",
    ),
    textField(
      "integrationsTitle",
      "Heading",
      "integrations",
      softwareIntegrations.title,
    ),
    textField(
      "integrationsLead",
      "Intro",
      "integrations",
      softwareIntegrations.lead,
      "textarea",
    ),
    textField(
      "exampleTitle",
      "Demo company heading",
      "example",
      softwareOverview.example.title,
    ),
    textField(
      "exampleBody",
      "Demo company text",
      "example",
      softwareOverview.example.body,
      "textarea",
    ),
    textField(
      "orAccountingTitle",
      "Accounting service heading",
      "example",
      softwareOrAccounting.title,
    ),
    textField(
      "orAccountingBody",
      "Accounting service text",
      "example",
      softwareOrAccounting.body,
      "textarea",
    ),
    textField(
      "orAccountingLink",
      "Accounting service link text",
      "example",
      softwareOrAccounting.link,
    ),
  ],
  lists: [
    {
      key: "introParagraphs",
      label: "Paragraphs (one per line)",
      section: "intro",
      default: softwareOverview.intro.paragraphs,
    },
  ],
  collections: [
    {
      key: "walkthroughSteps",
      label: "Steps",
      itemLabel: "Step",
      section: "walkthrough",
      hint: SHOT_HINT,
      fields: stepFields,
      default: softwareOverview.walkthrough.steps.map(stepToItem),
    },
    {
      key: "features",
      label: "Cards",
      itemLabel: "Card",
      section: "features",
      fields: [
        { key: "title", label: "Title", kind: "text" },
        { key: "body", label: "Text", kind: "textarea" },
        {
          key: "badge",
          label: "Badge (optional)",
          kind: "text",
          optional: true,
        },
        { key: "page", label: "Links to page", kind: "plain" },
        {
          key: "anchor",
          label: "Section anchor on that page (optional)",
          kind: "plain",
          optional: true,
        },
        { key: "shot", label: "Screenshot id", kind: "plain" },
      ],
      hint: PAGE_HINT,
      default: softwareOverview.features.map(overviewFeatureToItem),
    },
    {
      key: "integrations",
      label: "Integrations",
      itemLabel: "Integration",
      section: "integrations",
      hint: PAGE_HINT,
      fields: [
        { key: "id", label: "ID", kind: "plain" },
        { key: "name", label: "Name", kind: "text" },
        { key: "what", label: "What it does", kind: "textarea" },
        { key: "who", label: "Who it helps", kind: "textarea" },
        { key: "page", label: "Links to page", kind: "plain" },
        { key: "anchor", label: "Section anchor on that page", kind: "plain" },
      ],
      default: softwareIntegrations.items.map(integrationToItem),
    },
    faqCollection(softwareOverview.faqs),
  ],
});

type SubpageKey = keyof typeof softwareSubpages;

function subpageDef(key: SubpageKey): PageDef {
  const content = softwareSubpages[key];
  const entry = softwarePages[key];
  return definePage({
    key: entry.cmsKey,
    label: labels[key],
    group: "Pages",
    routeKey: entry.route,
    seo: seo[key],
    sections: [
      heroSection,
      { key: "workflow", label: "Workflow (steps)" },
      {
        key: "features",
        label: "Feature sections",
        description:
          "Paragraphs: separate with a blank line. Bullets: one per line. The example box shows when both its fields are filled in. The ID is the section's #anchor, which other pages link to.",
      },
      faqSection,
    ],
    text: [
      textField(
        "heroEyebrow",
        "Label above the heading",
        "hero",
        content.hero.eyebrow,
      ),
      textField("heroTitle", "Page heading (H1)", "hero", content.hero.title),
      textField(
        "heroLead",
        "Intro under the heading",
        "hero",
        content.hero.lead,
        "textarea",
      ),
      textField(
        "pendingNote",
        "Pre-launch note (only shown while the page is unpublished)",
        "hero",
        content.pendingNote,
        "textarea",
      ),
      textField("workflowTitle", "Heading", "workflow", content.workflow.title),
      textField(
        "workflowLead",
        "Intro",
        "workflow",
        content.workflow.lead,
        "textarea",
      ),
    ],
    collections: [
      {
        key: "workflowSteps",
        label: "Steps",
        itemLabel: "Step",
        section: "workflow",
        hint: SHOT_HINT,
        fields: stepFields,
        default: content.workflow.steps.map(stepToItem),
      },
      {
        key: "features",
        label: "Sections",
        itemLabel: "Section",
        section: "features",
        hint: SHOT_HINT,
        fields: [
          { key: "id", label: "ID / anchor", kind: "plain" },
          { key: "title", label: "Heading", kind: "text" },
          { key: "paragraphs", label: "Paragraphs", kind: "textarea" },
          {
            key: "bullets",
            label: "Bullets (optional)",
            kind: "textarea",
            optional: true,
          },
          {
            key: "badge",
            label: "Badge (optional)",
            kind: "text",
            optional: true,
          },
          {
            key: "exampleTitle",
            label: "Example heading (optional)",
            kind: "text",
            optional: true,
          },
          {
            key: "exampleBody",
            label: "Example text (optional)",
            kind: "textarea",
            optional: true,
          },
          {
            key: "shot",
            label: "Screenshot id (optional)",
            kind: "plain",
            optional: true,
          },
        ],
        default: content.features.map(featureToItem),
      },
      faqCollection(content.faqs),
    ],
  });
}

export const softwarePageDefs: PageDef[] = [
  overviewDef,
  ...(Object.keys(softwareSubpages) as SubpageKey[]).map(subpageDef),
];
