import style from "../Profile.module.css";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";
import { useFormSuccessSnackbar } from "../../../hooks/useFormSuccessSnackbar";
import { useChangeUserInfo } from "../../../hooks/useAuthResponse";
import { changePasswordSchema, type ChangePasswordValues } from "../../../validation/formSchema";

import ErrorSnackbar from "../../errorModal/ErrorSnackbar";
import SuccessSnackbar from "../../successModal/SuccessSnackbar";
import Spinner from "../../spinner/Spinner";

export default function ChangeCredentials() {
  const { open, messages, close, handleErrors, handleZodErrors } = useFormErrorSnackbar();
  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();
  const { changeCredentials, spinner } = useChangeUserInfo();

  const { register, handleSubmit, reset } = useForm<ChangePasswordValues>();

  const onSubmit: SubmitHandler<ChangePasswordValues> = async (data) => {
    const result = changePasswordSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    try {
      await changeCredentials(data);
      handleSuccess("Password updated successfully!");
      reset();
    } catch (error: any) {
      handleErrors({ err: error.response.data });
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
      <SuccessSnackbar open={openSuccess} messages={messagesSuccess} onClose={closeSuccess} />
      {spinner && <Spinner />}
    </section>
  );
}
