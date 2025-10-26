import styles from "./RegisterNow.module.css";
import { useNavigate } from "react-router-dom";

export default function RegisterNow() {
  const navigate = useNavigate();

  return (
    <section className={styles["register-now"]}>
      <div className={`container ${styles["register-container"]}`}>
        <h3>
          If you like the CV template and want to use it,{" "}
          <strong onClick={() => navigate("/register")}>Register now</strong>{" "}
          and use it for free!
        </h3>
      </div>
    </section>
  );
}
