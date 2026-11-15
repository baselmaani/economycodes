import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "default",
  className,
  titleClassName,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "start";
  tone?: "default" | "inverted";
  className?: string;
  titleClassName?: string;
}) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-start",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-sm font-semibold tracking-wide uppercase",
            tone === "inverted" ? "text-white/70" : "text-primary",
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          // Whole words only; overflow-wrap (globals.css) still guards narrow screens.
          "text-section-h2 font-semibold text-balance hyphens-manual",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "text-body",
            tone === "inverted" ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
