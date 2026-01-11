import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AccessTokenBE } from "../hooks/useAuth";
import api from "../api/axios";

interface AuthData {
  username: string;
  accessToken: string;
}

interface CurrentAuthContextType {
  authData: AuthData;
  changeAuthState: (state: AuthData) => void;
  refreshAccessToken: () => Promise<string>;
  logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<CurrentAuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: AuthProviderProps) {
  const isUser = sessionStorage.getItem("isLoggedIn");
  const [user, setAuthToken] = useState<AuthData>({
    username: "",
    accessToken: "",
  });

  useEffect(() => {
    if (user.username && user.username !== "") {
      window.history.replaceState(null, "", `/${user.username}`);
    }

    if (isUser === "true") {
      refreshAccessToken();
    }
  }, []);

  const changeAuthState = useCallback((state: AuthData) => {
    setAuthToken(state);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    const response: AccessTokenBE = await api.get("/auth/refresh");

    setAuthToken(response.data);
    return response.data.accessToken;
  }, []);

  const logoutUser = useCallback(async () => {
    await api.post("/auth/logout");
    setAuthToken({ username: "", accessToken: "" });
    sessionStorage.removeItem("isLoggedIn");
  }, []);

  const data: CurrentAuthContextType = {
    authData: user,
    changeAuthState,
    refreshAccessToken,
    logoutUser,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
