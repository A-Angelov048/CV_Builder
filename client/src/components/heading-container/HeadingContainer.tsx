import styles from "./HeadingContainer.module.css";

type HeadingContainerProps = {
  header: string;
  status: boolean;
  changeStatus: (value: boolean) => void;
  viewType: {
    isOwner: boolean;
    canView: boolean;
  };
  buttonCondition?: boolean;
};

export default function HeadingContainer({
  header,
  status,
  changeStatus,
  viewType,
  buttonCondition = true,
}: HeadingContainerProps) {
  return (
    <div className={styles.heading}>
      <h2 className={styles["title-heading"]}>{header}</h2>

      {status === true && viewType?.isOwner && buttonCondition && (
        <div
          onClick={() => changeStatus(false)}
          className={`${styles["handle-iteration"]} ${styles.green}`}
        >
          <p>Add</p>
          <i className="bx bxs-add-to-queue"></i>
        </div>
      )}

      {status === false && viewType?.isOwner && buttonCondition && (
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
