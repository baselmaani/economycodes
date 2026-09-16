import type { ReactNode } from "react";

export function FeatureCard({ children }: { children: ReactNode }) {
  return (
    <div className="border-border bg-card flex h-full flex-col gap-4 rounded-2xl border p-8 shadow-md transition-all duration-200 ease-(--ease-standard) hover:-translate-y-1 hover:shadow-lg">
      {children}
    </div>
  );
}
