import type { NavLink } from "./types";

/**
 * Top-level nav only. The services submenu is built directly from
 * content/services.ts (via lib/routes.ts) wherever it's rendered, since
 * building a service's href requires resolving its per-locale slug.
 */
export const primaryNav: NavLink[] = [
  {
    routeKey: "/tjanster",
    label: { sv: "Tjänster", en: "Services", ar: "الخدمات" },
  },
  {
    routeKey: "/om-hadi",
    label: { sv: "Om Hadi", en: "About Hadi", ar: "عن هادي" },
  },
  {
    routeKey: "/artiklar",
    label: { sv: "Artiklar", en: "Insights", ar: "مقالات" },
  },
  {
    routeKey: "/kontakt",
    label: { sv: "Kontakt", en: "Contact", ar: "اتصل بنا" },
  },
];

export const footerNav: NavLink[] = [
  { routeKey: "/", label: { sv: "Hem", en: "Home", ar: "الرئيسية" } },
  {
    routeKey: "/tjanster",
    label: { sv: "Tjänster", en: "Services", ar: "الخدمات" },
  },
  {
    routeKey: "/om-hadi",
    label: { sv: "Om Hadi", en: "About Hadi", ar: "عن هادي" },
  },
  {
    routeKey: "/artiklar",
    label: { sv: "Artiklar", en: "Insights", ar: "مقالات" },
  },
  {
    routeKey: "/kontakt",
    label: { sv: "Kontakt", en: "Contact", ar: "اتصل بنا" },
  },
];

export const footerLegalNav: NavLink[] = [
  {
    routeKey: "/integritetspolicy",
    label: {
      sv: "Integritetspolicy",
      en: "Privacy policy",
      ar: "سياسة الخصوصية",
    },
  },
  {
    routeKey: "/cookies",
    label: { sv: "Cookies", en: "Cookies", ar: "ملفات تعريف الارتباط" },
  },
  { routeKey: "/villkor", label: { sv: "Villkor", en: "Terms", ar: "الشروط" } },
];
