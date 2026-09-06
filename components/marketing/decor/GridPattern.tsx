import { cn } from "@/lib/utils";

/**
 * Restrained dot-grid decoration, brand-navy at very low opacity. Purely
 * presentational (aria-hidden), no data, no layout impact.
 */
export function GridPattern({ className }: { className?: string }) {
  const id = "eco-grid-pattern";

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute text-brand-navy/[0.06]", className)}
    >
      <defs>
        <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
