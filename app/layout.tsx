import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import { themeInitScript } from "@/components/ThemeToggle";
import "./globals.css";

// latin-ext too: it carries "₹" (JobMatchApply pricing). Preloading it avoids a late
// font load that would repaint the headline and slow down mobile LCP.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif for headline accents and big numbers. Upright only: a single preloaded file,
// so the headline isn't held back waiting for a late-discovered italic font.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

const { profile } = site;
const title = `${profile.name} — Founder-engineer`;
const description = `${profile.headline} ${profile.sub}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  authors: [{ name: profile.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@kmurdhar",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
