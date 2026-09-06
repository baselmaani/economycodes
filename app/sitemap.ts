import type { MetadataRoute } from "next";

import { routing, type StaticAppPathname } from "@/i18n/routing";
import {
  getAlternateLinks,
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

  return [...staticUrls, ...serviceUrls];
}
