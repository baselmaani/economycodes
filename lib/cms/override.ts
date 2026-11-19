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

type Loose = Record<string, unknown>;

function isRecord(value: unknown): value is Loose {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

/** Per-locale merge: a locale set to null, "" or [] is cleared (falls back to the default). */
function mergeLocales(base: unknown, patch: unknown): unknown {
  if (!isRecord(patch)) return patch;
  const out: Loose = isRecord(base) ? { ...base } : {};
  for (const [locale, value] of Object.entries(patch)) {
    if (isEmpty(value)) delete out[locale];
    else out[locale] = value;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

/** Merges `patch` key by key into `base`; a key set to null is removed. */
function mergeKeyed(
  base: unknown,
  patch: unknown,
  mergeValue: (key: string, base: unknown, patch: unknown) => unknown,
): unknown {
  if (!isRecord(patch)) return patch;
  const out: Loose = isRecord(base) ? { ...base } : {};
  for (const [key, value] of Object.entries(patch)) {
    const merged =
      value === null ? undefined : mergeValue(key, out[key], value);
    if (merged === undefined) delete out[key];
    else out[key] = merged;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

const replace = (_key: string, _base: unknown, patch: unknown) => patch;

/**
 * Applies a partial edit to a stored override (saves replace the whole
 * override, so callers that change one field merge first):
 * - text / lists / blocks: per field, per locale; null, "" or [] clears a locale.
 * - collections / images: per key, the value replaces the whole list or image.
 * - seo: title and description per locale; ogImage and noindex replaced.
 * - layout: order and hidden replaced.
 * Any key (or whole group) set to null goes back to the page default. The
 * result is unvalidated: run it through pageOverrideSchema as for a save.
 */
export function mergeOverridePatch(
  current: PageOverrideData | null | undefined,
  patch: unknown,
): unknown {
  if (!isRecord(patch)) return patch;
  const out: Loose = { ...(current ?? {}) };
  for (const [group, value] of Object.entries(patch)) {
    let merged: unknown;
    if (value === null) {
      merged = undefined;
    } else if (group === "text" || group === "lists" || group === "blocks") {
      merged = mergeKeyed(out[group], value, (_key, base, next) =>
        mergeLocales(base, next),
      );
    } else if (group === "seo") {
      merged = mergeKeyed(out.seo, value, (key, base, next) =>
        key === "title" || key === "description"
          ? mergeLocales(base, next)
          : next,
      );
    } else if (
      group === "collections" ||
      group === "images" ||
      group === "layout"
    ) {
      merged = mergeKeyed(out[group], value, replace);
    } else {
      merged = value;
    }
    if (merged === undefined) delete out[group];
    else out[group] = merged;
  }
  return out;
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
