import { cn } from "@/lib/utils";

/**
 * Soft blurred blue radial light, used behind hero/feature imagery. Purely
 * presentational (aria-hidden), no data, no layout impact.
 */
export function RadialGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        "bg-[radial-gradient(closest-side,var(--brand-accent)_0%,transparent_70%)] opacity-20",
        className,
      )}
    />
  );
}
