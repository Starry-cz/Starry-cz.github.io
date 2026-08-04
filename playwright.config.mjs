import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // 测试的是 Jekyll 已生成的静态文件，不绕过正式构建结果。
        command: "node scripts/serve-site.mjs",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
