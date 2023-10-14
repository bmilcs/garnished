import { expect, test } from "@playwright/test";
import { describe } from "node:test";

describe("Check protected routes", () => {
  test("Unauthorized Dashboard Access: to Login", async ({ page }) => {
    await page.goto("/user");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Unauthorized User Update Access: to Login", async ({ page }) => {
    await page.goto("/user/update");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Unauthorized New Event Access: to Login", async ({ page }) => {
    await page.goto("/event/new");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("Unauthorized Update Event Access: to Login", async ({ page }) => {
    await page.goto("/event/1");
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });
});
