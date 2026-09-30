import type { BusinessIdentity, Location } from "@/content/types";
import { siteUrl } from "@/lib/site";
import {
  AREA_SERVED,
  AVAILABLE_LANGUAGES,
  ORGANIZATION_ID,
  WEBSITE_ID,
  orgRef,
  personRef,
} from "@/lib/structured-data/ids";

function buildPostalAddress(location: Location) {
  return {
    "@type": "PostalAddress",
    streetAddress: location.streetAddress,
    postalCode: location.postalCode,
    addressLocality: location.city,
    addressCountry: "SE",
  };
}

/**
 * Economy Codes AB is a confirmed "Srf Auktoriserad Redovisningsbyrå"
 * (authorized by Srf konsulterna, the Swedish industry organization for
 * accounting and payroll consultants) -- represented here via
 * `hasCredential`, an industry certification, not a government-issued
 * license. Org number, VAT number, and legal entity type remain unconfirmed
 * -- see CLIENT-TODO.md -- and are intentionally omitted. Each office is a
 * `department` with its own single address, the shape Google expects for a
 * multi-location LocalBusiness.
 */
export function buildOrganizationJsonLd(
  business: BusinessIdentity,
  locations: Location[],
  description: string,
) {
  const logo = new URL("/icon-512.png", siteUrl).toString();
  return {
    "@type": "AccountingService",
    "@id": ORGANIZATION_ID,
    name: business.brandName,
    legalName: business.legalName,
    url: siteUrl,
    description,
    logo: { "@type": "ImageObject", url: logo, width: 512, height: 512 },
    image: logo,
    telephone: business.phone,
    email: business.email,
    areaServed: AREA_SERVED,
    knowsLanguage: AVAILABLE_LANGUAGES,
    sameAs: [business.socials.facebook].filter(Boolean),
    employee: personRef,
    address: locations.map(buildPostalAddress),
    department: locations.map((location) => ({
      "@type": "AccountingService",
      "@id": `${siteUrl}/#office-${location.id}`,
      name: `${business.brandName}, ${location.city}`,
      telephone: business.phone,
      address: buildPostalAddress(location),
      parentOrganization: orgRef,
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

export function buildWebSiteJsonLd(business: BusinessIdentity) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: business.brandName,
    inLanguage: AVAILABLE_LANGUAGES,
    publisher: orgRef,
  };
}

/** Site-wide @graph (organization + website), emitted once from the root layout. */
export function buildSiteGraphJsonLd(
  business: BusinessIdentity,
  locations: Location[],
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(business, locations, description),
      buildWebSiteJsonLd(business),
    ],
  };
}
