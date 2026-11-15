import {
  authorizationContent,
  benefits,
  digitalNationwideContent,
  heroContent,
  homeAreas,
  homeSectionHeaders,
  homeSoftware,
  homeMeta,
  languageSupportContent,
  processSteps,
  whoWeHelp,
} from "@/content/home";
import { homeDevelopment } from "@/content/development";
import { cmsIconName } from "@/lib/cms/icons";
import {
  definePage,
  message,
  same,
  type CollectionItemFieldDef,
  type SectionDef,
} from "./types";

/** Icons the homepage process steps used before they became editable. */
const PROCESS_STEP_ICONS = [
  "MessagesSquare",
  "Search",
  "Handshake",
  "MessageCircle",
] as const;

/** Homepage sections, in default order; each key has a component in components/sections/home. */
// Ten sections shown by default; the four marked hiddenByDefault repeat
// points made by trust/about/faq and can be switched back on in the dashboard.
// The hero links to the four offerings (content/offerings.ts); "areas"
// then helps visitors choose between them, and services (accounting),
// digital (marketing), software and development each get their own teaser
// section.
const HOME_SECTIONS = [
  { key: "hero", label: "Hero", locked: true },
  { key: "areas", label: "Which offering suits you" },
  { key: "trust", label: "Verified authorization" },
  { key: "services", label: "Accounting services" },
  { key: "digital", label: "Digital marketing teaser" },
  { key: "software", label: "Accounting software teaser" },
  { key: "development", label: "Software development teaser" },
  { key: "why", label: "Why an authorized firm", hiddenByDefault: true },
  {
    key: "nationwide",
    label: "Nationwide + who we help",
    hiddenByDefault: true,
  },
  { key: "process", label: "How the collaboration works" },
  { key: "about", label: "About Hadi" },
  { key: "languages", label: "Language support", hiddenByDefault: true },
  { key: "benefits", label: "Benefits", hiddenByDefault: true },
  { key: "faq", label: "FAQ" },
  // The hero's primary button scrolls to this section (#kontakt).
  { key: "contact", label: "Contact", locked: true },
] as const satisfies readonly SectionDef[];

export type HomeSectionKey = (typeof HOME_SECTIONS)[number]["key"];

export const ICON_TITLE_BODY: CollectionItemFieldDef[] = [
  { key: "icon", label: "Icon", kind: "icon" },
  { key: "title", label: "Title", kind: "text" },
  { key: "body", label: "Text", kind: "textarea" },
];

export const homePage = definePage({
  key: "home",
  label: "Home",
  group: "Pages",
  routeKey: "/",
  seo: {
    title: homeMeta.title,
    description: homeMeta.description,
    absoluteTitle: true,
  },
  arrangeable: true,
  sections: [...HOME_SECTIONS],
  text: [
    {
      key: "heroEyebrow",
      label: "Eyebrow above the headline",
      kind: "text",
      section: "hero",
      default: message((m) => m.home.heroEyebrow),
    },
    {
      key: "heroTitle",
      label: "Hero headline",
      kind: "text",
      section: "hero",
      default: heroContent.title,
    },
    {
      key: "heroSubtitle",
      label: "Hero subtitle",
      kind: "textarea",
      section: "hero",
      default: heroContent.subtitle,
    },

    {
      key: "trustTitle",
      label: "Heading",
      kind: "text",
      section: "trust",
      default: message((m) => m.home.trustTitle),
    },
    {
      key: "trustEyebrow",
      label: "Eyebrow (issuing body)",
      kind: "plain",
      section: "trust",
      default: same(authorizationContent.issuingBody.name),
    },
    {
      key: "trustIntro",
      label: "Intro",
      kind: "textarea",
      section: "trust",
      default: authorizationContent.intro,
    },
    {
      key: "firmCredential",
      label: "Firm card: credential",
      kind: "plain",
      section: "trust",
      default: same(authorizationContent.firm.credential),
    },
    {
      key: "firmBody",
      label: "Firm card: text",
      kind: "textarea",
      section: "trust",
      default: authorizationContent.firm.body,
    },
    {
      key: "personCredentials",
      label: "Personal card: credentials",
      kind: "plain",
      section: "trust",
      default: same(authorizationContent.person.credentials.join(" · ")),
    },
    {
      key: "personBody",
      label: "Personal card: text",
      kind: "textarea",
      section: "trust",
      default: authorizationContent.person.body,
    },
    {
      key: "issuingBodyNote",
      label: "Note about the issuing body",
      kind: "textarea",
      section: "trust",
      default: authorizationContent.issuingBody.description,
    },

    {
      key: "whyTitle",
      label: "Heading",
      kind: "text",
      section: "why",
      default: message((m) => m.home.whyAuthorizedTitle),
    },
    {
      key: "whySubtitle",
      label: "Subheading",
      kind: "text",
      section: "why",
      default: message((m) => m.home.authorizationMeaningTitle),
    },
    {
      key: "consultantLabel",
      label: "Left card: title",
      kind: "text",
      section: "why",
      default: authorizationContent.consultantVsAuditor.consultant.label,
    },
    {
      key: "consultantBody",
      label: "Left card: text",
      kind: "textarea",
      section: "why",
      default: authorizationContent.consultantVsAuditor.consultant.body,
    },
    {
      key: "auditorLabel",
      label: "Right card: title",
      kind: "text",
      section: "why",
      default: authorizationContent.consultantVsAuditor.auditor.label,
    },
    {
      key: "auditorBody",
      label: "Right card: text",
      kind: "textarea",
      section: "why",
      default: authorizationContent.consultantVsAuditor.auditor.body,
    },
    {
      key: "whyNote",
      label: "Note under the cards",
      kind: "textarea",
      section: "why",
      default: authorizationContent.consultantVsAuditor.note,
    },

    {
      key: "servicesEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "services",
      default: message((m) => m.home.servicesEyebrow),
    },
    {
      key: "servicesTitle",
      label: "Heading",
      kind: "text",
      section: "services",
      default: message((m) => m.home.servicesTitle),
    },
    {
      key: "servicesLead",
      label: "Intro",
      kind: "textarea",
      section: "services",
      default: message((m) => m.home.servicesSubtitle),
    },
    {
      key: "servicesCta",
      label: "Link to the accounting page",
      kind: "text",
      section: "services",
      default: {
        sv: "Läs mer om redovisning",
        en: "Read more about accounting",
        ar: "اقرأ المزيد عن المحاسبة",
      },
    },

    {
      key: "nationwideTitle",
      label: "Heading",
      kind: "text",
      section: "nationwide",
      default: message((m) => m.home.nationwideTitle),
    },
    {
      key: "nationwideBody",
      label: "Intro",
      kind: "textarea",
      section: "nationwide",
      default: digitalNationwideContent.body,
    },
    {
      key: "whoWeHelpTitle",
      label: '"Who we help" heading',
      kind: "text",
      section: "nationwide",
      default: message((m) => m.common.whoWeHelp),
    },

    {
      key: "processEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "process",
      default: homeSectionHeaders.processEyebrow,
    },
    {
      key: "processTitle",
      label: "Heading",
      kind: "text",
      section: "process",
      default: message((m) => m.home.collaborationTitle),
    },
    {
      key: "processLead",
      label: "Intro",
      kind: "textarea",
      section: "process",
      default: homeSectionHeaders.processLead,
    },

    {
      key: "areasEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "areas",
      default: homeAreas.eyebrow,
    },
    {
      key: "areasTitle",
      label: "Heading",
      kind: "text",
      section: "areas",
      default: homeAreas.title,
    },
    {
      key: "areasLead",
      label: "Intro",
      kind: "textarea",
      section: "areas",
      default: homeAreas.lead,
    },

    {
      key: "softwareEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "software",
      default: homeSoftware.eyebrow,
    },
    {
      key: "softwareTitle",
      label: "Heading",
      kind: "text",
      section: "software",
      default: homeSoftware.title,
    },
    {
      key: "softwareLead",
      label: "Intro",
      kind: "textarea",
      section: "software",
      default: homeSoftware.lead,
    },
    {
      key: "softwareCta",
      label: "Link label",
      kind: "text",
      section: "software",
      default: homeSoftware.cta,
    },

    {
      key: "digitalEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "digital",
      default: message((m) => m.home.digitalEyebrow),
    },
    {
      key: "digitalTitle",
      label: "Heading",
      kind: "text",
      section: "digital",
      default: message((m) => m.home.digitalTitle),
    },
    {
      key: "digitalLead",
      label: "Intro",
      kind: "textarea",
      section: "digital",
      default: message((m) => m.home.digitalSubtitle),
    },
    {
      key: "digitalCta",
      label: "Button label",
      kind: "text",
      section: "digital",
      default: message((m) => m.home.digitalCta),
    },

    {
      key: "developmentEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "development",
      default: homeDevelopment.eyebrow,
    },
    {
      key: "developmentTitle",
      label: "Heading",
      kind: "text",
      section: "development",
      default: homeDevelopment.title,
    },
    {
      key: "developmentLead",
      label: "Intro",
      kind: "textarea",
      section: "development",
      default: homeDevelopment.lead,
    },
    {
      key: "developmentCta",
      label: "Button label",
      kind: "text",
      section: "development",
      default: homeDevelopment.cta,
    },

    {
      key: "aboutEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "about",
      default: homeSectionHeaders.aboutEyebrow,
    },
    {
      key: "aboutTitle",
      label: "Heading",
      kind: "text",
      section: "about",
      default: message((m) => m.home.aboutTitle),
    },
    {
      key: "aboutLead",
      label: "Intro",
      kind: "textarea",
      section: "about",
      default: homeSectionHeaders.aboutLead,
    },

    {
      key: "languagesTitle",
      label: "Heading",
      kind: "text",
      section: "languages",
      default: message((m) => m.home.languageSupportTitle),
    },
    {
      key: "languagesBody",
      label: "Text",
      kind: "textarea",
      section: "languages",
      default: languageSupportContent.body,
    },

    {
      key: "benefitsTitle",
      label: "Heading",
      kind: "text",
      section: "benefits",
      default: message((m) => m.home.benefitsTitle),
    },

    {
      key: "faqEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "faq",
      default: homeSectionHeaders.faqEyebrow,
    },
    {
      key: "faqTitle",
      label: "Heading",
      kind: "text",
      section: "faq",
      hint: "The questions themselves are edited under FAQs (placement: Global).",
      default: message((m) => m.common.faqTitle),
    },
    {
      key: "faqLead",
      label: "Intro",
      kind: "textarea",
      section: "faq",
      default: homeSectionHeaders.faqLead,
    },

    {
      key: "contactEyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "contact",
      default: message((m) => m.home.contactEyebrow),
    },
    {
      key: "contactTitle",
      label: "Heading",
      kind: "text",
      section: "contact",
      default: message((m) => m.home.finalCtaTitle),
    },
    {
      key: "contactLead",
      label: "Intro",
      kind: "textarea",
      section: "contact",
      default: message((m) => m.home.finalCtaSubtitle),
    },
    {
      key: "contactResponseTime",
      label: "Response time note",
      kind: "text",
      section: "contact",
      default: message((m) => m.home.contactResponseTime),
    },
    {
      key: "contactFormTitle",
      label: "Form title",
      kind: "text",
      section: "contact",
      default: message((m) => m.home.contactFormTitle),
    },
  ],
  lists: [
    {
      key: "nationwidePoints",
      label: "Points (right column)",
      section: "nationwide",
      default: digitalNationwideContent.points,
    },
    {
      key: "whoWeHelp",
      label: "Who we help",
      section: "nationwide",
      default: whoWeHelp,
    },
  ],
  collections: [
    {
      key: "areas",
      label: "Area cards",
      itemLabel: "Area",
      section: "areas",
      // Tied to the accounting, marketing, software and development pages in
      // that order (content/offerings.ts).
      fixedLength: true,
      fields: [
        { key: "title", label: "Title", kind: "text" },
        { key: "body", label: "Text", kind: "textarea" },
      ],
      default: homeAreas.items.map((item) => ({
        title: item.title,
        body: item.body,
      })),
    },
    {
      key: "processSteps",
      label: "Steps",
      itemLabel: "Step",
      section: "process",
      fields: ICON_TITLE_BODY,
      default: processSteps.map((step, index) => ({
        icon: same(PROCESS_STEP_ICONS[index] ?? "MessageCircle"),
        title: step.title,
        body: step.body,
      })),
    },
    {
      key: "benefits",
      label: "Benefits",
      itemLabel: "Benefit",
      section: "benefits",
      fields: ICON_TITLE_BODY,
      default: benefits.map((benefit) => ({
        icon: same(cmsIconName(benefit.icon)),
        title: benefit.title,
        body: benefit.body,
      })),
    },
  ],
  images: [
    {
      key: "heroPhoto",
      label: "Hero photo",
      section: "hero",
      hint: "Portrait, about 400:439 (e.g. 800 × 878). Without one, the About page's hero photo is used.",
    },
    {
      key: "servicesImage",
      label: "Accounting section image",
      section: "services",
      hint: "Landscape, about 3:2 (e.g. 1600 × 1067). Shown beside the heading.",
      default: {
        src: "/media/optimized/home-benefits.webp",
        width: 1600,
        height: 1067,
        alt: {
          sv: "Miniräknare och budgetrapporter på ett skrivbord",
          en: "Calculator and budget reports on a desk",
          ar: "آلة حاسبة وتقارير ميزانية على مكتب",
        },
      },
    },
    {
      key: "digitalImage",
      label: "Digital marketing section image",
      section: "digital",
      hint: "Landscape, about 3:2 (e.g. 1600 × 1067). Shown beside the heading.",
      default: {
        src: "/media/optimized/hero.webp",
        width: 1600,
        height: 1068,
        alt: {
          sv: "Diagram och rapporter som gås igenom vid ett skrivbord",
          en: "Charts and reports being reviewed at a desk",
          ar: "مخططات وتقارير تتم مراجعتها على مكتب",
        },
      },
    },
    {
      key: "developmentImage",
      label: "Software development section image",
      section: "development",
      hint: "Optional. Landscape, about 3:2 (e.g. 1600 × 1067). Without one, an illustration is shown.",
    },
    {
      key: "softwareImage",
      label: "Accounting software section image",
      section: "software",
      hint: "Optional. Without one, the real dashboard screenshot is shown (in the visitor's language).",
    },
    {
      key: "benefitsImage",
      label: "Benefits section image",
      section: "benefits",
      hint: "Landscape, about 3:2. Without one, the benefits fill the full width.",
    },
  ],
});
