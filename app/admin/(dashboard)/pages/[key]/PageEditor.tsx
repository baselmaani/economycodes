"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

import type { Locale } from "@/content/types";
import type { PageDef } from "@/lib/cms/pages";
import type { PageOverrideData } from "@/lib/cms/schemas";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/PageHeader";
import { SeoFields } from "@/components/admin/SeoFields";
import { ImageField } from "@/components/admin/ImageField";
import {
  ErrorList,
  LocaleTabs,
  LocalizedField,
  SectionCard,
} from "@/components/admin/fields";
import { resetPageAction, savePageAction } from "../actions";

export function PageEditor({
  def,
  initial,
  urls,
  viewPath,
}: {
  def: PageDef;
  initial: PageOverrideData;
  urls: Record<Locale, string> | null;
  viewPath: string | null;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("sv");
  const [data, setData] = useState<PageOverrideData>(initial);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>();
  const [pending, startTransition] = useTransition();

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
        setStatus("Saved. The live page is updated.");
        router.refresh();
      } else {
        setErrors(result.errors);
      }
    });
  }

  function resetAll() {
    if (
      !window.confirm(
        "Remove all your changes to this page and restore the original content?",
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

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/pages"
        className="text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft size={14} aria-hidden="true" /> All pages
      </Link>
      <PageHeader
        title={def.label}
        description={def.group === "Services" ? "Service page" : undefined}
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
        <LocaleTabs value={locale} onChange={setLocale} />
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

        <SeoFields
          id={def.key}
          locale={locale}
          value={data.seo ?? {}}
          onChange={(seo) => update({ ...data, seo })}
          defaults={def.seo}
          url={urls?.[locale] ?? ""}
          absoluteTitle={def.seo.absoluteTitle}
        />

        {def.text.length > 0 && (
          <SectionCard
            title="Text"
            description="Leave a field empty to keep the original text (shown in grey)."
          >
            {def.text.map((field) => (
              <LocalizedField
                key={field.key}
                id={`${def.key}-${field.key}`}
                label={field.label}
                locale={locale}
                multiline={field.kind === "textarea"}
                value={data.text?.[field.key]}
                fallback={field.default}
                onChange={(value) =>
                  update({
                    ...data,
                    text: { ...data.text, [field.key]: value },
                  })
                }
              />
            ))}
          </SectionCard>
        )}

        {def.images.length > 0 && (
          <SectionCard title="Images">
            {def.images.map((field) => (
              <ImageField
                key={field.key}
                id={`${def.key}-${field.key}`}
                label={field.label}
                hint={field.hint}
                locale={locale}
                value={data.images?.[field.key]}
                fallback={field.default}
                onChange={(image) => {
                  const images = { ...data.images };
                  if (image) images[field.key] = image;
                  else delete images[field.key];
                  update({ ...data, images });
                }}
              />
            ))}
          </SectionCard>
        )}

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
