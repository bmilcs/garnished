import { expect, test } from "@playwright/test";
import { describe } from "node:test";
import { AUTH_MOCK_USER, AUTH_MOCK_USER_UPDATE } from "utils/mockData";
import { loginUser, signupUser } from "./utils/authentication";

describe("User Signup Tests", () => {
  test("Signup with valid data: to Dashboard", async ({ page }) => {
    await signupUser(page);
    await expect(
      page.getByRole("heading", { name: "User Dashboard" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Your Events" }),
    ).toBeVisible();
  });

  test("Signup with registered email: email error", async ({ page }) => {
    await signupUser(page);
    await expect(
      page.getByText("Email address already registered"),
    ).toBeVisible();
  });
});

describe("User Login Tests", () => {
  test("Login with valid data: to Dashboard", async ({ page }) => {
    await loginUser(page);
    await expect(
      page.getByRole("heading", { name: "User Dashboard" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Your Events" }),
    ).toBeVisible();
  });

  test("Login with invalid email: email error", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email Address").fill("notreal@fakeemail.com");
    await page.getByLabel("Password").fill(AUTH_MOCK_USER.password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("E-mail address not found")).toBeVisible();
  });

  test("Login with invalid password: password error", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email Address").fill(AUTH_MOCK_USER.email);
    await page.getByLabel("Password").fill("invalidpassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Invalid password")).toBeVisible();
  });
});

describe("User Update Tests", () => {
  test("Update w/ valid data: to Dashboard", async ({ page }) => {
    await loginUser(page);
    await page.getByRole("button", { name: "Update Personal Info" }).click();
    await expect(
      page.getByRole("heading", { name: "Update Personal Info" }),
    ).toBeVisible();
    await page.getByLabel("First Name").fill(AUTH_MOCK_USER_UPDATE.firstName);
    await page.getByLabel("Last Name").fill(AUTH_MOCK_USER_UPDATE.lastName);
    await page.getByLabel("Email Address").fill(AUTH_MOCK_USER_UPDATE.email);
    await page.getByLabel("Phone").fill(AUTH_MOCK_USER_UPDATE.phone);
    await page
      .getByLabel("Address", { exact: true })
      .fill(AUTH_MOCK_USER_UPDATE.address);
    await page.getByLabel("City").fill(AUTH_MOCK_USER_UPDATE.city);
    await page.getByLabel("State").fill(AUTH_MOCK_USER_UPDATE.state);
    await page.getByLabel("Zip").fill(AUTH_MOCK_USER_UPDATE.zip);
    await page
      .getByRole("button", { name: "Update Personal Information" })
      .click();

    await expect(
      page.getByRole("heading", { name: "User Dashboard" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Your Events" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        `${AUTH_MOCK_USER_UPDATE.firstName} ${AUTH_MOCK_USER_UPDATE.lastName}`,
      ),
    ).toBeVisible();
    await expect(page.getByText(AUTH_MOCK_USER_UPDATE.email)).toBeVisible();
    await expect(page.getByText(AUTH_MOCK_USER_UPDATE.address)).toBeVisible();
    await expect(page.getByText(AUTH_MOCK_USER_UPDATE.city)).toBeVisible();
    await expect(page.getByText(AUTH_MOCK_USER_UPDATE.zip)).toBeVisible();
  });

  test("Update w/ invalid phone: phone error", async ({ page }) => {
    await loginUser(page);
    await page.getByRole("button", { name: "Update Personal Info" }).click();
    await expect(
      page.getByRole("heading", { name: "Update Personal Info" }),
    ).toBeVisible();
    await page.getByLabel("First Name").fill(AUTH_MOCK_USER_UPDATE.firstName);
    await page.getByLabel("Last Name").fill(AUTH_MOCK_USER_UPDATE.lastName);
    await page.getByLabel("Email Address").fill(AUTH_MOCK_USER_UPDATE.email);
    await page.getByLabel("Phone").fill("(123) 333-33333");
    await page
      .getByLabel("Address", { exact: true })
      .fill(AUTH_MOCK_USER_UPDATE.address);
    await page.getByLabel("City").fill(AUTH_MOCK_USER_UPDATE.city);
    await page.getByLabel("State").fill(AUTH_MOCK_USER_UPDATE.state);
    await page.getByLabel("Zip").fill(AUTH_MOCK_USER_UPDATE.zip);
    await page
      .getByRole("button", { name: "Update Personal Information" })
      .click();
    await expect(
      page.getByText("A valid phone number is required"),
    ).toBeVisible();
  });
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
