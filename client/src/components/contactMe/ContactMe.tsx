import styles from "./ContactMe.module.css";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { contactSchema, type ContactValues } from "../../validation/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";

export default forwardRef<HTMLDivElement>(function ContactMe(_, ref) {
  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactValues> = (data) => {
    console.log("Form submitted:", data);
  };

  const onError = (formErrors: FieldErrors<ContactValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section ref={ref} className="color">
      <div className="heading-container">
        <h2 className="title">CONTACT ME</h2>
      </div>

      <div className={styles["contact-container"]}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={styles["contact-form"]}
        >
          <label htmlFor="first-name">First Name *</label>
          <input type="text" id="first-name" {...register("firstName")} />

          <label htmlFor="last-name">Last Name *</label>
          <input type="text" id="last-name" {...register("lastName")} />

          <label htmlFor="email">Email *</label>
          <input type="email" id="email" {...register("email")} />

          <label htmlFor="message">Type your message here... *</label>
          <textarea id="message" {...register("message")}></textarea>

          <button className="main-button" type="submit">
            Submit
          </button>
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
        </form>

        <div className={styles.divider}></div>

        <div className={styles["contact-info"]}>
          <h3>Rachel Smith</h3>
          <p className={styles.subtitle}>LAWYER & CONSULTANT</p>

          <p>
            <strong>Phone:</strong>
            <br />
            123-456-789
          </p>
          <p>
            <strong>Email:</strong>
            <br />
            info@mysite.com
          </p>

          <hr />

          <div className={styles["social-icons"]}>
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
      </div>
    </section>
  );
});
