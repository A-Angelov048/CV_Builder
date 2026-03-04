import { Schema, model, Types } from "mongoose";
import { Portfolio } from "../types/portfolioTypes";

const PortfolioSchema = new Schema<Portfolio>(
  {
    owner: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      minLength: [5, "Username should be at least 5 characters long."],
    },

    about: {
      name: { type: String, required: true, minLength: 5 },
      career: { type: String, required: true, minLength: 5 },
      phone: {
        type: String,
        required: true,
        match: [
          /^\+359[- ]?\d{3}[- ]?\d{3}[- ]?\d{3}$/,
          "Invalid phone number (example: +359 111 222 333)",
        ],
      },
      email: { type: String, required: true, minLength: 10 },
      address: { type: String, required: true, minLength: 5 },
      date: { type: String, required: true, minLength: 5 },
      imageProfile: {
        image: { type: String, required: true },
        public_id: { type: String, required: true },
      },
      imageBackground: {
        image: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    },

    links: {
      linkedin: {
        type: String,
        require: true,
      },
      telegram: {
        type: String,
      },
      github: {
        type: String,
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      shortInfo: {
        type: String,
        require: true,
      },
    },

    skills: [
      {
        skill: { type: String, required: true },
      },
    ],

    projects: [
      {
        nameProject: { type: String, required: true },
        urlProject: { type: String, required: true },
        screenshotProject: { type: String, required: true },
        brief: { type: String },
      },
    ],

    experience: [
      {
        yearsExperience: { type: String, required: true },
        position: { type: String, required: true },
        companyName: { type: String, required: true },
        activity: { type: String, required: true },
      },
    ],

    education: [
      {
        yearsEducation: { type: String, required: true },
        degree: { type: String, required: true },
        nameSchool: { type: String, required: true },
        infoSchool: { type: String, required: true },
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const PortfolioModel = model<Portfolio>("Portfolio", PortfolioSchema);
