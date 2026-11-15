/**
 * Captures the Economy Codes app screenshots used on /bokforingsprogram.
 *
 * Runs against a LOCAL copy of the accounting app seeded with the fictional
 * "Demo Installation AB" (economycodes-faktura/scripts/seed-demo.mjs), once per
 * app language. Writes public/media/software/{sv,en,ar}/{shot}.webp and
 * content/software-screenshots.json (pixel sizes, read by content/software-screenshots.ts).
 *
 *   APP_URL=http://localhost:3100 DEMO_IDS=/path/to/demo-ids.json \
 *     npx tsx scripts/capture-app-screenshots.ts
 *
 * DEMO_IDS is a JSON object of record ids (draftInvoice, paidInvoice, ...),
 * printed by the seed environment's demo-ids helper.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";

import {
  SOFTWARE_SHOT_IDS,
  type SoftwareShotId,
} from "../content/software-shot-ids";

const APP_URL = process.env.APP_URL ?? "http://localhost:3100";
const EMAIL = process.env.DEMO_EMAIL ?? "demo@demo-installation.example";
const PASSWORD = process.env.DEMO_PASSWORD ?? "Demo-Installation-2026!";
const LOCALES = ["sv", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

if (!/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(APP_URL)) {
  throw new Error("APP_URL must be a local demo instance, never production.");
}
const ids = JSON.parse(
  readFileSync(process.env.DEMO_IDS ?? "demo-ids.json", "utf8"),
) as Record<string, string>;

const VIEWPORT = { width: 1440, height: 900 };

type Shot =
  | { path: string; area: "viewport" | "main" }
  | { path: string; area: "element"; text: Record<Locale, string> };

const shots: Record<SoftwareShotId, Shot> = {
  dashboard: { path: "/dashboard", area: "viewport" },
  "invoice-edit": { path: `/invoices/edit/${ids.draftInvoice}`, area: "main" },
  "invoice-list": { path: "/invoices", area: "main" },
  "invoice-paid": { path: `/invoices/${ids.paidInvoice}`, area: "main" },
  "invoice-rot": {
    path: `/invoices/${ids.rotInvoice}`,
    area: "element",
    text: {
      sv: "Uppgifter om arbetet",
      en: "Work details",
      ar: "بيانات العمل",
    },
  },
  "supplier-invoice": {
    path: `/bookkeeping/purchases/${ids.supplierInvoice}`,
    area: "main",
  },
  underlag: { path: "/bookkeeping/attachments", area: "main" },
  voucher: { path: `/bookkeeping/vouchers/${ids.voucher}`, area: "main" },
  ledger: { path: "/bookkeeping/reports", area: "main" },
  sie: { path: "/bookkeeping/import-export/sie", area: "main" },
  payslips: { path: "/bookkeeping/salaries", area: "main" },
  project: { path: `/bookkeeping/projects/${ids.project}`, area: "main" },
};

async function login(page: Page) {
  await page.goto(`${APP_URL}/login`);
  await page.fill("input[type=email]", EMAIL);
  await page.fill("input[type=password]", PASSWORD);
  await page.click("button[type=submit]");
  await page.waitForURL(/dashboard|bookkeeping|invoices/, { timeout: 60_000 });
}

/** The visible part of <main>: the app's page area beside the sidebar (either side, for RTL). */
async function mainClip(page: Page) {
  const box = await page.locator("main").first().boundingBox();
  if (!box) throw new Error("no <main> on page");
  const x = Math.max(0, box.x);
  const y = Math.max(0, box.y);
  return {
    x,
    y,
    width: Math.min(box.x + box.width, VIEWPORT.width) - x,
    height: Math.min(box.y + box.height, VIEWPORT.height) - y,
  };
}

async function capture(page: Page, locale: Locale, shot: Shot) {
  await page.goto(`${APP_URL}${shot.path}`, {
    waitUntil: "networkidle",
    timeout: 120_000,
  });
  // Charts animate in; toasts fade out.
  await page.waitForTimeout(2_000);
  if (shot.area !== "element") {
    return shot.area === "viewport"
      ? page.screenshot()
      : page.screenshot({ clip: await mainClip(page) });
  }
  const card = page
    .getByText(shot.text[locale], { exact: false })
    .first()
    .locator(
      "xpath=ancestor::*[contains(@class,'rounded') and contains(@class,'border')][1]",
    );
  await card.scrollIntoViewIfNeeded();
  return card.screenshot();
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  const sizes: Record<
    string,
    Record<string, { width: number; height: number }>
  > = {};

  for (const locale of LOCALES) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
      locale: locale === "sv" ? "sv-SE" : locale === "ar" ? "ar-SE" : "en-GB",
      timezoneId: "Europe/Stockholm",
      colorScheme: "light",
    });
    await context.addInitScript((language) => {
      localStorage.setItem("language", language);
    }, locale);
    const page = await context.newPage();
    await login(page);

    const dir = path.join("public", "media", "software", locale);
    mkdirSync(dir, { recursive: true });
    sizes[locale] = {};
    for (const id of SOFTWARE_SHOT_IDS) {
      const png = await capture(page, locale, shots[id]);
      const out = path.join(dir, `${id}.webp`);
      const info = await sharp(png).webp({ quality: 82 }).toFile(out);
      // Stored at 2x; the page lays them out at half size.
      sizes[locale][id] = { width: info.width, height: info.height };
      console.log(
        `${locale}/${id}.webp ${info.width}x${info.height} ${Math.round(info.size / 1024)} kB`,
      );
    }
    await context.close();
  }

  await browser.close();
  writeFileSync(
    path.join("content", "software-screenshots.json"),
    `${JSON.stringify(sizes, null, 2)}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
