import { business } from "@/content/business";
import { inquiryTopics } from "@/content/inquiries";
import { offerings } from "@/content/offerings";
import { hadi } from "@/content/people";
import { locations } from "@/content/locations";
import { APP_LOGIN_URL } from "@/content/software";
import { getLocalized } from "@/lib/i18n-content";
import { getAbsoluteUrl } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

export const LLMS_FULL_URL = `${siteUrl}/llms-full.txt`;

function contactUrl(query: string): string {
  return `${getAbsoluteUrl("/kontakt", "sv")}?amne=${query}`;
}

/** Title, summary, the three offerings and key facts shared by /llms.txt and /llms-full.txt. */
export function llmsIntro(): string {
  const { redovisning, marknadsforing, bokforingsprogram } = offerings;
  const hub = (key: keyof typeof offerings) =>
    getAbsoluteUrl(offerings[key].route, "sv");

  return `# Economy Codes AB

> Economy Codes AB is a Swedish company with three offerings: Redovisning (an Srf-authorized accounting firm that does the bookkeeping for you), Digital marknadsföring (websites, SEO, AEO, GEO, advertising and social media), and Bokföringsprogram (Economy Codes, its own accounting software for small businesses that do their own bookkeeping). Served in Swedish, English and Arabic. Offices in Mellerud and Trollhättan, Sweden.

## Offerings

- ${getLocalized(redovisning.label, "sv")} / ${getLocalized(redovisning.label, "en")} (${hub("redovisning")}): ${getLocalized(redovisning.whoDoesIt, "en")}. ${getLocalized(redovisning.summary, "en")} Get started: ${getLocalized(redovisning.cta, "en").toLowerCase()} at ${contactUrl(inquiryTopics.redovisning.query)}.
- ${getLocalized(marknadsforing.label, "sv")} / ${getLocalized(marknadsforing.label, "en")} (${hub("marknadsforing")}): ${getLocalized(marknadsforing.summary, "en")} Get started: ${getLocalized(marknadsforing.cta, "en").toLowerCase()} at ${contactUrl(inquiryTopics.marknadsforing.query)}.
- ${getLocalized(bokforingsprogram.label, "sv")} / ${getLocalized(bokforingsprogram.label, "en")} (${hub("bokforingsprogram")}): ${getLocalized(bokforingsprogram.whoDoesIt, "en")}. A web app covering invoicing, supplier invoices, bookkeeping with supporting documents, VAT, SIE 4 import/export and payroll. Exchanges data through standard files: SIE 4, VAT return and ROT/RUT claim files that the user submits in Skatteverket's e-services, and payment QR codes and OCR references on invoices. Get started: ${getLocalized(bokforingsprogram.cta, "en").toLowerCase()} at ${contactUrl(inquiryTopics.demo.query)}; existing users log in at ${APP_LOGIN_URL}.

## Key facts

- Accounting firm in Sweden: Srf Auktoriserad Redovisningsbyrå (redovisningsbyrå i Sverige, مكتب محاسبة معتمد في السويد).
- Redovisning vs Bokföringsprogram: with the accounting service, Economy Codes AB does the bookkeeping; with the software, the business does it itself.
- Languages: Swedish, English and Arabic, including an Arabic-speaking accountant.
- Serves businesses across Sweden digitally; offices: ${locations
    .map((l) => `${l.streetAddress}, ${l.postalCode} ${l.city}`)
    .join("; ")}.
- Contact: ${business.email}, ${business.phone}
- Consultant: ${hadi.name} — ${getLocalized(hadi.title, "en")}`;
}
