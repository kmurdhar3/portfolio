import type { CSSProperties, ReactNode } from "react";
import type { Hue, Link, ProjectStatus } from "@/content/site";
import { LinkIcon } from "./Icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[120rem] px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Inline style that sets the card colour (--c) used by .card, .tint and hue utilities. */
export function hueStyle(hue: Hue = "emerald"): CSSProperties {
  return { "--c": `var(--${hue})` } as CSSProperties;
}

export function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  // Sections sit inside the page's right-hand column, so no container of their own.
  return (
    <section id={id} aria-labelledby={headingId} className={`scroll-mt-24 py-14 sm:py-20 ${className}`}>
      <h2
        id={headingId}
        className="mb-8 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase"
      >
        <span className="rainbow h-0.5 w-10 rounded-full" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] leading-5 text-muted">
      {children}
    </span>
  );
}

const statusStyle: Record<ProjectStatus, string> = {
  Live: "bg-accent-soft text-accent-strong border-transparent",
  "Launched on Product Hunt": "border-ph/40 text-ph",
  Building: "border-line text-muted",
  "Open source": "border-line text-fg",
  Shipped: "border-line text-fg",
  "Internal tool": "border-line text-muted",
  Concept: "border-dashed border-line text-muted",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium leading-5 ${statusStyle[status]}`}
    >
      {status === "Live" && (
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      )}
      {status}
    </span>
  );
}

export function ExternalLink({
  link,
  variant = "ghost",
  className = "",
}: {
  link: Link;
  variant?: "primary" | "hue" | "ghost" | "plain";
  className?: string;
}) {
  const isExternal = /^https?:\/\//.test(link.href);
  const styles = {
    primary:
      "bg-accent text-accent-contrast hover:bg-accent-strong border-transparent",
    hue: "border-transparent bg-[var(--c)] text-accent-contrast hover:opacity-90",
    ghost: "border-line bg-surface text-fg hover:border-[var(--c,var(--accent))] hover:text-[var(--c,var(--accent))]",
    plain: "border-transparent text-muted hover:text-[var(--c,var(--accent))] px-0",
  }[variant];
  return (
    <a
      href={link.href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${styles} ${className}`}
    >
      <LinkIcon kind={link.kind} />
      {link.label}
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
