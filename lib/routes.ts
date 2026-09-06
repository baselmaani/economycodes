import { getPathname } from "@/i18n/navigation";
import {
  routing,
  type AppLocale,
  type StaticAppPathname,
} from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { getServiceSlug, resolveServiceBySlug } from "@/lib/service-lookup";
import { services, servicesList } from "@/content/services";
import { articles } from "@/content/articles/meta";
import type { ArticleMeta } from "@/content/articles/types";
import type { Service } from "@/content/types";

export { resolveServiceBySlug, getServiceSlug };

/** Absolute, locale-correct URL for a static (non-dynamic) pathname. */
export function getAbsoluteUrl(
  href: StaticAppPathname,
  locale: AppLocale,
): string {
  const pathname = getPathname({ locale, href });
  return new URL(pathname, siteUrl).toString();
}

/**
 * hreflang alternates for a static pathname, for every locale plus x-default
 * pointing at the unprefixed Swedish URL.
 */
export function getAlternateLinks(
  href: StaticAppPathname,
): Record<AppLocale | "x-default", string> {
  const entries = routing.locales.map(
    (locale) => [locale, getAbsoluteUrl(href, locale)] as const,
  );
  return {
    ...Object.fromEntries(entries),
    "x-default": getAbsoluteUrl(href, routing.defaultLocale),
  } as Record<AppLocale | "x-default", string>;
}

/** hreflang alternates for a dynamic [slug] page, given a function that resolves the slug per locale. */
function getDynamicAlternateLinks(
  pathname: "/tjanster/[slug]" | "/artiklar/[slug]",
  slugForLocale: (locale: AppLocale) => string,
): Record<AppLocale | "x-default", string> {
  const entries = routing.locales.map((locale) => {
    const resolvedPathname = getPathname({
      locale,
      href: { pathname, params: { slug: slugForLocale(locale) } },
    });
    return [locale, new URL(resolvedPathname, siteUrl).toString()] as const;
  });
  const sv = entries.find(([locale]) => locale === routing.defaultLocale)!;
  return {
    ...Object.fromEntries(entries),
    "x-default": sv[1],
  } as Record<AppLocale | "x-default", string>;
}

/** hreflang alternates for a service detail page, keyed off the service's own per-locale slug. */
export function getServiceAlternateLinks(
  service: Service,
): Record<AppLocale | "x-default", string> {
  return getDynamicAlternateLinks("/tjanster/[slug]", (locale) =>
    getServiceSlug(locale, service),
  );
}

export function getArticleSlug(
  locale: AppLocale,
  article: ArticleMeta,
): string {
  return article.slug[locale] ?? article.slug.sv;
}

/** hreflang alternates for an article detail page, keyed off the article's own per-locale slug. */
export function getArticleAlternateLinks(
  article: ArticleMeta,
): Record<AppLocale | "x-default", string> {
  return getDynamicAlternateLinks("/artiklar/[slug]", (locale) =>
    getArticleSlug(locale, article),
  );
}

export { services, servicesList, articles };
