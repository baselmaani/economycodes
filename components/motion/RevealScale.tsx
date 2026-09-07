"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Same progressive-enhancement scroll reveal as Reveal.tsx, but scales in
 * from 95% instead of translating up -- used for the hero/CTA composition's
 * "fade and scale gently" entrance. Kept as a sibling file rather than a
 * shared hook since there are only two variants so far.
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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.style.transitionDelay = `${delay}ms`;
    node.classList.add(
      "transition-all",
      "duration-500",
      "ease-(--ease-standard)",
      "scale-95",
      "opacity-0",
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove("scale-95", "opacity-0");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
