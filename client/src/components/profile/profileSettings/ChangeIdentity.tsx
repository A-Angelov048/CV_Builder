import style from "../Profile.module.css";

import { useForm, type SubmitHandler } from "react-hook-form";

import { useAuth } from "../../../hooks/useAuth";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";
import { useFormSuccessSnackbar } from "../../../hooks/useFormSuccessSnackbar";
import { useChangeUserInfo } from "../../../hooks/useAuthResponse";
import { changeIdentitySchema, type ChangeIdentityValues } from "../../../validation/formSchema";

import ErrorSnackbar from "../../errorModal/ErrorSnackbar";
import SuccessSnackbar from "../../successModal/SuccessSnackbar";
import Spinner from "../../spinner/Spinner";

export default function ChangeIdentity() {
  const { authData } = useAuth();
  const { open, messages, close, handleErrors, handleCustomError, handleZodErrors } =
    useFormErrorSnackbar();
  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();
  const { changeIdentity, spinner } = useChangeUserInfo();

  const { register, handleSubmit, reset } = useForm<ChangeIdentityValues>();

  const onSubmit: SubmitHandler<ChangeIdentityValues> = async (data) => {
    if (data.username === authData.username) {
      return handleCustomError("New username cannot be the same as the current one.");
    }

    const result = changeIdentitySchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    try {
      await changeIdentity(data);
      handleSuccess("Identity details updated successfully!");
      reset();
    } catch (error: any) {
      handleErrors({ err: error.response.data });
    }
  };

  return (
    <section className={style["mono-section"]}>
      <div className={style["mono-section-header"]}>
        <h2 className={style["mono-section-title"]}>Identity Details</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style["mono-form-group"]}>
          <label htmlFor="username" className={style["mono-label"]}>
            New Username
          </label>
          <input
            id="username"
            type="text"
            className={style["mono-input"]}
            {...register("username")}
          />
        </div>
        <div className={style["mono-form-group"]}>
          <label htmlFor="email" className={style["mono-label"]}>
            New Email
          </label>
          <input id="email" type="text" className={style["mono-input"]} {...register("email")} />
        </div>
        <button className={style["mono-button-primary"]} type="submit">
          Save Changes
        </button>
      </form>
      <ErrorSnackbar open={open} messages={messages} onClose={close} />
      <SuccessSnackbar open={openSuccess} messages={messagesSuccess} onClose={closeSuccess} />
      {spinner && <Spinner />}
    </section>
  );
}
