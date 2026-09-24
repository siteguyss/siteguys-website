// -----------------------------------------------------------------------------
// FAQSection.tsx
//
// WHAT: Renders the contract/process FAQ using the `contraqt_faq` array that
//       already exists in lib/plansData.ts — no new copy was invented here.
// HOW:  Same section shell as PackagesSection.tsx (max-width container,
//       SectionEyebrow, heading), with each Q/A handed to the AccordionItem
//       utility component. Adjust the eyebrow number below once you know
//       where this section actually lands in page.tsx.
// -----------------------------------------------------------------------------
import { contraqt_faq } from "@/app/lib/plansData";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { AccordionItem } from "./utilityComps/AccordionItem";

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>05/ FAQ</SectionEyebrow>
        <h2 id="faq-heading" className="my-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Contract & process, answered.
        </h2>

        <div className="mt-8 divide-y-2 divide-line border-2 border-line bg-panel hard-card">
          {contraqt_faq.map((item, i) => (
            <AccordionItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
