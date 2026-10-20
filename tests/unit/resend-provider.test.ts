import { afterEach, describe, expect, it, vi } from "vitest";

import { createResendEmailProvider } from "@/lib/email/resend-provider";
import type { ContactFormValues } from "@/lib/validation/contact";

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

const provider = createResendEmailProvider({
  apiKey: "test-key",
  to: "info@economycodes.com",
  from: "Economy Codes <kontakt@economycodes.com>",
});

function mockFetch(...statuses: number[]) {
  const fetchMock = vi.fn();
  for (const status of statuses) {
    fetchMock.mockResolvedValueOnce(new Response("{}", { status }));
  }
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentBody(fetchMock: ReturnType<typeof vi.fn>, call: number) {
  return JSON.parse(fetchMock.mock.calls[call][1].body as string);
}

describe("createResendEmailProvider", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("sends the inquiry to the inbox, then an auto-reply to the visitor", async () => {
    const fetchMock = mockFetch(200, 200);

    expect(await provider.send(payload)).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const inquiry = sentBody(fetchMock, 0);
    expect(inquiry.to).toEqual(["info@economycodes.com"]);
    expect(inquiry.reply_to).toBe("visitor@example.com");

    const autoReply = sentBody(fetchMock, 1);
    expect(autoReply.to).toEqual(["visitor@example.com"]);
    expect(autoReply.reply_to).toBe("info@economycodes.com");
    expect(autoReply.from).toBe("Economy Codes <kontakt@economycodes.com>");
    expect(autoReply.subject).toContain("Tack");
  });

  it("does not echo the visitor's input in the auto-reply", async () => {
    const fetchMock = mockFetch(200, 200);
    await provider.send(payload);

    const autoReply = JSON.stringify(sentBody(fetchMock, 1));
    expect(autoReply).not.toContain(payload.name);
    expect(autoReply).not.toContain(payload.message);
  });

  it("skips the auto-reply and fails when the inquiry is rejected", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = mockFetch(422);

    expect(await provider.send(payload)).toEqual({ ok: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("still succeeds when only the auto-reply fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch(200, 500);

    expect(await provider.send(payload)).toEqual({ ok: true });
  });

  it("writes the auto-reply in the visitor's locale", async () => {
    const fetchMock = mockFetch(200, 200, 200, 200);
    await provider.send({ ...payload, locale: "en" });
    await provider.send({ ...payload, locale: "ar" });

    expect(sentBody(fetchMock, 1).subject).toContain("Thank you");
    const arabic = sentBody(fetchMock, 3);
    expect(arabic.subject).toContain("شكراً");
    expect(arabic.html).toContain('dir="rtl"');
  });
});
