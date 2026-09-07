import { ShieldCheck } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { authorizationContent } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { Reveal } from "@/components/motion/Reveal";

export function AuthorizationSection({
  locale,
  heading,
}: {
  locale: AppLocale;
  heading: string;
}) {
  return (
    <Section tone="tint">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow={authorizationContent.issuingBody.name}
              title={heading}
              lead={getLocalized(authorizationContent.intro, locale)}
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="border-border bg-card rounded-2xl border p-8 shadow-md">
              <IconTile icon={ShieldCheck} size="lg" className="mx-auto" />
              <div className="mt-5 text-center">
                <span
                  dir="ltr"
                  className="border-primary/20 text-primary inline-block rounded-full border-2 px-4 py-1.5 text-sm font-semibold"
                >
                  {authorizationContent.firm.credential}
                </span>
              </div>
              <p className="text-muted-foreground text-body mt-4 text-center">
                {getLocalized(authorizationContent.firm.body, locale)}
              </p>

              <div className="via-border my-6 h-px bg-gradient-to-r from-transparent to-transparent" />

              <span className="block text-center font-semibold" dir="ltr">
                {authorizationContent.person.credentials.join(" · ")}
              </span>
              <p className="text-muted-foreground text-body mt-3 text-center">
                {getLocalized(authorizationContent.person.body, locale)}
              </p>
            </div>
          </Reveal>
        </div>

        <p className="text-muted-foreground text-body mx-auto mt-10 max-w-2xl text-center">
          {getLocalized(authorizationContent.issuingBody.description, locale)}
        </p>
      </Container>
    </Section>
  );
}
