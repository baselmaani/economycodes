import { describe, expect, it } from "vitest";

import { classifyContactHref, contactEventNames } from "@/lib/analytics";

describe("classifyContactHref", () => {
  it("recognises phone, email and WhatsApp links", () => {
    expect(classifyContactHref("tel:+46734798210")).toBe("phone");
    expect(classifyContactHref("TEL:+46734798210")).toBe("phone");
    expect(classifyContactHref("mailto:info@economycodes.com")).toBe("email");
    expect(classifyContactHref("https://wa.me/46734798210")).toBe("whatsapp");
    expect(
      classifyContactHref("https://api.whatsapp.com/send?phone=46734798210"),
    ).toBe("whatsapp");
    expect(classifyContactHref("whatsapp://send?phone=46734798210")).toBe(
      "whatsapp",
    );
  });

  it("ignores other links", () => {
    expect(classifyContactHref("/kontakt")).toBeNull();
    expect(classifyContactHref("#kontakt")).toBeNull();
    expect(
      classifyContactHref("https://www.facebook.com/economycodes"),
    ).toBeNull();
    expect(classifyContactHref("https://example.com/wa.me")).toBeNull();
    expect(classifyContactHref("")).toBeNull();
  });

  it("maps every channel to a GTM event name", () => {
    expect(contactEventNames).toEqual({
      phone: "phone_click",
      whatsapp: "whatsapp_click",
      email: "email_click",
    });
  });
});
