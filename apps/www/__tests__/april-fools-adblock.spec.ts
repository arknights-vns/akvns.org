import { test, expect } from "@playwright/test";

test("april fools [adblock] works on April 1st", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-04-01T10:00:00"));
  await page.goto("/");

  const elem = page.getByTestId("april-fool-adblock");

  await expect(elem).toBeVisible();
});

test("april fools [adblock] works on April 2nd", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-04-02T10:00:00"));
  await page.goto("/");

  const elem = page.getByTestId("april-fool-adblock");

  await expect(elem).toBeHidden();
});

test("april fools [adblock] works behind URL query parameter", async ({ page }) => {
  await page.goto("/?i-really-want-adblock=true");
  const elem1 = page.getByTestId("april-fool-adblock");
  await expect(elem1).toBeVisible();

  await page.goto("/");
  const elem2 = page.getByTestId("april-fool-adblock");
  await expect(elem2).toBeHidden();
});
