import type { Metadata } from "next";
import Image from "next/image";
import { FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { IconTile } from "@/components/marketing/IconTile";
import { Button } from "@/components/ui/button";
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
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <Container size="wide" className="py-12 sm:py-16">
      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("insights") },
        ]}
      />
      <Reveal>
        <h1 className="text-page-h1 mt-4 font-semibold text-balance">
          {nav("insights")}
        </h1>
      </Reveal>

      {articles.length === 0 ? (
        <Reveal delay={80}>
          <div className="border-border bg-card mt-8 flex flex-col items-center gap-3 rounded-2xl border p-10 text-center">
            <IconTile icon={FileText} />
            <p className="text-muted-foreground text-body max-w-md">
              {getLocalized(comingSoon, locale)}
            </p>
            <Button render={<Link href="/tjanster" />} variant="outline">
              {nav("services")}
            </Button>
          </div>
        </Reveal>
      ) : (
        <RevealGroup
          step={80}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={{
                pathname: "/artiklar/[slug]",
                params: {
                  slug: article.slug[locale] ?? article.slug.sv,
                },
              }}
              className="group focus-visible:ring-ring block h-full rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
            >
              <article className="border-border bg-card ring-border group-hover:ring-primary/30 flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm ring-1 transition-all duration-200 ease-(--ease-standard) group-hover:-translate-y-1 group-hover:shadow-md">
                {article.coverImage && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={article.coverImage.src}
                      alt={getLocalized(article.coverImage.alt, locale)}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h2 className="text-lg font-semibold text-balance">
                    {getLocalized(article.title, locale)}
                  </h2>
                  <p className="text-muted-foreground text-body">
                    {getLocalized(article.excerpt, locale)}
                  </p>
                  <p className="text-muted-foreground mt-auto pt-2 text-xs">
                    {common("lastReviewed")}: {article.publishedAt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </RevealGroup>
      )}
    </Container>
  );
}
