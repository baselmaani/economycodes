"use client";

import { createElement } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import type { Locale } from "@/content/types";
import type { CollectionFieldDef } from "@/lib/cms/pages";
import type { PartialLocalized } from "@/lib/cms/schemas";
import { CMS_ICON_NAMES, getCmsIcon } from "@/lib/cms/icons";
import { Button } from "@/components/ui/button";
import { FieldShell, LocalizedField } from "./fields";

export type CollectionValue = Record<string, PartialLocalized>[];

function IconSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (name: string) => void;
}) {
  return (
    <FieldShell id={id} label="Icon">
      <div className="flex items-center gap-2">
        <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
          {createElement(getCmsIcon(value), {
            size: 18,
            "aria-hidden": true,
          })}
        </span>
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="border-input h-9 w-full rounded-md border bg-transparent px-2 text-sm"
        >
          {CMS_ICON_NAMES.map((name) => (
            <option key={name} value={name}>
              {name.replace(/([a-z])([A-Z0-9])/g, "$1 $2")}
            </option>
          ))}
        </select>
      </div>
    </FieldShell>
  );
}

/**
 * Edits a repeatable group (process steps, benefits, office FAQs). Shows the
 * original items until something changes; the first edit copies them into
 * the override, and "Use original" drops it again.
 */
export function CollectionField({
  id,
  def,
  locale,
  value,
  onChange,
}: {
  id: string;
  def: CollectionFieldDef;
  locale: Locale;
  value: CollectionValue | undefined;
  onChange: (next: CollectionValue | undefined) => void;
}) {
  const items: CollectionValue = value ?? def.default;
  const fixed = def.fixedLength ?? false;

  function setItem(index: number, key: string, next: PartialLocalized) {
    onChange(
      items.map((item, i) => (i === index ? { ...item, [key]: next } : item)),
    );
  }

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function add() {
    const blank = Object.fromEntries(
      def.fields.map((field) => [
        field.key,
        { sv: field.kind === "icon" ? "CheckCircle2" : "" },
      ]),
    );
    onChange([...items, blank]);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium">{def.label}</p>
        {value ? (
          <Button
            type="button"
            size="xs"
            variant="ghost"
            onClick={() => onChange(undefined)}
          >
            Use original
          </Button>
        ) : (
          <span className="text-muted-foreground text-xs">Original</span>
        )}
      </div>
      {def.hint && <p className="text-muted-foreground text-xs">{def.hint}</p>}

      {items.map((item, index) => (
        <div
          key={index}
          className="border-border bg-background flex flex-col gap-3 rounded-xl border p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              {def.itemLabel} {index + 1}
            </span>
            {!fixed && (
              <div className="flex gap-0.5">
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  aria-label="Move up"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                >
                  <ArrowUp />
                </Button>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  aria-label="Move down"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                >
                  <ArrowDown />
                </Button>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="ghost"
                  aria-label={`Delete ${def.itemLabel.toLowerCase()}`}
                  className="text-destructive"
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          </div>
          {def.fields.map((field) => {
            const fieldId = `${id}-${index}-${field.key}`;
            const current = item[field.key];
            if (field.kind === "icon") {
              return (
                <IconSelect
                  key={field.key}
                  id={fieldId}
                  value={current?.sv ?? ""}
                  onChange={(name) => setItem(index, field.key, { sv: name })}
                />
              );
            }
            const plain = field.kind === "plain";
            return (
              <LocalizedField
                key={field.key}
                id={fieldId}
                label={plain ? `${field.label} (all languages)` : field.label}
                locale={plain ? "sv" : locale}
                multiline={field.kind === "textarea"}
                value={current}
                fallback={
                  !plain && locale !== "sv" && current?.sv
                    ? { sv: current.sv }
                    : undefined
                }
                onChange={(next) => setItem(index, field.key, next)}
              />
            );
          })}
        </div>
      ))}

      {!fixed && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="self-start"
          onClick={add}
        >
          <Plus aria-hidden="true" /> Add {def.itemLabel.toLowerCase()}
        </Button>
      )}
    </div>
  );
}
