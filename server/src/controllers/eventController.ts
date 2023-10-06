import { DAYS_TO_PREPARE } from "@/config/env";
import { IAuthRequest } from "@/middlewares/authenticate";
import EventModel, { TEventDocument } from "@/models/event";
import UserModel, { TUserDocument } from "@/models/user";
import { sendEventEmailToOwners } from "@/services/templates/eventEmail";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { Response } from "express";
import { body, validationResult } from "express-validator";
import { isValidObjectId } from "mongoose";

//
// GET event details
//

export const eventGet = async (req: IAuthRequest, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ msg: "Event not found." });
    }

    const event = await EventModel.findById(req.params.id).populate("user");

    // make sure that the request user is the user associated with the event
    if (event?.user._id.toString() !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized." });
    }

    res.json({ msg: "Successful event get.", event });
  } catch (e) {
    console.error(e);
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
    .custom((value: string) => {
      // isDate() function isn't working after npm update. this is a workaround.
      const dateFormat = /^\d{4}\-\d{2}\-\d{2}$/;

      return !value.match(dateFormat)
        ? Promise.reject("Invalid date format.")
        : Promise.resolve();
    })
    .custom((value: string) => {
      // prevent customers from creating events unless there is DAYS_TO_PREPARE (days notice)
      const today = new Date();
      const eventDate = parseISO(value);
      const dateDifference = differenceInCalendarDays(eventDate, today);
      return dateDifference < DAYS_TO_PREPARE
        ? Promise.reject(
            `Events require at least ${DAYS_TO_PREPARE} days notice.`,
          )
        : Promise.resolve();
    }),
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
    .escape()
    .trim()
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
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid bar need is required."),
  body("needTent")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid tent need is required."),
  body("needAlcohol")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid alcohol need is required."),
  body("needDrinkware")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid drinkware need is required."),
  body("beer")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid beer need is required."),
  body("wine")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid wine need is required."),
  body("specialtyDrinks")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid specialty drinks need is required."),
  body("liquorPreferences").trim().escape().isLength({ max: 300 }),
  body("additionalInfo").trim().escape().isLength({ max: 1000 }),

  // process request after validation and sanitization
  async (req: IAuthRequest, res: Response) => {
    console.log(req.body);
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
      const user = (await UserModel.findOne({
        _id: req.userId,
      })) as TUserDocument;

      if (!user) return res.status(404).json({ msg: "User not found." });

      // create user event
      const event = new EventModel({
        ...req.body,
        user: user,
      }) as TEventDocument;
      event.save();

      // add event to user's events array
      user.events.push(event._id);
      user.save();

      res.json({ msg: "Successful create event.", eventId: event._id });

      // avoid sending emails in test mode
      if (req.app.get("testMode")) return;
      if (user && event)
        sendEventEmailToOwners({
          user,
          event,
          title: "New Event Quote Request!",
        });
    } catch (e) {
      console.error(e);
      res.status(500).json({ msg: "Internal server error." });
    }
  },
];

//
// POST update event details
//

export const eventUpdatePatch = [
  // validate and sanitize user input
  body("date")
    .trim()
    .escape()
    .custom((value: string) => {
      // isDate() function isn't working after npm update. this is a workaround.
      const dateFormat = /^\d{4}\-\d{2}\-\d{2}$/;

      return !value.match(dateFormat)
        ? Promise.reject("Invalid date format.")
        : Promise.resolve();
    })
    .custom((value: string) => {
      // prevent customers from creating events unless there is DAYS_TO_PREPARE (days notice)
      const today = new Date();
      const eventDate = parseISO(value);
      const dateDifference = differenceInCalendarDays(eventDate, today);
      return dateDifference < DAYS_TO_PREPARE
        ? Promise.reject(
            `Event changes require at least ${DAYS_TO_PREPARE} days notice.`,
          )
        : Promise.resolve();
    }),
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
    .escape()
    .trim()
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
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid bar need is required."),
  body("needTent")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid tent need is required."),
  body("needAlcohol")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid alcohol need is required."),
  body("needDrinkware")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid drinkware need is required."),
  body("beer")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid beer need is required."),
  body("wine")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid wine need is required."),
  body("specialtyDrinks")
    .trim()
    .escape()
    .customSanitizer(value => {
      return Boolean(value);
    })
    .isBoolean()
    .withMessage("A valid specialty drinks need is required."),
  body("liquorPreferences").trim().escape().isLength({ max: 300 }),
  body("additionalInfo").trim().escape().isLength({ max: 1000 }),

  // process request after validation and sanitization
  async (req: IAuthRequest, res: Response) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ msg: "Event not found." });
    }

    const errors = validationResult(req);

    // signup data failed validation checks
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: "Failed to validate event data.",
        errors: errors.array(),
      });
    }

    try {
      // get user data: needed for email to owners
      const user = (await UserModel.findOne({
        _id: req.userId,
      }).populate({
        // populate user.events with a single event matching the event that's being updated
        // this is to make sure that the user is the owner of the event
        path: "events",
        match: { _id: req.body._id },
        select: "_id",
      })) as TUserDocument;

      if (!user)
        return res.status(404).json({ msg: "User not found.", updated: false });

      if (user.events.length === 0)
        return res.status(401).json({ msg: "Unauthorized.", updated: false });

      // update event
      const event = (await EventModel.findOneAndUpdate(
        { _id: req.body._id },
        {
          ...req.body,
        },
      )) as TEventDocument;

      res.json({ msg: "Successful event update.", updated: true });

      // avoid sending emails in test mode
      if (req.app.get("testMode")) return;
      if (user && event)
        sendEventEmailToOwners({
          user,
          event,
          title: "An Event Has Been Updated!",
        });
    } catch (e) {
      console.error(e);
      res.status(500).json({ msg: "Internal server error." });
    }
  },
];

//
// DELETE event
//

export const eventDelete = async (req: IAuthRequest, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(404).json({ msg: "Event not found." });
    }

    // don't delete immediately: wait to confirm that the user is the event owner
    const event = (await EventModel.findById(req.params.id)) as TEventDocument;

    // event not found
    if (!event)
      return res.status(404).json({ msg: "Event not found.", deleted: false });

    // make sure that the request user is the user associated with the event
    if (event?.user.toString() !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized.", deleted: false });
    }

    // get user data
    const user = (await UserModel.findOne({
      _id: req.userId,
    })) as TUserDocument;

    if (!user)
      return res.status(404).json({ msg: "User not found.", deleted: false });

    // remove event from user's events array
    user.events = user.events.filter(
      eventId => eventId.toString() !== event._id.toString(),
    );

    // save user
    user.save();

    // delete event
    await EventModel.deleteOne({
      _id: req.params.id,
    });

    res.json({ msg: "Successful event delete.", deleted: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal server error." });
  }
};
