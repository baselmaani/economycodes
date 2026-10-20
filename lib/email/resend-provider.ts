import { services } from "@/content/services";
import { getLocalized } from "@/lib/i18n-content";

import { buildAutoReply } from "./auto-reply";
import type { EmailProvider } from "./provider";

const PREFERRED_CONTACT_LABELS = { email: "E-post", phone: "Telefon" } as const;

const SERVICE_FROM = "Economy Codes <kontakt@economycodes.com>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
      const service = payload.service ? services[payload.service] : undefined;
      const rows: [string, string | undefined][] = [
        ["Namn", payload.name],
        ["E-post", payload.email],
        ["Telefon", payload.phone],
        [
          "Föredraget kontaktsätt",
          PREFERRED_CONTACT_LABELS[payload.preferredContact],
        ],
        ["Tjänst", service ? getLocalized(service.name, "sv") : undefined],
        ["Språk", payload.locale],
      ];
      const details = rows
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");

      const delivered = await sendEmail("email", {
        from,
        to: [to],
        reply_to: payload.email,
        subject: `Ny förfrågan via webbplatsen: ${payload.name}`,
        text: `${details}\n\n${payload.message}`,
        html: `<pre style="font-family:inherit">${escapeHtml(details)}</pre><p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>`,
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
