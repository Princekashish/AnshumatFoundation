import mongoose, { Document, Schema } from "mongoose";

interface user extends Document {
  user: string;
  email: string;
  password: string;
  role: "user" | "admin";
  employeeCode: string;
  department: "HR" | "IT" | "Finance" | "Sales";
}

const UserSchema: Schema<user> = new Schema(
  {
    user: {
      type: String,
      required: false,
    },
    employeeCode: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      enum: ["IT", "HR", "Finance", "Sales"],
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<user>("Employee", UserSchema);
