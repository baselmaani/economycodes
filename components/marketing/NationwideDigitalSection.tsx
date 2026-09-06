import { CheckCircle2 } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { digitalNationwideContent, whoWeHelp } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export function NationwideDigitalSection({
  locale,
  heading,
  whoWeHelpHeading,
}: {
  locale: AppLocale;
  heading: string;
  whoWeHelpHeading: string;
}) {
  return (
    <Section tone="base">
      <Container size="narrow">
        <SectionHeading
          align="start"
          title={heading}
          lead={getLocalized(digitalNationwideContent.body, locale)}
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {getLocalized(digitalNationwideContent.points, locale).map((item) => (
            <li key={item} className="text-body flex items-start gap-2">
              <CheckCircle2
                className="text-primary mt-0.5 shrink-0"
                size={18}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="border-border mt-10 border-t pt-8">
          <h3 className="text-sm font-semibold tracking-wide uppercase">
            {whoWeHelpHeading}
          </h3>
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
        </div>
      </Container>
    </Section>
  );
}
