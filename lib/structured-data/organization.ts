import type { BusinessIdentity, Location } from "@/content/types";
import { siteUrl } from "@/lib/site";

/**
 * Economy Codes AB is a confirmed "Srf Auktoriserad Redovisningsbyrå"
 * (authorized by Srf konsulterna, the Swedish industry organization for
 * accounting and payroll consultants) -- represented here via
 * `hasCredential`, an industry certification, not a government-issued
 * license. Org number, VAT number, and legal entity type remain unconfirmed
 * -- see CLIENT-TODO.md -- and are intentionally omitted.
 */
export function buildOrganizationJsonLd(
  business: BusinessIdentity,
  locations: Location[],
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: business.brandName,
    legalName: business.legalName,
    url: siteUrl,
    description,
    telephone: business.phone,
    email: business.email,
    areaServed: "SE",
    sameAs: [business.socials.facebook].filter(Boolean),
    address: locations.map((location) => ({
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressCountry: "SE",
    })),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Srf Auktoriserad Redovisningsbyrå",
      recognizedBy: {
        "@type": "Organization",
        name: "Srf konsulterna",
      },
    },
  };
}
