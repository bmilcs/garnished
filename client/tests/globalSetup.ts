import { Browser, FullConfig, chromium } from "@playwright/test";
import { MOCK_USER } from "setup";

// this global setup script will run once before all tests
// it logs a test user in and saves the cookies to authState.json

export default async function (config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL;
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${baseURL}/login`);
  await page.getByLabel("Email Address").fill(MOCK_USER.email);
  await page.getByLabel("Password", { exact: true }).fill(MOCK_USER.password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.context().storageState({ path: "./tests/authState.json" });
  await browser.close();
}
