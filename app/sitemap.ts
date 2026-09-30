import type { MetadataRoute } from "next";

import { routing, type StaticAppPathname } from "@/i18n/routing";
import {
  articles,
  getAlternateLinks,
  getArticleAlternateLinks,
  getServiceAlternateLinks,
  servicesList,
} from "@/lib/routes";

// Bumped whenever a static (non-content-dated) page's copy changes materially.
const STATIC_LAST_MODIFIED = "2026-09-06";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const staticUrls: MetadataRoute.Sitemap = staticEntries.map((href) => {
    const alternates = getAlternateLinks(href);
    return {
      url: alternates[routing.defaultLocale],
      alternates: { languages: alternates },
      lastModified: STATIC_LAST_MODIFIED,
    };
  });

  const serviceUrls: MetadataRoute.Sitemap = servicesList.map((service) => {
    const alternates = getServiceAlternateLinks(service);
    return {
      url: alternates[routing.defaultLocale],
      alternates: { languages: alternates },
      lastModified: service.lastReviewed,
    };
  });

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => {
    const alternates = getArticleAlternateLinks(article);
    return {
      url: alternates[routing.defaultLocale],
      alternates: { languages: alternates },
      lastModified: article.updatedAt ?? article.publishedAt,
    };
  });

  return [...staticUrls, ...serviceUrls, ...articleUrls];
}
