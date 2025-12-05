import mongoose, { Document, Schema, Types } from "mongoose";

interface Shift extends Document {
  userId: Types.ObjectId | string;
  start_time: Date;
  end_time: Date;
  date: string;
}

const userShift_Schema: Schema<Shift> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: { type: String, required: true },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const UserSiftModel = mongoose.model<Shift>(
  "UserShift",
  userShift_Schema
);
