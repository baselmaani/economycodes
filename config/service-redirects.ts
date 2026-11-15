import { routing, type AppLocale } from "../i18n/routing";
import { servicesList } from "../content/services";
import {
  getServiceOffering,
  type ServiceOfferingKey,
} from "../content/service-icons";
import type { LegacyRedirect } from "./legacy-redirects";

/**
 * Permanent redirects for a service requested under another offering's
 * route, e.g. the old /tjanster/<marketing slug> URLs from before marketing
 * and development services got their own routes (2026-11-13). Every service
 * × other offering × locale, so links that are already out there keep
 * working.
 *
 * Done here rather than only in the page (lib/service-page.ts also
 * redirects) because a page-level redirect on an uncached render sends the
 * Location header twice. Relative imports only: next.config.ts loads this
 * outside the app bundler.
 */
export const SERVICE_ROUTES = {
  redovisning: "/tjanster/[slug]",
  marknadsforing: "/digital-marknadsforing/[slug]",
  utveckling: "/systemutveckling/[slug]",
} as const satisfies Record<ServiceOfferingKey, keyof typeof routing.pathnames>;

const OFFERINGS = Object.keys(SERVICE_ROUTES) as ServiceOfferingKey[];

function localizedPath(
  offering: ServiceOfferingKey,
  locale: AppLocale,
  slug: string,
): string {
  const pattern = routing.pathnames[SERVICE_ROUTES[offering]][locale];
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  // Sources and destinations are matched and sent percent-encoded.
  return encodeURI(`${prefix}${pattern.replace("[slug]", slug)}`);
}

/** Every real service URL, so a redirect never shadows another service's page. */
const liveUrls = new Set(
  servicesList.flatMap((service) =>
    routing.locales.map((locale) =>
      localizedPath(
        getServiceOffering(service.key),
        locale,
        service.slug[locale] ?? service.slug.sv,
      ),
    ),
  ),
);

export const serviceRedirects: LegacyRedirect[] = servicesList.flatMap(
  (service) => {
    const home = getServiceOffering(service.key);
    return routing.locales.flatMap((locale) => {
      const slug = service.slug[locale] ?? service.slug.sv;
      const destination = localizedPath(home, locale, slug);
      return OFFERINGS.filter((offering) => offering !== home)
        .map((offering) => ({
          source: localizedPath(offering, locale, slug),
          destination,
          permanent: true as const,
        }))
        .filter((redirect) => !liveUrls.has(redirect.source));
    });
  },
);
