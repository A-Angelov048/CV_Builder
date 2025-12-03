import styles from "./SocialLinks.module.css";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import {
  socialLinkSchema,
  type SocialLinkValues,
} from "../../validation/formSchema";
import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";
import useHandleForm from "../../hooks/useHandleForm";

export default function SocialLinks() {
  const { flagForm, changeState } = useHandleForm(true);

  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<SocialLinkValues>({
    resolver: zodResolver(socialLinkSchema),
  });

  const onSubmit: SubmitHandler<SocialLinkValues> = (data) => {
    console.log("Form submitted:", data);
    changeState(true);
  };

  const onError = (formErrors: FieldErrors<SocialLinkValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section className="max-width">
      {flagForm ? (
        <>
          <div className={styles["social-contacts"]}>
            <div className={styles["social-links"]}>
              <Link to="#">
                <i className="bx bxl-linkedin-square"></i>
              </Link>
              <Link to="#">
                <i className="bx bxl-telegram"></i>
              </Link>
              <Link to="#">
                <i className="bx bxl-github"></i>
              </Link>
              <Link to="#">
                <i className="bx bxl-facebook"></i>
              </Link>
              <Link to="#">
                <i className="bx bxl-instagram"></i>
              </Link>
            </div>
          </div>

          <div className={styles.about}>
            <h2>Hello! I'm Rachel</h2>
            <p>
              I'm a paragraph. Click here to add your own text and edit me. It’s
              easy. Just click “Edit Text” or double click me to add your own
              content and make changes to the font. I’m a great place for you to
              tell a story and let your users know a little more about you.
            </p>
            <button
              onClick={() => changeState(false)}
              className="main-button m-t"
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="grid-form"
          >
            <div className="form-group">
              <label htmlFor="linkedin">Linkedin contact *</label>
              <input type="text" id="linkedin" {...register("linkedin")} />
            </div>
            <div className="form-group">
              <label htmlFor="telegram">Telegram contact</label>
              <input type="text" id="telegram" {...register("telegram")} />
            </div>
            <div className="form-group">
              <label htmlFor="github">Github contact</label>
              <input type="text" id="github" {...register("github")} />
            </div>
            <div className="form-group">
              <label htmlFor="facebook">Facebook contact</label>
              <input type="text" id="facebook" {...register("facebook")} />
            </div>
            <div className="form-group">
              <label htmlFor="instagram">Instagram contact</label>
              <input type="text" id="instagram" {...register("instagram")} />
            </div>
            <div className="form-group">
              <label htmlFor="short-info">
                Type here short Info about you *
              </label>
              <textarea id="short-info" {...register("shortInfo")}></textarea>
            </div>
            <button className="main-button" type="submit">
              Submit
            </button>
          </form>
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
        </>
      )}
    </section>
  );
}
