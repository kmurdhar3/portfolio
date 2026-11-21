import Image from "next/image";
import { site, ui } from "@/content/site";
import { Container, ExternalLink } from "./ui";

export function Hero() {
  const { profile } = site;
  const linkedin = profile.links.find((l) => l.kind === "linkedin");
  const github = profile.links.find((l) => l.kind === "github");

  return (
    <section id="top" aria-labelledby="hero-heading" className="pt-14 pb-10 sm:pt-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14">
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.18em] text-accent uppercase">
              {profile.eyebrow}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
              {profile.sub}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {profile.badgeLine}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#products"
                className="inline-flex items-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-strong"
              >
                {ui.ctaProducts}
              </a>
              {linkedin && <ExternalLink link={linkedin} />}
              {github && <ExternalLink link={github} />}
            </div>
          </div>
          <div className="order-first md:order-none">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={720}
              height={720}
              preload
              sizes="(min-width: 768px) 288px, 128px"
              className="h-32 w-32 rounded-2xl border border-line object-cover md:h-72 md:w-72"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
