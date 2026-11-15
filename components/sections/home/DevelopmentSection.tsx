import { ArrowRight, Code2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/i18n-content";
import { getOfferingServices } from "@/lib/service-lookup";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { buttonVariants } from "@/components/ui/button";
import type { SectionProps } from "../types";
import { OfferingImage, OfferingSection } from "./OfferingSection";

/** Systemutveckling: heading and image, then the development services as cards. */
export async function DevelopmentSection({ locale, content }: SectionProps) {
  const common = await getTranslations({ locale, namespace: "common" });
  const { text, images } = content;
  const developmentServices = getOfferingServices("utveckling");

  return (
    <OfferingSection
      id="utveckling"
      tone="tint"
      eyebrow={getLocalized(text.developmentEyebrow, locale)}
      title={getLocalized(text.developmentTitle, locale)}
      lead={getLocalized(text.developmentLead, locale)}
      actions={
        <Link
          href="/systemutveckling"
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "gap-2",
          })}
        >
          {getLocalized(text.developmentCta, locale)}
          <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
        </Link>
      }
      visual={
        images.developmentImage ? (
          <OfferingImage image={images.developmentImage} locale={locale} />
        ) : (
          <AbstractDocumentPanel icon={Code2} tone="light" />
        )
      }
      imageSide="start"
    >
      <RevealGroup step={50} className="grid gap-4 sm:grid-cols-2">
        {developmentServices.map((service) => (
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
