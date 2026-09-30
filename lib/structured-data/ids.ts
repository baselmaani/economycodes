import { siteUrl } from "@/lib/site";

/**
 * Stable JSON-LD node identifiers. Every page references the same
 * organization/person/website nodes by @id, so search engines and AI answer
 * engines merge them into one entity graph instead of seeing unrelated blobs.
 * Locale-independent on purpose: it's one company and one person in every
 * language.
 */
export const ORGANIZATION_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;
export const PERSON_ID = `${siteUrl}/#hadi`;

export const orgRef = { "@id": ORGANIZATION_ID } as const;
export const personRef = { "@id": PERSON_ID } as const;

export const AVAILABLE_LANGUAGES = ["sv", "en", "ar"];
export const AREA_SERVED = { "@type": "Country", name: "Sweden" } as const;
