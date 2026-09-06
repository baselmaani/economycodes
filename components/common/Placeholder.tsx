import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

/**
 * Wraps any fact that isn't yet confirmed by the client (see CLIENT-TODO.md).
 * Renders a visibly neutral note instead of a fabricated value -- never
 * silently omit it, since a missing fact is easy to overlook during review.
 */
export async function Placeholder({ className }: { className?: string }) {
  const t = await getTranslations("common");
  return (
    <span
      className={cn(
        "border-border bg-muted text-muted-foreground inline-flex items-center rounded-sm border border-dashed px-2 py-0.5 text-sm italic",
        className,
      )}
    >
      {t("toBeConfirmed")}
    </span>
  );
}
