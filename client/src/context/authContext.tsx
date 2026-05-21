import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import type { AccessTokenBE } from "../hooks/useAuth";

export interface AuthData {
  userId: string;
  username: string;
  accessToken: string;
  isLoggedOff?: boolean;
}

interface CurrentAuthContextType {
  authData: AuthData;
  changeAuthState: (state: AuthData) => void;
  refreshAccessToken: () => Promise<{ newToken: string; isError: boolean }>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<CurrentAuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const isUser = localStorage.getItem("isLoggedIn");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const [user, setAuthToken] = useState<AuthData>({
    userId: "",
    username: "",
    accessToken: "",
  });

  useEffect(() => {
    if (isUser === "true") {
      refreshAccessToken();
    } else {
      setIsLoadingAuth(true);
    }
  }, []);

  const changeAuthState = (state: AuthData) => {
    setAuthToken(state);
  };

  const refreshAccessToken = async () => {
    const result: { newToken: string; isError: boolean } = {
      newToken: "",
      isError: false,
    };

    try {
      const response: AccessTokenBE = await api.get("/auth/refresh");
      setAuthToken(response.data);

      result.newToken = response.data.accessToken;
    } catch (error: any) {
      setAuthToken({ userId: "", username: "", accessToken: "", isLoggedOff: true });
      localStorage.removeItem("isLoggedIn");
      result.isError = true;
      navigate("/login", {
        replace: true,
        state: { message: "Session expired. Please log in again." },
      });
    } finally {
      setIsLoadingAuth(true);
    }

    return result;
  };

  const data: CurrentAuthContextType = {
    authData: user,
    changeAuthState,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={data}>{isLoadingAuth && children}</AuthContext.Provider>;
}
