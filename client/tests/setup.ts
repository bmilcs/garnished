// x@ts-nocheck

import { Page, expect } from "@playwright/test";

export const MOCK_USER = {
  firstName: "John",
  lastName: "Doe",
  email: "playwright@client-test.com",
  password: "asdfasdf",
  phone: "413-413-4133",
  address: "123 Main St",
  city: "Springfield",
  state: "MA",
  zip: "01103",
};

export const signupUser = async (page: Page) => {
  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Signup" })).toBeVisible();
  await page.getByLabel("First Name").fill(MOCK_USER.firstName);
  await page.getByLabel("Last Name").fill(MOCK_USER.lastName);
  await page.getByLabel("Email Address").fill(MOCK_USER.email);
  await page.getByLabel("Password", { exact: true }).fill(MOCK_USER.password);
  await page.getByLabel("Confirm Password").fill(MOCK_USER.password);
  await page.getByLabel("Phone").fill(MOCK_USER.phone);
  await page.getByLabel("Address", { exact: true }).fill(MOCK_USER.address);
  await page.getByLabel("City").fill(MOCK_USER.city);
  await page.getByLabel("State").fill(MOCK_USER.state);
  await page.getByLabel("Zip").fill(MOCK_USER.zip);
  await page.getByRole("button", { name: "Signup" }).click();
};

export const loginUser = async (page: Page) => {
  await page.goto(`/login`);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await page.getByLabel("Email Address").fill(MOCK_USER.email);
  await page.getByLabel("Password", { exact: true }).fill(MOCK_USER.password);
  await page.getByRole("button", { name: "Login" }).click();
};

export const logoutUser = async (page: Page) => {
  await page.goto("/user");
  await expect(
    page.getByRole("heading", { name: "User Dashboard" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Logout" }).click();
  page.waitForLoadState("domcontentloaded");
};

export const deleteUser = async (page: Page) => {
  await page.goto("/user");
  await page.getByRole("button", { name: "Update Personal Info" }).click();
  await page.getByRole("button", { name: "Delete Account" }).click();
  await expect(
    page.getByRole("heading", { name: "Delete Your Account?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete Account" }).nth(1).click();
};
