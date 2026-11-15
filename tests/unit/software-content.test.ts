import { existsSync } from "node:fs";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { getPageDef } from "@/lib/cms/pages";
import { getServiceOptions } from "@/lib/service-lookup";
import { faqs as siteFaqs } from "@/content/faqs";
import {
  SOFTWARE_DEMO_INQUIRY,
  isSoftwarePagePublic,
  liveSoftwarePages,
  softwarePageList,
  softwarePages,
} from "@/content/software";
import {
  softwareCommon,
  softwareDemoMessage,
  softwareOverview,
  softwareSubpages,
} from "@/content/software-pages";
import {
  SOFTWARE_SHOT_IDS,
  getSoftwareShot,
  softwareShotAlt,
} from "@/content/software-screenshots";

const LOCALES = ["sv", "en", "ar"] as const;

/** Every Localized value (an object with an `sv` key) anywhere under `value`. */
function localizedValues(
  value: unknown,
  at = "",
): { at: string; value: Record<string, unknown> }[] {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => localizedValues(item, `${at}[${i}]`));
  }
  const record = value as Record<string, unknown>;
  if ("sv" in record) return [{ at, value: record }];
  return Object.entries(record).flatMap(([key, item]) =>
    localizedValues(item, at ? `${at}.${key}` : key),
  );
}

describe("software pages: SEO", () => {
  // Non-absolute titles get " | Economy Codes" from the layout template.
  const MAX_TITLE = 44;
  const MAX_ABSOLUTE_TITLE = 60;
  const MIN_DESCRIPTION = 70;
  const MAX_DESCRIPTION = 160;

  it("registers every page in the CMS with its route", () => {
    for (const page of softwarePageList) {
      const def = getPageDef(page.cmsKey);
      expect(def, page.cmsKey).toBeDefined();
      expect(def!.routeKey).toBe(page.route);
    }
  });

  it("keeps titles and descriptions within search-result limits", () => {
    for (const page of softwarePageList) {
      const seo = getPageDef(page.cmsKey)!.seo!;
      const maxTitle = seo.absoluteTitle ? MAX_ABSOLUTE_TITLE : MAX_TITLE;
      for (const locale of LOCALES) {
        const title = seo.title[locale] ?? "";
        const description = seo.description[locale] ?? "";
        expect(title.length, `${page.key}.title.${locale}`).toBeGreaterThan(0);
        expect(title.length, `${page.key}.title.${locale}`).toBeLessThanOrEqual(
          maxTitle,
        );
        expect(
          description.length,
          `${page.key}.description.${locale}`,
        ).toBeGreaterThanOrEqual(MIN_DESCRIPTION);
        expect(
          description.length,
          `${page.key}.description.${locale}`,
        ).toBeLessThanOrEqual(MAX_DESCRIPTION);
      }
    }
  });

  it("uses the primary keyword in the overview's Swedish title and H1", () => {
    const def = getPageDef(softwarePages.overview.cmsKey)!;
    expect(def.seo!.title.sv.toLowerCase()).toContain(
      "bokföringsprogram för småföretag",
    );
    expect(softwareOverview.hero.title.sv.toLowerCase()).toContain(
      "bokföringsprogram för småföretag",
    );
  });

  it("gives every page its own H1", () => {
    const h1s = [
      softwareOverview.hero.title.sv,
      ...Object.values(softwareSubpages).map((page) => page.hero.title.sv),
    ];
    expect(new Set(h1s).size).toBe(h1s.length);
  });
});

describe("software pages: copy", () => {
  it("has every string in Swedish, English and Arabic", () => {
    const all = localizedValues({
      softwarePages,
      softwareCommon,
      softwareDemoMessage,
      softwareOverview,
      softwareSubpages,
      softwareShotAlt,
    });
    expect(all.length).toBeGreaterThan(100);
    for (const { at, value } of all) {
      for (const locale of LOCALES) {
        const text = value[locale];
        const filled = Array.isArray(text)
          ? text.length > 0 && text.every((t) => typeof t === "string" && t)
          : typeof text === "string" && text.trim().length > 0;
        expect(filled, `${at}.${locale}`).toBe(true);
      }
      if (Array.isArray(value.sv)) {
        expect((value.en as unknown[]).length, `${at}.en`).toBe(
          value.sv.length,
        );
        expect((value.ar as unknown[]).length, `${at}.ar`).toBe(
          value.sv.length,
        );
      }
    }
  });

  it("uses FAQ ids that are unique across the site", () => {
    const ids = [
      ...softwareOverview.faqs,
      ...Object.values(softwareSubpages).flatMap((page) => page.faqs),
    ].map((faq) => faq.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(
        siteFaqs.some((faq) => faq.id === id),
        id,
      ).toBe(false);
    }
  });

  it("links live pages only to live pages and existing anchors", () => {
    const live = new Set(liveSoftwarePages().map((page) => page.key));
    for (const feature of softwareOverview.features) {
      expect(live.has(feature.page), feature.page).toBe(true);
      if (feature.anchor) {
        const ids = softwareSubpages[feature.page].features.map((f) => f.id);
        expect(ids, `${feature.page}#${feature.anchor}`).toContain(
          feature.anchor,
        );
      }
    }
  });

  it("does not name AI assistants on the MCP page before they are tested", () => {
    const text = JSON.stringify(softwareSubpages.aiMcp);
    expect(text).not.toMatch(/claude|chatgpt|copilot|gemini/i);
  });
});

describe("software pages: launch gating", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("keeps pending pages hidden unless SOFTWARE_PREVIEW=1", () => {
    const pending = softwarePageList.filter((page) => page.status !== "live");
    for (const page of pending) {
      vi.stubEnv("SOFTWARE_PREVIEW", "");
      expect(isSoftwarePagePublic(page.key), page.key).toBe(false);
      vi.stubEnv("SOFTWARE_PREVIEW", "1");
      expect(isSoftwarePagePublic(page.key), page.key).toBe(true);
    }
    expect(liveSoftwarePages().every((page) => page.status === "live")).toBe(
      true,
    );
  });
});

describe("software pages: screenshots", () => {
  it("has a capture and alt text for every shot in every locale", () => {
    for (const locale of LOCALES) {
      for (const id of SOFTWARE_SHOT_IDS) {
        const shot = getSoftwareShot(id, locale);
        const file = path.join(process.cwd(), "public", shot.src);
        expect(existsSync(file), file).toBe(true);
        expect(shot.width).toBeGreaterThan(0);
        expect(shot.height).toBeGreaterThan(0);
        expect(shot.alt.length).toBeGreaterThan(20);
      }
    }
  });
});

describe("software demo inquiry", () => {
  it("is the first topic in the contact form's software group", () => {
    for (const locale of LOCALES) {
      const group = getServiceOptions(locale).find(
        (g) => g.label === softwarePages.overview.navLabel[locale],
      );
      expect(group?.options[0].key).toBe(SOFTWARE_DEMO_INQUIRY);
    }
  });
});
