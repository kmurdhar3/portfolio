import { hues, site, ui } from "@/content/site";
import { FeaturedProducts } from "./FeaturedProduct";
import { YouTubeIcon } from "./Icons";
import { LiteYouTube } from "./LiteYouTube";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectImage, hasProjectFile, hasProjectImage } from "./ProjectImage";
import { ExternalLink, Section, hueStyle } from "./ui";

/** Featured products, then the rest of what's shipped as a dashboard grid. */
export function Products() {
  const projects = site.projects.filter((p) => !p.featured);
  const sizes = "(min-width: 1280px) 600px, (min-width: 640px) 45vw, 100vw";
  const images = Object.fromEntries(
    projects.map((p) => {
      // Any listed screenshots get the gallery + full-screen viewer (arrows only when 2+).
      const slides = (p.screenshots ?? [])
        .filter((s) => hasProjectFile(s.file))
        .map((s) => ({ src: `/projects/${s.file}`, alt: s.alt }));
      return [
        p.slug,
        slides.length > 0 ? (
          <ProjectGallery key={p.slug} slides={slides} name={p.name} sizes={sizes} labels={ui.gallery} />
        ) : (
          <ProjectImage
            key={p.slug}
            slug={p.slug}
            name={p.name}
            hasImage={hasProjectImage(p.slug)}
            sizes={sizes}
          />
        ),
      ];
    }),
  );
  return (
    <Section id="products" title={ui.sections.products}>
      <FeaturedProducts />
      {projects.length > 0 && (
        <>
          <h3 className="mt-16 mb-6 font-display text-4xl leading-tight">
            <span className="text-gradient">{ui.sections.moreProducts}</span>
          </h3>
          <ProjectGrid projects={projects} images={images} allLabel={ui.filterAll} filterLabel={ui.filterLabel} />
        </>
      )}
    </Section>
  );
}

export function Demos() {
  if (site.videos.length === 0) return null;
  return (
    <Section id="demos" title={ui.sections.demos}>
      <ul className="grid gap-5 sm:grid-cols-2">
        {site.videos.map((v, i) => (
          <li
            key={v.id}
            style={hueStyle(hues[(i + 4) % hues.length])}
            className="card tint reveal overflow-hidden rounded-2xl p-3"
          >
            <LiteYouTube id={v.id} title={`${v.title} — ${v.caption}`} playLabel={ui.playVideo} />
            <div className="px-2 pt-3 pb-1">
              <h3 className="font-semibold text-[var(--c)]">{v.title}</h3>
              <p className="text-sm text-muted">{v.caption}</p>
            </div>
          </li>
        ))}
      </ul>
      {site.youtubeChannel && (
        <a
          href={site.youtubeChannel}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          <YouTubeIcon /> {ui.youtubeChannel}
        </a>
      )}
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" title={ui.sections.skills}>
      <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {site.skills.map((g, i) => (
          <div key={g.name} style={hueStyle(hues[i % hues.length])}>
            <dt className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-[var(--c)]" aria-hidden="true" />
              {g.name}
            </dt>
            <dd className="mt-2.5">
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-[color-mix(in_oklab,var(--c)_30%,var(--border))] bg-[color-mix(in_oklab,var(--c)_7%,var(--surface))] px-2.5 py-1 text-[13px]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Contact() {
  const { profile } = site;
  const email = profile.links.find((l) => l.kind === "email");
  return (
    <Section id="contact" title={ui.sections.contact}>
      <div className="card reveal relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-violet/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-amber/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 h-56 w-56 rounded-full bg-cyan/15 blur-3xl"
        />
        <p className="relative font-display text-4xl leading-tight sm:text-5xl">
          <span className="text-gradient">{ui.contactTitle}</span>
        </p>
        <p className="relative mt-4 max-w-xl text-lg text-muted">{ui.contactLead}</p>
        {email && (
          <a
            href={email.href}
            className="relative mt-6 inline-block text-xl font-semibold tracking-tight break-all text-fg underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent sm:text-3xl"
          >
            {profile.email}
          </a>
        )}
        <div className="relative mt-8 flex flex-wrap gap-3">
          {profile.links
            .filter((l) => l.kind !== "email")
            .map((l) => (
              <ExternalLink key={l.href} link={l} />
            ))}
        </div>
      </div>
    </Section>
  );
}

export function Footer({ year }: { year: number }) {
  return (
    <footer className="flex flex-col gap-2 border-t border-line py-8 text-sm text-muted sm:flex-row sm:justify-between">
      <p>
        © {year} {site.profile.name}
      </p>
      <p>{site.footer}</p>
    </footer>
  );
}
