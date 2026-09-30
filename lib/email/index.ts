import type { EmailProvider } from "./provider";
import { consoleEmailProvider } from "./console-provider";
import { createResendEmailProvider } from "./resend-provider";

/**
 * Failing provider for production deploys with no email service configured:
 * the visitor sees an error (with phone/WhatsApp alternatives) instead of a
 * success message for a submission nobody will ever read.
 */
const unconfiguredEmailProvider: EmailProvider = {
  async send() {
    console.error(
      "[contact-form] RESEND_API_KEY / CONTACT_FORM_TO_EMAIL are not set -- submission was not delivered.",
    );
    return { ok: false };
  },
};

/**
 * Single call site for picking an email provider implementation. Uses Resend
 * when RESEND_API_KEY and CONTACT_FORM_TO_EMAIL are set; otherwise logs to the
 * console in development (or when CONTACT_FORM_LOG_ONLY=1, used by the e2e
 * suite against a production build) and fails loudly in production.
 */
export function getEmailProvider(): EmailProvider {
  if (process.env.CONTACT_FORM_LOG_ONLY === "1") return consoleEmailProvider;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO_EMAIL;
  if (apiKey && to) {
    return createResendEmailProvider({
      apiKey,
      to,
      from: process.env.CONTACT_FORM_FROM_EMAIL || undefined,
    });
  }
  return process.env.NODE_ENV === "production"
    ? unconfiguredEmailProvider
    : consoleEmailProvider;
}
