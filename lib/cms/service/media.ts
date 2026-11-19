import "server-only";

import { del, put } from "@vercel/blob";
import sharp, { type Metadata } from "sharp";

import type { ActionResult } from "@/lib/admin/action-result";
import {
  createMedia as createMediaRow,
  deleteMediaRow,
  findMediaUsage,
  getMedia,
  listMedia as listMediaRows,
  removeMediaReferences,
  updateMediaAlt as updateMediaAltRow,
} from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import { slugify } from "@/lib/cms/article-json";
import {
  altTextSchema,
  formatIssues,
  mediaInputSchema,
} from "@/lib/cms/schemas";
import type { Localized } from "@/content/types";
import type { Invalidate } from "./types";

/**
 * Media library writes shared by the dashboard (Server Actions) and the MCP
 * endpoint. Callers check auth.
 */

export interface MediaItem {
  id: string;
  url: string;
  width: number;
  height: number;
  alt: Localized<string>;
  contentType: string;
  size: number;
  createdAt: string;
}

type MediaRow = Awaited<ReturnType<typeof listMediaRows>>[number];

function toItem(row: MediaRow): MediaItem {
  return {
    id: row.id,
    url: row.url,
    width: row.width,
    height: row.height,
    alt: row.alt,
    contentType: row.contentType,
    size: row.size,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function listMedia(): Promise<MediaItem[]> {
  return (await listMediaRows()).map(toItem);
}

export async function getMediaItem(id: string): Promise<MediaItem | undefined> {
  const row = await getMedia(id);
  return row ? toItem(row) : undefined;
}

export async function getMediaUsage(id: string): Promise<string[] | undefined> {
  const row = await getMedia(id);
  return row ? findMediaUsage(row.url) : undefined;
}

function isBlobUrl(url: string): boolean {
  return /\.public\.blob\.vercel-storage\.com$/.test(new URL(url).hostname);
}

/** Records an image already uploaded to Blob (the dashboard uploads from the browser). */
export async function createMedia(
  input: unknown,
  invalidate: Invalidate,
): Promise<ActionResult<MediaItem>> {
  const parsed = mediaInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };
  if (!isBlobUrl(parsed.data.url)) {
    return { ok: false, errors: ["Only Vercel Blob uploads can be added"] };
  }
  const row = await createMediaRow(parsed.data);
  invalidate([CMS_TAGS.media]);
  return { ok: true, data: toItem(row) };
}

export async function updateMediaAlt(
  id: string,
  alt: unknown,
  invalidate: Invalidate,
): Promise<ActionResult> {
  const parsed = altTextSchema.safeParse(alt);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };
  if (!(await getMedia(id))) return { ok: false, errors: ["Image not found"] };
  await updateMediaAltRow(id, parsed.data);
  invalidate([CMS_TAGS.media]);
  return { ok: true };
}

/** A failed delete carries `usage` when the image is still referenced somewhere. */
export type DeleteMediaResult =
  ActionResult | { ok: false; errors: string[]; usage: string[] };

/**
 * Deletes an image. With `force`, first clears it from page image slots and
 * OG images (they fall back to their defaults); article cover images still
 * block the delete, so a cover has to be swapped in the article first.
 */
export async function deleteMedia(
  id: string,
  { force = false }: { force?: boolean },
  invalidate: Invalidate,
): Promise<DeleteMediaResult> {
  const media = await getMedia(id);
  if (!media) return { ok: false, errors: ["Image not found"] };

  if (force) {
    const removed = await removeMediaReferences(media.url);
    invalidate([
      ...removed.pageKeys.map((key) => CMS_TAGS.page(key)),
      ...(removed.articles ? [CMS_TAGS.articles] : []),
    ]);

    const remaining = await findMediaUsage(media.url);
    if (remaining.length > 0) {
      return {
        ok: false,
        errors: [
          `Still used by ${remaining.join(", ")} (e.g. as an article cover image). Choose another image there first.`,
        ],
      };
    }
  } else {
    const usage = await findMediaUsage(media.url);
    if (usage.length > 0) {
      return {
        ok: false,
        errors: [`Still used by ${usage.join(", ")}.`],
        usage,
      };
    }
  }

  await del(media.url);
  await deleteMediaRow(id);
  invalidate([CMS_TAGS.media]);
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Server-side uploads (the MCP endpoint has no browser to resize in)

/** Largest source image accepted, before compression. */
export const MAX_SOURCE_BYTES = 15 * 1024 * 1024;
const MAX_EDGE = 2400;
const RASTER_FORMATS = new Set(["jpeg", "png", "webp", "avif", "gif"]);

/**
 * Resizes to at most 2400px on the longest edge and re-encodes as WebP
 * (GIFs are kept as-is so animations survive), uploads to Blob under media/
 * and records it in the library.
 */
export async function uploadImage(
  source: Uint8Array,
  {
    filename,
    alt,
  }: { filename: string; alt: Localized<string> | { sv: string } },
  invalidate: Invalidate,
): Promise<ActionResult<MediaItem>> {
  const parsedAlt = altTextSchema.safeParse(alt);
  if (!parsedAlt.success) {
    return { ok: false, errors: formatIssues(parsedAlt.error) };
  }
  if (source.byteLength === 0) return { ok: false, errors: ["Empty file"] };
  if (source.byteLength > MAX_SOURCE_BYTES) {
    return { ok: false, errors: ["Image is larger than 15 MB"] };
  }

  let meta: Metadata;
  try {
    meta = await sharp(source).metadata();
  } catch {
    return { ok: false, errors: ["Not a readable image"] };
  }
  if (!meta.format || !RASTER_FORMATS.has(meta.format)) {
    return {
      ok: false,
      errors: ["Only JPEG, PNG, WebP, AVIF and GIF images are supported"],
    };
  }

  const base =
    slugify(filename.replace(/\.[a-z0-9]+$/i, "")).slice(0, 60) || "image";
  let body: Buffer | Uint8Array;
  let width: number;
  let height: number;
  let contentType: string;
  let extension: string;

  if (meta.format === "gif") {
    body = source;
    width = meta.width ?? 0;
    height = meta.pageHeight ?? meta.height ?? 0;
    contentType = "image/gif";
    extension = "gif";
  } else {
    const { data, info } = await sharp(source)
      .rotate()
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    body = data;
    width = info.width;
    height = info.height;
    contentType = "image/webp";
    extension = "webp";
  }
  if (!width || !height) {
    return { ok: false, errors: ["Could not read the image size"] };
  }

  const blob = await put(`media/${base}.${extension}`, Buffer.from(body), {
    access: "public",
    addRandomSuffix: true,
    contentType,
  });
  return createMedia(
    {
      url: blob.url,
      pathname: blob.pathname,
      width,
      height,
      alt: parsedAlt.data,
      contentType,
      size: body.byteLength,
    },
    invalidate,
  );
}

/** Literal IPs in loopback/private/link-local ranges, and localhost names. */
function isPrivateHost(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host.endsWith(".internal") || host.endsWith(".local")) return true;
  const v4 = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])];
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    );
  }
  return (
    host.includes(":") &&
    (host === "::1" ||
      host.startsWith("fc") ||
      host.startsWith("fd") ||
      host.startsWith("fe80"))
  );
}

/** Downloads a public https image and runs it through uploadImage(). */
export async function uploadImageFromUrl(
  url: string,
  options: { alt: Localized<string> | { sv: string }; filename?: string },
  invalidate: Invalidate,
): Promise<ActionResult<MediaItem>> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { ok: false, errors: ["Invalid URL"] };
  }
  if (parsed.protocol !== "https:") {
    return { ok: false, errors: ["Only https URLs are supported"] };
  }
  if (isPrivateHost(parsed.hostname)) {
    return { ok: false, errors: ["That host is not allowed"] };
  }

  let response: Response;
  try {
    response = await fetch(parsed, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
      headers: { accept: "image/*" },
    });
  } catch (error) {
    return {
      ok: false,
      errors: [
        `Download failed: ${error instanceof Error ? error.message : String(error)}`,
      ],
    };
  }
  if (!response.ok) {
    return { ok: false, errors: [`Download failed: HTTP ${response.status}`] };
  }
  if (isPrivateHost(new URL(response.url || parsed.href).hostname)) {
    return { ok: false, errors: ["That host is not allowed"] };
  }
  const length = Number(response.headers.get("content-length") ?? 0);
  if (length > MAX_SOURCE_BYTES) {
    return { ok: false, errors: ["Image is larger than 15 MB"] };
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  const filename =
    options.filename ??
    decodeURIComponent(parsed.pathname.split("/").pop() ?? "");
  return uploadImage(bytes, { filename, alt: options.alt }, invalidate);
}
