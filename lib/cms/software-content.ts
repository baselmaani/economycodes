import type { Localized } from "@/content/types";
import { softwarePages, type SoftwarePageKey } from "@/content/software";
import type {
  SoftwareFaq,
  SoftwareFeature,
  SoftwareIntegration,
  SoftwareStep,
  SoftwareSubpageContent,
} from "@/content/software-pages";
import {
  SOFTWARE_SHOT_IDS,
  type SoftwareShotId,
} from "@/content/software-shot-ids";
import type { CollectionItem } from "@/lib/cms/pages/types";

/**
 * Converts the /bokforingsprogram copy between its typed shape
 * (content/software-pages.ts) and dashboard collections, whose item fields
 * are all localized strings. Pure, so the round trip can be unit tested:
 * with no dashboard override the pages render exactly the coded content.
 *
 * Encodings: paragraphs are separated by a blank line, bullets by a line
 * break; shots are ids from content/software-shot-ids.ts (unknown ids are
 * dropped); `page` is a software page key.
 */

export const PARAGRAPH_SEPARATOR = "\n\n";
export const BULLET_SEPARATOR = "\n";

type CmsInput = {
  text: Record<string, Localized<string>>;
  lists: Record<string, Localized<string[]>>;
  collections: Record<string, CollectionItem[]>;
};

function mapLocales<A, B>(
  value: Localized<A>,
  map: (value: A) => B,
): Localized<B> {
  const out: Localized<B> = { sv: map(value.sv) };
  for (const locale of ["en", "ar"] as const) {
    const localeValue = value[locale];
    if (localeValue !== undefined) out[locale] = map(localeValue);
  }
  return out;
}

export function joinLocalized(
  value: Localized<string[]> | undefined,
  separator: string,
): Localized<string> {
  return value
    ? mapLocales(value, (items) => items.join(separator))
    : { sv: "" };
}

/** Splits each locale; undefined when the Swedish text is empty (an absent optional list). */
export function splitLocalized(
  value: Localized<string> | undefined,
  pattern: RegExp,
): Localized<string[]> | undefined {
  if (!value?.sv.trim()) return undefined;
  const split = (text: string) =>
    text
      .split(pattern)
      .map((part) => part.trim())
      .filter(Boolean);
  const out: Localized<string[]> = { sv: split(value.sv) };
  for (const locale of ["en", "ar"] as const) {
    const parts = value[locale]?.trim() ? split(value[locale]!) : undefined;
    if (parts?.length) out[locale] = parts;
  }
  return out;
}

const PARAGRAPHS = /\n\s*\n/;
const LINES = /\n/;

function optional(
  value: Localized<string> | undefined,
): Localized<string> | undefined {
  return value?.sv.trim() ? value : undefined;
}

function text(value: Localized<string> | undefined): Localized<string> {
  return value ?? { sv: "" };
}

function plain(value: string | undefined): Localized<string> {
  return { sv: value ?? "" };
}

export function isSoftwareShotId(value: string): value is SoftwareShotId {
  return (SOFTWARE_SHOT_IDS as readonly string[]).includes(value);
}

function shotOf(
  value: Localized<string> | undefined,
): SoftwareShotId | undefined {
  const id = value?.sv.trim() ?? "";
  return isSoftwareShotId(id) ? id : undefined;
}

function pageOf(value: Localized<string> | undefined): SoftwarePageKey {
  const key = value?.sv.trim() ?? "";
  return key in softwarePages ? (key as SoftwarePageKey) : "overview";
}

/** Anchor/id text: lowercase, hyphenated, no "#". */
function anchorOf(value: Localized<string> | undefined): string | undefined {
  const anchor = value?.sv.trim().replace(/^#/, "") ?? "";
  return anchor || undefined;
}

// ---------------------------------------------------------------------------
// Steps, features, FAQs (shared by the overview and the subpages)

export function stepToItem(step: SoftwareStep): CollectionItem {
  return { title: step.title, body: step.body, shot: plain(step.shot) };
}

export function itemToStep(item: CollectionItem): SoftwareStep {
  return {
    title: text(item.title),
    body: text(item.body),
    shot: shotOf(item.shot),
  };
}

export function featureToItem(feature: SoftwareFeature): CollectionItem {
  return {
    id: plain(feature.id),
    title: feature.title,
    paragraphs: joinLocalized(feature.paragraphs, PARAGRAPH_SEPARATOR),
    bullets: joinLocalized(feature.bullets, BULLET_SEPARATOR),
    exampleTitle: text(feature.example?.title),
    exampleBody: text(feature.example?.body),
    badge: text(feature.badge),
    shot: plain(feature.shot),
  };
}

export function itemToFeature(
  item: CollectionItem,
  index: number,
): SoftwareFeature {
  const exampleTitle = optional(item.exampleTitle);
  const exampleBody = optional(item.exampleBody);
  return {
    id: anchorOf(item.id) ?? `funktion-${index + 1}`,
    title: text(item.title),
    paragraphs: splitLocalized(item.paragraphs, PARAGRAPHS) ?? { sv: [] },
    bullets: splitLocalized(item.bullets, LINES),
    example:
      exampleTitle && exampleBody
        ? { title: exampleTitle, body: exampleBody }
        : undefined,
    badge: optional(item.badge),
    shot: shotOf(item.shot),
  };
}

export function faqToItem(faq: SoftwareFaq): CollectionItem {
  return { id: plain(faq.id), question: faq.question, answer: faq.answer };
}

export function itemToFaq(
  item: CollectionItem,
  index: number,
  prefix: string,
): SoftwareFaq {
  return {
    id: anchorOf(item.id) ?? `${prefix}-faq-${index + 1}`,
    question: text(item.question),
    answer: text(item.answer),
  };
}

// ---------------------------------------------------------------------------
// Subpages

/** A subpage's coded content with the dashboard's edits applied. */
export function subpageContent(
  base: SoftwareSubpageContent,
  cms: CmsInput,
): SoftwareSubpageContent {
  const { text: t, collections: c } = cms;
  return {
    key: base.key,
    hero: {
      eyebrow: text(t.heroEyebrow),
      title: text(t.heroTitle),
      lead: text(t.heroLead),
      shot: base.hero.shot,
    },
    workflow: {
      title: text(t.workflowTitle),
      lead: text(t.workflowLead),
      steps: (c.workflowSteps ?? []).map(itemToStep),
    },
    features: (c.features ?? []).map(itemToFeature),
    faqs: (c.faqs ?? []).map((item, index) => itemToFaq(item, index, base.key)),
    pendingNote: optional(t.pendingNote),
  };
}

// ---------------------------------------------------------------------------
// Overview

export interface SoftwareOverviewFeature {
  page: SoftwarePageKey;
  anchor: string | undefined;
  shot: SoftwareShotId;
  badge?: Localized<string>;
  title: Localized<string>;
  body: Localized<string>;
}

export interface SoftwareOverviewContent {
  hero: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    lead: Localized<string>;
  };
  walkthrough: {
    title: Localized<string>;
    lead: Localized<string>;
    steps: SoftwareStep[];
  };
  intro: { title: Localized<string>; paragraphs: Localized<string[]> };
  featuresTitle: Localized<string>;
  featuresLead: Localized<string>;
  features: SoftwareOverviewFeature[];
  example: { title: Localized<string>; body: Localized<string> };
  faqs: SoftwareFaq[];
  integrations: {
    title: Localized<string>;
    lead: Localized<string>;
    items: SoftwareIntegration[];
  };
  orAccounting: {
    title: Localized<string>;
    body: Localized<string>;
    link: Localized<string>;
  };
}

export function overviewFeatureToItem(
  feature: SoftwareOverviewFeature,
): CollectionItem {
  return {
    page: plain(feature.page),
    anchor: plain(feature.anchor),
    shot: plain(feature.shot),
    badge: text(feature.badge),
    title: feature.title,
    body: feature.body,
  };
}

export function integrationToItem(item: SoftwareIntegration): CollectionItem {
  return {
    id: plain(item.id),
    name: item.name,
    what: item.what,
    who: item.who,
    page: plain(item.page),
    anchor: plain(item.anchor),
  };
}

export function overviewContent(cms: CmsInput): SoftwareOverviewContent {
  const { text: t, lists: l, collections: c } = cms;
  return {
    hero: {
      eyebrow: text(t.heroEyebrow),
      title: text(t.heroTitle),
      lead: text(t.heroLead),
    },
    walkthrough: {
      title: text(t.walkthroughTitle),
      lead: text(t.walkthroughLead),
      steps: (c.walkthroughSteps ?? []).map(itemToStep),
    },
    intro: {
      title: text(t.introTitle),
      paragraphs: l.introParagraphs ?? { sv: [] },
    },
    featuresTitle: text(t.featuresTitle),
    featuresLead: text(t.featuresLead),
    features: (c.features ?? []).map((item) => ({
      page: pageOf(item.page),
      anchor: anchorOf(item.anchor),
      // Every overview card has a screenshot; fall back to the dashboard one.
      shot: shotOf(item.shot) ?? "dashboard",
      badge: optional(item.badge),
      title: text(item.title),
      body: text(item.body),
    })),
    example: { title: text(t.exampleTitle), body: text(t.exampleBody) },
    faqs: (c.faqs ?? []).map((item, index) =>
      itemToFaq(item, index, "software"),
    ),
    integrations: {
      title: text(t.integrationsTitle),
      lead: text(t.integrationsLead),
      items: (c.integrations ?? []).map((item, index) => ({
        id: anchorOf(item.id) ?? `integration-${index + 1}`,
        name: text(item.name),
        what: text(item.what),
        who: text(item.who),
        page: pageOf(item.page),
        anchor: anchorOf(item.anchor) ?? "",
      })),
    },
    orAccounting: {
      title: text(t.orAccountingTitle),
      body: text(t.orAccountingBody),
      link: text(t.orAccountingLink),
    },
  };
}
