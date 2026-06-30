import styles from "./VerifiedEmail.module.css";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useVerifiedEmail } from "../../hooks/useAuthResponse";

import Spinner from "../spinner/Spinner";

export default function VerifiedEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/not-found", { replace: true });
    }
  }, []);

  const { spinner } = useVerifiedEmail(token);

  return (
    <section className={styles["content-wrapper"]}>
      <div className={styles["success-icon-container"]}>
        <i className="bx bx-check"></i>
      </div>
      <h2>Email Verified!</h2>
      <p className={styles.description}>
        Your account is now active and ready to go. Welcome to the professional circle.
      </p>
      <div className={styles["status-card"]}>
        <div className={styles["card-header"]}>
          <span className={styles["status-label"]}>Account Status</span>
          <span className={styles.badge}>ACTIVE</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles["card-content"]}>
          <div className={styles["icon-box"]}>
            <i className="bx bxs-user-account"></i>
          </div>
          <div className={styles["content-text"]}>
            <p className={styles.title}>Identity Confirmed</p>
            <p className={styles.subtitle}>Your security features are now fully unlocked.</p>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="main-button"
          type="button"
        >
          Get Started
        </button>
      </div>
      {spinner && <Spinner />}
    </section>
  );
}
