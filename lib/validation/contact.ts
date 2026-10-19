import { z } from "zod";

import { services } from "@/content/services";

// Loose on purpose: digits, spaces, +, (), dots and dashes. Swedish and
// international numbers are written in too many ways to be stricter.
const PHONE_PATTERN = /^[+\d\s().-]{6,50}$/;

export const contactFormSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    email: z.email(),
    phone: z.string().trim().regex(PHONE_PATTERN).optional().or(z.literal("")),
    preferredContact: z.enum(["email", "phone"]).default("email"),
    service: z
      .string()
      .trim()
      .refine((key) => key === "" || Object.hasOwn(services, key))
      .optional(),
    message: z.string().trim().min(10).max(5000),
    consent: z.literal(true),
    locale: z.enum(["sv", "en", "ar"]),
    // Honeypot: real users never see or fill this field. Deliberately not
    // constrained to empty here -- the server action checks it after
    // validation and silently reports success for a filled value, so a bot
    // never learns its submission was rejected. Constraining it here instead
    // would make that submission fail validation with a normal error, which
    // defeats the point of a honeypot.
    company: z.string().max(200).optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.preferredContact === "phone" && !data.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "phone-required",
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;

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
