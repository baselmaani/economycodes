import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getAlternateLinks } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalized } from "@/lib/i18n-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { hadi } from "@/content/people";
import { business } from "@/content/business";
import { buildPersonJsonLd } from "@/lib/structured-data/person";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: getLocalized(
      {
        sv: "Om Hadi Al Maani",
        en: "About Hadi Al Maani",
        ar: "عن هادي المعاني",
      },
      locale,
    ),
    description: getLocalized(hadi.bio, locale).slice(0, 155),
    alternates: getAlternateLinks("/om-hadi"),
  });
}

export default async function AboutHadiPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const personJsonLd = buildPersonJsonLd(hadi, locale, business);

  return (
    <Container size="content" className="py-12 sm:py-16">
      <JsonLd data={personJsonLd} />
      <Breadcrumbs
        items={[{ label: nav("home"), routeKey: "/" }, { label: nav("about") }]}
      />

      <div className="mt-8 flex flex-col items-start gap-10 sm:flex-row">
        <div className="relative shrink-0">
          <div className="border-border bg-card w-full max-w-56 overflow-hidden rounded-2xl border shadow-md">
            <Image
              src={hadi.photo.src}
              alt={getLocalized(hadi.photo.alt, locale)}
              width={hadi.photo.width}
              height={hadi.photo.height}
              priority
              sizes="224px"
              className="h-auto w-full object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="border-primary/40 absolute -end-3 -bottom-3 size-10 rounded-lg border-2"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-page-h1 font-semibold text-balance">
              {hadi.name}
            </h1>
            <p className="text-primary mt-1 font-medium">
              {getLocalized(hadi.title, locale)}
            </p>
          </div>
          <p className="text-muted-foreground text-body max-w-prose">
            {getLocalized(hadi.bio, locale)}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={hadi.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary"
            >
              <FacebookIcon size={20} />
            </a>
          </div>
          <Button render={<Link href="/kontakt" />} className="w-fit">
            {t("contactUs")}
          </Button>
        </div>
      </div>
    </Container>
  );
}
