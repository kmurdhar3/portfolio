import Image from "next/image";
import { nav, site, ui } from "@/content/site";
import { ActiveNav } from "./ActiveNav";
import { LinkIcon } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Profile column. On large screens it stays fixed while the right side scrolls,
 * so founders always see who you are and how to reach you. On phones it is the page intro.
 */
export function Sidebar() {
  const { profile } = site;
  const email = profile.links.find((l) => l.kind === "email");
  const socials = profile.links.filter((l) => l.kind !== "email");

  return (
    <div id="top" className="pt-10 pb-6 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-12 short:lg:py-7">
      <div>
        <div className="flex flex-col items-start gap-4">
          {/* Multicolour ring around the photo. */}
          <span className="rainbow rounded-[26px] p-[3px]">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={720}
            height={720}
            preload
            sizes="128px"
            className="block h-32 w-32 rounded-[23px] bg-bg object-cover"
          />
          </span>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 font-mono text-[11px] text-muted">
            <span className="live-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {profile.status}
          </p>
        </div>

        <p className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl short:lg:mt-4 short:lg:text-4xl">{profile.name}</p>
        <p className="mt-2 font-mono text-xs tracking-[0.16em] text-accent uppercase">{profile.role}</p>
        <p className="mt-4 max-w-xs leading-relaxed text-muted">{profile.intro}</p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {email && (
            <a
              href={email.href}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-strong"
            >
              <LinkIcon kind="email" />
              {ui.ctaEmail}
            </a>
          )}
          <a
            href="#products"
            className="inline-flex items-center rounded-lg border border-line bg-surface/80 px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {ui.ctaProducts}
          </a>
        </div>

        <div className="mt-10 hidden lg:block short:mt-6">
          <ActiveNav items={nav} label={ui.navLabel} />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-1">
        {socials.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${l.label} (opens in a new tab)`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
          >
            <LinkIcon kind={l.kind} className="h-5 w-5" />
          </a>
        ))}
        {/* Phones get the theme toggle in the top bar instead. */}
        <span className="mx-2 hidden h-5 w-px bg-line lg:block" aria-hidden="true" />
        <span className="hidden lg:inline-flex">
          <ThemeToggle label={ui.themeToggle} />
        </span>
      </div>
    </div>
  );
}
