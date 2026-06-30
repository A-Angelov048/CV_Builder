import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [captchaToken, setCaptchaToken] = useState("");

  const api = useAxiosPrivate();
  const { changeAuthState } = useAuth();

  const getUser = async (data: LoginValues) => {
    if (!captchaToken) {
      throw new Error("Please verify first.");
    }

    if (spinner) return;

    setSpinner(true);

    try {
      const token: AccessTokenBE = await api.post("/auth/login", {
        ...data,
        turnstileToken: captchaToken,
      });

      changeAuthState(token.data);
      localStorage.setItem("isLoggedIn", "true");
      navigate(`/${token.data.username}`, { replace: true });
    } catch (error) {
      throw error;
    } finally {
      setSpinner(false);
    }
  };

  return { getUser, spinner, setCaptchaToken };
}

export function useRegisterUser() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const api = useAxiosPrivate();

  const createUser = async (data: RegisterValues) => {
    if (!captchaToken) {
      throw new Error("Please verify first.");
    }

    if (spinner) return;

    setSpinner(true);

    try {
      const response = await api.post("/auth/register", {
        ...data,
        turnstileToken: captchaToken,
      });

      navigate("/verify-email-notice", {
        state: { email: response.data.email, isFromRegister: false },
        replace: true,
      });
    } catch (error: any) {
      throw error;
    } finally {
      setSpinner(false);
    }
  };

  return { createUser, spinner, setCaptchaToken };
}

export function useChangeUserInfo() {
  const { pathname } = useLocation();

  const [spinner, setSpinner] = useState(false);

  const api = useAxiosPrivate();
  const { authData, changeAuthState } = useAuth();

  const changeIdentity = async (data: ChangeIdentityValues) => {
    if (spinner) return;

    setSpinner(true);

    try {
      const token: AccessTokenBE = await api.put("/auth/change-identity", data);
      changeAuthState(token.data);
      if (token.data.username && token.data.username !== "") {
        if (pathname === "/" + authData.username) {
          window.history.pushState(null, "", `/${token.data.username}`);
        }
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

export function useVerifiedEmail(token: string | undefined) {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  const api = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController();

    const fetchVerifiedEmail = async () => {
      if (spinner) return;

      setSpinner(true);

      try {
        await api.get(`/auth/verify-email/${token}`, {
          signal: controller.signal,
        });
      } catch (err: any) {
        console.error(err.response.data.message);
        navigate("/not-found", { replace: true });
      } finally {
        setSpinner(false);
      }
    };

    fetchVerifiedEmail();
  }, []);

  return { spinner };
}
