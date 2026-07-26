import styles from "../Skills.module.css";
import { forwardRef } from "react";
import { useInView } from "../../../hooks/useInView";
import HeadingContainerStatic from "../../heading-container/HeadingContainerStatic";

export default forwardRef<HTMLDivElement>(function SoftSkillsStatic(_, ref) {
  const { refView, isInView } = useInView({
    threshold: 0.6,
  });

  return (
    <section ref={ref}>
      <HeadingContainerStatic header={"SOFT SKILLS"} />

      <div ref={refView} className={styles["skills-grid"]}>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Communication</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Leadership</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Problem Solving</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Teamwork</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Power Point - Proficient</p>
        </div>
        <div className={`${styles["skill-box"]} ${isInView ? styles.fadeInUp : styles.fadeOut}`}>
          <p>Time Management</p>
        </div>
      </div>
    </section>
  );
});
