import styles from "./SocialLinks.module.css";

import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useHandleForm } from "../../hooks/useHandleForm";
import { useCreatePortfolioLinks } from "../../hooks/usePortfolioResponse";
import { type SocialLinkValues, socialLinkSchema } from "../../validation/formSchema";
import type { Portfolio } from "../../context/portfolioContext";

import ErrorSnackbar from "../errorModal/ErrorSnackbar";
import DoubleButton from "../doubleButton/DoubleButton";

export default function SocialLinksDynamic({
  portfolio,
  viewType,
}: {
  portfolio: Portfolio;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
}) {
  const { createPortfolioLinks } = useCreatePortfolioLinks();
  const { flagForm, changeState } = useHandleForm(true);

  const { open, messages, close, handleErrors, handleZodErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<SocialLinkValues>();

  const onSubmit: SubmitHandler<SocialLinkValues> = async (data) => {
    const result = socialLinkSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

    if (!flagForm) {
      changeState(true);
    }

    try {
      await createPortfolioLinks(data);
    } catch (error: any) {
      changeState(false);
      handleErrors({ err: { message: error.response.data.message } });
    }
  };

  return (
    <>
      {flagForm && portfolio.links ? (
        <>
          <div className={styles["social-contacts"]}>
            <div className={styles["social-links"]}>
              <Link target="_blank" to={portfolio.links.linkedin}>
                <i className="bx bxl-linkedin-square"></i>
              </Link>

              {portfolio.links.telegram && (
                <Link target="_blank" to={portfolio.links.telegram}>
                  <i className="bx bxl-telegram"></i>
                </Link>
              )}

              {portfolio.links.github && (
                <Link target="_blank" to={portfolio.links.github}>
                  <i className="bx bxl-github"></i>
                </Link>
              )}

              {portfolio.links.facebook && (
                <Link target="_blank" to={portfolio.links.facebook}>
                  <i className="bx bxl-facebook"></i>
                </Link>
              )}

              {portfolio.links.instagram && (
                <Link target="_blank" to={portfolio.links.instagram}>
                  <i className="bx bxl-instagram"></i>
                </Link>
              )}
            </div>
          </div>

          <div className={styles.about}>
            <h2>Hello! I'm {portfolio.about.name}</h2>
            <p>{portfolio.links.shortInfo}</p>
            {viewType.isOwner && (
              <button onClick={() => changeState(false)} className="main-button m-t">
                Edit
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {viewType.isOwner && (
            <form onSubmit={handleSubmit(onSubmit)} className="grid-form">
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
                <label htmlFor="short-info">Type here short Info about you *</label>
                <textarea id="short-info" {...register("shortInfo")}></textarea>
              </div>
              <DoubleButton changeState={changeState} />
            </form>
          )}
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
        </>
      )}
    </>
  );
}
