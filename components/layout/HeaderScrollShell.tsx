"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Client-only visual shell for the sticky header: transparent at the top of
 * the page, gains a solid background + hairline + shadow once the page has
 * scrolled past a small threshold. Header itself stays a server component;
 * only this scroll-driven class toggle needs the client.
 */
export function HeaderScrollShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 ease-(--ease-standard)",
        scrolled
          ? "bg-background/95 border-border border-b shadow-sm backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {children}
    </div>
  );
}
