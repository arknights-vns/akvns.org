import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.mouse.wheel(0, -1_000_000_000);
});

test("back-to-top conditional render", async ({ page }) => {
    await expect(page.getByLabel("back-to-top")).toBeHidden();

    await page.mouse.wheel(0, 25);

    await expect(page.getByLabel("back-to-top")).toBeVisible();
});

test("navbar should hidden on mobile", async ({ isMobile, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(!isMobile, "Test is mobile-only");

    await expect(page.getByLabel("nav-bar")).toBeHidden();
    await expect(page.getByLabel("burger-menu")).toBeVisible();
});

test("navbar should visible on desktop", async ({ isMobile, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(isMobile, "Test is desktop-only");

    await expect(page.getByLabel("nav-bar")).toBeVisible();
    await expect(page.getByLabel("burger-menu")).toBeHidden();
});

test("theme switcher", async ({ page }) => {
    await page.getByRole("button", { name: "theme-switcher" }).click();
    await page.getByRole("menuitemradio", { name: "theme-light" }).click();
    await expect(page.locator("html")).toHaveAttribute("class", "light");

    await page.getByRole("button", { name: "theme-switcher" }).click();
    await page.getByRole("menuitemradio", { name: "theme-dark" }).click();
    await expect(page.locator("html")).toHaveAttribute("class", "dark");
});
