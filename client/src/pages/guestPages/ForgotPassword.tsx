import styles from "./guestPages.module.css";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useFormSuccessSnackbar } from "../../hooks/useFormSuccessSnackbar";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../../validation/formSchema";

import Spinner from "../../components/spinner/Spinner";
import ErrorSnackbar from "../../components/errorModal/ErrorSnackbar";
import SuccessSnackbar from "../../components/successModal/SuccessSnackbar";

export default function ForgotPassword() {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");

  const api = useAxiosPrivate();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state && !state?.isFromLogin) navigate("/not-found");
  }, []);

  const [spinner, setSpinner] = useState(false);

  const { register, handleSubmit, reset } = useForm<ForgotPasswordValues>();

  const { open, messages, close, handleZodErrors, handleCustomError } = useFormErrorSnackbar();
  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    if (turnstileRef.current?.isExpired()) {
      handleCustomError("Verification expired. Please verify again.");
      turnstileRef.current?.reset();
      setCaptchaToken("");
      return;
    }

    if (!captchaToken) {
      handleCustomError("Please verify first.");
      return;
    }

    const result = forgotPasswordSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    setSpinner(true);

    try {
      const result = await api.post("/auth/forgot-password", {
        ...data,
        turnstileToken: captchaToken,
      });
      handleSuccess(result.data.message);
    } catch (err: any) {
      if (err.response.status !== 200) {
        handleCustomError(err.response.data.message);
      } else {
        handleSuccess(err.response.data.message);
      }
    } finally {
      reset();
      setSpinner(false);
      turnstileRef.current?.reset();
      setCaptchaToken("");
    }
  };

  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container-2">
        <h2 className="title">FORGOT PASSWORD</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
          <div className="form-group m-b">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" {...register("email")} autoFocus />
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
              action: "forgot-password-form",
              theme: "dark",
              size: "flexible",
              language: "en",
            }}
          />

          <div className={styles.button}>
            <button type="submit" className="main-button">
              Send Reset Link
            </button>
          </div>
        </form>
        <ErrorSnackbar open={open} messages={messages} onClose={close} />
        <SuccessSnackbar open={openSuccess} messages={messagesSuccess} onClose={closeSuccess} />
      </div>
      {spinner && <Spinner />}
    </section>
  );
}
