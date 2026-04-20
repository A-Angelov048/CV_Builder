import styles from "../Progress.module.css";
import { useInView } from "../../../hooks/useInView";
import { forwardRef } from "react";
import HeadingContainerStatic from "../../heading-container/HeadingContainerStatic";

export default forwardRef<HTMLDivElement>(function EducationStatic(_, ref) {
  const { refView, isInView } = useInView({
    threshold: 0.2,
  });

  return (
    <section ref={ref}>
      <HeadingContainerStatic header={"EDUCATION"} />

      <div className="container">
        <div ref={refView} className={styles.timeline}>
          <div className={styles["timeline-item"]}>
            <div
              className={`${styles["timeline-left"]} ${
                isInView ? styles.slideInLeftVisible : styles.slideInLeft
              }`}
            >
              <span className={styles.year}>2035-2035</span>
              <span className={styles.role}>Doctor</span>
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
                <h3 className={styles.company}>University Name</h3>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero necessitatibus
                quas, accusantium expedita culpa, vero esse ipsum numquam minima alias praesentium
                magnam magni cum at minus ad? Modi, nihil ab.
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
              <span className={styles.role}>Engineer</span>
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
                <h3 className={styles.company}>University Name</h3>
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. At labore, vitae vel
                ducimus amet incidunt, officiis quas nesciunt minus reiciendis eius temporibus
                eaque, excepturi obcaecati hic nulla atque neque reprehenderit!
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
              <span className={styles.role}>Teacher</span>
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
                <h3 className={styles.company}>Mid School name</h3>
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam labore totam nesciunt
                perspiciatis vero placeat ab, voluptates minus est eveniet veniam eum harum tenetur
                incidunt exercitationem cum numquam nemo consequuntur!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
