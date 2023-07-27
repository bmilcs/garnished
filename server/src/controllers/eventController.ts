import { IAuthRequest } from "@/middlewares/authenticate";
import EventModel from "@/models/event";
import UserModel from "@/models/user";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

//
// GET event details
//

export const eventGet = async (req: IAuthRequest, res: Response) => {
  try {
    const event = await EventModel.findById(req.params.id).populate("user");

    // make sure that the request user is the user associated with the event
    if (event?.user[0]._id.toString() !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized." });
    }

    res.json({ msg: "Successful event get.", event });
  } catch {
    res.status(500).json({ msg: "Internal server error." });
  }
};

//
// POST create event
//

export const eventCreatePost = [
  // validate and sanitize user input
  body("date")
    .trim()
    .escape()
    .isLength({ min: 10, max: 10 })
    .withMessage("A valid date is required."),
  body("time")
    .trim()
    .escape()
    .isLength({ min: 5, max: 5 })
    .withMessage("A valid time is required."),
  body("locationDescription")
    .trim()
    .escape()
    .isLength({ min: 10, max: 250 })
    .withMessage(
      "Please give a description of where on the premises the event will be held.",
    ),
  body("address")
    .trim()
    .escape()
    .isLength({ min: 1, max: 200 })
    .withMessage("A valid address is required."),
  body("city")
    .trim()
    .escape()
    .isLength({ min: 1, max: 100 })
    .withMessage("A valid city is required."),
  body("state")
    .trim()
    .escape()
    .isLength({ min: 2, max: 2 })
    .withMessage("A valid 2 letter state is required."),
  body("zip")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("A valid zip code is required: numbers only.")
    .isLength({ min: 5, max: 5 })
    .withMessage("Zip codes must be 5 characters long."),
  body("guests")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("A valid number of guests is required: numbers only.")
    .isLength({ min: 1, max: 10 })
    .withMessage("Guest count must be 1 to 10 digits long."),
  body("hours")
    .trim()
    .escape()
    .isNumeric()
    .withMessage("A valid number of hours is required: numbers only.")
    .isLength({ min: 1, max: 2 })
    .withMessage("Hour count must be 1 to 2 digits long."),
  body("eventType")
    .trim()
    .escape()
    .isLength({ min: 1, max: 200 })
    .withMessage("A valid event type is required."),
  body("needBar")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid bar need is required."),
  body("needTent")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid tent need is required."),
  body("needAlcohol")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid alcohol need is required."),
  body("needRunningWater")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid running water need is required."),
  body("needRefrigeration")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid refrigeration need is required."),
  body("needDrinkware")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid drinkware need is required."),
  body("beer")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid beer need is required."),
  body("wine")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid wine need is required."),
  body("specialtyDrinks")
    .trim()
    .escape()
    .isBoolean()
    .withMessage("A valid specialty drinks need is required."),
  body("liquorPreferences")
    .trim()
    .escape()
    .isLength({ min: 1, max: 300 })
    .withMessage("A valid liquor preference is required."),

  // process request after validation and sanitization
  async (req: IAuthRequest, res: Response) => {
    const errors = validationResult(req);

    // signup data failed validation checks
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: "Failed to validate event data.",
        errors: errors.array(),
      });
    }

    try {
      // get user data
      const user = await UserModel.findOne({ _id: req.userId });

      // create user event
      const event = new EventModel({ ...req.body, user: req.userId });
      event.save();

      // add event to user's events array
      user?.events.push(event._id);
      user?.save();

      res.json({ msg: "Successful create event.", eventId: event._id });
    } catch {
      res.status(500).json({ msg: "Internal server error." });
    }
  },
];

//
// POST update event details
//

export const eventUpdatePost = (req: Request, res: Response) => {
  res.json({ msg: "event post" });
};
