import { Request, Response } from "express";

export const userGet = async (req: Request, res: Response) => {
  res.json({ action: "user get: get user details" });
};

export const userPost = async (req: Request, res: Response) => {
  res.json({ action: "user post: update user details" });
};

export const userLogin = async (req: Request, res: Response) => {
  res.json({ action: "user login" });
};

export const userLogout = async (req: Request, res: Response) => {
  res.json({ action: "user logout" });
};

export const userSignup = async (req: Request, res: Response) => {
  res.json({ action: "user signup", data: req.body });
};
