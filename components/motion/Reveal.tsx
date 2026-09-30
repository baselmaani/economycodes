"use client";

import { useRef, type ReactNode } from "react";

import { useReveal } from "@/components/motion/useReveal";
import { cn } from "@/lib/utils";

/**
 * Progressive-enhancement scroll reveal: fades and lifts content in as it
 * scrolls into view. Renders children visible by default -- if
 * IntersectionObserver is unavailable, JS never runs, or the content is
 * already on screen at load, it simply stays visible (see useReveal).
 */
export function Reveal({
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
    hiddenClasses: ["translate-y-3", "opacity-0"],
  });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
