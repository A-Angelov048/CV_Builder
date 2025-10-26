import styles from "./HeadingContainer.module.css";

type HeadingContainerProps = {
  header: string;
  status: boolean;
  changeStatus: (value: boolean) => void;
};

export default function HeadingContainer({
  header,
  status,
  changeStatus,
}: HeadingContainerProps) {
  return (
    <div className={styles.heading}>
      <h2 className={styles["title-heading"]}>{header}</h2>
      {status ? (
        <div
          onClick={() => changeStatus(false)}
          className={`${styles["handle-iteration"]} ${styles.green}`}
        >
          <p>Add</p>
          <i className="bx bxs-add-to-queue"></i>
        </div>
      ) : (
        <div
          onClick={() => changeStatus(true)}
          className={`${styles["handle-iteration"]} ${styles.red}`}
        >
          <p>Close</p>
          <i className="bx bx-window-close"></i>
        </div>
      )}
    </div>
  );
}
