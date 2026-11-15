"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { MediaRef } from "@/content/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  listMediaAction,
  type MediaItem,
} from "@/app/admin/(dashboard)/media/actions";
import { MediaUploadButton } from "./MediaUploadButton";

export type PickedImage = Omit<MediaRef, "alt"> & { alt?: MediaRef["alt"] };

/** Dialog listing uploaded media, with an upload button. */
export function MediaPicker({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (image: PickedImage) => void;
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null);

  useEffect(() => {
    if (!open || items) return;
    listMediaAction().then(setItems);
  }, [open, items]);

  function pick(image: PickedImage) {
    onPick(image);
    onOpenChange(false);
  }

  const tiles = (items ?? []).map((item) => ({
    key: item.id,
    image: {
      src: item.url,
      width: item.width,
      height: item.height,
      alt: item.alt,
    },
    caption: item.alt.sv || (item.url.split("/").pop() ?? item.url),
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Choose an image</DialogTitle>
          <DialogDescription>
            Pick an uploaded image or upload a new one.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <MediaUploadButton
            label="Upload new"
            onUploaded={(uploaded) =>
              setItems((current) => [...uploaded, ...(current ?? [])])
            }
          />
        </div>

        {items === null ? (
          <p className="text-muted-foreground text-sm">Loading…</p>
        ) : tiles.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No uploads yet. Upload an image above.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {tiles.map(({ key, image, caption }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => pick(image)}
                  className="group border-border hover:ring-primary focus-visible:ring-primary block w-full overflow-hidden rounded-lg border text-start hover:ring-2 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <div className="bg-muted relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                  <p className="truncate px-2 py-1.5 text-xs">{caption}</p>
                  <p className="text-muted-foreground px-2 pb-1.5 text-[11px]">
                    {image.width} × {image.height}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
