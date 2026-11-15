import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/i18n-content";
import { servicesList } from "@/content/services";
import { isDigitalService } from "@/content/service-icons";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { buttonVariants } from "@/components/ui/button";
import type { SectionProps } from "../types";
import { OfferingImage, OfferingSection } from "./OfferingSection";

/** Digital marknadsföring: heading and image, then the marketing services as cards. */
export async function DigitalSection({ locale, content }: SectionProps) {
  const common = await getTranslations({ locale, namespace: "common" });
  const { text, images } = content;
  const digitalServices = servicesList.filter((s) => isDigitalService(s.key));

  return (
    <OfferingSection
      id="marknadsforing"
      tone="tint"
      eyebrow={getLocalized(text.digitalEyebrow, locale)}
      title={getLocalized(text.digitalTitle, locale)}
      lead={getLocalized(text.digitalLead, locale)}
      actions={
        <Link
          href="/digital-marknadsforing"
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "gap-2",
          })}
        >
          {getLocalized(text.digitalCta, locale)}
          <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
        </Link>
      }
      visual={<OfferingImage image={images.digitalImage} locale={locale} />}
      imageSide="start"
    >
      <RevealGroup
        step={50}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {digitalServices.map((service) => (
          <ServiceCard
            key={service.key}
            service={service}
            locale={locale}
            readMoreLabel={common("readMore")}
          />
        ))}
      </RevealGroup>
    </OfferingSection>
  );
}
