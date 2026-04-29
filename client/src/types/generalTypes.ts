declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

export type Section = "about" | "skills" | "projects" | "experience" | "education" | "contact";

export type UploadResult = {
  imageProfile?: { image: string; public_id: string };
  imageBackground?: { image: string; public_id: string };
};
