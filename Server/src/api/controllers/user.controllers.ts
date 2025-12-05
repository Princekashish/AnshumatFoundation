import { Request, Response } from "express";
import { userService } from "../../services/user.services";
import { AuthRequest } from "../../middlewares/authvalidate";

export const userController = {
  async registration(req: Request, res: Response) {
    try {
      const user = await userService.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { user, token } = await userService.login(req.body);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(202).json({ token, user });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  },
  async update(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.json({ message: "Unauthorized" });
      const user = await userService.update_user(req.body, userId);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  async profile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "user not found" });
      const user = await userService.profile(userId);
      return res.status(200).json({ success: true, user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  async logout(req: AuthRequest, res: Response) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({ message: "Logout failed" });
    }
  },
};
