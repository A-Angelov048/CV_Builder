import styles from "./guestPages.module.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useFormSuccessSnackbar } from "../../hooks/useFormSuccessSnackbar";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { resetPasswordSchema, type ResetPasswordValues } from "../../validation/formSchema";

import Spinner from "../../components/spinner/Spinner";
import ErrorSnackbar from "../../components/errorModal/ErrorSnackbar";
import SuccessSnackbar from "../../components/successModal/SuccessSnackbar";

export default function ResetPassword() {
  const api = useAxiosPrivate();
  const navigate = useNavigate();

  const { token } = useParams();

  const [spinner, setSpinner] = useState(false);

  const { register, handleSubmit } = useForm<ResetPasswordValues>();

  const { open, messages, close, handleZodErrors, handleErrors } = useFormErrorSnackbar();
  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();

  const onSubmit: SubmitHandler<ResetPasswordValues> = async (data) => {
    const result = resetPasswordSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    setSpinner(true);

    try {
      const result = await api.post("/auth/reset-password", {
        newPassword: data.newPassword,
        token,
      });
      handleSuccess(result.data.message);
    } catch (err: any) {
      handleErrors({ err: err.response.data });
    } finally {
      setSpinner(false);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
  };

  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container-2">
        <h2 className="title">RESET PASSWORD</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input id="newPassword" type="password" {...register("newPassword")} />
          </div>
          <div className="form-group">
            <label htmlFor="reNewPassword">Confirm Password</label>
            <input id="reNewPassword" type="password" {...register("reNewPassword")} />
          </div>

          <div className={styles.button}>
            <button type="submit" className="main-button">
              Reset Password
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
