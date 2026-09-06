"use server";

import { headers } from "next/headers";

import { contactFormSchema } from "@/lib/validation/contact";
import { getEmailProvider } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse({
    ...raw,
    consent: raw.consent === "on" || raw.consent === "true",
  });

  if (!parsed.success) {
    return { status: "error", message: "invalid" };
  }

  // Honeypot: bots that fill every field trip this. Report success without
  // actually sending, so the bot doesn't learn anything.
  if (parsed.data.company) {
    return { status: "success" };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return { status: "error", message: "rate-limited" };
  }

  const result = await getEmailProvider().send(parsed.data);
  if (!result.ok) {
    return { status: "error", message: "send-failed" };
  }

  return { status: "success" };
}
