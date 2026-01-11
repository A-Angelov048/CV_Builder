export interface About {
  name: string;
  career: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  imageProfile: string;
  imageBackground: string;
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
  skill: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  technologies?: string[];
}

export interface Project {
  nameProject: string;
  urlProject: string;
  screenshotProject: string;
  brief?: string;
}

export interface Education {
  yearsExperience: string;
  position: string;
  companyName: string;
  activity: string;
}

export interface Portfolio {
  owner: string;
  about: About;
  links: Links;
  skills: Skills[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  isPublished: boolean;
}
