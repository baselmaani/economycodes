import type { MetadataRoute } from "next";

import { routing, type StaticAppPathname } from "@/i18n/routing";
import {
  articles,
  getAlternateLinks,
  getArticleAlternateLinks,
  getServiceAlternateLinks,
  servicesList,
} from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: StaticAppPathname[] = [
    "/",
    "/tjanster",
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
      lastModified: article.publishedAt,
    };
  });

  return [...staticUrls, ...serviceUrls, ...articleUrls];
}
