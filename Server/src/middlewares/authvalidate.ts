import { NextFunction, Request, Response } from "express";
import { DecodedUser, verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: DecodedUser;
}

export const authValidator = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token as string | undefined;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
