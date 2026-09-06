import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { authorizationContent } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function WhyAuthorizedSection({
  locale,
  heading,
  subheading,
}: {
  locale: AppLocale;
  heading: string;
  subheading: string;
}) {
  return (
    <Section tone="tint">
      <Container size="narrow">
        <div className="border-primary/30 relative mx-auto max-w-2xl border-s-2 ps-6 sm:ps-8">
          <h2 className="text-section-h2 font-semibold text-balance">{heading}</h2>
          <h3 className="text-primary mt-6 text-lg font-semibold">{subheading}</h3>
          <p className="text-muted-foreground text-body mt-4">
            {getLocalized(authorizationContent.consultantVsAuditor, locale)}
          </p>
        </div>
      </Container>
    </Section>
  );
}
