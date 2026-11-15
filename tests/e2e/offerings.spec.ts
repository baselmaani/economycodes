import { expect, test } from "@playwright/test";

/** The four offerings: homepage entry points, landing pages and their CTAs. */

test.describe("homepage entry points", () => {
  test("the hero links to all four offerings, in order", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    const entries = page.locator("a[data-offering]");
    await expect(entries).toHaveCount(4);
    expect(
      await entries.evaluateAll((els) =>
        els.map((el) => el.getAttribute("href")),
      ),
    ).toEqual([
      "/tjanster",
      "/digital-marknadsforing",
      "/bokforingsprogram",
      "/systemutveckling",
    ]);
    await expect(entries.nth(0)).toContainText("Vi sköter ekonomin åt dig");
    await expect(entries.nth(2)).toContainText("Du sköter bokföringen själv");
  });

  test("the chooser links each offering to its own next step", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.locator('[data-cta="areas-redovisning"]'),
    ).toHaveAttribute("href", "/kontakt?amne=redovisning#kontaktformular");
    await expect(
      page.locator('[data-cta="areas-marknadsforing"]'),
    ).toHaveAttribute("href", "/kontakt?amne=marknadsforing#kontaktformular");
    await expect(
      page.locator('[data-cta="areas-bokforingsprogram"]'),
    ).toHaveAttribute("href", "/kontakt?amne=demo#kontaktformular");
    await expect(page.locator('[data-cta="areas-utveckling"]')).toHaveAttribute(
      "href",
      "/kontakt?amne=utveckling#kontaktformular",
    );
  });
});

test.describe("homepage offering sections", () => {
  test("each has a heading, an image and its cards below", async ({ page }) => {
    await page.goto("/");
    for (const { id, cards, min, image = true } of [
      { id: "redovisning", cards: "a[href^='/tjanster/']", min: 14 },
      {
        id: "marknadsforing",
        cards: "a[href^='/digital-marknadsforing/']",
        min: 7,
      },
      {
        id: "bokforingsprogram",
        cards: "a[href^='/bokforingsprogram/']",
        min: 3,
      },
      // Shows an illustration until an image is set in the dashboard.
      {
        id: "utveckling",
        cards: "a[href^='/systemutveckling/']",
        min: 4,
        image: false,
      },
    ]) {
      const section = page.locator(`section#${id}`);
      await expect(section.locator("h2")).toHaveCount(1);
      if (image) await expect(section.locator("img").first()).toBeVisible();
      expect(await section.locator(cards).count()).toBeGreaterThanOrEqual(min);
    }
  });
});

test.describe("landing pages", () => {
  for (const { path, h1, cta, topic } of [
    {
      path: "/tjanster",
      h1: /redovisningsbyrå/i,
      cta: "accounting-hero",
      topic: "redovisning-konsultation",
    },
    {
      path: "/digital-marknadsforing",
      h1: /digital marknadsföring/i,
      cta: "marketing-hero",
      topic: "digital-marknadsforing-forfragan",
    },
    {
      path: "/systemutveckling",
      h1: /systemutveckling/i,
      cta: "development-hero",
      topic: "systemutveckling-forfragan",
    },
  ]) {
    test(`${path}: one descriptive H1, breadcrumbs and a prefilled CTA`, async ({
      page,
    }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(h1);
      const jsonLdTypes = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((els) =>
          els.map((el) => JSON.parse(el.textContent ?? "{}")["@type"]),
        );
      expect(jsonLdTypes.filter((t) => t === "BreadcrumbList")).toHaveLength(1);
      expect(jsonLdTypes).toContain("FAQPage");
      await page.locator(`[data-cta="${cta}"]`).click();
      await expect(page.locator('select[name="service"]')).toHaveValue(topic);
      await expect(page.locator('textarea[name="message"]')).not.toHaveValue(
        "",
      );
    });
  }

  test("the accounting hub lists accounting services only", async ({
    page,
  }) => {
    await page.goto("/tjanster");
    const hrefs = await page
      .locator("#tjanster a[href^='/tjanster/']")
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    expect(hrefs.length).toBe(14);
    expect(hrefs).not.toContain("/tjanster/sokmotoroptimering-seo");
    await expect(
      page.getByRole("link", { name: "Se bokföringsprogrammet" }),
    ).toHaveAttribute("href", "/bokforingsprogram");
  });

  test("a service page preselects that service in the form", async ({
    page,
  }) => {
    await page.goto("/tjanster/bokforing");
    await page.locator('[data-cta="service-hero"]').click();
    await expect(page.locator('select[name="service"]')).toHaveValue(
      "bookkeeping",
    );
  });

  test("the software page lists the verified integrations", async ({
    page,
  }) => {
    await page.goto("/bokforingsprogram");
    const integrations = page.locator("section#integrationer");
    await expect(integrations.locator("h3")).toHaveCount(4);
    await expect(integrations).toContainText("SIE 4");
    await expect(page.locator("body")).not.toContainText(/Peppol/);
  });
});

test.describe("navigation", () => {
  test("desktop nav names the four offerings", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Huvudmeny" });
    for (const name of [
      "Redovisning",
      "Marknadsföring",
      "Utveckling",
      "Bokföringsprogram",
    ]) {
      await expect(
        nav.getByRole("button", { name, exact: true }),
      ).toBeVisible();
    }
    // Everything fits at 1024px: no horizontal scroll.
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
});

test.describe("service URLs per offering", () => {
  test("each service lives under its own offering", async ({ request }) => {
    for (const url of [
      "/tjanster/bokforing",
      "/digital-marknadsforing/webbplatser",
      "/systemutveckling/saas-utveckling",
    ]) {
      expect((await request.get(url)).status(), url).toBe(200);
    }
  });

  test("old and cross-offering URLs redirect permanently", async ({
    request,
  }) => {
    for (const [from, to] of [
      ["/tjanster/webbplatser", "/digital-marknadsforing/webbplatser"],
      ["/tjanster/saas-utveckling", "/systemutveckling/saas-utveckling"],
      [
        "/en/services/saas-development",
        "/en/software-development/saas-development",
      ],
      ["/digital-marknadsforing/bokforing", "/tjanster/bokforing"],
      [
        encodeURI("/ar/الخدمات/تصميم-المواقع"),
        encodeURI("/ar/شركة-تسويق-رقمي-في-السويد/تصميم-المواقع"),
      ],
    ]) {
      const res = await request.get(from, { maxRedirects: 0 });
      expect(res.status(), from).toBe(308);
      expect(res.headers()["location"], from).toBe(to);
    }
  });

  test("unknown slugs are still 404", async ({ request }) => {
    expect((await request.get("/systemutveckling/finns-inte")).status()).toBe(
      404,
    );
  });
});
