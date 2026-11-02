import type { ComponentType } from "react";

import type { AppLocale } from "@/i18n/routing";
import type { ResolvedPage } from "@/lib/cms/resolve";

/** Every page section gets the locale and its page's resolved CMS content. */
export interface SectionProps {
  locale: AppLocale;
  content: ResolvedPage;
}

/** Section key (as in the page's CMS def) → the component that renders it. */
export type SectionRegistry = Record<string, ComponentType<SectionProps>>;
