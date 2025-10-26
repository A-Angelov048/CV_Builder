import styles from "./Header.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Section =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "contact";

type HeaderProps = {
  scrollFunc: (section: Section) => void;
};

export default function Header({ scrollFunc }: HeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleScroll = (ref: Section) => {
    if (pathname !== "/") {
      navigate("/", { state: { ref } });
    } else {
      scrollFunc(ref);
    }
  };
  return (
    <header className={styles.header}>
      <div>
        <Link className={styles.username} to={"/"}>
          Alex Angelov
        </Link>
      </div>
      <nav>
        <input type="checkbox" id={styles["menu-toggle"]} />
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
        </ul>
      </nav>
    </header>
  );
}
