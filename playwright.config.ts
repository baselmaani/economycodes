import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  webServer: {
    command: "npm run build && npm run start -- -p 4310",
    url: "http://localhost:4310",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  use: {
    baseURL: "http://localhost:4310",
    // Uses the system-installed Chrome rather than a downloaded Playwright
    // browser binary, since this environment has no browser download access.
    channel: "chrome",
  },
});
