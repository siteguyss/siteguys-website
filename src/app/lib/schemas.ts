// -----------------------------------------------------------------------------
// lib/schemas.ts
//
// WHAT: Zod schema(s) used to validate the Contract Initiation Formular before
//       it's ever treated as a real `ProjectInquiry` (see types.ts).
// HOW:  `contactFormSchema` only covers fields the *visitor* actually fills in.
//       Server-only fields on ProjectInquiry — referenceId, submittedAt,
//       totalUpfront, monthlyFee, totalCommitment — are deliberately left out.
//       Those are calculated inside the API route from the matched PlanTier,
//       never trusted from the client, and then merged in to build the final
//       ProjectInquiry object. This file is imported by both the client
//       component (for inline validation) and the API route (for server-side
//       re-validation) so the rules only live in one place.
// -----------------------------------------------------------------------------

import { z } from "zod";

// Keep this in sync with the <select> options rendered in ContactFormular.tsx
export const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-months", label: "Within 1–2 months" },
  { value: "flexible", label: "Flexible / no fixed date" },
  { value: "just-exploring", label: "Just exploring options" },
] as const;

const timelineValues = TIMELINE_OPTIONS.map((t) => t.value) as [string, ...string[]];

export const contactFormSchema = z.object({
  clientName: z.string().trim().min(2, "Please enter your full name.").max(100, "That name looks a little too long."),

  clientEmail: z.string().trim().min(1, "An email address is required.").email("Please enter a valid email address."),

  // Optional fields still get validated *if* something was typed, via
  // `.optional().or(z.literal(""))` so an empty string is allowed to pass.
  companyName: z.string().trim().max(120, "Company name looks a little too long.").optional().or(z.literal("")),

  currentWebsite: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(val), { message: "Enter a valid URL (e.g. yoursite.com) or leave this blank." }),

  planId: z.string().min(1, "Please select a package."),

  timeline: z.enum(timelineValues, {
    message: "Please select your ideal timeline.",
  }),

  // Add-on services are optional — zero or more may be checked.
  selectedServices: z.array(z.string()).default([]),

  projectDetails: z.string().trim().min(20, "Please give us at least a couple of sentences about the project.").max(2000, "That's a lot of detail — please keep it under 2000 characters."),

  acknowledgedContract: z.boolean().refine((val) => val === true, {
    message: "You need to acknowledge the contract terms to submit.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
