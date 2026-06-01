import styles from "./ScrollToTop.module.css";

import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

export default function ScrollToTop({
  children,
  scrollUp,
}: {
  children: ReactNode;
  scrollUp: () => void;
}) {
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

    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    scrollUp();
  }, [pathname]);

  const buttonElement = (
    <button
      onClick={() => scrollUp()}
      className={visible ? `${styles["scroll-to-top"]} ${styles.visible}` : styles["scroll-to-top"]}
      aria-label="Scroll to top"
    >
      <i className="bx bxs-chevrons-up"></i>
    </button>
  );

  return (
    <>
      <main>{children}</main>
      {createPortal(buttonElement, document.getElementById("root")!)}
    </>
  );
}
