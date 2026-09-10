"use client";

import { motion } from "framer-motion";
import { HardCard } from "./utilityComps/HardCard";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { services } from "../lib/content";
import { useTheme } from "./ThemeProvider";

export function Services() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <section id="services" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>03 / Capabilities</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Small studio. Full-stack impact.</h2>

        <div className="mt-10 w-full grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:h-40">
          {services.map((service, i) => (
            <motion.div key={service.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <HardCard size="small" className="h-full w-full p-6" style={{ backgroundColor: `var(--${service.color})` }}>
                <h3 className="text-lg font-extrabold">{service.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${!isDark ? "text-muted" : ""}`}>{service.copy}</p>
              </HardCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
