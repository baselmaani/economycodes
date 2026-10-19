"use server";

import { headers } from "next/headers";

import {
  contactFields,
  contactFormSchema,
  type ContactField,
  type ContactFieldError,
} from "@/lib/validation/contact";
import { getEmailProvider } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export type ContactFormError = "invalid" | "rate-limited" | "send-failed";

/** Fields echoed back on error so the form can restore what the visitor typed. */
export type ContactFormValuesEcho = Partial<
  Record<
    "name" | "email" | "phone" | "preferredContact" | "service" | "message",
    string
  >
> & { consent?: boolean };

export type ContactFieldErrors = Partial<
  Record<ContactField, ContactFieldError>
>;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message?: ContactFormError;
  /** Which fields failed validation, so the form can point at each one. */
  fieldErrors?: ContactFieldErrors;
  values?: ContactFormValuesEcho;
  /** Increments on every submission so the form remounts with `values` as its defaults. */
  submission?: number;
}

function echoValues(formData: FormData): ContactFormValuesEcho {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : undefined;
  };
  return {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    preferredContact: text("preferredContact"),
    service: text("service"),
    message: text("message"),
    consent: formData.get("consent") === "on",
  };
}

function isContactField(key: PropertyKey | undefined): key is ContactField {
  return (contactFields as readonly PropertyKey[]).includes(key as PropertyKey);
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const submission = (prevState.submission ?? 0) + 1;
  const fail = (
    message: ContactFormError,
    fieldErrors?: ContactFieldErrors,
  ): ContactFormState => ({
    status: "error",
    message,
    fieldErrors,
    values: echoValues(formData),
    submission,
  });

  const raw = Object.fromEntries(formData.entries());
  const parsed = contactFormSchema.safeParse({
    ...raw,
    consent: raw.consent === "on" || raw.consent === "true",
  });

  if (!parsed.success) {
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (isContactField(field) && !fieldErrors[field]) {
        fieldErrors[field] =
          issue.message === "phone-required" ? "phoneRequired" : "invalid";
      }
    }
    return fail("invalid", fieldErrors);
  }

  // Honeypot: bots that fill every field trip this. Report success without
  // actually sending, so the bot doesn't learn anything.
  if (parsed.data.company) {
    return { status: "success", submission };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return fail("rate-limited");
  }

  const result = await getEmailProvider().send(parsed.data);
  if (!result.ok) {
    return fail("send-failed");
  }

  return { status: "success", submission };
}
