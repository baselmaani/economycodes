"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import type { ContentBlock, Locale } from "@/content/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { localeInputProps } from "./fields";

const BLOCK_LABELS: Record<ContentBlock["type"], string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  list: "Bullet list",
  disclaimer: "Disclaimer",
};

function newBlock(type: ContentBlock["type"]): ContentBlock {
  switch (type) {
    case "heading":
      return { type, level: 2, text: "" };
    case "list":
      return { type, items: [""] };
    default:
      return { type, text: "" };
  }
}

/**
 * Edits one locale's article body as a list of blocks (the ContentBlock
 * union rendered by components/content/ArticleBody). "Raw JSON" is an escape
 * hatch for pasting a whole body at once.
 */
export function BlockEditor({
  locale,
  blocks,
  onChange,
}: {
  locale: Locale;
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}) {
  const [raw, setRaw] = useState<string | null>(null);
  const [rawError, setRawError] = useState<string>();
  const { className: dirClass, ...dirProps } = localeInputProps(locale);

  function updateAt(index: number, block: ContentBlock) {
    onChange(blocks.map((current, i) => (i === index ? block : current)));
  }

  function move(index: number, delta: -1 | 1) {
    const target = index + delta;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function insertAt(index: number, type: ContentBlock["type"]) {
    const next = [...blocks];
    next.splice(index, 0, newBlock(type));
    onChange(next);
  }

  if (raw !== null) {
    return (
      <div className="flex flex-col gap-3">
        <Textarea
          value={raw}
          onChange={(event) => setRaw(event.target.value)}
          className="min-h-80 font-mono text-xs"
          dir="ltr"
          spellCheck={false}
        />
        {rawError && <p className="text-destructive text-xs">{rawError}</p>}
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              try {
                const parsed = JSON.parse(raw);
                if (!Array.isArray(parsed))
                  throw new Error("Expected an array of blocks");
                onChange(parsed);
                setRaw(null);
                setRawError(undefined);
              } catch (error) {
                setRawError(
                  error instanceof Error ? error.message : String(error),
                );
              }
            }}
          >
            Apply JSON
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setRaw(null)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="border-border bg-background rounded-xl border p-3"
        >
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {BLOCK_LABELS[block.type]}
              </span>
              {block.type === "heading" && (
                <select
                  aria-label="Heading level"
                  value={block.level}
                  onChange={(event) =>
                    updateAt(index, {
                      ...block,
                      level: Number(event.target.value) as 2 | 3,
                    })
                  }
                  className="border-input rounded-md border bg-transparent px-1.5 py-0.5 text-xs"
                >
                  <option value={2}>H2</option>
                  <option value={3}>H3</option>
                </select>
              )}
            </div>
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
                disabled={index === blocks.length - 1}
              >
                <ArrowDown />
              </Button>
              <Button
                type="button"
                size="icon-xs"
                variant="ghost"
                aria-label="Delete block"
                className="text-destructive"
                onClick={() => onChange(blocks.filter((_, i) => i !== index))}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
          {block.type === "list" ? (
            <Textarea
              aria-label="List items, one per line"
              value={block.items.join("\n")}
              onChange={(event) =>
                updateAt(index, {
                  ...block,
                  items: event.target.value.split("\n"),
                })
              }
              placeholder="One item per line"
              className={cn("min-h-20", dirClass)}
              {...dirProps}
            />
          ) : (
            <Textarea
              aria-label={BLOCK_LABELS[block.type]}
              value={block.text}
              onChange={(event) =>
                updateAt(index, { ...block, text: event.target.value })
              }
              className={cn(
                block.type === "heading"
                  ? "min-h-10 font-semibold"
                  : "min-h-24",
                dirClass,
              )}
              {...dirProps}
            />
          )}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(BLOCK_LABELS) as ContentBlock["type"][]).map((type) => (
          <Button
            key={type}
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertAt(blocks.length, type)}
          >
            <Plus aria-hidden="true" /> {BLOCK_LABELS[type]}
          </Button>
        ))}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="ms-auto"
          onClick={() => setRaw(JSON.stringify(blocks, null, 2))}
        >
          Raw JSON
        </Button>
      </div>
    </div>
  );
}
