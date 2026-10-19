import type { AppLocale } from "@/i18n/routing";
import { servicesList } from "@/content/services";
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
