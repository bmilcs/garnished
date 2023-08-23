import { OWNERS_EMAILS } from "@/config/env";
import { TEventDocument } from "@/models/event";
import { TUserDocument } from "@/models/user";
import { sendEmail } from "@/services/emailService";
import { baseEmailTemplate } from "./baseEmailTemplate";

type TNewEventEmailTemplate = {
  user: TUserDocument;
  event: TEventDocument;
};

const sendNewEventEmailToOwners = async ({
  user,
  event,
}: TNewEventEmailTemplate) => {
  const subject = "New Event Quote Request!";
  const header = "New Event Quote Request";

  const userDetails = {
    "First Name": user.firstName,
    "Last Name": user.lastName,
    Email: user.username,
    Address: user.address,
    City: user.city,
    State: user.state,
    Zip: user.zip,
    Phone: user.phone,
  };

  const eventDetails = {
    "Event Type": event.eventType,
    "Event Date": new Date(event.date).toLocaleDateString(),
    "Event Time": event.time,
    "Event Hours": event.hours,
    "Event Address": `${event.address}, ${event.city}, ${event.state} ${event.zip}`,
    "Event Location": event.locationDescription,
    "Number of Guests": event.guests,
    Bar: event.needBar ? "Yes" : "No",
    Tent: event.needTent ? "Yes" : "No",
    Alcohol: event.needAlcohol ? "Yes" : "No",
    "Running Water": event.needRunningWater ? "Yes" : "No",
    Refrigeration: event.needRefrigeration ? "Yes" : "No",
    Drinkware: event.needDrinkware ? "Yes" : "No",
    Beer: event.beer ? "Yes" : "No",
    Wine: event.wine ? "Yes" : "No",
    "Specialty Drinks": event.specialtyDrinks ? "Yes" : "No",
    "Liquor Preferences": event.liquorPreferences,
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

export default sendNewEventEmailToOwners;
