/**
 * Contact form field names and error codes, kept free of zod so the client
 * form can import them without pulling the schema library into its bundle.
 */

/** Visitor-facing fields that can carry a validation error. */
export const contactFields = [
  "name",
  "email",
  "phone",
  "preferredContact",
  "service",
  "message",
  "consent",
] as const;

export type ContactField = (typeof contactFields)[number];

/**
 * Per-field error codes the form translates. "phoneRequired" is split from
 * "invalid" so the phone field can say *why* it needs a value.
 */
export type ContactFieldError = "invalid" | "phoneRequired";
