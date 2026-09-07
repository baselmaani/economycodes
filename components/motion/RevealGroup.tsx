"use client";

import { Children, type ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";

/**
 * Wraps a fixed set of children (bento cards, benefit tiles, process steps)
 * and gives each an incrementing Reveal delay, so they cascade in on
 * intersection instead of firing simultaneously. Each child is its own
 * Reveal instance -- this just computes the stagger delay.
 */
export function RevealGroup({
  children,
  step = 80,
  className,
}: {
  children: ReactNode;
  step?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <Reveal delay={i * step}>{child}</Reveal>
      ))}
    </div>
  );
}
