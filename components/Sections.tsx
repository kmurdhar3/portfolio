import { site, ui } from "@/content/site";
import { FeaturedProducts } from "./FeaturedProduct";
import { YouTubeIcon } from "./Icons";
import { LiteYouTube } from "./LiteYouTube";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectGallery } from "./ProjectGallery";
import { ProjectImage, hasProjectFile, hasProjectImage } from "./ProjectImage";
import { Container, ExternalLink, Section } from "./ui";

export function Products() {
  return (
    <Section id="products" title={ui.sections.products}>
      <FeaturedProducts />
    </Section>
  );
}

export function Projects() {
  const projects = site.projects.filter((p) => !p.featured);
  const sizes = "(min-width: 1024px) 368px, (min-width: 640px) 50vw, 100vw";
  const images = Object.fromEntries(
    projects.map((p) => {
      // Any listed screenshots get the gallery + full-screen viewer (arrows only when 2+).
      const slides = (p.screenshots ?? [])
        .filter((s) => hasProjectFile(s.file))
        .map((s) => ({ src: `/projects/${s.file}`, alt: s.alt }));
      return [
        p.slug,
        slides.length > 0 ? (
          <ProjectGallery
            key={p.slug}
            slides={slides}
            name={p.name}
            sizes={sizes}
            labels={ui.gallery}
          />
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
    <Section id="projects" title={ui.sections.projects}>
      <ProjectGrid
        projects={projects}
        images={images}
        allLabel={ui.filterAll}
        filterLabel={ui.filterLabel}
      />
    </Section>
  );
}

export function Videos() {
  if (site.videos.length === 0) return null;
  return (
    <Section id="videos" title={ui.sections.videos}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {site.videos.map((v) => (
          <li key={v.id}>
            <LiteYouTube id={v.id} title={`${v.title} — ${v.caption}`} playLabel={ui.playVideo} />
            <h3 className="mt-3 font-semibold">{v.title}</h3>
            <p className="text-sm text-muted">{v.caption}</p>
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
      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {site.skills.map((g) => (
          <div key={g.name}>
            <dt className="text-sm font-semibold">{g.name}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 text-[13px]"
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
      <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
        <p className="max-w-xl text-lg text-muted">{ui.contactLead}</p>
        {email && (
          <a
            href={email.href}
            className="mt-4 block text-2xl font-semibold tracking-tight break-all text-fg underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent sm:text-4xl"
          >
            {profile.email}
          </a>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
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
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} {site.profile.name}
        </p>
        <p>{site.footer}</p>
      </Container>
    </footer>
  );
}
