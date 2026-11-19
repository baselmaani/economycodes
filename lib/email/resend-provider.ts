import { buildAutoReply } from "./auto-reply";
import { buildInquiryEmail } from "./inquiry-message";
import type { EmailProvider } from "./provider";

const SERVICE_FROM = "Economy Codes <kontakt@economycodes.com>";

/**
 * Sends contact-form submissions through Resend's REST API (plain fetch, no
 * SDK). The visitor's address goes in `reply_to` so replying from the inbox
 * answers them directly. Once that is delivered, the visitor gets an
 * auto-reply in their locale, with `reply_to` pointing back at the inbox.
 * CONTACT_FORM_FROM_EMAIL must be on a domain verified in Resend.
 */
export function createResendEmailProvider({
  apiKey,
  to,
  from = SERVICE_FROM,
}: {
  apiKey: string;
  to: string;
  from?: string;
}): EmailProvider {
  async function sendEmail(
    label: string,
    body: Record<string, unknown>,
  ): Promise<boolean> {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        console.error(
          `[contact-form] Resend rejected the ${label}:`,
          response.status,
          await response.text(),
        );
      }
      return response.ok;
    } catch (error) {
      console.error(
        `[contact-form] Resend request for the ${label} failed:`,
        error,
      );
      return false;
    }
  }

  return {
    async send(payload) {
      const delivered = await sendEmail("email", {
        from,
        to: [to],
        reply_to: payload.email,
        ...buildInquiryEmail(payload),
      });
      if (!delivered) return { ok: false };

      // The inquiry already reached the inbox, so a failed auto-reply is only
      // logged -- the visitor still sees a success message.
      await sendEmail("auto-reply", {
        from,
        to: [payload.email],
        reply_to: to,
        ...buildAutoReply(payload.locale),
      });

      return { ok: true };
    },
  };
}
