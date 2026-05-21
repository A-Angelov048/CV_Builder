import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { AccessTokenBE, useAuth } from "./useAuth";
import {
  ChangeIdentityValues,
  ChangePasswordValues,
  LoginValues,
  RegisterValues,
} from "../validation/formSchema";

export function useLoginUser() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const api = useAxiosPrivate();
  const { changeAuthState } = useAuth();

  const getUser = async (data: LoginValues) => {
    if (spinner) return;

    setSpinner(true);

    try {
      const token: AccessTokenBE = await api.post("/auth/login", data);

      changeAuthState(token.data);
      localStorage.setItem("isLoggedIn", "true");
      navigate(`/${token.data.username}`, { replace: true });
    } catch (error) {
      throw error;
    } finally {
      setSpinner(false);
    }
  };

  return { getUser, spinner };
}

export function useRegisterUser() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const api = useAxiosPrivate();
  const { changeAuthState } = useAuth();

  const createUser = async (data: RegisterValues) => {
    if (spinner) return;

    setSpinner(true);

    try {
      const token: AccessTokenBE = await api.post("/auth/register", data);

      changeAuthState(token.data);
      localStorage.setItem("isLoggedIn", "true");
      navigate(`/${token.data.username}`, { replace: true });
    } catch (error: any) {
      throw error;
    } finally {
      setSpinner(false);
    }
  };

  return { createUser, spinner };
}

export function useChangeUserInfo() {
  const [spinner, setSpinner] = useState(false);

  const api = useAxiosPrivate();
  const { changeAuthState } = useAuth();

  const changeIdentity = async (data: ChangeIdentityValues) => {
    if (spinner) return;

    setSpinner(true);

    try {
      const token: AccessTokenBE = await api.put("/auth/change-identity", data);
      changeAuthState(token.data);
      if (token.data.username && token.data.username !== "") {
        window.history.pushState(null, "", `/${token.data.username}`);
      }
    } catch (error: any) {
      throw error;
    } finally {
      setSpinner(false);
    }
  };

  const changeCredentials = async (data: ChangePasswordValues) => {
    if (spinner) return;

    setSpinner(true);

    try {
      const token: AccessTokenBE = await api.put("/auth/change-password", data);
      changeAuthState(token.data);
    } catch (error: any) {
      throw error;
    } finally {
      setSpinner(false);
    }
  };

  return { changeIdentity, changeCredentials, spinner };
}

export function useLogoutUser() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const api = useAxiosPrivate();
  const { changeAuthState } = useAuth();

  const logoutUser = async () => {
    if (spinner) return;

    setSpinner(true);

    try {
      const result = await api.post("/auth/logout");

      if (result.status === 200) {
        changeAuthState({ userId: "", username: "", accessToken: "", isLoggedOff: true });
        localStorage.removeItem("isLoggedIn");
      }

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed");
    } finally {
      setSpinner(false);
    }
  };

  return { logoutUser, spinner };
}
