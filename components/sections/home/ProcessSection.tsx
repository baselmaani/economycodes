import { getLocalized } from "@/lib/i18n-content";
import { getCmsIcon } from "@/lib/cms/icons";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLine } from "@/components/motion/RevealLine";
import type { SectionProps } from "../types";

/** How the digital collaboration works: numbered steps. */
export function ProcessSection({ locale, content }: SectionProps) {
  const { text, collections } = content;

  return (
    <Section tone="tint">
      <Container size="wide">
        <Reveal>
          <SectionHeading title={getLocalized(text.processTitle, locale)} />
        </Reveal>
        <div className="relative mt-14">
          <RevealLine
            axis="x"
            className="absolute inset-x-[12%] top-6 hidden h-px lg:block"
          >
            <div className="bg-border h-full w-full" />
          </RevealLine>
          <RevealLine
            axis="y"
            className="absolute start-6 top-0 bottom-0 w-px lg:hidden"
          >
            <div className="bg-border h-full w-full" />
          </RevealLine>
          <Reveal delay={120}>
            <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {collections.processSteps.map((step, index) => {
                const StepIcon = getCmsIcon(step.icon?.sv);
                return (
                  <li
                    key={index}
                    className="relative flex flex-col gap-3 ps-12 lg:ps-0"
                  >
                    <div className="bg-background border-border lg:bg-primary/10 absolute start-0 top-0 flex size-9 items-center justify-center rounded-full border lg:static lg:mb-1 lg:size-11 lg:border-0">
                      <StepIcon
                        size={18}
                        className="text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      dir="ltr"
                      aria-hidden="true"
                      className="text-primary/15 -mb-2 text-5xl font-bold"
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
                );
              })}
            </ol>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
