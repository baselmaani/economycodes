import { describe, expect, it } from "vitest";

import { softwarePages } from "@/content/software";
import {
  softwareCommon,
  softwareIntegrations,
  softwareOrAccounting,
  softwareOverview,
  softwareSubpages,
} from "@/content/software-pages";
import { getPageDef } from "@/lib/cms/pages";
import { compactOverride, validateOverride } from "@/lib/cms/override";
import { resolvePage } from "@/lib/cms/resolve";
import {
  overviewContent,
  splitLocalized,
  subpageContent,
} from "@/lib/cms/software-content";

type SubpageKey = keyof typeof softwareSubpages;

describe("software pages in the CMS", () => {
  it("renders every subpage exactly as coded when there is no override", () => {
    for (const key of Object.keys(softwareSubpages) as SubpageKey[]) {
      const def = getPageDef(softwarePages[key].cmsKey)!;
      const content = subpageContent(
        softwareSubpages[key],
        resolvePage(def, null),
      );
      expect(content, key).toEqual(softwareSubpages[key]);
    }
  });

  it("renders the overview exactly as coded when there is no override", () => {
    const def = getPageDef(softwarePages.overview.cmsKey)!;
    const content = overviewContent(resolvePage(def, null));
    expect(content.hero).toEqual({
      eyebrow: softwareCommon.eyebrow,
      title: softwareOverview.hero.title,
      lead: softwareOverview.hero.lead,
    });
    expect(content.walkthrough).toEqual(softwareOverview.walkthrough);
    expect(content.intro).toEqual(softwareOverview.intro);
    expect(content.featuresTitle).toEqual(softwareOverview.featuresTitle);
    expect(content.featuresLead).toEqual(softwareOverview.featuresLead);
    expect(content.features).toEqual(softwareOverview.features);
    expect(content.example).toEqual(softwareOverview.example);
    expect(content.faqs).toEqual(softwareOverview.faqs);
    expect(content.integrations).toEqual(softwareIntegrations);
    expect(content.orAccounting).toEqual(softwareOrAccounting);
  });

  it("applies edits to features, steps and FAQs", () => {
    const def = getPageDef(softwarePages.fakturering.cmsKey)!;
    const override = compactOverride(
      {
        text: { heroTitle: { sv: "Ny rubrik" } },
        collections: {
          features: [
            {
              id: { sv: "ny" },
              title: { sv: "Ny funktion" },
              paragraphs: { sv: "Första stycket.\n\nAndra stycket." },
              bullets: { sv: "Ett\nTvå\n" },
              shot: { sv: "not-a-shot" },
            },
          ],
          faqs: [],
        },
      },
      def,
    );
    expect(validateOverride(override, def)).toEqual([]);
    const content = subpageContent(
      softwareSubpages.fakturering,
      resolvePage(def, override),
    );
    expect(content.hero.title.sv).toBe("Ny rubrik");
    expect(content.features).toEqual([
      {
        id: "ny",
        title: { sv: "Ny funktion" },
        paragraphs: { sv: ["Första stycket.", "Andra stycket."] },
        bullets: { sv: ["Ett", "Två"] },
        example: undefined,
        badge: undefined,
        shot: undefined,
      },
    ]);
    expect(content.faqs).toEqual([]);
    // Untouched collections keep their coded defaults.
    expect(content.workflow.steps).toEqual(
      softwareSubpages.fakturering.workflow.steps,
    );
  });

  it("requires Swedish text for a new feature's heading and paragraphs", () => {
    const def = getPageDef(softwarePages.lon.cmsKey)!;
    const errors = validateOverride(
      { collections: { features: [{ id: { sv: "x" } }] } },
      def,
    );
    expect(errors.some((error) => error.includes("Heading"))).toBe(true);
    expect(errors.some((error) => error.includes("Paragraphs"))).toBe(true);
  });

  it("splits per locale and treats empty Swedish text as absent", () => {
    expect(splitLocalized({ sv: "a\nb", en: "c" }, /\n/)).toEqual({
      sv: ["a", "b"],
      en: ["c"],
    });
    expect(splitLocalized({ sv: " " }, /\n/)).toBeUndefined();
  });
});
