import type { ContactFormValues } from "@/lib/validation/contact";

export interface EmailSendResult {
  ok: boolean;
}

export interface EmailProvider {
  send(payload: ContactFormValues): Promise<EmailSendResult>;
}
