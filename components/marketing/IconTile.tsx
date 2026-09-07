import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const tones = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent text-accent-foreground",
  white: "bg-white/15 text-white",
  navy: "bg-white text-brand-navy shadow-sm",
} as const;

const sizes = {
  sm: { tile: "size-9", icon: 18 },
  default: { tile: "size-11", icon: 22 },
  lg: { tile: "size-14", icon: 26 },
} as const;

export function IconTile({
  icon: Icon,
  tone = "primary",
  size = "default",
  className,
}: {
  icon: LucideIcon;
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        sizes[size].tile,
        tones[tone],
        className,
      )}
    >
      <Icon size={sizes[size].icon} aria-hidden="true" strokeWidth={1.75} />
    </span>
  );
}
