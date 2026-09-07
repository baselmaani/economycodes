import { ArrowRight, type LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceSlug } from "@/lib/routes";
import { getServiceIcon } from "@/content/service-icons";
import type { Service } from "@/content/types";
import { IconTile } from "@/components/marketing/IconTile";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Oversized, low-opacity corner watermark for "lg" cards. Takes the icon as
 * a prop (rather than resolving it inline) so it can safely render it as JSX. */
function CardWatermark({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <Icon
      aria-hidden="true"
      className="text-primary/[0.06] pointer-events-none absolute -end-4 -bottom-4 size-32"
    />
  );
}

export function ServiceCard({
  service,
  locale,
  readMoreLabel,
  featured = false,
  size = "default",
}: {
  service: Service;
  locale: AppLocale;
  readMoreLabel: string;
  featured?: boolean;
  size?: "default" | "lg";
}) {
  const Icon = getServiceIcon(service.key);
  const isLarge = size === "lg";

  return (
    <Link
      href={{
        pathname: "/tjanster/[slug]",
        params: { slug: getServiceSlug(locale, service) },
      }}
      className="group focus-visible:ring-ring block h-full rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <Card
        className={cn(
          "ring-border group-hover:ring-primary/30 relative h-full gap-5 overflow-hidden ring-1 transition-all duration-200 ease-(--ease-standard) group-hover:-translate-y-1 group-hover:shadow-md",
          isLarge ? "p-8" : "p-6",
          featured && "bg-secondary/40",
        )}
      >
        {isLarge && <CardWatermark icon={Icon} />}
        <CardHeader className="relative p-0">
          <IconTile
            icon={Icon}
            size={isLarge ? "lg" : "default"}
            className="mb-3"
          />
          <CardTitle
            className={cn("font-semibold", isLarge ? "text-xl" : "text-lg")}
          >
            {getLocalized(service.name, locale)}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-1 flex-col gap-4 p-0">
          <p className="text-muted-foreground text-body">
            {getLocalized(service.summary, locale)}
          </p>
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
