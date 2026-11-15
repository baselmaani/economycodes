/**
 * The Economy Codes app screenshots shown on /bokforingsprogram, captured by
 * scripts/capture-app-screenshots.ts into public/media/software/{locale}/{id}.webp.
 * Kept free of imports so the capture script can use it outside Next.
 */
export const SOFTWARE_SHOT_IDS = [
  "dashboard",
  "invoice-edit",
  "invoice-list",
  "invoice-paid",
  "invoice-rot",
  "supplier-invoice",
  "underlag",
  "voucher",
  "ledger",
  "sie",
  "payslips",
  "project",
] as const;

export type SoftwareShotId = (typeof SOFTWARE_SHOT_IDS)[number];
