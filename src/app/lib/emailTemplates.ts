// -----------------------------------------------------------------------------
// lib/emailTemplates.ts
//
// WHAT: Builds the two emails that should go out whenever the Contract
//       Initiation Formular is submitted — a confirmation to the client, and
//       an internal alert to the studio founders. Returns plain
//       `DispatchedEmail` objects (see types.ts).
// HOW:  These are pure string-templating functions — no network calls, no API
//       keys, nothing async. They just interpolate the submitted
//       `ProjectInquiry` + the matched `PlanTier` into an HTML string. Keeping
//       this separate from the actual "send it" step means the content can be
//       previewed/tested without needing a live email provider wired up.
//
// NOTE: Sending is intentionally NOT implemented anywhere in this feature yet.
//       See api/submit-inquiry/route.ts for where these get called, and the
//       TODO there — I didn't want to pick an email provider / API for you
//       without checking first.
// -----------------------------------------------------------------------------

import type { ProjectInquiry, DispatchedEmail, PlanTier } from "../types";

// TODO: confirm this is the correct inbox for studio-side alerts.
const STUDIO_EMAIL = "infositeguys@gmail.com";

function formatKr(n: number) {
  return `${n.toLocaleString("en-US")} kr.`;
}

export function buildCustomerConfirmationEmail(inquiry: ProjectInquiry, plan: PlanTier): DispatchedEmail {
  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #151515; line-height: 1.6;">
      <h1 style="font-size: 20px; margin-bottom: 4px;">Thanks, ${inquiry.clientName} — we've got your brief.</h1>
      <p style="color:#605f59; margin-top:0;">Reference: <strong>${inquiry.referenceId}</strong></p>
 
      <p>Here's a copy of what you submitted for <strong>${plan.name}</strong> (${plan.packageNumber}):</p>
      <ul>
        <li>Upfront build fee: ${formatKr(inquiry.totalUpfront)}</li>
        <li>Monthly support fee: ${formatKr(inquiry.monthlyFee)}/mo for ${plan.supportCommitmentMonths} months</li>
        <li>Total 3-month commitment: ${formatKr(inquiry.totalCommitment)}</li>
        <li>Timeline: ${inquiry.timeline}</li>
        ${inquiry.selectedServices.length ? `<li>Add-ons: ${inquiry.selectedServices.join(", ")}</li>` : ""}
      </ul>
 
      <p><strong>Project details you shared:</strong></p>
      <p style="white-space: pre-wrap; background:#f3f0e8; padding:12px; border:2px solid #151515;">${inquiry.projectDetails}</p>
 
      <p>We review every brief personally and reply within 24 business hours to lock in your kickoff date.</p>
    </div>
  `;

  return {
    id: `email-customer-${inquiry.referenceId}`,
    recipient: inquiry.clientEmail,
    recipientType: "customer",
    subject: `Your ${plan.name} project brief — ${inquiry.referenceId}`,
    sentAt: new Date().toISOString(),
    previewText: `We've received your brief for ${plan.name}. Reference ${inquiry.referenceId}.`,
    htmlBody,
  };
}

export function buildStudioAlertEmail(inquiry: ProjectInquiry, plan: PlanTier): DispatchedEmail {
  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #151515; line-height: 1.6;">
      <h1 style="font-size: 20px; margin-bottom: 4px;">
        New inquiry: ${inquiry.clientName}${inquiry.companyName ? ` (${inquiry.companyName})` : ""}
      </h1>
      <p style="color:#605f59; margin-top:0;">Reference: <strong>${inquiry.referenceId}</strong></p>
 
      <ul>
        <li>Email: ${inquiry.clientEmail}</li>
        <li>Current site: ${inquiry.currentWebsite || "—"}</li>
        <li>Package: ${plan.name} (${plan.packageNumber})</li>
        <li>Timeline: ${inquiry.timeline}</li>
        <li>Add-ons requested: ${inquiry.selectedServices.join(", ") || "None"}</li>
        <li>Total 6-month commitment: ${formatKr(inquiry.totalCommitment)}</li>
      </ul>
 
      <p><strong>Project details:</strong></p>
      <p style="white-space: pre-wrap; background:#f3f0e8; padding:12px; border:2px solid #151515;">${inquiry.projectDetails}</p>
    </div>
  `;

  return {
    id: `email-studio-${inquiry.referenceId}`,
    recipient: STUDIO_EMAIL,
    recipientType: "studio",
    subject: `New project inquiry — ${plan.name} — ${inquiry.referenceId}`,
    sentAt: new Date().toISOString(),
    previewText: `${inquiry.clientName} wants to start ${plan.name}. Ref ${inquiry.referenceId}.`,
    htmlBody,
  };
}
