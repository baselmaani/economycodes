import { services } from "@/content/services";
import { findInquiryTopicByValue } from "@/content/inquiries";
import { getLocalized } from "@/lib/i18n-content";
import type { ContactFormValues } from "@/lib/validation/contact";

const PREFERRED_CONTACT_LABELS = { email: "E-post", phone: "Telefon" } as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Builds the inquiry email that lands in the inbox, shared by every email
 * provider so they all deliver the same message.
 */
export function buildInquiryEmail(payload: ContactFormValues): {
  subject: string;
  text: string;
  html: string;
} {
  const topic = findInquiryTopicByValue(payload.service);
  const service = payload.service ? services[payload.service] : undefined;
  const rows: [string, string | undefined][] = [
    ["Namn", payload.name],
    ["E-post", payload.email],
    ["Telefon", payload.phone],
    [
      "Föredraget kontaktsätt",
      PREFERRED_CONTACT_LABELS[payload.preferredContact],
    ],
    [
      "Tjänst",
      topic
        ? topic.email.label
        : service
          ? getLocalized(service.name, "sv")
          : undefined,
    ],
    ["Språk", payload.locale],
  ];
  const details = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return {
    subject: topic
      ? `${topic.email.subject}: ${payload.name}`
      : `Ny förfrågan via webbplatsen: ${payload.name}`,
    text: `${details}\n\n${payload.message}`,
    html: `<pre style="font-family:inherit">${escapeHtml(details)}</pre><p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>`,
  };
}
