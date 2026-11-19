import "server-only";

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { getPageUrls } from "@/lib/admin/page-urls";
import { listPageOverrideTimes } from "@/lib/cms/admin";
import { getPageDef, pageDefs, type PageDef } from "@/lib/cms/pages";
import {
  getPageState,
  patchPage,
  resetPage,
  savePage,
} from "@/lib/cms/service/pages";
import {
  fail,
  fromResult,
  invalidate,
  localeSchema,
  ok,
  pickLocale,
  safe,
} from "./util";

const pageKey = z
  .string()
  .describe(
    'Page key from list_pages, e.g. "home", "om-hadi", "service:bookkeeping", "location:trollhattan", "bokforingsprogram-lon", "settings:business".',
  );

const OVERRIDE_FORMAT = `Override format (every part optional; only keys the page defines are kept, see get_page_schema):
{
  "seo":    { "title": {sv,en,ar}, "description": {sv,en,ar}, "ogImage": MediaRef, "noindex": boolean },
  "layout": { "order": [sectionKey...], "hidden": [sectionKey...] },        // arrangeable pages only (home)
  "text":   { "<fieldKey>": { "sv": "...", "en": "...", "ar": "..." } },
  "lists":  { "<fieldKey>": { "sv": ["item", ...], "en": [...], "ar": [...] } },
  "blocks": { "<fieldKey>": { "sv": [ContentBlock...], "en": [...], "ar": [...] } },
  "collections": { "<fieldKey>": [ { "<itemField>": { "sv": "...", "en": "...", "ar": "..." } }, ... ] },
  "images": { "<slotKey>": MediaRef }
}
ContentBlock = {"type":"heading","level":2|3,"text":"..."} | {"type":"paragraph","text":"..."} | {"type":"list","items":["..."]} | {"type":"disclaimer","text":"..."}
MediaRef = {"src":"https://….public.blob.vercel-storage.com/…","width":1200,"height":800,"alt":{"sv":"…","en":"…","ar":"…"}} (use the "mediaRef" returned by list_media / upload tools)
Fields of kind "plain" or "icon" use only "sv". A missing language falls back to Swedish.`;

function describeDef(def: PageDef) {
  return {
    key: def.key,
    label: def.label,
    group: def.group,
    hasSeo: Boolean(def.seo),
    arrangeable: Boolean(def.arrangeable),
    sections: def.sections.map((section) => ({
      key: section.key,
      label: section.label,
      ...(section.description && { description: section.description }),
      ...(section.locked && { locked: true }),
      ...(section.hiddenByDefault && { hiddenByDefault: true }),
    })),
    text: def.text.map(({ key, label, kind, section, hint }) => ({
      key,
      label,
      kind,
      section,
      ...(hint && { hint }),
    })),
    lists: def.lists.map(({ key, label, section, hint }) => ({
      key,
      label,
      section,
      ...(hint && { hint }),
    })),
    blocks: def.blocks.map(({ key, label, section, hint }) => ({
      key,
      label,
      section,
      ...(hint && { hint }),
    })),
    collections: def.collections.map(
      ({ key, label, section, hint, itemLabel, fields, fixedLength }) => ({
        key,
        label,
        section,
        itemLabel,
        ...(hint && { hint }),
        ...(fixedLength && {
          fixedLength: true,
          note: "Items can be edited by position but not added, removed or reordered.",
        }),
        fields,
      }),
    ),
    images: def.images.map(({ key, label, section, hint, default: d }) => ({
      key,
      label,
      section,
      ...(hint && { hint }),
      hasDefault: Boolean(d),
    })),
  };
}

export function registerPageTools(server: McpServer) {
  server.registerTool(
    "list_pages",
    {
      title: "List editable pages",
      description:
        "Every editable page and settings record: home, about, hubs, accounting software pages, legal pages, office (location) pages, the 25 service pages, and the settings records (settings:business, settings:faqs). Shows the public URL and when each was last edited in the dashboard (null = never, shows the coded defaults).",
      inputSchema: {
        group: z
          .enum(["Pages", "Legal", "Services", "Settings"])
          .optional()
          .describe("Only this group"),
      },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ group }) => {
      const times = await listPageOverrideTimes();
      return ok(
        pageDefs
          .filter((def) => !group || def.group === group)
          .map((def) => ({
            key: def.key,
            label: def.label,
            group: def.group,
            url: getPageUrls(def)?.sv ?? null,
            lastEdited: times.get(def.key)?.toISOString() ?? null,
          })),
      );
    }),
  );

  server.registerTool(
    "get_page_schema",
    {
      title: "Get a page's editable fields",
      description:
        "The fields a page can override: text (kind text/textarea/plain), lists, rich-text blocks, collections (repeatable items and their fields), image slots, and sections (for layout). Read this before update_page.",
      inputSchema: { key: pageKey },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ key }) => {
      const def = getPageDef(key);
      if (!def) return fail(`Unknown page "${key}". Use list_pages.`);
      return ok({ ...describeDef(def), overrideFormat: OVERRIDE_FORMAT });
    }),
  );

  server.registerTool(
    "get_page",
    {
      title: "Get a page's content",
      description:
        "A page's live content (coded defaults merged with dashboard edits) plus the stored override itself. `content.sections` lists the visible sections in order. Pass `locale` to get one language only (much smaller).",
      inputSchema: { key: pageKey, locale: localeSchema.optional() },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ key, locale }) => {
      const state = await getPageState(key);
      if (!state) return fail(`Unknown page "${key}". Use list_pages.`);
      const body = {
        key,
        label: state.def.label,
        urls: getPageUrls(state.def),
        content: state.resolved,
        override: state.override,
      };
      return ok(locale ? pickLocale(body, locale) : body);
    }),
  );

  server.registerTool(
    "update_page",
    {
      title: "Edit part of a page",
      description: `Merges a partial edit into the page's override and publishes it immediately.
Merge rules: text/lists/blocks merge per field and per language (other languages and fields are kept); a language set to null or "" goes back to the default. collections and images replace the whole field (send the complete list, e.g. from get_page). seo.title/description merge per language. Any field or group set to null resets it to the coded default.
Examples: {"text":{"heroTitle":{"sv":"Ny rubrik"}}} · {"seo":{"description":{"en":"..."}}} · {"images":{"heroPhoto":MediaRef}} · {"collections":{"processSteps":[...]}}
${OVERRIDE_FORMAT}`,
      inputSchema: {
        key: pageKey,
        patch: z
          .record(z.string(), z.unknown())
          .describe("Partial override (see the description)"),
      },
      annotations: { destructiveHint: false, idempotentHint: true },
    },
    safe(async ({ key, patch }) =>
      fromResult(await patchPage(key, patch, invalidate), ({ override }) => ({
        ok: true,
        message: "Saved and live.",
        override,
      })),
    ),
  );

  server.registerTool(
    "replace_page",
    {
      title: "Replace a page's whole override",
      description: `Stores exactly this override (anything not included goes back to the coded default). Prefer update_page for small edits.
${OVERRIDE_FORMAT}`,
      inputSchema: {
        key: pageKey,
        override: z.record(z.string(), z.unknown()),
      },
      annotations: { destructiveHint: true, idempotentHint: true },
    },
    safe(async ({ key, override }) =>
      fromResult(await savePage(key, override, invalidate), (data) => ({
        ok: true,
        message: "Saved and live.",
        override: data.override,
      })),
    ),
  );

  server.registerTool(
    "reset_page",
    {
      title: "Reset a page to its defaults",
      description:
        "Deletes every dashboard edit of a page (text, SEO, images, layout), so it shows the coded content again.",
      inputSchema: { key: pageKey },
      annotations: { destructiveHint: true, idempotentHint: true },
    },
    safe(async ({ key }) =>
      fromResult(await resetPage(key, invalidate), () => ({
        ok: true,
        message: "Reset to defaults.",
      })),
    ),
  );

  server.registerTool(
    "set_page_layout",
    {
      title: "Reorder or hide page sections",
      description:
        "Section order and visibility on arrangeable pages (the home page). `order` lists movable section keys in the new order; locked sections (hero, contact) stay in place. `hidden` replaces the set of hidden sections ([] shows all). Section keys come from get_page_schema.",
      inputSchema: {
        key: pageKey.default("home"),
        order: z.array(z.string()).optional(),
        hidden: z.array(z.string()).optional(),
      },
      annotations: { idempotentHint: true },
    },
    safe(async ({ key, order, hidden }) => {
      const def = getPageDef(key);
      if (!def?.arrangeable) {
        return fail(`"${key}" has no arrangeable sections (only "home" does).`);
      }
      const known = new Set(def.sections.map((section) => section.key));
      const unknown = [...(order ?? []), ...(hidden ?? [])].filter(
        (section) => !known.has(section),
      );
      if (unknown.length) {
        return fail(`Unknown sections: ${unknown.join(", ")}`);
      }
      const current = (await getPageState(key))?.override?.layout ?? {};
      const result = await patchPage(
        key,
        {
          layout: {
            ...current,
            ...(order && { order }),
            ...(hidden && { hidden }),
          },
        },
        invalidate,
      );
      if (!result.ok) return fail(result.errors);
      const state = await getPageState(key);
      return ok({ ok: true, visibleSections: state?.resolved.sections });
    }),
  );
}
