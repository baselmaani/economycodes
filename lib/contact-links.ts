import { getPathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { inquiryTopics, type InquiryTopicKey } from "@/content/inquiries";

/** Id of the form block on /kontakt, so CTAs land on the form itself. */
export const CONTACT_FORM_ID = "kontaktformular";

/**
 * /kontakt link that lands on the form. `amne` is an inquiry topic's query or
 * a service key; components/forms/ContactInquiryPrefill preselects it.
 */
export function getContactHref(locale: AppLocale, amne?: string): string {
  const path = getPathname({ locale, href: "/kontakt" });
  const query = amne ? `?${new URLSearchParams({ amne })}` : "";
  return `${path}${query}#${CONTACT_FORM_ID}`;
}

/** Contact link with one of the general topics (content/inquiries.ts) preselected. */
export function getInquiryHref(
  locale: AppLocale,
  topic: InquiryTopicKey,
): string {
  return getContactHref(locale, inquiryTopics[topic].query);
}
