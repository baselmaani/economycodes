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
  const rtl = isRtlLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });

  return renderOgImage({
    eyebrow: t("heroEyebrow"),
    title: "Economy Codes AB",
    rtl,
  });
}
