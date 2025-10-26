import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useScroll<T extends string>(sections: T[]) {
  const location = useLocation();
  const state = location.state as { ref?: T } | null;

  const refs = useRef<Record<T, HTMLDivElement | null>>(
    Object.fromEntries(sections.map((s) => [s, null])) as Record<
      T,
      HTMLDivElement | null
    >
  );

  useEffect(() => {
    if (state?.ref && sections.includes(state.ref)) {
      scrollToSection(state.ref);
    }
  }, [state]);

  const scrollToSection = (section: T) => {
    refs.current[section]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const scrollToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return [refs, scrollToSection, scrollToUp] as const;
}
