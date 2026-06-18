import styles from "./guestPages.module.css";
import { useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { registerSchema, type RegisterValues } from "../../validation/formSchema";
import { useRegisterUser } from "../../hooks/useAuthResponse";

import ErrorSnackbar from "../../components/errorModal/ErrorSnackbar";
import Spinner from "../../components/spinner/Spinner";

export default function Register() {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const { register, handleSubmit } = useForm<RegisterValues>();

  const { open, messages, close, handleErrors, handleZodErrors, handleCustomError } =
    useFormErrorSnackbar();
  const { createUser, spinner, setCaptchaToken } = useRegisterUser();

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    if (turnstileRef.current?.isExpired()) {
      handleCustomError("Verification expired. Please verify again.");
      turnstileRef.current?.reset();
      setCaptchaToken("");
      return;
    }

    const result = registerSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    try {
      await createUser(data);
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
        <h2 className="title">REGISTER</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
          <div className="form-group">
            <label htmlFor="username">Type your username *</label>
            <input id="username" type="text" {...register("username")} autoFocus />
          </div>

          <div className="form-group">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" {...register("email")} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Type your password *</label>
            <input type="password" id="password" {...register("password")} />
          </div>

          <div className="form-group m-b">
            <label htmlFor="rePassword">Confirm your password *</label>
            <input type="password" id="rePassword" {...register("rePassword")} />
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
              action: "register-form",
              theme: "dark",
              size: "flexible",
              language: "en",
            }}
          />

          <div className={styles.button}>
            <button type="submit" className="main-button">
              Register
            </button>
          </div>

          <div className={styles.link}>
            <p>Already have an account?</p>
            <Link to="/login">Login here!</Link>
          </div>
        </form>
        <ErrorSnackbar open={open} messages={messages} onClose={close} />
      </div>
      {spinner && <Spinner />}
    </section>
  );
}
