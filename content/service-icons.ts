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
  PlugZap,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Users2,
  Wallet,
  Wrench,
  Car,
} from "lucide-react";

/**
 * Presentation-only metadata for service cards/nav grouping: which icon and
 * which visual group each service belongs to. Deliberately kept out of
 * content/services.ts, which holds verified business facts and is covered by
 * tests/unit/content-integrity.test.ts -- this file only affects styling.
 */
export type ServiceGroup = "core" | "advisory" | "specialist" | "digital";

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
  "saas-development": { icon: AppWindow, group: "digital" },
  "mobile-app-development": { icon: Smartphone, group: "digital" },
};

export function getServiceIcon(key: string): LucideIcon {
  return serviceIcons[key]?.icon ?? Calculator;
}

export function getServiceGroup(key: string): ServiceGroup {
  return serviceIcons[key]?.group ?? "core";
}
