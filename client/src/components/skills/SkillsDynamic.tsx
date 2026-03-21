import styles from "./Skills.module.css";

import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useInView } from "../../hooks/useInView";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { skillSchema, type SkillValues } from "../../validation/formSchema";
import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";
import type { Portfolio } from "../../context/portfolioContext";
import { useUpdatePortfolio } from "../../hooks/usePortfolioResponse";

type SkillsDynamicProps = {
  portfolio: Portfolio;
  flagForm: boolean;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  changeStatus: (value: boolean) => void;
};

export default function SkillsDynamic({
  portfolio,
  flagForm,
  viewType,
  changeStatus,
}: SkillsDynamicProps) {
  const checkPortfolioSkills = portfolio.skills && portfolio.skills.length > 0;

  const { updatePortfolio } = useUpdatePortfolio("skills");

  const { refView, isInView } = useInView({
    threshold: 0.6,
  });

  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
  });

  const onSubmit: SubmitHandler<SkillValues> = async (data) => {
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

  const onError = (formErrors: FieldErrors<SkillValues>) => {
    handleErrors(formErrors);
  };

  return (
    <>
      {flagForm && checkPortfolioSkills ? (
        <div ref={refView} className={styles["skills-grid"]}>
          {portfolio.skills?.map((curSkill, index) => (
            <div
              key={index}
              className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}
            >
              <p>{curSkill.skill}</p>
              {viewType.isOwner && <i className="bx bx-trash"></i>}
            </div>
          ))}
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="simple-form">
            <div className="form-group">
              <label htmlFor="skill">Add skill *</label>
              <input type="text" id="skill" {...register("skill")} />
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
