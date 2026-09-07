import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getAbsoluteUrl, getArticleAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildArticleJsonLd } from "@/lib/structured-data/article";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { ArticleBody } from "@/components/content/ArticleBody";
import { PersonProfileCard } from "@/components/marketing/PersonProfileCard";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { articles } from "@/content/articles/meta";
import { articleBodies } from "@/content/articles/body";
import { faqs } from "@/content/faqs";
import { hadi } from "@/content/people";

interface ArticlePageParams {
  locale: AppLocale;
  slug: string;
}

export function generateStaticParams() {
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
  const body = articleBodies[article.id];
  const articleFaqs = faqs.filter((faq) => article.faqIds?.includes(faq.id));

  return (
    <Container
      as="article"
      size="content"
      className="prose prose-neutral py-12 sm:py-16"
    >
      <JsonLd
        data={buildArticleJsonLd(article, hadi, locale, alternates[locale])}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: nav("insights"), url: getAbsoluteUrl("/artiklar", locale) },
          {
            name: getLocalized(article.title, locale),
            url: alternates[locale],
          },
        ])}
      />
      {articleFaqs.length > 0 && (
        <JsonLd data={buildFaqJsonLd(articleFaqs, locale)} />
      )}
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("insights"), routeKey: "/artiklar" },
          { label: getLocalized(article.title, locale) },
        ]}
      />
      <Reveal>
        <h1>{getLocalized(article.title, locale)}</h1>
        <p className="text-muted-foreground not-prose text-sm">
          <Link href="/om-hadi" className="text-primary hover:underline">
            {hadi.name}
          </Link>
          {" — "}
          {getLocalized(hadi.title, locale)}
          {" · "}
          {t("lastReviewed")}: {article.publishedAt}
        </p>
        {body && <ArticleBody blocks={getLocalized(body, locale)} />}
      </Reveal>
      {articleFaqs.length > 0 && (
        <Reveal className="not-prose mt-12">
          <h2 className="text-lg font-semibold">{t("faqTitle")}</h2>
          <div className="mt-4">
            <FaqAccordion faqs={articleFaqs} locale={locale} />
          </div>
        </Reveal>
      )}
      <div className="not-prose border-border mt-12 border-t pt-8">
        <PersonProfileCard
          person={hadi}
          locale={locale}
          learnMoreLabel={t("learnMore")}
          compact
        />
      </div>
    </Container>
  );
}
