import styles from "../Skills.module.css";

import { useForm, type SubmitHandler } from "react-hook-form";

import { useInView } from "../../../hooks/useInView";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";
import { useDeletePortfolioInfo, useUpdatePortfolio } from "../../../hooks/usePortfolioResponse";
import { softSkillSchema, type SoftSkillValues } from "../../../validation/formSchema";
import { SoftSkillsDynamicProps } from "../../../types/componentsPropsTypes";

import ErrorSnackbar from "../../errorModal/ErrorSnackbar";

export default function SoftSkillsDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: SoftSkillsDynamicProps) {
  const checkPortfolioSkills = portfolio.softSkills && portfolio.softSkills.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("soft-skills");
  const { deletePortfolioInfo } = useDeletePortfolioInfo();
  const { refView, isInView } = useInView(
    {
      threshold: 0.6,
    },
    flagForm
  );

  const { open, messages, close, handleErrors, handleZodErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<SoftSkillValues>();

  const onSubmit: SubmitHandler<SoftSkillValues> = async (data) => {
    const result = softSkillSchema.safeParse(data);

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
      {flagForm && checkPortfolioSkills ? (
        <div ref={refView} className={styles["skills-grid"]}>
          {portfolio.softSkills?.map((curSkill) => (
            <div
              key={curSkill._id}
              className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}
            >
              <p>{curSkill.softSkill}</p>
              {viewType.isOwner && (
                <i
                  onClick={() => deletePortfolioInfo(curSkill._id, "soft-skills")}
                  className="bx bx-trash"
                ></i>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          {viewType.isOwner && (
            <form onSubmit={handleSubmit(onSubmit)} className="simple-form">
              <div className="form-group">
                <label htmlFor="softSkill">Add skill *</label>
                <input type="text" id="softSkill" {...register("softSkill")} />
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
