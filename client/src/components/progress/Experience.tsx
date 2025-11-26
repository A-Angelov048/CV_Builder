import { useInView } from "../../hooks/useInView";
import HeadingContainer from "../heading-container/HeadingContainer";
import styles from "./Progress.module.css";
import { forwardRef, useState } from "react";

export default forwardRef<HTMLDivElement>(function Experience(_, ref) {
  const { refView, isInView } = useInView({
    threshold: 0.2,
  });
  const [flagForm, setFlagForm] = useState(true);

  const changeState = (value: boolean) => {
    setFlagForm(value);
  };

  return (
    <section ref={ref}>
      <HeadingContainer
        header={"EXPERIENCE"}
        status={flagForm}
        changeStatus={changeState}
      />

      <div className="container">
        <div ref={refView} className={styles.timeline}>
          <div className={styles["timeline-item"]}>
            <div
              className={`${styles["timeline-left"]} ${
                isInView ? styles.slideInLeftVisible : styles.slideInLeft
              }`}
            >
              <span className={styles.year}>2035-2035</span>
              <span className={styles.role}>Executive</span>
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
            <div
              className={`${styles["timeline-left"]} ${
                isInView ? styles.slideInLeftVisible : styles.slideInLeft
              }`}
            >
              <span className={styles.year}>2035-2035</span>
              <span className={styles.role}>Lawyer</span>
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
            <div
              className={`${styles["timeline-left"]} ${
                isInView ? styles.slideInLeftVisible : styles.slideInLeft
              }`}
            >
              <span className={styles.year}>2035-2035</span>
              <span className={styles.role}>Internship</span>
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
            <label htmlFor="yearsExperience">Years experience *</label>
            <input type="text" id="yearsExperience" name="yearsExperience" />
          </div>
          <div className="form-group m-t">
            <label htmlFor="position">Position *</label>
            <input type="text" id="position" name="position" />
          </div>
          <div className="form-group m-t">
            <label htmlFor="companyName">Company Name *</label>
            <input type="text" id="companyName" name="companyName" />
          </div>
          <div className="form-group m-t">
            <label htmlFor="activity">Activity in the company *</label>
            <input type="text" id="activity" name="activity" />
          </div>
          <button className="main-button m-t" type="submit">
            Submit
          </button>
        </form>
      )}
    </section>
  );
});
