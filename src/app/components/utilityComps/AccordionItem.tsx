// -----------------------------------------------------------------------------
// utilityComps/AccordionItem.tsx
//
// WHAT: One collapsible question/answer row, used by FAQSection.tsx to render
//       the `contraqt_faq` list from lib/plansData.ts.
// HOW:  Self-contained open/closed state (no shared accordion context — each
//       item toggles independently, matching how simple/local the rest of
//       this project's utilityComps are). The +/− indicator and the answer's
//       max-height are both driven off the same `open` boolean.
// -----------------------------------------------------------------------------
"use client";

import { useState } from "react";

type AccordionItemProps = {
  question: string;
  answer: string;
};

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-line">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="font-sans text-sm font-bold text-ink sm:text-base">{question}</span>
        <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-line font-mono text-sm font-black text-ink">
          {open ? "−" : "+"}
        </span>
      </button>
      <div className={`grid transition-all duration-200 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{answer}</p>
        </div>
      </div>
    </div>
  );
}
