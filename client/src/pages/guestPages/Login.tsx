import styles from "./guestPages.module.css";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useLoginUser } from "../../hooks/useAuthResponse";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema, type LoginValues } from "../../validation/formSchema";

import Spinner from "../../components/spinner/Spinner";
import ErrorSnackbar from "../../components/errorModal/ErrorSnackbar";

export default function Login() {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { authData, changeAuthState } = useAuth();
  const { register, handleSubmit } = useForm<LoginValues>();

  const { open, messages, close, handleErrors, handleZodErrors, handleCustomError } =
    useFormErrorSnackbar();
  const { getUser, spinner, setCaptchaToken } = useLoginUser();

  useEffect(() => {
    if (state && state.message) {
      handleErrors({ err: { message: state.message } });
    }

    if (authData.isLoggedOff) {
      changeAuthState({ userId: "", username: "", accessToken: "", isLoggedOff: false });
    }
  }, [state]);

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    if (turnstileRef.current?.isExpired()) {
      handleCustomError("Verification expired. Please verify again.");
      turnstileRef.current?.reset();
      setCaptchaToken("");
      return;
    }

    const result = loginSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    try {
      await getUser(data);
    } catch (error: any) {
      if (error.response) {
        handleErrors({ err: error.response.data });
      } else {
        handleErrors({ err: error });
      }
      turnstileRef.current?.reset();
      setCaptchaToken("");
    }
  };

  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container-2">
        <h2 className="title">LOGIN</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" {...register("email")} autoFocus />
          </div>

          <div className="form-group ">
            <label htmlFor="password">Type your password *</label>
            <input type="password" id="password" {...register("password")} />
          </div>

          <div className={styles["forgot-password"]}>
            <button
              onClick={() =>
                navigate("/forgot-password", { state: { isFromLogin: true }, replace: true })
              }
              className={styles["forgot-password-btn"]}
              type="button"
            >
              Forgot Password?
            </button>
          </div>

          <Turnstile
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
            ref={turnstileRef}
            onSuccess={setCaptchaToken}
            onError={(error) => {
              setCaptchaToken("");
              console.error("Turnstile error:", error);
            }}
            onExpire={() => {
              setCaptchaToken("");
              console.log("Token expired, resetting widget");
            }}
            options={{
              action: "login-form",
              theme: "dark",
              size: "flexible",
              language: "en",
            }}
          />

          <div className={styles.button}>
            <button type="submit" className="main-button">
              Login
            </button>
          </div>

          <div className={styles.link}>
            <p>Don't have and account?</p>
            <Link to="/register">Register here!</Link>
          </div>
        </form>
        <ErrorSnackbar open={open} messages={messages} onClose={close} />
      </div>
      {spinner && <Spinner />}
    </section>
  );
}
