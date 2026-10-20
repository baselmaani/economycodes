"use client";

import { useState } from "react";
import Image from "next/image";

import type { Locale, Localized, MediaRef } from "@/content/types";
import { altFromFilename } from "@/lib/admin/alt-text";
import { Button } from "@/components/ui/button";
import { LocalizedField } from "./fields";
import { MediaPicker } from "./MediaPicker";

/** Same text in every locale, so comparing alts doesn't depend on key order. */
function sameAlt(a: Localized<string>, b: Localized<string>): boolean {
  return a.sv === b.sv && a.en === b.en && a.ar === b.ar;
}

/**
 * An image slot: shows the current image (the override, or the default when
 * there is none), lets the editor pick a replacement, and edits its alt text
 * for the active locale. With `autoAlt` (the page's meta title), a picked
 * image takes that as its alt text automatically.
 */
export function ImageField({
  id,
  label,
  hint,
  locale,
  value,
  fallback,
  autoAlt,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  locale: Locale;
  value: MediaRef | undefined;
  /** The default image; when absent the slot is optional and can be cleared. */
  fallback?: MediaRef;
  /** Alt text applied to every picked image (the page's meta title). */
  autoAlt?: Localized<string>;
  onChange: (next: MediaRef | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const shown = value ?? fallback;
  // Ignored while blank, e.g. a new article that has no title yet.
  const usableAutoAlt = autoAlt?.sv.trim() ? autoAlt : undefined;

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
        {value && (
          <LocalizedField
            id={`${id}-alt`}
            label="Alt text"
            locale={locale}
            value={value.alt}
            fallback={locale === "sv" ? undefined : { sv: value.alt.sv }}
            onChange={(alt) =>
              onChange({ ...value, alt: { ...alt, sv: alt.sv ?? "" } })
            }
            hint={
              value.alt.sv.trim() ? (
                "Describe the image for screen readers and search engines."
              ) : (
                <span className="text-destructive">
                  Swedish alt text is required
                  {locale === "sv" ? "." : " (switch to the Svenska tab)."}
                </span>
              )
            }
          />
        )}
        {value && usableAutoAlt && !sameAlt(value.alt, usableAutoAlt) && (
          <Button
            type="button"
            size="xs"
            variant="outline"
            className="self-start"
            onClick={() => onChange({ ...value, alt: usableAutoAlt })}
          >
            Use meta title as alt text
          </Button>
        )}
        {!value && shown && (
          <p className="text-muted-foreground text-xs">
            Alt: {shown.alt[locale] ?? shown.alt.sv}
          </p>
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
            alt: usableAutoAlt ??
              picked.alt ??
              value?.alt ??
              fallback?.alt ?? {
                sv: altFromFilename(picked.src.split("/").pop() ?? ""),
              },
          })
        }
      />
    </div>
  );
}
