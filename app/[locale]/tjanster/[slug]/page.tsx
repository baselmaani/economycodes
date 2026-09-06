import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getServiceAlternateLinks, getServiceSlug, resolveServiceBySlug, servicesList } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildServiceJsonLd } from "@/lib/structured-data/service";
import { buildBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { buildFaqJsonLd } from "@/lib/structured-data/faq";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/button";
import { business } from "@/content/business";
import { faqs } from "@/content/faqs";

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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={buildServiceJsonLd(service, locale, business, canonicalUrl)} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Economy Codes", url: alternates["x-default"] },
          { name: getLocalized(service.name, locale), url: canonicalUrl },
        ])}
      />
      {serviceFaqs.length > 0 && (
        <JsonLd data={buildFaqJsonLd(serviceFaqs, locale)} />
      )}

      <Breadcrumbs
        items={[
          { label: nav("home"), routeKey: "/" },
          { label: nav("services"), routeKey: "/tjanster" },
          { label: getLocalized(service.name, locale) },
        ]}
      />

      <h1 className="mt-4 text-4xl font-semibold">
        {getLocalized(service.name, locale)}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg">
        {getLocalized(service.summary, locale)}
      </p>

      {service.heroImage && (
        <div className="border-border bg-card mt-8 overflow-hidden rounded-2xl border shadow-sm">
          <Image
            src={service.heroImage.src}
            alt={getLocalized(service.heroImage.alt, locale)}
            width={service.heroImage.width}
            height={service.heroImage.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <section className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">{s("whoItsForTitle")}</h2>
          <ul className="text-muted-foreground mt-3 flex flex-col gap-2 text-sm">
            {getLocalized(service.whoItsFor, locale).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{s("whatsIncludedTitle")}</h2>
          <ul className="text-muted-foreground mt-3 flex flex-col gap-2 text-sm">
            {getLocalized(service.whatsIncluded, locale).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">{s("processTitle")}</h2>
        <ol className="mt-3 flex flex-col gap-3">
          {getLocalized(service.process, locale).map((step, index) => (
            <li key={step} className="flex gap-3 text-sm">
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
        <ul className="text-muted-foreground mt-3 flex flex-col gap-2 text-sm">
          {getLocalized(service.whatToPrepare, locale).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="prose prose-neutral mt-10 max-w-none">
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
              <p key={index} className="text-muted-foreground mt-3">
                {block.text}
              </p>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={index} className="text-muted-foreground mt-3">
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

      {serviceFaqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">{t("faqTitle")}</h2>
          <div className="mt-4">
            <FaqAccordion faqs={serviceFaqs} locale={locale} />
          </div>
        </section>
      )}

      <div className="border-border mt-12 flex flex-col items-start gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium">{s("ctaQuestion")}</p>
        <Button render={<Link href="/kontakt" />}>{t("contactUs")}</Button>
      </div>

      <p className="text-muted-foreground mt-8 text-xs">
        {t("lastReviewed")}: {service.lastReviewed}
      </p>
    </article>
  );
}
