import { site } from "@/content/site";
import { Container } from "./ui";

export function Stats() {
  return (
    <Container>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
        {site.profile.stats.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-5">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="block text-3xl font-semibold tracking-tight">{s.value}</span>
              <span className="mt-1 block text-sm text-muted" aria-hidden="true">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
