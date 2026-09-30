import { getTranslations } from "next-intl/server";

import { isRtlLocale, routing, type AppLocale } from "@/i18n/routing";
import { alt, contentType, size } from "@/lib/seo/og-image";
import { renderOgImage } from "@/lib/seo/render-og-image";

export { alt, contentType, size };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  const rtl = isRtlLocale(locale);

  return renderOgImage({ title: nav("digitalMarketing"), rtl });
}
