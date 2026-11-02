import Image from "next/image";

import { getLocalized } from "@/lib/i18n-content";
import { getCmsIcon } from "@/lib/cms/icons";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { IconTile } from "@/components/marketing/IconTile";
import { MediaFrame } from "@/components/marketing/MediaFrame";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { RevealScale } from "@/components/motion/RevealScale";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionProps } from "../types";

/** Benefits grid next to an image. */
export function BenefitsSection({ locale, content }: SectionProps) {
  const { text, collections, images } = content;

  return (
    <Section tone="tint">
      <Container>
        <Reveal>
          <SectionHeading title={getLocalized(text.benefitsTitle, locale)} />
        </Reveal>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.85fr_1fr]">
          <RevealScale>
            <MediaFrame className="aspect-[3/2] lg:aspect-[4/3]">
              <Image
                src={images.benefitsImage.src}
                alt={getLocalized(images.benefitsImage.alt, locale)}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </MediaFrame>
          </RevealScale>
          <RevealGroup step={100} className="grid gap-6 sm:grid-cols-2">
            {collections.benefits.map(({ icon, title, body }, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl p-6",
                  index % 3 === 0 && "bg-card border-border border shadow-sm",
                )}
              >
                <IconTile icon={getCmsIcon(icon?.sv)} />
                <h3 className="font-semibold">{getLocalized(title, locale)}</h3>
                <p className="text-muted-foreground text-body">
                  {getLocalized(body, locale)}
                </p>
              </div>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
