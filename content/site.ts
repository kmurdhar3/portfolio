// Single source of truth for all site copy. Components must not hardcode text.
// Content is filled in after the project list is approved (CLAUDE.md step 2).

export type LinkKind =
  | "site"
  | "github"
  | "producthunt"
  | "linkedin"
  | "x"
  | "email"
  | "youtube";

export interface Link {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  wide?: boolean; // spans two columns in the bento grid
}

export interface Profile {
  name: string;
  role: string; // short label under the name
  headline: string;
  headlineAccent: string; // part of the headline shown in the display serif
  sub: string;
  status: string; // what you're doing now, shown with a live dot
  intro: string; // one line under the name in the sidebar
  basedIn: string;
  background: string;
  education: string;
  languages: string[];
  email: string;
  photo: string; // path under /public
  links: Link[];
  stats: Stat[];
  story: string[]; // paragraphs
}

export interface Principle {
  title: string;
  body: string;
}

export type ProjectStatus =
  | "Live"
  | "Launched on Product Hunt"
  | "Building"
  | "Open source"
  | "Shipped"
  | "Internal tool"
  | "Concept";

export type ProjectTag = "Live" | "AI" | "Data" | "Tools" | "Open source";

export interface ProductFeature {
  title: string; // e.g. "F8 — Dictation"
  body: string;
}

export interface Screenshot {
  file: string; // file name inside /public/projects/, e.g. "tapvoice-2.webp"
  alt: string;
}

/** Palette colours defined in app/globals.css (both themes). */
export type Hue = "emerald" | "cyan" | "violet" | "amber" | "rose" | "sky";
export const hues: Hue[] = ["emerald", "cyan", "violet", "amber", "rose", "sky"];

export interface Project {
  color?: Hue; // card colour; defaults to emerald
  slug: string; // fallback image lives at /public/projects/<slug>.webp
  screenshots?: Screenshot[]; // opens in the full-screen viewer; 2+ adds arrows. Missing files are skipped
  name: string;
  oneLiner: string;
  statuses: ProjectStatus[];
  tags: ProjectTag[];
  stack: string[];
  links: Link[];
  featured?: boolean;
  role?: string;
  details?: string[];
  features?: ProductFeature[];
  videoIds?: string[]; // YouTube IDs
}

export interface Video {
  id: string; // YouTube video ID
  title: string;
  caption: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface SiteContent {
  url: string;
  profile: Profile;
  principles: Principle[];
  projects: Project[];
  videos: Video[];
  youtubeChannel?: string;
  skills: SkillGroup[];
  footer: string;
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const GITHUB = "https://github.com/kmurdhar3";

export const site: SiteContent = {
  // Live site address (used for SEO, Open Graph, sitemap). Change this if you add a custom domain.
  url: "https://portfolio-3oef.vercel.app",

  profile: {
    name: "Kamlesh Murdhariya",
    role: "Founder-engineer · Mumbai",
    headline: "I build AI products end to end — idea, code, payments, launch.",
    headlineAccent: "end to end",
    sub: "Founder and sole engineer of TapVoice and JobMatchApply, both launched on Product Hunt. Behind them: nearly 13 years building backend and data systems for banks and financial firms.",
    status: "Building my own startup",
    intro: "I ship AI products alone, with the engineering discipline of 13 years in banking.",
    basedIn: "Mumbai, India",
    background: "Nearly 13 years building backend, data and identity systems in banking and finance",
    education: "Master in Information Technology, University of Mumbai",
    languages: ["English (fluent)", "Hindi (native)"],
    email: "murdhariya.kamlesh3@gmail.com",
    photo: "/me.jpg",
    links: [
      {
        kind: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/kamlesh-murdhariya-833b71124/",
      },
      { kind: "github", label: "GitHub", href: GITHUB },
      { kind: "x", label: "X", href: "https://x.com/kmurdhar" },
      {
        kind: "email",
        label: "Email",
        href: "mailto:murdhariya.kamlesh3@gmail.com",
      },
    ],
    stats: [
      { value: "2", label: "Product Hunt launches — TapVoice and JobMatchApply", wide: true },
      { value: "LIVE_COUNT", label: "live products, built and run solo" },
      { value: "13 yrs", label: "engineering for banks and finance" },
      { value: "9,700+", label: "jobs JobMatchApply collects daily from 130+ companies" },
      { value: "6–7", label: "engineers led per team" },
    ],
    story: [
      "I'm an engineer who builds products end to end, on my own: the idea, the code, the payments and the launch. TapVoice and JobMatchApply are live and launched on Product Hunt, and AdLaunch AI, ReviewsToWebsite and get-youtube-transcripts.io are live too.",
      "My edge is nearly 13 years of building systems that can't fail. Since 2013 I've built backend platforms, data pipelines and the authentication and single sign-on tools that banks and financial firms run on — and led engineering teams of six and seven along the way.",
      "That's why my products ship with the unglamorous parts done properly: row-level security, HMAC-verified payment webhooks, end-to-end tests in CI, encrypted backups, LLM cost ceilings and prompt-injection safeguards.",
      "Now I'm building my own startup. If you're a founder or an investor and want to talk, email me — I reply to every message.",
    ],
  },

  principles: [
    {
      title: "End to end, alone",
      body: "Idea, code, payments, launch and support. No hand-offs, so I move from idea to live product fast.",
    },
    {
      title: "Bank-grade by default",
      body: "Row-level security, HMAC-verified webhooks, Playwright tests in CI, nightly encrypted backups with a restore drill.",
    },
    {
      title: "Honest AI",
      body: "JobMatchApply writes cover letters only from your own resume, and an honesty check strips anything that isn't in it.",
    },
    {
      title: "Cost-aware LLMs",
      body: "Structured outputs, prompt caching (~55% cheaper per call) and per-plan cost ceilings, so usage can't run away.",
    },
  ],

  projects: [
    {
      slug: "tapvoice",
      color: "emerald",
      screenshots: [
        {
          file: "tapvoice.webp",
          alt: "TapVoice settings: F8 and F9 hotkeys, Groq or Claude as the F9 answer provider, and model choice",
        },
        {
          file: "tapvoice-2.webp",
          alt: "TapVoice settings: smart formatting, editing commands and recording indicator toggles",
        },
        {
          file: "tapvoice-3.webp",
          alt: "TapVoice dashboard with weekly counts, the F8 transcripts list and F9 chat history",
        },
      ],
      featured: true,
      name: "TapVoice",
      oneLiner:
        "Voice dictation for your desktop — talk instead of type, with AI that reads your screen to draft replies.",
      statuses: ["Live", "Launched on Product Hunt"],
      tags: ["Live", "AI", "Tools"],
      role: "Founder and sole engineer",
      details: [
        "Hotkey-driven desktop app — a Wispr Flow alternative.",
        "Free, bring-your-own API key (Groq / Claude).",
      ],
      features: [
        {
          title: "F8 — Dictation",
          body: "Smart formatting (filler removal, grammar, lists), self-correction (“no wait…”), multi-language plus translate to English.",
        },
        {
          title: "F9 — Ask out loud",
          body: "Ask anything; the answer is typed at your cursor (Claude or Groq).",
        },
        {
          title: "F7 — Screen-aware replies",
          body: "Hold over an email or post; it reads what's on screen and drafts a grounded reply. Local-first memory with on-device embeddings, encrypted at rest.",
        },
      ],
      stack: [
        "Tauri v2",
        "Rust",
        "TypeScript",
        "Whisper large-v3 (Groq)",
        "Claude / OpenAI",
        "SQLite",
        "Windows & Linux",
      ],
      links: [
        { kind: "site", label: "Website", href: "https://tapvoice.vercel.app/" },
        {
          kind: "producthunt",
          label: "Product Hunt",
          href: "https://www.producthunt.com/products/tapvoice/launches/tapvoice",
        },
      ],
      videoIds: ["ov8rF0m3EhM", "grSLJx5bZ1A"],
    },
    {
      slug: "jobmatchapply",
      color: "cyan",
      screenshots: [
        {
          file: "jobmatchapply.webp",
          alt: "JobMatchApply home page: search for remote jobs or jobs abroad with visa sponsorship, with an example fit score of 78/100",
        },
        {
          file: "jobmatchapply-2.webp",
          alt: "JobMatchApply Find jobs page filtered to roles open to India, with filters for remote scope, seniority, experience and skills",
        },
        {
          file: "jobmatchapply-3.webp",
          alt: "JobMatchApply Find jobs page with the visa-sponsored filter on, showing roles abroad that offer sponsorship",
        },
        {
          file: "jobmatchapply-4.webp",
          alt: "JobMatchApply job page: role description with highlighted skills, an 'Is it worth applying?' score panel and Apply Assist",
        },
      ],
      featured: true,
      name: "JobMatchApply",
      oneLiner:
        "Honest AI job matching for India — real jobs from company career pages, a fit score you can trust, applications you submit yourself.",
      statuses: ["Live", "Launched on Product Hunt"],
      tags: ["Live", "AI", "Data"],
      role: "Founder and sole engineer, 2026 · Launched on Product Hunt 3 Nov 2026",
      details: [
        "Collects 9,700+ open jobs daily from 130+ companies' own career sites via 5 public ATS APIs (Greenhouse, Lever, Ashby, SmartRecruiters, Workable) — no reposts or agencies. Python worker on scheduled GitHub Actions with rate limiting, retries and incremental sync.",
        "Rule-based classification of remote eligibility, visa sponsorship (with the employer's evidence sentence), language and 175 skills.",
        "Claude fit score (0–100) and AI-drafted application answers: structured JSON, prompt caching (~55% cheaper per call), per-plan cost ceilings, prompt-injection safeguards.",
        "Cover letters and tailored CVs written only from the user's resume, with an honesty check that strips anything not in it.",
        "Plans: Free · Pro ₹199 · Apply Assist ₹499.",
        "Supabase Postgres with row-level security; Razorpay + Dodo with HMAC-verified webhooks; Playwright E2E in CI; nightly encrypted backups with restore drill; uptime monitoring.",
      ],
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind",
        "shadcn/ui",
        "Vercel (Mumbai)",
        "Supabase",
        "Python",
        "GitHub Actions",
      ],
      links: [
        { kind: "site", label: "Website", href: "https://www.jobmatchapply.in/" },
        {
          kind: "producthunt",
          label: "Product Hunt",
          href: "https://www.producthunt.com/products/jobmatchapply/launches/jobmatchapply",
        },
      ],
    },
    {
      slug: "reviewstowebsite",
      color: "amber",
      screenshots: [
        {
          file: "reviewstowebsite.webp",
          alt: "ReviewsToWebsites landing page: paste a Google Maps link and get a website built from your reviews in about 60 seconds",
        },
        {
          file: "reviewstowebsite-2.webp",
          alt: "ReviewToWebsite home page: 'Turn Google Reviews into a Website in 60 Seconds' with a Google Maps link field and Generate Free Website button",
        },
      ],
      name: "ReviewsToWebsite",
      oneLiner:
        "Paste a Google Maps link and get a website built from your customer reviews in about 60 seconds. Free, no account needed.",
      statuses: ["Live"],
      tags: ["Live", "AI"],
      stack: [],
      links: [{ kind: "site", label: "Live", href: "https://reviewstowebsites.com" }],
    },
    {
      slug: "get-youtube-transcripts",
      color: "rose",
      screenshots: [
        {
          file: "get-youtube-transcripts.webp",
          alt: "TranscriptX features: fast extraction, free use, AI summaries, any YouTube video, TXT/SRT/VTT/JSON export, clean output",
        },
      ],
      name: "get-youtube-transcripts.io",
      oneLiner: "Transcript extraction for single videos and whole channels.",
      statuses: ["Live"],
      tags: ["Live", "Tools"],
      stack: [],
      links: [
        { kind: "site", label: "Live", href: "https://get-youtube-transcripts.io/" },
      ],
    },
    {
      slug: "speakit",
      color: "emerald",
      screenshots: [
        {
          file: "speakit.webp",
          alt: "Speak It: the app's record screen. Just tap and talk, no typing needed",
        },
        {
          file: "speakit-2.webp",
          alt: "Perfect It: AI turns the original recording into three polished versions, such as Professional and Casual",
        },
        {
          file: "speakit-3.webp",
          alt: "Share It: copy, share or save any version in one tap",
        },
        {
          file: "speakit-4.webp",
          alt: "Save as Note: the Notes screen with saved ideas grouped by day",
        },
        {
          file: "speakit-5.webp",
          alt: "Make It Yours: settings to pick the language and customise the AI rewrite prompts",
        },
        {
          file: "speakit-6.webp",
          alt: "Never Lose a Thought: the History screen, where every recording is auto-saved and searchable",
        },
      ],
      name: "SpeakIt / VoiceIt",
      oneLiner:
        "AI voice-to-polished-text mobile app with fully configurable tones, plus a web version.",
      statuses: ["Shipped"],
      tags: ["AI", "Open source"],
      stack: ["React Native", "Expo", "TypeScript"],
      links: [
        { kind: "github", label: "Mobile", href: `${GITHUB}/VoiceUI` },
        { kind: "github", label: "Web", href: `${GITHUB}/VoiceIt_Web` },
      ],
    },
    {
      slug: "adlaunch-ai",
      color: "violet",
      screenshots: [
        {
          file: "adlaunch-ai.webp",
          alt: "AdLaunch AI landing page: find the Facebook and Instagram ads competitors already spend on and generate new concepts from them",
        },
        {
          file: "adlaunch-ai-2.webp",
          alt: "AdLaunch AI 4-step pipeline: brand context, find competitors, what is working (Claude analysis), create ads",
        },
      ],
      name: "AdLaunch AI",
      oneLiner:
        "Meta ad generator: competitor discovery → Claude pattern analysis → scored ad concepts. Multi-brand, billing, admin panel, Supabase row-level security.",
      statuses: ["Live"],
      tags: ["Live", "AI"],
      stack: ["Next.js", "TypeScript", "Supabase", "Claude"],
      links: [
        { kind: "site", label: "Live", href: "https://smart-ai-adrunner.vercel.app/" },
        { kind: "github", label: "GitHub", href: `${GITHUB}/ads-ai-main` },
      ],
    },
    {
      slug: "funeral-accounting",
      color: "sky",
      screenshots: [
        {
          file: "funeral-accounting.webp",
          alt: "Funeral Accounting dashboard with demo data: monthly payment grid per member, arrears status and fund balance",
        },
        {
          file: "funeral-accounting-2.webp",
          alt: "Funeral Accounting payments page with demo data: record a payment and the recent payments list",
        },
      ],
      name: "Funeral Accounting",
      oneLiner:
        "Members-and-payments portal for a community funeral society: the admin sets fees and records payments, members see a shared dashboard.",
      statuses: ["Live"],
      tags: ["Live", "Tools"],
      stack: ["Node.js", "JavaScript"],
      links: [
        { kind: "site", label: "Live", href: "https://funeral-accounting.vercel.app" },
        { kind: "github", label: "GitHub", href: `${GITHUB}/Funeral-Accounting-` },
      ],
    },
    {
      slug: "inviteapp",
      color: "amber",
      screenshots: [
        {
          file: "inviteapp.webp",
          alt: "InviteApp home page: digital invitations for Indian weddings and celebrations, shared as one WhatsApp-ready link",
        },
        {
          file: "inviteapp-2.webp",
          alt: "InviteApp 8-step builder, step 1: pick the event type, with a live phone preview of the invitation",
        },
        {
          file: "inviteapp-3.webp",
          alt: "InviteApp template gallery: free and premium designs such as Marigold & Mango Leaf and Royal Maroon Gold",
        },
      ],
      name: "InviteApp",
      oneLiner: "India-first digital invitations and RSVP tracking.",
      statuses: ["Building"],
      tags: ["Tools"],
      stack: ["Next.js", "Supabase", "Razorpay"],
      links: [],
    },
    // TODO_ONE_LINER + TODO_URL: LocalRank.in stays hidden until you add both.
    // {
    //   slug: "localrank",
    //   name: "LocalRank.in",
    //   oneLiner: "TODO_ONE_LINER",
    //   statuses: ["Shipped"],
    //   tags: ["Live"],
    //   stack: [],
    //   links: [{ kind: "site", label: "Live", href: "TODO_URL" }],
    // },
  ],

  videos: [
    { id: "ov8rF0m3EhM", title: "TapVoice F8", caption: "Dictation with zero editing." },
    // TODO_YT_F9: add { id, title: "TapVoice F9", caption: "Ask anything, answer at your cursor." }
    {
      id: "grSLJx5bZ1A",
      title: "TapVoice F7",
      caption: "AI replies grounded in what's on your screen.",
    },
  ],
  // TODO_YT_CHANNEL: add your YouTube channel URL here.
  youtubeChannel: undefined,

  skills: [
    {
      name: "Languages",
      items: ["Java (12+ yrs)", "SQL", "Scala", "Python", "TypeScript", "Shell", "Rust"],
    },
    {
      name: "Backend",
      items: [
        "Spring Boot",
        "Spring",
        "Hibernate/JPA",
        "REST & SOAP",
        "Microservices",
        "Distributed systems",
        "System design",
      ],
    },
    { name: "Identity & access", items: ["SSO", "Authentication & authorization tooling"] },
    {
      name: "Data engineering",
      items: [
        "Spark (batch + Structured Streaming)",
        "Kafka",
        "Hadoop/HDFS",
        "Hive",
        "Sqoop",
        "Airflow",
        "dbt",
        "ETL/ELT",
        "Data modelling",
        "Governance",
      ],
    },
    {
      name: "Cloud & DevOps",
      items: [
        "AWS (S3, EMR, Glue)",
        "Docker",
        "Kubernetes",
        "Helm",
        "Terraform",
        "Jenkins",
        "GitHub Actions",
        "Bamboo",
      ],
    },
    { name: "Databases", items: ["PostgreSQL", "Oracle", "MySQL", "Hive", "Supabase"] },
    {
      name: "AI / LLM",
      items: [
        "Claude & OpenAI APIs",
        "Structured outputs",
        "Prompt caching",
        "LLM cost controls",
        "Prompt-injection safeguards",
        "Whisper",
      ],
    },
    { name: "Observability", items: ["Grafana", "Splunk", "Control-M", "SonarQube"] },
    {
      name: "Product stack",
      items: [
        "Next.js",
        "React",
        "Tailwind",
        "Tauri",
        "Vercel",
        "Razorpay",
        "Dodo Payments",
        "Playwright",
      ],
    },
  ],

  footer: "Built with Next.js + Claude Code · Mumbai",
};

export const nav = [
  { href: "#products", label: "Products" },
  { href: "#principles", label: "How I build" },
  { href: "#story", label: "Story" },
  { href: "#demos", label: "Demos" },
  { href: "#contact", label: "Contact" },
] as const;

// Small UI strings, kept here so components contain no copy.
export const ui = {
  ctaProducts: "See what I've shipped",
  ctaEmail: "Email me",
  themeToggle: "Toggle dark mode",
  skipLink: "Skip to content",
  navLabel: "Sections",
  sections: {
    glance: "At a glance",
    products: "Products",
    moreProducts: "More I've built",
    principles: "How I build",
    story: "Story",
    demos: "Demos",
    skills: "Stack",
    contact: "Contact",
  },
  contactTitle: "Building something? Let's talk.",
  contactLead: "Founders, investors, or anyone curious about what I'm building — email is the fastest way to reach me.",
  filterAll: "All",
  filterLabel: "Filter projects by tag",
  playVideo: "Play video",
  basedIn: "Based in",
  background: "Background",
  education: "Education",
  languages: "Languages",
  demoVideos: "Demo videos",
  youtubeChannel: "YouTube channel",
  role: "Role",
  engineeringDetails: "Engineering details",
  noImage: "Screenshot coming soon",
  gallery: {
    previous: "Previous screenshot",
    next: "Next screenshot",
    show: "Show screenshot",
    slide: "Screenshot",
    of: "of",
    open: "View full screen",
    close: "Close",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    hint: "Click to zoom · ← → to browse · Esc to close",
  },
} as const;

// Keep the "live products" stat in sync with the project list.
const liveStat = site.profile.stats.find((s) => s.value === "LIVE_COUNT");
if (liveStat) liveStat.value = String(site.projects.filter((p) => p.statuses.includes("Live")).length);
