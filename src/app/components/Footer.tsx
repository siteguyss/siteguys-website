"use client";

import { useState } from "react";
import Image from "next/image";
import { footer } from "../lib/content";
import { nav } from "../lib/content";
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { isDark } = useTheme();
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  async function copyContact(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedContact(value);
      window.setTimeout(() => setCopiedContact(null), 1800);
    } catch {
      setCopiedContact(null);
    }
  }

  return (
    <footer className="border-t-2" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Image src={isDark ? nav.logo2 : nav.logo} alt="SiteGuys" width={170} height={32} className="h-8 w-auto" />
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{footer.copy}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {footer.links.map((link) =>
            link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? (
              <button key={link.href} type="button" className="focus-ring cursor-pointer font-mono text-xs font-bold uppercase hover:underline" onClick={() => copyContact(link.href.replace(/^(mailto:|tel:)/, "").split("?")[0])} aria-label={`Copy ${link.label}`}>
                {copiedContact === link.href.replace(/^(mailto:|tel:)/, "").split("?")[0] ? "Copied" : link.label}
              </button>
            ) : (
              <a key={link.href} href={link.href} className="focus-ring font-mono text-xs font-bold uppercase hover:underline">
                {link.label}
              </a>
            ),
          )}
        </div>
        <span className="sr-only" aria-live="polite">
          {copiedContact ? "Contact copied to clipboard." : ""}
        </span>
      </div>
    </footer>
  );
}
