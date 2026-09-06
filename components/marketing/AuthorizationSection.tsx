import { ShieldCheck } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { authorizationContent } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";

export function AuthorizationSection({
  locale,
  heading,
}: {
  locale: AppLocale;
  heading: string;
}) {
  return (
    <Section tone="base">
      <Container size="narrow">
        <SectionHeading
          eyebrow={authorizationContent.issuingBody.name}
          title={heading}
          lead={getLocalized(authorizationContent.intro, locale)}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="border-border bg-card rounded-2xl border p-6">
            <IconTile icon={ShieldCheck} className="mb-4" />
            <span className="block font-semibold" dir="ltr">
              {authorizationContent.firm.credential}
            </span>
            <p className="text-muted-foreground text-body mt-3">
              {getLocalized(authorizationContent.firm.body, locale)}
            </p>
          </div>
          <div className="border-border bg-card rounded-2xl border p-6">
            <IconTile icon={ShieldCheck} className="mb-4" />
            <span className="block font-semibold" dir="ltr">
              {authorizationContent.person.credentials.join(" · ")}
            </span>
            <p className="text-muted-foreground text-body mt-3">
              {getLocalized(authorizationContent.person.body, locale)}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground text-body mx-auto mt-8 max-w-2xl text-center">
          {getLocalized(authorizationContent.issuingBody.description, locale)}
        </p>
      </Container>
    </Section>
  );
}
