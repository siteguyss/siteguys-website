"use client";
import { section } from "motion/react-client";
import { motion, useMotionValue, useSpring, useTransform, type MouseEvent } from "framer-motion";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { Button } from "./utilityComps/Button";
import { hero } from "../lib/content";

const HeroSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section className="grid-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>
          <SectionEyebrow>{hero.kicker}</SectionEyebrow>
          <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">{hero.title}</h1>
          <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-muted">{hero.copy}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} background="var(--lime)">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} background="var(--panel)">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-8">
            {hero.trust.map((stat: { value: string; label: string }) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-extrabold">{stat.value}</dd>
                <dd className="font-mono text-xs uppercase text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY, transformPerspective: 900 }} className="hard-card relative aspect-square w-full max-w-md justify-self-center rounded-none p-8">
          <div className="neon-orb absolute left-6 top-6 h-16 w-16 rounded-full" style={{ background: "var(--coral)" }} />
          <div className="neon-orb absolute right-10 top-20 h-10 w-10 rounded-full" style={{ background: "var(--lavender)" }} />
          <div className="neon-orb absolute bottom-10 left-16 h-14 w-14 rounded-full" style={{ background: "var(--teal)" }} />
          <p className="absolute bottom-8 left-8 right-8 font-mono text-xs uppercase text-muted">Strategy · Design · Engineering</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
