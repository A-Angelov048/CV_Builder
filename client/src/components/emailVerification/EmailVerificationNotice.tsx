import { useEffect } from "react";
import styles from "./EmailVerificationNotice.module.css";

import { useLocation, useNavigate } from "react-router-dom";

export default function EmailVerificationNotice() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.email && !state?.isFromRegister) navigate("/not-found");
  }, []);

  return (
    <section className={styles["content-wrapper"]}>
      <div>
        <h2 className="m-b">Registration successful!</h2>

        <p className="m-b">
          We have sent a verification email to{" "}
          <span className={styles["text-bold"]}>{state?.email}</span>. Please check your inbox/spam
          and verify your email before logging in.
        </p>

        <div className={styles["footer-text"]}>
          <p>
            Didn't receive an email?<span className={styles["text-bold"]}> Contact Support</span> at
            email cvbuilder2025@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
