import type { AppLocale } from "@/i18n/routing";
import type { BusinessIdentity, Service } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";
import { siteUrl } from "@/lib/site";

export function buildServiceJsonLd(
  service: Service,
  locale: AppLocale,
  business: BusinessIdentity,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: getLocalized(service.name, locale),
    description: getLocalized(service.summary, locale),
    url,
    provider: {
      "@type": "AccountingService",
      name: business.brandName,
      url: siteUrl,
    },
    areaServed: "SE",
  };
}
