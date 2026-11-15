import {
  getServiceOffering,
  type ServiceOfferingKey,
} from "@/content/service-icons";
import { offerings } from "@/content/offerings";
import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import {
  getAbsoluteUrl,
  getArticleAlternateLinks,
  getLocationAlternateLinks,
  getServiceAlternateLinks,
  locationPages,
  servicesList,
} from "@/lib/routes";
import { getPublishedArticles, type CmsArticle } from "@/lib/cms/content";
import { LLMS_FULL_URL, llmsIntro } from "@/lib/llms";
import { liveSoftwarePages } from "@/content/software";

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
    services: "Redovisning",
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
    services: "Accounting",
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
    services: "المحاسبة",
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

  const pushServiceLinks = (offering: ServiceOfferingKey) => {
    for (const service of servicesList) {
      if (getServiceOffering(service.key) !== offering) continue;
      const name = getLocalized(service.name, locale);
      const url = getServiceAlternateLinks(service)[locale];
      const summary = getLocalized(service.summary, locale);
      lines.push(`  - [${name}](${url}): ${summary}`);
    }
  };

  lines.push(`- [${t.services}](${getAbsoluteUrl("/tjanster", locale)})`);
  pushServiceLinks("redovisning");

  lines.push(
    `- [${t.digital}](${getAbsoluteUrl("/digital-marknadsforing", locale)})`,
  );
  pushServiceLinks("marknadsforing");

  lines.push(
    `- [${getLocalized(offerings.utveckling.label, locale)}](${getAbsoluteUrl("/systemutveckling", locale)})`,
  );
  pushServiceLinks("utveckling");

  // Accounting software: live pages only (pending pages stay out).
  const [softwareHub, ...softwareSubpages] = liveSoftwarePages();
  lines.push(
    `- [${getLocalized(softwareHub.navLabel, locale)}](${getAbsoluteUrl(softwareHub.route, locale)}): ${getLocalized(softwareHub.summary, locale)}`,
  );
  for (const page of softwareSubpages) {
    lines.push(
      `  - [${getLocalized(page.navLabel, locale)}](${getAbsoluteUrl(page.route, locale)}): ${getLocalized(page.summary, locale)}`,
    );
  }

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

  const body = `${llmsIntro()}

${sections}

## Optional

- [Full content](${LLMS_FULL_URL}): every service, FAQ and article as plain text
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
