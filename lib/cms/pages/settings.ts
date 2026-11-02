import { business } from "@/content/business";
import { faqs } from "@/content/faqs";
import { locations } from "@/content/locations";
import type { Faq } from "@/content/types";
import { definePage, same } from "./types";

export const BUSINESS_KEY = "settings:business";
export const FAQS_KEY = "settings:faqs";

/** "+46 73 479 82 10" from "https://wa.me/46734798210". */
function whatsappNumber(href: string | undefined): string {
  const digits = href?.match(/wa\.me\/(\d+)/)?.[1];
  return digits ? `+${digits}` : "";
}

export const businessSettings = definePage({
  key: BUSINESS_KEY,
  label: "Business info",
  group: "Settings",
  sections: [
    {
      key: "contact",
      label: "Contact",
      description:
        "Shown in the header, footer, contact page, sticky call bar and search engine data.",
    },
    { key: "social", label: "Social media" },
    {
      key: "company",
      label: "Company details",
      description: "Org and VAT numbers are only shown once filled in.",
    },
    {
      key: "offices",
      label: "Offices",
      description:
        "The office pages' texts are edited under Pages & SEO → Office.",
    },
  ],
  text: [
    {
      key: "phone",
      label: "Phone number",
      kind: "plain",
      section: "contact",
      hint: "International format, e.g. +46 73 479 82 10",
      default: same(business.phone),
    },
    {
      key: "email",
      label: "Email address",
      kind: "plain",
      section: "contact",
      default: same(business.email),
    },
    {
      key: "whatsapp",
      label: "WhatsApp number",
      kind: "plain",
      section: "contact",
      hint: "International format; the wa.me link is built from it.",
      default: same(whatsappNumber(business.whatsappHref)),
    },
    {
      key: "facebook",
      label: "Company Facebook page",
      kind: "plain",
      section: "social",
      default: same(business.socials.facebook),
    },
    {
      key: "hadiFacebook",
      label: "Hadi's Facebook profile",
      kind: "plain",
      section: "social",
      default: same(business.socials.hadiFacebook),
    },
    {
      key: "orgNumber",
      label: "Organisation number",
      kind: "plain",
      section: "company",
      default: same(business.orgNumber ?? ""),
    },
    {
      key: "vatNumber",
      label: "VAT number",
      kind: "plain",
      section: "company",
      default: same(business.vatNumber ?? ""),
    },
  ],
  collections: [
    {
      key: "offices",
      label: "Offices",
      itemLabel: "Office",
      section: "offices",
      fixedLength: true,
      fields: [
        { key: "name", label: "Name", kind: "text" },
        { key: "streetAddress", label: "Street address", kind: "plain" },
        { key: "postalCode", label: "Postal code", kind: "plain" },
        { key: "city", label: "City", kind: "plain" },
        { key: "mapsHref", label: "Google Maps link", kind: "plain" },
        {
          key: "openingHours",
          label: "Opening hours (optional)",
          kind: "textarea",
          optional: true,
        },
      ],
      default: locations.map((location) => ({
        name: location.name,
        streetAddress: same(location.streetAddress),
        postalCode: same(location.postalCode),
        city: same(location.city),
        mapsHref: same(location.mapsHref),
        openingHours: location.openingHours ?? same(""),
      })),
    },
  ],
});

/** Placement of an FAQ, as stored in the dashboard: "global", "digital" or "service:<key>". */
export function faqScopeToString(scope: Faq["scope"]): string {
  if (typeof scope === "string") return scope;
  return "serviceKey" in scope
    ? `service:${scope.serviceKey}`
    : `location:${scope.locationId}`;
}

export function faqScopeFromString(value: string): Faq["scope"] {
  if (value.startsWith("service:")) return { serviceKey: value.slice(8) };
  if (value.startsWith("location:")) return { locationId: value.slice(9) };
  return value === "digital" ? "digital" : "global";
}

export const faqSettings = definePage({
  key: FAQS_KEY,
  label: "FAQs",
  group: "Settings",
  collections: [
    {
      key: "items",
      label: "Questions",
      itemLabel: "Question",
      fields: [
        { key: "id", label: "ID", kind: "plain" },
        { key: "scope", label: "Shown on", kind: "plain" },
        { key: "question", label: "Question", kind: "text" },
        { key: "answer", label: "Answer", kind: "textarea" },
      ],
      default: faqs.map((faq) => ({
        id: same(faq.id),
        scope: same(faqScopeToString(faq.scope)),
        question: faq.question,
        answer: faq.answer,
      })),
    },
  ],
});
