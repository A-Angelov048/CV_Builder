import styles from "../Progress.module.css";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUpdatePortfolio } from "../../../hooks/usePortfolioResponse";
import { useInView } from "../../../hooks/useInView";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";

import type { Portfolio } from "../../../context/portfolioContext";
import { ErrorSnackbar } from "../../errorModal/ErrorSnackbar";
import { educationSchema, type EducationValues } from "../../../validation/formSchema";

type ExperienceDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export default function EducationDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: ExperienceDynamicProps) {
  const checkPortfolioEducation = portfolio.education && portfolio.education.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("education");

  const { refView, isInView } = useInView({
    threshold: 0.2,
  });

  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
  });

  const onSubmit: SubmitHandler<EducationValues> = async (data) => {
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

  const onError = (formErrors: FieldErrors<EducationValues>) => {
    handleErrors(formErrors);
  };

  return (
    <>
      {flagForm && checkPortfolioEducation ? (
        <div className="container">
          <div ref={refView} className={styles.timeline}>
            {portfolio.education?.map((curEducation) => (
              <div key={curEducation._id} className={styles["timeline-item"]}>
                <div
                  className={`${styles["timeline-left"]} ${
                    isInView ? styles.slideInLeftVisible : styles.slideInLeft
                  }`}
                >
                  <span className={styles.year}>{curEducation.yearsEducation}</span>
                  <span className={styles.role}>{curEducation.degree}</span>
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
                    <h3 className={styles.company}>{curEducation.nameSchool}</h3>
                    {viewType.isOwner && <i className="bx bx-trash"></i>}
                  </div>
                  <p>{curEducation.infoSchool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="grid-form max-width">
            <div className="form-group m-t">
              <label htmlFor="yearsEducation">Years of education *</label>
              <input type="text" id="yearsEducation" {...register("yearsEducation")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="degree">Degree / Diploma & Specialty*</label>
              <input type="text" id="degree" {...register("degree")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="nameSchool">Name of the school *</label>
              <input type="text" id="nameSchool" {...register("nameSchool")} />
            </div>
            <div className="form-group m-t">
              <label htmlFor="infoSchool">Information of the school *</label>
              <textarea id="infoSchool" {...register("infoSchool")} />
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
