import styles from "./ContactMe.module.css";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import HeadingContainerStatic from "../heading-container/HeadingContainerStatic";

export default forwardRef<HTMLDivElement>(function ContactMeStatic(_, ref) {
  return (
    <section ref={ref} className="color">
      <HeadingContainerStatic header={"CONTACT ME"} />

      <div className={styles["contact-container"]}>
        <form className={styles["contact-form"]}>
          <label htmlFor="firstName">First Name *</label>
          <input type="text" id="firstName" />

          <label htmlFor="lastName">Last Name *</label>
          <input type="text" id="lastName" />

          <label htmlFor="email">Email *</label>
          <input type="text" id="email" />

          <label htmlFor="message">Type your message here... *</label>
          <textarea id="message"></textarea>

          <button className="main-button" type="button">
            Submit
          </button>
        </form>

        <div className={styles.divider}></div>

        <div className={styles["contact-info"]}>
          <h3>Rachel Smith</h3>
          <p className={styles.subtitle}>LAWYER & CONSULTANT</p>

          <p>
            <strong>Phone:</strong>
            <br />
            123-456-789
          </p>
          <p>
            <strong>Email:</strong>
            <br />
            info@mysite.com
          </p>

          <hr />

          <div className={styles["social-icons"]}>
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
      </div>
    </section>
  );
});
