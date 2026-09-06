import { describe, expect, it } from "vitest";

import { resolveServiceBySlug } from "@/lib/service-lookup";
import { servicesList } from "@/content/services";

describe("resolveServiceBySlug", () => {
  it("round-trips every service's sv slug", () => {
    for (const service of servicesList) {
      const resolved = resolveServiceBySlug("sv", service.slug.sv);
      expect(resolved?.key).toBe(service.key);
    }
  });

  it("returns undefined for an unknown slug", () => {
    expect(resolveServiceBySlug("sv", "not-a-real-slug")).toBeUndefined();
  });

  it("round-trips every service's ar slug", () => {
    for (const service of servicesList) {
      const resolved = resolveServiceBySlug("ar", service.slug.ar!);
      expect(resolved?.key).toBe(service.key);
    }
  });

  it("resolves a still-percent-encoded ar slug (regression: Next 16 + Turbopack does not always URL-decode non-ASCII dynamic segments before handing them to page params)", () => {
    for (const service of servicesList) {
      const encoded = encodeURIComponent(service.slug.ar!);
      const resolved = resolveServiceBySlug("ar", encoded);
      expect(resolved?.key).toBe(service.key);
    }
  });
});
