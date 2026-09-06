import type { Locale, Localized } from "@/content/types";

/** Resolves a Localized<T> value for a locale, falling back to Swedish when the translation is missing. */
export function getLocalized<T>(value: Localized<T>, locale: Locale): T {
  if (locale === "sv") return value.sv;
  return value[locale] ?? value.sv;
}
