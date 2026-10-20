import type { ContentBlock, Localized, MediaRef } from "@/content/types";
import type { PageDef } from "@/lib/cms/pages";
import type { PageOverrideData } from "@/lib/cms/schemas";

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
  lists: Record<string, Localized<string[]>>;
  blocks: Record<string, Localized<ContentBlock[]>>;
  /** Only slots with an override or a default are present. */
  images: Record<string, MediaRef>;
}

/** Per-locale override: a locale set in the override wins, otherwise the default's value is kept. */
export function mergeLocalized<T>(
  base: Localized<T>,
  override: Partial<Record<"sv" | "en" | "ar", T>> | undefined,
): Localized<T> {
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

  const lists: Record<string, Localized<string[]>> = {};
  for (const field of def.lists) {
    lists[field.key] = mergeLocalized(
      field.default,
      override?.lists?.[field.key],
    );
  }

  const blocks: Record<string, Localized<ContentBlock[]>> = {};
  for (const field of def.blocks) {
    blocks[field.key] = mergeLocalized(
      field.default,
      override?.blocks?.[field.key],
    );
  }

  const images: Record<string, MediaRef> = {};
  for (const field of def.images) {
    const image = override?.images?.[field.key] ?? field.default;
    if (image) images[field.key] = image;
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
    lists,
    blocks,
    images,
  };
}
