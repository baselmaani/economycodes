import { getTranslations } from "next-intl/server";

import { getLocalized } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";
import { servicesList } from "@/content/services";
import {
  serviceGroups,
  getServiceGroup,
  type ServiceGroup,
} from "@/content/service-icons";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import type { SectionProps } from "../types";

const GROUP_ORDER: ServiceGroup[] = ["core", "advisory", "specialist"];

/** Accounting services overview, grouped. */
export async function ServicesSection({ locale, content }: SectionProps) {
  const common = await getTranslations({ locale, namespace: "common" });
  const { text } = content;
  const groupedServices = GROUP_ORDER.map((group) => ({
    group,
    label: serviceGroups[group][locale],
    services: servicesList.filter((s) => getServiceGroup(s.key) === group),
  })).filter((g) => g.services.length > 0);

  return (
    <Section tone="tint">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={getLocalized(text.servicesEyebrow, locale)}
            title={getLocalized(text.servicesTitle, locale)}
            lead={getLocalized(text.servicesLead, locale)}
          />
        </Reveal>
        <div className="mt-12 flex flex-col gap-12">
          {groupedServices.map(({ group, label, services }) => {
            const isCore = group === "core";
            return (
              <div key={group}>
                <h3 className="text-muted-foreground mb-5 text-sm font-semibold tracking-wide uppercase">
                  {label}
                </h3>
                <RevealGroup
                  step={60}
                  className={cn(
                    "grid gap-4",
                    isCore ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {services.map((service) => (
                    <ServiceCard
                      key={service.key}
                      service={service}
                      locale={locale}
                      readMoreLabel={common("readMore")}
                      featured={isCore}
                      size={isCore ? "lg" : "default"}
                    />
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
