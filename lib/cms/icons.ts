import {
  Award,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Coins,
  FileText,
  Globe2,
  Handshake,
  HeartHandshake,
  Languages,
  Layers,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Phone,
  PiggyBank,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons an editor can choose for collection items (benefits, process steps).
 * Stored in the DB by name, so names must never be renamed or removed.
 */
export const CMS_ICONS = {
  Award,
  BadgeCheck,
  BarChart3,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Coins,
  FileText,
  Globe2,
  Handshake,
  HeartHandshake,
  Languages,
  Layers,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  Phone,
  PiggyBank,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  Wrench,
} satisfies Record<string, LucideIcon>;

export type CmsIconName = keyof typeof CMS_ICONS;

export const CMS_ICON_NAMES = Object.keys(CMS_ICONS) as CmsIconName[];

/** The icon for a stored name; unknown or empty names get a neutral check mark. */
export function getCmsIcon(name: string | undefined): LucideIcon {
  return (name && CMS_ICONS[name as CmsIconName]) || CheckCircle2;
}

/** Reverse lookup for content/ defaults that reference icon components directly. */
export function cmsIconName(icon: LucideIcon): CmsIconName {
  const entry = Object.entries(CMS_ICONS).find(([, value]) => value === icon);
  if (!entry) throw new Error("Icon is missing from CMS_ICONS");
  return entry[0] as CmsIconName;
}
