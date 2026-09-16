import { Scale, Users } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { authorizationContent } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { Reveal } from "@/components/motion/Reveal";

export function WhyAuthorizedSection({
  locale,
  heading,
  subheading,
}: {
  locale: AppLocale;
  heading: string;
  subheading: string;
}) {
  const { consultant, auditor, note } = authorizationContent.consultantVsAuditor;

  return (
    <Section tone="base">
      <Container size="wide">
        <Reveal>
          <SectionHeading title={heading} />
        </Reveal>
        <Reveal delay={80}>
          <p className="text-primary mx-auto mt-4 max-w-2xl text-center text-lg font-semibold text-balance">
            {subheading}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal delay={160}>
            <FeatureCard>
              <IconTile icon={Users} tone="primary" size="lg" />
              <h3 className="text-lg font-semibold">
                {getLocalized(consultant.label, locale)}
              </h3>
              <p className="text-muted-foreground text-body">
                {getLocalized(consultant.body, locale)}
              </p>
            </FeatureCard>
          </Reveal>

          <Reveal delay={240}>
            <FeatureCard>
              <IconTile icon={Scale} tone="primary" size="lg" />
              <h3 className="text-lg font-semibold">
                {getLocalized(auditor.label, locale)}
              </h3>
              <p className="text-muted-foreground text-body">
                {getLocalized(auditor.body, locale)}
              </p>
            </FeatureCard>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <div className="border-primary/25 mx-auto mt-10 max-w-3xl border-s-2 ps-6 sm:ps-8">
            <p className="text-muted-foreground text-body">
              {getLocalized(note, locale)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
