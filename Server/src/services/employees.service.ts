import { error } from "console";
import { UserSiftModel } from "../models/shift.models";

export const employeeService = {
  async shift(userid: string) {
    const userShift = UserSiftModel.find({ userId: userid });
    if (!userShift) {
      throw new Error("No shift found");
    }
    return userShift;
  },
};
