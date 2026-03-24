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
      address: { type: String, required: true, minLength: 5 },
      date: { type: String, required: true, minLength: 5 },
      imageProfile: {
        image: {
          type: String,
          required: true,
          match: [
            /^https?:\/\//,
            "URL should stars with http://... or https://...",
          ],
        },
        public_id: { type: String, required: true },
      },
      imageBackground: {
        image: {
          type: String,
          required: true,
          match: [
            /^https?:\/\//,
            "URL should stars with http://... or https://...",
          ],
        },
        public_id: { type: String, required: true },
      },
    },

    links: {
      linkedin: {
        type: String,
        match: [
          /^https?:\/\//,
          "Image URL should stars with http://... or https://...",
        ],
        require: true,
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
        require: true,
        minLength: [10, "Short info must be at least 10 characters long."],
      },
    },

    skills: [
      {
        skill: { type: String, required: true, minLength: 5 },
      },
    ],

    projects: [
      {
        nameProject: { type: String, required: true, minLength: 5 },
        urlProject: {
          type: String,
          required: true,
          match: [
            /^https?:\/\//,
            "Image URL should stars with http://... or https://...",
          ],
        },
        screenshotProject: {
          type: String,
          required: true,
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
          required: true,
          match: [
            /^\d{4}-\d{4}$/,
            "Enter a year range in the format YYYY-YYYY (e.g., 2016-2020)",
          ],
        },
        position: { type: String, required: true, minLength: 5 },
        companyName: { type: String, required: true, minLength: 5 },
        activity: {
          type: String,
          required: true,
          minLength: 10,
          maxLength: 240,
        },
      },
    ],

    education: [
      {
        yearsEducation: {
          type: String,
          required: true,
          match: [
            /^\d{4}-\d{4}$/,
            "Enter a year range in the format YYYY-YYYY (e.g., 2016-2020)",
          ],
        },
        degree: { type: String, required: true, minLength: 5 },
        nameSchool: { type: String, required: true, minLength: 5 },
        infoSchool: {
          type: String,
          required: true,
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
