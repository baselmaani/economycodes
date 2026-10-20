/**
 * Browser-only: shrinks a picked image so it fits the Blob upload limit
 * (MAX_UPLOAD_BYTES, mirrored in app/api/admin/blob/route.ts). Images that are
 * already small enough are passed through untouched.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
/** Longest edge kept after resizing; next/image serves smaller variants. */
const MAX_EDGE = 2400;

export interface PreparedImage {
  file: File;
  width: number;
  height: number;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve(img);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      reject(new Error(`${file.name}: not a readable image`));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function encode(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function render(img: HTMLImageElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available in this browser");
  context.imageSmoothingQuality = "high";
  context.drawImage(img, 0, 0, width, height);
  return canvas;
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  const img = await loadImage(file);
  const width = img.naturalWidth;
  const height = img.naturalHeight;

  const fits =
    file.size <= MAX_UPLOAD_BYTES && Math.max(width, height) <= MAX_EDGE;
  if (fits) return { file, width, height };

  // Re-encoding a GIF would drop its animation.
  if (file.type === "image/gif") {
    throw new Error(`${file.name}: GIFs must be under 5 MB`);
  }

  let scale = Math.min(1, MAX_EDGE / Math.max(width, height));
  let quality = 0.85;
  // Bounded: quality steps down to 0.55, then the size shrinks by 20% a step.
  for (let attempt = 0; attempt < 10; attempt++) {
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));
    const canvas = render(img, w, h);

    // WebP keeps transparency; browsers that can't encode it return PNG.
    let blob = await encode(canvas, "image/webp", quality);
    if (blob?.type !== "image/webp") {
      blob = await encode(
        canvas,
        file.type === "image/png" ? "image/png" : "image/jpeg",
        quality,
      );
    }
    if (!blob) throw new Error(`${file.name}: could not be compressed`);

    if (blob.size <= MAX_UPLOAD_BYTES) {
      const ext = blob.type.split("/")[1].replace("jpeg", "jpg");
      const name = file.name.replace(/\.[^.]+$/, "") + `.${ext}`;
      return {
        file: new File([blob], name, { type: blob.type }),
        width: w,
        height: h,
      };
    }

    if (quality > 0.6) quality -= 0.1;
    else scale *= 0.8;
  }
  throw new Error(`${file.name}: could not be compressed under 5 MB`);
}
