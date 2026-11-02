import { CheckCircle2 } from "lucide-react";

import { getLocalized } from "@/lib/i18n-content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLine } from "@/components/motion/RevealLine";
import type { SectionProps } from "../types";

/** Digital accounting throughout Sweden + who we help. */
export function NationwideSection({ locale, content }: SectionProps) {
  const { text, lists } = content;

  return (
    <Section tone="base">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="max-w-2xl">
            <Reveal>
              <SectionHeading
                align="start"
                title={getLocalized(text.nationwideTitle, locale)}
                lead={getLocalized(text.nationwideBody, locale)}
              />
            </Reveal>

            <div className="border-border mt-10 border-t pt-8">
              <h3 className="text-sm font-semibold tracking-wide uppercase">
                {getLocalized(text.whoWeHelpTitle, locale)}
              </h3>
              <Reveal delay={80}>
                <div className="mt-4 flex flex-wrap gap-2">
                  {getLocalized(lists.whoWeHelp, locale).map((item) => (
                    <span
                      key={item}
                      className="border-border bg-secondary/40 text-secondary-foreground rounded-full border px-3 py-1.5 text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <div className="relative">
            <RevealLine
              axis="y"
              className="absolute start-[19px] top-2 bottom-2 w-px"
            >
              <div className="bg-border h-full w-full" />
            </RevealLine>
            <ul className="relative flex flex-col gap-6">
              {getLocalized(lists.nationwidePoints, locale).map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <IconTile
                    icon={CheckCircle2}
                    size="default"
                    tone="primary"
                    className="relative z-10"
                  />
                  <span className="text-body mt-2.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
