import type { PersonProfile } from "./types";

/**
 * Hadi Al Maani is the only person featured on the site. He is personally
 * authorized as both an Auktoriserad Redovisningskonsult and an Auktoriserad
 * Lönekonsult via Srf konsulterna; Economy Codes AB itself is a confirmed Srf
 * Auktoriserad Redovisningsbyrå (see lib/structured-data/organization.ts).
 * CLIENT-TODO.md items 4-6 (title, authorization, portrait) are resolved --
 * do not add any other team member.
 */
export const hadi: PersonProfile = {
  id: "hadi-al-maani",
  name: "Hadi Al Maani",
  title: {
    sv: "Auktoriserad redovisningskonsult & auktoriserad lönekonsult, Economy Codes AB",
    en: "Authorized Accounting Consultant & Authorized Payroll Consultant, Economy Codes AB",
    ar: "مستشار محاسبة معتمد ومستشار رواتب معتمد، Economy Codes AB",
  },
  bio: {
    sv: "Hadi Al Maani är auktoriserad redovisningskonsult och auktoriserad lönekonsult via Srf konsulterna, och driver Economy Codes AB som är en Srf Auktoriserad Redovisningsbyrå. Han hjälper företagare i Sverige med bokföring, lön, skattefrågor och praktiska frågor kring att starta och driva verksamhet — på svenska, engelska och arabiska.",
    en: "Hadi Al Maani is an authorized accounting consultant and authorized payroll consultant through Srf konsulterna, and runs Economy Codes AB, an Srf Auktoriserad Redovisningsbyrå (Srf-authorized accounting firm). He helps business owners in Sweden with bookkeeping, payroll, tax questions, and the practical steps of starting and running a business — in Swedish, English, and Arabic.",
    ar: "هادي المعاني مستشار محاسبة معتمد ومستشار رواتب معتمد من منظمة Srf konsulterna، ويدير شركة Economy Codes AB وهي مكتب محاسبة معتمد من Srf. يساعد أصحاب الأعمال في السويد في مسك الدفاتر والرواتب والمسائل الضريبية والخطوات العملية لتأسيس الأعمال وإدارتها — بالسويدية والإنجليزية والعربية.",
  },
  socials: {
    facebook: "https://www.facebook.com/hadi.maani",
  },
};
