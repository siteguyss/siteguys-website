// -----------------------------------------------------------------------------
// utilityComps/FormField.tsx
//
// WHAT: Small layout wrapper used for every field in ContactFormular — renders
//       a mono/uppercase label (with a required-marker), whatever input you
//       pass as `children`, an optional hint, and a validation error message.
// HOW:  Purely presentational, no validation logic lives here. It just
//       displays whatever `error` string it's handed — the actual checking
//       happens in ContactFormular.tsx via the Zod schema in lib/schemas.ts.
//       `inputClass` is exported alongside so every text/email/url/textarea/
//       select input in the form shares one consistent hard-card-adjacent
//       style without repeating the className string everywhere.
// -----------------------------------------------------------------------------
import type { ReactNode } from "react";

// Shared className for native <input> / <textarea> / <select> elements so
// they visually match the rest of the site (2px border, mono text, focus ring).
export const inputClass = "focus-ring w-full border-2 border-line bg-panel px-3 py-2.5 font-mono text-sm text-ink outline-none placeholder:text-muted disabled:opacity-50";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function FormField({ label, htmlFor, required, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="flex items-center gap-1 font-mono text-[11px] font-black uppercase tracking-wider text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-coral">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-muted">{hint}</p>}
      {error && (
        <p role="alert" className="text-[11px] font-bold text-coral">
          {error}
        </p>
      )}
    </div>
  );
}
