"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { nav } from "../lib/content";
import { Button } from "./utilityComps/Button";

export function Nav() {
  type HoverColor = "teal" | "peach" | "lime" | "violet";

  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hoverColor, setHoverColor] = useState<HoverColor>("teal");
  const [isHovering, setIsHovering] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 18);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function closeMenuOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("keydown", closeMenuOnEscape);
    return () => document.removeEventListener("keydown", closeMenuOnEscape);
  }, []);

  useEffect(() => {
    const sections = nav.links.map((link) => document.querySelector(link.href)).filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections[0]?.target.id) {
          setActiveHref(`#${visibleSections[0].target.id}`);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  const activeColors: Record<string, string> = {
    "#packages": "var(--lavender)",
    "#faq": "var(--lavender)",
    "#process": "var(--teal)",
    "#contact": "var(--coral)",
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
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-10 px-4 py-2 sm:px-6 lg:px-8">
        <a href="#" className="tracking-tight hover:scale-105 transition-hover duration-200 ">
          <div
            className="relative my-auto flex h-8 w-fit items-center"
            onMouseEnter={() => {
              handleHover();
              setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Normal logo */}
            <Image src={isDark ? nav.logo2 : nav.logo} alt="SiteGuys" width={170} height={32} priority className={`block h-6 w-auto transition-opacity duration-200 ${isHovering ? "opacity-0" : "opacity-100"}`} />

            {/* Hover logo */}
            <Image src={hoverLogos[hoverColor]} alt="SiteGuys" width={170} height={32} className={`absolute inset-y-1/2 h-6 w-auto -translate-y-1/2 transition-opacity duration-200 ${isHovering ? "opacity-100" : "opacity-0"}`} />
          </div>
        </a>

        <div className="hidden items-center gap-6 font-mono! text-xs font-bold uppercase md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "location" : undefined}
              className="focus-ring font-mono! transition-colors duration-200 hover:underline!"
              style={
                activeHref === link.href
                  ? {
                      color: activeColors[link.href],
                      textShadow: isDark ? `0 0 8px ${activeColors[link.href]}` : "none",
                    }
                  : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <Button onClick={toggleTheme} background="var(--panel)">
              {isDark ? "Dark" : "Light"}
            </Button>
            <Button href={nav.cta.href} background="var(--lime)" textColor={isDark ? `var(--paper)` : `var(--ink)`}>
              {nav.cta.label}
            </Button>
          </div>

          <button type="button" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" className="focus-ring flex h-10 w-10 items-center justify-center border-2 transition-colors md:hidden" style={{ background: "var(--panel)", borderColor: "var(--line)" }} onClick={() => setIsMenuOpen((open) => !open)}>
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative flex h-5 w-5 items-center justify-center">
              <span className={`absolute h-0.5 w-5 transition-transform duration-200 ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} style={{ background: "var(--ink)" }} />
              <span className={`absolute h-0.5 w-5 transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} style={{ background: "var(--ink)" }} />
              <span className={`absolute h-0.5 w-5 transition-transform duration-200 ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} style={{ background: "var(--ink)" }} />
            </span>
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="absolute left-4 right-4 top-full border-2 border-line bg-panel p-4 shadow-[5px_5px_0_var(--line)] md:hidden sm:left-6 sm:right-6">
            <div className="flex flex-col gap-1 font-mono text-xs font-bold uppercase">
              {nav.links.map((link) => (
                <a key={link.href} href={link.href} aria-current={activeHref === link.href ? "location" : undefined} className="focus-ring border-b border-line px-3 py-3 last:border-b-0" style={activeHref === link.href ? { color: activeColors[link.href], textShadow: `0 0 8px ${activeColors[link.href]}` } : undefined} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <button type="button" className="focus-ring border-b border-line px-3 py-3 text-left font-mono text-xs font-bold uppercase" onClick={toggleTheme}>
                {isDark ? "Switch to light" : "Switch to dark"}
              </button>
              <a href={nav.cta.href} className="focus-ring mt-3 border-2 border-line bg-lime px-3 py-3 text-center font-mono text-xs font-bold uppercase text-ink shadow-[3px_3px_0_var(--line)]" onClick={() => setIsMenuOpen(false)}>
                {nav.cta.label}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
