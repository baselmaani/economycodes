import "server-only";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import type { ActionResult } from "@/lib/admin/action-result";
import type { Invalidate } from "@/lib/cms/service/types";

/** Route handlers can't use updateTag; expire: 0 makes the next visit render fresh content. */
export const invalidate: Invalidate = (tags) => {
  for (const tag of new Set(tags)) revalidateTag(tag, { expire: 0 });
};

export function ok(data: unknown): CallToolResult {
  return {
    content: [
      {
        type: "text",
        text: typeof data === "string" ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

export function fail(errors: string | string[]): CallToolResult {
  const list = Array.isArray(errors) ? errors : [errors];
  return {
    isError: true,
    content: [{ type: "text", text: `Error:\n- ${list.join("\n- ")}` }],
  };
}

/** Maps a service ActionResult to a tool result. */
export function fromResult<T>(
  result: ActionResult<T>,
  onOk: (data: T) => unknown = (data) => data ?? { ok: true },
): CallToolResult {
  return result.ok ? ok(onOk(result.data as T)) : fail(result.errors);
}

/** Turns thrown errors (DB down, Blob errors) into tool errors instead of protocol errors. */
export function safe<A extends unknown[]>(
  handler: (...args: A) => Promise<CallToolResult>,
): (...args: A) => Promise<CallToolResult> {
  return async (...args) => {
    try {
      return await handler(...args);
    } catch (error) {
      console.error("MCP tool failed", error);
      return fail(error instanceof Error ? error.message : String(error));
    }
  };
}

export const localeSchema = z
  .enum(["sv", "en", "ar"])
  .describe("Return only this language (falls back to Swedish).");

/** Text in Swedish (required) plus optional English and Arabic. */
export const localizedText = z
  .object({
    sv: z.string().describe("Swedish (the site's main language)"),
    en: z
      .string()
      .optional()
      .describe("English (omit to fall back to Swedish)"),
    ar: z.string().optional().describe("Arabic (omit to fall back to Swedish)"),
  })
  .describe("Localized text: { sv, en?, ar? }");

const LOCALE_KEYS = new Set(["sv", "en", "ar"]);

function isLocalized(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value);
  return keys.includes("sv") && keys.every((key) => LOCALE_KEYS.has(key));
}

/** Collapses every { sv, en?, ar? } in a structure to one language, to keep responses small. */
export function pickLocale<T>(value: T, locale: "sv" | "en" | "ar"): unknown {
  if (Array.isArray(value))
    return value.map((item) => pickLocale(item, locale));
  if (isLocalized(value)) {
    const chosen = value[locale] ?? value.sv;
    return pickLocale(chosen, locale);
  }
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        pickLocale(item, locale),
      ]),
    );
  }
  return value;
}
