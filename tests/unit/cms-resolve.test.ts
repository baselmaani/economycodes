import { describe, expect, it } from "vitest";

import { getPageDef, pageDefs, type SectionDef } from "@/lib/cms/pages";
import {
  mergeLocalized,
  defaultHiddenSections,
  orderSections,
  resolvePage,
  resolveSections,
} from "@/lib/cms/resolve";
import { compactOverride } from "@/lib/cms/override";
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
      expect(page.seo?.title.sv ?? "settings", page.key).toBeTruthy();
      expect(page.seo?.description.sv ?? "settings", page.key).toBeTruthy();
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

describe("section layout", () => {
  const sections: SectionDef[] = [
    { key: "hero", label: "Hero", locked: true },
    { key: "a", label: "A" },
    { key: "b", label: "B" },
    { key: "c", label: "C" },
    { key: "contact", label: "Contact", locked: true },
  ];

  it("keeps the default order without a layout", () => {
    expect(resolveSections(sections, undefined)).toEqual([
      "hero",
      "a",
      "b",
      "c",
      "contact",
    ]);
  });

  it("applies the saved order and pins locked sections", () => {
    expect(
      resolveSections(sections, { order: ["contact", "c", "a", "hero", "b"] }),
    ).toEqual(["hero", "c", "a", "b", "contact"]);
  });

  it("hides sections, but never locked ones", () => {
    expect(
      resolveSections(sections, { hidden: ["b", "hero", "contact"] }),
    ).toEqual(["hero", "a", "c", "contact"]);
  });

  it("drops unknown keys and inserts new sections after their predecessor", () => {
    // "b" was added in code after this order was saved.
    expect(orderSections(sections, ["c", "gone", "a", "c"])).toEqual([
      "hero",
      "c",
      "a",
      "b",
      "contact",
    ]);
  });

  it("hides hiddenByDefault sections until a layout says otherwise", () => {
    const withDefaults: SectionDef[] = [
      ...sections.slice(0, 2),
      { key: "b", label: "B", hiddenByDefault: true },
      ...sections.slice(3),
    ];
    expect(resolveSections(withDefaults, undefined)).toEqual([
      "hero",
      "a",
      "c",
      "contact",
    ]);
    expect(resolveSections(withDefaults, { hidden: [] })).toContain("b");
  });

  it("stores a layout only when it differs from the default", () => {
    const home = getPageDef("home")!;
    const keys = home.sections.map((section) => section.key);
    const defaultHidden = defaultHiddenSections(home.sections);
    expect(
      compactOverride({ layout: { order: keys, hidden: defaultHidden } }, home),
    ).toEqual({});
    expect(compactOverride({ layout: { order: keys } }, home)).toEqual({});
    // Showing every section is a change from the default, so it is kept.
    expect(compactOverride({ layout: { hidden: [] } }, home)).toEqual({
      layout: { hidden: [] },
    });
    expect(
      compactOverride({ layout: { hidden: ["faq", "hero", "nope"] } }, home),
    ).toEqual({ layout: { hidden: ["faq"] } });
    // Pages that don't render from their sections ignore layouts.
    const about = getPageDef("om-hadi")!;
    expect(compactOverride({ layout: { hidden: ["x"] } }, about)).toEqual({});
  });

  it("resolves the homepage's visible sections from the override", () => {
    const page = resolvePage(getPageDef("home")!, {
      layout: { hidden: ["faq"] },
    });
    expect(page.sections).not.toContain("faq");
    expect(page.sections).toContain("benefits");
    expect(page.sections[0]).toBe("hero");
  });
});
