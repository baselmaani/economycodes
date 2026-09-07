import type { ContentBlock } from "@/content/types";

/**
 * Renders the same ContentBlock union content/services.ts bodies use
 * (heading/paragraph/list/disclaimer) as plain semantic HTML -- the
 * article page wraps this in a `prose` container, so no manual styling
 * is needed here beyond the disclaimer callout.
 */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return <Tag key={index}>{block.text}</Tag>;
          }
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "disclaimer":
            return (
              <p
                key={index}
                className="text-muted-foreground border-border not-prose mt-8 border-t pt-4 text-sm"
              >
                {block.text}
              </p>
            );
          case "image":
            return null;
          default:
            return null;
        }
      })}
    </>
  );
}
