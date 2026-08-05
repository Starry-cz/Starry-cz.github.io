import { expect, test } from "@playwright/test";

const demoPages = [
  {
    path: "/demo/",
    profileName: "Alex Chen",
    formalName: "Zifan Cheng",
    otherLanguagePath: "/demo/zh/",
  },
  {
    path: "/demo/zh/",
    profileName: "陈晓明",
    formalName: "程子凡",
    otherLanguagePath: "/demo/",
  },
];

const demoSectionIds = [
  "about-me",
  "news",
  "publications",
  "awards",
  "education",
  "talks",
  "internships",
];

for (const demoPage of demoPages) {
  test.describe(`${demoPage.path} Demo`, () => {
    test("Demo 使用独立虚构资料和独立导航", async ({ page }) => {
      await page.goto(demoPage.path);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("[data-nav-section] > h2.section-heading")).toHaveCount(7);
      await expect(page.locator(".author__name")).toHaveText(demoPage.profileName);
      await expect(page.locator("body")).not.toContainText(demoPage.formalName);

      for (const id of demoSectionIds) {
        await expect(page.locator(`#${id}`)).toHaveCount(1);
      }

      const desktopPaths = await page.locator("#site-nav a").evaluateAll((links) => {
        return links.map((link) => new URL(link.href).pathname);
      });
      expect(desktopPaths).toHaveLength(8);
      expect(desktopPaths.every((path) => path.startsWith("/demo/"))).toBe(true);

      const languagePath = await page.locator(".language-switch a").evaluate((link) => {
        return new URL(link.href).pathname;
      });
      expect(languagePath).toBe(demoPage.otherLanguagePath);
    });

    test("Demo 末尾板块可直接访问并正确高亮", async ({ page }) => {
      await page.goto(`${demoPage.path}#internships`);

      await expect(page.locator("#internships")).toBeVisible();
      await expect(page.locator('a[href$="#internships"][aria-current="location"]')).toHaveCount(2);
    });

    test("Demo 移动端目录只包含 Demo 板块", async ({ page, isMobile }) => {
      test.skip(!isMobile, "仅在移动端视口检查 Demo 目录。");
      await page.goto(demoPage.path);

      const toggle = page.locator("#mobile-nav-toggle");
      await toggle.click();
      await expect(page.locator("#mobile-nav-drawer a")).toHaveCount(8);

      const mobilePaths = await page.locator("#mobile-nav-drawer a").evaluateAll((links) => {
        return links.map((link) => new URL(link.href).pathname);
      });
      expect(mobilePaths.every((path) => path.startsWith("/demo/"))).toBe(true);
    });
  });
}
