import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import type { Localized } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Numbered "how it works" steps in a four-column grid. */
export function ProcessSteps({
  locale,
  title,
  lead,
  steps,
  tone = "base",
  id,
}: {
  locale: AppLocale;
  title: string;
  lead?: string;
  steps: { title: Localized<string>; body: Localized<string> }[];
  tone?: "base" | "tint";
  id?: string;
}) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-20">
      <Container size="wide">
        <Reveal>
          <SectionHeading title={title} lead={lead} />
        </Reveal>
        <Reveal delay={120}>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={index} className="flex flex-col gap-3">
                <span
                  dir="ltr"
                  aria-hidden="true"
                  className="text-primary/25 -mb-2 text-5xl font-bold"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-semibold">
                  {getLocalized(step.title, locale)}
                </h3>
                <p className="text-muted-foreground text-body">
                  {getLocalized(step.body, locale)}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
