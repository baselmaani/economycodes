import { describe, expect, it } from "vitest";

import { getPageDef, pageDefs } from "@/lib/cms/pages";
import { mergeLocalized, resolvePage } from "@/lib/cms/resolve";
import { homeMeta, heroContent } from "@/content/home";
import { services, servicesList } from "@/content/services";
import { serviceMeta } from "@/content/service-meta";

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

describe("resolvePage for a service", () => {
  const bookkeeping = services.bookkeeping;
  const def = getPageDef("service:bookkeeping")!;

  it("returns the service's content/ data when there is no override", () => {
    const page = resolvePage(def, null);
    expect(page.text.heading).toEqual(serviceMeta.bookkeeping.title);
    expect(page.text.summary).toEqual(bookkeeping.summary);
    expect(page.text.teaser).toEqual(bookkeeping.teaser);
    expect(page.lists.whatsIncluded).toEqual(bookkeeping.whatsIncluded);
    expect(page.blocks.body).toEqual(bookkeeping.body);
    // The legacy stock photo stays unused until one is picked in the dashboard.
    expect(page.images).not.toHaveProperty("heroImage");
  });

  it("overrides lists, body and hero image per locale", () => {
    const image = {
      src: "https://x.public.blob.vercel-storage.com/hero.webp",
      width: 1600,
      height: 1067,
      alt: { sv: "Kontoret" },
    };
    const body = [{ type: "paragraph" as const, text: "Ny text" }];
    const page = resolvePage(def, {
      lists: { process: { en: ["Step one"] } },
      blocks: { body: { sv: body } },
      images: { heroImage: image },
    });
    expect(page.lists.process).toEqual({
      ...bookkeeping.process,
      en: ["Step one"],
    });
    expect(page.blocks.body).toEqual({ ...bookkeeping.body, sv: body });
    expect(page.images.heroImage).toEqual(image);
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
