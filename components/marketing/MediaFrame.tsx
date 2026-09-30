import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Rounded, bordered photo/video frame with a soft navy fade at the bottom --
 * the same treatment as the Hero portrait, shared so every photo or clip on
 * the site reads as one set. Children are expected to fill the frame (e.g.
 * `next/image` with `fill`), so the caller sets the aspect ratio via
 * `className`.
 */
export function MediaFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border relative overflow-hidden rounded-3xl border shadow-xl",
        className,
      )}
    >
      {children}
      <div
        aria-hidden="true"
        className="from-brand-navy/30 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
      />
    </div>
  );
}
