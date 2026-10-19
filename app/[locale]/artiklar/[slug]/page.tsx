import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  getAbsoluteUrl,
  getArticleAlternateLinks,
  getArticleSlug,
  getServiceSlug,
} from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getArticleBySlug, getPublishedArticles } from "@/lib/cms/content";
import { absoluteImageUrl, getArticleSeo } from "@/lib/cms/metadata";
import { getArticleOgImageUrl } from "@/lib/seo/og-image";
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
import { faqs } from "@/content/faqs";
import { getRelatedServicesForArticle } from "@/lib/related-content";
import { hadi } from "@/content/people";

interface ArticlePageParams {
  locale: AppLocale;
  slug: string;
}

// Articles published after the build are rendered on first request
// (dynamicParams defaults to true) and cached until the dashboard
// invalidates the "cms:articles" tag.
export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.flatMap((article) =>
    routing.locales.map((locale) => ({
      locale,
      slug: getArticleSlug(locale, article),
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticlePageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(locale, slug);
  if (!article) return {};

  const { title, description } = getArticleSeo(article, locale);
  const meta = buildMetadata({
    locale,
    title,
    description,
    alternates: getArticleAlternateLinks(article),
    ogImage: article.seo.ogImage
      ? absoluteImageUrl(article.seo.ogImage.src)
      : getArticleOgImageUrl(locale, slug),
    noindex: article.seo.noindex,
    article: {
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [getAbsoluteUrl("/om-hadi", locale)],
    },
  });
  // Article headlines are already 55-80 characters; the layout's
  // " | Economy Codes" suffix would push them past what search results show.
  return { ...meta, title: { absolute: title } };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<ArticlePageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = await getArticleBySlug(locale, slug);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const alternates = getArticleAlternateLinks(article);
  const body = article.body;
  const articleFaqs = faqs.filter((faq) => article.faqIds?.includes(faq.id));
  const relatedServices = getRelatedServicesForArticle(article);

  return (
    <Container
      as="article"
      size="content"
      className="prose prose-neutral py-12 sm:py-16"
    >
      <JsonLd
        data={buildArticleJsonLd(
          article,
          hadi,
          locale,
          alternates[locale],
          getAbsoluteUrl("/om-hadi", locale),
        )}
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
          {t("published")}:{" "}
          <time dateTime={article.publishedAt}>{article.publishedAt}</time>
          {article.updatedAt && article.updatedAt !== article.publishedAt && (
            <>
              {" · "}
              {t("lastReviewed")}:{" "}
              <time dateTime={article.updatedAt}>{article.updatedAt}</time>
            </>
          )}
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
      {relatedServices.length > 0 && (
        <section className="not-prose mt-12">
          <h2 className="text-lg font-semibold">{nav("services")}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedServices.map((service) => (
              <li key={service.key}>
                <Link
                  href={{
                    pathname: "/tjanster/[slug]",
                    params: { slug: getServiceSlug(locale, service) },
                  }}
                  className="border-border bg-card hover:border-primary/40 block h-full rounded-2xl border p-5 transition-colors"
                >
                  <span className="font-semibold">
                    {getLocalized(service.name, locale)}
                  </span>
                  <span className="text-muted-foreground mt-1 block text-sm">
                    {getLocalized(service.teaser, locale)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="not-prose border-border mt-12 border-t pt-8">
        <PersonProfileCard
          person={hadi}
          locale={locale}
          learnMoreLabel={t("learnMore")}
          facebookLabel={t("facebook")}
          compact
        />
      </div>
    </Container>
  );
}
