import type { AppLocale } from "@/i18n/routing";
import { APP_LOGIN_URL } from "@/content/software";
import { AREA_SERVED, AVAILABLE_LANGUAGES, orgRef } from "./ids";
import { siteUrl } from "@/lib/site";

export const SOFTWARE_ID = `${siteUrl}/#software`;

/**
 * The Economy Codes accounting app as a SoftwareApplication, published by the
 * site's Organization node. No `offers`: there is no public price list.
 */
export function buildSoftwareApplicationJsonLd({
  locale,
  name,
  description,
  url,
  features,
  screenshot,
}: {
  locale: AppLocale;
  name: string;
  description: string;
  url: string;
  features: string[];
  screenshot?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software",
    operatingSystem: "Web",
    inLanguage: locale,
    availableLanguage: AVAILABLE_LANGUAGES,
    areaServed: AREA_SERVED,
    publisher: orgRef,
    provider: orgRef,
    featureList: features,
    ...(screenshot ? { screenshot } : {}),
    // The app itself, where customers sign in.
    sameAs: APP_LOGIN_URL,
  };
}
