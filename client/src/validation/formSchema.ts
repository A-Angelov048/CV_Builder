import { z } from "zod";

export const skillSchema = z.object({
  skill: z
    .string()
    .min(1, "Skill is required.")
    .min(5, "Skill must be at least 5 characters long."),
});

export type SkillValues = z.infer<typeof skillSchema>;

export const projectsSchema = z.object({
  nameProject: z
    .string()
    .min(1, "Name of the project is required.")
    .min(5, "Name of the project must be at least 5 characters long."),
  urlProject: z.string().min(1, "Url to project is required."),
  screenshotProject: z
    .string()
    .min(1, "Screenshot of the project is required.")
    .min(5, "Screenshot of the project must be at least 5 characters long."),
  brief: z.string(),
});

export type ProjectsValues = z.infer<typeof projectsSchema>;

export const experienceSchema = z.object({
  yearsExperience: z
    .string()
    .min(1, "Years of the company is required.")
    .min(5, "Years must be at least 5 characters long."),
  position: z
    .string()
    .min(1, "Position of the company is required.")
    .min(5, "Position must be at least 5 characters long."),
  companyName: z
    .string()
    .min(1, "Company name is required.")
    .min(5, "Company name must be at least 5 characters long."),
  activity: z
    .string()
    .min(1, "Activity in the company is required.")
    .min(5, "Activity in the company must be at least 5 characters long."),
});

export type ExperienceValues = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  yearsEducation: z
    .string()
    .min(1, "Years of the education is required.")
    .min(5, "Years of the education must be at least 5 characters long."),
  degree: z
    .string()
    .min(1, "Degree is required.")
    .min(5, "Degree must be at least 5 characters long."),
  nameSchool: z
    .string()
    .min(1, "Name of the school is required.")
    .min(5, "Name of the school must be at least 5 characters long."),
  infoSchool: z
    .string()
    .min(1, "Info of the school is required.")
    .min(5, "Info of the school must be at least 5 characters long."),
});

export type EducationValues = z.infer<typeof educationSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .min(5, "Email must be at least 5 characters long."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(5, "Password must be at least 5 characters long."),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required.")
    .min(5, "Username must be at least 5 characters long."),
  email: z
    .string()
    .min(1, "Email is required.")
    .min(5, "Email must be at least 5 characters long."),
  password: z
    .string()
    .min(1, "password is required.")
    .min(5, "password must be at least 5 characters long."),
  rePassword: z
    .string()
    .min(1, "rePassword is required.")
    .min(5, "rePassword must be at least 5 characters long."),
});

export type RegisterValues = z.infer<typeof registerSchema>;

export const socialLinkSchema = z.object({
  linkedin: z
    .string()
    .min(1, "Linkedin profile is required.")
    .min(5, "Linkedin profile must be at least 5 characters long."),
  telegram: z.string(),
  github: z.string(),
  facebook: z.string(),
  instagram: z.string(),
  shortInfo: z
    .string()
    .min(1, "Short info is required.")
    .min(5, "Short info must be at least 5 characters long."),
});

export type SocialLinkValues = z.infer<typeof socialLinkSchema>;

export const profileCardSchema = z.object({
  name: z
    .string()
    .min(1, "First and Last name is required.")
    .min(5, "First and Last name must be at least 5 characters long."),

  career: z
    .string()
    .min(1, "Career is required.")
    .min(5, "Career must be at least 5 characters long."),

  phone: z
    .string()
    .min(1, "Phone number is required.")
    .min(5, "Phone number must be at least 5 characters long."),

  email: z
    .string()
    .min(1, "Email is required.")
    .min(5, "Email must be at least 5 characters long."),

  address: z
    .string()
    .min(1, "Address is required.")
    .min(5, "Address must be at least 5 characters long."),

  date: z
    .string()
    .min(1, "Date of birth is required.")
    .min(5, "Date of birth must be at least 5 characters long."),

  imageProfile: z.file(),

  imageBackground: z.file(),
});

export type ProfileCardValues = z.infer<typeof profileCardSchema>;

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .min(5, "First name must be at least 5 characters long."),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .min(5, "Last name must be at least 5 characters long."),
  email: z
    .string()
    .min(1, "Email is required.")
    .min(5, "Email must be at least 5 characters long."),
  message: z
    .string()
    .min(1, "Message is required.")
    .min(5, "Message must be at least 5 characters long."),
});

export type ContactValues = z.infer<typeof contactSchema>;
