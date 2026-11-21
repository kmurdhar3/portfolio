"use client";

import { useState, type ReactNode } from "react";
import type { Project, ProjectTag } from "@/content/site";
import { Chip, ExternalLink, StatusBadge } from "./ui";

const TAGS: ProjectTag[] = ["Live", "AI", "Data", "Tools", "Open source"];

/**
 * Client-side tag filter. Images are rendered on the server and passed in by slug,
 * so this component only toggles visibility.
 */
export function ProjectGrid({
  projects,
  images,
  allLabel,
  filterLabel,
}: {
  projects: Project[];
  images: Record<string, ReactNode>;
  allLabel: string;
  filterLabel: string;
}) {
  const [active, setActive] = useState<ProjectTag | null>(null);
  const visible = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  const filters: { value: ProjectTag | null; label: string }[] = [
    { value: null, label: allLabel },
    // Only offer tags that at least one project has, so no filter leads to an empty grid.
    ...TAGS.filter((t) => projects.some((p) => p.tags.includes(t))).map((t) => ({ value: t, label: t })),
  ];

  return (
    <div>
      <div role="group" aria-label={filterLabel} className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const pressed = active === f.value;
          const count = f.value ? projects.filter((p) => p.tags.includes(f.value!)).length : projects.length;
          return (
            <button
              key={f.label}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(f.value)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                pressed
                  ? "border-accent bg-accent text-accent-contrast"
                  : "border-line bg-surface text-muted hover:border-accent hover:text-fg"
              }`}
            >
              {f.label} <span className={pressed ? "" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug} className="flex">
            <article className="flex w-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accent/50">
              {images[p.slug]}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap gap-1.5">
                  {p.statuses.map((s) => (
                    <StatusBadge key={s} status={s} />
                  ))}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{p.oneLiner}</p>
                {p.stack.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${p.name} stack`}>
                    {p.stack.map((s) => (
                      <li key={s}>
                        <Chip>{s}</Chip>
                      </li>
                    ))}
                  </ul>
                )}
                {p.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3">
                    {p.links.map((l) => (
                      <ExternalLink key={l.href} link={l} variant="plain" className="py-1" />
                    ))}
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
