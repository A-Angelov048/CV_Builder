import style from "../Profile.module.css";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

import { useAuth, type AccessTokenBE } from "../../../hooks/useAuth";
import { useAxiosPrivate } from "../../../hooks/useAxiosPrivate";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";

import { changeIdentitySchema, type ChangeIdentityValues } from "../../../validation/formSchema";
import { ErrorSnackbar } from "../../errorModal/ErrorSnackbar";

export default function ChangeIdentity() {
  const api = useAxiosPrivate();
  const { authData, changeAuthState } = useAuth();
  const { open, messages, close, handleErrors, handleCustomError } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<ChangeIdentityValues>({
    resolver: zodResolver(changeIdentitySchema),
  });

  const onSubmit: SubmitHandler<ChangeIdentityValues> = async (data) => {
    if (data.username === authData.username) {
      return handleCustomError("New username cannot be the same as the current one.");
    }

    try {
      const token: AccessTokenBE = await api.put("/auth/change-identity", data);
      changeAuthState(token.data);
    } catch (err: any) {
      handleErrors({ err: err.response.data });
    }
  };

  const onError = (formErrors: FieldErrors<ChangeIdentityValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section className={style["mono-section"]}>
      <div className={style["mono-section-header"]}>
        <h2 className={style["mono-section-title"]}>Identity Details</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
    </section>
  );
}
