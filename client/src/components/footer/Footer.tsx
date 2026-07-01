import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2026 Template designed and developed by Alexander Angelov.</p>

      <div className={styles.support}>
        <span>
          If this CV Builder helped you land a job or save time, you can support its development by
          donating.{" "}
        </span>

        <span className={styles.hoverTrigger}>
          (Hover Me For Details)
          <div className={styles.popup}>
            <img src="qrcode_revolut.png" alt="Donation QR Code" />

            <Link
              className={styles.linkRevo}
              target="_blank"
              to="https://revolut.me/alex_angelov97"
            >
              Revolut - @alex_angelov97
            </Link>
          </div>
        </span>
      </div>
    </footer>
  );
}
