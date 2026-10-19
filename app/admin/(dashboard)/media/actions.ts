"use server";

import { del } from "@vercel/blob";
import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import {
  createMedia,
  deleteMediaRow,
  findMediaUsage,
  getMedia,
  listMedia,
  updateMediaAlt,
} from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import {
  formatIssues,
  localizedString,
  mediaInputSchema,
} from "@/lib/cms/schemas";
import type { Localized } from "@/content/types";

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

function toItem(row: Awaited<ReturnType<typeof listMedia>>[number]): MediaItem {
  return { ...row, createdAt: row.createdAt.toISOString() };
}

export async function listMediaAction(): Promise<MediaItem[]> {
  await requireAdmin();
  return (await listMedia()).map(toItem);
}

/** Records an image the browser has already uploaded to Blob (see MediaUploader). */
export async function createMediaAction(
  input: unknown,
): Promise<ActionResult<MediaItem>> {
  await requireAdmin();
  const parsed = mediaInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };
  if (
    !/\.public\.blob\.vercel-storage\.com$/.test(
      new URL(parsed.data.url).hostname,
    )
  ) {
    return { ok: false, errors: ["Only Vercel Blob uploads can be added"] };
  }
  const row = await createMedia(parsed.data);
  updateTag(CMS_TAGS.media);
  return { ok: true, data: toItem(row) };
}

export async function updateMediaAltAction(
  id: string,
  alt: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = localizedString.safeParse(alt);
  if (!parsed.success) {
    return { ok: false, errors: formatIssues(parsed.error) };
  }
  await updateMediaAlt(id, parsed.data);
  updateTag(CMS_TAGS.media);
  return { ok: true };
}

export async function deleteMediaAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const media = await getMedia(id);
  if (!media) return { ok: false, errors: ["Image not found"] };

  const usage = await findMediaUsage(media.url);
  if (usage.length > 0) {
    return {
      ok: false,
      errors: [`Still used by ${usage.join(", ")}. Replace it there first.`],
    };
  }

  await del(media.url);
  await deleteMediaRow(id);
  updateTag(CMS_TAGS.media);
  return { ok: true };
}
