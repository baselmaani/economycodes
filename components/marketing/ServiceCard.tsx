import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceSlug } from "@/lib/routes";
import { getServiceIcon } from "@/content/service-icons";
import type { Service } from "@/content/types";
import { IconTile } from "@/components/marketing/IconTile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ServiceCard({
  service,
  locale,
  readMoreLabel,
  featured = false,
}: {
  service: Service;
  locale: AppLocale;
  readMoreLabel: string;
  featured?: boolean;
}) {
  const Icon = getServiceIcon(service.key);

  return (
    <Link
      href={{
        pathname: "/tjanster/[slug]",
        params: { slug: getServiceSlug(locale, service) },
      }}
      className="group focus-visible:ring-ring block h-full rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
    >
      <Card
        className={
          "ring-border h-full gap-5 p-6 ring-1 transition-all duration-200 ease-(--ease-standard) group-hover:-translate-y-1 group-hover:shadow-md" +
          (featured ? " bg-secondary/40" : "")
        }
      >
        <CardHeader className="p-0">
          <IconTile icon={Icon} className="mb-3" />
          <CardTitle className="text-lg font-semibold">
            {getLocalized(service.name, locale)}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4 p-0">
          <p className="text-muted-foreground text-body">
            {getLocalized(service.summary, locale)}
          </p>
          <span className="text-primary mt-auto inline-flex items-center gap-1.5 text-sm font-medium">
            {readMoreLabel}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
