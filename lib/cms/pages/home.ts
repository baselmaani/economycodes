import {
  authorizationContent,
  benefits,
  benefitsImage,
  digitalNationwideContent,
  heroContent,
  homeMeta,
  languageSupportContent,
  processSteps,
  whoWeHelp,
} from "@/content/home";
import { hadi } from "@/content/people";
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
// Eight sections shown by default; the four marked hiddenByDefault repeat
// points made by trust/about/faq and can be switched back on in the dashboard.
const HOME_SECTIONS = [
  { key: "hero", label: "Hero", locked: true },
  { key: "trust", label: "Verified authorization" },
  { key: "services", label: "Services overview" },
  { key: "why", label: "Why an authorized firm", hiddenByDefault: true },
  {
    key: "nationwide",
    label: "Nationwide + who we help",
    hiddenByDefault: true,
  },
  { key: "process", label: "How the collaboration works" },
  { key: "about", label: "About Hadi" },
  { key: "languages", label: "Language support", hiddenByDefault: true },
  { key: "digital", label: "Digital marketing teaser" },
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
      key: "processTitle",
      label: "Heading",
      kind: "text",
      section: "process",
      default: message((m) => m.home.collaborationTitle),
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
      key: "aboutTitle",
      label: "Heading",
      kind: "text",
      section: "about",
      default: message((m) => m.home.aboutTitle),
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
      key: "faqTitle",
      label: "Heading",
      kind: "text",
      section: "faq",
      hint: "The questions themselves are edited under FAQs (placement: Global).",
      default: message((m) => m.common.faqTitle),
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
      hint: "Portrait, about 400:439 (e.g. 800 × 878)",
      default: hadi.heroPhoto,
    },
    {
      key: "benefitsImage",
      label: "Benefits section image",
      section: "benefits",
      hint: "Landscape, about 3:2",
      default: benefitsImage,
    },
  ],
});
