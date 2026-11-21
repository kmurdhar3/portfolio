import type { ReactNode } from "react";
import type { Link, ProjectStatus } from "@/content/site";
import { LinkIcon } from "./Icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
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
  return (
    <section id={id} aria-labelledby={headingId} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        <h2
          id={headingId}
          className="mb-10 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase"
        >
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
          {title}
        </h2>
        {children}
      </Container>
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
  variant?: "primary" | "ghost" | "plain";
  className?: string;
}) {
  const isExternal = /^https?:\/\//.test(link.href);
  const styles = {
    primary:
      "bg-accent text-accent-contrast hover:bg-accent-strong border-transparent",
    ghost: "border-line bg-surface text-fg hover:border-accent hover:text-accent",
    plain: "border-transparent text-muted hover:text-accent px-0",
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
