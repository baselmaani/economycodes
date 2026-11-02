"use client";

import { ArrowDown, ArrowUp, Lock } from "lucide-react";

import type { SectionDef } from "@/lib/cms/pages";
import type { PageLayout } from "@/lib/cms/schemas";
import { defaultHiddenSections, orderSections } from "@/lib/cms/resolve";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Order and visibility of an arrangeable page's sections. Locked sections
 * stay where they are; the others move among themselves.
 */
export function SectionLayoutField({
  sections,
  value,
  onChange,
}: {
  sections: SectionDef[];
  value: PageLayout | undefined;
  onChange: (layout: PageLayout | undefined) => void;
}) {
  const byKey = new Map(sections.map((section) => [section.key, section]));
  const order = orderSections(sections, value?.order);
  const movable = order.filter((key) => !byKey.get(key)?.locked);
  const hidden = new Set(value?.hidden ?? defaultHiddenSections(sections));

  function move(key: string, delta: -1 | 1) {
    const index = movable.indexOf(key);
    const target = index + delta;
    if (target < 0 || target >= movable.length) return;
    const next = [...movable];
    [next[index], next[target]] = [next[target], next[index]];
    onChange({ ...value, order: next });
  }

  function setVisible(key: string, visible: boolean) {
    const next = new Set(hidden);
    if (visible) next.delete(key);
    else next.add(key);
    onChange({ ...value, hidden: [...next] });
  }

  return (
    <div className="flex flex-col gap-3">
      <ol className="border-border divide-border divide-y rounded-xl border">
        {order.map((key) => {
          const section = byKey.get(key)!;
          const isHidden = !section.locked && hidden.has(key);
          const position = movable.indexOf(key);
          return (
            <li
              key={key}
              className="flex items-center justify-between gap-3 px-3 py-2"
            >
              <span
                className={cn(
                  "flex items-center gap-2 text-sm font-medium",
                  isHidden && "text-muted-foreground line-through",
                )}
              >
                {section.label}
                {isHidden && <Badge variant="outline">Hidden</Badge>}
              </span>
              {section.locked ? (
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Lock size={12} aria-hidden="true" /> Always shown
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs">
                    <input
                      type="checkbox"
                      className="accent-primary size-4"
                      checked={!isHidden}
                      onChange={(event) =>
                        setVisible(key, event.target.checked)
                      }
                    />
                    Visible
                  </label>
                  <div className="flex gap-0.5">
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="ghost"
                      aria-label={`Move ${section.label} up`}
                      onClick={() => move(key, -1)}
                      disabled={position === 0}
                    >
                      <ArrowUp />
                    </Button>
                    <Button
                      type="button"
                      size="icon-xs"
                      variant="ghost"
                      aria-label={`Move ${section.label} down`}
                      onClick={() => move(key, 1)}
                      disabled={position === movable.length - 1}
                    >
                      <ArrowDown />
                    </Button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {value && (
        <Button
          type="button"
          size="xs"
          variant="ghost"
          className="self-start"
          onClick={() => onChange(undefined)}
        >
          Reset layout
        </Button>
      )}
    </div>
  );
}
