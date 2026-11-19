import { beforeEach, describe, expect, it, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

import type { PageOverrideData } from "@/lib/cms/schemas";

// In-memory stand-ins for the DB layer, so the real tools, services,
// validation and merge logic run end to end through an MCP client.
const store = vi.hoisted(() => ({
  pages: new Map<string, PageOverrideData>(),
}));

vi.mock("server-only", () => ({}));
// next-intl's navigation can't load outside Next; URLs only need a path here.
vi.mock("@/i18n/navigation", () => ({
  getPathname: ({ href }: { href: string | { pathname: string } }) =>
    typeof href === "string" ? href : href.pathname,
}));
vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
  updateTag: vi.fn(),
  unstable_cache: <T>(fn: T) => fn,
}));
vi.mock("@/lib/cms/admin", () => ({
  getPageOverride: async (key: string) => store.pages.get(key) ?? null,
  savePageOverride: async (key: string, data: PageOverrideData) => {
    store.pages.set(key, data);
  },
  deletePageOverride: async (key: string) => {
    store.pages.delete(key);
  },
  listPageOverrideTimes: async () =>
    new Map([...store.pages.keys()].map((key) => [key, new Date(0)])),
  getOverview: async () => ({
    published: 1,
    drafts: 0,
    media: 0,
    recentArticles: [],
    recentPages: [],
  }),
  listArticles: async () => [],
  getArticle: async () => undefined,
}));
vi.mock("@/lib/cms/leads", () => ({
  LEAD_STATUSES: ["new", "read", "archived"],
  countLeads: async () => ({ new: 2, read: 0, archived: 0 }),
  listLeads: async () => [],
  getLead: async () => undefined,
  setLeadStatus: async () => false,
  deleteLead: async () => false,
}));

const { revalidateTag } = await import("next/cache");
const { createMcpServer } = await import("@/lib/mcp/server");

async function connect() {
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  const server = createMcpServer();
  await server.connect(serverTransport);
  const client = new Client({ name: "test", version: "1.0.0" });
  await client.connect(clientTransport);
  return client;
}

async function call(name: string, args: Record<string, unknown> = {}) {
  const client = await connect();
  const result = await client.callTool({ name, arguments: args });
  const content = result.content as { type: string; text: string }[];
  const text = content[0]?.text ?? "";
  return {
    isError: Boolean(result.isError),
    text,
    json: () => JSON.parse(text),
  };
}

beforeEach(() => {
  store.pages.clear();
  vi.mocked(revalidateTag).mockClear();
});

describe("MCP server", () => {
  it("exposes the content tools with safety annotations", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name);
    for (const name of [
      "get_site_overview",
      "list_pages",
      "get_page",
      "update_page",
      "create_article",
      "upload_media_from_url",
      "list_messages",
      "create_faq",
      "update_business_settings",
    ]) {
      expect(names).toContain(name);
    }
    const byName = Object.fromEntries(tools.map((tool) => [tool.name, tool]));
    expect(byName.delete_article.annotations?.destructiveHint).toBe(true);
    expect(byName.get_page.annotations?.readOnlyHint).toBe(true);
  });

  it("edits a page and makes the change visible", async () => {
    const update = await call("update_page", {
      key: "home",
      patch: { text: { heroTitle: { sv: "Ny rubrik" } } },
    });
    expect(update.isError).toBe(false);
    expect(revalidateTag).toHaveBeenCalledWith("cms:page:home", { expire: 0 });

    const page = (await call("get_page", { key: "home", locale: "sv" })).json();
    expect(page.content.text.heroTitle).toBe("Ny rubrik");
    expect(page.override).toEqual({ text: { heroTitle: "Ny rubrik" } });

    // A second edit merges instead of replacing.
    await call("update_page", {
      key: "home",
      patch: { text: { heroTitle: { en: "New heading" } } },
    });
    expect(store.pages.get("home")).toEqual({
      text: { heroTitle: { sv: "Ny rubrik", en: "New heading" } },
    });

    const reset = await call("reset_page", { key: "home" });
    expect(reset.isError).toBe(false);
    expect(store.pages.has("home")).toBe(false);
  });

  it("reports validation errors as tool errors", async () => {
    const unknown = await call("update_page", {
      key: "nope",
      patch: { text: {} },
    });
    expect(unknown.isError).toBe(true);
    expect(unknown.text).toContain('Unknown page "nope"');

    const invalid = await call("update_page", {
      key: "home",
      patch: { images: { heroPhoto: { src: "ftp://x" } } },
    });
    expect(invalid.isError).toBe(true);
    expect(store.pages.has("home")).toBe(false);

    const layout = await call("set_page_layout", {
      key: "home",
      hidden: ["not-a-section"],
    });
    expect(layout.isError).toBe(true);
  });

  it("adds, edits and deletes FAQs", async () => {
    const badScope = await call("create_faq", {
      id: "faq-test",
      scope: "service:nope",
      question: { sv: "Fråga?" },
      answer: { sv: "Svar." },
    });
    expect(badScope.isError).toBe(true);

    const created = await call("create_faq", {
      id: "faq-test",
      scope: "global",
      question: { sv: "Fråga?" },
      answer: { sv: "Svar." },
      position: 0,
    });
    expect(created.isError).toBe(false);
    let faqs = (await call("list_faqs", { scope: "global" })).json();
    expect(faqs[0].id).toBe("faq-test");

    await call("update_faq", { id: "faq-test", answer: { en: "Answer." } });
    faqs = (await call("list_faqs")).json();
    expect(
      faqs.find((faq: { id: string }) => faq.id === "faq-test").answer,
    ).toEqual({ sv: "Svar.", en: "Answer." });

    expect((await call("delete_faq", { id: "faq-test" })).isError).toBe(false);
    faqs = (await call("list_faqs")).json();
    expect(faqs.some((faq: { id: string }) => faq.id === "faq-test")).toBe(
      false,
    );
  });

  it("updates business details and offices", async () => {
    const before = (await call("get_business_settings")).json();
    const result = await call("update_business_settings", {
      phone: "+46 70 000 00 00",
      offices: [{ index: 0, openingHours: { sv: "Mån–Fre 9–17" } }],
    });
    expect(result.isError).toBe(false);
    const after = result.json().business;
    expect(after.phone).toBe("+46 70 000 00 00");
    expect(after.email).toBe(before.email);
    expect(after.offices[0].openingHours).toEqual({ sv: "Mån–Fre 9–17" });
    expect(after.offices[0].streetAddress).toBe(
      before.offices[0].streetAddress,
    );
  });

  it("starts with a site overview", async () => {
    const overview = (await call("get_site_overview")).json();
    expect(overview.languages).toEqual(["sv", "en", "ar"]);
    expect(overview.messages.new).toBe(2);
    expect(overview.reference.faqScopes).toContain("global");
  });
});
