import { describe, expect, it } from "vitest";

import {
  getOfferingServices,
  getServiceHref,
  getServiceRoute,
  SERVICE_ROUTES,
} from "@/lib/service-lookup";
import { servicesList } from "@/content/services";
import { getServiceOffering } from "@/content/service-icons";
import { offerings } from "@/content/offerings";
import { developmentAreas } from "@/content/development";
import { digitalAreas } from "@/content/digital-marketing";
import {
  SERVICE_ROUTES as REDIRECT_ROUTES,
  serviceRedirects,
} from "@/config/service-redirects";

const LOCALES = ["sv", "en", "ar"] as const;
const SERVICE_OFFERINGS = [
  "redovisning",
  "marknadsforing",
  "utveckling",
] as const;

describe("service detail URLs", () => {
  it("puts every service under exactly one offering", () => {
    const counted = SERVICE_OFFERINGS.flatMap((offering) =>
      getOfferingServices(offering).map((s) => s.key),
    );
    expect(counted.sort()).toEqual(servicesList.map((s) => s.key).sort());
  });

  it("serves each service under its offering's hub", () => {
    for (const service of servicesList) {
      const offering = offerings[getServiceOffering(service.key)];
      expect(getServiceRoute(service), service.key).toBe(
        `${offering.route}/[slug]`,
      );
    }
  });

  it("moves the programming services to /systemutveckling and keeps websites in marketing", () => {
    expect(
      getOfferingServices("utveckling")
        .map((s) => s.key)
        .sort(),
    ).toEqual([
      "custom-system-development",
      "mobile-app-development",
      "saas-development",
      "ui-ux-design",
    ]);
    expect(getServiceOffering("website-creation")).toBe("marknadsforing");
    expect(getServiceOffering("bookkeeping")).toBe("redovisning");
  });

  it("builds hrefs from the per-locale slug", () => {
    for (const service of servicesList) {
      for (const locale of LOCALES) {
        expect(getServiceHref(locale, service)).toEqual({
          pathname: SERVICE_ROUTES[getServiceOffering(service.key)],
          params: { slug: service.slug[locale] ?? service.slug.sv },
        });
      }
    }
  });

  it("keeps slugs unique within each offering and locale", () => {
    for (const offering of SERVICE_OFFERINGS) {
      for (const locale of LOCALES) {
        const slugs = getOfferingServices(offering).map(
          (s) => s.slug[locale] ?? s.slug.sv,
        );
        expect(new Set(slugs).size, `${offering}/${locale}`).toBe(slugs.length);
      }
    }
  });
});

describe("hub service areas", () => {
  it("list each hub's own services, all of them", () => {
    const hubs = [
      ["marknadsforing", digitalAreas],
      ["utveckling", developmentAreas],
    ] as const;
    for (const [offering, areas] of hubs) {
      const listed = areas.flatMap((area) => area.serviceKeys).sort();
      expect(listed, offering).toEqual(
        getOfferingServices(offering)
          .map((s) => s.key)
          .sort(),
      );
    }
  });
});

describe("redirects for services under another offering's URL", () => {
  it("uses the same routes as the app", () => {
    expect(REDIRECT_ROUTES).toEqual(SERVICE_ROUTES);
  });

  it("covers the old /tjanster URLs of marketing and development services", () => {
    const bySource = new Map(serviceRedirects.map((r) => [r.source, r]));
    expect(bySource.get("/tjanster/webbplatser")?.destination).toBe(
      "/digital-marknadsforing/webbplatser",
    );
    expect(bySource.get("/en/services/saas-development")?.destination).toBe(
      "/en/software-development/saas-development",
    );
    expect(
      bySource.get(encodeURI("/ar/الخدمات/تصميم-المواقع"))?.destination,
    ).toBe(encodeURI("/ar/شركة-تسويق-رقمي-في-السويد/تصميم-المواقع"));
  });

  it("never redirects away from a real service page or to itself", () => {
    const sources = serviceRedirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
    for (const redirect of serviceRedirects) {
      expect(redirect.source).not.toBe(redirect.destination);
      expect(
        serviceRedirects.some((other) => other.source === redirect.destination),
        redirect.destination,
      ).toBe(false);
    }
  });
});
