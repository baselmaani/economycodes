import { Languages } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceSlug } from "@/lib/routes";
import { languageSupportContent } from "@/content/home";
import { services } from "@/content/services";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { IconTile } from "@/components/marketing/IconTile";

export function LanguageSupportSection({
  locale,
  heading,
  linkLabel,
}: {
  locale: AppLocale;
  heading: string;
  linkLabel: string;
}) {
  const arabicService = services["arabic-speaking-accounting"];

  return (
    <Section tone="navy">
      <Container size="narrow" className="text-center">
        <IconTile icon={Languages} tone="white" className="mx-auto" />
        <h2 className="text-section-h2 mt-5 font-semibold text-balance">
          {heading}
        </h2>
        <p className="text-body mx-auto mt-4 max-w-2xl text-white/80">
          {getLocalized(languageSupportContent.body, locale)}
        </p>
        <p dir="ltr" className="mt-5 text-sm font-medium text-white/70">
          Svenska · English · العربية
        </p>
        <Link
          href={{
            pathname: "/tjanster/[slug]",
            params: { slug: getServiceSlug(locale, arabicService) },
          }}
          className="mt-6 inline-block text-sm font-medium text-white underline underline-offset-4 hover:text-white/80"
        >
          {linkLabel}
        </Link>
      </Container>
    </Section>
  );
}
