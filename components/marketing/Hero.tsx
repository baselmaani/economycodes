import Image from "next/image";
import { ArrowRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { Reveal } from "@/components/motion/Reveal";
import { RevealScale } from "@/components/motion/RevealScale";
import { business } from "@/content/business";
import { authorizationContent } from "@/content/home";
import { hadi } from "@/content/people";
import { getLocalized } from "@/lib/i18n-content";
import type { AppLocale } from "@/i18n/routing";

export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel,
  servicesCtaLabel,
}: {
  locale: AppLocale;
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  primaryCtaLabel: string;
  servicesCtaLabel: string;
}) {
  const floatingLabels: Record<AppLocale, string[]> = {
    sv: ["Bokföring", "Löneadministration", "Bokslut & årsredovisning"],
    en: ["Bookkeeping", "Payroll", "Annual accounts"],
    ar: ["المحاسبة", "إدارة الرواتب", "الحسابات الختامية"],
  };
  const [labelOne, labelTwo, labelThree] = floatingLabels[locale];

  return (
    <Section tone="gradient" bleed className="lg:py-28">
      <GridPattern className="inset-0 hidden size-full text-white/[0.08] sm:block" />
      <RadialGlow className="-end-40 top-1/3 size-[42rem] -translate-y-1/2" />
      <div
        aria-hidden="true"
        className="bg-radial-glow pointer-events-none absolute -start-24 bottom-0 size-80 rounded-full opacity-20 blur-3xl"
      />

      <Container>
        <div className="relative grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            {eyebrow && (
              <Reveal delay={0}>
                <span className="text-brand-bright text-sm font-semibold tracking-wide uppercase">
                  {eyebrow}
                </span>
              </Reveal>
            )}
            <Reveal delay={80}>
              <h1 className="text-hero font-semibold text-balance text-white">
                {title}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-body max-w-prose text-white/80">{subtitle}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  render={<Link href="/kontakt" />}
                  variant="shine"
                  size="xl"
                  className="gap-2"
                >
                  {primaryCtaLabel}
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="rtl:rotate-180"
                  />
                </Button>
                <Button
                  render={<Link href="/tjanster" />}
                  size="xl"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  {servicesCtaLabel}
                </Button>
                <a
                  href={business.phoneHref}
                  className="inline-flex items-center gap-2 px-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  <Phone
                    size={16}
                    aria-hidden="true"
                    className="text-brand-bright"
                  />
                  <span dir="ltr">{business.phone}</span>
                </a>
                <a
                  href={business.whatsappHref}
                  className="inline-flex items-center gap-2 px-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  <MessageCircle
                    size={16}
                    aria-hidden="true"
                    className="text-brand-bright"
                  />
                  WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/20 pt-5">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
                  <ShieldCheck
                    size={16}
                    className="text-brand-bright shrink-0"
                    aria-hidden="true"
                  />
                  <span dir="ltr">{authorizationContent.firm.credential}</span>
                </span>
                <span dir="ltr" className="text-sm font-medium text-white/80">
                  Svenska · English · العربية
                </span>
              </div>
            </Reveal>
          </div>

          <RevealScale delay={280} className="relative">
            <div className="relative mx-auto aspect-[400/439] max-w-xs sm:max-w-sm">
              <div
                aria-hidden="true"
                className="absolute inset-4 -rotate-2 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-sm"
              />
              <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                <Image
                  src={hadi.heroPhoto.src}
                  alt={getLocalized(hadi.heroPhoto.alt, locale)}
                  fill
                  sizes="(min-width: 640px) 384px, 320px"
                  priority
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="from-brand-navy/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                />
              </div>

              <div
                dir="ltr"
                className="absolute start-6 -top-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 shadow-md backdrop-blur-sm animate-[eco-float_5s_ease-in-out_infinite] [animation-delay:-2s]"
              >
                <ShieldCheck
                  size={16}
                  className="text-brand-bright shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold whitespace-nowrap text-white">
                  {authorizationContent.firm.credential}
                </span>
              </div>
              <div className="absolute -end-4 top-1/4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-md backdrop-blur-sm animate-[eco-float_4s_ease-in-out_infinite] [animation-delay:-1.3s]">
                {labelOne}
              </div>
              <div className="absolute -start-6 bottom-1/3 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-md backdrop-blur-sm animate-[eco-float_4.5s_ease-in-out_infinite] [animation-delay:-2.6s]">
                {labelTwo}
              </div>
              <div className="absolute end-2 -bottom-4 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-md backdrop-blur-sm animate-[eco-float_3.5s_ease-in-out_infinite] [animation-delay:-0.7s]">
                {labelThree}
              </div>
              <div
                dir="ltr"
                className="absolute -start-4 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-md backdrop-blur-sm animate-[eco-float_5s_ease-in-out_infinite] [animation-delay:-3.5s]"
              >
                Svenska · English · العربية
              </div>
            </div>
          </RevealScale>
        </div>
      </Container>
    </Section>
  );
}
