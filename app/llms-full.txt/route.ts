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
  type CmsArticle,
  type CmsService,
} from "@/lib/cms/content";
import { getFaqs } from "@/lib/cms/site";
import { llmsIntro } from "@/lib/llms";

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

/**
 * The full text behind /llms.txt: every service, FAQ and published article,
 * per language, so answer engines can quote the site without crawling it.
 */
export async function GET() {
  const [services, articles, faqs] = await Promise.all([
    Promise.all(servicesList.map((service) => getServiceContent(service))),
    getPublishedArticles(),
    getFaqs(),
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
