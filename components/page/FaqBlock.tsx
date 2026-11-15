import type { AppLocale } from "@/i18n/routing";
import type { Faq } from "@/content/types";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";

/**
 * FAQ section plus its FAQPage JSON-LD, so structured data only ever
 * describes questions that are visible on the page.
 */
export function FaqBlock({
  faqs,
  locale,
  title,
  tone = "base",
  id,
}: {
  faqs: Pick<Faq, "id" | "question" | "answer">[];
  locale: AppLocale;
  title: string;
  tone?: "base" | "tint";
  id?: string;
}) {
  if (faqs.length === 0) return null;
  return (
    <Section tone={tone} id={id} className="scroll-mt-20">
      <JsonLd data={buildFaqJsonLd(faqs, locale)} />
      <Container size="content">
        <Reveal>
          <h2 className="text-section-h2 text-center font-semibold text-balance">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10">
            <FaqAccordion faqs={faqs} locale={locale} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
