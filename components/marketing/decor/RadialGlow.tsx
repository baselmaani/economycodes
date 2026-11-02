import { cn } from "@/lib/utils";

/**
 * Soft blue radial light, used behind hero/feature imagery. The gradient is
 * the softness on its own -- no blur filter or looping animation, which made
 * the browser repaint a large layer every frame. Purely presentational
 * (aria-hidden), no data, no layout impact.
 */
export function RadialGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full",
        "bg-[radial-gradient(closest-side,var(--brand-accent)_0%,transparent_70%)] opacity-20",
        className,
      )}
    />
  );
}
