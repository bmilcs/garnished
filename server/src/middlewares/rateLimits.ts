import {
  FAILED_LOGIN_ATTEMPTS_LIMIT,
  FAILED_LOGIN_TIME_WINDOW_IN_SECONDS,
} from "@/config/env";
import crypto from "crypto";
import rateLimiter from "express-rate-limit";

export const loginLimiter = rateLimiter({
  max: FAILED_LOGIN_ATTEMPTS_LIMIT,
  windowMs: FAILED_LOGIN_TIME_WINDOW_IN_SECONDS * 60 * 1000,
  handler: function (req, res) {
    res
      .status(429)
      .json({ msg: "Too many failed login attempts. Try again later." });
  },
  keyGenerator: function (req) {
    // allow playwright authentication tests
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const localTest = fullUrl === "http://localhost:3001/user/login";
    if (localTest) {
      const randomKey = crypto.randomBytes(16).toString("hex");
      return randomKey;
    }
    return req.body.username;
  },
});
