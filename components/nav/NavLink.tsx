"use client";

import type { ComponentProps } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Top-level nav link that flags the active page via a `data-active`
 * attribute. Shared by the desktop header and the mobile menu, which each
 * style the active state differently (pill vs. highlighted row) through
 * `data-[active]:*` classes in their own className. Forwards all extra props
 * (Base UI's NavigationMenuLink `render` injects its own handlers/
 * data-attributes onto the rendered element).
 */
export function NavLink({
  href,
  className,
  ...props
}: ComponentProps<typeof Link> & { href: StaticAppPathname }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive ? "" : undefined}
      className={cn("relative transition-colors", className)}
      {...props}
    />
  );
}
