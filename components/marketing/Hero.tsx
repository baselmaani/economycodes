import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  Calculator,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AbstractDocumentPanel } from "@/components/marketing/decor/AbstractDocumentPanel";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { getBusiness } from "@/lib/cms/site";
import { getLocalized } from "@/lib/i18n-content";
import type { AppLocale } from "@/i18n/routing";
import type { MediaRef } from "@/content/types";

export interface HeroEntry {
  key: string;
  href: StaticAppPathname;
  label: string;
  /** Who does the work / who it's for, in a few words. */
  description: string;
  icon: LucideIcon;
}

/**
 * Homepage hero: headline, a one-paragraph answer to "what does Economy
 * Codes do", and one clearly labelled entry point per offering. Not
 * animated: it is above the fold and holds the page's LCP.
 */
export async function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  entries,
  entriesLabel,
  contactLabel,
  photo,
  credential,
}: {
  locale: AppLocale;
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  entries: HeroEntry[];
  /** Accessible name for the entry-point list. */
  entriesLabel: string;
  /** Quiet fallback action for visitors who aren't sure yet. */
  contactLabel: string;
  /** Picked in the dashboard; a decorative panel stands in until then. */
  photo?: MediaRef;
  /** Firm credential shown in the floating badge. */
  credential: string;
}) {
  const business = await getBusiness();
  const quietLink =
    "inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-white/90 transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-white/60 focus-visible:outline-none";

  return (
    <Section tone="gradient" bleed className="pt-10 sm:pt-16 lg:py-24">
      <GridPattern className="inset-0 hidden size-full text-white/[0.08] sm:block" />
      <RadialGlow className="-end-40 top-1/3 size-[42rem] -translate-y-1/2" />
      <div
        aria-hidden="true"
        className="bg-radial-glow pointer-events-none absolute -start-24 bottom-0 size-80 rounded-full opacity-20 blur-3xl"
      />

      <Container>
        <div className="relative grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-5">
            {eyebrow && (
              <span className="text-brand-bright text-sm font-semibold tracking-wide uppercase">
                {eyebrow}
              </span>
            )}
            {/* No auto-hyphenation: the compounds fit unbroken from 390px up. */}
            <h1 className="text-page-h1 font-semibold text-balance hyphens-manual text-white">
              {title}
            </h1>
            <p className="text-body max-w-prose text-white/80">{subtitle}</p>

            <nav aria-label={entriesLabel} className="pt-1">
              <ul className="flex flex-col gap-3">
                {entries.map(
                  ({ key, href, label, description, icon: Icon }) => (
                    <li key={key}>
                      <Link
                        href={href}
                        data-offering={key}
                        className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/[0.07] p-4 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.12] focus-visible:ring-3 focus-visible:ring-white/70 focus-visible:outline-none"
                      >
                        <span
                          aria-hidden="true"
                          className="bg-brand-bright/15 text-brand-bright flex size-11 shrink-0 items-center justify-center rounded-xl"
                        >
                          <Icon size={22} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-lg font-semibold text-white">
                            {label}
                          </span>
                          <span className="text-sm text-white/75">
                            {description}
                          </span>
                        </span>
                        <ArrowRight
                          size={20}
                          aria-hidden="true"
                          className="shrink-0 text-white/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-white/20 pt-4">
              {/* The homepage ends with the contact form (#kontakt). */}
              <a
                href="#kontakt"
                className={cn(quietLink, "font-semibold text-white")}
              >
                {contactLabel}
                <ArrowDown size={16} aria-hidden="true" />
              </a>
              <a href={business.phoneHref} className={quietLink}>
                <Phone
                  size={16}
                  aria-hidden="true"
                  className="text-brand-bright"
                />
                <span dir="ltr">{business.phone}</span>
              </a>
              {business.whatsappHref ? (
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={quietLink}
                >
                  <MessageCircle
                    size={16}
                    aria-hidden="true"
                    className="text-brand-bright"
                  />
                  WhatsApp
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[400/439] max-w-xs sm:max-w-sm">
              {photo ? (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-4 -rotate-2 rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
                    <Image
                      src={photo.src}
                      alt={getLocalized(photo.alt, locale)}
                      fill
                      sizes="(min-width: 640px) 384px, 320px"
                      loading="eager"
                      fetchPriority="high"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="from-brand-navy/40 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                    />
                  </div>
                </>
              ) : (
                <AbstractDocumentPanel
                  icon={Calculator}
                  tone="dark"
                  className="absolute inset-0 aspect-auto max-w-none"
                />
              )}

              <div
                dir="ltr"
                className="bg-brand-navy/90 absolute start-6 -top-4 flex animate-[eco-float_5s_ease-in-out_infinite] items-center gap-2 rounded-xl border border-white/15 px-3 py-2 shadow-md [animation-delay:-2s]"
              >
                <ShieldCheck
                  size={16}
                  className="text-brand-bright shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs font-semibold whitespace-nowrap text-white">
                  {credential}
                </span>
              </div>
              <div
                dir="ltr"
                className="bg-brand-navy/90 absolute -start-4 top-6 animate-[eco-float_5s_ease-in-out_infinite] rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-md [animation-delay:-3.5s]"
              >
                Svenska · English · العربية
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
