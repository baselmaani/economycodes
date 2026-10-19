"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Check, Copy, Trash2 } from "lucide-react";

import type { Locale } from "@/content/types";
import { MediaUploadButton } from "@/components/admin/MediaUploadButton";
import {
  ErrorList,
  LocaleTabs,
  LocalizedField,
} from "@/components/admin/fields";
import { Button } from "@/components/ui/button";
import {
  deleteMediaAction,
  updateMediaAltAction,
  type MediaItem,
} from "./actions";

function formatSize(bytes: number): string {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} kB`;
}

function MediaCard({
  item,
  locale,
  onDeleted,
}: {
  item: MediaItem;
  locale: Locale;
  onDeleted: () => void;
}) {
  const [alt, setAlt] = useState(item.alt);
  const [dirty, setDirty] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  function saveAlt() {
    startTransition(async () => {
      const result = await updateMediaAltAction(item.id, alt);
      if (result.ok) {
        setDirty(false);
        setErrors([]);
      } else setErrors(result.errors);
    });
  }

  function remove() {
    if (!window.confirm("Delete this image permanently?")) return;
    startTransition(async () => {
      const result = await deleteMediaAction(item.id);
      if (result.ok) onDeleted();
      else setErrors(result.errors);
    });
  }

  return (
    <li className="bg-card border-border flex flex-col overflow-hidden rounded-2xl border">
      <div className="bg-muted relative aspect-[4/3]">
        <Image
          src={item.url}
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-muted-foreground text-xs">
          {item.width} × {item.height} · {formatSize(item.size)} ·{" "}
          {item.createdAt.slice(0, 10)}
        </p>
        <LocalizedField
          id={`media-${item.id}`}
          label="Alt text"
          locale={locale}
          value={alt}
          fallback={locale === "sv" ? undefined : { sv: alt.sv }}
          onChange={(next) => {
            setAlt({ ...next, sv: next.sv ?? "" });
            setDirty(true);
          }}
        />
        <ErrorList errors={errors} />
        <div className="mt-auto flex flex-wrap gap-1">
          <Button size="sm" onClick={saveAlt} disabled={!dirty || pending}>
            Save alt
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={async () => {
              await navigator.clipboard.writeText(item.url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy URL"}
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Delete image"
            className="text-destructive ms-auto"
            onClick={remove}
            disabled={pending}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </li>
  );
}

export function MediaLibrary({ initial }: { initial: MediaItem[] }) {
  const [items, setItems] = useState(initial);
  const [locale, setLocale] = useState<Locale>("sv");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <MediaUploadButton
          onUploaded={(uploaded) =>
            setItems((current) => [...uploaded, ...current])
          }
        />
        <LocaleTabs value={locale} onChange={setLocale} />
      </div>
      <p className="text-muted-foreground max-w-2xl text-xs">
        Alt text here is the default when an image is chosen for a page or
        article; each use can then adjust it. Images in use can&apos;t be
        deleted.
      </p>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No uploads yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              locale={locale}
              onDeleted={() =>
                setItems((current) =>
                  current.filter((other) => other.id !== item.id),
                )
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
}
