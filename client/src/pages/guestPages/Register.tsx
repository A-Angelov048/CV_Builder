import styles from "./guestPages.module.css";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { registerSchema, type RegisterValues } from "../../validation/formSchema";
import { ErrorSnackbar } from "../../components/errorModal/ErrorSnackbar";
import { useAuth, type AccessTokenBE } from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

export default function Register() {
  const navigate = useNavigate();
  const api = useAxiosPrivate();
  const { changeAuthState } = useAuth();
  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    try {
      const token: AccessTokenBE = await api.post("/auth/register", data);

      changeAuthState(token.data);
      sessionStorage.setItem("isLoggedIn", "true");
      navigate(`/${token.data.username}`, { replace: true });
    } catch (err: any) {
      handleErrors({ err: err.response.data });
    }
  };

  const onError = (formErrors: FieldErrors<RegisterValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container">
        <h2 className="title">REGISTER</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="simple-form">
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

          <div className="form-group">
            <label htmlFor="rePassword">Confirm your password *</label>
            <input type="password" id="rePassword" {...register("rePassword")} />
          </div>

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
    </section>
  );
}
