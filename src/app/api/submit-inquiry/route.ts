  // -----------------------------------------------------------------------------
  // api/submit-inquiry/route.ts
  //
  // WHAT: Receives the Contract Initiation Formular submission from the client,
  //       re-validates it with the same Zod schema used client-side (never trust
  //       the client alone), looks up the selected PlanTier, calculates the fee
  //       totals server-side, and assembles a full `ProjectInquiry` record plus
  //       the two emails that should go out (customer confirmation + studio
  //       alert).
  // HOW:  Standard Next.js App Router route handler (POST only). On success it
  //       returns the referenceId + the generated email previews so the client
  //       can show its "what happens next" confirmation screen.
  //
  // Sends real email over SMTP via Nodemailer (lib/mailer.ts) — requires the
  // SMTP_* variables in .env.local to be set to a real mailbox's credentials,
  // or every submission will fail at the sendMail() calls below.
  // -----------------------------------------------------------------------------

  import { NextResponse } from "next/server";
  import { contactFormSchema } from "@/app/lib/schemas";
  import { subscription_plans } from "@/app/lib/plansData";
  import { buildCustomerConfirmationEmail, buildStudioAlertEmail } from "@/app/lib/emailTemplates";
  import { sendMail } from "@/app/lib/mailer";
  import type { ProjectInquiry } from "@/app/types";

  function generateReferenceId() {
    const stamp = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `SG-${stamp}-${rand}`;
  }

  export async function POST(request: Request) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      // Flatten Zod's error tree into { fieldName: "message" } for the client.
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return NextResponse.json({ ok: false, message: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
    }

    const values = parsed.data;
    const plan = subscription_plans.find((p) => p.id === values.planId);
    if (!plan) {
      return NextResponse.json({ ok: false, message: "Selected package could not be found." }, { status: 400 });
    }

    const totalUpfront = plan.upfrontFee;
    const monthlyFee = plan.monthlySupportFee;
    const totalCommitment = plan.upfrontFee + plan.monthlySupportFee * plan.supportCommitmentMonths;

    const inquiry: ProjectInquiry = {
      ...values,
      companyName: values.companyName ?? "",
      currentWebsite: values.currentWebsite ?? "",
      selectedServices: values.selectedServices ?? [],
      referenceId: generateReferenceId(),
      submittedAt: new Date().toISOString(),
      totalUpfront,
      monthlyFee,
      totalCommitment,
    };

    const customerEmail = buildCustomerConfirmationEmail(inquiry, plan);
    const studioEmail = buildStudioAlertEmail(inquiry, plan);

    // Send both emails over SMTP (see lib/mailer.ts for the required
    // .env.local variables). Promise.allSettled means one failing (e.g. a typo
    // in the client's email address) doesn't block the other from going out.
    const [customerResult, studioResult] = await Promise.allSettled([sendMail({ to: customerEmail.recipient, subject: customerEmail.subject, html: customerEmail.htmlBody }), sendMail({ to: studioEmail.recipient, subject: studioEmail.subject, html: studioEmail.htmlBody })]);

    if (customerResult.status === "rejected") console.error("[submit-inquiry] Customer email failed:", customerResult.reason);
    if (studioResult.status === "rejected") console.error("[submit-inquiry] Studio alert failed:", studioResult.reason);

    // NOTE: there's currently no database — if BOTH sends fail, this inquiry
    // isn't recorded anywhere. Worth keeping in mind; a persistence layer
    // (even just appending to a spreadsheet/DB row) is a separate addition if
    // that risk matters to you.
    if (customerResult.status === "rejected" && studioResult.status === "rejected") {
      return NextResponse.json({ ok: false, message: "We couldn't send your confirmation right now — please try again shortly." }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      referenceId: inquiry.referenceId,
      emails: [customerEmail, studioEmail],
    });
  }
