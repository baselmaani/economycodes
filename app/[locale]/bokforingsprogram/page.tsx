import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Building2, Calculator } from "lucide-react";

import NextLink from "next/link";

import { getPathname, Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getAbsoluteUrl } from "@/lib/routes";
import { getPageContent } from "@/lib/cms/content";
import { buildSoftwareMetadata } from "@/lib/software-page";
import { siteUrl } from "@/lib/site";
import { buildSoftwareApplicationJsonLd } from "@/lib/structured-data/software";
import { softwarePages } from "@/content/software";
import {
  softwareCommon,
  softwareIntegrations,
  softwareOrAccounting,
  softwareOverview,
} from "@/content/software-pages";
import { getSoftwareShot } from "@/content/software-screenshots";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Badge } from "@/components/ui/badge";
import { PageBreadcrumbs } from "@/components/page/PageBreadcrumbs";
import { SoftwareScreenshot } from "@/components/software/SoftwareScreenshot";
import {
  SoftwareCtaBand,
  SoftwareFaqSection,
  SoftwareHero,
  SoftwareSteps,
} from "@/components/software/SoftwareSections";

const FEATURES_ID = "funktioner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildSoftwareMetadata("overview", locale);
}

export default async function SoftwareOverviewPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const entry = softwarePages.overview;
  const cms = await getPageContent(entry.cmsKey);
  const content = softwareOverview;
  const pageUrl = getAbsoluteUrl(entry.route, locale);
  const label = getLocalized(entry.navLabel, locale);

  return (
    <>
      <JsonLd
        data={buildSoftwareApplicationJsonLd({
          locale,
          name: "Economy Codes",
          description: getLocalized(cms.seo.description, locale),
          url: pageUrl,
          features: [
            ...content.features.map((f) => getLocalized(f.title, locale)),
            ...softwareIntegrations.items.map((i) =>
              getLocalized(i.name, locale),
            ),
          ],
          screenshot: new URL(
            getSoftwareShot("dashboard", locale).src,
            siteUrl,
          ).toString(),
        })}
      />

      <SoftwareHero
        locale={locale}
        breadcrumbs={
          <PageBreadcrumbs
            locale={locale}
            items={[{ label }]}
            currentUrl={pageUrl}
          />
        }
        eyebrow={getLocalized(softwareCommon.eyebrow, locale)}
        title={getLocalized(cms.text.heroTitle, locale)}
        lead={getLocalized(cms.text.heroLead, locale)}
        shot="dashboard"
        featuresAnchor={FEATURES_ID}
      />

      <SoftwareSteps
        locale={locale}
        id="sa-skickar-du-en-faktura"
        title={getLocalized(content.walkthrough.title, locale)}
        lead={getLocalized(content.walkthrough.lead, locale)}
        steps={content.walkthrough.steps}
      />

      {/* What the software covers, in the customer's own workflow */}
      <Section tone="tint">
        <Container size="narrow">
          <Reveal>
            <h2 className="text-section-h2 font-semibold text-balance">
              {getLocalized(content.intro.title, locale)}
            </h2>
            {getLocalized(content.intro.paragraphs, locale).map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted-foreground text-body mt-4"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Feature overview */}
      <Section tone="base" id={FEATURES_ID} className="scroll-mt-20">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              title={getLocalized(content.featuresTitle, locale)}
              lead={getLocalized(content.featuresLead, locale)}
            />
          </Reveal>
          <RevealGroup
            step={80}
            className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {content.features.map((feature) => {
              const target = softwarePages[feature.page];
              return (
                <article
                  key={feature.title.sv}
                  className="border-border bg-card flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm"
                >
                  <div className="bg-secondary/40 p-4 pb-0">
                    <SoftwareScreenshot
                      id={feature.shot}
                      locale={locale}
                      sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                      className="[&_figcaption]:sr-only"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    {feature.badge ? (
                      <Badge variant="secondary" className="w-fit rounded-full">
                        {getLocalized(feature.badge, locale)}
                      </Badge>
                    ) : null}
                    <h3 className="text-lg font-semibold">
                      {getLocalized(feature.title, locale)}
                    </h3>
                    <p className="text-muted-foreground text-body">
                      {getLocalized(feature.body, locale)}
                    </p>
                    <NextLink
                      href={`${getPathname({ locale, href: target.route })}${feature.anchor ? `#${feature.anchor}` : ""}`}
                      className="text-primary group/link mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold"
                    >
                      {getLocalized(softwareCommon.readMore, locale)}:{" "}
                      {getLocalized(target.navLabel, locale).toLowerCase()}
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform group-hover/link:translate-x-0.5 rtl:rotate-180 rtl:group-hover/link:-translate-x-0.5"
                      />
                    </NextLink>
                  </div>
                </article>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* Verified integrations: what each one does and who it helps */}
      <Section tone="tint" id="integrationer" className="scroll-mt-20">
        <Container size="wide">
          <Reveal>
            <SectionHeading
              title={getLocalized(softwareIntegrations.title, locale)}
              lead={getLocalized(softwareIntegrations.lead, locale)}
            />
          </Reveal>
          <RevealGroup step={80} className="mt-10 grid gap-5 md:grid-cols-2">
            {softwareIntegrations.items.map((item) => {
              const target = softwarePages[item.page];
              return (
                <article
                  key={item.id}
                  className="border-border bg-card flex h-full flex-col gap-3 rounded-2xl border p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold">
                    {getLocalized(item.name, locale)}
                  </h3>
                  <p className="text-body">{getLocalized(item.what, locale)}</p>
                  <p className="text-muted-foreground text-sm">
                    {getLocalized(item.who, locale)}
                  </p>
                  <NextLink
                    href={`${getPathname({ locale, href: target.route })}#${item.anchor}`}
                    className="text-primary focus-visible:ring-ring/50 mt-auto inline-flex min-h-11 items-center gap-1 self-start rounded-sm text-sm font-semibold hover:underline focus-visible:ring-3 focus-visible:outline-none"
                  >
                    {getLocalized(softwareCommon.readMore, locale)}:{" "}
                    {getLocalized(item.name, locale)}
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="rtl:rotate-180"
                    />
                  </NextLink>
                </article>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* The demo company behind every screenshot, and the do-it-for-me alternative */}
      <Section tone="base">
        <Container size="wide">
          <RevealGroup step={100} className="grid gap-6 lg:grid-cols-2">
            <div className="border-border bg-card flex h-full flex-col gap-4 rounded-2xl border p-6 shadow-sm sm:flex-row sm:p-8">
              <IconTile icon={Building2} />
              <div>
                <h2 className="text-xl font-semibold">
                  {getLocalized(content.example.title, locale)}
                </h2>
                <p className="text-muted-foreground text-body mt-2">
                  {getLocalized(content.example.body, locale)}
                </p>
              </div>
            </div>
            <div className="border-border bg-card flex h-full flex-col gap-4 rounded-2xl border p-6 shadow-sm sm:flex-row sm:p-8">
              <IconTile icon={Calculator} />
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">
                  {getLocalized(softwareOrAccounting.title, locale)}
                </h2>
                <p className="text-muted-foreground text-body mt-2">
                  {getLocalized(softwareOrAccounting.body, locale)}
                </p>
                <Link
                  href="/tjanster"
                  className="text-primary focus-visible:ring-ring/50 mt-3 inline-flex min-h-11 items-center gap-1 self-start rounded-sm text-sm font-semibold hover:underline focus-visible:ring-3 focus-visible:outline-none"
                >
                  {getLocalized(softwareOrAccounting.link, locale)}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="rtl:rotate-180"
                  />
                </Link>
              </div>
            </div>
          </RevealGroup>
        </Container>
      </Section>

      <SoftwareFaqSection faqs={content.faqs} locale={locale} />
      <SoftwareCtaBand locale={locale} />
    </>
  );
}
