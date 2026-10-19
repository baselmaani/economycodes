"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, FileUp } from "lucide-react";

import type { Locale } from "@/content/types";
import { cleanArticleJson } from "@/lib/cms/article-json";
import {
  articleInputSchema,
  formatIssues,
  type ArticleInput,
} from "@/lib/cms/schemas";
import { ArticleBody } from "@/components/content/ArticleBody";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  ErrorList,
  LocaleTabs,
  SectionCard,
  localeInputProps,
} from "@/components/admin/fields";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { importArticlesAction } from "../actions";

type Parsed =
  | { state: "empty" }
  | { state: "invalid"; errors: string[] }
  | { state: "valid"; articles: ArticleInput[] };

/** Client-side check for instant feedback; the server re-validates (plus slug/FAQ checks) on import. */
function parse(text: string): Parsed {
  if (!text.trim()) return { state: "empty" };
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (error) {
    return {
      state: "invalid",
      errors: [
        `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
      ],
    };
  }
  const items = Array.isArray(raw) ? raw : [raw];
  const articles: ArticleInput[] = [];
  const errors: string[] = [];
  items.forEach((item, index) => {
    const result = articleInputSchema.safeParse(cleanArticleJson(item));
    const prefix = items.length > 1 ? `[${index}] ` : "";
    if (result.success) articles.push(result.data);
    else errors.push(...formatIssues(result.error).map((e) => prefix + e));
  });
  return errors.length
    ? { state: "invalid", errors }
    : { state: "valid", articles };
}

export function JsonImport() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"keep" | "draft" | "published">("keep");
  const [overwrite, setOverwrite] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [locale, setLocale] = useState<Locale>("sv");
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [imported, setImported] = useState<string[]>([]);
  const [pending, startTransition] = useTransition();

  const parsed = useMemo(() => parse(text), [text]);
  const preview =
    parsed.state === "valid"
      ? parsed.articles[Math.min(previewIndex, parsed.articles.length - 1)]
      : undefined;
  const { className: dirClass, ...dirProps } = localeInputProps(locale);

  async function loadFile(file: File | undefined) {
    if (!file) return;
    setText(await file.text());
    setImported([]);
    setServerErrors([]);
    if (fileRef.current) fileRef.current.value = "";
  }

  function runImport() {
    startTransition(async () => {
      const result = await importArticlesAction(text, { overwrite, status });
      if (result.ok) {
        setServerErrors([]);
        setImported(result.data.ids);
        setText("");
      } else {
        setServerErrors(result.errors);
      }
    });
  }

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Import articles from JSON"
        description="Paste or upload one article object, or an array of them. Swedish (sv) is required; en and ar are optional and fall back to Swedish."
        actions={
          <Button
            render={<a href="/admin/articles/template" download />}
            variant="outline"
            size="sm"
          >
            <Download aria-hidden="true" /> Download template
          </Button>
        }
      />

      <div className="flex flex-col gap-6">
        {imported.length > 0 && (
          <div
            role="status"
            className="rounded-xl border border-emerald-600/30 bg-emerald-50 p-4 text-sm text-emerald-900"
          >
            Imported {imported.length} article{imported.length > 1 ? "s" : ""}:{" "}
            {imported.map((id, index) => (
              <span key={id}>
                {index > 0 && ", "}
                <Link
                  href={`/admin/articles/${id}`}
                  className="font-medium underline"
                >
                  {id}
                </Link>
              </span>
            ))}
          </div>
        )}

        <SectionCard title="JSON">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(event) => loadFile(event.target.files?.[0])}
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => fileRef.current?.click()}
            >
              <FileUp aria-hidden="true" /> Upload .json file
            </Button>
            <span className="text-muted-foreground text-xs">
              or paste below
            </span>
          </div>
          <Textarea
            aria-label="Article JSON"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setServerErrors([]);
              setImported([]);
            }}
            placeholder='{ "id": "…", "slug": { "sv": "…" }, "title": { "sv": "…" }, … }'
            className="min-h-72 font-mono text-xs"
            dir="ltr"
            spellCheck={false}
          />
          {parsed.state === "invalid" && <ErrorList errors={parsed.errors} />}
          <ErrorList errors={serverErrors} />
          {parsed.state === "valid" && (
            <p className="text-sm text-emerald-700">
              Valid: {parsed.articles.length} article
              {parsed.articles.length > 1 ? "s" : ""} ready to import.
            </p>
          )}
        </SectionCard>

        {preview && parsed.state === "valid" && (
          <SectionCard title="Preview">
            <div className="flex flex-wrap items-center gap-3">
              {parsed.articles.length > 1 && (
                <select
                  aria-label="Article to preview"
                  value={previewIndex}
                  onChange={(event) =>
                    setPreviewIndex(Number(event.target.value))
                  }
                  className="border-input bg-background h-9 rounded-lg border px-2 text-sm"
                >
                  {parsed.articles.map((article, index) => (
                    <option key={index} value={index}>
                      {article.id}
                    </option>
                  ))}
                </select>
              )}
              <LocaleTabs value={locale} onChange={setLocale} />
            </div>
            <dl className="text-muted-foreground grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs">
              <dt>Status</dt>
              <dd>{status === "keep" ? preview.status : status}</dd>
              <dt>Slug</dt>
              <dd dir="auto">
                {preview.slug[locale] ?? `${preview.slug.sv} (sv)`}
              </dd>
              <dt>Published</dt>
              <dd>{preview.publishedAt}</dd>
              <dt>Languages</dt>
              <dd className="uppercase">
                {(["sv", "en", "ar"] as const)
                  .filter((code) => preview.title[code])
                  .join(" · ")}
              </dd>
            </dl>
            <div
              className={cn("prose prose-neutral max-w-none", dirClass)}
              {...dirProps}
            >
              <div className="not-prose bg-muted relative mb-4 aspect-[16/10] max-w-sm overflow-hidden rounded-xl">
                <Image
                  src={preview.coverImage.src}
                  alt=""
                  fill
                  sizes="384px"
                  className="object-cover"
                />
              </div>
              <h1>{preview.title[locale] ?? preview.title.sv}</h1>
              <p className="lead">
                {preview.excerpt[locale] ?? preview.excerpt.sv}
              </p>
              <ArticleBody blocks={preview.body[locale] ?? preview.body.sv} />
            </div>
          </SectionCard>
        )}

        <SectionCard title="Import options">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium">Status</span>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as typeof status)
              }
              className="border-input bg-background h-9 max-w-xs rounded-lg border px-2"
            >
              <option value="keep">
                Use the status in the JSON (default: draft)
              </option>
              <option value="draft">Import as draft</option>
              <option value="published">Publish immediately</option>
            </select>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="accent-primary mt-0.5 size-4"
              checked={overwrite}
              onChange={(event) => setOverwrite(event.target.checked)}
            />
            <span>
              <span className="font-medium">Overwrite existing articles</span>
              <span className="text-muted-foreground block text-xs">
                Replace articles that have the same id instead of stopping with
                an error.
              </span>
            </span>
          </label>
          <div>
            <Button
              onClick={runImport}
              disabled={pending || parsed.state !== "valid"}
            >
              {pending ? "Importing…" : "Import"}
            </Button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
