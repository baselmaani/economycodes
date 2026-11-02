import type { ContentBlock, Localized, MediaRef } from "@/content/types";
import type {
  CollectionFieldDef,
  CollectionItem,
  PageDef,
  SectionDef,
} from "@/lib/cms/pages";
import type { PageLayout, PageOverrideData } from "@/lib/cms/schemas";

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
  collections: Record<string, CollectionItem[]>;
  /** Only slots with an override or a default are present. */
  images: Record<string, MediaRef>;
  /** Keys of the sections to render, in order (hidden ones left out). */
  sections: string[];
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

type CollectionOverride = NonNullable<PageOverrideData["collections"]>[string];

/** Keeps only the item's defined fields, each falling back to `base` per locale. */
function mergeItem(
  field: CollectionFieldDef,
  base: CollectionItem | undefined,
  override: CollectionOverride[number] | undefined,
): CollectionItem {
  return Object.fromEntries(
    field.fields.map((itemField) => [
      itemField.key,
      mergeLocalized(
        base?.[itemField.key] ?? { sv: "" },
        override?.[itemField.key],
      ),
    ]),
  );
}

/**
 * An overridden collection replaces the default list; fixed-length ones
 * (tied to offices or service areas in code) merge item by item instead.
 */
export function resolveCollection(
  field: CollectionFieldDef,
  override: CollectionOverride | undefined,
): CollectionItem[] {
  if (!override) return field.default;
  if (field.fixedLength) {
    return field.default.map((item, index) =>
      mergeItem(field, item, override[index]),
    );
  }
  return override.map((item) => mergeItem(field, undefined, item));
}

/**
 * Every section key in display order: the saved order, with locked sections
 * pinned to their default index. Sections missing from the saved order (added
 * in code later) go right after their default predecessor; unknown keys are
 * dropped.
 */
export function orderSections(
  sections: SectionDef[],
  order: string[] | undefined,
): string[] {
  const movable = sections.filter((s) => !s.locked).map((s) => s.key);
  const result = (order ?? []).filter(
    (key, index, all) => movable.includes(key) && all.indexOf(key) === index,
  );
  movable.forEach((key, index) => {
    if (result.includes(key)) return;
    const previous = movable[index - 1];
    result.splice(previous ? result.indexOf(previous) + 1 : 0, 0, key);
  });
  sections.forEach((section, index) => {
    if (section.locked) result.splice(index, 0, section.key);
  });
  return result;
}

/** Movable sections hidden when no layout has been saved. */
export function defaultHiddenSections(sections: SectionDef[]): string[] {
  return sections
    .filter((section) => section.hiddenByDefault && !section.locked)
    .map((section) => section.key);
}

/** The sections to render, in order; locked sections can't be hidden. */
export function resolveSections(
  sections: SectionDef[],
  layout: PageLayout | undefined,
): string[] {
  const hidden = new Set(layout?.hidden ?? defaultHiddenSections(sections));
  const locked = new Set(sections.filter((s) => s.locked).map((s) => s.key));
  return orderSections(sections, layout?.order).filter(
    (key) => locked.has(key) || !hidden.has(key),
  );
}

const NO_SEO = { title: { sv: "" }, description: { sv: "" } };

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

  const collections: Record<string, CollectionItem[]> = {};
  for (const field of def.collections) {
    collections[field.key] = resolveCollection(
      field,
      override?.collections?.[field.key],
    );
  }

  const images: Record<string, MediaRef> = {};
  for (const field of def.images) {
    const image = override?.images?.[field.key] ?? field.default;
    if (image) images[field.key] = image;
  }

  const seo = def.seo ?? NO_SEO;
  return {
    seo: {
      title: mergeLocalized(seo.title, override?.seo?.title),
      description: mergeLocalized(seo.description, override?.seo?.description),
      ogImage: override?.seo?.ogImage,
      noindex: override?.seo?.noindex ?? false,
      absoluteTitle: def.seo?.absoluteTitle ?? false,
    },
    text,
    lists,
    blocks,
    collections,
    images,
    sections: resolveSections(def.sections, override?.layout),
  };
}
