import { ArrowRight, Info, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";
import type { SoftwarePageEntry } from "@/content/software";
import {
  softwareCommon,
  type SoftwareFaq,
  type SoftwareFeature,
  type SoftwareStep,
} from "@/content/software-pages";
import type { SoftwareShotId } from "@/content/software-screenshots";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqBlock } from "@/components/page/FaqBlock";
import { PageHero } from "@/components/page/PageHero";
import { Badge } from "@/components/ui/badge";
import { SoftwareCtas } from "./SoftwareCtas";
import {
  SoftwareScreenshot,
  SoftwareScreenshotPending,
} from "./SoftwareScreenshot";

export function SoftwareHero({
  locale,
  breadcrumbs,
  eyebrow,
  title,
  lead,
  shot,
  featuresAnchor,
  pending = false,
}: {
  locale: AppLocale;
  /** <PageBreadcrumbs/> for the page. */
  breadcrumbs: ReactNode;
  eyebrow: string;
  title: string;
  lead: string;
  shot?: SoftwareShotId;
  featuresAnchor?: string;
  pending?: boolean;
}) {
  return (
    <PageHero
      breadcrumbs={breadcrumbs}
      notice={
        pending ? (
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            <Info size={16} aria-hidden="true" />
            {getLocalized(softwareCommon.pendingBanner, locale)}
          </p>
        ) : null
      }
      eyebrow={eyebrow}
      title={title}
      lead={<p>{lead}</p>}
      actions={<SoftwareCtas locale={locale} featuresAnchor={featuresAnchor} />}
      visual={
        shot ? (
          <SoftwareScreenshot
            id={shot}
            locale={locale}
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
          />
        ) : (
          <SoftwareScreenshotPending locale={locale} />
        )
      }
    />
  );
}

/** Numbered workflow; each step sits beside its screenshot. */
export function SoftwareSteps({
  locale,
  id,
  title,
  lead,
  steps,
  pending = false,
  tone = "base",
}: {
  locale: AppLocale;
  id?: string;
  title: string;
  lead?: string;
  steps: SoftwareStep[];
  pending?: boolean;
  tone?: "base" | "tint";
}) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-20">
      <Container size="wide">
        <Reveal>
          <SectionHeading title={title} lead={lead} />
        </Reveal>
        <ol className="mt-12 flex flex-col gap-14 lg:gap-20">
          {steps.map((step, index) => {
            const hasVisual = Boolean(step.shot) || pending;
            return (
              <li
                key={index}
                className={cn(
                  "grid items-center gap-6 lg:gap-12",
                  hasVisual && "lg:grid-cols-[0.8fr_1.2fr]",
                )}
              >
                <Reveal className={cn(index % 2 === 1 && "lg:order-last")}>
                  <div className="flex gap-4">
                    <span
                      dir="ltr"
                      aria-hidden="true"
                      className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-base font-semibold shadow-sm"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {getLocalized(step.title, locale)}
                      </h3>
                      <p className="text-muted-foreground text-body mt-2">
                        {getLocalized(step.body, locale)}
                      </p>
                    </div>
                  </div>
                </Reveal>
                {step.shot ? (
                  <Reveal delay={100}>
                    <SoftwareScreenshot id={step.shot} locale={locale} />
                  </Reveal>
                ) : pending ? (
                  <SoftwareScreenshotPending locale={locale} />
                ) : null}
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

function FeatureExample({
  example,
  locale,
}: {
  example: NonNullable<SoftwareFeature["example"]>;
  locale: AppLocale;
}) {
  return (
    <div className="border-primary/20 bg-primary/5 mt-5 rounded-2xl border p-5">
      <p className="text-primary flex items-center gap-2 text-sm font-semibold">
        <Lightbulb size={16} aria-hidden="true" />
        {getLocalized(example.title, locale)}
      </p>
      <p className="text-body mt-2">{getLocalized(example.body, locale)}</p>
    </div>
  );
}

/** One feature: text, optional example box, and a screenshot beside it when there is one. */
export function SoftwareFeatureRow({
  feature,
  locale,
  index,
}: {
  feature: SoftwareFeature;
  locale: AppLocale;
  index: number;
}) {
  const bullets = feature.bullets ? getLocalized(feature.bullets, locale) : [];
  const text = (
    <div className="max-w-2xl">
      {feature.badge ? (
        <Badge variant="secondary" className="mb-3 rounded-full">
          {getLocalized(feature.badge, locale)}
        </Badge>
      ) : null}
      <h2 className="text-section-h2 font-semibold text-balance">
        {getLocalized(feature.title, locale)}
      </h2>
      {getLocalized(feature.paragraphs, locale).map((paragraph) => (
        <p key={paragraph} className="text-muted-foreground text-body mt-4">
          {paragraph}
        </p>
      ))}
      {bullets.length > 0 ? (
        <ul className="text-body mt-4 flex flex-col gap-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span
                aria-hidden="true"
                className="bg-primary mt-2.5 size-1.5 shrink-0 rounded-full"
              />
              <span className="text-muted-foreground">{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {feature.example ? (
        <FeatureExample example={feature.example} locale={locale} />
      ) : null}
    </div>
  );

  return (
    <Section
      id={feature.id}
      tone={index % 2 === 0 ? "base" : "tint"}
      className="scroll-mt-20"
    >
      <Container size="wide">
        {feature.shot ? (
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal className={cn(index % 2 === 1 && "lg:order-last")}>
              {text}
            </Reveal>
            <Reveal delay={100}>
              <SoftwareScreenshot id={feature.shot} locale={locale} />
            </Reveal>
          </div>
        ) : (
          <Reveal>{text}</Reveal>
        )}
      </Container>
    </Section>
  );
}

/** FAQ section plus its FAQPage JSON-LD. */
export function SoftwareFaqSection({
  faqs,
  locale,
}: {
  faqs: SoftwareFaq[];
  locale: AppLocale;
}) {
  return (
    <FaqBlock
      faqs={faqs}
      locale={locale}
      title={getLocalized(softwareCommon.faqTitle, locale)}
    />
  );
}

/** Cards to the other software pages a visitor can open. */
export function SoftwareRelated({
  pages,
  locale,
}: {
  pages: SoftwarePageEntry[];
  locale: AppLocale;
}) {
  if (pages.length === 0) return null;
  return (
    <Section tone="tint">
      <Container size="wide">
        <Reveal>
          <SectionHeading
            title={getLocalized(softwareCommon.relatedTitle, locale)}
          />
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pages.map((page) => (
            <li key={page.key}>
              <Link
                href={page.route}
                className="group border-border bg-card hover:border-primary/40 flex h-full flex-col gap-2 rounded-2xl border p-5 shadow-sm transition-colors"
              >
                <span className="font-semibold">
                  {getLocalized(page.navLabel, locale)}
                </span>
                <span className="text-muted-foreground text-sm">
                  {getLocalized(page.summary, locale)}
                </span>
                <span className="text-primary mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium">
                  {getLocalized(softwareCommon.readMore, locale)}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function SoftwareCtaBand({ locale }: { locale: AppLocale }) {
  return (
    <CtaBand
      title={getLocalized(softwareCommon.ctaTitle, locale)}
      body={getLocalized(softwareCommon.ctaBody, locale)}
      actions={<SoftwareCtas locale={locale} tone="dark" />}
    />
  );
}
