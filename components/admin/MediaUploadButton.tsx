"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createMediaAction,
  type MediaItem,
} from "@/app/admin/(dashboard)/media/actions";

function readDimensions(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      reject(new Error(`${file.name}: not a readable image`));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

/** Turns "Hadi-office_2026.jpg" into a starting alt text of "Hadi office 2026". */
function altFromFilename(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .trim() || "Image"
  );
}

async function uploadOne(file: File): Promise<MediaItem> {
  const { width, height } = await readDimensions(file);
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
    alt: { sv: altFromFilename(file.name) },
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
        JPG, PNG, WebP, AVIF or GIF, up to 5 MB. Large photos: resize to about
        1600 px wide first.
      </p>
      {error && (
        <p role="alert" className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
