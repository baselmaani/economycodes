import { locationPages } from "@/content/location-pages";
import { definePage, message } from "./types";

/** Page key under which an office landing page's overrides are stored. */
export function locationPageKey(locationId: string): string {
  return `location:${locationId}`;
}

const CITY_HINT = "{city} is replaced by the office's city.";

export const locationPageDefs = locationPages.map((page) =>
  definePage({
    key: locationPageKey(page.locationId),
    label: `Office: ${page.cityName.sv}`,
    group: "Pages",
    locationId: page.locationId,
    seo: { title: page.metaTitle, description: page.metaDescription },
    sections: [
      { key: "hero", label: "Heading and intro" },
      {
        key: "office",
        label: "Office and areas",
        description:
          "The address and map link are edited under Business info → Offices.",
      },
      { key: "body", label: "Body text" },
      { key: "services", label: "Services" },
      { key: "faq", label: "FAQ" },
    ],
    text: [
      {
        key: "title",
        label: "Page heading (H1)",
        kind: "text",
        section: "hero",
        default: page.title,
      },
      {
        key: "intro",
        label: "Intro under the heading",
        kind: "textarea",
        section: "hero",
        default: page.intro,
      },
      {
        key: "officeTitle",
        label: "Office card heading",
        kind: "text",
        section: "office",
        hint: CITY_HINT,
        default: message((m) => m.location.officeTitle),
      },
      {
        key: "areasTitle",
        label: "Areas card heading",
        kind: "text",
        section: "office",
        default: message((m) => m.location.areasTitle),
      },
      {
        key: "servicesTitle",
        label: "Heading",
        kind: "text",
        section: "services",
        hint: CITY_HINT,
        default: message((m) => m.location.servicesTitle),
      },
      {
        key: "faqTitle",
        label: "Heading",
        kind: "text",
        section: "faq",
        default: message((m) => m.common.faqTitle),
      },
      {
        key: "otherOfficeTitle",
        label: '"Other office" heading',
        kind: "text",
        section: "faq",
        default: message((m) => m.location.otherOfficeTitle),
      },
    ],
    lists: [
      {
        key: "nearbyAreas",
        label: "Towns and areas served",
        section: "office",
        hint: "Also used as areaServed for search engines.",
        default: { sv: page.nearbyAreas },
      },
    ],
    collections: [
      {
        key: "faqs",
        label: "Questions",
        itemLabel: "Question",
        section: "faq",
        fields: [
          { key: "question", label: "Question", kind: "text" },
          { key: "answer", label: "Answer", kind: "textarea" },
        ],
        default: page.faqs.map(({ question, answer }) => ({
          question,
          answer,
        })),
      },
    ],
    blocks: [
      { key: "body", label: "Body text", section: "body", default: page.body },
    ],
  }),
);
