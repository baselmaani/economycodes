import { describe, expect, it } from "vitest";

import { articles } from "@/content/articles/meta";
import { articleBodies } from "@/content/articles/body";
import {
  ARTICLE_TEMPLATE,
  articlePath,
  cleanArticleJson,
  slugify,
  toArticleInput,
} from "@/lib/cms/article-json";
import {
  articleImportSchema,
  articleInputSchema,
  formatIssues,
} from "@/lib/cms/schemas";

function issuesFor(input: unknown): string[] {
  const result = articleInputSchema.safeParse(cleanArticleJson(input));
  return result.success ? [] : formatIssues(result.error);
}

describe("article JSON schema", () => {
  it("accepts the downloadable template", () => {
    expect(issuesFor(ARTICLE_TEMPLATE)).toEqual([]);
  });

  it("accepts every existing article (so cms:seed can't fail)", () => {
    for (const meta of articles) {
      const input = toArticleInput({
        ...meta,
        status: "published",
        body: articleBodies[meta.id],
        seo: {},
      });
      expect(issuesFor(input), meta.id).toEqual([]);
    }
  });

  it("accepts an array of articles", () => {
    expect(
      articleImportSchema.safeParse([ARTICLE_TEMPLATE, ARTICLE_TEMPLATE])
        .success,
    ).toBe(true);
  });

  it("defaults status to draft and seo/faqIds to empty", () => {
    const minimal: Record<string, unknown> = { ...ARTICLE_TEMPLATE };
    delete minimal.status;
    delete minimal.seo;
    delete minimal.faqIds;
    const parsed = articleInputSchema.parse(minimal);
    expect(parsed.status).toBe("draft");
    expect(parsed.seo).toEqual({});
    expect(parsed.faqIds).toEqual([]);
  });

  it("reports missing Swedish fields with their path", () => {
    const issues = issuesFor({
      ...ARTICLE_TEMPLATE,
      title: { en: "Only English" },
    });
    expect(issues).toContainEqual(expect.stringMatching(/^title\.sv: /));
  });

  it("rejects unknown block types and bad dates", () => {
    const issues = issuesFor({
      ...ARTICLE_TEMPLATE,
      publishedAt: "14/10/2026",
      body: { sv: [{ type: "video", src: "x" }] },
    });
    expect(issues.some((issue) => issue.startsWith("publishedAt"))).toBe(true);
    expect(issues.some((issue) => issue.startsWith("body.sv.0"))).toBe(true);
  });

  it("rejects slugs with spaces or capitals and non-https image URLs", () => {
    const issues = issuesFor({
      ...ARTICLE_TEMPLATE,
      slug: { sv: "Min Artikel" },
      coverImage: {
        ...ARTICLE_TEMPLATE.coverImage,
        src: "http://x.test/a.jpg",
      },
    });
    expect(issues.some((issue) => issue.startsWith("slug.sv"))).toBe(true);
    expect(issues.some((issue) => issue.startsWith("coverImage.src"))).toBe(
      true,
    );
  });

  it("treats empty en/ar translations as untranslated", () => {
    const issues = issuesFor({
      ...ARTICLE_TEMPLATE,
      title: { ...ARTICLE_TEMPLATE.title, ar: "  " },
      body: { ...ARTICLE_TEMPLATE.body, ar: [] },
    });
    expect(issues).toEqual([]);
  });
});

describe("article helpers", () => {
  it("slugifies Swedish titles and keeps Arabic letters", () => {
    expect(slugify("Hur bokför jag moms? (2026)")).toBe(
      "hur-bokfor-jag-moms-2026",
    );
    expect(slugify("دليل الضرائب")).toBe("دليل-الضرائب");
  });

  it("builds localized public paths", () => {
    expect(articlePath("sv", "a")).toBe("/artiklar/a");
    expect(articlePath("en", "a")).toBe("/en/insights/a");
    expect(articlePath("ar", "a")).toBe("/ar/مقالات/a");
  });
});
