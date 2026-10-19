"use client";

import type { Locale, Localized } from "@/content/types";
import type { SeoFields as SeoValue } from "@/lib/cms/schemas";
import { ImageField } from "./ImageField";
import { LocalizedField, SectionCard, localeInputProps } from "./fields";

const TITLE_SUFFIX = " | Economy Codes";

/**
 * SEO section shared by the page and article editors: meta title and
 * description (empty = use the default shown as placeholder), a search
 * result preview, a social share image, and noindex.
 */
export function SeoFields({
  id,
  locale,
  value,
  onChange,
  defaults,
  url,
  absoluteTitle = false,
}: {
  id: string;
  locale: Locale;
  value: SeoValue;
  onChange: (next: SeoValue) => void;
  defaults: { title: Localized<string>; description: Localized<string> };
  /** Public URL for the active locale, shown in the preview. */
  url: string;
  /** False when the layout appends " | Economy Codes" to the title. */
  absoluteTitle?: boolean;
}) {
  const title =
    value.title?.[locale] || defaults.title[locale] || defaults.title.sv;
  const description =
    value.description?.[locale] ||
    defaults.description[locale] ||
    defaults.description.sv;
  const fullTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;
  const { className: dirClass, ...dirProps } = localeInputProps(locale);

  return (
    <SectionCard
      title="SEO"
      description="Leave a field empty to use the default shown in grey."
    >
      <LocalizedField
        id={`${id}-seo-title`}
        label="Meta title"
        locale={locale}
        value={value.title}
        fallback={defaults.title}
        onChange={(next) => onChange({ ...value, title: next })}
        maxRecommended={absoluteTitle ? 60 : 60 - TITLE_SUFFIX.length}
        hint={
          absoluteTitle
            ? "Shown exactly as written."
            : `"${TITLE_SUFFIX.trim()}" is added automatically.`
        }
      />
      <LocalizedField
        id={`${id}-seo-description`}
        label="Meta description"
        locale={locale}
        value={value.description}
        fallback={defaults.description}
        onChange={(next) => onChange({ ...value, description: next })}
        multiline
        maxRecommended={155}
      />

      <div>
        <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
          Search result preview
        </p>
        <div
          className={`bg-background border-border rounded-xl border p-4 ${dirClass ?? ""}`}
          {...dirProps}
        >
          <p className="text-muted-foreground truncate text-xs" dir="ltr">
            {url}
          </p>
          <p className="mt-1 line-clamp-1 text-lg text-[#1a0dab]">
            {fullTitle}
          </p>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
            {description}
          </p>
        </div>
      </div>

      <ImageField
        id={`${id}-og`}
        label="Social share image (optional)"
        hint="1200 × 630 recommended. Without one, the branded card is used."
        locale={locale}
        value={value.ogImage}
        onChange={(ogImage) => onChange({ ...value, ogImage })}
      />

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="accent-primary mt-0.5 size-4"
          checked={value.noindex ?? false}
          onChange={(event) =>
            onChange({ ...value, noindex: event.target.checked || undefined })
          }
        />
        <span>
          <span className="font-medium">Hide from search engines</span>
          <span className="text-muted-foreground block text-xs">
            Adds noindex and removes the page from the sitemap. All languages.
          </span>
        </span>
      </label>
    </SectionCard>
  );
}
