"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { process } from "../lib/content";
import { useTheme } from "./ThemeProvider";

export function Process() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <section id="process" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>04 / The build</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Clear steps. No mystery.</h2>

        <ol className="mt-10 grid grid-cols-2 md:gap-5  sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, i) => (
            <motion.li key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.08 }} className="hard-card-small p-6" style={{ background: "var(--panel)" }}>
              <span className="flex w-fit aspect-square items-center justify-center p-4" style={{ backgroundColor: `var(--${item.color})` }}>
                <p className={`font-mono text-xs font-bold ${!isDark ? "text-muted" : ""}`}>0{i + 1}</p>
              </span>
              <h3 className="mt-2 text-lg font-extrabold">{item.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
