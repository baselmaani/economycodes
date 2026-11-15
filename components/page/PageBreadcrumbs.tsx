import { getTranslations } from "next-intl/server";

import type { AppLocale, StaticAppPathname } from "@/i18n/routing";
import { getAbsoluteUrl } from "@/lib/routes";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";

export interface TrailItem {
  label: string;
  /** Parent pages link by route key; leave it off for the current page (last item). */
  routeKey?: StaticAppPathname;
}

/**
 * Visible breadcrumb trail plus the matching BreadcrumbList JSON-LD, built
 * from one list so the two can't drift apart. "Home" is added first.
 */
export async function PageBreadcrumbs({
  locale,
  items,
  currentUrl,
}: {
  locale: AppLocale;
  /** Trail after "Home", ending with the current page. */
  items: TrailItem[];
  /** Absolute URL of the current page (lib/routes.ts). */
  currentUrl: string;
}) {
  const nav = await getTranslations({ locale, namespace: "nav" });
  const trail: TrailItem[] = [{ label: nav("home"), routeKey: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd(
          trail.map((item, index) => ({
            name: item.label,
            url:
              item.routeKey && index < trail.length - 1
                ? getAbsoluteUrl(item.routeKey, locale)
                : currentUrl,
          })),
        )}
      />
      <Breadcrumbs
        label={nav("breadcrumb")}
        items={trail.map((item, index) =>
          index === trail.length - 1 ? { label: item.label } : item,
        )}
      />
    </>
  );
}
