import { subscription_plans } from "@/app/lib/plansData";
import PackageCard from "./utilityComps/PackageCard";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";

export default function PackagesSection() {
  return (
    <div id="packages" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
      <div className="mx-auto max-w-7xl mt-6 border-b-2 border-(--ink) pb-10">
        <SectionEyebrow>03/ Our Packages</SectionEyebrow>
        <h2 className="my-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Engineered to convert, Built to scale.</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {subscription_plans.map((plan) => (
            <PackageCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
