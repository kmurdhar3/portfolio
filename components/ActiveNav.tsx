"use client";

import { useEffect, useState } from "react";

/** Vertical section nav for the sidebar; highlights the section currently in view. */
export function ActiveNav({
  items,
  label,
}: {
  items: readonly { href: string; label: string }[];
  label: string;
}) {
  const [active, setActive] = useState<string>(items[0]?.href ?? "");

  useEffect(() => {
    const sections = items
      .map((i) => document.querySelector<HTMLElement>(i.href))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // A section counts as active once its top passes ~40% down the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
          setActive(`#${top.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label}>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.href;
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center gap-3 py-1.5 font-mono text-xs tracking-[0.14em] uppercase"
              >
                <span
                  aria-hidden="true"
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    isActive ? "rainbow w-14" : "w-7 bg-muted/50 group-hover:w-12 group-hover:bg-fg"
                  }`}
                />
                <span className={isActive ? "text-fg" : "text-muted group-hover:text-fg"}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
