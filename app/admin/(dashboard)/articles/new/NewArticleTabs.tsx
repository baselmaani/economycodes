"use client";

import { useState, type ReactNode } from "react";
import { FileJson, PenLine } from "lucide-react";

import { cn } from "@/lib/utils";

export function NewArticleTabs({
  importView,
  formView,
}: {
  importView: ReactNode;
  formView: ReactNode;
}) {
  const [tab, setTab] = useState<"import" | "form">("import");
  const tabs = [
    { value: "import", label: "Import JSON", icon: FileJson },
    { value: "form", label: "Write in the editor", icon: PenLine },
  ] as const;

  return (
    <>
      <div role="tablist" className="bg-muted mb-6 inline-flex rounded-lg p-1">
        {tabs.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            onClick={() => setTab(value)}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium",
              tab === value
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      {tab === "import" ? importView : formView}
    </>
  );
}
