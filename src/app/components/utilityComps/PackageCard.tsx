import { Button } from "./Button";
import type { PlanTier } from "../../types";

type PCardProps = {
  plan: PlanTier;
};

export default function PackageCard({ plan }: PCardProps) {
  return (
    <div id={plan.id} className="relative flex max-w-[450px] flex-col border-[3px] bg-panel transition-all hard-card">
      {plan.popular && <div className="absolute -top-3.5 right-6 z-10 bg-lime px-3 py-1 text-xs font-black uppercase tracking-wider text-ink shadow-[2px_2px_0px_var(--line)]">Recommended</div>}

      {/* Card Header: Upfront Build Fee & Delivery */}
      <div className="relative border-b-2 border-line p-6" style={{ backgroundColor: `var(--${plan.bgHighlightColor})` }}>
        <div className="flex items-center gap-2 mb-2">
          <span style={{ backgroundColor: `var(--lime)` }} className="inline-block h-3.5 w-3.5 rounded-full border border-line" />
          <span className="font-mono text-xs font-black tracking-wider uppercase text-ink">{plan.packageNumber}</span>
        </div>

        <h2 className="mb-1 font-sans text-2xl font-black tracking-tight text-ink sm:text-3xl">{plan.name}</h2>
        <p className="min-h-[34px] text-xs font-medium leading-relaxed text-ink">{plan.tagline}</p>

        {/* Upfront Build Fee Box */}
        <div className="mt-4 border-2 border-line bg-panel p-4 hard-card">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase text-muted">Upfront Build Fee</div>
              <div className="mt-0.5 font-sans text-3xl font-black text-ink">
                {plan.upfrontFee.toLocaleString("en-US")}
                <span className="font-mono text-xs font-normal text-muted"> kr.</span>
              </div>
            </div>
            <span className="border border-line bg-panel px-2.5 py-1 font-mono text-[11px] font-black uppercase text-ink shadow-[1px_1px_0px_var(--line)]">{plan.turnaroundDays}</span>
          </div>
          <div className="mt-1 text-[11px] font-medium text-muted">{plan.description}</div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
        {/* Combined Feature Comparison Matrix (All necessary info visible, lacking items greyed out) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b-2 border-line pb-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-black uppercase tracking-wider text-ink">
              <span>Deliverables & Comparison:</span>
            </div>
            <span className="font-mono text-[10px] font-bold text-muted">{plan.pageCount}</span>
          </div>

          <ul className="space-y-1.5">
            {plan.features?.map((feature) => (
              <li key={feature.id} className={`flex gap-2 text-sm ${feature.included ? "text-ink" : "text-muted"}`}>
                <span aria-hidden="true">{feature.included ? "✓" : "—"}</span>
                <span>
                  {feature.name}
                  {feature.badge && <span className="ml-1 font-mono text-[10px] uppercase">({feature.badge})</span>}
                  {!feature.included && feature.unavailableNote && <span className="ml-1 text-xs">[{feature.unavailableNote}]</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 6-Month Obligatory Support block */}
        <div className="border-2 border-line bg-panel p-3.5 shadow-[3px_3px_0px_var(--line)]">
          <div className="flex items-baseline justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-line" />
              <span className="font-mono text-xs font-black uppercase text-ink">6-Month Obligatory Support</span>
            </div>
            <span className="font-sans text-sm font-black text-ink">
              ${plan.monthlySupportFee.toLocaleString("en-US")}
              <span className="text-[10px] font-mono font-normal text-muted">/mo</span>
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-muted">
            Activates upon launch for {plan.supportCommitmentMonths} months: {plan.supportIncludes.join(", ")}.
          </p>
        </div>

        {/* Bottom: Action CTA Button */}
        <div className="space-y-3 pt-2">
          {/* Action Button: Leads to Formular */}
          <Button href="#contact" background={`var(--${plan.bgHighlightColor})`} textColor="var(--ink)">
            {plan.buttonLabel}
          </Button>
          <div className="text-center font-mono text-[10px] text-muted">Pre-fills intake formular below • Instant confirmation</div>
        </div>
      </div>
    </div>
  );
}
