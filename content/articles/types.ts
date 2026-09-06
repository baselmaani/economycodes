import type { Localized, MediaRef } from "@/content/types";

export interface ArticleMeta {
  id: string;
  slug: Localized<string>;
  title: Localized<string>;
  excerpt: Localized<string>;
  publishedAt: string;
  authorId: "hadi-almaani";
  coverImage: MediaRef;
}
