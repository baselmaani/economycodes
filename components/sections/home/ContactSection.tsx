import Image from "next/image";
import { Clock } from "lucide-react";

import { getLocalized } from "@/lib/i18n-content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { getServiceOptions } from "@/lib/service-lookup";
import { ContactMethods } from "@/components/marketing/ContactMethods";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "../types";

/** Contact form and direct contact methods; the hero CTA scrolls here (#kontakt). */
export function ContactSection({ locale, content }: SectionProps) {
  const { text } = content;

  return (
    <Section
      id="kontakt"
      tone="gradient"
      bleed
      className="scroll-mt-16"
      aria-labelledby="home-contact-title"
    >
      <Image
        src="/media/optimized/logo-stacked.webp"
        alt=""
        aria-hidden="true"
        width={280}
        height={280}
        className="pointer-events-none absolute top-1/2 left-1/4 size-64 -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.06] rtl:left-3/4"
      />
      <div
        aria-hidden="true"
        className="bg-radial-glow pointer-events-none absolute top-0 left-1/2 size-[32rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
      />
      <Container className="relative grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <Reveal>
            <span className="text-brand-bright text-sm font-semibold tracking-wide uppercase">
              {getLocalized(text.contactEyebrow, locale)}
            </span>
            <h2
              id="home-contact-title"
              className="text-section-h2 mt-2 font-semibold text-balance"
            >
              {getLocalized(text.contactTitle, locale)}
            </h2>
            <p className="text-body mt-4 max-w-prose text-white/85">
              {getLocalized(text.contactLead, locale)}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <ContactMethods tone="onDark" className="max-w-sm" />
          </Reveal>
          <Reveal delay={120}>
            <p className="flex items-center gap-2 text-sm text-white/75">
              <Clock
                size={16}
                aria-hidden="true"
                className="text-brand-bright"
              />
              {getLocalized(text.contactResponseTime, locale)}
            </p>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <ContactForm
            locale={locale}
            serviceOptions={getServiceOptions(locale)}
            variant="card"
            title={getLocalized(text.contactFormTitle, locale)}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
