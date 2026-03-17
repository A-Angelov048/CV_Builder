import { z } from "zod";
import imageSchema from "./imageSchema";

export const skillSchema = z.object({
  skill: z
    .string()
    .trim()
    .min(1, "Skill is required.")
    .min(5, "Skill must be at least 5 characters long."),
});

export type SkillValues = z.infer<typeof skillSchema>;

export const projectsSchema = z.object({
  nameProject: z
    .string()
    .trim()
    .min(1, "Name of the project is required.")
    .min(5, "Name of the project must be at least 5 characters long."),
  urlProject: z.string().trim().min(1, "Url to project is required."),
  screenshotProject: z
    .string()
    .trim()
    .min(1, "Screenshot of the project is required.")
    .min(5, "Screenshot of the project must be at least 5 characters long."),
  brief: z.string().trim(),
});

export type ProjectsValues = z.infer<typeof projectsSchema>;

export const experienceSchema = z.object({
  yearsExperience: z
    .string()
    .trim()
    .min(1, "Years of the company is required.")
    .min(5, "Years must be at least 5 characters long."),
  position: z
    .string()
    .trim()
    .min(1, "Position of the company is required.")
    .min(5, "Position must be at least 5 characters long."),
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required.")
    .min(5, "Company name must be at least 5 characters long."),
  activity: z
    .string()
    .trim()
    .min(1, "Activity in the company is required.")
    .min(5, "Activity in the company must be at least 5 characters long."),
});

export type ExperienceValues = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  yearsEducation: z
    .string()
    .trim()
    .min(1, "Years of the education is required.")
    .min(5, "Years of the education must be at least 5 characters long."),
  degree: z
    .string()
    .trim()
    .min(1, "Degree is required.")
    .min(5, "Degree must be at least 5 characters long."),
  nameSchool: z
    .string()
    .trim()
    .min(1, "Name of the school is required.")
    .min(5, "Name of the school must be at least 5 characters long."),
  infoSchool: z
    .string()
    .trim()
    .min(1, "Info of the school is required.")
    .min(5, "Info of the school must be at least 5 characters long."),
});

export type EducationValues = z.infer<typeof educationSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(10, "Email must be at least 10 characters long.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters long."),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required.")
      .min(5, "Username must be at least 5 characters long."),
    email: z
      .string()
      .trim()
      .min(10, "Email must be at least 10 characters long.")
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address.",
      ),
    password: z
      .string()
      .trim()
      .min(1, "password is required.")
      .min(6, "password must be at least 6 characters long."),
    rePassword: z
      .string()
      .trim()
      .min(1, "rePassword is required.")
      .min(6, "rePassword must be at least 6 characters long."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;

export const socialLinkSchema = z.object({
  linkedin: z
    .string()
    .trim()
    .regex(/^https?:\/\//, "URL should stars with http://... or https://..."),
  telegram: z
    .string()
    .trim()
    .regex(
      /^(https?:\/\/.*)?$/,
      "URL should stars with http://... or https://...",
    ),
  github: z
    .string()
    .trim()
    .regex(
      /^(https?:\/\/.*)?$/,
      "URL should stars with http://... or https://...",
    ),
  facebook: z
    .string()
    .trim()
    .regex(
      /^(https?:\/\/.*)?$/,
      "URL should stars with http://... or https://...",
    ),
  instagram: z
    .string()
    .trim()
    .regex(
      /^(https?:\/\/.*)?$/,
      "URL should stars with http://... or https://...",
    ),
  shortInfo: z
    .string()
    .trim()
    .min(1, "Short info is required.")
    .min(10, "Short info must be at least 10 characters long."),
});

export type SocialLinkValues = z.infer<typeof socialLinkSchema>;

export const profileCardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "First and Last name is required.")
    .min(5, "First and Last name must be at least 5 characters long."),
  career: z
    .string()
    .trim()
    .min(1, "Career is required.")
    .min(5, "Career must be at least 5 characters long."),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+359[- ]?\d{3}[- ]?\d{3}[- ]?\d{3}$/,
      "Invalid phone number (example: +359 111 222 333)",
    )
    .min(1, "Phone number is required."),
  email: z
    .string()
    .trim()
    .min(10, "Email must be at least 10 characters long.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address."),
  address: z
    .string()
    .trim()
    .min(1, "Address is required.")
    .min(5, "Address must be at least 5 characters long."),
  date: z
    .string()
    .trim()
    .min(1, "Date of birth is required.")
    .min(5, "Date of birth must be at least 5 characters long."),
  imageProfile: imageSchema({
    maxDimensions: { width: 600, height: 600 },
    imageType: "Profile image",
  }),
  imageBackground: imageSchema({
    maxDimensions: { width: 4096, height: 4096 },
    imageType: "Background image",
  }),
});

export type ProfileCardValues = z.infer<typeof profileCardSchema>;

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .min(5, "First name must be at least 5 characters long."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .min(5, "Last name must be at least 5 characters long."),
  email: z
    .email("Please enter a valid email address.")
    .trim()
    .min(5, "Email must be at least 5 characters long."),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .min(5, "Message must be at least 5 characters long."),
});

export type ContactValues = z.infer<typeof contactSchema>;
