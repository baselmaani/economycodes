import type { AppLocale } from "@/i18n/routing";
import type { BusinessIdentity, PersonProfile } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";
import { siteUrl } from "@/lib/site";

/** Hadi Al Maani personally holds both credentials below, via Srf konsulterna. */
export function buildPersonJsonLd(
  person: PersonProfile,
  locale: AppLocale,
  business: BusinessIdentity,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: getLocalized(person.title, locale),
    description: getLocalized(person.bio, locale),
    image: new URL(person.photo.src, siteUrl).toString(),
    sameAs: [person.socials.facebook],
    worksFor: {
      "@type": "AccountingService",
      name: business.brandName,
      url: siteUrl,
    },
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
