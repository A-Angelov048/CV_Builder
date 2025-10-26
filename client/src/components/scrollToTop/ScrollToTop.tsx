import { useLocation } from "react-router-dom";
import styles from "./ScrollToTop.module.css";
import { useEffect, useState, type ReactNode } from "react";

type ScrollProps = {
  children: ReactNode;
  scrollUp: () => void;
};

export default function ScrollToTop({ children, scrollUp }: ScrollProps) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    scrollUp();
  }, [pathname]);

  return (
    <main>
      {children}
      <button
        onClick={() => scrollUp()}
        className={
          visible
            ? `${styles["scroll-to-top"]} ${styles.visible}`
            : styles["scroll-to-top"]
        }
        aria-label="Scroll to top"
      >
        <i className="bx bxs-chevrons-up"></i>
      </button>
    </main>
  );
}
