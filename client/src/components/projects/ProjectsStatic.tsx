import styles from "./Projects.module.css";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import HeadingContainerStatic from "../heading-container/HeadingContainerStatic";

export default forwardRef<HTMLDivElement>(function ProjectsStatic(_, ref) {
  return (
    <section ref={ref}>
      <HeadingContainerStatic header={"PROJECTS"} />

      <div className={styles["project-container"]}>
        <div className={styles["projects-grid"]}>
          <div className={styles["project-card"]}>
            <Link to="#" rel="noopener noreferrer" className={styles["project-link"]}>
              <div className={styles["preview-wrapper"]}>
                <img src="No_Image_Available.jpg" alt="Project 1 Preview" />
              </div>
              <p className={styles["project-name"]}>Project 1</p>
            </Link>
            <Link
              to="#"
              rel="noopener noreferrer"
              className={`${styles["project-name"]} ${styles.brief}`}
            >
              Brief documentation of the project
            </Link>
          </div>

          <div className={styles["project-card"]}>
            <Link to="#" rel="noopener noreferrer" className={styles["project-link"]}>
              <div className={styles["preview-wrapper"]}>
                <img src="No_Image_Available.jpg" alt="Project 2 Preview" />
              </div>
              <p className={styles["project-name"]}>Project 2</p>
            </Link>
            <Link
              to="#"
              rel="noopener noreferrer"
              className={`${styles["project-name"]} ${styles.brief}`}
            >
              Brief documentation of the project
            </Link>
          </div>

          <div className={styles["project-card"]}>
            <Link to="#" rel="noopener noreferrer" className={styles["project-link"]}>
              <div className={styles["preview-wrapper"]}>
                <img src="No_Image_Available.jpg" alt="Project 3 Preview" />
              </div>
              <p className={styles["project-name"]}>Project 3</p>
            </Link>
            <Link
              to="#"
              rel="noopener noreferrer"
              className={`${styles["project-name"]} ${styles.brief}`}
            >
              Brief documentation of the project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});
