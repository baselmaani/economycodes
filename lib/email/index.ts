import type { EmailProvider } from "./provider";
import { consoleEmailProvider } from "./console-provider";

/**
 * Single call site for picking an email provider implementation. Add a real
 * adapter (e.g. Resend, Postmark) here once the client confirms which
 * service/inbox should receive contact-form submissions -- see
 * CLIENT-TODO.md item 15. Until then this always resolves to a provider that
 * logs and returns ok:true, so the form's UI and tests work correctly.
 */
export function getEmailProvider(): EmailProvider {
  return consoleEmailProvider;
}
