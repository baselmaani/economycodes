import type { StaticAppPathname } from "@/i18n/routing";
import type { ContentBlock, Localized, MediaRef } from "@/content/types";
import svMessages from "@/messages/sv.json";
import enMessages from "@/messages/en.json";
import arMessages from "@/messages/ar.json";

/**
 * Registry types: everything the admin dashboard can override on a page. The
 * `default` values are the existing content/ data, so a page with no DB
 * override renders exactly as before. Field keys are stable identifiers
 * stored in page_overrides.data -- renaming one orphans saved overrides.
 *
 * Defs are passed to the (client) editor as props, so they must stay plain
 * serializable data: no functions or components (icons are stored by name).
 */

interface FieldBase {
  key: string;
  label: string;
  /** Key of one of the page's `sections`; fields without one get a default card. */
  section?: string;
  hint?: string;
}

export interface TextFieldDef extends FieldBase {
  /** "plain" = the same value in every language (phone, URL, date), stored under `sv`. */
  kind: "text" | "textarea" | "plain";
  default: Localized<string>;
}

/** A bullet list, one item per line in the editor. */
export interface ListFieldDef extends FieldBase {
  default: Localized<string[]>;
}

/** Rich body text edited with the block editor (headings, paragraphs, lists). */
export interface BlocksFieldDef extends FieldBase {
  default: Localized<ContentBlock[]>;
}

export interface ImageFieldDef extends FieldBase {
  /** Absent = optional slot that stays empty until an image is picked. */
  default?: MediaRef;
}

export interface CollectionItemFieldDef {
  key: string;
  label: string;
  /** "icon" stores a name from lib/cms/icons.ts under `sv`. */
  kind: "text" | "textarea" | "plain" | "icon";
  /** May be left empty (otherwise the Swedish value is required). */
  optional?: boolean;
}

/** One item of a collection; every value is localized ("plain"/"icon" use `sv` only). */
export type CollectionItem = Record<string, Localized<string>>;

/** A repeatable group of items, e.g. process steps or benefits. */
export interface CollectionFieldDef extends FieldBase {
  /** Name of one item in the editor ("Step", "Benefit"). */
  itemLabel: string;
  fields: CollectionItemFieldDef[];
  default: CollectionItem[];
  /**
   * Items are tied to something in code (an office, a service area), so they
   * can be edited but not added, removed or reordered.
   */
  fixedLength?: boolean;
}

export interface SectionDef {
  key: string;
  label: string;
  description?: string;
  /** On an arrangeable page: always shown, at its default position. */
  locked?: boolean;
  /** Left out until shown from the dashboard (a saved layout's `hidden` replaces this). */
  hiddenByDefault?: boolean;
}

export interface PageDef {
  key: string;
  label: string;
  /** "Settings" defs have their own dashboard screens instead of Pages & SEO. */
  group: "Pages" | "Legal" | "Services" | "Settings";
  /** Static route for "View page"; service pages are linked via their slug instead. */
  routeKey?: StaticAppPathname;
  serviceKey?: string;
  /** Office landing pages are linked via their slug, like services. */
  locationId?: string;
  /** Absent for settings, which have no page of their own. */
  seo?: {
    title: Localized<string>;
    description: Localized<string>;
    /** Title bypasses the layout's "%s | Economy Codes" template (already branded). */
    absoluteTitle?: boolean;
  };
  /** Editor cards, in order; fields name one via `section`. */
  sections: SectionDef[];
  /**
   * The page renders straight from `sections` (components/sections), so the
   * dashboard can hide and reorder them.
   */
  arrangeable?: boolean;
  text: TextFieldDef[];
  lists: ListFieldDef[];
  collections: CollectionFieldDef[];
  blocks: BlocksFieldDef[];
  images: ImageFieldDef[];
}

type PageDefInput = Omit<
  PageDef,
  "sections" | "text" | "lists" | "collections" | "blocks" | "images"
> &
  Partial<
    Pick<
      PageDef,
      "sections" | "text" | "lists" | "collections" | "blocks" | "images"
    >
  >;

/** Fills in the field arrays a page doesn't use. */
export function definePage(input: PageDefInput): PageDef {
  return {
    sections: [],
    text: [],
    lists: [],
    collections: [],
    blocks: [],
    images: [],
    ...input,
  };
}

type Messages = typeof svMessages;

/** A messages/*.json string in all three locales (section headings default to these). */
export function message(
  pick: (messages: Messages) => string,
): Localized<string> {
  return {
    sv: pick(svMessages),
    en: pick(enMessages as Messages),
    ar: pick(arMessages as Messages),
  };
}

/** The same string in every locale (proper nouns, "plain" defaults). */
export function same(value: string): Localized<string> {
  return { sv: value };
}

/** First ~155 characters, matching what the legal pages previously sliced inline. */
export function truncate(
  value: Localized<string>,
  length = 155,
): Localized<string> {
  return {
    sv: value.sv.slice(0, length),
    en: value.en?.slice(0, length),
    ar: value.ar?.slice(0, length),
  };
}
