"use server";

import { updateTag } from "next/cache";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import {
  createMedia,
  deleteMedia,
  listMedia,
  updateMediaAlt,
  type DeleteMediaResult,
  type MediaItem,
} from "@/lib/cms/service/media";

export type { DeleteMediaResult, MediaItem };

const invalidate = (tags: string[]) => tags.forEach((tag) => updateTag(tag));

export async function listMediaAction(): Promise<MediaItem[]> {
  await requireAdmin();
  return listMedia();
}

/** Records an image the browser has already uploaded to Blob (see MediaUploader). */
export async function createMediaAction(
  input: unknown,
): Promise<ActionResult<MediaItem>> {
  await requireAdmin();
  return createMedia(input, invalidate);
}

export async function updateMediaAltAction(
  id: string,
  alt: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  return updateMediaAlt(id, alt, invalidate);
}

/**
 * Deletes an image. With `force`, first clears it from page image slots and
 * OG images; article cover images still block the delete.
 */
export async function deleteMediaAction(
  id: string,
  { force = false }: { force?: boolean } = {},
): Promise<DeleteMediaResult> {
  await requireAdmin();
  return deleteMedia(id, { force }, invalidate);
}
