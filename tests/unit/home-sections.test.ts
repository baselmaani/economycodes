import { describe, expect, it } from "vitest";

import { getPageDef } from "@/lib/cms/pages";
import { resolveSections } from "@/lib/cms/resolve";

const home = getPageDef("home")!;

describe("homepage: four business areas", () => {
  it("shows the area cards under the hero and one section per area in order", () => {
    const order = resolveSections(home.sections, undefined);
    expect(order.slice(0, 2)).toEqual(["hero", "areas"]);
    const services = order.indexOf("services");
    expect(services).toBeGreaterThan(order.indexOf("areas"));
    expect(order.indexOf("digital")).toBe(services + 1);
    expect(order.indexOf("software")).toBe(services + 2);
    expect(order.indexOf("development")).toBe(services + 3);
    expect(order.at(-1)).toBe("contact");
  });

  it("adds the new sections to an older saved layout", () => {
    // A layout saved before "areas" and "software" existed.
    const order = resolveSections(home.sections, {
      order: ["trust", "services", "process", "about", "digital", "faq"],
      hidden: ["why", "nationwide", "languages", "benefits"],
    });
    expect(order.slice(0, 2)).toEqual(["hero", "areas"]);
    expect(order.indexOf("software")).toBe(order.indexOf("digital") + 1);
    expect(order.indexOf("development")).toBe(order.indexOf("software") + 1);
  });

  it("has exactly four area cards with copy in every locale", () => {
    const areas = home.collections.find((c) => c.key === "areas")!;
    expect(areas.fixedLength).toBe(true);
    expect(areas.default).toHaveLength(4);
    for (const item of areas.default) {
      for (const locale of ["sv", "en", "ar"] as const) {
        expect(item.title[locale], `title.${locale}`).toBeTruthy();
        expect(item.body[locale], `body.${locale}`).toBeTruthy();
      }
    }
  });

  it("gives the new section headings copy in every locale", () => {
    for (const key of [
      "areasEyebrow",
      "areasTitle",
      "softwareEyebrow",
      "softwareTitle",
      "softwareLead",
      "softwareCta",
    ]) {
      const field = home.text.find((f) => f.key === key);
      expect(field, key).toBeDefined();
      for (const locale of ["sv", "en", "ar"] as const) {
        expect(field!.default[locale], `${key}.${locale}`).toBeTruthy();
      }
    }
  });

  it("gives every visible section an eyebrow, title and short description", () => {
    const headers: Record<string, [string, string, string]> = {
      areas: ["areasEyebrow", "areasTitle", "areasLead"],
      trust: ["trustEyebrow", "trustTitle", "trustIntro"],
      services: ["servicesEyebrow", "servicesTitle", "servicesLead"],
      digital: ["digitalEyebrow", "digitalTitle", "digitalLead"],
      software: ["softwareEyebrow", "softwareTitle", "softwareLead"],
      development: [
        "developmentEyebrow",
        "developmentTitle",
        "developmentLead",
      ],
      process: ["processEyebrow", "processTitle", "processLead"],
      about: ["aboutEyebrow", "aboutTitle", "aboutLead"],
      faq: ["faqEyebrow", "faqTitle", "faqLead"],
    };
    const visible = resolveSections(home.sections, undefined).filter(
      (key) => key !== "hero" && key !== "contact",
    );
    expect(Object.keys(headers).sort()).toEqual([...visible].sort());
    for (const [section, keys] of Object.entries(headers)) {
      for (const key of keys) {
        const field = home.text.find((f) => f.key === key);
        expect(field, `${section}.${key}`).toBeDefined();
        expect(field!.section, key).toBe(section);
        // "plain" fields (proper nouns) are the same in every language, stored under sv.
        const locales =
          field!.kind === "plain"
            ? (["sv"] as const)
            : (["sv", "en", "ar"] as const);
        for (const locale of locales) {
          expect(field!.default[locale], `${key}.${locale}`).toBeTruthy();
        }
      }
    }
  });

  it("gives each offering section an image and a link to its page", () => {
    for (const key of ["servicesImage", "digitalImage"]) {
      const image = home.images.find((f) => f.key === key);
      expect(image?.default?.src, key).toMatch(/^\/media\//);
      for (const locale of ["sv", "en", "ar"] as const) {
        expect(
          image!.default!.alt[locale],
          `${key}.alt.${locale}`,
        ).toBeTruthy();
      }
    }
    // The software section falls back to the real app screenshot.
    expect(home.images.find((f) => f.key === "softwareImage")).toBeDefined();
    const cta = home.text.find((f) => f.key === "servicesCta")!;
    for (const locale of ["sv", "en", "ar"] as const) {
      expect(cta.default[locale], `servicesCta.${locale}`).toBeTruthy();
    }
  });
});
