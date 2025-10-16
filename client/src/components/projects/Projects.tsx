import styles from "./Projects.module.css";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <section>
      <div className="heading-container">
        <h2 className="title">PROJECTS</h2>
      </div>
      <div className={styles["project-container"]}>
        <div className={styles["projects-grid"]}>
          <div className={styles["project-card"]}>
            <Link
              to="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["project-link"]}
            >
              <div className={styles["preview-wrapper"]}>
                <img
                  src="https://iad.microlink.io/m_kg3kxB9nFmeOq9UPzLYy2hn-kXQaz5q1HXL1_owL5W1F7YCeqzFfu6rN9JcXR_vNKlici_9HockDX81pj0-w.png"
                  alt="Project 1 Preview"
                />
              </div>
              <p className={styles["project-name"]}>Project 1</p>
            </Link>
            <Link
              to="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles["project-name"]} ${styles.brief}`}
            >
              Brief documentation of the project
            </Link>
            <p className={`${styles["project-name"]} ${styles.remove}`}>
              Remove Project
            </p>
          </div>
          <div className={styles["project-card"]}>
            <Link
              to="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["project-link"]}
            >
              <div className={styles["preview-wrapper"]}>
                <img
                  src="https://iad.microlink.io/m_kg3kxB9nFmeOq9UPzLYy2hn-kXQaz5q1HXL1_owL5W1F7YCeqzFfu6rN9JcXR_vNKlici_9HockDX81pj0-w.png"
                  alt="Project 1 Preview"
                />
              </div>
              <p className="project-name">Project 1</p>
            </Link>
            <Link
              to="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles["project-name"]} ${styles.brief}`}
            >
              Brief documentation of the project
            </Link>
            <p className={`${styles["project-name"]} ${styles.remove}`}>
              Remove Project
            </p>
          </div>
          <div className={styles["project-card"]}>
            <Link
              to="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["project-link"]}
            >
              <div className={styles["preview-wrapper"]}>
                <img
                  src="https://iad.microlink.io/m_kg3kxB9nFmeOq9UPzLYy2hn-kXQaz5q1HXL1_owL5W1F7YCeqzFfu6rN9JcXR_vNKlici_9HockDX81pj0-w.png"
                  alt="Project 1 Preview"
                />
              </div>
              <p className="project-name">Project 1</p>
            </Link>
            <Link
              to="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles["project-name"]} ${styles.brief}`}
            >
              Brief documentation of the project
            </Link>
            <p className={`${styles["project-name"]} ${styles.remove}`}>
              Remove Project
            </p>
          </div>
        </div>
      </div>
      <form className="grid-form max-width">
        <div className="form-group m-t">
          <label htmlFor="nameProject">Name of the project *</label>
          <input type="text" id="nameProject" name="nameProject" />
        </div>
        <div className="form-group m-t">
          <label htmlFor="urlProject">URL of the project *</label>
          <input type="text" id="urlProject" name="urlProject" />
        </div>
        <div className="form-group m-t">
          <label htmlFor="screenshotProject">
            Screenshot (by URL) of the project *
          </label>
          <input type="text" id="screenshotProject" name="screenshotProject" />
        </div>
        <div className="form-group m-t">
          <label htmlFor="brief">URL of brief project documentation</label>
          <input type="text" id="brief" name="brief" />
        </div>
        <button className="main-button m-t" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
}
