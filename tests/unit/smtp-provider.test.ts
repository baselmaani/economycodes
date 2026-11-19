import { beforeEach, describe, expect, it, vi } from "vitest";

import type { ContactFormValues } from "@/lib/validation/contact";

const sendMail = vi.fn();
vi.mock("nodemailer", () => ({
  default: { createTransport: vi.fn(() => ({ sendMail })) },
}));

const { createSmtpEmailProvider } = await import("@/lib/email/smtp-provider");

const payload: ContactFormValues = {
  name: "Test Testsson",
  email: "visitor@example.com",
  phone: "",
  preferredContact: "email",
  service: "",
  message: "Detta är ett testmeddelande.",
  consent: true,
  locale: "sv",
};

const provider = createSmtpEmailProvider({
  host: "send.one.com",
  user: "faktura@economycodes.com",
  pass: "secret",
  to: "bassel@economycodes.com",
});

describe("createSmtpEmailProvider", () => {
  beforeEach(() => {
    sendMail.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("sends the inquiry to the inbox, then an auto-reply to the visitor", async () => {
    sendMail.mockResolvedValue({});

    expect(await provider.send(payload)).toEqual({ ok: true });
    expect(sendMail).toHaveBeenCalledTimes(2);

    const inquiry = sendMail.mock.calls[0][0];
    expect(inquiry.to).toBe("bassel@economycodes.com");
    expect(inquiry.replyTo).toBe("visitor@example.com");
    expect(inquiry.from).toBe("Economy Codes <faktura@economycodes.com>");
    expect(inquiry.subject).toContain("Test Testsson");
    expect(inquiry.text).toContain("Detta är ett testmeddelande.");

    const autoReply = sendMail.mock.calls[1][0];
    expect(autoReply.to).toBe("visitor@example.com");
    expect(autoReply.replyTo).toBe("bassel@economycodes.com");
    expect(autoReply.subject).toContain("Tack");
  });

  it("fails without sending an auto-reply when the inquiry is not delivered", async () => {
    sendMail.mockRejectedValueOnce(new Error("535 auth failed"));

    expect(await provider.send(payload)).toEqual({ ok: false });
    expect(sendMail).toHaveBeenCalledTimes(1);
  });

  it("still succeeds when only the auto-reply fails", async () => {
    sendMail.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error("boom"));

    expect(await provider.send(payload)).toEqual({ ok: true });
  });
});
