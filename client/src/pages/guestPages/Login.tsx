import styles from "./guestPages.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className={styles["guest-page"]}>
      <div className="heading-container">
        <h2 className="title">LOGIN</h2>
      </div>
      <div className={styles["wrapper-guest"]}>
        <form className="simple-form">
          <div className="form-group">
            <label htmlFor="email">Type your email *</label>
            <input type="text" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Type your password *</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className={styles.button}>
            <button type="submit" className="main-button">
              Login
            </button>
          </div>

          <div className={styles.link}>
            <p>Don't have and account?</p>
            <Link to="/register">Register here!</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
