import type { AppLocale } from "@/i18n/routing";
import { servicesList } from "@/content/services";
import { inquiryTopics, type InquiryTopic } from "@/content/inquiries";
import {
  getServiceOffering,
  type ServiceOfferingKey,
} from "@/content/service-icons";
import { offeringList, type Offering } from "@/content/offerings";
import type { Service } from "@/content/types";

/**
 * Pure slug-resolution logic, kept free of any next-intl/next.js runtime
 * imports so it can be unit tested directly under Vitest (lib/routes.ts
 * pulls in next/navigation via next-intl, which Node's module resolver
 * can't resolve outside of Next's own bundler).
 */

/**
 * Next.js (as of Next 16.3.4 + Turbopack, observed with next-intl 4.14.2) does
 * not always URL-decode a dynamic segment before handing it to the page as
 * `params` when the segment contains percent-encoded non-ASCII characters
 * (reproduced for Arabic slugs). Decoding defensively here is a no-op for an
 * already-decoded value, since none of our slugs contain a literal "%".
 */
function decodeSlug(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Finds a service whose localized slug matches the given URL param, falling back to the sv slug. */
export function resolveServiceBySlug(
  locale: AppLocale,
  slugParam: string,
): Service | undefined {
  const decoded = decodeSlug(slugParam);
  return servicesList.find(
    (service) => (service.slug[locale] ?? service.slug.sv) === decoded,
  );
}

export function getServiceSlug(locale: AppLocale, service: Service): string {
  return service.slug[locale] ?? service.slug.sv;
}

/** The dynamic detail-page route of each offering that has service pages. */
export const SERVICE_ROUTES = {
  redovisning: "/tjanster/[slug]",
  marknadsforing: "/digital-marknadsforing/[slug]",
  utveckling: "/systemutveckling/[slug]",
} as const satisfies Record<ServiceOfferingKey, string>;

export type ServiceRoute = (typeof SERVICE_ROUTES)[ServiceOfferingKey];

/** The detail-page route a service lives under, decided by its offering. */
export function getServiceRoute(service: Pick<Service, "key">): ServiceRoute {
  return SERVICE_ROUTES[getServiceOffering(service.key)];
}

/**
 * next-intl href for a service's detail page. Always link services through
 * this (never a literal "/tjanster/[slug]"), so each lands under its own
 * offering's URL.
 */
export function getServiceHref(
  locale: AppLocale,
  service: Service,
): { pathname: ServiceRoute; params: { slug: string } } {
  return {
    pathname: getServiceRoute(service),
    params: { slug: getServiceSlug(locale, service) },
  };
}

/** Services of one offering, in display order. */
export function getOfferingServices(offering: ServiceOfferingKey): Service[] {
  return servicesList.filter(
    (service) => getServiceOffering(service.key) === offering,
  );
}

export interface ServiceOption {
  key: string;
  name: string;
}

export interface ServiceOptionGroup {
  label: string;
  options: ServiceOption[];
}

/**
 * Topics for the contact form's dropdown, grouped by offering: each group
 * starts with the offering's general topic (content/inquiries.ts), followed
 * by its individual services. Passed to the client form as plain data.
 */
export function getServiceOptions(locale: AppLocale): ServiceOptionGroup[] {
  const topicOption = (topic: InquiryTopic): ServiceOption => ({
    key: topic.value,
    name: topic.label[locale] ?? topic.label.sv,
  });
  const serviceOption = (service: Service): ServiceOption => ({
    key: service.key,
    name: service.name[locale] ?? service.name.sv,
  });
  const group = (offering: Offering, list: Service[]): ServiceOptionGroup => ({
    label: offering.label[locale] ?? offering.label.sv,
    options: [
      topicOption(inquiryTopics[offering.inquiry]),
      ...list.map(serviceOption),
    ],
  });

  // Same order as everywhere else; the software has no per-service options.
  return offeringList.map((offering) =>
    group(
      offering,
      offering.key === "bokforingsprogram"
        ? []
        : getOfferingServices(offering.key),
    ),
  );
}
