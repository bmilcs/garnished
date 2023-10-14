import { OWNERS_EMAILS } from "@/config/env";
import { sendEmail } from "@/services/emailService";
import { baseEmailTemplate } from "./baseEmailTemplate";

const sendContactFormEmail = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const subject = "Garnished Contact Form Submission";
  const header = "Contact Form Submission";
  const content = `
      <p><strong>Name</strong>: ${name}</p>
      <p><strong>Email</strong>: ${email}</p>
      <p><strong>Message</strong>: ${message}</p>
      `;
  const html = baseEmailTemplate({ header, content });
  await sendEmail({ to: OWNERS_EMAILS, subject, html });
};

export default sendContactFormEmail;
