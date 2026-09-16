import { isRtlLocale, routing, type AppLocale } from "@/i18n/routing";
import { getServiceSlug, resolveServiceBySlug, servicesList } from "@/lib/routes";
import { getLocalized } from "@/lib/i18n-content";
import { alt, contentType, size } from "@/lib/seo/og-image";
import { renderOgImage } from "@/lib/seo/render-og-image";
import { getServiceGroup, serviceGroups } from "@/content/service-icons";

export { alt, contentType, size };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    servicesList.map((service) => ({
      locale,
      slug: getServiceSlug(locale, service),
    })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = resolveServiceBySlug(locale, slug);
  const rtl = isRtlLocale(locale);

  const eyebrow = service
    ? serviceGroups[getServiceGroup(service.key)][locale]
    : "";
  const title = service ? getLocalized(service.name, locale) : "";

  return renderOgImage({ eyebrow, title, rtl });
}
