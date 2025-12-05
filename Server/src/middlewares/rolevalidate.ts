import { NextFunction, Response } from "express";
import { AuthRequest } from "./authvalidate";
import { role } from "../validator/role.validator";

export const roleValidate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  if (!userId) return res.json({ message: "user not found" });
  const userRole = await role(userId);
  if (userRole?.role !== "admin") {
    return res.json({ message: "user is not admin " });
  }
  next();
};
