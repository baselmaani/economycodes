import { test, expect } from "@playwright/test";

const livePages: { sv: string; en: string; ar: string; h1: RegExp }[] = [
  {
    sv: "/bokforingsprogram",
    en: "/en/accounting-software",
    ar: "/ar/برنامج-محاسبة",
    h1: /Bokföringsprogram för småföretag i Sverige/,
  },
  {
    sv: "/bokforingsprogram/fakturering",
    en: "/en/accounting-software/invoicing",
    ar: "/ar/برنامج-محاسبة/الفوترة",
    h1: /Faktureringsprogram för småföretag/,
  },
  {
    sv: "/bokforingsprogram/bokforing",
    en: "/en/accounting-software/bookkeeping",
    ar: "/ar/برنامج-محاسبة/مسك-الدفاتر",
    h1: /Bokför själv/,
  },
  {
    sv: "/bokforingsprogram/lon",
    en: "/en/accounting-software/payroll",
    ar: "/ar/برنامج-محاسبة/الرواتب",
    h1: /Löneprogram för småföretag/,
  },
];

test.describe("accounting software pages", () => {
  for (const page of livePages) {
    test(`${page.sv} renders in sv, en and ar`, async ({ request }) => {
      for (const url of [page.sv, page.en, encodeURI(page.ar)]) {
        const res = await request.get(url);
        expect(res.status(), url).toBe(200);
      }
    });

    test(`${page.sv} has its H1, breadcrumbs and alternates`, async ({
      page: browser,
    }) => {
      await browser.goto(page.sv);
      await expect(browser.locator("h1")).toHaveText(page.h1);
      await expect(
        browser.getByRole("navigation", { name: "Brödsmulor" }),
      ).toBeVisible();
      const hreflangs = await browser
        .locator('link[rel="alternate"]')
        .evaluateAll((els) => els.map((el) => el.getAttribute("hreflang")));
      expect(hreflangs.sort()).toEqual(["ar", "en", "sv", "x-default"].sort());
      await expect(browser.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`${page.sv}$`),
      );
    });
  }

  test("the integration pages are public", async ({ request }) => {
    for (const url of [
      "/bokforingsprogram/integrationer/skatteverket",
      "/bokforingsprogram/integrationer/ai-mcp",
    ]) {
      const res = await request.get(url);
      expect(res.status(), url).toBe(200);
    }
  });

  test("sitemap lists the live pages", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/bokforingsprogram/fakturering</loc>");
    expect(xml).toContain(
      "/bokforingsprogram/integrationer/skatteverket</loc>",
    );
    expect(xml).toContain("/bokforingsprogram/integrationer/ai-mcp</loc>");
  });

  test("CTAs: demo goes to the contact form, login to the app", async ({
    page,
  }) => {
    await page.goto("/bokforingsprogram");
    const hero = page.locator("section:has(h1)");
    await expect(hero.getByRole("link", { name: "Logga in" })).toHaveAttribute(
      "href",
      "https://app.economycodes.com/",
    );
    await expect(
      hero.getByRole("link", { name: "Se funktioner" }),
    ).toHaveAttribute("href", "#funktioner");

    await hero.getByRole("link", { name: "Boka en demo" }).click();
    await expect(page).toHaveURL(/\/kontakt\?amne=demo#kontaktformular$/);
    await expect(page.locator('select[name="service"]')).toHaveValue(
      "bokforingsprogram-demo",
    );
    await expect(page.locator('textarea[name="message"]')).toHaveValue(
      /boka en demo/i,
    );
  });

  test("header dropdown lists the section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .getByRole("button", { name: "Bokföringsprogram", exact: true })
      .click();
    // The menu content renders in a portal, outside <header>.
    await page
      .locator('a[data-slot="navigation-menu-link"]')
      .filter({ hasText: /^Fakturering/ })
      .click();
    await expect(page).toHaveURL(/\/bokforingsprogram\/fakturering$/);
  });

  test("mobile menu lists the section", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /meny|menu/i }).click();
    await page
      .getByRole("button", { name: "Bokföringsprogram", exact: true })
      .click();
    await page.getByRole("link", { name: /^Lön/ }).click();
    await expect(page).toHaveURL(/\/bokforingsprogram\/lon$/);
  });
});

test.describe("homepage areas and marketing menu", () => {
  test("home shows the four area cards and the area sections", async ({
    page,
  }) => {
    await page.goto("/");
    const hrefs = await page
      .locator("[data-area]")
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-area")));
    expect(hrefs).toEqual([
      "/tjanster",
      "/digital-marknadsforing",
      "/bokforingsprogram",
      "/systemutveckling",
    ]);
    for (const id of [
      "redovisning",
      "marknadsforing",
      "bokforingsprogram",
      "utveckling",
    ]) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
    const software = page.locator("section#bokforingsprogram");
    await expect(
      software.getByRole("link", { name: "Logga in" }),
    ).toHaveAttribute("href", "https://app.economycodes.com/");
    await expect(
      software.getByRole("link", { name: "Boka en demo" }),
    ).toHaveAttribute("href", "/kontakt?amne=demo#kontaktformular");
  });

  test("hero links to the software and marketing shows service cards", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.locator('a[data-offering="bokforingsprogram"]'),
    ).toHaveAttribute("href", "/bokforingsprogram");
    const marketingLinks = await page
      .locator("section#marknadsforing a")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(
      marketingLinks.filter((href) =>
        href?.startsWith("/digital-marknadsforing/"),
      ).length,
    ).toBeGreaterThanOrEqual(7);
    expect(marketingLinks).toContain("/digital-marknadsforing");
  });

  test("Marknadsföring dropdown lists the digital services", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page
      .getByRole("button", { name: "Marknadsföring", exact: true })
      .click();
    await page
      .locator('a[data-slot="navigation-menu-link"]')
      .filter({ hasText: /^Sökmotoroptimering/ })
      .click();
    await expect(page).toHaveURL(/\/digital-marknadsforing\/[^/]+$/);
  });

  test("mobile menu lists marketing services", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /meny|menu/i }).click();
    await page
      .getByRole("button", { name: "Marknadsföring", exact: true })
      .click();
    await page
      .getByRole("link", { name: "Utforska digital marknadsföring" })
      .click();
    await expect(page).toHaveURL(/\/digital-marknadsforing$/);
  });
});
