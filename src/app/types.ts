export interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
  badge?: string;
  unavailableNote?: string;
}

export interface PlanTier {
  id: string;
  packageNumber: string; // e.g., "PACKAGE 1"
  name: string;
  tagline: string;
  upfrontFee: number; // Upfront build & design fee
  monthlySupportFee: number; // Monthly support & iteration subscription fee
  supportCommitmentMonths: number; // Default 6 months obligatory
  turnaroundDays: string; // e.g., "5–7 Days"
  pageCount: string; // e.g., "1–2 Pages"
  iterationPolicy: string; // e.g., "2 Revision Rounds" or "Unlimited Iterations"
  concurrentRequests: number;
  popular?: boolean;
  bgHighlightColor: string;
  textColor: string;
  bgColor: string;
  dotColor: string;
  buttonLabel: string;
  description: string;
  highlights: string[];
  features?: PlanFeature[];
  specs: {
    label: string;
    value: string;
  }[];
  includedFeatures: string[];
  supportIncludes: string[];
}
