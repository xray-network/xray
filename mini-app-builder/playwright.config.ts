import { defineConfig, devices } from "@playwright/test"
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  use: { ...devices["Desktop Chrome"], baseURL: "http://127.0.0.1:7210", trace: "retain-on-failure" },
  webServer: [
    {
      command: "npm run dev -- --strictPort",
      url: "http://127.0.0.1:7210",
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
    { command: "node tests/fixtures/server.mjs", url: "http://127.0.0.1:7211", reuseExistingServer: !process.env.CI },
  ],
})
