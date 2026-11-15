import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  FileText,
  Landmark,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getLocalized } from "@/lib/i18n-content";
import { liveSoftwarePages, type SoftwarePageKey } from "@/content/software";
import { LinkCard } from "@/components/marketing/LinkCard";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { SoftwareCtas } from "@/components/software/SoftwareCtas";
import { SoftwareScreenshot } from "@/components/software/SoftwareScreenshot";
import type { SectionProps } from "../types";
import { OfferingImage, OfferingSection } from "./OfferingSection";

const FEATURE_ICONS: Partial<Record<SoftwarePageKey, LucideIcon>> = {
  fakturering: FileText,
  bokforing: BookOpenCheck,
  lon: Users,
  skatteverket: Landmark,
  aiMcp: Bot,
};

/**
 * Bokföringsprogram: heading with the demo/login actions beside the app
 * (a dashboard image, or the real screenshot), then the live feature pages
 * as cards.
 */
export async function SoftwareSection({ locale, content }: SectionProps) {
  const common = await getTranslations({ locale, namespace: "common" });
  const { text, images } = content;
  const [overview, ...subpages] = liveSoftwarePages();

  return (
    <OfferingSection
      id="bokforingsprogram"
      eyebrow={getLocalized(text.softwareEyebrow, locale)}
      title={getLocalized(text.softwareTitle, locale)}
      lead={getLocalized(text.softwareLead, locale)}
      actions={
        <>
          <SoftwareCtas locale={locale} />
          <Link
            href={overview.route}
            className="text-primary group/more focus-visible:ring-ring/50 mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-sm font-semibold focus-visible:ring-3 focus-visible:outline-none"
          >
            {getLocalized(text.softwareCta, locale)}
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/more:translate-x-0.5 rtl:rotate-180 rtl:group-hover/more:-translate-x-0.5"
            />
          </Link>
        </>
      }
      visual={
        images.softwareImage ? (
          <OfferingImage image={images.softwareImage} locale={locale} />
        ) : (
          <SoftwareScreenshot
            id="dashboard"
            locale={locale}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        )
      }
      imageSide="end"
    >
      <RevealGroup
        step={80}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {subpages.map((page) => (
          <LinkCard
            key={page.key}
            href={page.route}
            icon={FEATURE_ICONS[page.key] ?? FileText}
            title={getLocalized(page.navLabel, locale)}
            text={getLocalized(page.summary, locale)}
            readMoreLabel={common("readMore")}
          />
        ))}
      </RevealGroup>
    </OfferingSection>
  );
}
