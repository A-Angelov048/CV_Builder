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

    about: {
      name: { type: String, minLength: 5 },
      career: { type: String, minLength: 5 },
      phone: {
        type: String,
        match: [
          /^\+359[- ]?\d{3}[- ]?\d{3}[- ]?\d{3}$/,
          "Invalid phone number (example: +359 111 222 333)",
        ],
      },
      email: {
        type: String,
        unique: true,
        trim: true,
        minLength: [10, "Email must be at least 10 characters long."],
        match: [
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          "Please enter a valid email address.",
        ],
      },
      address: { type: String, minLength: 5 },
      date: { type: String, minLength: 5 },
      imageProfile: {
        image: {
          type: String,
          match: [
            /^https?:\/\//,
            "URL should stars with http://... or https://...",
          ],
        },
        public_id: { type: String },
      },
      imageBackground: {
        image: {
          type: String,
          match: [
            /^https?:\/\//,
            "URL should stars with http://... or https://...",
          ],
        },
        public_id: { type: String },
      },
    },

    links: {
      linkedin: {
        type: String,
        match: [
          /^https?:\/\//,
          "Image URL should stars with http://... or https://...",
        ],
      },
      telegram: {
        type: String,
        match: [
          /^(https?:\/\/.*)?$/,
          "Image URL should stars with http://... or https://...",
        ],
      },
      github: {
        type: String,
        match: [
          /^(https?:\/\/.*)?$/,
          "Image URL should stars with http://... or https://...",
        ],
      },
      facebook: {
        type: String,
        match: [
          /^(https?:\/\/.*)?$/,
          "Image URL should stars with http://... or https://...",
        ],
      },
      instagram: {
        type: String,
        match: [
          /^(https?:\/\/.*)?$/,
          "Image URL should stars with http://... or https://...",
        ],
      },
      shortInfo: {
        type: String,
        minLength: [10, "Short info must be at least 10 characters long."],
        maxLength: [240, "Short info must be at most 240 characters long."],
      },
    },

    skills: [
      {
        skill: { type: String, minLength: 5 },
      },
    ],

    projects: [
      {
        nameProject: { type: String, minLength: 5 },
        urlProject: {
          type: String,
          match: [
            /^https?:\/\//,
            "Image URL should stars with http://... or https://...",
          ],
        },
        screenshotProject: {
          type: String,
          match: [
            /^https?:\/\//,
            "Image URL should stars with http://... or https://...",
          ],
        },
        brief: {
          type: String,
          match: [
            /^(https?:\/\/.*)?$/,
            "Image URL should stars with http://... or https://...",
          ],
        },
      },
    ],

    experience: [
      {
        yearsExperience: {
          type: String,
          match: [
            /^\d{4}-\d{4}$/,
            "Enter a year range in the format YYYY-YYYY (e.g., 2016-2020)",
          ],
        },
        position: { type: String, minLength: 5 },
        companyName: { type: String, minLength: 5 },
        activity: {
          type: String,
          minLength: 10,
          maxLength: 240,
        },
      },
    ],

    education: [
      {
        yearsEducation: {
          type: String,
          match: [
            /^\d{4}-\d{4}$/,
            "Enter a year range in the format YYYY-YYYY (e.g., 2016-2020)",
          ],
        },
        degree: { type: String, minLength: 5 },
        nameSchool: { type: String, minLength: 5 },
        infoSchool: {
          type: String,
          minLength: 10,
          maxLength: 240,
        },
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
