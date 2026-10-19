import type { Localized, MediaRef } from "@/content/types";
import type { PageDef } from "@/lib/cms/pages";
import type { PageOverrideData, PartialLocalized } from "@/lib/cms/schemas";

/**
 * Pure merge of a page's registry defaults with its DB override, kept free of
 * next/* and DB imports so it can be unit tested directly.
 */

export interface ResolvedPage {
  seo: {
    title: Localized<string>;
    description: Localized<string>;
    ogImage?: MediaRef;
    noindex: boolean;
    absoluteTitle: boolean;
  };
  text: Record<string, Localized<string>>;
  images: Record<string, MediaRef>;
}

/** Per-locale override: a locale set in the override wins, otherwise the default's value is kept. */
export function mergeLocalized(
  base: Localized<string>,
  override: PartialLocalized | undefined,
): Localized<string> {
  if (!override) return base;
  return {
    sv: override.sv || base.sv,
    en: override.en || base.en,
    ar: override.ar || base.ar,
  };
}

export function resolvePage(
  def: PageDef,
  override: PageOverrideData | null | undefined,
): ResolvedPage {
  const text: Record<string, Localized<string>> = {};
  for (const field of def.text) {
    text[field.key] = mergeLocalized(
      field.default,
      override?.text?.[field.key],
    );
  }

  const images: Record<string, MediaRef> = {};
  for (const field of def.images) {
    images[field.key] = override?.images?.[field.key] ?? field.default;
  }

  return {
    seo: {
      title: mergeLocalized(def.seo.title, override?.seo?.title),
      description: mergeLocalized(
        def.seo.description,
        override?.seo?.description,
      ),
      ogImage: override?.seo?.ogImage,
      noindex: override?.seo?.noindex ?? false,
      absoluteTitle: def.seo.absoluteTitle ?? false,
    },
    text,
    images,
  };
}
