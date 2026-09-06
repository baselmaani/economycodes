import { business } from "@/content/business";
import { articles } from "@/content/articles/meta";
import { hadi } from "@/content/people";
import { servicesList } from "@/content/services";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import {
  getAbsoluteUrl,
  getArticleAlternateLinks,
  getServiceAlternateLinks,
} from "@/lib/routes";

export const dynamic = "force-static";

const LABELS: Record<
  AppLocale,
  {
    heading: string;
    home: string;
    services: string;
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
    about: "عن هادي",
    contact: "اتصل بنا",
    insights: "مقالات",
    legal: "قانوني",
    privacy: "سياسة الخصوصية",
    cookies: "ملفات تعريف الارتباط",
    terms: "الشروط",
  },
};

function buildLocaleSection(locale: AppLocale): string {
  const t = LABELS[locale];
  const lines: string[] = [`## ${t.heading}`, ""];

  lines.push(`- [${t.home}](${getAbsoluteUrl("/", locale)})`);

  lines.push(`- [${t.services}](${getAbsoluteUrl("/tjanster", locale)})`);
  for (const service of servicesList) {
    const name = getLocalized(service.name, locale);
    const url = getServiceAlternateLinks(service)[locale];
    lines.push(`  - [${name}](${url})`);
  }

  lines.push(`- [${t.about}](${getAbsoluteUrl("/om-hadi", locale)})`);
  lines.push(`- [${t.contact}](${getAbsoluteUrl("/kontakt", locale)})`);

  lines.push(`- [${t.insights}](${getAbsoluteUrl("/artiklar", locale)})`);
  for (const article of articles) {
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

export function GET() {
  const sections = routing.locales.map(buildLocaleSection).join("\n\n");

  const body = `# Economy Codes AB

> Srf-auktoriserad redovisningsbyrå / Srf-authorized accounting firm / مكتب محاسبة معتمد من Srf. Bookkeeping, payroll, tax returns, annual accounts, and business advisory for small and medium-sized businesses in Sweden, served in Swedish, English, and Arabic. Offices in Mellerud and Trollhättan, Sweden.

Contact: ${business.email}, ${business.phone}
Consultant: ${hadi.name} — ${getLocalized(hadi.title, "en")}

${sections}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
