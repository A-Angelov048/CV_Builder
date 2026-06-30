import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/userTypes";

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [4, "Username should be at least 4 characters long."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [10, "Email must be at least 10 characters long."],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password should be at least 6 characters long."],
    },
    refreshToken: {
      type: [String],
      default: [],
    },
    verificationToken: {
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
