import { UserModel } from "../models/user.models";

export const role = async (userId: string) => {
  return await UserModel.findById({ _id: userId });
};
