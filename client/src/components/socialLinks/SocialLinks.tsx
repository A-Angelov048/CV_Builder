import { useState } from "react";
import styles from "./SocialLinks.module.css";
import { Link } from "react-router-dom";

export default function SocialLinks() {
  const [flagForm, setFlagForm] = useState(true);

  return (
    <section className="max-width">
      {flagForm ? (
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
            <button
              onClick={() => setFlagForm(false)}
              className="main-button m-t"
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <form className="grid-form">
          <div className="form-group">
            <label htmlFor="linkedin">Linkedin contact *</label>
            <input type="text" id="linkedin" name="linkedin" />
          </div>
          <div className="form-group">
            <label htmlFor="telegram">Telegram contact</label>
            <input type="text" id="telegram" name="telegram" />
          </div>
          <div className="form-group">
            <label htmlFor="github">Github contact</label>
            <input type="text" id="github" name="github" />
          </div>
          <div className="form-group">
            <label htmlFor="facebook">Facebook contact</label>
            <input type="text" id="facebook" name="facebook" />
          </div>
          <div className="form-group">
            <label htmlFor="isntagram">Instagram contact</label>
            <input type="text" id="isntagram" name="instagram" />
          </div>
          <div className="form-group">
            <label htmlFor="short-info">Type here short Info about you *</label>
            <textarea id="short-info" name="shortInfo"></textarea>
          </div>
          <button className="main-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </section>
  );
}
