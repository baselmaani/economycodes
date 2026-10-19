import { faqs } from "@/content/faqs";
import { services } from "@/content/services";
import type { ArticleMeta } from "@/content/articles/types";
import type { Service } from "@/content/types";

/**
 * Services and articles are linked through the FAQs they share: an article
 * citing "faq-payroll-what" relates to the payroll service. This keeps the
 * cross-links working for dashboard-edited articles without a new DB field.
 */
function serviceKeysForFaqIds(faqIds: readonly string[] = []): string[] {
  const keys = new Set<string>();
  for (const faq of faqs) {
    if (
      faqIds.includes(faq.id) &&
      typeof faq.scope === "object" &&
      "serviceKey" in faq.scope
    ) {
      keys.add(faq.scope.serviceKey);
    }
  }
  return [...keys];
}

/** Services an article relates to, in the order its FAQs first mention them. */
export function getRelatedServicesForArticle(article: ArticleMeta): Service[] {
  return serviceKeysForFaqIds(article.faqIds)
    .map((key) => services[key])
    .filter((service): service is Service => Boolean(service));
}

/** Articles that relate to a service, newest first as given. */
export function getRelatedArticlesForService<T extends ArticleMeta>(
  articles: readonly T[],
  serviceKey: string,
): T[] {
  return articles.filter((article) =>
    serviceKeysForFaqIds(article.faqIds).includes(serviceKey),
  );
}
