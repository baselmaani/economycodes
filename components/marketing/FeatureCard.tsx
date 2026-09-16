import type { ReactNode } from "react";

export function FeatureCard({ children }: { children: ReactNode }) {
  return (
    <div className="border-border bg-card flex h-full flex-col gap-4 rounded-2xl border p-8 shadow-md">
      {children}
    </div>
  );
}
