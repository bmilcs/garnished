import {
  FAILED_LOGIN_ATTEMPTS_LIMIT,
  FAILED_LOGIN_TIME_WINDOW_IN_SECONDS,
} from "@/config/env";
import rateLimiter from "express-rate-limit";

export const loginLimiter = rateLimiter({
  max: FAILED_LOGIN_ATTEMPTS_LIMIT,
  windowMs: FAILED_LOGIN_TIME_WINDOW_IN_SECONDS * 60 * 1000,
  handler: function (req, res /*, next*/) {
    res
      .status(429)
      .json({ msg: "Too many failed login attempts. Try again later." });
  },
});
