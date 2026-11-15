import { offerings } from "./offerings";
import type { NavLink } from "./types";

/**
 * Top-level nav only. The services submenu is built directly from
 * content/services.ts (via lib/routes.ts) wherever it's rendered, since
 * building a service's href requires resolving its per-locale slug.
 */
export const primaryNav: NavLink[] = [
  { routeKey: "/", label: { sv: "Hem", en: "Home", ar: "الرئيسية" } },
  // The four offerings (content/offerings.ts) each get a dropdown in
  // components/layout/Header.tsx and an accordion in the mobile menu.
  { routeKey: "/tjanster", label: offerings.redovisning.navLabel },
  {
    routeKey: "/digital-marknadsforing",
    // Shorter than the footer label so the desktop header still fits at 1024px.
    label: offerings.marknadsforing.navLabel,
  },
  { routeKey: "/systemutveckling", label: offerings.utveckling.navLabel },
  {
    routeKey: "/bokforingsprogram",
    label: offerings.bokforingsprogram.navLabel,
  },
  {
    routeKey: "/om-hadi",
    label: { sv: "Om Hadi", en: "About Hadi", ar: "عن هادي" },
  },
  {
    routeKey: "/kontakt",
    label: { sv: "Kontakt", en: "Contact", ar: "اتصل بنا" },
  },
];

export const footerNav: NavLink[] = [
  { routeKey: "/", label: { sv: "Hem", en: "Home", ar: "الرئيسية" } },
  { routeKey: "/tjanster", label: offerings.redovisning.label },
  {
    routeKey: "/digital-marknadsforing",
    label: offerings.marknadsforing.label,
  },
  { routeKey: "/systemutveckling", label: offerings.utveckling.label },
  { routeKey: "/bokforingsprogram", label: offerings.bokforingsprogram.label },
  {
    routeKey: "/om-hadi",
    label: { sv: "Om Hadi", en: "About Hadi", ar: "عن هادي" },
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
