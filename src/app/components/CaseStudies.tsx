"use client";

import { motion } from "framer-motion";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { caseStudies } from "../lib/content";

export function CaseStudies() {
  return (
    <section id="work" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>03 / Selected signals</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Built to look sharp. Built to work harder.</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {caseStudies.map((project, i) => (
            <motion.article key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }} whileHover={{ y: -6 }} className="hard-card overflow-hidden">
              <div className="flex h-40 items-end p-6" style={{ background: project.color }}>
                <p className="font-mono text-xs font-bold uppercase text-ink">{project.category}</p>
              </div>
              <div className="p-6" style={{ background: "var(--panel)" }}>
                <h3 className="text-xl font-extrabold">{project.name}</h3>
                <p className="mt-2 font-mono text-xs uppercase text-muted">{project.result}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
