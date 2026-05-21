import styles from "./guestPages.module.css";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useLoginUser } from "../../hooks/useAuthResponse";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema, type LoginValues } from "../../validation/formSchema";

import Spinner from "../../components/spinner/Spinner";
import ErrorSnackbar from "../../components/errorModal/ErrorSnackbar";

export default function Login() {
  const { state } = useLocation();
  const { authData, changeAuthState } = useAuth();
  const { register, handleSubmit } = useForm<LoginValues>();

  const { open, messages, close, handleErrors, handleZodErrors } = useFormErrorSnackbar();
  const { getUser, spinner } = useLoginUser();

  useEffect(() => {
    if (state && state.message) {
      handleErrors({ err: { message: state.message } });
    }

    if (authData.isLoggedOff) {
      changeAuthState({ userId: "", username: "", accessToken: "", isLoggedOff: false });
    }
  }, [state]);

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    const result = loginSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    try {
      await getUser(data);
    } catch (error: any) {
      handleErrors({ err: error.response.data });
    }
  };

  const onError = (formErrors: FieldErrors<LoginValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container-2">
        <h2 className="title">LOGIN</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="simple-form">
          <div className="form-group">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" {...register("email")} autoFocus />
          </div>

          <div className="form-group">
            <label htmlFor="password">Type your password *</label>
            <input type="password" id="password" {...register("password")} />
          </div>

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
