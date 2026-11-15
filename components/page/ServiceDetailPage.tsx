import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ClipboardCheck, FileCheck2, Info, Users } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getArticleSlug, getServiceAlternateLinks } from "@/lib/routes";
import { getOfferingServices } from "@/lib/service-lookup";
import { getPublishedArticles, getServiceContent } from "@/lib/cms/content";
import { getRelatedArticlesForService } from "@/lib/related-content";
import { buildServiceJsonLd } from "@/lib/structured-data/service";
import { getContactHref } from "@/lib/contact-links";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { PersonProfileCard } from "@/components/marketing/PersonProfileCard";
import { IconTile } from "@/components/marketing/IconTile";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { Reveal } from "@/components/motion/Reveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealLine } from "@/components/motion/RevealLine";
import { CheckList } from "@/components/page/CheckList";
import { ContactActions } from "@/components/page/ContactActions";
import { CtaBand } from "@/components/page/CtaBand";
import { FaqBlock } from "@/components/page/FaqBlock";
import { PageBreadcrumbs } from "@/components/page/PageBreadcrumbs";
import { PageHero } from "@/components/page/PageHero";
import {
  getServiceGroup,
  getServiceIcon,
  getServiceOffering,
  serviceGroups,
} from "@/content/service-icons";
import { offerings } from "@/content/offerings";
import { faqs } from "@/content/faqs";
import { hadi } from "@/content/people";
import type { Service } from "@/content/types";

/**
 * The body of every service detail page, whichever offering it belongs to
 * (app/[locale]/{tjanster,digital-marknadsforing,systemutveckling}/[slug]).
 * Breadcrumb, CTA and related services come from the service's offering.
 * The route resolves the service first (lib/service-page.ts).
 */
export async function ServiceDetailPage({
  locale,
  service: baseService,
}: {
  locale: AppLocale;
  service: Service;
}) {
  // Texts, lists, body and hero image as edited in the dashboard.
  const service = await getServiceContent(baseService);

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
  const offeringKey = getServiceOffering(service.key);
  // Related services come from the same group, so never another offering.
  const groupServices = getOfferingServices(offeringKey).filter(
    (other) => getServiceGroup(other.key) === group,
  );
  const offering = offerings[offeringKey];
  const parentCrumb = {
    label: getLocalized(offering.label, locale),
    routeKey: offering.route,
  };
  // The CTA preselects this service in the contact form.
  const contactHref = getContactHref(locale, service.key);
  const currentIndex = groupServices.findIndex((s) => s.key === service.key);
  const relatedServices = groupServices
    .slice(currentIndex + 1)
    .concat(groupServices.slice(0, currentIndex))
    .slice(0, 3);

  return (
    <article>
      <JsonLd data={buildServiceJsonLd(service, locale, canonicalUrl)} />

      <PageHero
        breadcrumbs={
          <PageBreadcrumbs
            locale={locale}
            items={[parentCrumb, { label: getLocalized(service.name, locale) }]}
            currentUrl={canonicalUrl}
          />
        }
        eyebrow={serviceGroups[group][locale]}
        eyebrowIcon={Icon}
        // The keyword-led search title ("Bokföring för småföretag i
        // Sverige") rather than the bare service name.
        title={getLocalized(service.heading, locale)}
        lead={<p>{getLocalized(service.summary, locale)}</p>}
        actions={
          <ContactActions
            href={contactHref}
            label={getLocalized(offering.cta, locale)}
            ctaId="service-hero"
          />
        }
        visual={
          service.heroImage ? (
            <Image
              src={service.heroImage.src}
              alt={getLocalized(service.heroImage.alt, locale)}
              width={service.heroImage.width}
              height={service.heroImage.height}
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="aspect-[3/2] w-full rounded-3xl object-cover shadow-md"
            />
          ) : (
            <AbstractDocumentPanel icon={Icon} tone="light" />
          )
        }
        hideVisualOnMobile={!service.heroImage}
      />

      <Container size="content">
        <RevealGroup step={100} className="mt-12 grid gap-6 sm:grid-cols-2">
          <FeatureCard>
            <IconTile icon={Users} tone="primary" size="lg" />
            <h2 className="text-2xl font-semibold">{s("whoItsForTitle")}</h2>
            <CheckList
              className="text-body"
              items={getLocalized(service.whoItsFor, locale)}
            />
          </FeatureCard>
          <FeatureCard>
            <IconTile icon={ClipboardCheck} tone="primary" size="lg" />
            <h2 className="text-2xl font-semibold">
              {s("whatsIncludedTitle")}
            </h2>
            <CheckList
              className="text-body"
              items={getLocalized(service.whatsIncluded, locale)}
            />
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
                    <li key={step} className="text-body flex items-start gap-4">
                      <span
                        dir="ltr"
                        className="bg-primary/10 text-primary relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full font-semibold"
                      >
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground mt-1">{step}</span>
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
              <CheckList
                className="text-body"
                items={getLocalized(service.whatToPrepare, locale)}
              />
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
                <CheckList
                  key={index}
                  className="text-body mt-3 list-none ps-0"
                  items={block.items}
                />
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
                  <p className="text-muted-foreground text-sm">{block.text}</p>
                </div>
              );
            }
            return null;
          })}
        </section>
      </Container>

      <div className="mt-12">
        <FaqBlock
          faqs={serviceFaqs}
          locale={locale}
          title={t("faqTitle")}
          tone="tint"
        />
      </div>

      <Container size="content">
        {/* Hadi's card presents him as an authorized accountant, which is
            only relevant on the accounting services. */}
        {offeringKey === "redovisning" && (
          <Reveal>
            <section className="mt-12">
              <h2 className="text-2xl font-semibold">{nav("about")}</h2>
              <div className="border-border bg-card mt-4 rounded-3xl border p-8 shadow-md sm:p-10">
                <PersonProfileCard
                  person={hadi}
                  locale={locale}
                  learnMoreLabel={t("aboutHadiLink")}
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

        <p className="text-muted-foreground mt-10 mb-16 text-xs">
          {t("lastReviewed")}: {service.lastReviewed}
        </p>
      </Container>

      <CtaBand
        title={s("ctaQuestion")}
        actions={
          <ContactActions
            href={contactHref}
            label={getLocalized(offering.cta, locale)}
            tone="dark"
            ctaId="service-cta-band"
          />
        }
      />
    </article>
  );
}
