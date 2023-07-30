import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret } from "../index";
import { IAuthRequest, TJwtPayload } from "../middlewares/authenticate";
import {
  setJwtAccessTokenCookie,
  setJwtRefreshTokenCookie,
} from "../middlewares/setJwtCookies";
import UserModel, { TUserDocument } from "../models/user";

//
// GET user auth status
// checks if user is authenticated based on jwt cookies
//

export const userAuthStatus = async (req: IAuthRequest, res: Response) => {
  // prevent further action if token secrets are missing on backend
  if (!accessTokenSecret || !refreshTokenSecret) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  const { accessToken, refreshToken } = req.cookies;

  // no tokens were provided, block access
  if (!accessToken || !refreshToken) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    jwt.verify(accessToken, accessTokenSecret) as TJwtPayload;
    // access token is valid / user is authenticated
    return res.status(200).json({ authenticated: true });
  } catch {
    // access token is invalid/expired: check if refresh token is valid/expired
    try {
      jwt.verify(refreshToken, refreshTokenSecret) as TJwtPayload;
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
  const user: TUserDocument | null = await UserModel.findById(req.userId, {
    password: 0,
  }).populate("events", { _id: 1, date: 1 });

  res.json({ msg: "Successful user get", user });
};

//
// POST user details request
//

export const userPost = async (req: Request, res: Response) => {
  res.json({ action: "user post: update user details" });
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
    if (!accessTokenSecret || !refreshTokenSecret) {
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
// POST user signup request
// Sanitized & validated with middleware/validateUserData.ts
//

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
  },
];
