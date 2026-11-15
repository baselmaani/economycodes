import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconTile } from "@/components/marketing/IconTile";

/** Bulleted list with check icons, for "what's included" style content. */
export function CheckList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <IconTile icon={CheckCircle2} size="sm" tone="primary" />
          <span className="text-muted-foreground mt-1.5">{item}</span>
        </li>
      ))}
    </ul>
  );
}
