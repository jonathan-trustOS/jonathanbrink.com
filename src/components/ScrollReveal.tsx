"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Fallback: on scroll, reveal any .fade-up element whose top is above viewport bottom
    const revealOnScroll = () => {
      const viewBottom = window.scrollY + window.innerHeight + 100;
      document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + window.scrollY;
        if (elTop < viewBottom) {
          el.classList.add("visible");
        }
      });
    };

    // Run immediately, after hydration, and on every scroll
    revealOnScroll();
    const t = setTimeout(revealOnScroll, 300);
    window.addEventListener("scroll", revealOnScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, []);

  return null;
}
