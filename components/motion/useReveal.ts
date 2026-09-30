"use client";

import { useEffect, type RefObject } from "react";

/**
 * Shared progressive-enhancement scroll reveal for Reveal, RevealScale and
 * RevealLine. Content is server-rendered visible; on mount, the hidden
 * classes are added only to nodes that are still *below* the viewport, then
 * removed when they scroll into view. Anything already on screen at load
 * (hero heading, CTAs, portrait) is left alone -- hiding it after hydration
 * would flash visible -> blank -> fade-in and delay the perceived load.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  {
    delay = 0,
    armClasses,
    hiddenClasses,
  }: {
    delay?: number;
    /** Transition/origin classes added once, when the node is armed. */
    armClasses: string[];
    /** Classes removed on intersection to play the reveal. */
    hiddenClasses: string[];
  },
) {
  // Class lists are joined into a string dependency so callers can pass
  // inline array literals without re-running the effect on every render.
  const arm = armClasses.join(" ");
  const hidden = hiddenClasses.join(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    const hiddenList = hidden.split(" ");
    node.style.transitionDelay = `${delay}ms`;
    node.classList.add(...arm.split(" "), ...hiddenList);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove(...hiddenList);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, delay, arm, hidden]);
}
