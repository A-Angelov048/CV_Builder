import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import Spinner from "../components/spinner/Spinner";
import { useLocation } from "react-router-dom";

export type AboutValues = {
  name: string;
  career: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  imageProfile: { image: string; public_id: string };
  imageBackground: { image: string; public_id: string };
};

export interface Portfolio {
  owner: string;

  about: AboutValues;
  links?: {
    linkedin: string;
    telegram: string;
    github: string;
    facebook: string;
    instagram: string;
    shortInfo: string;
  };
  skills?: [
    {
      skill: string;
      _id: string;
    },
  ];
  projects?: [
    {
      nameProject: string;
      urlProject: string;
      screenshotProject: string;
      brief: string;
      _id: string;
    },
  ];
  experience?: [
    {
      yearsExperience: string;
      position: string;
      companyName: string;
      activity: string;
      _id: string;
    },
  ];
  education?: [
    { yearsEducation: string; degree: string; nameSchool: string; infoSchool: string; _id: string },
  ];

  isPublished: boolean;
}

interface CurrentPortfolioContextType {
  portfolio: Portfolio;
  changePortfolioState: (state: Portfolio) => void;
  changeLoadingState: (state: boolean) => void;
}

export const PortfolioContext = createContext<CurrentPortfolioContextType | null>(null);

interface ProfileProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: ProfileProviderProps) {
  const { pathname } = useLocation();
  const isUserLogged = localStorage.getItem("isLoggedIn");
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    owner: "",
    about: {
      name: "",
      career: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      imageProfile: { image: "", public_id: "" },
      imageBackground: { image: "", public_id: "" },
    },
    isPublished: false,
  });

  useEffect(() => {
    if (!isUserLogged && pathname === "/") {
      setPortfolio({
        owner: "",
        about: {
          name: "",
          career: "",
          email: "",
          phone: "",
          address: "",
          date: "",
          imageProfile: { image: "", public_id: "" },
          imageBackground: { image: "", public_id: "" },
        },
        isPublished: false,
      });
    }
  }, [isUserLogged, pathname]);

  const changePortfolioState = useCallback((state: Portfolio) => {
    setPortfolio((oldState) => {
      return { ...oldState, ...state };
    });
  }, []);

  const changeLoadingState = useCallback((state: boolean) => {
    setIsLoading(state);
  }, []);

  const data: CurrentPortfolioContextType = {
    portfolio,
    changePortfolioState,
    changeLoadingState,
  };

  return (
    <PortfolioContext.Provider value={data}>
      {isLoading && <Spinner />}
      {children}
    </PortfolioContext.Provider>
  );
}
