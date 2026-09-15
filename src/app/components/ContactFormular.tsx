// -----------------------------------------------------------------------------
// ContactFormular.tsx  ("Contract Initiation Formular")
//
// WHAT: The intake form a visitor fills in to kick off a project. Collects
//       everything ProjectInquiry needs (see types.ts) except the
//       server-calculated fields (referenceId, totals, submittedAt), which
//       the API route fills in after validating.
//
// HOW:
//   1. Plain useState for form values + a parallel `errors` object — no form
//      library, kept consistent with how lightweight the rest of this
//      project's components are.
//   2. On mount, reads `?plan=<id>` from the URL so the "Select Package"
//      buttons in PackageCard.tsx can deep-link straight into a pre-filled
//      form (this is what PackageCard's "Pre-fills intake formular below"
//      caption already refers to — see the accompanying PackageCard.tsx diff
//      note for the one-line change that sends that query param).
//   3. On submit: validates client-side with `contactFormSchema` (Zod) for
//      instant feedback, then POSTs the same payload to
//      /api/submit-inquiry, which re-validates server-side, computes the fee
//      totals, and returns a reference ID + the two generated emails.
//   4. On success, swaps to a confirmation view listing the concrete "what
//      happens next" steps (matches the answer already written in
//      contraqt_faq for "What does submitting the inquiry form do?").
//
// NOTE: No email is actually sent anywhere in this flow yet — see the TODO in
//       api/submit-inquiry/route.ts. That's intentional until we've agreed on
//       an email provider.
// -----------------------------------------------------------------------------
"use client";
 
import { useEffect, useState, type FormEvent } from "react";
import { HardCard } from "./utilityComps/HardCard";
import { SectionEyebrow } from "./utilityComps/SectionEyebrow";
import { FormField, inputClass } from "./utilityComps/Formfield";
import { subscription_plans } from "@/app/lib/plansData";
import { services } from "@/app/lib/content";
import { contactFormSchema, TIMELINE_OPTIONS } from "@/app/lib/schemas";
import type { DispatchedEmail } from "@/app/types";
 
type FormValues = {
  clientName: string;
  clientEmail: string;
  companyName: string;
  currentWebsite: string;
  planId: string;
  timeline: string;
  selectedServices: string[];
  projectDetails: string;
  acknowledgedContract: boolean;
};
 
const emptyValues: FormValues = {
  clientName: "",
  clientEmail: "",
  companyName: "",
  currentWebsite: "",
  planId: "",
  timeline: "",
  selectedServices: [],
  projectDetails: "",
  acknowledgedContract: false,
};
 
type Status = "idle" | "submitting" | "success" | "error";
 
export function ContactFormular() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");
  const [emailPreviews, setEmailPreviews] = useState<DispatchedEmail[]>([]);
 
  // Step 2 from the header note: pick up ?plan=package-2 from the URL, if a
  // package button sent us here with one, and pre-select it.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    if (planParam && subscription_plans.some((p) => p.id === planParam)) {
      setValues((prev) => ({ ...prev, planId: planParam }));
    }
  }, []);
 
  const selectedPlan = subscription_plans.find((p) => p.id === values.planId);
  const totalCommitment = selectedPlan ? selectedPlan.upfrontFee + selectedPlan.monthlySupportFee * selectedPlan.supportCommitmentMonths : null;
 
  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear that field's error as soon as the person edits it again.
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }
 
  function toggleService(serviceTitle: string) {
    setValues((prev) => {
      const isSelected = prev.selectedServices.includes(serviceTitle);
      return {
        ...prev,
        selectedServices: isSelected ? prev.selectedServices.filter((s) => s !== serviceTitle) : [...prev.selectedServices, serviceTitle],
      };
    });
  }
 
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
 
    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
 
    setStatus("submitting");
    setServerMessage("");
 
    try {
      const res = await fetch("/api/submit-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
 
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerMessage(data.message ?? "Something went wrong — please try again.");
        if (data.fieldErrors) setErrors(data.fieldErrors);
        return;
      }
 
      setReferenceId(data.referenceId);
      setEmailPreviews(data.emails ?? []);
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage("Couldn't reach the server — check your connection and try again.");
    }
  }
 
  if (status === "success") {
    return (
      <div id="contact" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
        <div className="mx-auto max-w-2xl">
          <SectionEyebrow>06/ You're In</SectionEyebrow>
          <HardCard className="mt-6 bg-panel p-6 sm:p-8">
            <h2 className="text-2xl font-black sm:text-3xl">Brief received — reference {referenceId}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Here's exactly what happens next:</p>
            <ol className="mt-5 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-line bg-lime font-mono text-xs font-black text-ink">1</span>
                <span className="text-sm text-ink">
                  A confirmation email with your full brief and contract specifics goes to <strong>{values.clientEmail}</strong>.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-line bg-lavender font-mono text-xs font-black text-ink">2</span>
                <span className="text-sm text-ink">Our founders are alerted with your project details immediately.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-line bg-teal font-mono text-xs font-black text-ink">3</span>
                <span className="text-sm text-ink">We review your request and reply within 24 business hours to lock in your kickoff date.</span>
              </li>
            </ol>
 
            {/* Dev-only visibility into what would be emailed — safe to delete
                once real sending is wired up, or keep for internal QA. */}
            {emailPreviews.length > 0 && (
              <details className="mt-6 border-t-2 border-line pt-4">
                <summary className="cursor-pointer font-mono text-[11px] font-black uppercase tracking-wider text-muted">Email content sent (preview)</summary>
                <div className="mt-3 space-y-3">
                  {emailPreviews.map((email) => (
                    <div key={email.id} className="border-2 border-line bg-paper p-3 text-xs">
                      <div className="font-mono font-bold">
                        To: {email.recipient} ({email.recipientType})
                      </div>
                      <div className="mt-1 font-bold">{email.subject}</div>
                      <div className="mt-1 text-muted">{email.previewText}</div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </HardCard>
        </div>
      </div>
    );
  }
 
  return (
    <div id="contact" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 grid-surface">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>06/ Start a Project</SectionEyebrow>
        <h2 className="my-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Tell us about the project.</h2>
        <p className="max-w-xl text-sm text-muted">Submitting this locks in your package choice and kicks off the contract — we'll follow up within 24 business hours.</p>
 
        {/* HardCard doesn't forward onSubmit, so the real <form> wraps it rather than
            using HardCard's `as` prop — avoids ending up with a form nested in a form. */}
        <form onSubmit={handleSubmit}>
          <HardCard className="mt-8 space-y-6 bg-panel p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField label="Full Name" htmlFor="clientName" required error={errors.clientName}>
                <input id="clientName" name="clientName" type="text" autoComplete="name" className={inputClass} value={values.clientName} onChange={(e) => updateField("clientName", e.target.value)} />
              </FormField>
 
              <FormField label="Email" htmlFor="clientEmail" required error={errors.clientEmail}>
                <input id="clientEmail" name="clientEmail" type="email" autoComplete="email" className={inputClass} value={values.clientEmail} onChange={(e) => updateField("clientEmail", e.target.value)} />
              </FormField>
 
              <FormField label="Company Name" htmlFor="companyName" error={errors.companyName} hint="Optional">
                <input id="companyName" name="companyName" type="text" className={inputClass} value={values.companyName} onChange={(e) => updateField("companyName", e.target.value)} />
              </FormField>
 
              <FormField label="Current Website" htmlFor="currentWebsite" error={errors.currentWebsite} hint="Optional — leave blank if none">
                <input id="currentWebsite" name="currentWebsite" type="text" placeholder="yoursite.com" className={inputClass} value={values.currentWebsite} onChange={(e) => updateField("currentWebsite", e.target.value)} />
              </FormField>
            </div>
 
            <FormField label="Package" htmlFor="planId" required error={errors.planId}>
              <select id="planId" name="planId" className={inputClass} value={values.planId} onChange={(e) => updateField("planId", e.target.value)}>
                <option value="">Select a package…</option>
                {subscription_plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.packageNumber} — {plan.name} ({plan.upfrontFee.toLocaleString("en-US")} kr. upfront)
                  </option>
                ))}
              </select>
            </FormField>
 
            {selectedPlan && totalCommitment !== null && (
              <div className="border-2 border-line bg-paper p-3.5 text-xs text-ink shadow-[3px_3px_0px_var(--line)]">
                <span className="font-mono font-black uppercase">{selectedPlan.name} selected:</span>{" "}
                {selectedPlan.upfrontFee.toLocaleString("en-US")} kr. upfront + {selectedPlan.monthlySupportFee.toLocaleString("en-US")} kr./mo × {selectedPlan.supportCommitmentMonths} months
                {" = "}
                {totalCommitment.toLocaleString("en-US")} kr. total 6-month commitment.
              </div>
            )}
 
            <FormField label="Ideal Timeline" htmlFor="timeline" required error={errors.timeline}>
              <select id="timeline" name="timeline" className={inputClass} value={values.timeline} onChange={(e) => updateField("timeline", e.target.value)}>
                <option value="">Select a timeline…</option>
                {TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>
 
            <FormField label="Anything Else You'd Like" htmlFor="selectedServices" hint="Optional add-ons to flag for your lead engineer">
              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <label key={service.id} className="focus-ring flex cursor-pointer items-center gap-2 border-2 border-line bg-paper px-3 py-2 text-xs font-medium text-ink">
                    <input type="checkbox" className="h-3.5 w-3.5 accent-[var(--lime)]" checked={values.selectedServices.includes(service.title)} onChange={() => toggleService(service.title)} />
                    {service.title}
                  </label>
                ))}
              </div>
            </FormField>
 
            <FormField label="Project Details" htmlFor="projectDetails" required error={errors.projectDetails} hint="Goals, pages needed, examples of sites you like — the more context, the better.">
              <textarea id="projectDetails" name="projectDetails" rows={5} className={`${inputClass} resize-y`} value={values.projectDetails} onChange={(e) => updateField("projectDetails", e.target.value)} />
            </FormField>
 
            <FormField label="Contract Acknowledgement" htmlFor="acknowledgedContract" required error={errors.acknowledgedContract}>
              <label htmlFor="acknowledgedContract" className="flex cursor-pointer items-start gap-2.5 text-xs text-ink">
                <input id="acknowledgedContract" name="acknowledgedContract" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--lime)]" checked={values.acknowledgedContract} onChange={(e) => updateField("acknowledgedContract", e.target.checked)} />
                <span>I understand this starts a 6-month obligatory support subscription after launch, as outlined in the FAQ below.</span>
              </label>
            </FormField>
 
            {status === "error" && serverMessage && (
              <div role="alert" className="border-2 border-coral bg-panel p-3 text-sm font-bold text-coral">
                {serverMessage}
              </div>
            )}
 
            <div className="pt-2">
              <button type="submit" disabled={status === "submitting"} className="focus-ring inline-flex min-h-8 max-h-12 items-center justify-center cursor-pointer gap-3 rounded-none border-2 border-line bg-lime px-6 py-3 font-bold font-mono! text-ink disabled:cursor-not-allowed disabled:opacity-60">
                {status === "submitting" ? "Sending…" : "Submit Project Brief"}
              </button>
            </div>
          </HardCard>
        </form>
      </div>
    </div>
  );
}
 