"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { nav } from "../lib/content";

export function Nav() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 18);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b-2 transition-shadow"
      style={{
        borderColor: "var(--line)",
        background: "var(--paper)",
        boxShadow: scrolled ? "0 8px 0 -4px var(--line)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="text-xl font-extrabold tracking-tight">
          {nav.logo}
        </a>

        <div className="hidden items-center gap-6 font-mono text-xs font-bold uppercase md:flex">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring hover:underline">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button type="button" onClick={toggleTheme} aria-pressed={isDark} aria-label="Toggle color theme" className="hard-card-small focus-ring px-3 py-2 font-mono text-xs font-bold uppercase" style={{ background: "var(--panel)" }} whileTap={{ scale: 0.94 }}>
            {isDark ? "Dark" : "Light"}
          </motion.button>
          <a href={nav.cta.href} className="hard-card-small focus-ring hidden px-4 py-2 font-mono text-xs font-bold uppercase sm:inline-block" style={{ background: "var(--lime)" }}>
            {nav.cta.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
