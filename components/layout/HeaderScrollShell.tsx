"use client";

import { useEffect, useState, type ReactNode } from "react";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Client-only visual shell for the sticky header: transparent at the top of
 * the page, gains a solid background + hairline + shadow once the page has
 * scrolled past a small threshold. Header itself stays a server component;
 * only this scroll-driven class toggle needs the client.
 *
 * Only the homepage has a dark hero band under the header, so the frosted
 * "over-hero" treatment is scoped to "/" -- every other page starts on a
 * light background and the header should just render solid immediately.
 */
export function HeaderScrollShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = isHome && !scrolled;

  return (
    <div
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 ease-(--ease-standard)",
        overHero
          ? "border-b border-white/10 bg-white/10 backdrop-blur-md"
          : "bg-background/95 border-border border-b shadow-sm backdrop-blur-sm",
      )}
    >
      {children}
    </div>
  );
}
