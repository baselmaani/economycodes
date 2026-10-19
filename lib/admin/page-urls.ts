import "server-only";

import type { AppLocale } from "@/i18n/routing";
import {
  getAlternateLinks,
  getLocationAlternateLinks,
  getServiceAlternateLinks,
  locationPages,
  services,
} from "@/lib/routes";
import type { PageDef } from "@/lib/cms/pages";

/** Absolute public URL of a registry page, per locale. */
export function getPageUrls(def: PageDef): Record<AppLocale, string> | null {
  if (def.routeKey) return getAlternateLinks(def.routeKey);
  const location = locationPages.find(
    (page) => page.locationId === def.locationId,
  );
  if (location) return getLocationAlternateLinks(location);
  const service = def.serviceKey ? services[def.serviceKey] : undefined;
  return service ? getServiceAlternateLinks(service) : null;
}

/** Path-only form, so "View page" links work on localhost and preview deployments too. */
export function toPath(url: string): string {
  return decodeURI(new URL(url).pathname);
}
