import { OWNERS_EMAILS } from "@/config";
import { sendEmail } from "@/services/emailService";
import { baseEmailTemplate } from "@/services/templates/baseEmailTemplate";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const contactPost = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name is required."),
  body("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Email address is invalid.")
    .toLowerCase()
    .normalizeEmail()
    .isLength({ min: 1, max: 320 })
    .withMessage("Email is required."),
  body("message")
    .trim()
    .escape()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Messages must be between 1 and 2000 characters."),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    // signup data failed validation checks
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: "Failed to validate contact form data.",
        errors: errors.array(),
      });
    }

    try {
      const { name, email, message } = req.body;

      const subject = "Garnished Contact Form Submission";
      const header = "Contact Form Submission";
      const content = `
      <p><strong>Name</strong>: ${name}</p>
      <p><strong>Email</strong>: ${email}</p>
      <p><strong>Message</strong>: ${message}</p>
      `;

      const html = baseEmailTemplate({ header, content });

      await sendEmail({ to: OWNERS_EMAILS, subject, html });

      res.json({ msg: "successful contact form submission" });
    } catch (err) {
      console.error("contact form submission error:", err);
      res.status(500).json({ msg: "Failed to submit contact form" });
    }
  },
];
