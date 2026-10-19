import { describe, expect, it } from "vitest";

import { getPageDef, pageDefs } from "@/lib/cms/pages";
import { mergeLocalized, resolvePage } from "@/lib/cms/resolve";
import { homeMeta, heroContent } from "@/content/home";
import { servicesList } from "@/content/services";

describe("page registry", () => {
  it("has unique keys and an entry for every service", () => {
    const keys = pageDefs.map((page) => page.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const service of servicesList) {
      expect(getPageDef(`service:${service.key}`)).toBeDefined();
    }
  });

  it("gives every page a Swedish SEO title and description", () => {
    for (const page of pageDefs) {
      expect(page.seo.title.sv, page.key).toBeTruthy();
      expect(page.seo.description.sv, page.key).toBeTruthy();
    }
  });
});

describe("resolvePage", () => {
  const home = getPageDef("home")!;

  it("returns the content/ defaults when there is no override", () => {
    const page = resolvePage(home, null);
    expect(page.seo.title).toEqual(homeMeta.title);
    expect(page.seo.noindex).toBe(false);
    expect(page.seo.absoluteTitle).toBe(true);
    expect(page.text.heroTitle).toEqual(heroContent.title);
  });

  it("overrides per locale and keeps the other locales' defaults", () => {
    const page = resolvePage(home, {
      seo: { title: { ar: "عنوان جديد" }, noindex: true },
      text: { heroTitle: { sv: "Ny rubrik" } },
    });
    expect(page.seo.title).toEqual({ ...homeMeta.title, ar: "عنوان جديد" });
    expect(page.seo.noindex).toBe(true);
    expect(page.text.heroTitle).toEqual({
      ...heroContent.title,
      sv: "Ny rubrik",
    });
  });

  it("replaces images and ignores keys the page doesn't define", () => {
    const image = {
      src: "https://x.public.blob.vercel-storage.com/a.webp",
      width: 10,
      height: 10,
      alt: { sv: "A" },
    };
    const page = resolvePage(home, {
      images: { benefitsImage: image, unknown: image },
    });
    expect(page.images.benefitsImage).toEqual(image);
    expect(page.images).not.toHaveProperty("unknown");
  });
});

describe("mergeLocalized", () => {
  it("ignores empty override strings", () => {
    expect(mergeLocalized({ sv: "a", en: "b" }, { sv: "", en: "c" })).toEqual({
      sv: "a",
      en: "c",
      ar: undefined,
    });
  });
});
