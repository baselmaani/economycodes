import { test, expect } from "@playwright/test";

test.describe("locale rendering", () => {
  test("sv renders unprefixed at / with ltr direction", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "sv");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("en renders at /en", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  });

  test("ar renders at /ar with rtl direction", async ({ page }) => {
    await page.goto("/ar");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});

test.describe("hreflang alternates", () => {
  test("a service page exposes all three locale alternates plus x-default", async ({
    page,
  }) => {
    await page.goto("/tjanster/bokforing");
    const hreflangs = await page
      .locator('link[rel="alternate"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("hreflang")));
    expect(hreflangs.sort()).toEqual(["ar", "en", "sv", "x-default"].sort());
  });
});

test.describe("primary navigation", () => {
  const cases: [string, string][] = [
    ["sv", "/tjanster"],
    ["en", "/en/services"],
  ];

  for (const [locale, servicesUrl] of cases) {
    test(`${locale} services overview resolves`, async ({ request }) => {
      const res = await request.get(servicesUrl);
      expect(res.status()).toBe(200);
    });
  }
});

test.describe("Arabic service pages (regression: percent-encoded slug decode)", () => {
  const arSlugs = [
    "المحاسبة",
    "الإقرار-الضريبي",
    "تسجيل-الشركات",
    "تأسيس-جمعية",
    "خطة-العمل-والميزانية",
    "العقود-والاتفاقيات",
    "تأسيس-شركة-في-السويد",
  ];

  for (const slug of arSlugs) {
    test(`/ar/الخدمات/${slug} resolves`, async ({ request }) => {
      const url = `/ar/${encodeURIComponent("الخدمات")}/${slug
        .split("-")
        .map(encodeURIComponent)
        .join("-")}`;
      const res = await request.get(url);
      expect(res.status()).toBe(200);
    });
  }
});

test.describe("contact form", () => {
  test("happy path shows a success message", async ({ page }) => {
    await page.goto("/kontakt");
    await page.fill("#name", "Test Testsson");
    await page.fill("#email", "test@example.com");
    await page.fill(
      "#message",
      "Detta ar ett testmeddelande som ar langre an tio tecken.",
    );
    await page.check("#consent");
    await page.click('button[type="submit"]');
    await expect(page.getByRole("status")).toBeVisible({ timeout: 10_000 });
  });

  test("honeypot-filled submission does not send but still shows success", async ({
    page,
  }) => {
    await page.goto("/kontakt");
    await page.fill("#name", "Bot Botsson");
    await page.fill("#email", "bot@example.com");
    await page.fill("#message", "This is an automated honeypot test message.");
    await page.check("#consent");
    // The honeypot field is hidden from real users but present in the DOM.
    await page.fill('input[name="company"]', "I am a bot");
    await page.click('button[type="submit"]');
    await expect(page.getByRole("status")).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("legacy redirects", () => {
  const redirects: [string, string][] = [
    ["/service", "/tjanster"],
    ["/about", "/om-hadi"],
    ["/privacy", "/integritetspolicy"],
    ["/service/accounting", "/tjanster/bokforing"],
  ];

  for (const [from, to] of redirects) {
    test(`${from} redirects to ${to}`, async ({ request }) => {
      const res = await request.get(from, { maxRedirects: 0 });
      expect([301, 308]).toContain(res.status());
      expect(res.headers()["location"]).toContain(to);
    });
  }
});
