import { HardCard } from "./utilityComps/HardCard";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { testimonials } from "../lib/content";

export function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
      <div className="mx-auto max-w-7xl">
        <SectionEyebrow>06 / Client transmission</SectionEyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Nice words from smart people.</h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {testimonials.map((item) => (
            <HardCard key={item.id} as={item.quote ? "blockquote" : "aside"} className="p-6" style={{ background: item.color ?? "var(--lime)" }}>
              {item.quote ? (
                <>
                  <p className="text-lg font-semibold leading-relaxed">{item.quote}</p>
                  <footer className="mt-6 font-mono text-xs font-bold">{item.author}</footer>
                </>
              ) : (
                <>
                  <p className="text-5xl font-extrabold leading-none">{item.value}</p>
                  <p className="mt-4 text-sm font-semibold leading-relaxed">{item.copy}</p>
                </>
              )}
            </HardCard>
          ))}
        </div>
      </div>
    </section>
  );
}
