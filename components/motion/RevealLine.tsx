"use client";

import { useRef, type ReactNode } from "react";

import { useReveal } from "@/components/motion/useReveal";
import { cn } from "@/lib/utils";

/**
 * Same progressive-enhancement scroll reveal as Reveal.tsx, but draws a
 * decorative connecting line in on intersection by scaling it from 0 along
 * one axis (transform only, never width/height, to avoid layout thrash).
 * Used for the process-steps and nationwide-coverage connecting lines.
 */
export function RevealLine({
  children,
  axis = "x",
  className,
  delay = 0,
}: {
  children: ReactNode;
  axis?: "x" | "y";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, {
    delay,
    armClasses: [
      "transition-transform",
      "duration-700",
      "ease-(--ease-standard)",
      ...(axis === "x" ? ["origin-left", "rtl:origin-right"] : ["origin-top"]),
    ],
    hiddenClasses: [axis === "x" ? "scale-x-0" : "scale-y-0"],
  });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
