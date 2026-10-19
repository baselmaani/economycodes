import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Info,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  getAbsoluteUrl,
  getArticleSlug,
  getServiceAlternateLinks,
  getServiceSlug,
  resolveServiceBySlug,
  servicesList,
} from "@/lib/routes";
import { buildPageMetadata } from "@/lib/cms/metadata";
import { getPublishedArticles } from "@/lib/cms/content";
import { getRelatedArticlesForService } from "@/lib/related-content";
import { servicePageKey } from "@/lib/cms/pages";
import { getServiceOgImageUrl } from "@/lib/seo/og-image";
import { buildServiceJsonLd } from "@/lib/structured-data/service";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { PersonProfileCard } from "@/components/marketing/PersonProfileCard";
import { IconTile } from "@/components/marketing/IconTile";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealLine } from "@/components/motion/RevealLine";
import { RevealScale } from "@/components/motion/RevealScale";
import {
  getServiceGroup,
  getServiceIcon,
  serviceGroups,
} from "@/content/service-icons";
import { business } from "@/content/business";
import { faqs } from "@/content/faqs";
import { serviceMeta } from "@/content/service-meta";
import { hadi } from "@/content/people";

interface ServicePageParams {
  locale: AppLocale;
  slug: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    servicesList.map((service) => ({
      locale,
      slug: getServiceSlug(locale, service),
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicePageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = resolveServiceBySlug(locale, slug);
  if (!service) return {};

  return buildPageMetadata(servicePageKey(service.key), locale, {
    alternates: getServiceAlternateLinks(service),
    ogImage: getServiceOgImageUrl(locale, slug),
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<ServicePageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = resolveServiceBySlug(locale, slug);
  if (!service) notFound();

  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const s = await getTranslations({ locale, namespace: "service" });
  const serviceFaqs = faqs.filter(
    (faq) =>
      typeof faq.scope === "object" &&
      "serviceKey" in faq.scope &&
      faq.scope.serviceKey === service.key,
  );
  const alternates = getServiceAlternateLinks(service);
  const canonicalUrl = alternates[locale];
  const relatedArticles = getRelatedArticlesForService(
    (await getPublishedArticles()).filter((article) => !article.seo.noindex),
    service.key,
  ).slice(0, 3);

  // getServiceIcon looks up a stable, module-level icon component by key --
  // its identity never changes across renders, so this isn't dynamic
  // component creation despite the lint heuristic where it's used below.
  const Icon = getServiceIcon(service.key);
  const group = getServiceGroup(service.key);
  const groupServices = servicesList.filter(
    (other) => getServiceGroup(other.key) === group,
  );
  const isDigital = group === "digital";
  // Digital marketing services live under the /digital-marknadsforing hub
  // rather than the accounting services list.
  const parentCrumb = isDigital
    ? {
        label: nav("digitalMarketing"),
        routeKey: "/digital-marknadsforing" as const,
      }
    : { label: nav("services"), routeKey: "/tjanster" as const };
  const currentIndex = groupServices.findIndex((s) => s.key === service.key);
  const relatedServices = groupServices
    .slice(currentIndex + 1)
    .concat(groupServices.slice(0, currentIndex))
    .slice(0, 3);

  return (
    <article>
      <JsonLd
        data={buildServiceJsonLd(service, locale, canonicalUrl)}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          {
            name: parentCrumb.label,
            url: getAbsoluteUrl(parentCrumb.routeKey, locale),
          },
          { name: getLocalized(service.name, locale), url: canonicalUrl },
        ])}
      />
      {serviceFaqs.length > 0 && (
        <JsonLd data={buildFaqJsonLd(serviceFaqs, locale)} />
      )}

      {/* Service hero */}
      <Section tone="tint" bleed>
        <GridPattern className="inset-0 hidden size-full sm:block" />
        <RadialGlow className="-end-32 -top-24 size-[32rem] opacity-10" />

        <Container size="wide" className="relative">
          <Breadcrumbs
            items={[
              { label: nav("home"), routeKey: "/" },
              parentCrumb,
              { label: getLocalized(service.name, locale) },
            ]}
          />

          <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <div>
                <Badge className="h-auto gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
                  {/* eslint-disable-next-line react-hooks/static-components -- stable, module-level icon lookup, not a dynamically-created component */}
                  <Icon size={14} aria-hidden="true" />
                  {serviceGroups[group][locale]}
                </Badge>
                <h1 className="text-page-h1 mt-4 font-semibold text-balance">
                  {/* The keyword-led search title ("Bokföring för småföretag
                      i Sverige") rather than the bare service name. */}
                  {getLocalized(
                    serviceMeta[service.key]?.title ?? service.name,
                    locale,
                  )}
                </h1>
                <p className="text-muted-foreground text-body mt-4">
                  {getLocalized(service.summary, locale)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button
                    render={<Link href="/kontakt" />}
                    variant="shine"
                    size="lg"
                    className="gap-2"
                  >
                    {t("contactUs")}
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="rtl:rotate-180"
                    />
                  </Button>
                  <a
                    href={business.phoneHref}
                    className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <Phone size={16} className="text-primary" aria-hidden="true" />
                    <span dir="ltr">{business.phone}</span>
                  </a>
                  <a
                    href={business.whatsappHref}
                    className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  >
                    <MessageCircle
                      size={16}
                      className="text-primary"
                      aria-hidden="true"
                    />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <RevealScale delay={120} className="order-first md:order-last">
              <AbstractDocumentPanel icon={Icon} tone="light" />
            </RevealScale>
          </div>
        </Container>
      </Section>

      <Container size="content">
        <RevealGroup step={100} className="mt-12 grid gap-6 sm:grid-cols-2">
          <FeatureCard>
            <IconTile icon={Users} tone="primary" size="lg" />
            <h2 className="text-2xl font-semibold">{s("whoItsForTitle")}</h2>
            <ul className="text-body flex flex-col gap-3">
              {getLocalized(service.whoItsFor, locale).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <IconTile icon={CheckCircle2} size="sm" tone="primary" />
                  <span className="text-muted-foreground mt-1.5">{item}</span>
                </li>
              ))}
            </ul>
          </FeatureCard>
          <FeatureCard>
            <IconTile icon={ClipboardCheck} tone="primary" size="lg" />
            <h2 className="text-2xl font-semibold">
              {s("whatsIncludedTitle")}
            </h2>
            <ul className="text-body flex flex-col gap-3">
              {getLocalized(service.whatsIncluded, locale).map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <IconTile icon={CheckCircle2} size="sm" tone="primary" />
                  <span className="text-muted-foreground mt-1.5">{item}</span>
                </li>
              ))}
            </ul>
          </FeatureCard>
        </RevealGroup>
      </Container>

      <Section tone="tint">
        <Container size="content">
          <Reveal>
            <section>
              <h2 className="text-2xl font-semibold">{s("processTitle")}</h2>
              <div className="relative mt-6">
                <RevealLine
                  axis="y"
                  className="absolute start-4 top-2 bottom-2 w-px"
                >
                  <div className="bg-border h-full w-full" />
                </RevealLine>
                <ol className="relative flex flex-col gap-6">
                  {getLocalized(service.process, locale).map((step, index) => (
                    <li
                      key={step}
                      className="text-body flex items-start gap-4"
                    >
                      <span
                        dir="ltr"
                        className="bg-primary/10 text-primary relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full font-semibold"
                      >
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground mt-1">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <FeatureCard>
              <IconTile icon={FileCheck2} tone="primary" size="lg" />
              <h2 className="text-2xl font-semibold">{s("prepareTitle")}</h2>
              <ul className="text-body flex flex-col gap-3">
                {getLocalized(service.whatToPrepare, locale).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <IconTile icon={CheckCircle2} size="sm" tone="primary" />
                    <span className="text-muted-foreground mt-1.5">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FeatureCard>
          </Reveal>
        </Container>
      </Section>

      <Container size="content">
        <section className="prose prose-neutral max-w-none">
          {getLocalized(service.body, locale).map((block, index) => {
            if (block.type === "heading") {
              const Tag = block.level === 2 ? "h2" : "h3";
              return (
                <Tag key={index} className="mt-8 text-2xl font-semibold">
                  {block.text}
                </Tag>
              );
            }
            if (block.type === "paragraph") {
              return (
                <p key={index} className="text-muted-foreground text-body mt-3">
                  {block.text}
                </p>
              );
            }
            if (block.type === "list") {
              return (
                <ul
                  key={index}
                  className="text-body mt-3 flex list-none flex-col gap-3 ps-0"
                >
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <IconTile icon={CheckCircle2} size="sm" tone="primary" />
                      <span className="text-muted-foreground mt-1.5">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "disclaimer") {
              return (
                <div
                  key={index}
                  className="border-border bg-secondary/40 mt-6 flex items-start gap-3 rounded-xl border p-5"
                >
                  <Info
                    size={18}
                    className="text-primary mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-muted-foreground text-sm">
                    {block.text}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </section>
      </Container>

      {serviceFaqs.length > 0 && (
        <Section tone="tint" className="mt-12">
          <Container size="content">
            <Reveal>
              <h2 className="text-2xl font-semibold">{t("faqTitle")}</h2>
              <div className="mt-4">
                <FaqAccordion faqs={serviceFaqs} locale={locale} />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Container size="content">
        {/* Hadi's card presents him as an authorized accountant, which is
            only relevant on the accounting services. */}
        {!isDigital && (
        <Reveal>
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">{nav("about")}</h2>
            <div className="border-border bg-card mt-4 rounded-3xl border p-8 shadow-md sm:p-10">
              <PersonProfileCard
                person={hadi}
                locale={locale}
                learnMoreLabel={t("learnMore")}
                facebookLabel={t("facebook")}
                compact
              />
            </div>
          </section>
        </Reveal>
        )}

        {relatedServices.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">
              {s("relatedServicesTitle")}
            </h2>
            <RevealGroup
              step={80}
              className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {relatedServices.map((related) => (
                <ServiceCard
                  key={related.key}
                  service={related}
                  locale={locale}
                  readMoreLabel={t("readMore")}
                />
              ))}
            </RevealGroup>
          </section>
        )}

        {relatedArticles.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold">{t("relatedArticles")}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {relatedArticles.map((article) => (
                <li key={article.id}>
                  <Link
                    href={{
                      pathname: "/artiklar/[slug]",
                      params: { slug: getArticleSlug(locale, article) },
                    }}
                    className="border-border bg-card hover:border-primary/40 block rounded-2xl border p-5 transition-colors"
                  >
                    <span className="font-semibold">
                      {getLocalized(article.title, locale)}
                    </span>
                    <span className="text-muted-foreground mt-1 block text-sm">
                      {getLocalized(article.excerpt, locale)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Reveal>
          <div className="bg-brand-gradient relative mt-12 flex flex-col items-start gap-4 overflow-hidden rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <GridPattern className="inset-0 hidden size-full text-white/[0.08] sm:block" />
            <p className="relative font-medium text-white">
              {s("ctaQuestion")}
            </p>
            <Button
              render={<Link href="/kontakt" />}
              variant="shine"
              className="relative gap-2"
            >
              {t("contactUs")}
              <ArrowRight size={16} aria-hidden="true" className="rtl:rotate-180" />
            </Button>
          </div>
        </Reveal>

        <p className="text-muted-foreground mt-6 mb-16 text-xs">
          {t("lastReviewed")}: {service.lastReviewed}
        </p>
      </Container>
    </article>
  );
}
