import styles from "./ContactMe.module.css";

import { Link } from "react-router-dom";
import { forwardRef, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

import ErrorSnackbar from "../errorModal/ErrorSnackbar";
import SuccessSnackbar from "../successModal/SuccessSnackbar";
import HeadingContainerStatic from "../heading-container/HeadingContainerStatic";

import { contactSchema, type ContactValues } from "../../validation/formSchema";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { usePortfolio } from "../../hooks/usePortfolio";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useFormSuccessSnackbar } from "../../hooks/useFormSuccessSnackbar";

export default forwardRef<HTMLDivElement>(function ContactMe(_, ref) {
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");

  const api = useAxiosPrivate();
  const { portfolio, changeLoadingState } = usePortfolio();
  const { open, messages, close, handleErrors, handleZodErrors, handleCustomError } =
    useFormErrorSnackbar();
  const { openSuccess, messagesSuccess, closeSuccess, handleSuccess } = useFormSuccessSnackbar();

  const { register, handleSubmit, reset } = useForm<ContactValues>();

  const onSubmit: SubmitHandler<ContactValues> = async (data) => {
    if (turnstileRef.current?.isExpired()) {
      handleCustomError("Verification expired. Please verify again.");
      turnstileRef.current?.reset();
      setCaptchaToken("");
      return;
    }

    if (!captchaToken) {
      handleCustomError("Please verify first.");
      return;
    }

    const result = contactSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    changeLoadingState(true);

    try {
      await api.post("/portfolio/contact-me", {
        ...data,
        ownerId: portfolio.owner,
        turnstileToken: captchaToken,
      });
      handleSuccess("Message sent successfully!");
    } catch (err: any) {
      handleErrors({ err: err.response.data });
    } finally {
      reset();
      changeLoadingState(false);
      turnstileRef.current?.reset();
      setCaptchaToken("");
    }
  };

  return (
    <section ref={ref} className="color">
      <HeadingContainerStatic header={"CONTACT ME"} />

      <div className={styles["contact-container"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["contact-form"]}>
          <label htmlFor="firstName">First Name *</label>
          <input type="text" id="firstName" {...register("firstName")} />

          <label htmlFor="lastName">Last Name *</label>
          <input type="text" id="lastName" {...register("lastName")} />

          <label htmlFor="email">Email *</label>
          <input type="text" id="email" {...register("email")} />

          <label htmlFor="message">Type your message here... *</label>
          <textarea id="message" {...register("message")}></textarea>

          <Turnstile
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
            ref={turnstileRef}
            onSuccess={setCaptchaToken}
            onError={(error) => {
              setCaptchaToken("");
              console.error("Turnstile error:", error);
            }}
            onExpire={() => {
              setCaptchaToken("");
              console.log("Token expired, resetting widget");
            }}
            options={{
              action: "contact-form",
              theme: "dark",
              size: "flexible",
              language: "en",
            }}
          />

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
