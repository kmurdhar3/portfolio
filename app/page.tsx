import { cacheLife } from "next/cache";
import { site, ui } from "@/content/site";
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Contact, Footer, Products, Projects, Skills, Videos } from "@/components/Sections";
import { Stats } from "@/components/Stats";

function personJsonLd() {
  const { profile } = site;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    image: new URL(profile.photo, site.url).toString(),
    jobTitle: profile.eyebrow,
    worksFor: { "@type": "Organization", name: "Crédit Agricole" },
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Mumbai" },
    email: `mailto:${profile.email}`,
    knowsLanguage: ["en", "hi"],
    knowsAbout: site.skills.flatMap((g) => g.items).slice(0, 30),
    sameAs: profile.links.filter((l) => /^https?:/.test(l.href)).map((l) => l.href),
  };
}

export default async function Home() {
  "use cache";
  cacheLife("max");
  const year = new Date().getFullYear();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-accent-contrast focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {ui.skipLink}
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <About />
        <Products />
        <Projects />
        <Videos />
        <Skills />
        <Contact />
      </main>
      <Footer year={year} />
    </>
  );
}
