"use client";

import { useEffect, useState } from "react";
import { hover, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { nav } from "../lib/content";
import { Button } from "./utilityComps/Button";

export function Nav() {
  type HoverColor = "teal" | "peach" | "lime" | "violet";

  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hoverColor, setHoverColor] = useState<HoverColor>("teal");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 18);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleHover() {
    setHoverColor((prev) => (prev === "teal" ? "peach" : prev === "peach" ? "lime" : prev === "lime" ? "violet" : "teal"));
  }

  const hoverLogos = {
    teal: nav.logohov4,
    peach: nav.logohov2,
    lime: nav.logohov3,
    violet: nav.logohov1,
  };

  return (
    <header
      className="sticky top-0 z-50 border-b-2 transition-shadow"
      style={{
        borderColor: "var(--line)",
        background: "var(--paper)",
        boxShadow: scrolled ? "0 8px 0 -4px var(--line)" : "none",
      }}
    >
      <nav className="mx-auto gap-10 flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8 hover:">
        <a href="#" className="tracking-tight hover:scale-105 transition-hover duration-200 ">
          <div
            className="relative h-8 w-fit my-auto"
            onMouseEnter={() => {
              handleHover();
              setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Normal logo */}
            <img src={isDark ? nav.logo2 : nav.logo} alt="SiteGuys" className={`h-6 w-auto transition-opacity duration-200 ${isHovering ? "opacity-0" : "opacity-100"}`} />

            {/* Hover logo */}
            <img src={hoverLogos[hoverColor]} alt="SiteGuys" className={`absolute inset-0 h-6 w-auto transition-opacity duration-200 ${isHovering ? "opacity-100" : "opacity-0"}`} />
          </div>
        </a>

        <div className="hidden items-center gap-6 font-mono! text-xs  font-bold uppercase md:flex">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring font-mono! hover:underline">
              {link.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 *:row-end-1 items-center gap-3 overflow-hidden">
          <Button onClick={toggleTheme} background="var(--panel)">
            {isDark ? "Dark" : "Light"}
          </Button>
          <Button href={nav.cta.href} background="var(--lime)" textColor={isDark ? `var(--paper)` : `var(--ink)`}>
            {nav.cta.label}
          </Button>
        </div>
      </nav>
    </header>
  );
}
