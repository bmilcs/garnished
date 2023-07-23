import { Response } from "express";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../index";

// set jwt access_token as an http-only cookie
export const setJwtCookie = (res: Response, userId: string) => {
  if (!accessTokenSecret) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  const access_token = jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: "1h",
  });

  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};
