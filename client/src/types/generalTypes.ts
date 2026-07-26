declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export type Section =
  | "about"
  | "techSkills"
  | "softSkills"
  | "projects"
  | "experience"
  | "education"
  | "contact";

export type UploadResult = {
  imageProfile?: { image: string; public_id: string };
  imageBackground?: { image: string; public_id: string };
};
