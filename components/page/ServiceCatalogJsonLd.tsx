import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceAlternateLinks } from "@/lib/routes";
import { buildServiceCatalogJsonLd } from "@/lib/structured-data/service";
import type { Service } from "@/content/types";
import { JsonLd } from "@/components/seo/JsonLd";

/** Service JSON-LD for a hub page, with an offer catalog of the services it lists. */
export function ServiceCatalogJsonLd({
  locale,
  name,
  serviceType,
  description,
  url,
  services,
}: {
  locale: AppLocale;
  name: string;
  serviceType: string;
  description: string;
  url: string;
  /** Exactly the services visibly listed on the page. */
  services: Service[];
}) {
  return (
    <JsonLd
      data={buildServiceCatalogJsonLd({
        name,
        serviceType,
        description,
        url,
        locale,
        entries: services.map((service) => ({
          name: getLocalized(service.name, locale),
          description: getLocalized(service.summary, locale),
          url: getServiceAlternateLinks(service)[locale],
        })),
      })}
    />
  );
}
