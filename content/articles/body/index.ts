import type { ContentBlock, Localized } from "@/content/types";
import { body as bookkeepingRecordsSweden } from "./bookkeeping-records-sweden";
import { body as registerAktiebolagSwedenForeigner } from "./register-aktiebolag-sweden-foreigner";
import { body as swedenBusinessTaxDeadlines } from "./sweden-business-tax-deadlines";
import { body as startBusinessSwedenWithoutResidencePermit } from "./start-business-sweden-without-residence-permit";
import { body as arabicSpeakingAccountantSwedenWhy } from "./arabic-speaking-accountant-sweden-why";

/** Article id -> body content, looked up by app/[locale]/artiklar/[slug]/page.tsx. */
export const articleBodies: Record<string, Localized<ContentBlock[]>> = {
  "bookkeeping-records-sweden": bookkeepingRecordsSweden,
  "register-aktiebolag-sweden-foreigner": registerAktiebolagSwedenForeigner,
  "sweden-business-tax-deadlines": swedenBusinessTaxDeadlines,
  "start-business-sweden-without-residence-permit":
    startBusinessSwedenWithoutResidencePermit,
  "arabic-speaking-accountant-sweden-why": arabicSpeakingAccountantSwedenWhy,
};
