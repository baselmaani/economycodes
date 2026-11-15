import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { Reveal } from "@/components/motion/Reveal";

/** Closing call to action on a gradient band; pass dark-tone actions. */
export function CtaBand({
  title,
  body,
  actions,
}: {
  title: string;
  body?: string;
  actions: ReactNode;
}) {
  return (
    <Section tone="gradient" bleed>
      <GridPattern className="inset-0 hidden size-full text-white/[0.08] sm:block" />
      <Container
        size="narrow"
        className="relative flex flex-col items-center gap-6 text-center"
      >
        <Reveal>
          <h2 className="text-section-h2 font-semibold text-balance">
            {title}
          </h2>
        </Reveal>
        {body ? (
          <Reveal delay={80}>
            <p className="text-body max-w-prose text-white/85">{body}</p>
          </Reveal>
        ) : null}
        <Reveal delay={160}>{actions}</Reveal>
      </Container>
    </Section>
  );
}
