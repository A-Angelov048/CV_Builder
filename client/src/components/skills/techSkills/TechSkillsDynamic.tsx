import styles from "../Skills.module.css";

import { useForm, type SubmitHandler } from "react-hook-form";

import { useInView } from "../../../hooks/useInView";
import { useFormErrorSnackbar } from "../../../hooks/useFormErrorSnackbar";
import { useDeletePortfolioInfo, useUpdatePortfolio } from "../../../hooks/usePortfolioResponse";
import { techSkillSchema, type TechSkillValues } from "../../../validation/formSchema";
import { TechSkillsDynamicProps } from "../../../types/componentsPropsTypes";

import ErrorSnackbar from "../../errorModal/ErrorSnackbar";

export default function TechSkillsDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: TechSkillsDynamicProps) {
  const checkPortfolioSkills = portfolio.techSkills && portfolio.techSkills.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("tech-skills");
  const { deletePortfolioInfo } = useDeletePortfolioInfo();
  const { refView, isInView } = useInView(
    {
      threshold: 0.6,
    },
    flagForm
  );

  const { open, messages, close, handleErrors, handleZodErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<TechSkillValues>();

  const onSubmit: SubmitHandler<TechSkillValues> = async (data) => {
    const result = techSkillSchema.safeParse(data);

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
          {portfolio.techSkills?.map((curSkill) => (
            <div
              key={curSkill._id}
              className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}
            >
              <p>{curSkill.techSkill}</p>
              {viewType.isOwner && (
                <i
                  onClick={() => deletePortfolioInfo(curSkill._id, "tech-skills")}
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
                <label htmlFor="techSkill">Add skill *</label>
                <input type="text" id="techSkill" {...register("techSkill")} />
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
