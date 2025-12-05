import { UserModel } from "../models/user.models";
import { UserSiftModel } from "../models/shift.models";

export const adminService = {
  async userlist() {
    return await UserModel.find({ role: "user" });
  },
  async shiftCreate(
    data: {
      userId: string;
      start_time: string;
      end_time: string;
      date: string;
    },
    userID: { role: string },
    userid: string
  ) {
    // --- Role/Ownership validation --- //
    if (userID.role !== "admin" && data.userId !== userid) {
      throw new Error("Users can only create their own shifts");
    }

    const userData = userID.role === "admin" ? data.userId : userid;

    // --- Convert "HH:mm" + date into full Date objects --- //
    const start = new Date(`${data.date}T${data.start_time}:00`);
    const end = new Date(`${data.date}T${data.end_time}:00`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid start_time or end_time format");
    }

    // --- Condition 2: Minimum duration 4 hours --- //
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (hours < 4) {
      throw new Error("Shift must be at least 4 hours long");
    }

    // --- Condition 1: Check for overlapping shifts --- //
    const overlappingShift = await UserSiftModel.findOne({
      userId: userData,
      date: data.date, // check only on the same date
      start_time: { $lt: end },
      end_time: { $gt: start },
    });

    if (overlappingShift) {
      throw new Error("Shift overlaps with an existing shift for this user");
    }

    // --- Create shift --- //
    const doc = new UserSiftModel({
      userId: userData,
      date: data.date,
      start_time: start,
      end_time: end,
    });

    return doc.save();
  },
  async shiftlist(
    userID: { role: string; employeeCode: string },
    filters: any,
    userid: string
  ) {
    let query: any = {};

    // Admin filtering
    if (userID.role === "admin") {
      // ✔ Filter by employeeCode (lookup user first)
      if (filters.employeeCode) {
        const user = await UserModel.findOne({
          employeeCode: filters.employeeCode,
        });

        if (!user) return [];
        query.userId = user._id;
      }

      // ✔ Filter by date
      if (filters.date) {
        const start = new Date(filters.date);
        const end = new Date(filters.date);
        end.setHours(23, 59, 59, 999);

        query.createdAt = { $gte: start, $lte: end };
      }
    }

    // Non-admin: only their shifts
    else {
      query.userId = userid;

      if (filters.date) {
        const start = new Date(filters.date);
        const end = new Date(filters.date);
        end.setHours(23, 59, 59, 999);

        query.createdAt = { $gte: start, $lte: end };
      }
    }

    return await UserSiftModel.find(query).populate(
      "userId",
      "employeeCode user"
    );
  },
};
