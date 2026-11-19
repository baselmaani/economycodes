import "server-only";

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { BUSINESS_KEY } from "@/lib/cms/pages";
import { getPageState, patchPage } from "@/lib/cms/service/pages";
import {
  createFaq,
  deleteFaq,
  faqScopeOptions,
  listFaqs,
  updateFaq,
} from "@/lib/cms/service/faqs";
import {
  fail,
  fromResult,
  invalidate,
  localeSchema,
  localizedText,
  ok,
  pickLocale,
  safe,
} from "./util";

const BUSINESS_TEXT_KEYS = [
  "phone",
  "email",
  "whatsapp",
  "facebook",
  "hadiFacebook",
  "orgNumber",
  "vatNumber",
] as const;

async function readBusiness() {
  const state = await getPageState(BUSINESS_KEY);
  if (!state) throw new Error("Business settings are missing");
  const { text, collections } = state.resolved;
  return {
    ...Object.fromEntries(
      BUSINESS_TEXT_KEYS.map((key) => [key, text[key]?.sv ?? ""]),
    ),
    offices: collections.offices.map((office, index) => ({
      index,
      name: office.name,
      streetAddress: office.streetAddress.sv,
      postalCode: office.postalCode.sv,
      city: office.city.sv,
      mapsHref: office.mapsHref.sv,
      openingHours: office.openingHours,
    })),
  };
}

const plainText = (label: string) =>
  z.string().optional().describe(`${label} (same in every language)`);

export function registerSettingsTools(server: McpServer) {
  server.registerTool(
    "get_business_settings",
    {
      title: "Get business details",
      description:
        "Contact details shown across the site (header, footer, contact page, call bar, structured data): phone, email, WhatsApp number, Facebook links, org and VAT numbers, and the offices with addresses and opening hours.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    safe(async () => ok(await readBusiness())),
  );

  server.registerTool(
    "update_business_settings",
    {
      title: "Update business details",
      description:
        "Changes contact details and offices; only the fields you pass change. WhatsApp: international format, e.g. +46 73 479 82 10 (the wa.me link is built from it). Offices are fixed (one per coded office); address them by `index` from get_business_settings.",
      inputSchema: {
        phone: plainText("Phone number, international format"),
        email: plainText("Email address"),
        whatsapp: plainText("WhatsApp number"),
        facebook: plainText("Company Facebook page URL"),
        hadiFacebook: plainText("Hadi's Facebook profile URL"),
        orgNumber: plainText("Organisation number"),
        vatNumber: plainText("VAT number"),
        offices: z
          .array(
            z.object({
              index: z.number().int().min(0),
              name: localizedText.optional(),
              streetAddress: z.string().optional(),
              postalCode: z.string().optional(),
              city: z.string().optional(),
              mapsHref: z.string().optional().describe("Google Maps link"),
              openingHours: localizedText
                .optional()
                .describe("Free text, e.g. Mån–Fre 09–17"),
            }),
          )
          .optional(),
      },
      annotations: { idempotentHint: true },
    },
    safe(async (input) => {
      const state = await getPageState(BUSINESS_KEY);
      if (!state) return fail("Business settings are missing");

      const text: Record<string, { sv: string }> = {};
      for (const key of BUSINESS_TEXT_KEYS) {
        const value = input[key];
        if (value !== undefined) text[key] = { sv: value };
      }

      const patch: Record<string, unknown> = {};
      if (Object.keys(text).length > 0) patch.text = text;

      if (input.offices?.length) {
        const offices = state.resolved.collections.offices.map((office) => ({
          ...office,
        }));
        for (const change of input.offices) {
          const office = offices[change.index];
          if (!office) return fail(`No office at index ${change.index}`);
          if (change.name) office.name = change.name;
          for (const key of [
            "streetAddress",
            "postalCode",
            "city",
            "mapsHref",
          ] as const) {
            const value = change[key];
            if (value !== undefined) office[key] = { sv: value };
          }
          if (change.openingHours) office.openingHours = change.openingHours;
        }
        patch.collections = { offices };
      }
      if (Object.keys(patch).length === 0) return fail("Nothing to change");

      const result = await patchPage(BUSINESS_KEY, patch, invalidate);
      if (!result.ok) return fail(result.errors);
      return ok({ ok: true, business: await readBusiness() });
    }),
  );

  server.registerTool(
    "list_faqs",
    {
      title: "List FAQs",
      description: `All site FAQs in display order. Scope decides where each is shown: "global" (FAQ page and general sections), "digital" (marketing pages), "service:<serviceKey>" (that service page), "location:<officeId>" (that office page). Articles reference FAQs by id.`,
      inputSchema: {
        scope: z.string().optional().describe("Only FAQs with this scope"),
        locale: localeSchema.optional(),
      },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ scope, locale }) => {
      const faqs = (await listFaqs()).filter(
        (faq) => !scope || faq.scope === scope,
      );
      return ok(locale ? pickLocale(faqs, locale) : faqs);
    }),
  );

  server.registerTool(
    "create_faq",
    {
      title: "Add an FAQ",
      description: `Adds a question and answer. Valid scopes: ${faqScopeOptions().join(", ")}`,
      inputSchema: {
        id: z
          .string()
          .describe("Unique id, lowercase with hyphens, e.g. faq-vat-deadline"),
        scope: z.string().describe("Where it is shown (see the description)"),
        question: localizedText,
        answer: localizedText,
        position: z
          .number()
          .int()
          .min(0)
          .optional()
          .describe("0-based position in the list; default last"),
      },
    },
    safe(async ({ position, ...faq }) =>
      fromResult(await createFaq(faq, invalidate, position)),
    ),
  );

  server.registerTool(
    "update_faq",
    {
      title: "Edit an FAQ",
      description:
        "Changes an FAQ's scope, question or answer. Question/answer merge per language: pass only the languages you change.",
      inputSchema: {
        id: z.string(),
        scope: z.string().optional(),
        question: localizedText.partial().optional(),
        answer: localizedText.partial().optional(),
      },
      annotations: { idempotentHint: true },
    },
    safe(async ({ id, ...changes }) =>
      fromResult(await updateFaq(id, changes, invalidate)),
    ),
  );

  server.registerTool(
    "delete_faq",
    {
      title: "Delete an FAQ",
      description:
        "Removes an FAQ from the site. Articles that reference it simply stop showing it.",
      inputSchema: { id: z.string() },
      annotations: { destructiveHint: true },
    },
    safe(async ({ id }) =>
      fromResult(await deleteFaq(id, invalidate), () => ({
        ok: true,
        message: `Deleted FAQ "${id}".`,
      })),
    ),
  );
}
