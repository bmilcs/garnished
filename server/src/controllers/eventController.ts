import { Request, Response } from "express";

export const eventGet = (req: Request, res: Response) => {
  res.json({ action: "event get" });
};

export const eventPost = (req: Request, res: Response) => {
  res.json({ action: "event post" });
};
