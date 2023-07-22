import { Request, Response } from "express";
import UserModel from "../models/user";
const { validationResult, body } = require("express-validator");

// GET user details request
export const userGet = async (req: Request, res: Response) => {
  res.json({ action: "user get: get user details" });
};

// POST user details request
export const userPost = async (req: Request, res: Response) => {
  res.json({ action: "user post: update user details" });
};

// POST user login request
export const userLogin = async (req: Request, res: Response) => {
  res.json({ action: "user login" });
};

// POST user logout request
export const userLogout = async (req: Request, res: Response) => {
  res.json({ action: "user logout" });
};

// POST user signup request
export const userSignup = [
  // validate and sanitize user input
  body("firstName")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name is required."),
  body("lastName")
    .trim()
    .escape()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name is required."),
  body("email")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Email address is invalid.")
    .normalizeEmail()
    .isLength({ min: 1, max: 320 })
    .withMessage("Email is required.")
    .custom(async (value: string) => {
      // check if email is already registered
      return UserModel.findOne({ email: value.toLowerCase() }).then(user => {
        if (user) {
          return Promise.reject("Email address already registered.");
        }
      });
    }),
  body("password")
    .trim()
    .escape()
    .isLength({ min: 8, max: 50 })
    .withMessage("Password must be 8 to 50 characters."),
  body("address")
    .trim()
    .escape()
    .isLength({ min: 1, max: 200 })
    .withMessage("Address is required."),
  body("city")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("City is required."),
  body("state")
    .trim()
    .escape()
    .isLength({ min: 2, max: 2 })
    .withMessage("State is required."),
  body("zip")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("A valid zip code is required: numbers only.")
    .isLength({ min: 5, max: 5 })
    .withMessage("Zip codes must be 5 characters long."),
  body("phone")
    .trim()
    .escape()
    .customSanitizer((value: string) => {
      // remove all non-digit characters from the phone number
      return value.replace(/\D/g, "");
    })
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number is required."),

  // process request after validation and sanitization
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new UserModel(req.body);
    await user.save();

    res.json({ action: "user signup", userId: user._id });
  },
];
