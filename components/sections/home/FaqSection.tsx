import { getLocalized } from "@/lib/i18n-content";
import { getFaqs } from "@/lib/cms/site";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "../types";

/** Global FAQs in two columns, plus their FAQPage structured data. */
export async function FaqSection({ locale, content }: SectionProps) {
  const faqs = (await getFaqs()).filter((faq) => faq.scope === "global");
  if (faqs.length === 0) return null;
  const half = Math.ceil(faqs.length / 2);

  return (
    <Section tone="base">
      <JsonLd data={buildFaqJsonLd(faqs, locale)} />
      <Container size="wide">
        <Reveal>
          <h2 className="text-section-h2 text-center font-semibold text-balance">
            {getLocalized(content.text.faqTitle, locale)}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            <FaqAccordion faqs={faqs.slice(0, half)} locale={locale} />
            <FaqAccordion faqs={faqs.slice(half)} locale={locale} />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
