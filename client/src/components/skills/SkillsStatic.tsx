import styles from "./Skills.module.css";
import { useInView } from "../../hooks/useInView";

export default function SkillsStatic() {
  const { refView, isInView } = useInView({
    threshold: 0.6,
  });

  return (
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
  );
}
