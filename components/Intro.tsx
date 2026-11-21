import { hues, site, ui } from "@/content/site";
import { Section, hueStyle } from "./ui";

/** Splits the headline so the accent phrase renders in the display serif. */
function Headline({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
  if (!accent || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-gradient font-display font-normal">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

export function Intro() {
  const { profile } = site;
  return (
    <section aria-labelledby="intro-heading" className="pt-2 pb-12 lg:pt-0">
      <h1
        id="intro-heading"
        className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
      >
        <Headline text={profile.headline} accent={profile.headlineAccent} />
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{profile.sub}</p>
    </section>
  );
}

export function Glance() {
  const { stats } = site.profile;
  return (
    <Section id="glance" title={ui.sections.glance} className="pt-0">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={hueStyle(hues[i % hues.length])}
            className={`card tint reveal flex flex-col justify-between rounded-2xl p-5 ${
              s.wide ? "col-span-2" : ""
            }`}
          >
            <dt className="order-2 mt-3 text-sm leading-snug text-muted">{s.label}</dt>
            <dd className="order-1 font-display text-5xl leading-none tracking-tight text-[var(--c)] sm:text-6xl">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Principles() {
  return (
    <Section id="principles" title={ui.sections.principles}>
      <ol className="grid gap-3 sm:grid-cols-2">
        {site.principles.map((p, i) => (
          <li
            key={p.title}
            style={hueStyle(hues[(i + 2) % hues.length])}
            className="card tint reveal rounded-2xl p-6"
          >
            <p className="font-mono text-xs font-semibold text-[var(--c)]">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-[var(--c)]">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Story() {
  const { profile } = site;
  const facts = [
    { label: ui.basedIn, value: profile.basedIn },
    { label: ui.background, value: profile.background },
    { label: ui.education, value: profile.education },
    { label: ui.languages, value: profile.languages.join(" · ") },
  ];
  return (
    <Section id="story" title={ui.sections.story}>
      <div className="reveal space-y-5 text-lg leading-relaxed text-pretty">
        {profile.story.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
      <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="font-mono text-xs tracking-wider text-muted uppercase">{f.label}</dt>
            <dd className="mt-1.5">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
