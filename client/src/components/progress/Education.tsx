import styles from "./Progress.module.css";
import { forwardRef, useState } from "react";
import HeadingContainer from "../heading-container/HeadingContainer";

export default forwardRef<HTMLDivElement>(function Education(_, ref) {
  const [flagForm, setFlagForm] = useState(true);

  const changeState = (value: boolean) => {
    setFlagForm(value);
  };

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"EDUCATION"}
        status={flagForm}
        changeStatus={changeState}
      />

      <div className="container">
        <div className={styles.timeline}>
          <div className={styles["timeline-item"]}>
            <div className={styles["timeline-left"]}>
              <span className={styles.year}>2035-2035</span>
              <span className={styles.role}>Executive</span>
            </div>
            <div className={styles["timeline-separator"]}>
              <i className="bx bxs-circle"></i>
            </div>
            <div className={styles["timeline-right"]}>
              <div className={styles["company-container"]}>
                <h3 className={styles.company}>Company Name</h3>
                <i className="bx bx-trash"></i>
              </div>
              <p>
                I'm a paragraph. Click here to add your own text and edit me.
                It’s easy. Just click “Edit Text” or double click me to add your
                own content and make changes to the font. I’m a great place for
                you to tell a story and let your users know a little more about
                you.
              </p>
            </div>
          </div>

          <div className={styles["timeline-item"]}>
            <div className={styles["timeline-left"]}>
              <span className={styles.year}>2035-2035</span>
              <span className={styles.role}>Lawyer</span>
            </div>
            <div className={styles["timeline-separator"]}>
              <i className="bx bxs-circle"></i>
            </div>
            <div className={styles["timeline-right"]}>
              <div className={styles["company-container"]}>
                <h3 className={styles.company}>Company Name</h3>
                <i className="bx bx-trash"></i>
              </div>
              <p>
                I'm a paragraph. Click here to add your own text and edit me.
                It’s easy. Just click “Edit Text” or double click me to add your
                own content and make changes to the font. I’m a great place for
                you to tell a story and let your users know a little more about
                you.
              </p>
            </div>
          </div>

          <div className={styles["timeline-item"]}>
            <div className={styles["timeline-left"]}>
              <span className={styles.year}>2035-2035</span>
              <span className={styles.role}>Internship</span>
            </div>
            <div className={styles["timeline-separator"]}>
              <i className="bx bxs-circle"></i>
            </div>
            <div className={styles["timeline-right"]}>
              <div className={styles["company-container"]}>
                <h3 className={styles.company}>Company Name</h3>
                <i className="bx bx-trash"></i>
              </div>
              <p>
                I'm a paragraph. Click here to add your own text and edit me.
                It’s easy. Just click “Edit Text” or double click me to add your
                own content and make changes to the font. I’m a great place for
                you to tell a story and let your users know a little more about
                you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {!flagForm && (
        <form className="grid-form max-width">
          <div className="form-group m-t">
            <label htmlFor="yearsEducation">Years & Place education *</label>
            <input type="text" id="yearsEducation" name="yearsEducation" />
          </div>
          <div className="form-group m-t">
            <label htmlFor="education">Degree / Diploma & Specialty*</label>
            <input type="text" id="education" name="education" />
          </div>
          <div className="form-group m-t">
            <label htmlFor="nameSchool">Name of the school *</label>
            <input type="text" id="nameSchool" name="nameSchool" />
          </div>
          <div className="form-group m-t">
            <label htmlFor="infoSchool">Information of the school *</label>
            <input type="text" id="infoSchool" name="infoSchool" />
          </div>
          <button className="main-button m-t" type="submit">
            Submit
          </button>
        </form>
      )}
    </section>
  );
});
