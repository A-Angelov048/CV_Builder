import styles from "../Progress.module.css";

import { useForm, type SubmitHandler } from "react-hook-form";

import { useDeletePortfolioInfo, useUpdatePortfolio } from "../../../hooks/usePortfolioResponse";
import { useInView } from "../../../hooks/useInView";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";
import { educationSchema, type EducationValues } from "../../../validation/formSchema";
import { EducationDynamicProps } from "../../../types/componentsPropsTypes";

import ErrorSnackbar from "../../errorModal/ErrorSnackbar";

export default function EducationDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: EducationDynamicProps) {
  const checkPortfolioEducation = portfolio.education && portfolio.education.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("education");
  const { deletePortfolioInfo } = useDeletePortfolioInfo();

  const { refView, isInView } = useInView(
    {
      threshold: 0.2,
    },
    flagForm
  );

  const { open, messages, close, handleErrors, handleZodErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<EducationValues>();

  const onSubmit: SubmitHandler<EducationValues> = async (data) => {
    const result = educationSchema.safeParse(data);

    if (!result.success) return handleZodErrors(result.error);

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
                    {viewType.isOwner && (
                      <i
                        onClick={() => deletePortfolioInfo(curEducation._id, "education")}
                        className="bx bx-trash"
                      ></i>
                    )}
                  </div>
                  <p>{curEducation.infoSchool}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {viewType.isOwner && (
            <form onSubmit={handleSubmit(onSubmit)} className="grid-form max-width">
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
          )}
          <ErrorSnackbar open={open} messages={messages} onClose={close} />
        </>
      )}
    </>
  );
}
