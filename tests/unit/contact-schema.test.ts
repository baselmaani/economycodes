import { describe, expect, it } from "vitest";

import { contactFormSchema } from "@/lib/validation/contact";
import { servicesList } from "@/content/services";

const valid = {
  name: "Test Testsson",
  email: "test@example.com",
  phone: "",
  preferredContact: "email",
  service: "",
  message: "Detta är ett testmeddelande.",
  consent: true,
  locale: "sv",
};

function issuePaths(input: Record<string, unknown>) {
  const result = contactFormSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((i) => i.path[0]);
}

describe("contactFormSchema", () => {
  it("accepts a minimal valid submission", () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts every known service key", () => {
    for (const service of servicesList) {
      expect(
        contactFormSchema.safeParse({ ...valid, service: service.key }).success,
      ).toBe(true);
    }
  });

  it("rejects an unknown service key", () => {
    expect(issuePaths({ ...valid, service: "not-a-service" })).toEqual([
      "service",
    ]);
    expect(issuePaths({ ...valid, service: "constructor" })).toEqual([
      "service",
    ]);
  });

  it("requires a phone number when phone is the preferred contact method", () => {
    const result = contactFormSchema.safeParse({
      ...valid,
      preferredContact: "phone",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([
      expect.objectContaining({ path: ["phone"], message: "phone-required" }),
    ]);
  });

  it("accepts common phone formats", () => {
    for (const phone of [
      "+46 73 479 82 10",
      "073-479 82 10",
      "(073) 4798210",
    ]) {
      expect(
        contactFormSchema.safeParse({
          ...valid,
          phone,
          preferredContact: "phone",
        }).success,
      ).toBe(true);
    }
  });

  it("rejects a phone value that isn't a number", () => {
    expect(issuePaths({ ...valid, phone: "call me maybe" })).toEqual(["phone"]);
  });

  it("rejects a message that is too short once trimmed", () => {
    expect(issuePaths({ ...valid, message: "         x" })).toEqual([
      "message",
    ]);
  });

  it("requires consent", () => {
    expect(issuePaths({ ...valid, consent: false })).toEqual(["consent"]);
  });
});
