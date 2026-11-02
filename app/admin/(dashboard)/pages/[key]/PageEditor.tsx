"use client";

import { useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, ExternalLink } from "lucide-react";

import type { Locale } from "@/content/types";
import type { PageDef, SectionDef } from "@/lib/cms/pages";
import type { PageOverrideData } from "@/lib/cms/schemas";
import { mergeLocalized, orderSections } from "@/lib/cms/resolve";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/PageHeader";
import { SeoFields } from "@/components/admin/SeoFields";
import { ImageField } from "@/components/admin/ImageField";
import { BlockEditor } from "@/components/admin/BlockEditor";
import { CollectionField } from "@/components/admin/CollectionField";
import { SectionLayoutField } from "@/components/admin/SectionLayoutField";
import {
  ErrorList,
  LocaleTabs,
  LocalizedField,
  LocalizedListField,
  OverrideToggle,
  SectionCard,
} from "@/components/admin/fields";
import { cn } from "@/lib/utils";
import { resetPageAction, savePageAction } from "../actions";

/** Cards for fields that don't name a section, in this order. */
const IMPLICIT_SECTIONS: SectionDef[] = [
  {
    key: "_text",
    label: "Text",
    description:
      "Leave a field empty to keep the original text (shown in grey).",
  },
  {
    key: "_lists",
    label: "Lists",
    description:
      "Edits apply to the selected language only; other languages keep their own text.",
  },
  { key: "_collections", label: "Items" },
  { key: "_blocks", label: "Body text" },
  { key: "_images", label: "Images" },
];

/** Section key of every field, so each card knows what it holds and how much is edited. */
function fieldSections(def: PageDef) {
  return [
    ...def.text.map((f) => ({
      kind: "text" as const,
      key: f.key,
      section: f.section ?? "_text",
    })),
    ...def.lists.map((f) => ({
      kind: "lists" as const,
      key: f.key,
      section: f.section ?? "_lists",
    })),
    ...def.collections.map((f) => ({
      kind: "collections" as const,
      key: f.key,
      section: f.section ?? "_collections",
    })),
    ...def.blocks.map((f) => ({
      kind: "blocks" as const,
      key: f.key,
      section: f.section ?? "_blocks",
    })),
    ...def.images.map((f) => ({
      kind: "images" as const,
      key: f.key,
      section: f.section ?? "_images",
    })),
  ];
}

function isEdited(
  data: PageOverrideData,
  kind: "text" | "lists" | "collections" | "blocks" | "images",
  key: string,
): boolean {
  const value = data[kind]?.[key];
  if (!value) return false;
  if (Array.isArray(value)) return true;
  return Object.values(value).some(Boolean);
}

function EditorSection({
  section,
  edited,
  hidden,
  open,
  onToggle,
  children,
}: {
  section: SectionDef;
  edited: number;
  hidden: boolean;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <section
      id={`section-${section.key}`}
      className="bg-card border-border scroll-mt-20 rounded-2xl border shadow-xs"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-5 text-start sm:px-6"
      >
        <span>
          <span className="flex items-center gap-2 font-semibold">
            {section.label}
            {edited > 0 && <Badge variant="secondary">{edited} edited</Badge>}
            {hidden && <Badge variant="outline">Hidden</Badge>}
          </span>
          {section.description && (
            <span className="text-muted-foreground mt-1 block text-sm font-normal">
              {section.description}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={cn(
            "text-muted-foreground shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-5 px-5 pb-6 sm:px-6">{children}</div>
      )}
    </section>
  );
}

export function PageEditor({
  def,
  initial,
  urls,
  viewPath,
  back = { href: "/admin/pages", label: "All pages" },
  description,
}: {
  def: PageDef;
  initial: PageOverrideData;
  urls: Record<Locale, string> | null;
  viewPath: string | null;
  back?: { href: string; label: string };
  description?: string;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("sv");
  const [data, setData] = useState<PageOverrideData>(initial);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>();
  const [pending, startTransition] = useTransition();

  const fields = fieldSections(def);
  // Arrangeable pages list their cards in the order the site shows them.
  const pageSections = def.arrangeable
    ? orderSections(def.sections, data.layout?.order).map(
        (key) => def.sections.find((section) => section.key === key)!,
      )
    : def.sections;
  const sections = [...pageSections, ...IMPLICIT_SECTIONS].filter((section) =>
    fields.some((field) => field.section === section.key),
  );
  const hiddenSections = new Set(
    def.sections
      .filter((s) => !s.locked && data.layout?.hidden?.includes(s.key))
      .map((s) => s.key),
  );
  // Long pages start collapsed so the editor can find a section quickly.
  const [open, setOpen] = useState<Set<string>>(
    () =>
      new Set(
        sections.length > 3 ? [] : sections.map((section) => section.key),
      ),
  );

  function toggle(key: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function jumpTo(key: string) {
    setOpen((current) => new Set(current).add(key));
    requestAnimationFrame(() =>
      document
        .getElementById(`section-${key}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function update(next: PageOverrideData) {
    setData(next);
    setDirty(true);
    setStatus(undefined);
  }

  function save() {
    startTransition(async () => {
      const result = await savePageAction(def.key, data);
      if (result.ok) {
        setErrors([]);
        setDirty(false);
        setStatus("Saved. The live site is updated.");
        router.refresh();
      } else {
        setErrors(result.errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  function resetAll() {
    if (
      !window.confirm(
        `Remove all your changes to "${def.label}" and restore the original content?`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      const result = await resetPageAction(def.key);
      if (result.ok) {
        setData({});
        setDirty(false);
        setErrors([]);
        setStatus("Restored the original content.");
        router.refresh();
      } else {
        setErrors(result.errors);
      }
    });
  }

  const localePath = urls
    ? decodeURI(new URL(urls[locale]).pathname)
    : viewPath;
  // Picked images take the meta title (as currently edited) as alt text.
  const metaTitle = def.seo
    ? mergeLocalized(def.seo.title, data.seo?.title)
    : undefined;

  function renderField(field: ReturnType<typeof fieldSections>[number]) {
    const id = `${def.key}-${field.key}`;
    switch (field.kind) {
      case "text": {
        const textDef = def.text.find((f) => f.key === field.key)!;
        const plain = textDef.kind === "plain";
        return (
          <LocalizedField
            key={id}
            id={id}
            label={plain ? `${textDef.label} (all languages)` : textDef.label}
            hint={textDef.hint}
            locale={plain ? "sv" : locale}
            multiline={textDef.kind === "textarea"}
            value={data.text?.[field.key]}
            fallback={textDef.default}
            onChange={(value) =>
              update({ ...data, text: { ...data.text, [field.key]: value } })
            }
          />
        );
      }
      case "lists": {
        const listDef = def.lists.find((f) => f.key === field.key)!;
        return (
          <LocalizedListField
            key={id}
            id={id}
            label={listDef.label}
            locale={locale}
            value={data.lists?.[field.key]}
            fallback={listDef.default}
            onChange={(value) =>
              update({ ...data, lists: { ...data.lists, [field.key]: value } })
            }
          />
        );
      }
      case "collections": {
        const collectionDef = def.collections.find((f) => f.key === field.key)!;
        return (
          <CollectionField
            key={id}
            id={id}
            def={collectionDef}
            locale={locale}
            value={data.collections?.[field.key]}
            onChange={(items) => {
              const collections = { ...data.collections };
              if (items) collections[field.key] = items;
              else delete collections[field.key];
              update({ ...data, collections });
            }}
          />
        );
      }
      case "blocks": {
        const blocksDef = def.blocks.find((f) => f.key === field.key)!;
        const custom = data.blocks?.[field.key]?.[locale];
        const original = blocksDef.default[locale] ?? blocksDef.default.sv;
        const setBlocks = (blocks: typeof custom) =>
          update({
            ...data,
            blocks: {
              ...data.blocks,
              [field.key]: { ...data.blocks?.[field.key], [locale]: blocks },
            },
          });
        return (
          <div key={id} className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-medium">{blocksDef.label}</p>
              <OverrideToggle
                overridden={custom !== undefined}
                onCopyOriginal={() => setBlocks(structuredClone(original))}
                onUseOriginal={() => setBlocks(undefined)}
              />
            </div>
            <p className="text-muted-foreground text-xs">
              {custom
                ? "Your version of the text for this language. Removing every block restores the original."
                : `Showing the original text (${original.length} blocks). Choose "Start from original" to edit it.`}
            </p>
            {custom && (
              <BlockEditor
                locale={locale}
                blocks={custom}
                onChange={setBlocks}
              />
            )}
          </div>
        );
      }
      case "images": {
        const imageDef = def.images.find((f) => f.key === field.key)!;
        return (
          <ImageField
            key={id}
            id={id}
            label={imageDef.label}
            hint={imageDef.hint}
            locale={locale}
            value={data.images?.[field.key]}
            fallback={imageDef.default}
            autoAlt={metaTitle}
            onChange={(image) => {
              const images = { ...data.images };
              if (image) images[field.key] = image;
              else delete images[field.key];
              update({ ...data, images });
            }}
          />
        );
      }
    }
  }

  return (
    <div className="max-w-3xl">
      <Link
        href={back.href}
        className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft size={14} aria-hidden="true" /> {back.label}
      </Link>
      <PageHeader
        title={def.label}
        description={
          description ??
          (def.group === "Services"
            ? "Service page. Fields you leave empty keep the original content."
            : undefined)
        }
        actions={
          localePath && (
            <Button
              render={<a href={localePath} target="_blank" rel="noreferrer" />}
              variant="outline"
              size="sm"
            >
              <ExternalLink aria-hidden="true" /> View page
            </Button>
          )
        }
      />

      <div className="bg-muted/40 sticky top-0 z-10 -mx-1 mb-6 flex flex-wrap items-center justify-between gap-3 px-1 py-2 backdrop-blur md:top-0">
        <div className="flex flex-wrap items-center gap-2">
          <LocaleTabs value={locale} onChange={setLocale} />
          {sections.length > 3 && (
            <select
              aria-label="Jump to section"
              value=""
              onChange={(event) => jumpTo(event.target.value)}
              className="border-input bg-background h-9 rounded-md border px-2 text-sm"
            >
              <option value="" disabled>
                Jump to section…
              </option>
              {sections.map((section) => (
                <option key={section.key} value={section.key}>
                  {section.label}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <span className="text-muted-foreground text-xs">
              Unsaved changes
            </span>
          )}
          <Button onClick={save} disabled={pending || !dirty}>
            {pending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <ErrorList errors={errors} />
        {status && (
          <p role="status" className="text-sm text-emerald-700">
            {status}
          </p>
        )}

        {def.seo && (
          <SeoFields
            id={def.key}
            locale={locale}
            value={data.seo ?? {}}
            onChange={(seo) => update({ ...data, seo })}
            defaults={def.seo}
            url={urls?.[locale] ?? ""}
            absoluteTitle={def.seo.absoluteTitle}
          />
        )}

        {def.arrangeable && (
          <SectionCard
            title="Page layout"
            description="Hide sections or change their order on the live page. Hidden sections keep their content."
          >
            <SectionLayoutField
              sections={def.sections}
              value={data.layout}
              onChange={(layout) => update({ ...data, layout })}
            />
          </SectionCard>
        )}

        {sections.length > 3 && (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() =>
                setOpen(new Set(sections.map((section) => section.key)))
              }
            >
              Expand all
            </Button>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => setOpen(new Set())}
            >
              Collapse all
            </Button>
          </div>
        )}

        {sections.map((section) => {
          const inSection = fields.filter(
            (field) => field.section === section.key,
          );
          return (
            <EditorSection
              key={section.key}
              section={section}
              edited={
                inSection.filter((field) =>
                  isEdited(data, field.kind, field.key),
                ).length
              }
              hidden={hiddenSections.has(section.key)}
              open={open.has(section.key)}
              onToggle={() => toggle(section.key)}
            >
              {inSection.map(renderField)}
            </EditorSection>
          );
        })}

        <div className="border-border flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          <Button variant="destructive" onClick={resetAll} disabled={pending}>
            Restore original content
          </Button>
          <Button onClick={save} disabled={pending || !dirty}>
            {pending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
