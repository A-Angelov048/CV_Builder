import styles from "./ContactMe.module.css";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

export default forwardRef<HTMLDivElement>(function ContactMe(_, ref) {
  return (
    <section ref={ref} className="color">
      <div className="heading-container">
        <h2 className="title">CONTACT ME</h2>
      </div>

      <div className={styles["contact-container"]}>
        <form className={styles["contact-form"]}>
          <label htmlFor="first-name">First Name *</label>
          <input type="text" id="first-name" name="first-name" />

          <label htmlFor="last-name">Last Name *</label>
          <input type="text" id="last-name" name="last-name" />

          <label htmlFor="email">Email *</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="message">Type your message here... *</label>
          <textarea id="message" name="message"></textarea>

          <button className="main-button" type="submit">
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
              <i className="bx bxl-linkedin-square bx-md"></i>
            </Link>
            <Link to="#">
              <i className="bx bxl-telegram bx-md"></i>
            </Link>
            <Link to="#">
              <i className="bx bxl-github bx-md"></i>
            </Link>
            <Link to="#">
              <i className="bx bxl-facebook bx-md"></i>
            </Link>
            <Link to="#">
              <i className="bx bxl-instagram bx-md"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});
