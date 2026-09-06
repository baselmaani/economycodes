import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const sizes = {
  /** Wide marketing sections, grids. */
  wide: "max-w-7xl",
  /** Centered text-forward sections. */
  narrow: "max-w-4xl",
  /** Long-form article/service body copy. */
  content: "max-w-3xl",
} as const;

export function Container({
  size = "wide",
  className,
  ...props
}: ComponentProps<"div"> & { size?: keyof typeof sizes }) {
  return (
    <div
      className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizes[size], className)}
      {...props}
    />
  );
}
