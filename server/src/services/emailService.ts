import nodemailer from "nodemailer";
import { EMAIL_FROM, EMAIL_PASSWORD, EMAIL_USERNAME } from "../config";

//
// nodemailer transporter object: using gmail credentials
//

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

//
// send email function
//

type TSendEmail = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({
  to,
  subject,
  html,
}: TSendEmail): Promise<void> {
  const mailOptions = {
    from: EMAIL_FROM,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("message sent: %s", info.messageId);
  } catch (err) {
    console.log("error sending email:", err);
  }
}
