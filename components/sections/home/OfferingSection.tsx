import Image from "next/image";
import type { ReactNode } from "react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";
import type { MediaRef } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MediaFrame } from "@/components/marketing/MediaFrame";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { RevealScale } from "@/components/motion/RevealScale";

/**
 * Shared layout of the homepage's three offering sections (Redovisning,
 * Digital marknadsföring, Bokföringsprogram): heading, description and
 * actions beside an image, then the offering's cards underneath. Stacks
 * text → image → cards on small screens.
 */
export function OfferingSection({
  id,
  tone = "base",
  eyebrow,
  title,
  lead,
  actions,
  visual,
  imageSide = "end",
  children,
}: {
  id: string;
  tone?: "base" | "tint";
  eyebrow: string;
  title: string;
  lead: string;
  actions?: ReactNode;
  visual: ReactNode;
  /** Which side the image sits on from lg up; alternate between sections. */
  imageSide?: "start" | "end";
  /** The cards. */
  children: ReactNode;
}) {
  return (
    <Section tone={tone} id={id} className="scroll-mt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <SectionHeading
              align="start"
              eyebrow={eyebrow}
              title={title}
              lead={lead}
            />
            {actions ? <div className="mt-7">{actions}</div> : null}
          </Reveal>
          <RevealScale
            delay={120}
            className={cn(imageSide === "start" && "lg:order-first")}
          >
            {visual}
          </RevealScale>
        </div>
        <div className="mt-12 lg:mt-16">{children}</div>
      </Container>
    </Section>
  );
}

/** A section photo in the site's standard frame; 3:2 space is reserved, so no layout shift. */
export function OfferingImage({
  image,
  locale,
}: {
  image: MediaRef;
  locale: AppLocale;
}) {
  return (
    <MediaFrame className="aspect-[3/2]">
      <Image
        src={image.src}
        alt={getLocalized(image.alt, locale)}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </MediaFrame>
  );
}
