"use client";

import { useState } from "react";
import Image from "next/image";

import type { Locale, MediaRef } from "@/content/types";
import { Button } from "@/components/ui/button";
import { LocalizedField } from "./fields";
import { MediaPicker } from "./MediaPicker";

/**
 * An image slot: shows the current image (the override, or the default when
 * there is none), lets the editor pick a replacement, and edits its alt text
 * for the active locale.
 */
export function ImageField({
  id,
  label,
  hint,
  locale,
  value,
  fallback,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  locale: Locale;
  value: MediaRef | undefined;
  /** The default image; when absent the slot is optional and can be cleared. */
  fallback?: MediaRef;
  onChange: (next: MediaRef | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const shown = value ?? fallback;

  return (
    <div className="border-border flex flex-col gap-4 rounded-xl border p-4 sm:flex-row">
      <div className="bg-muted relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
        {shown ? (
          <Image
            src={shown.src}
            alt=""
            fill
            sizes="192px"
            className="object-cover"
          />
        ) : (
          <span className="text-muted-foreground absolute inset-0 flex items-center justify-center text-xs">
            No image
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className="text-muted-foreground text-xs">
            {shown
              ? `${shown.width} × ${shown.height}${value ? "" : " · default"}`
              : "Not set"}
            {hint && ` · ${hint}`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            {shown ? "Replace" : "Choose image"}
          </Button>
          {value && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => onChange(undefined)}
            >
              {fallback ? "Reset to default" : "Remove"}
            </Button>
          )}
        </div>
        {value ? (
          <LocalizedField
            id={`${id}-alt`}
            label="Alt text"
            locale={locale}
            value={value.alt}
            fallback={locale === "sv" ? undefined : { sv: value.alt.sv }}
            onChange={(alt) =>
              onChange({ ...value, alt: { ...alt, sv: alt.sv ?? "" } })
            }
            hint="Describe the image for screen readers and search engines."
          />
        ) : (
          shown && (
            <p className="text-muted-foreground text-xs">
              Alt: {shown.alt[locale] ?? shown.alt.sv}
            </p>
          )
        )}
      </div>
      <MediaPicker
        open={open}
        onOpenChange={setOpen}
        onPick={(picked) =>
          onChange({
            src: picked.src,
            width: picked.width,
            height: picked.height,
            alt: picked.alt ?? value?.alt ?? fallback?.alt ?? { sv: "" },
          })
        }
      />
    </div>
  );
}
