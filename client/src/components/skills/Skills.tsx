import styles from "./Skills.module.css";
import { forwardRef } from "react";

export default forwardRef<HTMLDivElement>(function Skills(_, ref) {
  return (
    <section ref={ref}>
      <div className="heading-container">
        <h2 className="title">SKILLS</h2>
      </div>
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
      <form className="simple-form">
        <div className="form-group">
          <label htmlFor="skill">Add skill *</label>
          <input type="text" id="skill" name="skill" />
        </div>
        <button className="main-button m-t" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
});
