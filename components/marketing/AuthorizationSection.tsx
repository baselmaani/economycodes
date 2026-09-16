import type { ReactNode } from "react";
import { Building2, Info, UserCheck } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { authorizationContent } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { Reveal } from "@/components/motion/Reveal";

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

export function AuthorizationSection({
  locale,
  heading,
}: {
  locale: AppLocale;
  heading: string;
}) {
  return (
    <Section tone="tint" bleed>
      <GridPattern className="inset-0 hidden size-full sm:block" />
      <RadialGlow className="-end-32 -top-24 size-[28rem] opacity-10" />

      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeading
            eyebrow={authorizationContent.issuingBody.name}
            title={heading}
            lead={getLocalized(authorizationContent.intro, locale)}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal delay={120}>
            <FeatureCard>
              <IconTile icon={Building2} tone="primary" size="lg" />
              <CredentialPill>{authorizationContent.firm.credential}</CredentialPill>
              <p className="text-muted-foreground text-body">
                {getLocalized(authorizationContent.firm.body, locale)}
              </p>
            </FeatureCard>
          </Reveal>

          <Reveal delay={200}>
            <FeatureCard>
              <IconTile icon={UserCheck} tone="primary" size="lg" />
              <CredentialPill>
                {authorizationContent.person.credentials.join(" · ")}
              </CredentialPill>
              <p className="text-muted-foreground text-body">
                {getLocalized(authorizationContent.person.body, locale)}
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
              {getLocalized(authorizationContent.issuingBody.description, locale)}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
