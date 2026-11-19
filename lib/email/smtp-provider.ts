import nodemailer, { type SendMailOptions } from "nodemailer";

import { buildAutoReply } from "./auto-reply";
import { buildInquiryEmail } from "./inquiry-message";
import type { EmailProvider } from "./provider";

/**
 * Sends contact-form submissions over SMTP (one.com: send.one.com:587 with
 * STARTTLS). The sender must be the authenticated mailbox, so `from` defaults
 * to the SMTP user. The visitor's address goes in `replyTo` so replying from
 * the inbox answers them directly; once the inquiry is delivered, the visitor
 * gets an auto-reply in their locale, with `replyTo` pointing back at the inbox.
 */
export function createSmtpEmailProvider({
  host,
  port = 587,
  secure = false,
  user,
  pass,
  from = `Economy Codes <${user}>`,
  to,
}: {
  host: string;
  port?: number;
  secure?: boolean;
  user: string;
  pass: string;
  from?: string;
  to: string;
}): EmailProvider {
  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  async function sendEmail(
    label: string,
    message: SendMailOptions,
  ): Promise<boolean> {
    try {
      await transport.sendMail({ from, ...message });
      return true;
    } catch (error) {
      console.error(
        `[contact-form] SMTP delivery of the ${label} failed:`,
        error,
      );
      return false;
    }
  }

  return {
    async send(payload) {
      const delivered = await sendEmail("email", {
        to,
        replyTo: payload.email,
        ...buildInquiryEmail(payload),
      });
      if (!delivered) return { ok: false };

      // The inquiry already reached the inbox, so a failed auto-reply is only
      // logged -- the visitor still sees a success message.
      await sendEmail("auto-reply", {
        to: payload.email,
        replyTo: to,
        ...buildAutoReply(payload.locale),
      });

      return { ok: true };
    },
  };
}
