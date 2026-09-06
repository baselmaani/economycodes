import type { AppLocale } from "@/i18n/routing";
import type { ArticleMeta } from "@/content/articles/types";
import type { PersonProfile } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";
import { siteUrl } from "@/lib/site";

export function buildArticleJsonLd(
  article: ArticleMeta,
  author: PersonProfile,
  locale: AppLocale,
  url: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: getLocalized(article.title, locale),
    description: getLocalized(article.excerpt, locale),
    datePublished: article.publishedAt,
    url,
    image: new URL(article.coverImage.src, siteUrl).toString(),
    author: {
      "@type": "Person",
      name: author.name,
    },
  };
}
