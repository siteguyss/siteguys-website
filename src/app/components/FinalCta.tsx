import { Button } from "./utilityComps/Button";
import { finalCta } from "../lib/content";

export function FinalCTA() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="hard-card mx-auto w-full max-w-7xl overflow-hidden p-7 sm:p-12 lg:p-16" style={{ background: "linear-gradient(135deg, var(--lavender), var(--teal))" }}>
        <p className="font-mono text-xs font-bold uppercase tracking-widest">{finalCta.kicker}</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl">{finalCta.title}</h2>
        <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed">{finalCta.copy}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={finalCta.primaryCta.href} background="var(--lime)">
            {finalCta.primaryCta.label}
          </Button>
          <Button href={finalCta.secondaryCta.href} background="var(--panel)">
            {finalCta.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
