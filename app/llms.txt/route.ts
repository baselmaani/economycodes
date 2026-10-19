import { business } from "@/content/business";
import { hadi } from "@/content/people";
import { locations } from "@/content/locations";
import { servicesList } from "@/content/services";
import { getServiceGroup } from "@/content/service-icons";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import {
  getAbsoluteUrl,
  getArticleAlternateLinks,
  getLocationAlternateLinks,
  getServiceAlternateLinks,
  locationPages,
} from "@/lib/routes";
import { getPublishedArticles, type CmsArticle } from "@/lib/cms/content";

// Regenerated hourly so articles published from the dashboard show up
// without a rebuild.
export const revalidate = 3600;

const LABELS: Record<
  AppLocale,
  {
    heading: string;
    home: string;
    services: string;
    digital: string;
    about: string;
    contact: string;
    insights: string;
    legal: string;
    privacy: string;
    cookies: string;
    terms: string;
  }
> = {
  sv: {
    heading: "Svenska",
    home: "Startsida",
    services: "Tjänster",
    digital: "Digital marknadsföring",
    about: "Om Hadi",
    contact: "Kontakt",
    insights: "Artiklar",
    legal: "Juridiskt",
    privacy: "Integritetspolicy",
    cookies: "Cookies",
    terms: "Villkor",
  },
  en: {
    heading: "English",
    home: "Home",
    services: "Services",
    digital: "Digital marketing",
    about: "About Hadi",
    contact: "Contact",
    insights: "Insights",
    legal: "Legal",
    privacy: "Privacy policy",
    cookies: "Cookies",
    terms: "Terms",
  },
  ar: {
    heading: "العربية",
    home: "الرئيسية",
    services: "الخدمات",
    digital: "التسويق الرقمي",
    about: "عن هادي",
    contact: "اتصل بنا",
    insights: "مقالات",
    legal: "قانوني",
    privacy: "سياسة الخصوصية",
    cookies: "ملفات تعريف الارتباط",
    terms: "الشروط",
  },
};

function buildLocaleSection(locale: AppLocale, articles: CmsArticle[]): string {
  const t = LABELS[locale];
  const lines: string[] = [`## ${t.heading}`, ""];

  lines.push(`- [${t.home}](${getAbsoluteUrl("/", locale)})`);

  const pushServiceLinks = (digital: boolean) => {
    for (const service of servicesList) {
      if ((getServiceGroup(service.key) === "digital") !== digital) continue;
      const name = getLocalized(service.name, locale);
      const url = getServiceAlternateLinks(service)[locale];
      const summary = getLocalized(service.summary, locale);
      lines.push(`  - [${name}](${url}): ${summary}`);
    }
  };

  lines.push(`- [${t.services}](${getAbsoluteUrl("/tjanster", locale)})`);
  pushServiceLinks(false);

  lines.push(
    `- [${t.digital}](${getAbsoluteUrl("/digital-marknadsforing", locale)})`,
  );
  pushServiceLinks(true);

  lines.push(`- [${t.about}](${getAbsoluteUrl("/om-hadi", locale)})`);
  lines.push(`- [${t.contact}](${getAbsoluteUrl("/kontakt", locale)})`);
  for (const page of locationPages) {
    const title = getLocalized(page.title, locale);
    const url = getLocationAlternateLinks(page)[locale];
    lines.push(`  - [${title}](${url}): ${getLocalized(page.intro, locale)}`);
  }

  lines.push(`- [${t.insights}](${getAbsoluteUrl("/artiklar", locale)})`);
  for (const article of articles.filter((a) => !a.seo.noindex)) {
    const title = getLocalized(article.title, locale);
    const url = getArticleAlternateLinks(article)[locale];
    lines.push(`  - [${title}](${url})`);
  }

  lines.push(`- ${t.legal}:`);
  lines.push(
    `  - [${t.privacy}](${getAbsoluteUrl("/integritetspolicy", locale)})`,
  );
  lines.push(`  - [${t.cookies}](${getAbsoluteUrl("/cookies", locale)})`);
  lines.push(`  - [${t.terms}](${getAbsoluteUrl("/villkor", locale)})`);

  return lines.join("\n");
}

export async function GET() {
  const articles = await getPublishedArticles();
  const sections = routing.locales
    .map((locale) => buildLocaleSection(locale, articles))
    .join("\n\n");

  const body = `# Economy Codes AB

> Srf-auktoriserad redovisningsbyrå / Srf-authorized accounting firm / مكتب محاسبة معتمد من Srf. Bookkeeping, payroll, tax returns, annual accounts, and business advisory for small and medium-sized businesses in Sweden, plus digital marketing: websites, SEO, AEO, GEO, Google Ads, social media advertising, SaaS/web app development, and iOS/Android mobile app development. Served in Swedish, English, and Arabic. Offices in Mellerud and Trollhättan, Sweden.

## Key facts

- Accounting firm in Sweden: Srf Auktoriserad Redovisningsbyrå (redovisningsbyrå i Sverige, مكتب محاسبة معتمد في السويد).
- Digital marketing agency in Sweden (digital marknadsföringsbyrå, وكالة تسويق رقمي في السويد): websites, SEO, AEO, GEO, Google Ads and social media.
- Languages: Swedish, English and Arabic, including an Arabic-speaking accountant.
- Serves businesses across Sweden digitally; offices: ${locations
    .map((l) => `${l.streetAddress}, ${l.postalCode} ${l.city}`)
    .join("; ")}.
- Contact: ${business.email}, ${business.phone}
- Consultant: ${hadi.name} — ${getLocalized(hadi.title, "en")}

${sections}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
