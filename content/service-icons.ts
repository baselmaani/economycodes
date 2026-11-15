import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  BarChart3,
  Building2,
  Calculator,
  ClipboardCheck,
  FileSignature,
  FileText,
  Globe2,
  Languages,
  Lightbulb,
  Megaphone,
  MessageSquareText,
  MonitorSmartphone,
  MousePointerClick,
  PenTool,
  PlugZap,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Users2,
  Wallet,
  Workflow,
  Wrench,
  Car,
} from "lucide-react";

/**
 * Presentation-only metadata for service cards/nav grouping: which icon and
 * which visual group each service belongs to. Deliberately kept out of
 * content/services.ts, which holds verified business facts and is covered by
 * tests/unit/content-integrity.test.ts -- this file only affects styling.
 */
export type ServiceGroup =
  "core" | "advisory" | "specialist" | "digital" | "development";

export const serviceGroups: Record<
  ServiceGroup,
  { sv: string; en: string; ar: string }
> = {
  core: {
    sv: "Löpande redovisning",
    en: "Core accounting",
    ar: "المحاسبة الأساسية",
  },
  advisory: {
    sv: "Rådgivning & företagsstart",
    en: "Advisory & company formation",
    ar: "الاستشارات وتأسيس الشركات",
  },
  specialist: {
    sv: "Specialistlösningar",
    en: "Specialist solutions",
    ar: "حلول متخصصة",
  },
  digital: {
    sv: "Digital marknadsföring",
    en: "Digital marketing",
    ar: "التسويق الرقمي",
  },
  development: {
    sv: "Systemutveckling",
    en: "Software development",
    ar: "تطوير البرمجيات",
  },
};

export const serviceIcons: Record<
  string,
  { icon: LucideIcon; group: ServiceGroup }
> = {
  bookkeeping: { icon: Calculator, group: "core" },
  payroll: { icon: Wallet, group: "core" },
  "annual-closing": { icon: ClipboardCheck, group: "core" },
  "tax-reporting": { icon: FileText, group: "core" },

  advisory: { icon: Lightbulb, group: "advisory" },
  "business-registration": { icon: Building2, group: "advisory" },
  "association-formation": { icon: Users2, group: "advisory" },
  "investment-establishment": { icon: Globe2, group: "advisory" },
  contracts: { icon: FileSignature, group: "advisory" },
  "feasibility-budget": { icon: BarChart3, group: "advisory" },

  "bookkeeping-correction": { icon: Wrench, group: "specialist" },
  "fortnox-support": { icon: PlugZap, group: "specialist" },
  "car-dealership-accounting": { icon: Car, group: "specialist" },
  "arabic-speaking-accounting": { icon: Languages, group: "specialist" },

  "website-creation": { icon: MonitorSmartphone, group: "digital" },
  seo: { icon: Search, group: "digital" },
  aeo: { icon: MessageSquareText, group: "digital" },
  geo: { icon: Sparkles, group: "digital" },
  "social-media-ads": { icon: Megaphone, group: "digital" },
  "google-ads": { icon: MousePointerClick, group: "digital" },
  "social-media-management": { icon: Share2, group: "digital" },
  "saas-development": { icon: AppWindow, group: "development" },
  "mobile-app-development": { icon: Smartphone, group: "development" },
  "ui-ux-design": { icon: PenTool, group: "development" },
  "custom-system-development": { icon: Workflow, group: "development" },
};

export function getServiceIcon(key: string): LucideIcon {
  return serviceIcons[key]?.icon ?? Calculator;
}

export function getServiceGroup(key: string): ServiceGroup {
  return serviceIcons[key]?.group ?? "core";
}

/** The accounting groups, in display order; "digital" and "development" are their own offerings. */
export const ACCOUNTING_GROUPS: readonly ServiceGroup[] = [
  "core",
  "advisory",
  "specialist",
];

/** Marketing services only (the /digital-marknadsforing offering). */
export function isDigitalService(key: string): boolean {
  return getServiceGroup(key) === "digital";
}

/** Programming services (the /systemutveckling offering). */
export function isDevelopmentService(key: string): boolean {
  return getServiceGroup(key) === "development";
}

/** The offerings that have service detail pages (bokforingsprogram has its own pages). */
export type ServiceOfferingKey =
  "redovisning" | "marknadsforing" | "utveckling";

/** Which offering a service belongs to; this decides its URL, nav menu and hub. */
export function getServiceOffering(key: string): ServiceOfferingKey {
  const group = getServiceGroup(key);
  if (group === "digital") return "marknadsforing";
  if (group === "development") return "utveckling";
  return "redovisning";
}

/** Splits services into the given groups, in that order, skipping empty groups. */
export function groupServices<S extends { key: string }>(
  list: readonly S[],
  groups: readonly ServiceGroup[],
  locale: "sv" | "en" | "ar",
): { group: ServiceGroup; label: string; services: S[] }[] {
  return groups
    .map((group) => ({
      group,
      label: serviceGroups[group][locale],
      services: list.filter((s) => getServiceGroup(s.key) === group),
    }))
    .filter((entry) => entry.services.length > 0);
}
