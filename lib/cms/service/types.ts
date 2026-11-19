/**
 * Marks public cache tags (CMS_TAGS in lib/cms/content.ts) as stale after a
 * write. Server actions pass `updateTag`; route handlers (the MCP endpoint)
 * pass `revalidateTag(tag, { expire: 0 })`, since updateTag is only allowed
 * inside Server Actions.
 */
export type Invalidate = (tags: string[]) => void;
