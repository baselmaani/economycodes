import type { EmailProvider } from "./provider";

/**
 * Default fallback used whenever no real email provider is configured (see
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
    return { ok: true };
  },
};
