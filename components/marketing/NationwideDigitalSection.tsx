import { CheckCircle2 } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { digitalNationwideContent, whoWeHelp } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { Reveal } from "@/components/motion/Reveal";
import { RevealLine } from "@/components/motion/RevealLine";

export function NationwideDigitalSection({
  locale,
  heading,
  whoWeHelpHeading,
}: {
  locale: AppLocale;
  heading: string;
  whoWeHelpHeading: string;
}) {
  const points = getLocalized(digitalNationwideContent.points, locale);

  return (
    <Section tone="base">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="max-w-2xl">
            <Reveal>
              <SectionHeading
                align="start"
                title={heading}
                lead={getLocalized(digitalNationwideContent.body, locale)}
              />
            </Reveal>

            <div className="border-border mt-10 border-t pt-8">
              <h3 className="text-sm font-semibold tracking-wide uppercase">
                {whoWeHelpHeading}
              </h3>
              <Reveal delay={80}>
                <div className="mt-4 flex flex-wrap gap-2">
                  {getLocalized(whoWeHelp, locale).map((item) => (
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
              {points.map((item) => (
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
