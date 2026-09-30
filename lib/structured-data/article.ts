import type { AppLocale } from "@/i18n/routing";
import type { ArticleMeta } from "@/content/articles/types";
import type { PersonProfile } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";
import { siteUrl } from "@/lib/site";
import { PERSON_ID, orgRef } from "@/lib/structured-data/ids";

export function buildArticleJsonLd(
  article: ArticleMeta,
  author: PersonProfile,
  locale: AppLocale,
  url: string,
  authorUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: getLocalized(article.title, locale),
    description: getLocalized(article.excerpt, locale),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: locale,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: new URL(article.coverImage.src, siteUrl).toString(),
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: author.name,
      url: authorUrl,
    },
    publisher: orgRef,
  };
}
