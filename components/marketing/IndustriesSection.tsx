import { ArrowRight, Car } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceSlug } from "@/lib/routes";
import { services } from "@/content/services";
import { industriesContent } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";

export function IndustriesSection({
  locale,
  heading,
  readMoreLabel,
  contactLabel,
}: {
  locale: AppLocale;
  heading: string;
  readMoreLabel: string;
  contactLabel: string;
}) {
  const carDealership = services["car-dealership-accounting"];

  return (
    <Section tone="base">
      <Container size="narrow">
        <SectionHeading
          title={heading}
          lead={getLocalized(industriesContent.lead, locale)}
        />

        <div className="border-border bg-card mt-10 flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-8">
          <IconTile icon={Car} size="default" className="size-14 shrink-0 rounded-2xl" />
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-lg font-semibold">
              {getLocalized(carDealership.name, locale)}
            </h3>
            <p className="text-muted-foreground text-body">
              {getLocalized(carDealership.summary, locale)}
            </p>
            <Link
              href={{
                pathname: "/tjanster/[slug]",
                params: { slug: getServiceSlug(locale, carDealership) },
              }}
              className="text-primary mt-1 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
            >
              {readMoreLabel}
              <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
            </Link>
          </div>
        </div>

        <p className="text-muted-foreground text-body mt-6">
          {getLocalized(industriesContent.otherTrades, locale)}{" "}
          <Link href="/kontakt" className="text-primary font-medium hover:underline">
            {contactLabel}
          </Link>
        </p>
      </Container>
    </Section>
  );
}
