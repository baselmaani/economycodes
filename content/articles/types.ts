import type { Localized, MediaRef } from "@/content/types";

export interface ArticleMeta {
  id: string;
  slug: Localized<string>;
  title: Localized<string>;
  excerpt: Localized<string>;
  publishedAt: string;
  /** Set when an article's content is materially edited after publishing; defaults to publishedAt. */
  updatedAt?: string;
  authorId: "hadi-almaani";
  coverImage: MediaRef;
  /** FAQ ids (from content/faqs.ts) to surface as a "Related questions" section. */
  faqIds?: string[];
}
