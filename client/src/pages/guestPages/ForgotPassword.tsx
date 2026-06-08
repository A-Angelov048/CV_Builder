import styles from "./guestPages.module.css";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useFormSuccessSnackbar } from "../../hooks/useFormSuccessSnackbar";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { forgotPasswordSchema, type ForgotPasswordValues } from "../../validation/formSchema";

import Spinner from "../../components/spinner/Spinner";
import ErrorSnackbar from "../../components/errorModal/ErrorSnackbar";
import SuccessSnackbar from "../../components/successModal/SuccessSnackbar";

export default function ForgotPassword() {
  const api = useAxiosPrivate();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state && !state?.isFromLogin) navigate("/not-found");
  }, []);

  const [spinner, setSpinner] = useState(false);

  const { register, handleSubmit } = useForm<ForgotPasswordValues>();

  const { open, messages, close, handleZodErrors } = useFormErrorSnackbar();
  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    const result = forgotPasswordSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    setSpinner(true);

    try {
      const result = await api.post("/auth/forgot-password", data);
      handleSuccess(result.data.message);
    } catch (err: any) {
      handleSuccess(err.response.data.message);
    } finally {
      setSpinner(false);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
    }
  };

  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container-2">
        <h2 className="title">FORGOT PASSWORD</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
          <div className="form-group">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" {...register("email")} autoFocus />
          </div>

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
