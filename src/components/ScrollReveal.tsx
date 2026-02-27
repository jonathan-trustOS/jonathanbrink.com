"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    let rafId: number;

    const reveal = () => {
      const viewBottom = window.scrollY + window.innerHeight + 400;
      document.querySelectorAll(".fade-up:not(.visible)").forEach((el) => {
        const elTop = (el as HTMLElement).offsetTop;
        if (elTop < viewBottom) {
          el.classList.add("visible");
        }
      });
    };

    // Run on every frame until all are revealed, then stop
    const tick = () => {
      reveal();
      if (document.querySelectorAll(".fade-up:not(.visible)").length > 0) {
        rafId = requestAnimationFrame(tick);
      }
    };

    // Start after a brief delay for hydration
    const t = setTimeout(() => {
      tick();
      // Also listen for scroll to catch lazy-loaded or late elements
      window.addEventListener("scroll", reveal, { passive: true });
    }, 100);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  return null;
}
