import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getArticleAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildArticleJsonLd } from "@/lib/structured-data/article";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { articles } from "@/content/articles/meta";
import { hadi } from "@/content/people";

interface ArticlePageParams {
  locale: AppLocale;
  slug: string;
}

export function generateStaticParams() {
  // No articles exist yet (content/articles/meta.ts is empty) -- this
  // becomes non-empty automatically once entries are added there.
  return articles.flatMap((article) =>
    (["sv", "en", "ar"] as const).map((locale) => ({
      locale,
      slug: article.slug[locale] ?? article.slug.sv,
    })),
  );
}

// See lib/service-lookup.ts's decodeSlug for why this defensive decode exists
// (Next 16.3.4 + Turbopack doesn't always URL-decode non-ASCII dynamic segments).
function resolveArticle(locale: AppLocale, slug: string) {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // slug was already decoded; use as-is
  }
  return articles.find((a) => (a.slug[locale] ?? a.slug.sv) === decoded);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticlePageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = resolveArticle(locale, slug);
  if (!article) return {};

  return buildMetadata({
    locale,
    title: getLocalized(article.title, locale),
    description: getLocalized(article.excerpt, locale),
    alternates: getArticleAlternateLinks(article),
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<ArticlePageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = resolveArticle(locale, slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const alternates = getArticleAlternateLinks(article);

  // Body content will live at content/articles/body/<locale>/<slug>.ts,
  // loaded here once real articles are authored (content/articles/meta.ts
  // is currently empty, so this branch is never reached yet).
  const body: { type: string; text?: string }[] = [];

  return (
    <Container
      as="article"
      size="content"
      className="prose prose-neutral py-12 sm:py-16"
    >
      <JsonLd
        data={buildArticleJsonLd(article, hadi, locale, alternates[locale])}
      />
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("insights"), routeKey: "/artiklar" },
          { label: getLocalized(article.title, locale) },
        ]}
      />
      <h1>{getLocalized(article.title, locale)}</h1>
      <p className="text-muted-foreground text-sm">
        {t("lastReviewed")}: {article.publishedAt}
      </p>
      {body.map((block, index) =>
        block.type === "paragraph" ? <p key={index}>{block.text}</p> : null,
      )}
    </Container>
  );
}
