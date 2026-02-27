"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 200px 0px" }
    );

    const observe = () => {
      document
        .querySelectorAll(".fade-up:not(.visible)")
        .forEach((el) => observer.observe(el));
    };

    // Observe immediately + after hydration settles
    observe();
    const t = setTimeout(observe, 500);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, []);

  return null;
}
