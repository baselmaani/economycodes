import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { articles } from "@/content/articles/meta";

const metaDescription = {
  sv: "Artiklar om redovisning, skatt och företagande i Sverige från Economy Codes.",
  en: "Articles about accounting, tax, and running a business in Sweden from Economy Codes.",
  ar: "مقالات حول المحاسبة والضرائب وإدارة الأعمال في السويد من Economy Codes.",
};

const comingSoon = {
  sv: "Vi arbetar på att publicera artiklar om redovisning, skatt och företagande i Sverige. Kom gärna tillbaka snart.",
  en: "We're working on publishing articles about accounting, tax, and running a business in Sweden. Please check back soon.",
  ar: "نعمل على نشر مقالات حول المحاسبة والضرائب وإدارة الأعمال في السويد. يرجى العودة قريبًا.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  return buildMetadata({
    locale,
    title: nav("insights"),
    description: getLocalized(metaDescription, locale),
    alternates: getAlternateLinks("/artiklar"),
  });
}

export default async function ArticlesIndexPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <Container size="content" className="py-12 sm:py-16">
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("insights") },
        ]}
      />
      <h1 className="text-page-h1 mt-4 font-semibold text-balance">
        {nav("insights")}
      </h1>

      {articles.length === 0 ? (
        <p className="text-muted-foreground text-body mt-6">
          {getLocalized(comingSoon, locale)}
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-6">
          {articles.map((article) => (
            <li key={article.id} className="border-border border-b pb-6">
              <Link
                href={{
                  pathname: "/artiklar/[slug]",
                  params: {
                    slug: article.slug[locale] ?? article.slug.sv,
                  },
                }}
                className="text-xl font-semibold hover:underline"
              >
                {getLocalized(article.title, locale)}
              </Link>
              <p className="text-muted-foreground text-body mt-2">
                {getLocalized(article.excerpt, locale)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
