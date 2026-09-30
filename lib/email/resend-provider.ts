import type { EmailProvider } from "./provider";

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
 * answers them directly. CONTACT_FORM_FROM_EMAIL must be on a domain
 * verified in Resend.
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
  return {
    async send(payload) {
      const rows: [string, string | undefined][] = [
        ["Namn", payload.name],
        ["E-post", payload.email],
        ["Telefon", payload.phone],
        ["Föredraget kontaktsätt", payload.preferredContact],
        ["Tjänst", payload.service],
        ["Språk", payload.locale],
      ];
      const details = rows
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");

      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [to],
            reply_to: payload.email,
            subject: `Ny förfrågan via webbplatsen: ${payload.name}`,
            text: `${details}\n\n${payload.message}`,
            html: `<pre style="font-family:inherit">${escapeHtml(details)}</pre><p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>`,
          }),
        });
        if (!response.ok) {
          console.error(
            "[contact-form] Resend rejected the email:",
            response.status,
            await response.text(),
          );
        }
        return { ok: response.ok };
      } catch (error) {
        console.error("[contact-form] Resend request failed:", error);
        return { ok: false };
      }
    },
  };
}
