import { site, ui } from "@/content/site";
import { Section } from "./ui";

export function About() {
  const { profile } = site;
  const facts = [
    { label: ui.lookingFor, value: profile.lookingFor },
    { label: ui.education, value: profile.education },
    { label: ui.languages, value: profile.languages.join(" · ") },
  ];
  return (
    <Section id="about" title={ui.sections.about}>
      <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-5 text-lg leading-relaxed text-pretty">
          {profile.about.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <dl className="space-y-6 border-l border-line pl-6">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="font-mono text-xs tracking-wider text-muted uppercase">{f.label}</dt>
              <dd className="mt-1.5">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
