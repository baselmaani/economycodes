import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  getAbsoluteUrl,
  getServiceAlternateLinks,
  getServiceSlug,
  resolveServiceBySlug,
  servicesList,
} from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildServiceJsonLd } from "@/lib/structured-data/service";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { PersonProfileCard } from "@/components/marketing/PersonProfileCard";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import {
  getServiceGroup,
  getServiceIcon,
  serviceGroups,
} from "@/content/service-icons";
import { business } from "@/content/business";
import { faqs } from "@/content/faqs";
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

  return buildMetadata({
    locale,
    title: getLocalized(service.name, locale),
    description: getLocalized(service.summary, locale),
    alternates: getServiceAlternateLinks(service),
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
      typeof faq.scope === "object" && faq.scope.serviceKey === service.key,
  );
  const alternates = getServiceAlternateLinks(service);
  const canonicalUrl = alternates[locale];

  // getServiceIcon looks up a stable, module-level icon component by key --
  // its identity never changes across renders, so this isn't dynamic
  // component creation despite the lint heuristic where it's used below.
  const Icon = getServiceIcon(service.key);
  const group = getServiceGroup(service.key);
  const relatedServices = servicesList
    .filter(
      (other) =>
        other.key !== service.key && getServiceGroup(other.key) === group,
    )
    .slice(0, 3);

  return (
    <article>
      <JsonLd
        data={buildServiceJsonLd(service, locale, business, canonicalUrl)}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: nav("home"), url: getAbsoluteUrl("/", locale) },
          { name: nav("services"), url: getAbsoluteUrl("/tjanster", locale) },
          { name: getLocalized(service.name, locale), url: canonicalUrl },
        ])}
      />
      {serviceFaqs.length > 0 && (
        <JsonLd data={buildFaqJsonLd(serviceFaqs, locale)} />
      )}

      {/* Service hero */}
      <div className="pt-10 pb-6 sm:pt-14">
        <Container size="wide">
          <Breadcrumbs
            items={[
              { label: nav("home"), routeKey: "/" },
              { label: nav("services"), routeKey: "/tjanster" },
              { label: getLocalized(service.name, locale) },
            ]}
          />

          <div className="mt-6 grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <div>
                <span className="text-primary inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                  {/* eslint-disable-next-line react-hooks/static-components -- stable, module-level icon lookup, not a dynamically-created component */}
                  <Icon size={16} aria-hidden="true" />
                  {serviceGroups[group][locale]}
                </span>
                <h1 className="text-page-h1 mt-3 font-semibold text-balance">
                  {getLocalized(service.name, locale)}
                </h1>
                <p className="text-muted-foreground text-body mt-4">
                  {getLocalized(service.summary, locale)}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="order-first md:order-last">
              <AbstractDocumentPanel icon={Icon} tone="light" />
            </Reveal>
          </div>
        </Container>
      </div>

      <Container size="content">
        <Reveal>
          <section className="mt-4 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">{s("whoItsForTitle")}</h2>
              <ul className="text-muted-foreground text-body mt-3 flex flex-col gap-2">
                {getLocalized(service.whoItsFor, locale).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {s("whatsIncludedTitle")}
              </h2>
              <ul className="text-muted-foreground text-body mt-3 flex flex-col gap-2">
                {getLocalized(service.whatsIncluded, locale).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      </Container>

      <Section tone="tint" className="mt-12">
        <Container size="content">
          <Reveal>
            <section>
              <h2 className="text-lg font-semibold">{s("processTitle")}</h2>
              <ol className="mt-3 flex flex-col gap-3">
                {getLocalized(service.process, locale).map((step, index) => (
                  <li key={step} className="text-body flex gap-3">
                    <span dir="ltr" className="text-primary font-semibold">
                      {index + 1}.
                    </span>
                    <span className="text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10">
              <h2 className="text-lg font-semibold">{s("prepareTitle")}</h2>
              <ul className="text-muted-foreground text-body mt-3 flex flex-col gap-2">
                {getLocalized(service.whatToPrepare, locale).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </Reveal>
        </Container>
      </Section>

      <Container size="content">
        <section className="prose prose-neutral mt-12 max-w-none">
          {getLocalized(service.body, locale).map((block, index) => {
            if (block.type === "heading") {
              const Tag = block.level === 2 ? "h2" : "h3";
              return (
                <Tag key={index} className="mt-8 text-xl font-semibold">
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
                  className="text-muted-foreground text-body mt-3"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "disclaimer") {
              return (
                <p
                  key={index}
                  className="border-border bg-muted text-muted-foreground mt-6 rounded-lg border p-4 text-sm"
                >
                  {block.text}
                </p>
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
              <h2 className="text-lg font-semibold">{t("faqTitle")}</h2>
              <div className="mt-4">
                <FaqAccordion faqs={serviceFaqs} locale={locale} />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      <Container size="content">
        <Reveal>
          <section className="mt-12">
            <h2 className="text-lg font-semibold">{nav("about")}</h2>
            <div className="border-border bg-card mt-4 rounded-2xl border p-6">
              <PersonProfileCard
                person={hadi}
                locale={locale}
                learnMoreLabel={t("learnMore")}
                compact
              />
            </div>
          </section>
        </Reveal>

        {relatedServices.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold">{nav("services")}</h2>
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

        <Reveal>
          <div className="border-border mt-12 mb-16 flex flex-col items-start gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium">{s("ctaQuestion")}</p>
            <Button render={<Link href="/kontakt" />}>{t("contactUs")}</Button>
          </div>
        </Reveal>

        <p className="text-muted-foreground -mt-8 mb-16 text-xs">
          {t("lastReviewed")}: {service.lastReviewed}
        </p>
      </Container>
    </article>
  );
}
