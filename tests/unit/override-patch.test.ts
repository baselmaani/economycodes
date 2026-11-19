import { describe, expect, it } from "vitest";

import { getPageDef } from "@/lib/cms/pages";
import {
  compactOverride,
  mergeOverridePatch,
  validateOverride,
} from "@/lib/cms/override";
import { pageOverrideSchema, type PageOverrideData } from "@/lib/cms/schemas";

/** What patchPage() stores: merge, parse, compact. */
function apply(current: PageOverrideData | null, patch: unknown) {
  const def = getPageDef("home")!;
  const parsed = pageOverrideSchema.parse(mergeOverridePatch(current, patch));
  const data = compactOverride(parsed, def);
  expect(validateOverride(data, def)).toEqual([]);
  return data;
}

const image = {
  src: "https://x.public.blob.vercel-storage.com/a.webp",
  width: 10,
  height: 10,
  alt: { sv: "Bild" },
};

describe("mergeOverridePatch", () => {
  const current: PageOverrideData = {
    seo: { title: { sv: "Titel", en: "Title" }, noindex: true },
    text: {
      heroTitle: { sv: "Rubrik", en: "Heading" },
      heroSubtitle: { sv: "Ingress" },
    },
    images: { heroPhoto: image },
  };

  it("merges text per field and per language", () => {
    const data = apply(current, { text: { heroTitle: { ar: "عنوان" } } });
    expect(data.text).toEqual({
      heroTitle: { sv: "Rubrik", en: "Heading", ar: "عنوان" },
      heroSubtitle: { sv: "Ingress" },
    });
    expect(data.seo).toEqual(current.seo);
    expect(data.images).toEqual(current.images);
  });

  it("clears a language with null or an empty string", () => {
    const data = apply(current, {
      text: { heroTitle: { en: null }, heroSubtitle: { sv: "" } },
    });
    expect(data.text).toEqual({ heroTitle: { sv: "Rubrik" } });
  });

  it("resets a field or a whole group with null", () => {
    expect(apply(current, { text: { heroTitle: null } }).text).toEqual({
      heroSubtitle: { sv: "Ingress" },
    });
    expect(apply(current, { images: null }).images).toBeUndefined();
    expect(apply(current, { seo: { noindex: null } }).seo).toEqual({
      title: { sv: "Titel", en: "Title" },
    });
  });

  it("merges SEO title per language and replaces other SEO fields", () => {
    const data = apply(current, {
      seo: { title: { en: "New" }, ogImage: image },
    });
    expect(data.seo).toEqual({
      title: { sv: "Titel", en: "New" },
      ogImage: image,
      noindex: true,
    });
  });

  it("replaces a collection as a whole", () => {
    const steps = [
      { title: { sv: "Steg" }, body: { sv: "Text" }, icon: { sv: "Check" } },
    ];
    const first = apply(current, { collections: { processSteps: steps } });
    expect(first.collections).toEqual({ processSteps: steps });
    const second = apply(first, {
      collections: { processSteps: [steps[0], steps[0]] },
    });
    expect(second.collections?.processSteps).toHaveLength(2);
  });

  it("starts from nothing when there is no stored override", () => {
    expect(apply(null, { text: { heroTitle: { sv: "X" } } })).toEqual({
      text: { heroTitle: { sv: "X" } },
    });
  });

  it("passes non-objects through for the schema to reject", () => {
    expect(mergeOverridePatch(current, "nope")).toBe("nope");
    expect(
      pageOverrideSchema.safeParse(
        mergeOverridePatch(current, { text: "nope" }),
      ).success,
    ).toBe(false);
  });
});
