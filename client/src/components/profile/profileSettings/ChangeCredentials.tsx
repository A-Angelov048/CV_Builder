import style from "../Profile.module.css";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";

import { changePasswordSchema, type ChangePasswordValues } from "../../../validation/formSchema";
import { ErrorSnackbar } from "../../errorModal/ErrorSnackbar";
import { useAuth, type AccessTokenBE } from "../../../hooks/useAuth";

export default function ChangeCredentials() {
  const api = useAxiosPrivate();
  const { changeAuthState } = useAuth();
  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordValues> = async (data) => {
    try {
      const token: AccessTokenBE = await api.put("/auth/change-password", data);
      changeAuthState(token.data);
    } catch (err: any) {
      handleErrors({ err: err.response.data });
    }
  };

  const onError = (formErrors: FieldErrors<ChangePasswordValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section className={style["mono-section"]}>
      <div className={style["mono-section-header"]}>
        <h2 className={style["mono-section-title"]}>Security Credentials</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={style["mono-form-group"]}>
          <label htmlFor="curPassword" className={style["mono-label"]}>
            Current Password
          </label>
          <input
            id="curPassword"
            type="password"
            className={style["mono-input"]}
            {...register("curPassword")}
          />
        </div>
        <div className={style["mono-form-group-two"]}>
          <div>
            <label htmlFor="newPassword" className={style["mono-label"]}>
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className={style["mono-input"]}
              {...register("newPassword")}
            />
          </div>
          <div>
            <label htmlFor="reNewPassword" className={style["mono-label"]}>
              Confirm Password
            </label>
            <input
              id="reNewPassword"
              type="password"
              className={style["mono-input"]}
              {...register("reNewPassword")}
            />
          </div>
        </div>
        <button className={style["mono-button-primary"]} type="submit">
          Update Password
        </button>
      </form>
      <ErrorSnackbar open={open} messages={messages} onClose={close} />
    </section>
  );
}
