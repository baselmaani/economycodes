import type { PageDef } from "@/lib/cms/pages";
import { defaultHiddenSections, orderSections } from "@/lib/cms/resolve";
import type {
  PageLayout,
  PageOverrideData,
  PartialLocalized,
} from "@/lib/cms/schemas";

/**
 * Pure helpers the save action runs on a parsed override: drop what the page
 * doesn't define or what is empty, then check required collection fields.
 */

function hasText(
  value: PartialLocalized | undefined,
): value is PartialLocalized {
  return Boolean(value && (value.sv || value.en || value.ar));
}

/** True when at least one locale is set (lists/blocks arrive with empty locales already dropped). */
function hasAnyLocale(value: object | undefined): boolean {
  return Boolean(value && Object.values(value).some(Boolean));
}

/** Keeps only the entries whose key the page defines and that pass `keep`. */
function pick<T>(
  record: Record<string, T> | undefined,
  fields: { key: string }[],
  keep: (value: T) => boolean = () => true,
): Record<string, T> {
  const keys = fields.map((field) => field.key);
  return Object.fromEntries(
    Object.entries(record ?? {}).filter(
      ([key, value]) => keys.includes(key) && keep(value),
    ),
  );
}

/**
 * Keeps only a non-default order and a non-default hidden set (movable
 * sections only); undefined when both match the defaults. An empty `hidden`
 * is kept when some sections are hidden by default, since it means "show all".
 */
function compactLayout(
  layout: PageLayout | undefined,
  def: PageDef,
): PageLayout | undefined {
  if (!def.arrangeable || !layout) return undefined;
  const order = orderSections(def.sections, layout.order);
  const isDefault = order.every((key, i) => key === def.sections[i].key);
  const defaultHidden = defaultHiddenSections(def.sections);
  const hidden = layout.hidden
    ? def.sections
        .filter(
          (section) => !section.locked && layout.hidden?.includes(section.key),
        )
        .map((section) => section.key)
    : defaultHidden;
  const isDefaultHidden =
    hidden.length === defaultHidden.length &&
    hidden.every((key) => defaultHidden.includes(key));
  if (isDefault && isDefaultHidden) return undefined;
  return {
    ...(!isDefault && { order }),
    ...(!isDefaultHidden && { hidden }),
  };
}

/** Drops empty values and keys the page doesn't define, so stored overrides stay minimal. */
export function compactOverride(
  data: PageOverrideData,
  def: PageDef,
): PageOverrideData {
  const text = pick(data.text, def.text, hasText);
  const lists = pick(data.lists, def.lists, hasAnyLocale);
  const blocks = pick(data.blocks, def.blocks, hasAnyLocale);
  // An empty collection is a real choice ("no questions on this page").
  const collections = pick(data.collections, def.collections);
  const images = pick(data.images, def.images);
  const seo = def.seo
    ? {
        ...(hasText(data.seo?.title) && { title: data.seo.title }),
        ...(hasText(data.seo?.description) && {
          description: data.seo.description,
        }),
        ...(data.seo?.ogImage && { ogImage: data.seo.ogImage }),
        ...(data.seo?.noindex && { noindex: true }),
      }
    : {};
  const layout = compactLayout(data.layout, def);
  return {
    ...(Object.keys(seo).length > 0 && { seo }),
    ...(layout && { layout }),
    ...(Object.keys(text).length > 0 && { text }),
    ...(Object.keys(lists).length > 0 && { lists }),
    ...(Object.keys(blocks).length > 0 && { blocks }),
    ...(Object.keys(collections).length > 0 && { collections }),
    ...(Object.keys(images).length > 0 && { images }),
  };
}

/**
 * Required item fields need Swedish text. Fixed-length collections are
 * exempt: an empty field there falls back to the original item.
 */
export function validateOverride(
  data: PageOverrideData,
  def: PageDef,
): string[] {
  const errors: string[] = [];
  for (const field of def.collections) {
    const items = data.collections?.[field.key];
    if (!items || field.fixedLength) continue;
    items.forEach((item, index) => {
      for (const itemField of field.fields) {
        if (itemField.optional || item[itemField.key]?.sv) continue;
        errors.push(
          `${field.label} → ${field.itemLabel} ${index + 1}: "${itemField.label}" needs Swedish text`,
        );
      }
    });
  }
  return errors;
}
