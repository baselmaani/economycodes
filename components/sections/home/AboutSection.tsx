import { getTranslations } from "next-intl/server";

import { getLocalized } from "@/lib/i18n-content";
import { getPerson } from "@/lib/cms/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PersonProfileCard } from "@/components/marketing/PersonProfileCard";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "../types";

/** About Hadi: profile card with his credentials. */
export async function AboutSection({ locale, content }: SectionProps) {
  const [common, person] = await Promise.all([
    getTranslations({ locale, namespace: "common" }),
    getPerson(),
  ]);
  const { text } = content;
  // Same field as the trust section's personal card ("A · B").
  const credentials = getLocalized(text.personCredentials, locale)
    .split("·")
    .map((credential) => credential.trim())
    .filter(Boolean);

  return (
    <Section tone="tint">
      <Container size="narrow">
        <Reveal>
          <h2 className="text-section-h2 mb-8 font-semibold text-balance">
            {getLocalized(text.aboutTitle, locale)}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="border-border bg-card rounded-3xl border p-8 shadow-md sm:p-10">
            <PersonProfileCard
              person={person}
              locale={locale}
              learnMoreLabel={common("learnMore")}
              facebookLabel={common("facebook")}
            />
            <div className="border-border mt-6 flex flex-wrap gap-2 border-t pt-6">
              {credentials.map((credential) => (
                <span
                  key={credential}
                  dir="ltr"
                  className="border-border bg-secondary/40 text-secondary-foreground rounded-full border px-3 py-1 text-sm font-medium"
                >
                  {credential}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
