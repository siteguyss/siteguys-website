import { footer } from "../lib/content";

export function Footer() {
  return (
    <footer className="border-t-2" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <p className="text-2xl font-extrabold tracking-tight">{footer.logo}</p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{footer.copy}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {footer.links.map((link) => (
            <a key={link.href} href={link.href} className="focus-ring font-mono text-xs font-bold uppercase hover:underline">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
