import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Profile from "../profile/Profile";

type Section = "about" | "skills" | "projects" | "experience" | "education" | "contact";

type HeaderProps = {
  scrollFunc: (section: Section) => void;
  scrollUp: () => void;
};

export default function Header({ scrollFunc, scrollUp }: HeaderProps) {
  const [flagProfile, setFlagProfile] = useState(false);
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const { authData } = useAuth();

  const handleScroll = (ref: Section) => {
    scrollFunc(ref);

    if (checkboxRef.current?.checked) {
      checkboxRef.current.checked = false;
    }
  };

  const toggleProfile = () => {
    setFlagProfile((prev) => !prev);

    if (checkboxRef.current?.checked) {
      checkboxRef.current.checked = false;
    }
  };

  useEffect(() => {
    if (flagProfile) {
      toggleProfile();
    }

    if (authData.username && authData.username !== "") {
      window.history.pushState(null, "", `/${authData.username}`);
    }
  }, [authData.username, authData.accessToken]);

  return (
    <header className={styles.header}>
      <div>
        <Link
          className={styles.username}
          to={authData.username !== "" ? `/${authData.username}` : "/"}
        >
          {authData.username !== "" ? authData.username : "Rachel Smith"}
        </Link>
      </div>
      <nav>
        <input type="checkbox" id={styles["menu-toggle"]} ref={checkboxRef} />
        <label htmlFor={styles["menu-toggle"]} className={styles["menu-icon"]}>
          <span></span>
          <span></span>
          <span></span>
        </label>
        <ul className={styles["nav-links"]}>
          <li>
            <span onClick={() => handleScroll("about")}>About me</span>
          </li>
          <li>
            <span onClick={() => handleScroll("skills")}>Skills</span>
          </li>
          <li>
            <span onClick={() => handleScroll("projects")}>Projects</span>
          </li>
          <li>
            <span onClick={() => handleScroll("experience")}>Experience</span>
          </li>
          <li>
            <span onClick={() => handleScroll("education")}>Education</span>
          </li>
          <li>
            <span onClick={() => handleScroll("contact")}>Contact</span>
          </li>
          {authData.accessToken && (
            <li>
              <span
                onClick={() => {
                  scrollUp();
                  setFlagProfile((prev) => !prev);
                }}
              >
                Profile
              </span>
            </li>
          )}
        </ul>
      </nav>
      {flagProfile && <Profile toggleProfile={toggleProfile} />}
    </header>
  );
}
