import type { AppLocale } from "@/i18n/routing";
import type { ResolvedPage } from "@/lib/cms/resolve";
import type { SectionRegistry } from "./types";

/**
 * Renders a page's sections in the order (and with the visibility) set in
 * the dashboard. Keys without a component are skipped.
 */
export function PageSections({
  locale,
  content,
  registry,
}: {
  locale: AppLocale;
  content: ResolvedPage;
  registry: SectionRegistry;
}) {
  return content.sections.map((key) => {
    const Section = registry[key];
    return Section ? (
      <Section key={key} locale={locale} content={content} />
    ) : null;
  });
}
