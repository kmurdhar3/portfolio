import { site, ui } from "@/content/site";
import { Section } from "./ui";

export function Timeline() {
  return (
    <Section id="experience" title={ui.sections.experience}>
      <ol className="relative space-y-10 border-l border-line">
        {site.experience.map((job, i) => (
          <li key={`${job.company}-${job.start}`} className="relative pl-8">
            <span
              aria-hidden="true"
              className={`absolute top-2 -left-[5px] h-[9px] w-[9px] rounded-full ring-4 ring-bg ${
                i === 0 ? "bg-accent" : "bg-muted/60"
              }`}
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-lg font-semibold">
                {job.role} <span className="font-normal text-muted">·</span> {job.company}
              </h3>
              <p className="shrink-0 font-mono text-xs text-muted">
                {job.start} – {job.end}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-muted">{job.location}</p>
            <ul className="mt-3 max-w-3xl list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed marker:text-line">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {site.internationalWork && (
        <p className="mt-10 text-sm text-muted">
          <span className="font-mono text-xs tracking-wider uppercase">{ui.internationalWork}:</span>{" "}
          {site.internationalWork}
        </p>
      )}
    </Section>
  );
}
