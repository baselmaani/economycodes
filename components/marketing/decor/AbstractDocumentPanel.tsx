import Image from "next/image";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Reusable abstract "document/ledger" composition -- layered rounded panels
 * with placeholder ledger lines, a low-opacity icon watermark, and a
 * decorative border. Shared by the homepage Hero (dark tone) and every
 * service-detail page that has no approved photography (light tone), so the
 * whole site's visual system stays consistent without relying on stock
 * photos. Purely decorative -- no data, no interactivity.
 */
export function AbstractDocumentPanel({
  icon: Icon,
  tone = "light",
  className,
}: {
  icon: LucideIcon;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("relative mx-auto aspect-[4/5] max-w-sm", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-4 -rotate-2 rounded-3xl border backdrop-blur-sm",
          isDark
            ? "border-white/15 bg-white/[0.04]"
            : "border-border bg-secondary/40",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rotate-1 rounded-3xl border shadow-xl",
          isDark ? "border-white/20 bg-white/[0.06]" : "border-border bg-card",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 flex rotate-1 flex-col gap-3 rounded-3xl p-8"
      >
        <div
          className={cn(
            "h-2 w-2/3 rounded-full",
            isDark ? "bg-white/25" : "bg-primary/15",
          )}
        />
        <div
          className={cn(
            "h-2 w-full rounded-full",
            isDark ? "bg-white/15" : "bg-border",
          )}
        />
        <div
          className={cn(
            "h-2 w-5/6 rounded-full",
            isDark ? "bg-white/15" : "bg-border",
          )}
        />
        <div
          className={cn(
            "mt-4 h-24 w-full rounded-xl border",
            isDark
              ? "border-white/15 bg-white/[0.03]"
              : "border-border bg-secondary/30",
          )}
        />
        <div
          className={cn(
            "h-2 w-1/2 rounded-full",
            isDark ? "bg-white/15" : "bg-border",
          )}
        />
        <div
          className={cn(
            "h-2 w-3/4 rounded-full",
            isDark ? "bg-white/15" : "bg-border",
          )}
        />
      </div>
      <Icon
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 m-auto size-24",
          isDark ? "text-white/10" : "text-primary/10",
        )}
      />
      <Image
        src="/media/optimized/logo-stacked.webp"
        alt=""
        aria-hidden="true"
        width={64}
        height={64}
        className={cn(
          "pointer-events-none absolute end-6 bottom-6 size-10 object-contain",
          isDark ? "opacity-20" : "opacity-10",
        )}
      />
    </div>
  );
}
