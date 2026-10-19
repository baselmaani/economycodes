"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, ExternalLink, Eye, Pencil } from "lucide-react";

import type { Locale } from "@/content/types";
import type { PartialLocalized } from "@/lib/cms/schemas";
import {
  articlePath,
  slugify,
  type ArticleDraft,
} from "@/lib/cms/article-json";
import { ArticleBody } from "@/components/content/ArticleBody";
import { BlockEditor } from "@/components/admin/BlockEditor";
import { ImageField } from "@/components/admin/ImageField";
import { PageHeader } from "@/components/admin/PageHeader";
import { SeoFields } from "@/components/admin/SeoFields";
import {
  ErrorList,
  FieldShell,
  LocaleTabs,
  LocalizedField,
  SectionCard,
  localeInputProps,
} from "@/components/admin/fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { saveArticleAction } from "./actions";

/** Keeps `sv` present (Localized<string> requires it) when a field edit clears it. */
function withSv(value: PartialLocalized) {
  return { ...value, sv: value.sv ?? "" };
}

export function ArticleEditor({
  mode,
  initial,
  faqOptions,
  siteUrl,
}: {
  mode: "create" | "update";
  initial: ArticleDraft;
  faqOptions: { id: string; question: string }[];
  siteUrl: string;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<ArticleDraft>(initial);
  const [locale, setLocale] = useState<Locale>("sv");
  const [idTouched, setIdTouched] = useState(mode === "update");
  const [preview, setPreview] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>();
  const [pending, startTransition] = useTransition();

  function update(next: Partial<ArticleDraft>) {
    setDraft((current) => ({ ...current, ...next }));
    setDirty(true);
    setStatus(undefined);
  }

  function setSlug(value: PartialLocalized) {
    const slug = withSv(value);
    update({
      slug,
      // New articles get an id from the Swedish slug until it's edited by hand.
      ...(!idTouched && { id: slugify(slug.sv).replace(/[^a-z0-9-]/g, "") }),
    });
  }

  function save() {
    startTransition(async () => {
      const result = await saveArticleAction(draft, mode);
      if (!result.ok) {
        setErrors(result.errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setErrors([]);
      setDirty(false);
      if (mode === "create") {
        router.push(`/admin/articles/${result.data.id}`);
      } else {
        setStatus(
          draft.status === "published"
            ? "Saved. The live article is updated."
            : "Saved as draft.",
        );
        router.refresh();
      }
    });
  }

  const blocks = draft.body[locale] ?? [];
  const translated = locale === "sv" || Boolean(draft.title[locale]);
  const incomplete = (["en", "ar"] as const).filter(
    (code) => draft.title[code] && !draft.body[code]?.length,
  );
  const { className: dirClass, ...dirProps } = localeInputProps(locale);
  const slugForLocale = draft.slug[locale] || draft.slug.sv;

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/articles"
        className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft size={14} aria-hidden="true" /> All articles
      </Link>
      <PageHeader
        title={draft.title.sv || "New article"}
        description={
          mode === "create"
            ? "Fill in Swedish first; English and Arabic are optional."
            : draft.id
        }
        actions={
          mode === "update" && (
            <>
              {initial.status === "published" && (
                <Button
                  render={
                    <a
                      href={articlePath("sv", initial.slug.sv)}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink aria-hidden="true" /> View
                </Button>
              )}
              <Button
                render={
                  <a href={`/admin/articles/${draft.id}/export`} download />
                }
                variant="outline"
                size="sm"
              >
                <Download aria-hidden="true" /> Export JSON
              </Button>
            </>
          )
        }
      />

      <div className="bg-muted/40 sticky top-0 z-10 -mx-1 mb-6 flex flex-wrap items-center justify-between gap-3 px-1 py-2 backdrop-blur">
        <LocaleTabs
          value={locale}
          onChange={setLocale}
          incomplete={incomplete}
        />
        <div className="flex items-center gap-2">
          {dirty && (
            <span className="text-muted-foreground text-xs">
              Unsaved changes
            </span>
          )}
          <select
            aria-label="Status"
            value={draft.status}
            onChange={(event) =>
              update({ status: event.target.value as ArticleDraft["status"] })
            }
            className="border-input bg-background h-10 rounded-lg border px-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Button onClick={save} disabled={pending}>
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

        <SectionCard
          title="Basics"
          description={
            locale === "sv"
              ? undefined
              : "Leave a field empty to show the Swedish version for this language."
          }
        >
          {mode === "create" && locale === "sv" && (
            <FieldShell
              id="article-id"
              label="Article id"
              hint="Internal, permanent identifier (a-z, 0-9, hyphens). Filled from the slug automatically."
            >
              <Input
                id="article-id"
                value={draft.id}
                onChange={(event) => {
                  setIdTouched(true);
                  update({ id: event.target.value });
                }}
                className="h-9 font-mono"
                dir="ltr"
              />
            </FieldShell>
          )}
          <LocalizedField
            id="article-title"
            label="Title (H1)"
            locale={locale}
            value={draft.title}
            fallback={locale === "sv" ? undefined : { sv: draft.title.sv }}
            onChange={(title) => update({ title: withSv(title) })}
          />
          <div className="flex flex-col gap-2">
            <LocalizedField
              id="article-slug"
              label="URL slug"
              locale={locale}
              value={draft.slug}
              fallback={locale === "sv" ? undefined : { sv: draft.slug.sv }}
              onChange={setSlug}
              hint={
                <span dir="ltr">
                  {siteUrl}
                  {articlePath(locale, slugForLocale || "…")}
                </span>
              }
            />
            <Button
              type="button"
              size="xs"
              variant="ghost"
              className="self-start"
              disabled={!draft.title[locale]}
              onClick={() =>
                setSlug({
                  ...draft.slug,
                  [locale]: slugify(draft.title[locale] ?? ""),
                })
              }
            >
              Generate slug from title
            </Button>
          </div>
          <LocalizedField
            id="article-excerpt"
            label="Excerpt"
            locale={locale}
            value={draft.excerpt}
            fallback={locale === "sv" ? undefined : { sv: draft.excerpt.sv }}
            onChange={(excerpt) => update({ excerpt: withSv(excerpt) })}
            multiline
            hint="Shown on the article list, and the default meta description."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldShell id="article-published" label="Published date">
              <Input
                id="article-published"
                type="date"
                value={draft.publishedAt}
                onChange={(event) =>
                  update({ publishedAt: event.target.value })
                }
                className="h-9"
              />
            </FieldShell>
            <FieldShell
              id="article-updated"
              label="Last reviewed (optional)"
              hint="Set when the content changes materially."
            >
              <Input
                id="article-updated"
                type="date"
                value={draft.updatedAt ?? ""}
                onChange={(event) =>
                  update({ updatedAt: event.target.value || undefined })
                }
                className="h-9"
              />
            </FieldShell>
          </div>
        </SectionCard>

        <SectionCard title="Content">
          <div className="-mt-2 flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setPreview((value) => !value)}
            >
              {preview ? (
                <Pencil aria-hidden="true" />
              ) : (
                <Eye aria-hidden="true" />
              )}
              {preview ? "Edit" : "Preview"}
            </Button>
          </div>
          {!translated && blocks.length === 0 ? (
            <div className="border-border rounded-xl border border-dashed p-6 text-center text-sm">
              <p className="text-muted-foreground">
                Not translated. Visitors see the Swedish text.
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() =>
                  update({
                    body: {
                      ...draft.body,
                      [locale]: structuredClone(draft.body.sv),
                    },
                  })
                }
              >
                Start from a copy of the Swedish text
              </Button>
            </div>
          ) : preview ? (
            <div
              className={cn("prose prose-neutral max-w-none", dirClass)}
              {...dirProps}
            >
              <h1>{draft.title[locale] || draft.title.sv}</h1>
              <ArticleBody blocks={blocks} />
            </div>
          ) : (
            <BlockEditor
              locale={locale}
              blocks={blocks}
              onChange={(next) =>
                update({ body: { ...draft.body, [locale]: next } })
              }
            />
          )}
        </SectionCard>

        <SectionCard
          title="Cover image"
          description="Shown on the article list and in structured data."
        >
          <ImageField
            id="article-cover"
            label="Cover image"
            hint="Landscape, about 16:10"
            locale={locale}
            value={draft.coverImage}
            onChange={(coverImage) => update({ coverImage })}
          />
        </SectionCard>

        <SectionCard
          title="Related questions"
          description="FAQs shown under the article (and marked up for search engines)."
        >
          <div className="grid max-h-72 gap-2 overflow-y-auto sm:grid-cols-2">
            {faqOptions.map((faq) => (
              <label key={faq.id} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-primary mt-0.5 size-4 shrink-0"
                  checked={draft.faqIds.includes(faq.id)}
                  onChange={(event) =>
                    update({
                      faqIds: event.target.checked
                        ? [...draft.faqIds, faq.id]
                        : draft.faqIds.filter((id) => id !== faq.id),
                    })
                  }
                />
                <span>{faq.question}</span>
              </label>
            ))}
          </div>
        </SectionCard>

        <SeoFields
          id="article"
          locale={locale}
          value={draft.seo}
          onChange={(seo) => update({ seo })}
          defaults={{ title: draft.title, description: draft.excerpt }}
          url={`${siteUrl}${articlePath(locale, slugForLocale || "…")}`}
          absoluteTitle
        />

        <div className="border-border flex justify-end border-t pt-6">
          <Button onClick={save} disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
