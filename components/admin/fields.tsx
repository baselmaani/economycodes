"use client";

import type { ReactNode } from "react";

import type { Locale, Localized } from "@/content/types";
import type { PartialLocalized } from "@/lib/cms/schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const ADMIN_LOCALES: { code: Locale; label: string }[] = [
  { code: "sv", label: "Svenska" },
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

/** Language switcher shared by every editor; `incomplete` marks locales with missing required text. */
export function LocaleTabs({
  value,
  onChange,
  incomplete = [],
}: {
  value: Locale;
  onChange: (locale: Locale) => void;
  incomplete?: Locale[];
}) {
  return (
    <div
      role="tablist"
      aria-label="Language"
      className="bg-muted inline-flex rounded-lg p-1"
    >
      {ADMIN_LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          role="tab"
          aria-selected={value === code}
          onClick={() => onChange(code)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            value === code
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
          {incomplete.includes(code) && (
            <span className="text-destructive ms-1" aria-label="incomplete">
              •
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function FieldShell({
  id,
  label,
  hint,
  children,
  aside,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {aside}
      </div>
      {children}
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
    </div>
  );
}

/** Text direction + font for an input holding text in `locale`. */
export function localeInputProps(locale: Locale) {
  return locale === "ar"
    ? { dir: "rtl" as const, lang: "ar", className: "font-arabic" }
    : { dir: "ltr" as const, lang: locale };
}

/**
 * One localized text field, showing the value for the active `locale`. When
 * `fallback` is given, an empty field means "use the fallback" and the
 * fallback is shown as the placeholder.
 */
export function LocalizedField({
  id,
  label,
  locale,
  value,
  onChange,
  fallback,
  multiline = false,
  hint,
  maxRecommended,
}: {
  id: string;
  label: string;
  locale: Locale;
  value: PartialLocalized | Localized<string> | undefined;
  onChange: (next: PartialLocalized) => void;
  fallback?: Localized<string>;
  multiline?: boolean;
  hint?: ReactNode;
  /** Shows a character counter that turns red past this length (SEO fields). */
  maxRecommended?: number;
}) {
  const current = value?.[locale] ?? "";
  const placeholder = fallback ? (fallback[locale] ?? fallback.sv) : undefined;
  const length = (current || placeholder || "").length;
  const update = (text: string) => onChange({ ...value, [locale]: text });
  const { className, ...dirProps } = localeInputProps(locale);
  const fieldId = `${id}-${locale}`;

  return (
    <FieldShell
      id={fieldId}
      label={label}
      hint={hint}
      aside={
        maxRecommended ? (
          <span
            className={cn(
              "text-xs tabular-nums",
              length > maxRecommended
                ? "text-destructive"
                : "text-muted-foreground",
            )}
          >
            {length}/{maxRecommended}
          </span>
        ) : undefined
      }
    >
      {multiline ? (
        <Textarea
          id={fieldId}
          value={current}
          placeholder={placeholder}
          onChange={(event) => update(event.target.value)}
          className={cn("min-h-24", className)}
          {...dirProps}
        />
      ) : (
        <Input
          id={fieldId}
          value={current}
          placeholder={placeholder}
          onChange={(event) => update(event.target.value)}
          className={cn("h-9", className)}
          {...dirProps}
        />
      )}
    </FieldShell>
  );
}

export function ErrorList({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <div
      role="alert"
      className="border-destructive/30 bg-destructive/5 text-destructive rounded-xl border p-4 text-sm"
    >
      <p className="font-medium">Please fix the following:</p>
      <ul className="mt-2 list-disc space-y-1 ps-5">
        {errors.map((error) => (
          <li key={error} className="break-words">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="bg-card border-border rounded-2xl border p-5 shadow-xs sm:p-6">
      <h2 className="font-semibold">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      )}
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}
