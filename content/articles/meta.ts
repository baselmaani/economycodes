import type { ArticleMeta } from "./types";

/**
 * No articles have been written/approved yet. The Insights index renders a
 * plain "coming soon" state until entries are added here -- each entry gets
 * its long-form body in content/articles/body/<locale>/<slug>.ts (see
 * app/[locale]/artiklar/[slug]/page.tsx).
 */
export const articles: ArticleMeta[] = [];
