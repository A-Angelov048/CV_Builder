import styles from "./Header.module.css";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useLogoutUser } from "../../hooks/useAuthResponse";
import { HeaderProps } from "../../types/componentsPropsTypes";
import { Section } from "../../types/generalTypes";

import Profile from "../profile/Profile";
import Spinner from "../spinner/Spinner";

export default function Header({ scrollFunc, scrollUp }: HeaderProps) {
  const { authData } = useAuth();
  const { logoutUser, spinner } = useLogoutUser();

  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const [flagProfile, setFlagProfile] = useState(false);

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
      {flagProfile && <Profile toggleProfile={toggleProfile} logoutUser={logoutUser} />}
      {spinner && <Spinner />}
    </header>
  );
}
