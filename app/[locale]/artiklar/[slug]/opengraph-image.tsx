import { getTranslations } from "next-intl/server";

import { isRtlLocale, routing, type AppLocale } from "@/i18n/routing";
import { getArticleSlug, resolveArticleBySlug, articles } from "@/lib/routes";
import { getLocalized } from "@/lib/i18n-content";
import { alt, contentType, size } from "@/lib/seo/og-image";
import { renderOgImage } from "@/lib/seo/render-og-image";

export { alt, contentType, size };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({
      locale,
      slug: getArticleSlug(locale, article),
    })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: AppLocale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = resolveArticleBySlug(locale, slug);
  const rtl = isRtlLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });

  const title = article ? getLocalized(article.title, locale) : "";

  return renderOgImage({ eyebrow: nav("insights"), title, rtl });
}
