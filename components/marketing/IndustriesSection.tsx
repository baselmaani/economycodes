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
import { Reveal } from "@/components/motion/Reveal";

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
        <Reveal>
          <SectionHeading
            title={heading}
            lead={getLocalized(industriesContent.lead, locale)}
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="border-border bg-card relative mt-10 flex flex-col gap-6 overflow-hidden rounded-3xl border p-8 sm:flex-row sm:items-center sm:p-10">
            <Car
              aria-hidden="true"
              className="text-primary/[0.05] pointer-events-none absolute -end-6 -bottom-6 size-40"
            />
            <IconTile
              icon={Car}
              size="lg"
              className="relative shrink-0 rounded-3xl"
            />
            <div className="relative flex flex-1 flex-col gap-2">
              <h3 className="text-xl font-semibold">
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
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="rtl:rotate-180"
                />
              </Link>
            </div>
          </div>
        </Reveal>

        <p className="text-muted-foreground text-body mt-6">
          {getLocalized(industriesContent.otherTrades, locale)}{" "}
          <Link
            href="/kontakt"
            className="text-primary font-medium hover:underline"
          >
            {contactLabel}
          </Link>
        </p>
      </Container>
    </Section>
  );
}
