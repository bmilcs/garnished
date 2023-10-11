import test, { expect } from "@playwright/test";

test("Site has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Garnished Events, LLP/);
});

test("Get Started hero link: /get-started", async ({ page }) => {
  await page.goto("/");
  await page
    .getByLabel("Hero")
    .getByRole("link", { name: "Get Started" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Get Started" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Here's How It Works" }),
  ).toBeVisible();
});
