// x@ts-nocheck

import { Page, expect } from "@playwright/test";
import { AUTH_MOCK_USER } from "./mockData";

export const signupUser = async (page: Page, user = AUTH_MOCK_USER) => {
  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Signup" })).toBeVisible();
  await page.getByLabel("First Name").fill(user.firstName);
  await page.getByLabel("Last Name").fill(user.lastName);
  await page.getByLabel("Email Address").fill(user.email);
  await page.getByLabel("Password", { exact: true }).fill(user.password);
  await page.getByLabel("Confirm Password").fill(user.password);
  await page.getByLabel("Phone").fill(user.phone);
  await page.getByLabel("Address", { exact: true }).fill(user.address);
  await page.getByLabel("City").fill(user.city);
  await page.getByLabel("State").fill(user.state);
  await page.getByLabel("Zip").fill(user.zip);
  await page.getByRole("button", { name: "Signup" }).click();
};

export const loginUser = async (page: Page, user = AUTH_MOCK_USER) => {
  await page.goto(`/login`);
  await page.getByLabel("Email Address").fill(user.email);
  await page.getByLabel("Password", { exact: true }).fill(user.password);
  await page.getByRole("button", { name: "Login" }).click();
};

export const logoutUser = async (page: Page) => {
  await page.goto("/user");
  await page.getByRole("button", { name: "Logout" }).click();
};

export const deleteUser = async (page: Page) => {
  await page.goto("/user");
  await page.getByRole("button", { name: "Update Personal Info" }).click();
  await page.getByRole("button", { name: "Delete Account" }).click();
  await page.getByRole("button", { name: "Delete Account" }).nth(1).click();
};
