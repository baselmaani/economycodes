import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent text-accent-foreground",
  white: "bg-white/15 text-white",
} as const;

export function IconTile({
  icon: Icon,
  tone = "primary",
  size = "default",
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: "default" | "sm";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        size === "sm" ? "size-9" : "size-11",
        tones[tone],
        className,
      )}
    >
      <Icon
        size={size === "sm" ? 18 : 22}
        aria-hidden="true"
        strokeWidth={1.75}
      />
    </span>
  );
}
