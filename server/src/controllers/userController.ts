import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/config/env";
import { IAuthRequest, TJwtPayload } from "@/middlewares/authenticate";
import {
  setJwtAccessTokenCookie,
  setJwtRefreshTokenCookie,
} from "@/middlewares/setJwtCookies";
import UserModel, { TUserDocument } from "@/models/user";
import sendWelcomeEmail from "@/services/templates/welcomeEmail";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

//
// GET user auth status
// checks if user is authenticated based on jwt cookies
//

export const userAuthStatus = async (req: IAuthRequest, res: Response) => {
  // prevent further action if token secrets are missing on backend
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  const { accessToken, refreshToken } = req.cookies;

  // no tokens were provided, block access
  if (!accessToken || !refreshToken) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as TJwtPayload;
    // access token is valid / user is authenticated
    return res.status(200).json({ authenticated: true });
  } catch {
    // access token is invalid/expired: check if refresh token is valid/expired
    try {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as TJwtPayload;
      // refresh token is valid / user is authenticated
      return res.status(200).json({ authenticated: true });
    } catch {
      return res.status(200).json({ authenticated: false });
    }
  }
};

//
// GET user details request
//

export const userGet = async (req: IAuthRequest, res: Response) => {
  // get user details from the database, omit password
  const user = await UserModel.findById(req.userId, {
    password: 0,
  }).populate("events", { _id: 1, date: 1, eventType: 1 });

  if (!user) return res.status(400).json({ msg: "User not found." });

  res.json({ msg: "Successful user get", user });
};

//
// POST user logout request
//

export const userLogout = async (req: Request, res: Response) => {
  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({ msg: "Successful user logout." });
};

//
// GET user login request
//

export const userLogin = [
  // sanitize user input
  body("username").trim().escape(),
  body("password").trim().escape(),

  // process request after sanitization
  async (req: Request, res: Response) => {
    // prevent further action if token secrets are missing on backend
    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      return res
        .status(500)
        .json({ msg: "Internal server error.", authenticated: false });
    }

    // retrieve user from database
    // user id/password are the only fields necessary to login
    const { username, password } = req.body;
    const user: TUserDocument | null = await UserModel.findOne(
      {
        username: username.toLowerCase(),
      },
      { _id: 1, password: 1 },
    );

    // user does not exist in database
    if (!user) {
      return res
        .status(400)
        .json({ msg: "E-mail address not found.", authenticated: false });
    }

    // user exists: check if password is correct
    user.comparePassword(password, (err: any, isMatch: boolean) => {
      // compare passwords function error
      if (err) {
        return res
          .status(500)
          .json({ msg: "Internal server error.", authenticated: false });
      }

      // password is incorrect
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalid password.", authenticated: false });
      }

      setJwtRefreshTokenCookie(res, user._id.toString());
      setJwtAccessTokenCookie(res, {
        userId: user._id.toString(),
      });

      res
        .status(200)
        .json({ msg: "Successful user login.", authenticated: true });
    });
  },
];

//
// POST user details request
//

export const userPost = [
  body("username")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Email address is invalid.")
    .toLowerCase()
    .normalizeEmail()
    .isLength({ min: 1, max: 320 })
    .withMessage("Email is required."),
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
  body("username")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Email address is invalid.")
    .toLowerCase()
    .normalizeEmail()
    .isLength({ min: 1, max: 320 })
    .withMessage("Email is required."),
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
    .escape()
    .trim()
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
    .withMessage("A valid phone number is required."),

  async (req: IAuthRequest, res: Response) => {
    // process request after validation and sanitization
    const errors = validationResult(req);

    // failed validation checks
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: "Failed to validate user data.", errors: errors.array() });
    }

    // get user from database without updating it. we first
    // need to check if username is already registered before updating
    const user = await UserModel.findById({ _id: req.userId });

    if (!user) {
      return res.status(400).json({ msg: "User not found.", updated: false });
    }

    // make sure new username is not already registered
    if (user.username !== req.body.username) {
      const usernameExists = await UserModel.findOne({
        username: req.body.username,
      });

      if (usernameExists) {
        const customExpressValidatorError = [
          {
            type: "field",
            location: "body",
            path: "username",
            value: req.body.username,
            msg: "E-mail address already registered.",
          },
        ];

        return res.status(400).json({
          msg: "Email already registered.",
          errors: customExpressValidatorError,
          updated: false,
        });
      }
    }

    // update user details
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.username = req.body.username;
    user.city = req.body.city;
    user.state = req.body.state;
    user.zip = req.body.zip;
    user.phone = req.body.phone;
    user.address = req.body.address;
    await user.save();

    res.json({ msg: "Successful user update.", updated: true });
  },
];

//
// POST user signup request
// Sanitized & validated with middleware/validateUserData.ts
//

export const userSignup = [
  body("username")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Email address is invalid.")
    .toLowerCase()
    .normalizeEmail()
    .isLength({ min: 1, max: 320 })
    .withMessage("Email is required.")
    .custom(async (value: string) => {
      // check if email is already registered
      return UserModel.findOne({ username: value.toLowerCase() }).then(user => {
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
  body("username")
    .trim()
    .escape()
    .isEmail()
    .withMessage("Email address is invalid.")
    .toLowerCase()
    .normalizeEmail()
    .isLength({ min: 1, max: 320 })
    .withMessage("Email is required."),
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
    .withMessage("A valid phone number is required."),

  // process request after validation and sanitization
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    // signup data failed validation checks
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ msg: "Failed to validate user data.", errors: errors.array() });
    }

    const user = new UserModel(req.body);
    await user.save();

    setJwtRefreshTokenCookie(res, user._id.toString());
    setJwtAccessTokenCookie(res, {
      userId: user._id.toString(),
    });

    res.json({ msg: "Successful user signup.", authenticated: true });

    if (user.username) sendWelcomeEmail(user.username);
  },
];
