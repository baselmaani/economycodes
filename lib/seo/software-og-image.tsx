import { isRtlLocale, routing, type AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { renderOgImage } from "@/lib/seo/render-og-image";
import type { SoftwarePageKey } from "@/content/software";
import {
  softwareCommon,
  softwareOverview,
  softwareSubpages,
} from "@/content/software-pages";

/** Locale params for a /bokforingsprogram page's opengraph-image route. */
export function softwareOgStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** The page's own OG card: section eyebrow plus the page heading. */
export function renderSoftwareOgImage(key: SoftwarePageKey, locale: AppLocale) {
  const hero =
    key === "overview" ? softwareOverview.hero : softwareSubpages[key].hero;
  return renderOgImage({
    eyebrow: getLocalized(softwareCommon.eyebrow, locale),
    title: getLocalized(hero.title, locale),
    rtl: isRtlLocale(locale),
  });
}
