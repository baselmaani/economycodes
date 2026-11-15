import type { ComponentProps } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { IconTile } from "@/components/marketing/IconTile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Card linking to a page: icon, title, short text and a "read more" row.
 * Same look as ServiceCard, for links that aren't services (e.g. the
 * accounting software's feature pages).
 */
export function LinkCard({
  href,
  icon,
  title,
  text,
  readMoreLabel,
}: {
  href: ComponentProps<typeof Link>["href"];
  icon: LucideIcon;
  title: string;
  text: string;
  readMoreLabel: string;
}) {
  return (
    <Link
      href={href}
      className="group focus-visible:ring-ring block h-full rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <Card className="ring-border group-hover:ring-primary/30 relative h-full gap-3 overflow-hidden p-5 ring-1 transition-all duration-200 ease-(--ease-standard) group-hover:-translate-y-1 group-hover:shadow-md">
        <CardHeader className="relative flex items-center gap-3 p-0">
          <IconTile icon={icon} size="sm" />
          <CardTitle className="text-base leading-snug font-semibold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-1 flex-col gap-3 p-0">
          <p className="text-muted-foreground text-sm">{text}</p>
          <span className="text-primary mt-auto inline-flex items-center gap-1.5 text-sm font-medium">
            {readMoreLabel}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
