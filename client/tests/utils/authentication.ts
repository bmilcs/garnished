// x@ts-nocheck

import { Page, expect } from "@playwright/test";
import { AUTH_MOCK_USER } from "./mockData";

export const signupUser = async (page: Page) => {
  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Signup" })).toBeVisible();
  await page.getByLabel("First Name").fill(AUTH_MOCK_USER.firstName);
  await page.getByLabel("Last Name").fill(AUTH_MOCK_USER.lastName);
  await page.getByLabel("Email Address").fill(AUTH_MOCK_USER.email);
  await page
    .getByLabel("Password", { exact: true })
    .fill(AUTH_MOCK_USER.password);
  await page.getByLabel("Confirm Password").fill(AUTH_MOCK_USER.password);
  await page.getByLabel("Phone").fill(AUTH_MOCK_USER.phone);
  await page
    .getByLabel("Address", { exact: true })
    .fill(AUTH_MOCK_USER.address);
  await page.getByLabel("City").fill(AUTH_MOCK_USER.city);
  await page.getByLabel("State").fill(AUTH_MOCK_USER.state);
  await page.getByLabel("Zip").fill(AUTH_MOCK_USER.zip);
  await page.getByRole("button", { name: "Signup" }).click();
};

export const loginUser = async (page: Page) => {
  await page.goto(`/login`);
  await page.getByLabel("Email Address").fill(AUTH_MOCK_USER.email);
  await page
    .getByLabel("Password", { exact: true })
    .fill(AUTH_MOCK_USER.password);
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
