import { OWNERS_EMAILS } from "@/config/env";
import { TEventDocument } from "@/models/event";
import { TUserDocument } from "@/models/user";
import { sendEmail } from "@/services/emailService";
import { baseEmailTemplate } from "./baseEmailTemplate";

type TNewEventEmailTemplate = {
  user: TUserDocument;
  event: TEventDocument;
  title: string;
};

export const sendEventEmailToOwners = async ({
  user,
  title = "New Event Quote Request!",
  event,
}: TNewEventEmailTemplate) => {
  const subject = title;
  const header = title;

  const userDetails = {
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.username,
    Phone: user.phone,
    Address: `${user.address}, ${user.city}, ${user.state} ${user.zip}`,
  };

  // Create a string of the drinks that the user selected
  const drinks = Object.entries(event.toObject())
    .filter(([key, value]) => {
      if (key !== "beer" && key !== "wine" && key !== "specialtyDrinks") {
        return false;
      }
      return value ? true : false;
    })
    .map(([key]) => key.toUpperCase())
    .join(", ");

  // Create a string of the services that the user selected
  const services = Object.entries(event.toObject())
    .filter(([key, value]) => {
      if (
        key !== "needBar" &&
        key !== "needTent" &&
        key !== "needAlcohol" &&
        key !== "needDrinkware"
      ) {
        return false;
      }
      return value ? true : false;
    })
    .map(([key]) => key.replace("need", "").toUpperCase())
    .join(", ");

  const eventDetails = {
    Event: `${event.eventType} on ${new Date(
      event.date,
    ).toLocaleDateString()} at ${event.time}`,
    "Event Hours": event.hours,
    "Number of Guests": event.guests,
    "Services Needed": services,
    "Drinks Needed": drinks,
    "Liquor Preferences": event.liquorPreferences || "",
    "Additional Details": event.additionalInfo || "",
    "Event Address": `${event.address}, ${event.city}, ${event.state} ${event.zip}`,
    "Event Location": event.locationDescription,
  };

  const userHTML = Object.entries(userDetails).reduce((acc, [key, value]) => {
    return `${acc}<p>${key}: ${value}</p>`;
  }, "");

  const eventHTML = Object.entries(eventDetails).reduce((acc, [key, value]) => {
    return `${acc}<p>${key}: ${value}</p>`;
  }, "");

  const content = `<h2>User Details</h2>
  ${userHTML}
  
  <h2>Event Details</h2>
  ${eventHTML}
  `;

  const html = baseEmailTemplate({
    header,
    content,
  });

  await sendEmail({ to: OWNERS_EMAILS, subject, html });
};
