import { ArrowRight, TrendingUp } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { servicesList } from "@/content/services";
import { getServiceGroup, getServiceIcon } from "@/content/service-icons";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { IconTile } from "@/components/marketing/IconTile";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Homepage teaser for the digital marketing hub: a single card linking to
 * /digital-marknadsforing. Service names are shown as plain labels, not
 * links, since the whole card is already one link.
 */
export function DigitalMarketingSection({
  locale,
  eyebrow,
  heading,
  lead,
  ctaLabel,
}: {
  locale: AppLocale;
  eyebrow: string;
  heading: string;
  lead: string;
  ctaLabel: string;
}) {
  const digitalServices = servicesList.filter(
    (s) => getServiceGroup(s.key) === "digital",
  );

  return (
    <Section tone="base">
      <Container>
        <Reveal>
          <Link
            href="/digital-marknadsforing"
            className="group focus-visible:ring-ring mx-auto block max-w-5xl rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
          >
            <Card className="ring-border group-hover:ring-primary/30 bg-secondary/40 relative gap-0 overflow-hidden p-8 ring-1 transition-all duration-200 ease-(--ease-standard) group-hover:-translate-y-1 group-hover:shadow-md sm:p-10">
              <TrendingUp
                aria-hidden="true"
                className="text-primary/[0.06] pointer-events-none absolute -end-6 -bottom-6 size-48"
              />
              <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div className="flex flex-col gap-4">
                  <IconTile icon={TrendingUp} size="lg" />
                  <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                    {eyebrow}
                  </span>
                  <h2 className="text-section-h2 font-semibold text-balance">
                    {heading}
                  </h2>
                  <p className="text-muted-foreground text-body">{lead}</p>
                  <span className="text-primary mt-2 inline-flex items-center gap-1.5 font-semibold">
                    {ctaLabel}
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    />
                  </span>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {digitalServices.map((service) => {
                    const Icon = getServiceIcon(service.key);
                    return (
                      <li
                        key={service.key}
                        className="bg-card border-border flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium"
                      >
                        <Icon
                          size={16}
                          aria-hidden="true"
                          className="text-primary shrink-0"
                        />
                        {getLocalized(service.name, locale)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
