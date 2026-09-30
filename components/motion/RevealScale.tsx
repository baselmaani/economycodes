"use client";

import { useRef, type ReactNode } from "react";

import { useReveal } from "@/components/motion/useReveal";
import { cn } from "@/lib/utils";

/**
 * Same progressive-enhancement scroll reveal as Reveal.tsx, but scales in
 * from 95% instead of translating up -- used for the hero/CTA composition's
 * "fade and scale gently" entrance.
 */
export function RevealScale({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, {
    delay,
    armClasses: ["transition-all", "duration-500", "ease-(--ease-standard)"],
    hiddenClasses: ["scale-95", "opacity-0"],
  });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
