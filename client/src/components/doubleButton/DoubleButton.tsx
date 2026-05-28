import styles from "./DoubleButton.module.css";

export default function DoubleButton({ changeState }: { changeState: (state: boolean) => void }) {
  return (
    <div className={styles["dropdown-container"]} tabIndex={0}>
      <div className={styles["button-group"]}>
        <button
          className={styles["main-action"]}
          type="submit"
          onFocus={(e) => e.currentTarget.blur()}
        >
          Submit
        </button>
        <div aria-haspopup="true" className={styles["dropdown-trigger"]} id="dropdown-toggle">
          <i className={`bx bxs-chevron-up ${styles["arrow-icon"]}`}></i>
        </div>
      </div>
      <div className={styles["dropdown-content"]}>
        <ul className={styles["dropdown-list"]}>
          <li>
            <button className={styles["dropdown-item"]} id="action-submit" type="submit">
              <i className={`bx bx-check-circle ${styles["material-symbols-outlined"]}`}></i>
              Submit
            </button>
          </li>
          <li className={styles["separator"]} role="separator"></li>
          <li>
            <button
              className={`${styles["dropdown-item"]} ${styles["error"]}`}
              id="action-close"
              type="button"
              onClick={() => changeState(true)}
            >
              <i className={`bx bx-x-circle ${styles["material-symbols-outlined"]}`}></i>
              Close
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
