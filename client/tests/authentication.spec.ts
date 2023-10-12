import { expect, test } from "@playwright/test";
import { loginUser, signupUser } from "./utils/authentication";

test("User Signup to Dashboard", async ({ page }) => {
  await signupUser(page);
  await expect(
    page.getByRole("heading", { name: "User Dashboard" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your Events" }),
  ).toBeVisible();
});

test("User Login to Dashboard", async ({ page }) => {
  await loginUser(page);
  await expect(
    page.getByRole("heading", { name: "User Dashboard" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your Events" }),
  ).toBeVisible();
});

test("User Logout to Home", async ({ page }) => {
  await loginUser(page);
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(
    page.getByRole("heading", { name: "Elevate Your Events With" }),
  ).toBeVisible();
});

test("Delete User to Home", async ({ page }) => {
  await loginUser(page);
  await page.getByRole("button", { name: "Update Personal Info" }).click();
  await page.getByRole("button", { name: "Delete Account" }).click();
  await expect(
    page.getByRole("heading", { name: "Delete Your Account?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete Account" }).nth(1).click();
});
