import { describe, expect, it } from "vitest";

import { servicesList } from "@/content/services";
import { faqs } from "@/content/faqs";

describe("service content", () => {
  it("has a unique sv slug per service", () => {
    const slugs = servicesList.map((s) => s.slug.sv);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has non-empty sv copy for every required field", () => {
    for (const service of servicesList) {
      expect(service.name.sv.length).toBeGreaterThan(0);
      expect(service.summary.sv.length).toBeGreaterThan(0);
      expect(service.whoItsFor.sv.length).toBeGreaterThan(0);
      expect(service.whatsIncluded.sv.length).toBeGreaterThan(0);
      expect(service.process.sv.length).toBeGreaterThan(0);
      expect(service.whatToPrepare.sv.length).toBeGreaterThan(0);
      expect(service.body.sv.length).toBeGreaterThan(0);
    }
  });

  it("only references FAQ ids that exist", () => {
    const faqIds = new Set(faqs.map((f) => f.id));
    for (const service of servicesList) {
      for (const id of service.faqIds) {
        expect(faqIds.has(id)).toBe(true);
      }
    }
  });

  it("has every per-service FAQ scope pointing at a real service key", () => {
    const serviceKeys = new Set(servicesList.map((s) => s.key));
    for (const faq of faqs) {
      if (typeof faq.scope === "object") {
        expect(serviceKeys.has(faq.scope.serviceKey)).toBe(true);
      }
    }
  });

  it("has en and ar translations for every service field (Phase 3 complete)", () => {
    for (const service of servicesList) {
      expect(service.slug.en, `${service.key}.slug.en`).toBeTruthy();
      expect(service.slug.ar, `${service.key}.slug.ar`).toBeTruthy();
      expect(service.name.en, `${service.key}.name.en`).toBeTruthy();
      expect(service.name.ar, `${service.key}.name.ar`).toBeTruthy();
      expect(service.summary.en, `${service.key}.summary.en`).toBeTruthy();
      expect(service.summary.ar, `${service.key}.summary.ar`).toBeTruthy();
      expect(service.whoItsFor.en?.length, `${service.key}.whoItsFor.en`).toBe(
        service.whoItsFor.sv.length,
      );
      expect(service.whoItsFor.ar?.length, `${service.key}.whoItsFor.ar`).toBe(
        service.whoItsFor.sv.length,
      );
      expect(service.body.en?.length, `${service.key}.body.en`).toBe(
        service.body.sv.length,
      );
      expect(service.body.ar?.length, `${service.key}.body.ar`).toBe(
        service.body.sv.length,
      );
    }
  });

  it("has en and ar translations for every FAQ", () => {
    for (const faq of faqs) {
      expect(faq.question.en, `${faq.id}.question.en`).toBeTruthy();
      expect(faq.question.ar, `${faq.id}.question.ar`).toBeTruthy();
      expect(faq.answer.en, `${faq.id}.answer.en`).toBeTruthy();
      expect(faq.answer.ar, `${faq.id}.answer.ar`).toBeTruthy();
    }
  });

  it("has unique en and ar slugs per service (no accidental collisions)", () => {
    for (const locale of ["en", "ar"] as const) {
      const slugs = servicesList.map((s) => s.slug[locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});
