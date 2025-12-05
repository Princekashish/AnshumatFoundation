import { Request, Response } from "express";
import { adminService } from "../../services/admin.service";
import { AuthRequest } from "../../middlewares/authvalidate";
import { role } from "../../validator/role.validator";
import { UserSiftModel } from "../../models/shift.models";

export const adminController = {
  async userlist(req: Request, res: Response) {
    try {
      const employeelist = await adminService.userlist();
      return res.status(200).json({ employeelist });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  async shiftCreate(req: AuthRequest, res: Response) {
    try {
      const userid = req.user?.id;
      if (!userid) return res.status(400).json({ message: "No user Found" });
      const userID = await role(userid);
      if (!userID) return res.status(400).json({ message: "No user Found" });
      const shift = await adminService.shiftCreate(req.body, userID, userid);
      return res.status(201).json({ success: true, shift });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  async deletShift(req: AuthRequest, res: Response) {
    try {
      const { shiftId } = req.body;

      if (!shiftId) {
        return res.status(400).json({ message: "Shift ID is required" });
      }

      const shift = await UserSiftModel.findById(shiftId);

      if (!shift) {
        return res.status(404).json({ message: "Shift not found" });
      }

      await UserSiftModel.findByIdAndDelete(shiftId);

      return res.status(200).json({ message: "Shift deleted successfully" });
    } catch (err) {
      console.error("Error deleting shift:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  async shiftlist(req: AuthRequest, res: Response) {
    try {
      const userid = req.user?.id;
      if (!userid) return res.status(400).json({ message: "No user Found" });
      const userID = await role(userid);
      if (!userID) return res.status(400).json({ message: "No user Found" });
      const shift = await adminService.shiftlist(userID, req.query, userid);
      return res.status(200).json({ success: true, shift });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
};
