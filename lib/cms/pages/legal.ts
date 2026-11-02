import type { Localized } from "@/content/types";
import { cookiePolicy, privacyPolicy, termsPage } from "@/content/legal";
import {
  definePage,
  same,
  truncate,
  type PageDef,
  type SectionDef,
  type TextFieldDef,
} from "./types";

/** "dataCollectedHeading" -> "Data collected heading". */
function humanize(key: string): string {
  const words = key.replace(/([A-Z])/g, " $1").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const PART_SUFFIX = /(Heading|BodyPrefix|BodySuffix|Body|LinkLabel)$/;

/**
 * Every localized string of a content/legal.ts object becomes a text field.
 * "fooHeading" / "fooBody" pairs share a "Foo" section, in source order.
 */
function legalFields(content: Record<string, unknown>) {
  const sections: SectionDef[] = [{ key: "general", label: "Title and date" }];
  const text: TextFieldDef[] = [
    {
      key: "lastUpdated",
      label: "Last updated (YYYY-MM-DD)",
      kind: "plain",
      section: "general",
      default: same(String(content.lastUpdated)),
    },
  ];
  for (const [key, value] of Object.entries(content)) {
    if (key === "lastUpdated") continue;
    const localized = value as Localized<string>;
    const part = key.match(PART_SUFFIX)?.[1];
    const sectionKey = part ? key.slice(0, -part.length) : "general";
    if (!sections.some((section) => section.key === sectionKey)) {
      sections.push({ key: sectionKey, label: humanize(sectionKey) });
    }
    text.push({
      key,
      label: part ? humanize(part) : humanize(key),
      kind: localized.sv.length > 80 ? "textarea" : "text",
      section: sectionKey,
      default: localized,
    });
  }
  return { sections, text };
}

export const legalPages: PageDef[] = [
  definePage({
    key: "integritetspolicy",
    label: "Privacy policy",
    group: "Legal",
    routeKey: "/integritetspolicy",
    seo: {
      title: privacyPolicy.title,
      description: truncate(privacyPolicy.intro),
    },
    ...legalFields(privacyPolicy),
  }),
  definePage({
    key: "cookies",
    label: "Cookie policy",
    group: "Legal",
    routeKey: "/cookies",
    seo: { title: cookiePolicy.title, description: cookiePolicy.intro },
    ...legalFields(cookiePolicy),
  }),
  definePage({
    key: "villkor",
    label: "Terms",
    group: "Legal",
    routeKey: "/villkor",
    seo: { title: termsPage.title, description: truncate(termsPage.intro) },
    ...legalFields(termsPage),
  }),
];
