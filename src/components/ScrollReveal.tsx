"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const reveal = () => {
      const threshold = window.innerHeight + 200;
      document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < threshold) {
          el.classList.add("visible");
        }
      });
    };

    // Run immediately
    reveal();

    // Poll with setInterval (works even in background tabs unlike rAF)
    const interval = setInterval(reveal, 100);

    // Also run on scroll for responsiveness
    window.addEventListener("scroll", reveal, { passive: true });

    // Stop polling after 10s
    const stopTimer = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  return null;
}
