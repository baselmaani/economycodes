import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";

export interface BreadcrumbItem {
  label: string;
  /** Static pathname key from routing.pathnames. Omit for the current (last) page. */
  routeKey?: StaticAppPathname;
}

export function Breadcrumbs({
  items,
  label = "Breadcrumb",
}: {
  items: BreadcrumbItem[];
  /** Localized landmark name (messages nav.breadcrumb). */
  label?: string;
}) {
  return (
    <nav aria-label={label} className="not-prose text-muted-foreground text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight
                className="rtl:rotate-180"
                size={14}
                aria-hidden="true"
              />
            )}
            {item.routeKey ? (
              <Link
                href={item.routeKey}
                className="hover:text-foreground focus-visible:ring-ring/50 rounded-sm transition-colors focus-visible:ring-3 focus-visible:outline-none"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
