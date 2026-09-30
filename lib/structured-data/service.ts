import type { AppLocale } from "@/i18n/routing";
import type { Service } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";
import {
  AREA_SERVED,
  AVAILABLE_LANGUAGES,
  orgRef,
} from "@/lib/structured-data/ids";

export function buildServiceJsonLd(
  service: Service,
  locale: AppLocale,
  url: string,
) {
  const name = getLocalized(service.name, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: name,
    description: getLocalized(service.summary, locale),
    url,
    inLanguage: locale,
    availableLanguage: AVAILABLE_LANGUAGES,
    provider: orgRef,
    areaServed: AREA_SERVED,
  };
}

export interface CatalogEntry {
  name: string;
  description: string;
  url: string;
}

/**
 * Service + OfferCatalog for a hub page (digital marketing, services index),
 * so search engines and AI tools can read the full offer (and each service's
 * own URL) from one page. No prices -- none are confirmed (CLIENT-TODO item 21).
 */
export function buildServiceCatalogJsonLd({
  name,
  serviceType,
  description,
  url,
  locale,
  entries,
}: {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  locale: AppLocale;
  entries: CatalogEntry[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType,
    description,
    url,
    inLanguage: locale,
    availableLanguage: AVAILABLE_LANGUAGES,
    provider: orgRef,
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: entries.map((entry, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: entry.name,
          description: entry.description,
          url: entry.url,
        },
      })),
    },
  };
}
