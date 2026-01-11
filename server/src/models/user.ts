import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken?: string[];
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      minLength: [5, "Username should be at least 5 characters long."],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minLength: [10, "Email should be at least 10 characters long."],
      unique: true,
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
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
