import type { AppLocale } from "@/i18n/routing";
import type { Faq } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";

/** Only call this for FAQs that are actually visibly rendered on the page, per Google's FAQPage guidance. */
export function buildFaqJsonLd(faqs: Faq[], locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: getLocalized(faq.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: getLocalized(faq.answer, locale),
      },
    })),
  };
}
