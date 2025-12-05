import z from "zod";
import { UserModel } from "../models/user.models";
import { decrypt, encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";
import { registationSchema } from "../validator/user.validator";

export type User_profile = z.infer<typeof registationSchema>;

export const userService = {
  async register(data: { email: string; password: string; role: string }) {
    const userExist = await UserModel.findOne({ email: data.email });

    if (userExist) {
      throw new Error("User already exists");
    }
    const hashPassword = await encrypt(data.password);
    const doc = new UserModel({
      email: data.email,
      password: hashPassword,
      role: data.role,
    });

    return doc.save();
  },
  async login(data: { email: string; password: string }) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      throw new Error("user not exist");
    }
    const isMatch = await decrypt(data.password, user.password);
    if (!isMatch) {
      throw new Error("password invalid");
    }
    const token = generateToken({ id: user._id, email: user.email });
    return { user, token };
  },
  async update_user(data: User_profile, userId: string) {
    if (!userId) throw new Error("user not found");
    return await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $set: data },
      { new: true, runValidators: true }
    );
  },
  async profile(userId: string) {
    return await UserModel.findById({ _id: userId });
  },
};
