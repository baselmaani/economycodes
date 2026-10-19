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

/** Topics the firm is an authority on, read by search and AI answer engines. */
const KNOWS_ABOUT = [
  "Accounting in Sweden",
  "Bookkeeping",
  "Payroll",
  "VAT",
  "Tax returns",
  "Annual accounts",
  "Company formation in Sweden",
  "Fortnox",
  "Digital marketing",
  "Search engine optimization (SEO)",
  "Answer engine optimization (AEO)",
  "Generative engine optimization (GEO)",
  "Google Ads",
  "Social media advertising",
  "Website development",
];

export interface OfficeJsonLdOptions {
  /** The office's landing page, when it has one. */
  url?: string;
  /** Towns served from this office. */
  areaServed?: string[];
}

/**
 * One office as its own AccountingService node. The same @id is used for the
 * organization's `department` list and the office landing page, so both
 * describe one entity.
 */
export function buildOfficeJsonLd(
  business: BusinessIdentity,
  location: Location,
  { url, areaServed }: OfficeJsonLdOptions = {},
) {
  return {
    "@type": "AccountingService",
    "@id": `${siteUrl}/#office-${location.id}`,
    name: `${business.brandName}, ${location.city}`,
    ...(url && { url }),
    telephone: business.phone,
    email: business.email,
    address: buildPostalAddress(location),
    hasMap: location.mapsHref,
    ...(areaServed && {
      areaServed: areaServed.map((name) => ({ "@type": "Place", name })),
    }),
    knowsLanguage: AVAILABLE_LANGUAGES,
    parentOrganization: orgRef,
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
  officeOptions: (location: Location) => OfficeJsonLdOptions = () => ({}),
) {
  const logo = new URL("/icon-512.png", siteUrl).toString();
  return {
    // Accounting firm first; ProfessionalService covers the digital
    // marketing agency side of the same company.
    "@type": ["AccountingService", "ProfessionalService"],
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
    knowsAbout: KNOWS_ABOUT,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.phone,
      email: business.email,
      areaServed: "SE",
      availableLanguage: ["Swedish", "English", "Arabic"],
    },
    employee: personRef,
    address: locations.map(buildPostalAddress),
    department: locations.map((location) =>
      buildOfficeJsonLd(business, location, officeOptions(location)),
    ),
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
  officeOptions?: (location: Location) => OfficeJsonLdOptions,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildOrganizationJsonLd(business, locations, description, officeOptions),
      buildWebSiteJsonLd(business),
    ],
  };
}
