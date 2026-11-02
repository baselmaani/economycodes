import { aboutPage } from "./about";
import { contactPage, articlesPage, servicesOverviewPage } from "./misc";
import { digitalPage } from "./digital";
import { homePage } from "./home";
import { legalPages } from "./legal";
import { locationPageDefs } from "./locations";
import { servicePageDefs } from "./services";
import { businessSettings, faqSettings } from "./settings";
import type { PageDef } from "./types";

export * from "./types";
export { locationPageKey } from "./locations";
export { servicePageKey } from "./services";
export {
  BUSINESS_KEY,
  FAQS_KEY,
  faqScopeFromString,
  faqScopeToString,
} from "./settings";

export const pageDefs: PageDef[] = [
  homePage,
  aboutPage,
  servicesOverviewPage,
  digitalPage,
  contactPage,
  articlesPage,
  ...legalPages,
  ...locationPageDefs,
  ...servicePageDefs,
  businessSettings,
  faqSettings,
];

export function getPageDef(key: string): PageDef | undefined {
  return pageDefs.find((page) => page.key === key);
}

export type StaticPageKey =
  | "home"
  | "om-hadi"
  | "tjanster"
  | "digital-marknadsforing"
  | "kontakt"
  | "artiklar"
  | "integritetspolicy"
  | "cookies"
  | "villkor";
