import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getInquiryHref } from "@/lib/contact-links";
import { getLocalized } from "@/lib/i18n-content";
import { offeringList } from "@/content/offerings";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { offeringIcons } from "@/components/marketing/offering-icons";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import type { SectionProps } from "../types";

/**
 * "Which suits you?" under the hero: one card per offering (content/
 * offerings.ts, in the order of the CMS "areas" collection) with who it's
 * for, the offering's own next step and a link to its page.
 */
export async function AreasSection({ locale, content }: SectionProps) {
  const common = await getTranslations({ locale, namespace: "common" });
  const { text, collections } = content;

  return (
    <Section tone="base" id="valj" className="py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={getLocalized(text.areasEyebrow, locale)}
            title={getLocalized(text.areasTitle, locale)}
            lead={getLocalized(text.areasLead, locale)}
          />
        </Reveal>
        <RevealGroup
          step={80}
          className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {offeringList.map((offering, index) => {
            const item = collections.areas?.[index];
            if (!item) return null;
            const label = getLocalized(item.title, locale);
            return (
              <article
                key={offering.key}
                data-area={offering.route}
                className="border-border bg-card flex h-full flex-col gap-4 rounded-2xl border p-6 shadow-sm sm:p-7"
              >
                <IconTile icon={offeringIcons[offering.key]} size="lg" />
                <div>
                  <h3 className="text-xl font-semibold">{label}</h3>
                  <p className="text-primary mt-1 text-sm font-semibold">
                    {getLocalized(offering.whoDoesIt, locale)}
                  </p>
                </div>
                <p className="text-muted-foreground text-body">
                  {getLocalized(item.body, locale)}
                </p>
                <div className="mt-auto flex flex-col items-start gap-1 pt-2">
                  <NextLink
                    href={getInquiryHref(locale, offering.inquiry)}
                    data-cta={`areas-${offering.key}`}
                    className={buttonVariants({
                      variant: "default",
                      size: "lg",
                      className: "gap-2",
                    })}
                  >
                    {getLocalized(offering.cta, locale)}
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="rtl:rotate-180"
                    />
                  </NextLink>
                  <Link
                    href={offering.route}
                    className="text-primary focus-visible:ring-ring/50 inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-semibold hover:underline focus-visible:ring-3 focus-visible:outline-none"
                  >
                    {common("readMoreAbout", { topic: label.toLowerCase() })}
                  </Link>
                </div>
              </article>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
