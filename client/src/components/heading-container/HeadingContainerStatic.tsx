import styles from "./HeadingContainer.module.css";

export default function HeadingContainerStatic({ header }: { header: string }) {
  return (
    <div className={styles.heading}>
      <h2 className={styles["title-heading"]}>{header}</h2>
    </div>
  );
}
