import "server-only";

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import {
  deleteMedia,
  getMediaUsage,
  listMedia,
  updateMediaAlt,
  uploadImage,
  uploadImageFromUrl,
  MAX_SOURCE_BYTES,
  type MediaItem,
} from "@/lib/cms/service/media";
import { fail, fromResult, invalidate, ok, safe } from "./util";

/** What a page image slot or article cover expects (see update_page). */
function withMediaRef(item: MediaItem) {
  return {
    ...item,
    mediaRef: {
      src: item.url,
      width: item.width,
      height: item.height,
      alt: item.alt,
    },
  };
}

const altInput = z
  .object({
    sv: z
      .string()
      .describe('Swedish alt text; "" marks a purely decorative image'),
    en: z.string().optional(),
    ar: z.string().optional(),
  })
  .describe("Describes the image for screen readers and search engines");

export function registerMediaTools(server: McpServer) {
  server.registerTool(
    "list_media",
    {
      title: "List images",
      description:
        'The media library, newest first. Each item has a ready-made "mediaRef" to use in update_page (images, seo.ogImage) or an article coverImage.',
      inputSchema: {
        search: z
          .string()
          .optional()
          .describe("Filter by alt text or file name (case-insensitive)"),
        limit: z.number().int().min(1).max(500).default(100),
      },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ search, limit }) => {
      const needle = search?.toLowerCase();
      const items = (await listMedia()).filter(
        (item) =>
          !needle ||
          item.url.toLowerCase().includes(needle) ||
          Object.values(item.alt).some((alt) =>
            alt?.toLowerCase().includes(needle),
          ),
      );
      return ok({
        total: items.length,
        items: items.slice(0, limit).map(withMediaRef),
      });
    }),
  );

  server.registerTool(
    "get_media_usage",
    {
      title: "Where an image is used",
      description: "Pages and articles that reference an image.",
      inputSchema: { id: z.string() },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ id }) => {
      const usage = await getMediaUsage(id);
      return usage ? ok({ id, usedBy: usage }) : fail("Image not found");
    }),
  );

  server.registerTool(
    "upload_media_from_url",
    {
      title: "Upload an image from a URL",
      description: `Downloads a public https image (JPEG, PNG, WebP, AVIF or GIF, max ${MAX_SOURCE_BYTES / 1024 / 1024} MB), resizes it to at most 2400px and stores it as WebP in the media library. Returns the item with its "mediaRef".`,
      inputSchema: {
        url: z.string().describe("Public https URL of the image"),
        alt: altInput,
        filename: z
          .string()
          .optional()
          .describe("Name for the stored file (default: from the URL)"),
      },
    },
    safe(async ({ url, alt, filename }) =>
      fromResult(
        await uploadImageFromUrl(url, { alt, filename }, invalidate),
        withMediaRef,
      ),
    ),
  );

  server.registerTool(
    "upload_media_base64",
    {
      title: "Upload an image from base64 data",
      description:
        'Stores an image given as base64 (with or without a "data:image/…;base64," prefix). Same processing as upload_media_from_url.',
      inputSchema: {
        data: z.string().describe("Base64-encoded image bytes"),
        filename: z.string().describe("e.g. office-front.jpg"),
        alt: altInput,
      },
    },
    safe(async ({ data, filename, alt }) => {
      const base64 = data.replace(/^data:[^;]+;base64,/, "").replace(/\s/g, "");
      if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
        return fail("data is not valid base64");
      }
      const bytes = new Uint8Array(Buffer.from(base64, "base64"));
      return fromResult(
        await uploadImage(bytes, { filename, alt }, invalidate),
        withMediaRef,
      );
    }),
  );

  server.registerTool(
    "update_media_alt",
    {
      title: "Change an image's alt text",
      description:
        "Updates the library's alt text. Note: pages and articles keep the alt text they were saved with; update them too if needed.",
      inputSchema: { id: z.string(), alt: altInput },
      annotations: { idempotentHint: true },
    },
    safe(async ({ id, alt }) =>
      fromResult(await updateMediaAlt(id, alt, invalidate), () => ({
        ok: true,
      })),
    ),
  );

  server.registerTool(
    "delete_media",
    {
      title: "Delete an image",
      description:
        "Deletes an image from the library and storage. Fails while it is in use, listing where. With force=true it is first removed from page image slots and OG images (they fall back to their defaults); an article cover still blocks the delete.",
      inputSchema: {
        id: z.string(),
        force: z.boolean().default(false),
      },
      annotations: { destructiveHint: true },
    },
    safe(async ({ id, force }) => {
      const result = await deleteMedia(id, { force }, invalidate);
      return result.ok
        ? ok({ ok: true, message: "Image deleted." })
        : fail(result.errors);
    }),
  );
}
