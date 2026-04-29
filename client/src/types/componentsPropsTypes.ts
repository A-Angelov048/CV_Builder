import { Portfolio } from "../context/portfolioContext";
import { Section } from "./generalTypes";

export interface ErrorSnackbarProps {
  open: boolean;
  messages: string[];
  onClose: () => void;
}

export type HeaderProps = {
  scrollFunc: (section: Section) => void;
  scrollUp: () => void;
};

export type HeadingContainerProps = {
  header: string;
  status: boolean;
  changeStatus: (value: boolean) => void;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  buttonCondition?: boolean;
};

export type ExperienceDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export type EducationDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export type ProjectsDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export type SkillsDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export interface SuccessSnackbarProps {
  open: boolean;
  messages: string;
  onClose: () => void;
}

export type HomeProps = {
  sectionRefs: React.RefObject<Record<Section, HTMLDivElement | null>>;
};
