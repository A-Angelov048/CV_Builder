import { Document, Types } from "mongoose";
export interface About {
  name: string;
  career: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  imageProfile: { image: string; public_id: string };
  imageBackground: { image: string; public_id: string };
}

export interface Links {
  linkedin: string;
  telegram?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
  shortInfo: string;
}

export interface Skills {
  _id: Types.ObjectId;
  skill: string;
}

export interface Experience {
  _id: Types.ObjectId;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  technologies?: string[];
}

export interface Project {
  _id: Types.ObjectId;
  nameProject: string;
  urlProject: string;
  screenshotProject: string;
  brief?: string;
}

export interface Education {
  _id: Types.ObjectId;
  yearsExperience: string;
  position: string;
  companyName: string;
  activity: string;
}

export interface Portfolio extends Document {
  owner: Types.ObjectId;

  about: About;
  links: Links;
  skills: Types.DocumentArray<Skills>;
  projects: Types.DocumentArray<Project>;
  experience: Types.DocumentArray<Experience>;
  education: Types.DocumentArray<Education>;

  isPublished: boolean;
}

export type PortfolioKey = "skills" | "experience" | "education" | "projects";
