"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Progressive-enhancement scroll reveal. Renders children visible by
 * default -- if IntersectionObserver is unavailable or JS never runs, the
 * content simply stays visible. Only when both the API exists AND the
 * visitor hasn't asked for reduced motion do we arm a hidden -> visible
 * transition on intersect, so nothing is ever stuck invisible.
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
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setArmed(true);
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={armed ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        armed &&
          "transition-all duration-500 ease-(--ease-standard)",
        armed && !visible && "translate-y-3 opacity-0",
        armed && visible && "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
