import { Request, Response } from "express";

const errorHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
};

export default errorHandler;
