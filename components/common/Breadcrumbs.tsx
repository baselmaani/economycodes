import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";

export interface BreadcrumbItem {
  label: string;
  /** Static pathname key from routing.pathnames. Omit for the current (last) page. */
  routeKey?: StaticAppPathname;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
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
                className="hover:text-foreground transition-colors"
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
