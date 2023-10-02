import { expect } from "@playwright/test";

export const BASE_URL = "http://localhost:3000";

export const MOCK_USER = {
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
  password: "asdfasdf",
  phone: "413-413-4133",
  address: "123 Main St",
  city: "Springfield",
  state: "MA",
  zip: "01103",
};

export const signupUser = async ({ page }) => {
  await page.goto(`${BASE_URL}/signup`);
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
  page.waitForLoadState("domcontentloaded");
};

export const logoutUser = async ({ page }) => {
  await page.goto(`${BASE_URL}/user`);
  await expect(
    page.getByRole("heading", { name: "User Dashboard" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Logout" }).click();
  page.waitForLoadState("domcontentloaded");
};
