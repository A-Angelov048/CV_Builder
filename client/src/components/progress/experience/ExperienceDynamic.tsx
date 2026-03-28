import styles from "../Progress.module.css";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";
import { useInView } from "../../../hooks/useInView";
import { experienceSchema, type ExperienceValues } from "../../../validation/formSchema";
import { ErrorSnackbar } from "../../errorModal/ErrorSnackbar";
import type { Portfolio } from "../../../context/portfolioContext";
import { useDeletePortfolioInfo, useUpdatePortfolio } from "../../../hooks/usePortfolioResponse";

type ExperienceDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export default function ExperienceDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: ExperienceDynamicProps) {
  const checkPortfolioExperience = portfolio.experience && portfolio.experience.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("experience");
  const { deletePortfolioInfo } = useDeletePortfolioInfo();

  const { refView, isInView } = useInView({
    threshold: 0.2,
  });

  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<ExperienceValues>({
    resolver: zodResolver(experienceSchema),
  });

  const onSubmit: SubmitHandler<ExperienceValues> = async (data) => {
    if (!flagForm) {
      changeStatus(true);
    }

    try {
      await updatePortfolio(data);
    } catch (error: any) {
      changeStatus(false);
      handleErrors({ err: { message: error.response.data.message } });
    }
  };

  const onError = (formErrors: FieldErrors<ExperienceValues>) => {
    handleErrors(formErrors);
  };

  return (
    <>
      {flagForm && checkPortfolioExperience ? (
        <div className="container">
          <div ref={refView} className={styles.timeline}>
            {portfolio.experience?.map((curExperience) => (
              <div key={curExperience._id} className={styles["timeline-item"]}>
                <div
                  className={`${styles["timeline-left"]} ${
                    isInView ? styles.slideInLeftVisible : styles.slideInLeft
                  }`}
                >
                  <span className={styles.year}>{curExperience.yearsExperience}</span>
                  <span className={styles.role}>{curExperience.position}</span>
                </div>
                <div className={styles["timeline-separator"]}>
                  <i className="bx bxs-circle"></i>
                </div>
                <div
                  className={`${styles["timeline-right"]} ${
                    isInView ? styles.slideInRightVisible : styles.slideInRight
                  }`}
                >
                  <div className={styles["company-container"]}>
                    <h3 className={styles.company}>{curExperience.companyName}</h3>
                    {viewType.isOwner && (
                      <i
                        onClick={() => deletePortfolioInfo(curExperience._id, "experience")}
                        className="bx bx-trash"
                      ></i>
                    )}
                  </div>
                  <p>{curExperience.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="grid-form max-width">
            <div className="form-group m-t">
              <label htmlFor="yearsExperience">Years experience *</label>
              <input type="text" id="yearsExperience" {...register("yearsExperience")} autoFocus />
            </div>
            <div className="form-group m-t">
              <label htmlFor="position">Position *</label>
              <input type="text" id="position" {...register("position")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="companyName">Company Name *</label>
              <input type="text" id="companyName" {...register("companyName")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="activity">Activity in the company *</label>
              <textarea id="activity" {...register("activity")} />
            </div>
            <button className="main-button m-t" type="submit">
              Submit
            </button>
          </form>
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
        </>
      )}
    </>
  );
}
