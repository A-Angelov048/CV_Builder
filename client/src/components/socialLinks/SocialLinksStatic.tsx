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
          I'm a paragraph. Click here to add your own text and edit me. It’s
          easy. Just click “Edit Text” or double click me to add your own
          content and make changes to the font. I’m a great place for you to
          tell a story and let your users know a little more about you.
        </p>
      </div>
    </>
  );
}
