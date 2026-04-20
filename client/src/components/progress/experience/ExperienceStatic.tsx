import styles from "../Progress.module.css";
import { useInView } from "../../../hooks/useInView";
import { forwardRef } from "react";
import HeadingContainerStatic from "../../heading-container/HeadingContainerStatic";

export default forwardRef<HTMLDivElement>(function ExperienceStatic(_, ref) {
  const { refView, isInView } = useInView({
    threshold: 0.2,
  });

  return (
    <section ref={ref}>
      <HeadingContainerStatic header={"EXPERIENCE"} />

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
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae facere odit
                ratione placeat et. Reiciendis velit dolores, magni pariatur repellat dolore,
                molestias quod maxime labore nulla laboriosam incidunt neque nihil.
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
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae facere odit
                ratione placeat et. Reiciendis velit dolores, magni pariatur repellat dolore,
                molestias quod maxime labore nulla laboriosam incidunt neque nihil.
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
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae facere odit
                ratione placeat et. Reiciendis velit dolores, magni pariatur repellat dolore,
                molestias quod maxime labore nulla laboriosam incidunt neque nihil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
