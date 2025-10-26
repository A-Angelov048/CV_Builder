import styles from "./guestPages.module.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container">
        <h2 className="title">REGISTER</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form className="simple-form">
          <div className="form-group">
            <label htmlFor="username">Type your username *</label>
            <input id="username" type="text" name="username" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Type your password *</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="rePassword">Confirm your password *</label>
            <input type="password" id="rePassword" name="rePassword" />
          </div>

          <div className={styles.button}>
            <button type="submit" className="main-button">
              Register
            </button>
          </div>

          <div className={styles.link}>
            <p>Already have an account?</p>
            <Link to="/login">Login here!</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
