import { accessTokenSecret, refreshTokenSecret } from "@/index";
import { Response } from "express";
import jwt from "jsonwebtoken";

//
// jwt cookie expiration times
//

const accessTokenExpiration = "15m";
const refreshTokenExpiration = "14d";

//
// jwt cookie options
// httpOnly: cookie cannot be accessed by client-side scripts
//

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

//
// set jwt accessToken as an http-only cookie
// with custom payload option
//

export const setJwtAccessTokenCookie = <T extends object>(
  res: Response,
  payload: T,
) => {
  if (!accessTokenSecret) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: accessTokenExpiration,
  });

  res.cookie("accessToken", accessToken, cookieOptions);
};

//
// set jwt refreshToken as an http-only cookie
// refresh tokens are used to generate new access tokens
// and contains only a userId
//

export const setJwtRefreshTokenCookie = (res: Response, userId: string) => {
  if (!refreshTokenSecret) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiration,
  });

  res.cookie("refreshToken", refreshToken, cookieOptions);
};
