import styles from "./Skills.module.css";
import { forwardRef, useState } from "react";
import HeadingContainer from "../heading-container/HeadingContainer";

export default forwardRef<HTMLDivElement>(function Skills(_, ref) {
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

      <div className={styles["skills-grid"]}>
        <div className={styles["skill-box"]}>
          <p>Microsoft Excel - Advanced</p>
          <i className="bx bx-trash"></i>
        </div>
        <div className={styles["skill-box"]}>
          <p>Adobe - Proficient</p>
          <i className="bx bx-trash"></i>
        </div>
        <div className={styles["skill-box"]}>
          <p>Microsoft Word - Advanced</p>
          <i className="bx bx-trash"></i>
        </div>
        <div className={styles["skill-box"]}>
          <p>French - Mother Tongue</p>
          <i className="bx bx-trash"></i>
        </div>
        <div className={styles["skill-box"]}>
          <p>Power Point - Proficient</p>
          <i className="bx bx-trash"></i>
        </div>
        <div className={styles["skill-box"]}>
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
