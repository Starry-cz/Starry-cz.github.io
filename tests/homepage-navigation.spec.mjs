import { expect, test } from "@playwright/test";
import { resolve } from "node:path";

test.beforeEach(async ({ page }) => {
  if (process.env.PLAYWRIGHT_SOURCE_ASSETS !== "1") return;

  // 无本地 Jekyll 环境时，可让线上 HTML 临时加载工作区脚本，先验证交互修复。
  await page.route("**/assets/js/main.min.js", (route) =>
    route.fulfill({ path: resolve("assets/js/main.min.js"), contentType: "text/javascript" })
  );
  await page.route("**/assets/js/custom-home.js", (route) =>
    route.fulfill({ path: resolve("assets/js/custom-home.js"), contentType: "text/javascript" })
  );
});

const pages = [
  { path: "/", education: "Education", skills: "Skills", experience: "Experience" },
  { path: "/zh/", education: "教育背景", skills: "技能与联系", experience: "实习与工作" },
];

const sectionIds = [
  "about-me",
  "education",
  "research-interests",
  "news",
  "research-topics",
  "academic-achievements",
  "intellectual-property",
  "awards",
  "skills-contact",
  "internships-work",
];

for (const sitePage of pages) {
  test.describe(`${sitePage.path} 页面`, () => {
    test("升级后的主题脚本可正常加载", async ({ page }) => {
      const pageErrors = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      await page.goto(sitePage.path);

      const themeRuntime = await page.evaluate(() => ({
        jquery: window.jQuery?.fn?.jquery,
        fitVids: typeof window.jQuery?.fn?.fitVids,
        magnificPopup: typeof window.jQuery?.fn?.magnificPopup,
        stickyfill: typeof window.Stickyfill?.init,
      }));
      expect(themeRuntime).toEqual({
        jquery: "3.7.1",
        fitVids: "function",
        magnificPopup: "function",
        stickyfill: "function",
      });
      expect(pageErrors).toEqual([]);
    });

    test("标题层级、ID 与非必要资源符合约束", async ({ page }) => {
      const requestedUrls = [];
      page.on("request", (request) => requestedUrls.push(request.url()));
      await page.goto(sitePage.path);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("[data-nav-section] > h2.section-heading")).toHaveCount(10);
      await expect(page.locator("#intellectual-property h3.ip-subheading")).toHaveCount(2);

      const duplicateIds = await page.evaluate(() => {
        const counts = new Map();
        document.querySelectorAll("[id]").forEach((element) => {
          counts.set(element.id, (counts.get(element.id) || 0) + 1);
        });
        return [...counts.entries()].filter(([, count]) => count > 1);
      });
      expect(duplicateIds).toEqual([]);

      expect(requestedUrls.some((url) => url.includes("googletagmanager.com/gtag/js?id="))).toBe(false);
      expect(requestedUrls.some((url) => url.includes("mathjax"))).toBe(false);
      expect(requestedUrls.some((url) => url.includes("mstile-144x144.png"))).toBe(false);
      expect(requestedUrls.some((url) => url.includes("browserconfig.xml"))).toBe(false);
    });

    test("浏览器后退和前进会同步正文锚点与导航高亮", async ({ page, isMobile }) => {
      test.skip(isMobile, "桌面导航单独验证；移动端目录由下一项测试覆盖。");
      await page.goto(sitePage.path);

      await page.locator(`#site-nav a[href$="#education"]`).click();
      await expect(page).toHaveURL(/#education$/);
      await page.locator(`#site-nav a[href$="#skills-contact"]`).click();
      await expect(page).toHaveURL(/#skills-contact$/);

      await page.goBack();
      await expect(page).toHaveURL(/#education$/);
      await expect(page.locator(`#site-nav a[href$="#education"]`)).toHaveAttribute(
        "aria-current",
        "location"
      );
      await expect(page.locator(`#site-nav a[href$="#skills-contact"]`)).not.toHaveAttribute(
        "aria-current",
        "location"
      );

      await page.goForward();
      await expect(page).toHaveURL(/#skills-contact$/);
      await expect(page.locator(`#site-nav a[href$="#skills-contact"]`)).toHaveAttribute(
        "aria-current",
        "location"
      );
    });

    test("全部板块存在且最后两个板块可以直接访问和高亮", async ({ page }) => {
      await page.goto(sitePage.path);
      for (const id of sectionIds) await expect(page.locator(`#${id}`)).toHaveCount(1);

      await page.goto(`${sitePage.path}#skills-contact`);
      await expect(page.locator('a[href$="#skills-contact"][aria-current="location"]')).toHaveCount(2);

      await page.goto(`${sitePage.path}#internships-work`);
      await expect(page.locator("#internships-work")).toBeVisible();
      await expect(page.locator('a[href$="#internships-work"][aria-current="location"]')).toHaveCount(2);
    });

    test("移动端页面目录完整、可用键盘关闭并能访问末尾板块", async ({ page, isMobile }) => {
      test.skip(!isMobile, "仅在移动端视口验证页面目录。");
      await page.goto(sitePage.path);

      const toggle = page.locator("#mobile-nav-toggle");
      await expect(toggle).toBeVisible();
      await toggle.click();
      await expect(page.locator("#mobile-nav-drawer a")).toHaveCount(11);

      await page.keyboard.press("Escape");
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");

      await toggle.click();
      await page.locator('#mobile-nav-drawer a[href$="#internships-work"]').click();
      await expect(page).toHaveURL(/#internships-work$/);
      await expect(page.locator('#mobile-nav-drawer a[href$="#internships-work"]')).toHaveAttribute(
        "aria-current",
        "location"
      );
    });
  });
}
