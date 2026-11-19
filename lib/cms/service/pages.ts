import "server-only";

import type { ActionResult } from "@/lib/admin/action-result";
import {
  deletePageOverride,
  getPageOverride,
  savePageOverride,
} from "@/lib/cms/admin";
import { CMS_TAGS } from "@/lib/cms/content";
import { getPageDef, type PageDef } from "@/lib/cms/pages";
import {
  compactOverride,
  mergeOverridePatch,
  validateOverride,
} from "@/lib/cms/override";
import { resolvePage, type ResolvedPage } from "@/lib/cms/resolve";
import {
  formatIssues,
  pageOverrideSchema,
  type PageOverrideData,
} from "@/lib/cms/schemas";
import type { Invalidate } from "./types";

/**
 * Page override writes shared by the dashboard (Server Actions) and the MCP
 * endpoint. Callers check auth; `invalidate` marks the page's cache tag stale.
 */

function unknownPage(key: string): ActionResult<never> {
  return { ok: false, errors: [`Unknown page "${key}"`] };
}

/** Validates and stores a complete override (an empty one removes the row). */
async function store(
  def: PageDef,
  input: unknown,
  invalidate: Invalidate,
): Promise<ActionResult<{ override: PageOverrideData }>> {
  const parsed = pageOverrideSchema.safeParse(input);
  if (!parsed.success) return { ok: false, errors: formatIssues(parsed.error) };

  const data = compactOverride(parsed.data, def);
  const errors = validateOverride(data, def);
  if (errors.length > 0) return { ok: false, errors };
  if (Object.keys(data).length === 0) {
    await deletePageOverride(def.key);
  } else {
    await savePageOverride(def.key, data);
  }
  invalidate([CMS_TAGS.page(def.key)]);
  return { ok: true, data: { override: data } };
}

/** Replaces the page's whole override (what the dashboard editor sends). */
export async function savePage(
  key: string,
  input: unknown,
  invalidate: Invalidate,
): Promise<ActionResult<{ override: PageOverrideData }>> {
  const def = getPageDef(key);
  if (!def) return unknownPage(key);
  return store(def, input, invalidate);
}

/** Merges a partial edit into the stored override (see mergeOverridePatch). */
export async function patchPage(
  key: string,
  patch: unknown,
  invalidate: Invalidate,
): Promise<ActionResult<{ override: PageOverrideData }>> {
  const def = getPageDef(key);
  if (!def) return unknownPage(key);
  const current = await getPageOverride(key);
  return store(def, mergeOverridePatch(current, patch), invalidate);
}

export async function resetPage(
  key: string,
  invalidate: Invalidate,
): Promise<ActionResult> {
  if (!getPageDef(key)) return unknownPage(key);
  await deletePageOverride(key);
  invalidate([CMS_TAGS.page(key)]);
  return { ok: true };
}

/** Uncached: the stored override and the content it resolves to. */
export async function getPageState(key: string): Promise<
  | {
      def: PageDef;
      override: PageOverrideData | null;
      resolved: ResolvedPage;
    }
  | undefined
> {
  const def = getPageDef(key);
  if (!def) return undefined;
  const override = await getPageOverride(key);
  return { def, override, resolved: resolvePage(def, override) };
}
