import { sendEmail } from "../emailService";
import { baseEmailTemplate } from "./baseEmailTemplate";

const sendWelcomeEmail = async (email: string) => {
  const subject = "Welcome to Garnished!";
  const header = "Welcome to Garnished!";
  const html = baseEmailTemplate({
    header,
    content: "Welcome to the party!!!!",
  });

  await sendEmail({ to: email, subject, html });
};

export default sendWelcomeEmail;
