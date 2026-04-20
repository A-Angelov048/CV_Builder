import styles from "./Skills.module.css";
import { forwardRef } from "react";
import { useInView } from "../../hooks/useInView";
import HeadingContainerStatic from "../heading-container/HeadingContainerStatic";

export default forwardRef<HTMLDivElement>(function SkillsStatic(_, ref) {
  const { refView, isInView } = useInView({
    threshold: 0.6,
  });

  return (
    <section ref={ref}>
      <HeadingContainerStatic header={"SKILLS"} />

      <div ref={refView} className={styles["skills-grid"]}>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Microsoft Excel - Advanced</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Adobe - Proficient</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Microsoft Word - Advanced</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>French - Mother Tongue</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Power Point - Proficient</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Spanish - Advanced</p>
        </div>
      </div>
    </section>
  );
});
