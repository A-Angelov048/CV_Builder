import styles from "./SocialLinks.module.css";
import { Link } from "react-router-dom";

export default function SocialLinksStatic() {
  return (
    <>
      <div className={styles["social-contacts"]}>
        <div className={styles["social-links"]}>
          <Link to="#">
            <i className="bx bxl-linkedin-square"></i>
          </Link>
          <Link to="#">
            <i className="bx bxl-telegram"></i>
          </Link>
          <Link to="#">
            <i className="bx bxl-github"></i>
          </Link>
          <Link to="#">
            <i className="bx bxl-facebook"></i>
          </Link>
          <Link to="#">
            <i className="bx bxl-instagram"></i>
          </Link>
        </div>
      </div>

      <div className={styles.about}>
        <h2>Hello! I'm Rachel</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae facere odit ratione
          placeat et. Reiciendis velit dolores, magni pariatur repellat dolore, molestias quod
          maxime labore nulla laboriosam incidunt neque nihil.
        </p>
      </div>
    </>
  );
}
