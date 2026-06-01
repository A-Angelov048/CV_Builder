import { useEffect, useRef, useState } from "react";

export function useInView(options: IntersectionObserverInit, dependencies?: boolean) {
  const refView = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(false);
  }, [dependencies]);

  useEffect(() => {
    const element = refView.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { refView, isInView };
}
