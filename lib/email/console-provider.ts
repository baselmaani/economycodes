import { buildAutoReply } from "./auto-reply";
import type { EmailProvider } from "./provider";

/**
 * Development-only fallback used when no email provider is configured (see
 * getEmailProvider() in index.ts). Logs the submission server-side and
 * reports success so the UI/tests behave correctly ahead of the client's
 * decision on which provider to use -- see CLIENT-TODO.md item 15.
 */
export const consoleEmailProvider: EmailProvider = {
  async send(payload) {
    console.info("[contact-form] No email provider configured. Submission:", {
      ...payload,
      message: payload.message.slice(0, 200),
    });
    console.info("[contact-form] Auto-reply that would be sent:", {
      to: payload.email,
      subject: buildAutoReply(payload.locale).subject,
    });
    return { ok: true };
  },
};
