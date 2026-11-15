import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/i18n-content";
import { servicesList } from "@/content/services";
import { ACCOUNTING_GROUPS, groupServices } from "@/content/service-icons";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { buttonVariants } from "@/components/ui/button";
import type { SectionProps } from "../types";
import { OfferingImage, OfferingSection } from "./OfferingSection";

/** Redovisning: heading and image, then the accounting services grouped as cards. */
export async function ServicesSection({ locale, content }: SectionProps) {
  const common = await getTranslations({ locale, namespace: "common" });
  const { text, images } = content;
  const grouped = groupServices(servicesList, ACCOUNTING_GROUPS, locale);

  return (
    <OfferingSection
      id="redovisning"
      eyebrow={getLocalized(text.servicesEyebrow, locale)}
      title={getLocalized(text.servicesTitle, locale)}
      lead={getLocalized(text.servicesLead, locale)}
      actions={
        <Link
          href="/tjanster"
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "gap-2",
          })}
        >
          {getLocalized(text.servicesCta, locale)}
          <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
        </Link>
      }
      visual={<OfferingImage image={images.servicesImage} locale={locale} />}
      imageSide="end"
    >
      <div className="flex flex-col gap-12">
        {grouped.map(({ group, label, services }) => (
          <div key={group}>
            <h3 className="text-muted-foreground mb-5 text-sm font-semibold tracking-wide uppercase">
              {label}
            </h3>
            <RevealGroup
              step={60}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service) => (
                <ServiceCard
                  key={service.key}
                  service={service}
                  locale={locale}
                  readMoreLabel={common("readMore")}
                  showImage={false}
                />
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </OfferingSection>
  );
}
