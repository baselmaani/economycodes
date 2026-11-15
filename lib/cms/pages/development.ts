import {
  developmentAreas,
  developmentBenefits,
  developmentFacts,
  developmentHero,
  developmentIntro,
  developmentMeta,
  developmentProcessSteps,
} from "@/content/development";
import { cmsIconName } from "@/lib/cms/icons";
import { ICON_TITLE_BODY } from "./home";
import { definePage, message, same } from "./types";

export const developmentPage = definePage({
  key: "systemutveckling",
  label: "Software development",
  group: "Pages",
  routeKey: "/systemutveckling",
  seo: {
    title: developmentMeta.title,
    description: developmentMeta.description,
  },
  sections: [
    { key: "hero", label: "Hero" },
    { key: "intro", label: "What is software development + facts" },
    {
      key: "services",
      label: "Services by area",
      description:
        "The services themselves are edited under Pages & SEO → Services.",
    },
    { key: "process", label: "How we work" },
    { key: "benefits", label: "Why us" },
    { key: "faq", label: "FAQ" },
    { key: "cta", label: "Final call to action" },
  ],
  text: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "hero",
      default: message((m) => m.development.eyebrow),
    },
    {
      key: "heroTitle",
      label: "Hero headline",
      kind: "text",
      section: "hero",
      default: developmentHero.title,
    },
    {
      key: "heroLead",
      label: "Hero intro",
      kind: "textarea",
      section: "hero",
      default: developmentHero.lead,
    },
    {
      key: "introTitle",
      label: "Heading",
      kind: "text",
      section: "intro",
      default: developmentIntro.title,
    },
    {
      key: "factsTitle",
      label: "Facts box heading",
      kind: "text",
      section: "intro",
      default: developmentFacts.title,
    },
    {
      key: "servicesTitle",
      label: "Heading",
      kind: "text",
      section: "services",
      default: message((m) => m.development.servicesTitle),
    },
    {
      key: "processTitle",
      label: "Heading",
      kind: "text",
      section: "process",
      default: message((m) => m.development.processTitle),
    },
    {
      key: "benefitsTitle",
      label: "Heading",
      kind: "text",
      section: "benefits",
      default: message((m) => m.development.benefitsTitle),
    },
    {
      key: "faqTitle",
      label: "Heading",
      kind: "text",
      section: "faq",
      hint: "Shows the FAQs of the development services, edited under FAQs.",
      default: message((m) => m.common.faqTitle),
    },
    {
      key: "ctaTitle",
      label: "Heading",
      kind: "text",
      section: "cta",
      default: message((m) => m.development.ctaTitle),
    },
    {
      key: "ctaSubtitle",
      label: "Text",
      kind: "textarea",
      section: "cta",
      default: message((m) => m.development.ctaSubtitle),
    },
  ],
  lists: [
    {
      key: "introParagraphs",
      label: "Paragraphs (one per line)",
      section: "intro",
      default: developmentIntro.paragraphs,
    },
  ],
  collections: [
    {
      key: "facts",
      label: "Facts",
      itemLabel: "Fact",
      section: "intro",
      fields: [
        { key: "label", label: "Label", kind: "text" },
        { key: "value", label: "Value", kind: "textarea" },
      ],
      default: developmentFacts.items.map(({ label, value }) => ({
        label,
        value,
      })),
    },
    {
      key: "areas",
      label: "Service areas",
      itemLabel: "Area",
      section: "services",
      fixedLength: true,
      fields: [
        { key: "icon", label: "Icon", kind: "icon" },
        { key: "label", label: "Label", kind: "text" },
      ],
      default: developmentAreas.map((area) => ({
        icon: same(cmsIconName(area.icon)),
        label: area.label,
      })),
    },
    {
      key: "processSteps",
      label: "Steps",
      itemLabel: "Step",
      section: "process",
      fields: ICON_TITLE_BODY.filter((field) => field.kind !== "icon"),
      default: developmentProcessSteps.map(({ title, body }) => ({
        title,
        body,
      })),
    },
    {
      key: "benefits",
      label: "Benefits",
      itemLabel: "Benefit",
      section: "benefits",
      fields: ICON_TITLE_BODY,
      default: developmentBenefits.map((benefit) => ({
        icon: same(cmsIconName(benefit.icon)),
        title: benefit.title,
        body: benefit.body,
      })),
    },
  ],
});
