import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { servicePageKey } from "@/lib/cms/pages";
import { getServiceOgImageUrl } from "@/lib/seo/og-image";
import { getServiceAlternateLinks } from "@/lib/routes";
import {
  getOfferingServices,
  getServiceHref,
  getServiceSlug,
  resolveServiceBySlug,
} from "@/lib/service-lookup";
import {
  getServiceOffering,
  type ServiceOfferingKey,
} from "@/content/service-icons";
import type { Service } from "@/content/types";

/**
 * Shared by the three service detail routes, one per offering:
 * /tjanster/[slug] (redovisning), /digital-marknadsforing/[slug]
 * (marknadsforing) and /systemutveckling/[slug] (utveckling). Each route only
 * pre-renders its own offering's services; the page body is
 * components/page/ServiceDetailPage.tsx.
 */

export interface ServicePageParams {
  locale: AppLocale;
  slug: string;
}

/** Every locale × service of one offering, for generateStaticParams. */
export function serviceStaticParams(
  offering: ServiceOfferingKey,
): ServicePageParams[] {
  return routing.locales.flatMap((locale) =>
    getOfferingServices(offering).map((service) => ({
      locale,
      slug: getServiceSlug(locale, service),
    })),
  );
}

/**
 * The service a route's slug points to. Unknown slugs 404. A service that
 * belongs to another offering gets a permanent (308) redirect to its own
 * route -- this is what moves the old /tjanster/<marketing slug> URLs (in
 * every locale) to /digital-marknadsforing/... and /systemutveckling/...
 * Relies on dynamicParams staying at its default (true), so slugs outside
 * generateStaticParams still reach the page.
 */
export function resolveServiceForOffering(
  locale: AppLocale,
  slug: string,
  offering: ServiceOfferingKey,
): Service {
  const service = resolveServiceBySlug(locale, slug);
  if (!service) notFound();
  if (getServiceOffering(service.key) !== offering) {
    const target = getPathname({
      locale,
      href: getServiceHref(locale, service),
    });
    // Arabic paths come back unencoded; the Location header must be ASCII.
    permanentRedirect(encodeURI(decodeURI(target)));
  }
  return service;
}

export async function generateServiceMetadata(
  params: Promise<ServicePageParams>,
  offering: ServiceOfferingKey,
): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = resolveServiceBySlug(locale, slug);
  // Redirecting slugs render no page of their own.
  if (!service || getServiceOffering(service.key) !== offering) return {};

  return buildPageMetadata(servicePageKey(service.key), locale, {
    alternates: getServiceAlternateLinks(service),
    ogImage: getServiceOgImageUrl(locale, service),
  });
}
