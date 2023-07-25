import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../index";

export type TJWTPayload = {
  userId: string;
};

export interface IAuthRequest extends Request {
  userId?: string;
}

// middleware to check authentication status
// adds .userId to the request object
const authenticate = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;

  // no accessToken provided, block access
  if (!accessToken) {
    return res.status(401).json({ msg: "Unauthorized." });
  }

  // missing accessTokenSecret on backend
  if (!accessTokenSecret) {
    return res.status(500).json({ msg: "Internal server error." });
  }

  // add userId to the request object if the accessToken is valid
  try {
    const decoded = jwt.verify(accessToken, accessTokenSecret) as TJWTPayload;
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized." });
  }
};

export default authenticate;
