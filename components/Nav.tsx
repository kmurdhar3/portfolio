import { nav, site, ui } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./ui";

export function Nav() {
  const { profile } = site;
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/85 backdrop-blur-md lg:hidden">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-semibold tracking-tight text-fg hover:text-accent">
          {profile.name}
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle label={ui.themeToggle} />
        </div>
      </Container>
      {/* Mobile section links: horizontal scroll strip, no JS menu needed. */}
      <nav aria-label="Sections" className="border-t border-line/70 md:hidden">
        <ul className="flex gap-5 overflow-x-auto px-4 py-2.5 sm:px-6 text-sm whitespace-nowrap text-muted">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-fg">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
