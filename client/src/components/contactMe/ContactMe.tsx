import styles from "./ContactMe.module.css";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { contactSchema, type ContactValues } from "../../validation/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";
import { usePortfolio } from "../../hooks/usePortfolio";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { SuccessSnackbar } from "../successModal/SuccessSnackbar";
import { useFormSuccessSnackbar } from "../../hooks/useFormSuccessSnackbar";
import HeadingContainerStatic from "../heading-container/HeadingContainerStatic";

export default forwardRef<HTMLDivElement>(function ContactMe(_, ref) {
  const api = useAxiosPrivate();
  const { portfolio } = usePortfolio();
  const { open, messages, close, handleErrors } = useFormErrorSnackbar();
  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();

  const { register, handleSubmit, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactValues> = async (data) => {
    try {
      await api.post("/portfolio/contact-me", { ...data, ownerId: portfolio.owner });
    } catch (err: any) {
      handleErrors({ err: err.response.data });
    } finally {
      reset();
      handleSuccess("Message sent successfully!");
    }
  };

  const onError = (formErrors: FieldErrors<ContactValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section ref={ref} className="color">
      <HeadingContainerStatic header={"CONTACT ME"} />

      <div className={styles["contact-container"]}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles["contact-form"]}>
          <label htmlFor="firstName">First Name *</label>
          <input type="text" id="firstName" {...register("firstName")} />

          <label htmlFor="lastName">Last Name *</label>
          <input type="text" id="lastName" {...register("lastName")} />

          <label htmlFor="email">Email *</label>
          <input type="text" id="email" {...register("email")} />

          <label htmlFor="message">Type your message here... *</label>
          <textarea id="message" {...register("message")}></textarea>

          <button className="main-button" type="submit">
            Submit
          </button>
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
          <SuccessSnackbar open={openSuccess} messages={messagesSuccess} onClose={closeSuccess} />
        </form>

        <div className={styles.divider}></div>

        <div className={styles["contact-info"]}>
          <h3>{portfolio.about.name}</h3>
          <p className={styles.subtitle}>{portfolio.about.career}</p>

          <p>
            <strong>Phone:</strong>
            <br />
            {portfolio.about.phone}
          </p>
          <p>
            <strong>Email:</strong>
            <br />
            {portfolio.about.email}
          </p>

          <hr />

          <div className={styles["social-icons"]}>
            {portfolio.links?.linkedin && (
              <Link target="_blank" to={portfolio.links.linkedin}>
                <i className="bx bxl-linkedin-square"></i>
              </Link>
            )}

            {portfolio.links?.telegram && (
              <Link target="_blank" to={portfolio.links.telegram}>
                <i className="bx bxl-telegram"></i>
              </Link>
            )}

            {portfolio.links?.github && (
              <Link target="_blank" to={portfolio.links.github}>
                <i className="bx bxl-github"></i>
              </Link>
            )}

            {portfolio.links?.facebook && (
              <Link target="_blank" to={portfolio.links.facebook}>
                <i className="bx bxl-facebook"></i>
              </Link>
            )}

            {portfolio.links?.instagram && (
              <Link target="_blank" to={portfolio.links.instagram}>
                <i className="bx bxl-instagram"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
