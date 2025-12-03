import styles from "./guestPages.module.css";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { loginSchema, type LoginValues } from "../../validation/formSchema";
import { ErrorSnackbar } from "../../components/errorModal/ErrorSnackbar";

export default function Login() {
  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    console.log("Form submitted:", data);
  };

  const onError = (formErrors: FieldErrors<LoginValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container">
        <h2 className="title">LOGIN</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="simple-form"
        >
          <div className="form-group">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" {...register("email")} />
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
    </section>
  );
}
