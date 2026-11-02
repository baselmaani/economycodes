import type { ReactNode } from "react";
import { Building2, Info, UserCheck } from "lucide-react";

import { getLocalized } from "@/lib/i18n-content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "../types";

function CredentialPill({ children }: { children: ReactNode }) {
  return (
    <span
      dir="ltr"
      className="border-primary/20 text-primary inline-block w-fit rounded-full border-2 px-4 py-1.5 text-sm font-semibold"
    >
      {children}
    </span>
  );
}

/** Verified authorization: the firm's and Hadi's credentials. */
export function TrustSection({ locale, content }: SectionProps) {
  const { text } = content;

  return (
    <Section tone="tint" bleed>
      <GridPattern className="inset-0 hidden size-full sm:block" />
      <RadialGlow className="-end-32 -top-24 size-[28rem] opacity-10" />

      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeading
            eyebrow={getLocalized(text.trustEyebrow, locale)}
            title={getLocalized(text.trustTitle, locale)}
            lead={getLocalized(text.trustIntro, locale)}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal delay={120}>
            <FeatureCard>
              <IconTile icon={Building2} tone="primary" size="lg" />
              <CredentialPill>
                {getLocalized(text.firmCredential, locale)}
              </CredentialPill>
              <p className="text-muted-foreground text-body">
                {getLocalized(text.firmBody, locale)}
              </p>
            </FeatureCard>
          </Reveal>

          <Reveal delay={200}>
            <FeatureCard>
              <IconTile icon={UserCheck} tone="primary" size="lg" />
              <CredentialPill>
                {getLocalized(text.personCredentials, locale)}
              </CredentialPill>
              <p className="text-muted-foreground text-body">
                {getLocalized(text.personBody, locale)}
              </p>
            </FeatureCard>
          </Reveal>
        </div>

        <Reveal delay={280}>
          <div className="border-border bg-secondary/40 mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border p-5">
            <Info
              size={18}
              className="text-primary mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-muted-foreground text-sm">
              {getLocalized(text.issuingBodyNote, locale)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
