import type { MetadataRoute } from "next";

import {
  routing,
  type AppLocale,
  type StaticAppPathname,
} from "@/i18n/routing";
import {
  getAlternateLinks,
  getArticleAlternateLinks,
  getLocationAlternateLinks,
  getServiceAlternateLinks,
  locationPages,
  servicesList,
} from "@/lib/routes";
import { getPageContent, getPublishedArticles } from "@/lib/cms/content";
import { locationPageKey, servicePageKey } from "@/lib/cms/pages";

/** Pages set to noindex in the admin dashboard are left out of the sitemap. */
async function isNoindex(pageKey: string): Promise<boolean> {
  return (await getPageContent(pageKey)).seo.noindex;
}

// Bumped whenever a static (non-content-dated) page's copy changes materially.
const STATIC_LAST_MODIFIED = "2026-10-19";

/**
 * One <url> per locale, each carrying the full hreflang set. Google wants every
 * language version listed as its own <loc>, not only as an alternate of the
 * Swedish URL.
 */
function localizedEntries(
  alternates: Record<AppLocale | "x-default", string>,
  lastModified: string,
): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: alternates[locale],
    alternates: { languages: alternates },
    lastModified,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: StaticAppPathname[] = [
    "/",
    "/tjanster",
    "/digital-marknadsforing",
    "/om-hadi",
    "/kontakt",
    "/artiklar",
    "/integritetspolicy",
    "/cookies",
    "/villkor",
  ];

  const staticNoindex = await Promise.all(
    staticEntries.map((href) =>
      isNoindex(href === "/" ? "home" : href.slice(1)),
    ),
  );
  const indexedStatic = staticEntries.filter((_, i) => !staticNoindex[i]);
  const serviceNoindex = await Promise.all(
    servicesList.map((service) => isNoindex(servicePageKey(service.key))),
  );
  const indexedServices = servicesList.filter((_, i) => !serviceNoindex[i]);
  const locationNoindex = await Promise.all(
    locationPages.map((page) => isNoindex(locationPageKey(page.locationId))),
  );
  const indexedLocations = locationPages.filter((_, i) => !locationNoindex[i]);
  const articles = (await getPublishedArticles()).filter(
    (article) => !article.seo.noindex,
  );

  const staticUrls = indexedStatic.flatMap((href) =>
    localizedEntries(getAlternateLinks(href), STATIC_LAST_MODIFIED),
  );
  const locationUrls = indexedLocations.flatMap((page) =>
    localizedEntries(getLocationAlternateLinks(page), STATIC_LAST_MODIFIED),
  );
  const serviceUrls = indexedServices.flatMap((service) =>
    localizedEntries(getServiceAlternateLinks(service), service.lastReviewed),
  );
  const articleUrls = articles.flatMap((article) =>
    localizedEntries(
      getArticleAlternateLinks(article),
      article.updatedAt ?? article.publishedAt,
    ),
  );

  return [...staticUrls, ...locationUrls, ...serviceUrls, ...articleUrls];
}
