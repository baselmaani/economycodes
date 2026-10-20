"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createMediaAction,
  type MediaItem,
} from "@/app/admin/(dashboard)/media/actions";
import { altFromFilename } from "@/lib/admin/alt-text";
import { prepareImage } from "@/lib/admin/prepare-image";

async function uploadOne(picked: File): Promise<MediaItem> {
  const { file, width, height } = await prepareImage(picked);
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const blob = await upload(`media/${safeName}`, file, {
    access: "public",
    handleUploadUrl: "/api/admin/blob",
    contentType: file.type,
  });
  const result = await createMediaAction({
    url: blob.url,
    pathname: blob.pathname,
    width,
    height,
    contentType: file.type,
    size: file.size,
    alt: { sv: altFromFilename(picked.name) },
  });
  if (!result.ok) throw new Error(`${file.name}: ${result.errors.join(", ")}`);
  return result.data;
}

export function MediaUploadButton({
  onUploaded,
  label = "Upload images",
}: {
  onUploaded: (items: MediaItem[]) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError(undefined);
    const uploaded: MediaItem[] = [];
    const failures: string[] = [];
    for (const file of Array.from(files)) {
      try {
        uploaded.push(await uploadOne(file));
      } catch (err) {
        failures.push(err instanceof Error ? err.message : String(err));
      }
    }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    if (uploaded.length) onUploaded(uploaded);
    if (failures.length) setError(failures.join("; "));
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        multiple
        hidden
        onChange={(event) => handleFiles(event.target.files)}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        <Upload aria-hidden="true" />
        {busy ? "Uploading…" : label}
      </Button>
      <p className="text-muted-foreground text-xs">
        JPG, PNG, WebP, AVIF or GIF. Large photos are resized and compressed
        automatically before upload (GIFs must be under 5 MB).
      </p>
      {error && (
        <p role="alert" className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
