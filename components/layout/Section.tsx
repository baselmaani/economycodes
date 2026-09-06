import type { ComponentProps, ElementType } from "react";

import { cn } from "@/lib/utils";

const tones = {
  base: "bg-background",
  tint: "bg-secondary/30",
  navy: "bg-brand-navy text-white",
} as const;

export function Section({
  as: Tag = "section",
  tone = "base",
  className,
  ...props
}: ComponentProps<"section"> & {
  as?: ElementType;
  tone?: keyof typeof tones;
}) {
  return (
    <Tag
      className={cn("py-16 sm:py-20 lg:py-24", tones[tone], className)}
      {...props}
    />
  );
}
