import { Scale, Users } from "lucide-react";

import { getLocalized } from "@/lib/i18n-content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "../types";

/** Why choose an authorized firm: consultant vs. auditor cards. */
export function WhySection({ locale, content }: SectionProps) {
  const { text } = content;
  const cards = [
    { icon: Users, label: text.consultantLabel, body: text.consultantBody },
    { icon: Scale, label: text.auditorLabel, body: text.auditorBody },
  ];

  return (
    <Section tone="base">
      <Container size="wide">
        <Reveal>
          <SectionHeading title={getLocalized(text.whyTitle, locale)} />
        </Reveal>
        <Reveal delay={80}>
          <p className="text-primary mx-auto mt-4 max-w-2xl text-center text-lg font-semibold text-balance">
            {getLocalized(text.whySubtitle, locale)}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {cards.map(({ icon, label, body }, index) => (
            <Reveal key={index} delay={160 + index * 80}>
              <FeatureCard>
                <IconTile icon={icon} tone="primary" size="lg" />
                <h3 className="text-lg font-semibold">
                  {getLocalized(label, locale)}
                </h3>
                <p className="text-muted-foreground text-body">
                  {getLocalized(body, locale)}
                </p>
              </FeatureCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <div className="border-primary/25 mx-auto mt-10 max-w-3xl border-s-2 ps-6 sm:ps-8">
            <p className="text-muted-foreground text-body">
              {getLocalized(text.whyNote, locale)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
