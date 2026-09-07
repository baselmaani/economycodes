"use client";

import type { ComponentProps } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Top-level nav link with an active-page underline indicator. Shared by the
 * desktop header and the mobile menu so both stay in sync. Forwards all
 * extra props (Base UI's NavigationMenuLink `render` injects its own
 * handlers/data-attributes onto the rendered element).
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
      className={cn(
        "relative",
        isActive &&
          "after:bg-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full",
        className,
      )}
      {...props}
    />
  );
}
