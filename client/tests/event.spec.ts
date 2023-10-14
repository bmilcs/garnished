import { expect, test } from "@playwright/test";
import { describe } from "node:test";
import { loginUser } from "utils/authentication";
import { formatDate } from "utils/formatters";
import {
  MOCK_EVENT,
  MOCK_EVENT_UPDATE,
  STATIC_MOCK_USER_1,
} from "utils/mockData";

describe("Create Event Tests", () => {
  test("Create event with valid data > Event Page", async ({ page }) => {
    await loginUser(page, STATIC_MOCK_USER_1);
    await page.getByRole("button", { name: "Create New Event" }).click();
    await expect(
      page.getByRole("heading", { name: "Create Event" }),
    ).toBeVisible();

    // fill out details & submit form
    await page.getByLabel("Event Date").fill(MOCK_EVENT.date);
    await page.getByLabel("Event Date").fill(MOCK_EVENT.date);
    await page.getByLabel("Event Starting Time").fill(MOCK_EVENT.time);
    await page.getByLabel("Event Address").fill(MOCK_EVENT.address);
    await page.getByLabel("Event City").fill(MOCK_EVENT.city);
    await page.getByLabel("Event State").fill(MOCK_EVENT.state);
    await page.getByLabel("Event Zip Code").fill(MOCK_EVENT.zip);
    await page
      .getByLabel("Directions / Location Description")
      .fill(MOCK_EVENT.locationDescription);
    await page.getByLabel("Type of Event").fill(MOCK_EVENT.eventType);
    await page.getByLabel("Guest Count").fill(MOCK_EVENT.guests.toString());
    // services
    MOCK_EVENT.needBar && (await page.getByLabel("Mobile Bar").check());
    MOCK_EVENT.needTent && (await page.getByLabel("Tent").check());
    MOCK_EVENT.needAlcohol && (await page.getByLabel("Alcohol").check());
    MOCK_EVENT.needDrinkware &&
      (await page.getByLabel("Disposable Drinkware").check());
    // beverages
    MOCK_EVENT.beer && (await page.getByLabel("Beer").check());
    MOCK_EVENT.wine && (await page.getByLabel("Wine").check());
    MOCK_EVENT.specialtyDrinks &&
      (await page.getByLabel("Specialty Drinks").check());
    // submit form
    await page.getByRole("button", { name: "Submit Estimate Request" }).click();

    // modal should appear > click "View Event Details"
    await expect(page.getByRole("heading", { name: "Success!" })).toBeVisible();
    await page.getByRole("button", { name: "View Event Details" }).click();

    // should be redirected to event page: event details should be visible
    await expect(
      page.getByRole("heading", { name: "Your Event" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        `${MOCK_EVENT.city}, ${MOCK_EVENT.state} ${MOCK_EVENT.zip}`,
      ),
    ).toBeVisible();
    await expect(page.getByText(MOCK_EVENT.locationDescription)).toBeVisible();
    await expect(page.getByText(MOCK_EVENT.eventType)).toBeVisible();
    // services
    MOCK_EVENT.needTent && (await expect(page.getByText("Tent")).toBeVisible());
    MOCK_EVENT.needBar &&
      (await expect(
        page.getByText("Mobile Bar", { exact: true }),
      ).toBeVisible());
    MOCK_EVENT.needAlcohol &&
      (await expect(page.getByText("Alcohol")).toBeVisible());
    MOCK_EVENT.needDrinkware &&
      (await expect(page.getByText("Drinkware")).toBeVisible());
    // beverages
    MOCK_EVENT.beer && (await expect(page.getByText("Beer")).toBeVisible());
    MOCK_EVENT.wine && (await expect(page.getByText("Wine")).toBeVisible());
    MOCK_EVENT.specialtyDrinks &&
      (await expect(page.getByText("Specialty Drinks")).toBeVisible());
  });
});

describe("Update Event Tests", () => {
  test("Update event with valid data > Event Page", async ({ page }) => {
    await loginUser(page, STATIC_MOCK_USER_1);
    const eventLink = `${formatDate(MOCK_EVENT.date)} - ${
      MOCK_EVENT.eventType
    }`;
    await page.getByText(eventLink).nth(0).click();
    await expect(
      page.getByRole("heading", { name: "Your Event" }),
    ).toBeVisible();

    // edit event button > edit event page
    await page.getByRole("button", { name: "Edit Event" }).click();
    await expect(
      page.getByRole("heading", { name: "Update Event Info" }),
    ).toBeVisible();

    // fill out details
    await page.getByLabel("Event Date").fill(MOCK_EVENT_UPDATE.date);
    await page.getByLabel("Event Date").fill(MOCK_EVENT_UPDATE.date);
    await page.getByLabel("Event Starting Time").fill(MOCK_EVENT_UPDATE.time);
    await page.getByLabel("Event Address").fill(MOCK_EVENT_UPDATE.address);
    await page.getByLabel("Event City").fill(MOCK_EVENT_UPDATE.city);
    await page.getByLabel("Event State").fill(MOCK_EVENT_UPDATE.state);
    await page.getByLabel("Event Zip Code").fill(MOCK_EVENT_UPDATE.zip);
    await page
      .getByLabel("Directions / Location Description")
      .fill(MOCK_EVENT_UPDATE.locationDescription);
    await page.getByLabel("Type of Event").fill(MOCK_EVENT_UPDATE.eventType);
    await page
      .getByLabel("Guest Count")
      .fill(MOCK_EVENT_UPDATE.guests.toString());
    // services
    MOCK_EVENT_UPDATE.needBar && (await page.getByLabel("Mobile Bar").check());
    MOCK_EVENT_UPDATE.needTent && (await page.getByLabel("Tent").check());
    MOCK_EVENT_UPDATE.needAlcohol && (await page.getByLabel("Alcohol").check());
    MOCK_EVENT_UPDATE.needDrinkware &&
      (await page.getByLabel("Disposable Drinkware").check());
    // beverages
    MOCK_EVENT_UPDATE.beer && (await page.getByLabel("Beer").check());
    MOCK_EVENT_UPDATE.wine && (await page.getByLabel("Wine").check());
    MOCK_EVENT_UPDATE.specialtyDrinks &&
      (await page.getByLabel("Specialty Drinks").check());
    // submit update
    await page.getByRole("button", { name: "Update Event Details" }).click();

    // should be redirected to event page: event details should be visible
    await expect(
      page.getByRole("heading", { name: "Your Event" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        `${MOCK_EVENT_UPDATE.city}, ${MOCK_EVENT_UPDATE.state} ${MOCK_EVENT_UPDATE.zip}`,
      ),
    ).toBeVisible();
    await expect(
      page.getByText(MOCK_EVENT_UPDATE.locationDescription),
    ).toBeVisible();
    await expect(page.getByText(MOCK_EVENT_UPDATE.eventType)).toBeVisible();
    // services
    MOCK_EVENT_UPDATE.needTent &&
      (await expect(page.getByText("Tent")).toBeVisible());
    MOCK_EVENT_UPDATE.needBar &&
      (await expect(
        page.getByText("Mobile Bar", { exact: true }),
      ).toBeVisible());
    MOCK_EVENT_UPDATE.needAlcohol &&
      (await expect(page.getByText("Alcohol")).toBeVisible());
    MOCK_EVENT_UPDATE.needDrinkware &&
      (await expect(page.getByText("Drinkware")).toBeVisible());
    // beverages
    MOCK_EVENT_UPDATE.beer &&
      (await expect(page.getByText("Beer")).toBeVisible());
    MOCK_EVENT_UPDATE.wine &&
      (await expect(page.getByText("Wine")).toBeVisible());
    MOCK_EVENT_UPDATE.specialtyDrinks &&
      (await expect(page.getByText("Specialty Drinks")).toBeVisible());
  });
});

describe("Delete Event Tests", () => {
  test("Delete event > Modal > User Dashboard", async ({ page }) => {
    await loginUser(page, STATIC_MOCK_USER_1);
    const eventLink = `${formatDate(MOCK_EVENT_UPDATE.date)} - ${
      MOCK_EVENT_UPDATE.eventType
    }`;
    await page.getByText(eventLink).nth(0).click();
    await expect(
      page.getByRole("heading", { name: "Your Event" }),
    ).toBeVisible();
    // edit event
    await page.getByRole("button", { name: "Edit Event" }).click();
    await expect(
      page.getByRole("heading", { name: "Update Event Info" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Delete Event" }).click();
    // modal confirmation
    await expect(
      page.getByRole("heading", { name: "Delete Event?" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Delete Event" }).nth(1).click();
    // should be on user dashboard
    await expect(
      page.getByRole("heading", { name: "User Dashboard" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: eventLink })).not.toBeVisible();
  });
});
