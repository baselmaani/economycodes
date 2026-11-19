import type { ContentBlock, Faq } from "@/content/types";
import { routing, type AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import {
  getArticleAlternateLinks,
  getServiceAlternateLinks,
  servicesList,
} from "@/lib/routes";
import {
  getPublishedArticles,
  getServiceContent,
  getSoftwareOverviewContent,
  getSoftwareSubpageContent,
  type CmsArticle,
  type CmsService,
} from "@/lib/cms/content";
import { getFaqs } from "@/lib/cms/site";
import { llmsIntro } from "@/lib/llms";
import { getAbsoluteUrl } from "@/lib/routes";
import { liveSoftwarePages, softwarePages } from "@/content/software";
import { softwareSubpages } from "@/content/software-pages";
import type { SoftwareFaq } from "@/content/software-pages";
import type { SoftwareOverviewContent } from "@/lib/cms/software-content";

// Same cadence as /llms.txt, so dashboard edits show up without a rebuild.
export const revalidate = 3600;

const LANGUAGE_NAMES: Record<AppLocale, string> = {
  sv: "Svenska",
  en: "English",
  ar: "العربية",
};

function blocksToMarkdown(blocks: ContentBlock[]): string[] {
  return blocks.map((block) => {
    switch (block.type) {
      case "heading":
        // Nested under the page's own "###" heading.
        return `${"#".repeat(block.level + 2)} ${block.text}`;
      case "list":
        return block.items.map((item) => `- ${item}`).join("\n");
      case "disclaimer":
        return `> ${block.text}`;
      default:
        return block.text;
    }
  });
}

function bulletList(title: string, items: string[]): string[] {
  return items.length === 0
    ? []
    : [`**${title}**`, items.map((item) => `- ${item}`).join("\n")];
}

function faqsToMarkdown(faqs: Faq[], locale: AppLocale): string[] {
  return faqs.map(
    (faq) =>
      `**${getLocalized(faq.question, locale)}**\n${getLocalized(faq.answer, locale)}`,
  );
}

function serviceSection(
  service: CmsService,
  faqs: Faq[],
  locale: AppLocale,
): string {
  const url = getServiceAlternateLinks(service)[locale];
  return [
    `### ${getLocalized(service.heading, locale)}`,
    `URL: ${url}`,
    getLocalized(service.summary, locale),
    ...bulletList("Who it's for", getLocalized(service.whoItsFor, locale)),
    ...bulletList(
      "What's included",
      getLocalized(service.whatsIncluded, locale),
    ),
    ...bulletList("How it works", getLocalized(service.process, locale)),
    ...bulletList(
      "What to prepare",
      getLocalized(service.whatToPrepare, locale),
    ),
    ...blocksToMarkdown(getLocalized(service.body, locale)),
    ...faqsToMarkdown(
      faqs.filter((faq) => service.faqIds.includes(faq.id)),
      locale,
    ),
  ].join("\n\n");
}

function articleSection(
  article: CmsArticle,
  faqs: Faq[],
  locale: AppLocale,
): string {
  const url = getArticleAlternateLinks(article)[locale];
  const updated = article.updatedAt ?? article.publishedAt;
  return [
    `### ${getLocalized(article.title, locale)}`,
    `URL: ${url}\nUpdated: ${updated}`,
    getLocalized(article.excerpt, locale),
    ...blocksToMarkdown(getLocalized(article.body, locale)),
    ...faqsToMarkdown(
      faqs.filter((faq) => article.faqIds?.includes(faq.id)),
      locale,
    ),
  ].join("\n\n");
}

/** The accounting software: overview, features, integrations and the live pages' FAQs. */
async function loadSoftware(): Promise<{
  overview: SoftwareOverviewContent;
  subpageFaqs: SoftwareFaq[];
}> {
  const live = liveSoftwarePages().filter(
    (page) => page.key in softwareSubpages,
  );
  const [overview, subpages] = await Promise.all([
    getSoftwareOverviewContent(),
    Promise.all(
      live.map((page) =>
        getSoftwareSubpageContent(page.key as keyof typeof softwareSubpages),
      ),
    ),
  ]);
  return { overview, subpageFaqs: subpages.flatMap((page) => page.faqs) };
}

function softwareSection(
  locale: AppLocale,
  {
    overview: softwareOverview,
    subpageFaqs,
  }: Awaited<ReturnType<typeof loadSoftware>>,
): string {
  const softwareIntegrations = softwareOverview.integrations;
  return [
    `### ${getLocalized(softwareOverview.hero.title, locale)}`,
    `URL: ${getAbsoluteUrl(softwarePages.overview.route, locale)}`,
    getLocalized(softwareOverview.hero.lead, locale),
    ...bulletList(
      getLocalized(softwareOverview.featuresTitle, locale),
      softwareOverview.features.map(
        (feature) =>
          `${getLocalized(feature.title, locale)}: ${getLocalized(feature.body, locale)}`,
      ),
    ),
    ...bulletList(
      getLocalized(softwareIntegrations.title, locale),
      softwareIntegrations.items.map(
        (item) =>
          `${getLocalized(item.name, locale)}: ${getLocalized(item.what, locale)} ${getLocalized(item.who, locale)}`,
      ),
    ),
    ...[...softwareOverview.faqs, ...subpageFaqs].map(
      (faq) =>
        `**${getLocalized(faq.question, locale)}**\n${getLocalized(faq.answer, locale)}`,
    ),
  ].join("\n\n");
}

/**
 * The full text behind /llms.txt: every service, FAQ and published article,
 * per language, so answer engines can quote the site without crawling it.
 */
export async function GET() {
  const [services, articles, faqs, software] = await Promise.all([
    Promise.all(servicesList.map((service) => getServiceContent(service))),
    getPublishedArticles(),
    getFaqs(),
    loadSoftware(),
  ]);
  const indexedArticles = articles.filter((article) => !article.seo.noindex);
  const generalFaqs = faqs.filter(
    (faq) => faq.scope === "global" || faq.scope === "digital",
  );

  const sections = routing.locales.map((locale) =>
    [
      `## ${LANGUAGE_NAMES[locale]}`,
      ...faqsToMarkdown(generalFaqs, locale),
      ...services.map((service) => serviceSection(service, faqs, locale)),
      softwareSection(locale, software),
      ...indexedArticles.map((article) =>
        articleSection(article, faqs, locale),
      ),
    ].join("\n\n"),
  );

  const body = `${llmsIntro()}\n\n${sections.join("\n\n")}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
