import { useContext } from "react";
import { ProfileToggleContext } from "../context/toggleProfileContext";

export const useProfileToggle = () => {
  const context = useContext(ProfileToggleContext);

  if (!context) {
    throw new Error("useProfileToggle must be used within a PortfolioProvider");
  }

  return context;
};
