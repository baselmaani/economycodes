import type { AppLocale } from "@/i18n/routing";
import type { PersonProfile } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";
import { siteUrl } from "@/lib/site";
import {
  AVAILABLE_LANGUAGES,
  PERSON_ID,
  orgRef,
} from "@/lib/structured-data/ids";

/** Hadi Al Maani personally holds both credentials below, via Srf konsulterna. */
export function buildPersonJsonLd(
  person: PersonProfile,
  locale: AppLocale,
  profileUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: person.name,
    url: profileUrl,
    jobTitle: getLocalized(person.title, locale),
    description: getLocalized(person.bio, locale),
    image: new URL(person.photo.src, siteUrl).toString(),
    sameAs: [person.socials.facebook],
    knowsLanguage: AVAILABLE_LANGUAGES,
    worksFor: orgRef,
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Auktoriserad Redovisningskonsult",
        recognizedBy: { "@type": "Organization", name: "Srf konsulterna" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "Auktoriserad Lönekonsult",
        recognizedBy: { "@type": "Organization", name: "Srf konsulterna" },
      },
    ],
  };
}
