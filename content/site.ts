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
}

export interface Profile {
  name: string;
  eyebrow: string;
  headline: string;
  sub: string;
  badgeLine: string;
  title: string;
  location: string;
  lookingFor: string;
  education: string;
  languages: string[];
  email: string;
  photo: string; // path under /public
  links: Link[];
  stats: Stat[];
  about: string[]; // paragraphs
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  start: string; // e.g. "Jul 2025"
  end: string; // "Present" for current role
  highlights: string[];
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
  file: string; // file name inside /public/projects/, e.g. "tapvoice-2.png"
  alt: string;
}

export interface Project {
  slug: string; // image lives at /public/projects/<slug>.png
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
  experience: Experience[];
  internationalWork?: string;
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
  // TODO_SITE_URL: replace with the final domain once deployed (used for SEO, OG, sitemap).
  url: "https://kamlesh-murdhariya.vercel.app",

  profile: {
    name: "Kamlesh Murdhariya",
    eyebrow: "Senior Backend & Data Engineering Architect",
    headline:
      "I build backend and data systems for banks — and ship AI products on my own.",
    sub: "Nearly 13 years with Java, Spring Boot, Spark and AWS across Crédit Agricole, FirstRand and Morningstar. Tech Lead for SSO and access-control services at Crédit Agricole. Founder and sole engineer of JobMatchApply and TapVoice — both launched on Product Hunt.",
    badgeLine: "Mumbai · Open to remote and relocation · Immediate joiner",
    title:
      "Senior Backend & Data Engineering Architect · Tech Lead at Crédit Agricole, Mumbai",
    location:
      "Mumbai, India — open to remote and relocation (visa sponsorship required) · immediate joiner",
    lookingFor:
      "Staff/principal engineer, architect or hands-on tech lead roles in backend or data engineering.",
    education: "Master in Information Technology, University of Mumbai",
    languages: ["English (fluent)", "Hindi (native)"],
    email: "murdhariya.kamlesh2@gmail.com",
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
        href: "mailto:murdhariya.kamlesh2@gmail.com",
      },
    ],
    stats: [
      { value: "13 yrs", label: "in engineering, since 2013" },
      { value: "7", label: "companies" },
      { value: "6–7", label: "engineers led per team" },
      { value: "5", label: "live products" },
      { value: "2", label: "Product Hunt launches" },
    ],
    about: [
      "I'm a hands-on backend and data engineering architect. Since December 2013 I've built backend systems, data platforms and identity tools for banking and financial services — Crédit Agricole, FirstRand, Morningstar — plus Accenture and Capgemini earlier on.",
      "Today I'm Tech Lead at Crédit Agricole, where my team of six builds and runs the internal authentication and authorization tools behind single sign-on for the bank's applications. Before that I led a team of seven as Chief Tech Lead at Remiges Technologies, rebuilding a legacy .NET stock-matching system as Java/Spring Boot microservices, and ran Spark pipelines on AWS for a South African client.",
      "Outside work, I build AI products end to end — idea, code, payments, launch. JobMatchApply (AI job matching for India) and TapVoice (voice dictation with screen-aware AI replies) are both live and launched on Product Hunt.",
    ],
  },

  experience: [
    {
      company: "Crédit Agricole",
      location: "Mumbai",
      role: "Tech Lead",
      start: "Jul 2025",
      end: "Present",
      highlights: [
        "Lead development, monitoring and maintenance of the bank's internal authentication and authorization tools powering SSO.",
        "Own feature design and delivery plus production support.",
        "Mentor 6 engineers; set coding, review and testing standards.",
        "Brought AI-assisted development into the team within enterprise code-quality controls.",
      ],
    },
    {
      company: "JMM Infotech",
      location: "South Africa (remote)",
      role: "Data Engineer",
      start: "Jan 2024",
      end: "Apr 2025",
      highlights: [
        "Built and ran Spark pipelines on AWS for analytics and ML.",
        "Tuned jobs and clusters (partitioning, caching).",
        "Data-security controls across AWS; data governance and compliance.",
        "Planned and delegated team work.",
      ],
    },
    {
      company: "Remiges Technologies",
      location: "India",
      role: "Chief Tech Lead",
      start: "Mar 2023",
      end: "Jan 2024",
      highlights: [
        "Designed the target architecture for the whole product.",
        "Rebuilt a legacy .NET stock-matching app as Java/Spring Boot microservices.",
        "Led 7 engineers across dev, QA and frontend.",
        "Set up dev/UAT/prod environments; ETL and REST data APIs.",
      ],
    },
    {
      company: "FirstRand Solutions",
      location: "India",
      role: "Data Engineer",
      start: "Aug 2020",
      end: "Jul 2022",
      highlights: [
        "Big-data ETL pipelines on distributed systems for structured and unstructured banking data.",
        "Performance tuning and production support.",
      ],
    },
    {
      company: "Morningstar",
      location: "India",
      role: "Big Data Engineer",
      start: "Jan 2019",
      end: "Aug 2020",
      highlights: [
        "Built a Hadoop cluster from scratch.",
        "Hive/MapReduce analysis of financial data with custom Hive UDFs.",
        "Sqoop imports from Oracle; shell automation.",
      ],
    },
    {
      company: "Accenture",
      location: "India",
      role: "Software Developer",
      start: "Jan 2017",
      end: "Dec 2018",
      highlights: [
        "Java and RTI components, SOAP/REST services, Grafana dashboards, Oracle SQL, JUnit.",
      ],
    },
    {
      company: "Capgemini",
      location: "India",
      role: "Software Developer",
      start: "Dec 2013",
      end: "Dec 2016",
      highlights: [
        "Java, Liferay and Hibernate modules; specs; server migrations; production fixes.",
      ],
    },
  ],

  // TODO_INTERNATIONAL_WORK: uncomment only after you approve the wording.
  // internationalWork: "Onsite in Łódź, Poland (Commerzbank, 2022) and South Africa (2024).",

  projects: [
    {
      slug: "tapvoice",
      screenshots: [
        {
          file: "tapvoice.png",
          alt: "TapVoice settings: F8 and F9 hotkeys, Groq or Claude as the F9 answer provider, and model choice",
        },
        {
          file: "tapvoice-2.png",
          alt: "TapVoice settings: smart formatting, editing commands and recording indicator toggles",
        },
        {
          file: "tapvoice-3.png",
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
      screenshots: [
        {
          file: "jobmatchapply.png",
          alt: "JobMatchApply home page: search for remote jobs or jobs abroad with visa sponsorship, with an example fit score of 78/100",
        },
        {
          file: "jobmatchapply-2.png",
          alt: "JobMatchApply Find jobs page filtered to roles open to India, with filters for remote scope, seniority, experience and skills",
        },
        {
          file: "jobmatchapply-3.png",
          alt: "JobMatchApply Find jobs page with the visa-sponsored filter on, showing roles abroad that offer sponsorship",
        },
        {
          file: "jobmatchapply-4.png",
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
      slug: "adlaunch-ai",
      screenshots: [
        {
          file: "adlaunch-ai.png",
          alt: "AdLaunch AI landing page: find the Facebook and Instagram ads competitors already spend on and generate new concepts from them",
        },
        {
          file: "adlaunch-ai-2.png",
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
      slug: "reviewstowebsite",
      screenshots: [
        {
          file: "reviewstowebsite.png",
          alt: "ReviewsToWebsites landing page: paste a Google Maps link and get a website built from your reviews in about 60 seconds",
        },
        {
          file: "reviewstowebsite-2.png",
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
      screenshots: [
        {
          file: "get-youtube-transcripts.png",
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
      slug: "funeral-accounting",
      screenshots: [
        {
          file: "funeral-accounting.png",
          alt: "Funeral Accounting dashboard with demo data: monthly payment grid per member, arrears status and fund balance",
        },
        {
          file: "funeral-accounting-2.png",
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
      screenshots: [
        {
          file: "inviteapp.png",
          alt: "InviteApp home page: digital invitations for Indian weddings and celebrations, shared as one WhatsApp-ready link",
        },
        {
          file: "inviteapp-2.png",
          alt: "InviteApp 8-step builder, step 1: pick the event type, with a live phone preview of the invitation",
        },
        {
          file: "inviteapp-3.png",
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
    {
      slug: "speakit",
      screenshots: [
        {
          file: "speakit.png",
          alt: "Speak It: the app's record screen. Just tap and talk, no typing needed",
        },
        {
          file: "speakit-2.png",
          alt: "Perfect It: AI turns the original recording into three polished versions, such as Professional and Casual",
        },
        {
          file: "speakit-3.png",
          alt: "Share It: copy, share or save any version in one tap",
        },
        {
          file: "speakit-4.png",
          alt: "Save as Note: the Notes screen with saved ideas grouped by day",
        },
        {
          file: "speakit-5.png",
          alt: "Make It Yours: settings to pick the language and customise the AI rewrite prompts",
        },
        {
          file: "speakit-6.png",
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
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#projects", label: "Projects" },
  { href: "#videos", label: "Videos" },
  { href: "#contact", label: "Contact" },
] as const;

// Small UI strings, kept here so components contain no copy.
export const ui = {
  ctaProducts: "See my products",
  themeToggle: "Toggle dark mode",
  skipLink: "Skip to content",
  sections: {
    about: "About",
    experience: "Experience",
    products: "Featured products",
    projects: "More projects",
    videos: "Videos",
    skills: "Skills & stack",
    contact: "Contact",
  },
  contactLead: "Email or LinkedIn is the fastest way to reach me.",
  filterAll: "All",
  filterLabel: "Filter projects by tag",
  playVideo: "Play video",
  lookingFor: "Looking for",
  education: "Education",
  languages: "Languages",
  internationalWork: "International work",
  demoVideos: "Demo videos",
  youtubeChannel: "YouTube channel",
  role: "Role",
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
