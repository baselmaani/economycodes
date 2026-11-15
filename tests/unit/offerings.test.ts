import { describe, expect, it } from "vitest";

import { getPageDef } from "@/lib/cms/pages";
import { getServiceOptions } from "@/lib/service-lookup";
import { contactFormSchema } from "@/lib/validation/contact";
import { ACCOUNTING_HUB_FAQ_IDS } from "@/content/accounting";
import { faqs } from "@/content/faqs";
import { inquiryTopicList, inquiryTopics } from "@/content/inquiries";
import { offeringList } from "@/content/offerings";
import { services, servicesList } from "@/content/services";
import {
  isDevelopmentService,
  isDigitalService,
} from "@/content/service-icons";

const LOCALES = ["sv", "en", "ar"] as const;

const validSubmission = {
  name: "Test Testsson",
  email: "test@example.com",
  phone: "",
  preferredContact: "email",
  message: "Detta är ett testmeddelande.",
  consent: true,
  locale: "sv",
};

describe("offerings", () => {
  it("lists Redovisning, Digital marknadsföring, Bokföringsprogram and Systemutveckling in that order", () => {
    // Systemutveckling is last so saved, position-matched homepage cards
    // keep their offering.
    expect(offeringList.map((o) => o.route)).toEqual([
      "/tjanster",
      "/digital-marknadsforing",
      "/bokforingsprogram",
      "/systemutveckling",
    ]);
  });

  it("has every label, tagline, summary and CTA in all three languages", () => {
    for (const offering of offeringList) {
      for (const field of [
        "label",
        "navLabel",
        "whoDoesIt",
        "summary",
        "cta",
      ] as const) {
        for (const locale of LOCALES) {
          expect(
            offering[field][locale],
            `${offering.key}.${field}.${locale}`,
          ).toBeTruthy();
        }
      }
    }
  });

  it("tells accounting and software apart by who does the bookkeeping", () => {
    const [accounting, , software] = offeringList;
    expect(accounting.whoDoesIt.sv).toMatch(/åt dig/);
    expect(software.whoDoesIt.sv).toMatch(/själv/);
  });

  it("has one homepage chooser card per offering", () => {
    const areas = getPageDef("home")!.collections.find(
      (c) => c.key === "areas",
    )!;
    expect(areas.default).toHaveLength(offeringList.length);
    areas.default.forEach((item, index) => {
      expect(item.title.sv).toBe(offeringList[index].label.sv);
    });
  });
});

describe("contact topics", () => {
  it("never reuse a service key", () => {
    for (const topic of inquiryTopicList) {
      expect(Object.hasOwn(services, topic.value), topic.value).toBe(false);
    }
  });

  it("are accepted by the contact form", () => {
    for (const topic of inquiryTopicList) {
      expect(
        contactFormSchema.safeParse({
          ...validSubmission,
          service: topic.value,
        }).success,
        topic.value,
      ).toBe(true);
    }
  });

  it("group the dropdown by offering, each starting with its general topic", () => {
    for (const locale of LOCALES) {
      const groups = getServiceOptions(locale);
      expect(groups.map((g) => g.label)).toEqual(
        offeringList.map((o) => o.label[locale]),
      );
      groups.forEach((group, index) => {
        expect(group.options[0].key).toBe(
          inquiryTopics[offeringList[index].inquiry].value,
        );
      });
      const serviceKeys = groups
        .flatMap((g) => g.options.slice(1))
        .map((o) => o.key);
      expect(serviceKeys.sort()).toEqual(servicesList.map((s) => s.key).sort());
    }
  });

  it("puts marketing and development services only in their own groups", () => {
    const [accounting, marketing, software, development] =
      getServiceOptions("sv");
    const accountingKeys = accounting.options.slice(1).map((o) => o.key);
    expect(
      accountingKeys.every(
        (key) => !isDigitalService(key) && !isDevelopmentService(key),
      ),
    ).toBe(true);
    expect(
      marketing.options.slice(1).every((o) => isDigitalService(o.key)),
    ).toBe(true);
    expect(software.options).toHaveLength(1);
    expect(
      development.options
        .slice(1)
        .map((o) => o.key)
        .sort(),
    ).toEqual([
      "custom-system-development",
      "mobile-app-development",
      "saas-development",
      "ui-ux-design",
    ]);
  });
});

describe("Redovisning hub", () => {
  it("only shows FAQs that exist", () => {
    for (const id of ACCOUNTING_HUB_FAQ_IDS) {
      expect(
        faqs.some((faq) => faq.id === id),
        id,
      ).toBe(true);
    }
  });

  it("targets redovisningsbyrå in its Swedish title and H1", () => {
    const def = getPageDef("tjanster")!;
    expect(def.seo!.title.sv.toLowerCase()).toContain("redovisningsbyrå");
    const heading = def.text.find((f) => f.key === "heading")!;
    expect(heading.default.sv.toLowerCase()).toContain("redovisningsbyrå");
  });
});
