import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GridPattern } from "@/components/marketing/decor/GridPattern";
import { RadialGlow } from "@/components/marketing/decor/RadialGlow";
import { Badge } from "@/components/ui/badge";

/**
 * Header for landing and detail pages: breadcrumbs, eyebrow, H1, a lead that
 * answers the page's main question directly, actions, and an optional visual.
 * On small screens the text always comes first so the H1 and the primary
 * action are on the first screen; a purely decorative visual can be hidden
 * there with `hideVisualOnMobile`.
 *
 * Server-rendered and not animated: it is above the fold and holds the LCP.
 */
export function PageHero({
  breadcrumbs,
  notice,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  lead,
  actions,
  visual,
  hideVisualOnMobile = false,
  children,
  className,
}: {
  breadcrumbs?: ReactNode;
  /** Shown under the breadcrumbs, e.g. a preview banner. */
  notice?: ReactNode;
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  lead?: ReactNode;
  actions?: ReactNode;
  visual?: ReactNode;
  hideVisualOnMobile?: boolean;
  /** Extra content under the actions (e.g. a short facts list). */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Section
      tone="tint"
      bleed
      className={cn("pt-8 sm:pt-12 lg:pt-16", className)}
    >
      <GridPattern className="inset-0 hidden size-full sm:block" />
      <RadialGlow className="-end-32 -top-24 size-[32rem] opacity-10" />
      <Container size="wide" className="relative">
        {breadcrumbs}
        {notice}
        <div
          className={cn(
            "mt-6 grid items-center gap-10",
            visual && "lg:grid-cols-[1fr_1fr]",
          )}
        >
          <div className="max-w-2xl">
            {eyebrow ? (
              <Badge className="h-auto gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
                {EyebrowIcon ? (
                  <EyebrowIcon size={14} aria-hidden="true" />
                ) : null}
                {eyebrow}
              </Badge>
            ) : null}
            <h1 className="text-page-h1 mt-4 font-semibold text-balance">
              {title}
            </h1>
            {lead ? (
              <div className="text-muted-foreground text-body mt-4 max-w-xl">
                {lead}
              </div>
            ) : null}
            {actions ? <div className="mt-7">{actions}</div> : null}
            {children}
          </div>
          {visual ? (
            <div className={cn(hideVisualOnMobile && "hidden lg:block")}>
              {visual}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
