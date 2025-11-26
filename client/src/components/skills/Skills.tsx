import styles from "./Skills.module.css";
import { forwardRef, useState } from "react";
import HeadingContainer from "../heading-container/HeadingContainer";
import { useInView } from "../../hooks/useInView";

export default forwardRef<HTMLDivElement>(function Skills(_, ref) {
  const { refView, isInView } = useInView({
    threshold: 0.6,
  });
  const [flagForm, setFlagForm] = useState(true);

  const changeState = (value: boolean) => {
    setFlagForm(value);
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
        <form className="simple-form">
          <div className="form-group">
            <label htmlFor="skill">Add skill *</label>
            <input type="text" id="skill" name="skill" />
          </div>
          <button className="main-button m-t" type="submit">
            Submit
          </button>
        </form>
      )}
    </section>
  );
});
