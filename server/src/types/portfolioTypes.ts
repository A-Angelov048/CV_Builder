import { Document, Types } from "mongoose";

export interface About {
  name: string;
  career: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  nativeLanguage: string;
  languages: string;
  imageProfile: { image: string; public_id: string };
  imageBackground: { image: string; public_id: string };
}

export interface Links {
  linkedin: string;
  telegram: string;
  github: string;
  facebook: string;
  instagram: string;
  shortInfo: string;
}

export interface TechSkills {
  _id: Types.ObjectId;
  techSkill: string;
}

export interface SoftSkills {
  _id: Types.ObjectId;
  softSkill: string;
}

export interface Experience {
  _id: Types.ObjectId;
  yearsExperience: string;
  position: string;
  companyName: string;
  activity: string;
  createdAt: Date;
}

export interface Project {
  _id: Types.ObjectId;
  nameProject: string;
  urlProject: string;
  screenshotProject: string;
  brief: string;
}

export interface Education {
  _id: Types.ObjectId;
  yearsEducation: string;
  degree: string;
  nameSchool: string;
  infoSchool: string;
  createdAt: Date;
}

export interface Portfolio extends Document {
  owner: Types.ObjectId;

  about: About;
  links: Links;
  techSkills: Types.DocumentArray<TechSkills>;
  softSkills: Types.DocumentArray<SoftSkills>;
  projects: Types.DocumentArray<Project>;
  experience: Types.DocumentArray<Experience>;
  education: Types.DocumentArray<Education>;

  isPublished: boolean;
}

export type PortfolioKey =
  | "techSkills"
  | "softSkills"
  | "experience"
  | "education"
  | "projects";
