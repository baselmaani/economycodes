import type { EmailProvider } from "./provider";
import { consoleEmailProvider } from "./console-provider";
import { createResendEmailProvider } from "./resend-provider";
import { createSmtpEmailProvider } from "./smtp-provider";

/**
 * Failing provider for production deploys with no email service configured:
 * the visitor sees an error (with phone/WhatsApp alternatives) instead of a
 * success message for a submission nobody will ever read.
 */
const unconfiguredEmailProvider: EmailProvider = {
  async send() {
    console.error(
      "[contact-form] No email service configured (SMTP_* or RESEND_API_KEY, plus CONTACT_FORM_TO_EMAIL) -- submission was not delivered.",
    );
    return { ok: false };
  },
};

/**
 * Single call site for picking an email provider implementation. Uses SMTP
 * when SMTP_HOST, SMTP_USER, SMTP_PASSWORD and CONTACT_FORM_TO_EMAIL are set,
 * else Resend when RESEND_API_KEY and CONTACT_FORM_TO_EMAIL are set; otherwise logs to the
 * console in development (or when CONTACT_FORM_LOG_ONLY=1, used by the e2e
 * suite against a production build) and fails loudly in production.
 */
export function getEmailProvider(): EmailProvider {
  if (process.env.CONTACT_FORM_LOG_ONLY === "1") return consoleEmailProvider;
  const to = process.env.CONTACT_FORM_TO_EMAIL;
  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASSWORD && to) {
    return createSmtpEmailProvider({
      host: SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
      from: `Economy Codes <${SMTP_FROM || SMTP_USER}>`,
      to,
    });
  }
  const apiKey = process.env.RESEND_API_KEY;
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
