"use client";

import { useEffect, useRef, type ReactNode } from "react";

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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hiddenClass = axis === "x" ? "scale-x-0" : "scale-y-0";
    const originClasses =
      axis === "x" ? ["origin-left", "rtl:origin-right"] : ["origin-top"];

    node.style.transitionDelay = `${delay}ms`;
    node.classList.add(
      "transition-transform",
      "duration-700",
      "ease-(--ease-standard)",
      ...originClasses,
      hiddenClass,
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove(hiddenClass);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [axis, delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
