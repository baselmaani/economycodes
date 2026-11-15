import type { LucideIcon } from "lucide-react";
import { Calculator, Code2, LayoutDashboard, TrendingUp } from "lucide-react";

import type { OfferingKey } from "@/content/offerings";

/** One icon per offering, used wherever the four are shown side by side. */
export const offeringIcons: Record<OfferingKey, LucideIcon> = {
  redovisning: Calculator,
  marknadsforing: TrendingUp,
  utveckling: Code2,
  bokforingsprogram: LayoutDashboard,
};
