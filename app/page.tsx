import { cacheLife } from "next/cache";
import { site, ui } from "@/content/site";
import { Glance, Intro, Principles, Story } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Contact, Demos, Footer, Products } from "@/components/Sections";
import { Sidebar } from "@/components/Sidebar";
import { Spotlight } from "@/components/Spotlight";

function personJsonLd() {
  const { profile } = site;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: site.url,
    image: new URL(profile.photo, site.url).toString(),
    jobTitle: "Founder-engineer",
    description: profile.sub,
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    email: `mailto:${profile.email}`,
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

      <div className="page-backdrop" aria-hidden="true" />
      <Spotlight />

      {/* Phones and tablets: compact top bar. Large screens use the sidebar nav instead. */}
      <Nav />

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-10 lg:px-8 xl:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-14 xl:px-10">
        <Sidebar />
        <main id="main" className="min-w-0 lg:py-16">
          <Intro />
          <Glance />
          <Products />
          <Principles />
          <Story />
          <Demos />
          <Contact />
          <Footer year={year} />
        </main>
      </div>
    </>
  );
}
