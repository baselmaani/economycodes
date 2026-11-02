import { business } from "@/content/business";
import { hadi } from "@/content/people";
import { locations } from "@/content/locations";
import { getLocalized } from "@/lib/i18n-content";
import { siteUrl } from "@/lib/site";

export const LLMS_FULL_URL = `${siteUrl}/llms-full.txt`;

/** Title, summary and key facts shared by /llms.txt and /llms-full.txt. */
export function llmsIntro(): string {
  return `# Economy Codes AB

> Srf-auktoriserad redovisningsbyrå / Srf-authorized accounting firm / مكتب محاسبة معتمد من Srf. Bookkeeping, payroll, tax returns, annual accounts, and business advisory for small and medium-sized businesses in Sweden, plus digital marketing: websites, SEO, AEO, GEO, Google Ads, social media advertising, UI/UX design, custom software and system development, SaaS/MVP development, and iOS/Android mobile app development. Served in Swedish, English, and Arabic. Offices in Mellerud and Trollhättan, Sweden.

## Key facts

- Accounting firm in Sweden: Srf Auktoriserad Redovisningsbyrå (redovisningsbyrå i Sverige, مكتب محاسبة معتمد في السويد).
- Digital marketing agency in Sweden (digital marknadsföringsbyrå, وكالة تسويق رقمي في السويد): web design, UI/UX design, custom system development (systemutveckling), SaaS development, SEO, AEO, GEO, Google Ads and social media.
- Languages: Swedish, English and Arabic, including an Arabic-speaking accountant.
- Serves businesses across Sweden digitally; offices: ${locations
    .map((l) => `${l.streetAddress}, ${l.postalCode} ${l.city}`)
    .join("; ")}.
- Contact: ${business.email}, ${business.phone}
- Consultant: ${hadi.name} — ${getLocalized(hadi.title, "en")}`;
}
