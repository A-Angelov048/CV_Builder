import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export interface AccessTokenBE {
  data: {
    userId: string;
    username: string;
    accessToken: string;
  };
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
