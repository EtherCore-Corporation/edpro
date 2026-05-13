"use client";

import { useEffect } from "react";

export function ClientEffects() {
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll(".step, [data-reveal]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return null;
}
