import { createContext, useCallback, useState, type ReactNode } from "react";
import Spinner from "../components/spinner/Spinner";

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
  username: string;

  about: AboutValues;
  links?: {
    linkedin: string;
    telegram: string;
    github: string;
    facebook: string;
    instagram: string;
    shortInfo: string;
  };
  skills?: [];
  projects?: [];
  experience?: [];
  education?: [];

  isPublished: boolean;
}

interface CurrentPortfolioContextType {
  portfolio: Portfolio;
  changePortfolioState: (state: Portfolio) => void;
  changeLoadingState: (state: boolean) => void;
}

export const PortfolioContext =
  createContext<CurrentPortfolioContextType | null>(null);

interface ProfileProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: ProfileProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio>({
    owner: "",
    username: "",
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
