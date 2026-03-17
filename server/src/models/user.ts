import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken: string[];
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [5, "Username should be at least 5 characters long."],
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
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", UserSchema);
