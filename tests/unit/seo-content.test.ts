import { describe, expect, it } from "vitest";

import { articles } from "@/content/articles/meta";
import { articleBodies } from "@/content/articles/body";
import { faqs } from "@/content/faqs";
import { locationPages } from "@/content/location-pages";
import { locations } from "@/content/locations";
import { services } from "@/content/services";
import {
  getRelatedArticlesForService,
  getRelatedServicesForArticle,
} from "@/lib/related-content";

const LOCALES = ["sv", "en", "ar"] as const;

describe("office landing pages", () => {
  it("only exist for real offices, one page each", () => {
    const officeIds = new Set(locations.map((l) => l.id));
    const pageIds = locationPages.map((p) => p.locationId);
    expect(new Set(pageIds).size).toBe(pageIds.length);
    for (const id of pageIds) expect(officeIds.has(id), id).toBe(true);
  });

  it("has unique slugs and full copy in every locale", () => {
    for (const locale of LOCALES) {
      const slugs = locationPages.map((p) => p.slug[locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
    for (const page of locationPages) {
      for (const locale of LOCALES) {
        const where = `${page.locationId}.${locale}`;
        expect(page.slug[locale], where).toBeTruthy();
        expect(page.title[locale], where).toBeTruthy();
        expect(page.intro[locale], where).toBeTruthy();
        expect(page.body[locale]?.length, where).toBe(page.body.sv.length);
        for (const faq of page.faqs) {
          expect(faq.question[locale], `${faq.id}.${locale}`).toBeTruthy();
          expect(faq.answer[locale], `${faq.id}.${locale}`).toBeTruthy();
        }
      }
    }
  });

  it("keeps titles and descriptions within search-result limits", () => {
    for (const page of locationPages) {
      for (const locale of LOCALES) {
        const where = `${page.locationId}.${locale}`;
        // 44 + " | Economy Codes" stays within ~60 characters.
        expect(page.metaTitle[locale]!.length, where).toBeLessThanOrEqual(44);
        expect(
          page.metaDescription[locale]!.length,
          where,
        ).toBeGreaterThanOrEqual(70);
        expect(page.metaDescription[locale]!.length, where).toBeLessThanOrEqual(
          160,
        );
      }
    }
  });

  it("only features services that exist", () => {
    for (const page of locationPages) {
      for (const key of page.serviceKeys) {
        expect(services[key], `${page.locationId}: ${key}`).toBeDefined();
      }
    }
  });

  it("doesn't reuse FAQ ids from content/faqs.ts", () => {
    const globalIds = new Set(faqs.map((faq) => faq.id));
    for (const page of locationPages) {
      for (const faq of page.faqs) expect(globalIds.has(faq.id)).toBe(false);
    }
  });
});

describe("articles", () => {
  it("has a body in every locale for every article", () => {
    for (const article of articles) {
      const body = articleBodies[article.id];
      expect(body, article.id).toBeDefined();
      for (const locale of LOCALES) {
        expect(body[locale]?.length, `${article.id}.${locale}`).toBeGreaterThan(
          0,
        );
      }
    }
  });

  it("only references FAQ ids that exist", () => {
    const ids = new Set(faqs.map((faq) => faq.id));
    for (const article of articles) {
      for (const id of article.faqIds ?? []) {
        expect(ids.has(id), `${article.id}: ${id}`).toBe(true);
      }
    }
  });

  it("has unique slugs per locale", () => {
    for (const locale of LOCALES) {
      const slugs = articles.map((a) => a.slug[locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("related content", () => {
  it("links articles to the services their FAQs belong to", () => {
    const payroll = articles.find((a) => a.id === "payroll-sweden-employers")!;
    expect(getRelatedServicesForArticle(payroll).map((s) => s.key)).toEqual([
      "payroll",
    ]);
  });

  it("links services back to the articles that cite them", () => {
    const related = getRelatedArticlesForService(articles, "payroll");
    expect(related.map((a) => a.id)).toContain("payroll-sweden-employers");
  });

  it("gives every article at least one related service", () => {
    for (const article of articles) {
      expect(
        getRelatedServicesForArticle(article).length,
        article.id,
      ).toBeGreaterThan(0);
    }
  });
});
