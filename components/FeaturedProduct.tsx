import type { Project } from "@/content/site";
import { site, ui } from "@/content/site";
import { ProductHuntIcon } from "./Icons";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectImage, hasProjectFile, hasProjectImage } from "./ProjectImage";
import { Chip, ExternalLink, StatusBadge, hueStyle } from "./ui";

function ProductHuntBadge({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-lg border border-ph/40 bg-surface px-3 py-1.5 text-ph transition-colors hover:border-ph"
    >
      <ProductHuntIcon className="h-6 w-6" />
      <span className="flex flex-col leading-tight">
        <span className="font-mono text-[10px] tracking-wider uppercase">Launched on</span>
        <span className="text-sm font-semibold">Product Hunt</span>
      </span>
      <span className="sr-only">: {name} (opens in a new tab)</span>
    </a>
  );
}

/** Large product tile: screenshots first, then the pitch, then depth on demand. */
function FeaturedCard({ project }: { project: Project }) {
  const ph = project.links.find((l) => l.kind === "producthunt");
  const otherLinks = project.links.filter((l) => l.kind !== "producthunt");
  const slides = (project.screenshots ?? [])
    .filter((s) => hasProjectFile(s.file))
    .map((s) => ({ src: `/projects/${s.file}`, alt: s.alt }));
  const imageSizes = "(min-width: 1280px) 1200px, (min-width: 1024px) 70vw, 100vw";

  return (
    <article
      aria-labelledby={`${project.slug}-name`}
      style={hueStyle(project.color)}
      className="card tint reveal overflow-hidden rounded-3xl"
    >
      <div className="h-1.5 bg-[var(--c)]" aria-hidden="true" />
      {slides.length > 0 ? (
        <ProjectGallery
          slides={slides}
          name={project.name}
          sizes={imageSizes}
          labels={ui.gallery}
        />
      ) : (
        <ProjectImage
          slug={project.slug}
          name={project.name}
          hasImage={hasProjectImage(project.slug)}
          sizes={imageSizes}
        />
      )}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {project.statuses.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
        <h3 id={`${project.slug}-name`} className="mt-4 font-display text-5xl leading-none tracking-tight text-[var(--c)]">
          {project.name}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{project.oneLiner}</p>
        {project.role && <p className="mt-3 font-mono text-xs text-muted">{project.role}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {otherLinks.map((l, i) => (
            <ExternalLink key={l.href} link={l} variant={i === 0 ? "hue" : "ghost"} />
          ))}
          {ph && <ProductHuntBadge href={ph.href} name={project.name} />}
        </div>

        {project.features && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {project.features.map((f) => (
              <li
                key={f.title}
                className="rounded-xl border border-[color-mix(in_oklab,var(--c)_35%,var(--border))] bg-surface/70 p-4"
              >
                <p className="font-mono text-sm font-semibold text-[var(--c)]">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed">{f.body}</p>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`${project.name} stack`}>
          {project.stack.map((s) => (
            <li key={s}>
              <Chip>{s}</Chip>
            </li>
          ))}
        </ul>

        {project.details && project.details.length > 0 && (
          <details className="group mt-6 rounded-xl border border-line bg-surface-2/50 open:bg-surface-2/80">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
              {ui.engineeringDetails}
              <span
                aria-hidden="true"
                className="font-mono text-[var(--c)] transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <ul className="list-disc space-y-2 px-4 pb-4 pl-9 text-[15px] leading-relaxed marker:text-[var(--c)]">
              {project.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}

export function FeaturedProducts() {
  const featured = site.projects.filter((p) => p.featured);
  return (
    <div className="grid gap-8 min-[1800px]:grid-cols-2">
      {featured.map((p) => (
        <FeaturedCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
