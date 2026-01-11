import { Schema, model, Types } from "mongoose";

const PortfolioSchema = new Schema(
  {
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },

    about: {
      name: { type: String, required: true },
      career: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      date: { type: String, required: true },
      imageProfile: { type: String, required: true },
      imageBackground: { type: String, required: true },
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
  { timestamps: true }
);

export const PortfolioModel = model("Portfolio", PortfolioSchema);
