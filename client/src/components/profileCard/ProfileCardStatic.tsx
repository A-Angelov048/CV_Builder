import styles from "./ProfileCard.module.css";

export default function ProfileCardStatic() {
  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-left"]}>
        <img src="image_600_600.jpg" alt="Profile Picture" />
      </div>

      <div className={styles["profile-right"]}>
        <h2>Rachel Smith</h2>
        <p className={styles.career}>Lawyer & Consultant</p>

        <div className={styles["profile-info"]}>
          <strong>Phone:</strong>
          <p>123-456-7890</p>
        </div>
        <div className={styles["profile-info"]}>
          <strong>Email:</strong>
          <p>info@mysite.com</p>
        </div>
        <div className={styles["profile-info"]}>
          <strong>Address:</strong>
          <p>500 Terry Francine Street San Francisco, CA 94158</p>
        </div>
        <div className={styles["profile-info"]}>
          <strong>Date of Birth:</strong>
          <p>March 14th, 1984</p>
        </div>
      </div>
    </div>
  );
}
