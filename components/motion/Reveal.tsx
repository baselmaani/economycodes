"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Progressive-enhancement scroll reveal. Renders children visible by
 * default -- if IntersectionObserver is unavailable or JS never runs, the
 * content simply stays visible. Class toggling happens directly on the DOM
 * node via the ref (not React state), so arming the transition or revealing
 * on intersect never triggers a render, only a style change.
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
      "translate-y-3",
      "opacity-0",
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove("translate-y-3", "opacity-0");
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
