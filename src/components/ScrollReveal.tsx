"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    let rafId: number;
    let running = true;

    const reveal = () => {
      const threshold = window.innerHeight + 200;
      document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < threshold) {
          el.classList.add("visible");
        }
      });
    };

    const tick = () => {
      if (!running) return;
      reveal();
      rafId = requestAnimationFrame(tick);
    };

    // Start polling immediately
    rafId = requestAnimationFrame(tick);

    // Stop polling after 10 seconds (all elements should be revealed by real scrolling)
    const stopTimer = setTimeout(() => {
      running = false;
      cancelAnimationFrame(rafId);
      // Switch to scroll-only after rAF stops
      window.addEventListener("scroll", reveal, { passive: true });
    }, 10000);

    return () => {
      running = false;
      clearTimeout(stopTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  return null;
}
