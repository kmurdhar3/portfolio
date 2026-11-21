import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ui } from "@/content/site";

/** True if public/projects/<file> exists at build time. */
export function hasProjectFile(file: string) {
  return existsSync(path.join(process.cwd(), "public", "projects", file));
}

/** True if public/projects/<slug>.webp exists at build time. */
export function hasProjectImage(slug: string) {
  return hasProjectFile(`${slug}.webp`);
}

/**
 * Screenshot for a project, or a lettered placeholder until a real image is dropped
 * into public/projects/<slug>.webp. Server component — the check runs at build time.
 */
export function ProjectImage({
  slug,
  name,
  hasImage,
  sizes,
  className = "",
  preload = false,
}: {
  slug: string;
  name: string;
  hasImage: boolean;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2 ${className}`}
    >
      {hasImage ? (
        <Image
          src={`/projects/${slug}.webp`}
          alt={`Screenshot of ${name}`}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover object-top"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:16px_16px]"
          role="img"
          aria-label={`${name} — ${ui.noImage}`}
        >
          <span className="text-4xl font-semibold tracking-tight text-accent" aria-hidden="true">
            {name.charAt(0)}
          </span>
          <span className="font-mono text-[11px] text-muted" aria-hidden="true">
            {ui.noImage}
          </span>
        </div>
      )}
    </div>
  );
}
