import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email(),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  preferredContact: z.enum(["email", "phone"]).default("email"),
  service: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true, {
    error: "Samtycke krävs för att vi ska kunna behandla din förfrågan.",
  }),
  locale: z.enum(["sv", "en", "ar"]),
  // Honeypot: real users never see or fill this field. Deliberately not
  // constrained to empty here -- the server action checks it after
  // validation and silently reports success for a filled value, so a bot
  // never learns its submission was rejected. Constraining it here instead
  // would make that submission fail validation with a normal error, which
  // defeats the point of a honeypot.
  company: z.string().max(200).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
