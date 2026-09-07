import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

const tones = {
  base: "bg-background",
  tint: "bg-secondary/30",
  navy: "bg-brand-navy text-white",
  gradient: "bg-brand-gradient text-white",
  card: "bg-card",
} as const;

export function Section({
  as: Tag = "section",
  tone = "base",
  bleed = false,
  className,
  ...props
}: ComponentProps<"section"> & {
  as?: ElementType;
  tone?: keyof typeof tones;
  /** Adds relative/overflow-hidden for sections with absolutely-positioned decorative children. */
  bleed?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        bleed && "relative overflow-hidden",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
