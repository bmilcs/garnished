import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "@/config/env";
import { setJwtAccessTokenCookie } from "@/middlewares/setJwtCookies";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export type TJwtPayload = {
  userId: string;
};

export interface IAuthRequest extends Request {
  userId?: string;
}

//
// authenticate middleware: check authentication status based on jwt cookies
// - adds user details to request object
// - refreshes access token if expired
//

const authenticate = (req: IAuthRequest, res: Response, next: NextFunction) => {
  // token secrets missing on backend: block access
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  const { accessToken, refreshToken } = req.cookies;

  // request is missing tokens: user is not authenticated
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ msg: "Unauthorized." });
  }

  // decode access token
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as TJwtPayload;

    // accessToken is valid & hasn't expired
    req.userId = decoded.userId;
    return next();
  } catch {
    // access token is expired / invalid: attempt to refresh access token
    try {
      const decoded = jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
      ) as TJwtPayload;

      // refreshToken is valid: generate new accessToken
      setJwtAccessTokenCookie(res, { userId: decoded.userId });
      req.userId = decoded.userId;
      return next();
    } catch {
      // accessToken & refreshToken are invalid / expired
      return res.status(401).json({ msg: "Unauthorized." });
    }
  }
};

export default authenticate;
