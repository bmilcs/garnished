import { expect, test } from "@playwright/test";
import { BASE_URL, MOCK_USER, logoutUser, signupUser } from "./setup";

test("has title", async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Garnished Events, LLP/);
});

test("get started link", async ({ page }) => {
  await page.goto(BASE_URL);
  await page
    .getByLabel("Hero")
    .getByRole("link", { name: "Get Started" })
    .click();

  page.waitForLoadState("domcontentloaded");

  await expect(
    page.getByRole("heading", { name: "Get Started" }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Here's How It Works" }),
  ).toBeVisible();
});

test("signup test with account deletion", async ({ page }) => {
  signupUser({ page });

  await expect(
    page.getByRole("heading", { name: "User Dashboard" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your Events" }),
  ).toBeVisible();

  // cleanup: delete account
  await page.getByRole("button", { name: "Update Personal Info" }).click();
  page.waitForLoadState("domcontentloaded");
  await page.getByRole("button", { name: "Delete Account" }).click();

  await expect(
    page.getByRole("heading", { name: "Delete Your Account?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete Account" }).nth(1).click();
});

test("login test", async ({ page }) => {
  signupUser({ page });
  logoutUser({ page });

  page.goto(`${BASE_URL}/login`);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await page.getByLabel("Email Address").fill(MOCK_USER.email);
  await page.getByLabel("Password", { exact: true }).fill(MOCK_USER.password);
  await page.getByRole("button", { name: "Login" }).click();
  page.waitForLoadState("domcontentloaded");

  await expect(
    page.getByRole("heading", { name: "User Dashboard" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your Events" }),
  ).toBeVisible();
});
