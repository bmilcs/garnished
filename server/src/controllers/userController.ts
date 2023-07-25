import { IAuthRequest, TJWTPayload } from "@/middlewares/authenticate.ts";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../index";
import { setJwtCookie } from "../middlewares/setJwtCookie.ts";
import UserModel, { TUserDocument } from "../models/user";

//
// GET user auth status
//

export const userAuthStatus = async (req: IAuthRequest, res: Response) => {
  // missing accessTokenSecret on backend
  if (!accessTokenSecret) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  const accessToken = req.cookies.access_token;

  // no accessToken provided, block access
  if (!accessToken) {
    return res.status(200).json({ authenticated: false });
  }

  // add userId to the request object if the accessToken is valid
  try {
    const decoded = jwt.verify(accessToken, accessTokenSecret) as TJWTPayload;
    req.userId = decoded.userId;
    return res.status(200).json({ authenticated: true });
  } catch (error) {
    return res.status(200).json({ authenticated: false });
  }
};

//
// GET user details request
//

export const userGet = async (req: IAuthRequest, res: Response) => {
  // get user details, omit password
  const user: TUserDocument | null = await UserModel.findById(req.userId, {
    password: 0,
  });

  // res.json({ msg: "successful user get" });
  res.json({ msg: "successful user get", user });
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
    .clearCookie("access_token")
    .status(200)
    .json({ msg: "successful user logout" });
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
    const { username, password } = req.body;

    // retrieve user from database
    const user: TUserDocument | null = await UserModel.findOne({
      username: username.toLowerCase(),
    });

    // email does not exist
    if (!user) {
      return res.status(400).json({ msg: "Invalid e-mail address." });
    }

    // email exists: check if password is correct
    user.comparePassword(password, (err: any, isMatch: boolean) => {
      // compare passwords function error
      if (err) {
        return res.status(500).json({ msg: "Internal server error." });
      }

      // password is incorrect
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password." });
      }

      // accessTokenSecret is missing on backend
      if (!accessTokenSecret) {
        return res.status(500).json({ msg: "Internal server error." });
      }

      setJwtCookie(res, user._id.toString());

      res.json({ msg: "successful user login" });
    });
  },
];

//
// POST user signup request
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

    if (!errors.isEmpty()) {
      // 400: bad request / client-side input fails validation
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new UserModel(req.body);
    await user.save();

    setJwtCookie(res, user._id.toString());

    res.json({ msg: "successful user signup", userId: user._id });
  },
];
