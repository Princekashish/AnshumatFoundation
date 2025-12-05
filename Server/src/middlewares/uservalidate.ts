import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validate_request =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(400).json({ message: "Validation error", err });
    }
  };
