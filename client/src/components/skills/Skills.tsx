import styles from "./Skills.module.css";

import { forwardRef } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import HeadingContainer from "../heading-container/HeadingContainer";
import useHandleForm from "../../hooks/useHandleForm";
import { useInView } from "../../hooks/useInView";
import { useFormErrorSnackbar } from "../../hooks/useFormErrorSnackbar";
import { skillSchema, type SkillValues } from "../../validation/formSchema";
import { ErrorSnackbar } from "../errorModal/ErrorSnackbar";

export default forwardRef<HTMLDivElement>(function Skills(_, ref) {
  const { refView, isInView } = useInView({
    threshold: 0.6,
  });
  const { flagForm, changeState } = useHandleForm(true);

  const { open, messages, close, handleErrors } = useFormErrorSnackbar();

  const { register, handleSubmit } = useForm<SkillValues>({
    resolver: zodResolver(skillSchema),
  });

  const onSubmit: SubmitHandler<SkillValues> = (data) => {
    console.log("Form submitted:", data);
  };

  const onError = (formErrors: FieldErrors<SkillValues>) => {
    handleErrors(formErrors);
  };

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"SKILLS"}
        status={flagForm}
        changeStatus={changeState}
      />

      <div ref={refView} className={styles["skills-grid"]}>
        <div
          className={`${styles["skill-box"]} ${
            isInView ? styles.fadeInUp : styles.fadeOut
          }`}
        >
          <p>Microsoft Excel - Advanced</p>
          <i className="bx bx-trash"></i>
        </div>
        <div
          className={`${styles["skill-box"]} ${
            isInView ? styles.fadeInUp : styles.fadeOut
          }`}
        >
          <p>Adobe - Proficient</p>
          <i className="bx bx-trash"></i>
        </div>
        <div
          className={`${styles["skill-box"]} ${
            isInView ? styles.fadeInUp : styles.fadeOut
          }`}
        >
          <p>Microsoft Word - Advanced</p>
          <i className="bx bx-trash"></i>
        </div>
        <div
          className={`${styles["skill-box"]} ${
            isInView ? styles.fadeInUp : styles.fadeOut
          }`}
        >
          <p>French - Mother Tongue</p>
          <i className="bx bx-trash"></i>
        </div>
        <div
          className={`${styles["skill-box"]} ${
            isInView ? styles.fadeInUp : styles.fadeOut
          }`}
        >
          <p>Power Point - Proficient</p>
          <i className="bx bx-trash"></i>
        </div>
        <div
          className={`${styles["skill-box"]} ${
            isInView ? styles.fadeInUp : styles.fadeOut
          }`}
        >
          <p>Spanish - Advanced</p>
          <i className="bx bx-trash"></i>
        </div>
      </div>

      {!flagForm && (
        <>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="simple-form"
          >
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
    </section>
  );
});
