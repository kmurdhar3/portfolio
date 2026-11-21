import type { Project } from "@/content/site";
import { site, ui } from "@/content/site";
import { ProductHuntIcon } from "./Icons";
import { LiteYouTube } from "./LiteYouTube";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectImage, hasProjectFile, hasProjectImage } from "./ProjectImage";
import { Chip, ExternalLink, StatusBadge } from "./ui";

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

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const ph = project.links.find((l) => l.kind === "producthunt");
  const otherLinks = project.links.filter((l) => l.kind !== "producthunt");
  const videos = project.videoIds ?? [];
  const videoTitles = new Map(site.videos.map((v) => [v.id, `${v.title} — ${v.caption}`]));
  const slides = (project.screenshots ?? [])
    .filter((s) => hasProjectFile(s.file))
    .map((s) => ({ src: `/projects/${s.file}`, alt: s.alt }));
  const imageSizes = "(min-width: 1024px) 576px, 100vw";
  const imageClass = "lg:aspect-auto lg:h-full lg:border-r lg:border-b-0";

  return (
    <article
      aria-labelledby={`${project.slug}-name`}
      className="overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="grid lg:grid-cols-2">
        {slides.length > 0 ? (
          <ProjectGallery
            slides={slides}
            name={project.name}
            sizes={imageSizes}
            labels={ui.gallery}
            preload={index === 0}
            className={imageClass}
          />
        ) : (
          <ProjectImage
            slug={project.slug}
            name={project.name}
            hasImage={hasProjectImage(project.slug)}
            sizes={imageSizes}
            preload={index === 0}
            className={imageClass}
          />
        )}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {project.statuses.map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
          <h3 id={`${project.slug}-name`} className="mt-4 text-3xl font-semibold tracking-tight">
            {project.name}
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-pretty text-muted">{project.oneLiner}</p>
          {project.role && (
            <p className="mt-3 font-mono text-xs text-muted">
              {ui.role}: {project.role}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {otherLinks.map((l, i) => (
              <ExternalLink key={l.href} link={l} variant={i === 0 ? "primary" : "ghost"} />
            ))}
            {ph && <ProductHuntBadge href={ph.href} name={project.name} />}
          </div>
        </div>
      </div>

      <div className="border-t border-line p-6 sm:p-8">
        {project.features && (
          <ul className="grid gap-4 sm:grid-cols-3">
            {project.features.map((f) => (
              <li key={f.title} className="rounded-xl border border-line bg-surface-2 p-4">
                <p className="font-mono text-sm font-semibold text-accent">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed">{f.body}</p>
              </li>
            ))}
          </ul>
        )}
        {project.details && (
          <ul
            className={`list-disc space-y-2 pl-5 text-[15px] leading-relaxed marker:text-accent ${
              project.features ? "mt-6" : ""
            }`}
          >
            {project.details.map((d) => (
              <li key={d}>{d}</li>
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
        {videos.length > 0 && (
          <div className="mt-8">
            <h4 className="font-mono text-xs tracking-wider text-muted uppercase">{ui.demoVideos}</h4>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {videos.map((id) => (
                <LiteYouTube
                  key={id}
                  id={id}
                  title={videoTitles.get(id) ?? project.name}
                  playLabel={ui.playVideo}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export function FeaturedProducts() {
  const featured = site.projects.filter((p) => p.featured);
  return (
    <div className="space-y-10">
      {featured.map((p, i) => (
        <FeaturedCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
