import Image from "next/image";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { business } from "@/content/business";
import { authorizationContent } from "@/content/home";
import type { MediaRef } from "@/content/types";
import { getLocalized } from "@/lib/i18n-content";
import type { AppLocale } from "@/i18n/routing";

export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel,
  servicesCtaLabel,
  image,
}: {
  locale: AppLocale;
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  primaryCtaLabel: string;
  servicesCtaLabel: string;
  image: MediaRef;
}) {
  const quickServicesLabel: Record<AppLocale, string> = {
    sv: "Bokföring · Lön · Bokslut",
    en: "Bookkeeping · Payroll · Accounts",
    ar: "المحاسبة · الرواتب · الإغلاق السنوي",
  };

  return (
    <section className="relative overflow-hidden">
      <GridPattern className="inset-0 hidden size-full sm:block" />
      <RadialGlow className="top-1/2 -end-40 size-[36rem] -translate-y-1/2" />

      <Container>
        <div className="relative grid items-center gap-12 py-16 sm:py-20 md:grid-cols-2 lg:py-28">
          <div className="flex flex-col gap-6">
            {eyebrow && (
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                {eyebrow}
              </span>
            )}
            <h1 className="text-hero text-foreground font-semibold text-balance">
              {title}
            </h1>
            <p className="text-body text-muted-foreground max-w-prose">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button render={<Link href="/kontakt" />} size="lg" className="gap-2">
                {primaryCtaLabel}
                <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
              </Button>
              <Button render={<Link href="/tjanster" />} size="lg" variant="outline">
                {servicesCtaLabel}
              </Button>
              <a
                href={business.phoneHref}
                className="text-foreground hover:text-primary inline-flex items-center gap-2 px-2 text-sm font-medium transition-colors"
              >
                <Phone size={16} aria-hidden="true" className="text-primary" />
                <span dir="ltr">{business.phone}</span>
              </a>
            </div>

            <div className="border-border/80 mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5">
              <span className="text-muted-foreground inline-flex items-center gap-2 text-sm font-medium">
                <ShieldCheck size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span dir="ltr">{authorizationContent.firm.credential}</span>
              </span>
              <span dir="ltr" className="text-muted-foreground text-sm font-medium">
                Svenska · English · العربية
              </span>
            </div>
          </div>

          <div className="relative order-first md:order-last">
            <div className="border-border bg-card shadow-lg relative overflow-hidden rounded-2xl border">
              <Image
                src={image.src}
                alt={getLocalized(image.alt, locale)}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 768px) 480px, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>

            <div
              dir="ltr"
              className="bg-card border-border shadow-md absolute -top-4 start-4 hidden items-center gap-2 rounded-xl border px-3 py-2 sm:flex"
            >
              <ShieldCheck size={16} className="text-primary shrink-0" aria-hidden="true" />
              <span className="text-xs font-semibold whitespace-nowrap">
                {authorizationContent.firm.credential}
              </span>
            </div>
            <div className="bg-card border-border shadow-md absolute -bottom-4 end-4 hidden items-center gap-2 rounded-xl border px-3 py-2 sm:flex">
              <span className="text-xs font-semibold whitespace-nowrap">
                {quickServicesLabel[locale]}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
