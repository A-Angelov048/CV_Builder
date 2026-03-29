import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles["main-container"]}>
      <div className={styles["error-grid"]}>
        <aside className={styles["meta-sidebar"]}>
          <span className={styles["vertical-text"]}>System Error Trace</span>
          <span className={styles["err-label"]}>ERR</span>
        </aside>

        <div className={styles["spine"]}></div>

        <section className={styles["content-area"]}>
          <h2 className={styles["error-code"]}>404</h2>
          <h3 className={styles["error-message"]}>
            The page you are looking for has moved or does not exist.
          </h3>
          <p className={styles["error-description"]}>
            The requested URI was not found on this server. This may be due to a legacy indexing
            error or a direct structural change within the archive's hierarchy.
          </p>

          <div className={styles["button-group"]}>
            <Link to="/" className="main-button">
              Return Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
