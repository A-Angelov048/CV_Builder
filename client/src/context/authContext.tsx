import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { AccessTokenBE } from "../hooks/useAuth";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export interface AuthData {
  userId: string;
  username: string;
  accessToken: string;
}

interface CurrentAuthContextType {
  authData: AuthData;
  changeAuthState: (state: AuthData) => void;
  refreshAccessToken: () => Promise<{ newToken: string; isError: boolean }>;
  logoutUser: (nav: string, message?: string) => Promise<void>;
}

export const AuthContext = createContext<CurrentAuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const isUser = localStorage.getItem("isLoggedIn");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setAuthToken] = useState<AuthData>({
    userId: "",
    username: "",
    accessToken: "",
  });

  useEffect(() => {
    if (user.username && user.username !== "") {
      window.history.pushState(null, "", `/${user.username}`);
    }

    if (isUser === "true") {
      refreshAccessToken();
    } else {
      setIsLoading(true);
    }
  }, []);

  const changeAuthState = useCallback((state: AuthData) => {
    setAuthToken(state);
  }, []);

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
      logoutUser("/login", "Session expired. Please log in again.");
      result.isError = true;
    } finally {
      setIsLoading(true);
    }

    return result;
  };

  const logoutUser = useCallback(async (nav: string, message?: string) => {
    const result = await api.post("/auth/logout");

    if (result.status === 200) {
      setAuthToken({ userId: "", username: "", accessToken: "" });
      localStorage.removeItem("isLoggedIn");
    }

    navigate(nav, { replace: true, state: { message } });
  }, []);

  const data: CurrentAuthContextType = {
    authData: user,
    changeAuthState,
    refreshAccessToken,
    logoutUser,
  };

  return <AuthContext.Provider value={data}>{isLoading && children}</AuthContext.Provider>;
}
