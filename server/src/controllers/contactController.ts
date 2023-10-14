import sendContactFormEmail from "@/services/templates/contactFormEmail";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const contactPost = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name is required."),
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Email address is invalid.")
    .normalizeEmail(),
  body("message")
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage("Messages must be between 1 and 2000 characters."),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    // validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({
        sent: false,
        msg: "Failed to validate contact form data.",
        errors: errors.array(),
      });
    }
    // send email
    try {
      const { name, email, message } = req.body;
      if (!req.app.get("testMode"))
        await sendContactFormEmail({ name, email, message });
      res.json({ msg: "Successful contact form submission", sent: true });
    } catch (err) {
      console.error("Contact form submission error:", err);
      res
        .status(500)
        .json({ msg: "Failed to submit contact form.", sent: false });
    }
  },
];
