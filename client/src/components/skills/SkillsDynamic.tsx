import styles from "./Skills.module.css";

import { useForm, type SubmitHandler } from "react-hook-form";

import { useInView } from "../../hooks/useInView";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { useDeletePortfolioInfo, useUpdatePortfolio } from "../../hooks/usePortfolioResponse";
import { skillSchema, type SkillValues } from "../../validation/formSchema";
import { SkillsDynamicProps } from "../../types/componentsPropsTypes";

import ErrorSnackbar from "../errorModal/ErrorSnackbar";

export default function SkillsDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: SkillsDynamicProps) {
  const checkPortfolioSkills = portfolio.skills && portfolio.skills.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("skills");
  const { deletePortfolioInfo } = useDeletePortfolioInfo();
  const { refView, isInView } = useInView(
    {
      threshold: 0.6,
    },
    flagForm
  );

  const { open, messages, close, handleErrors, handleZodErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<SkillValues>();

  const onSubmit: SubmitHandler<SkillValues> = async (data) => {
    const result = skillSchema.safeParse(data);

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
          {portfolio.skills?.map((curSkill) => (
            <div
              key={curSkill._id}
              className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}
            >
              <p>{curSkill.skill}</p>
              {viewType.isOwner && (
                <i
                  onClick={() => deletePortfolioInfo(curSkill._id, "skills")}
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
                <label htmlFor="skill">Add skill *</label>
                <input type="text" id="skill" {...register("skill")} />
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
