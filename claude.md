# Build: Personal portfolio website — Kamlesh Murdhariya

Paste this whole file into Claude Code (or save as `CLAUDE.md` in an empty project folder) and say: "Build the site described in CLAUDE.md."

---

## 1. Goal

A one-page (plus optional project detail pages) self-introduction site that answers in 10 seconds:
**Who is Kamlesh?** → Senior data engineer / tech lead in banking by day, solo AI product builder by night, with real shipped products.

Audiences (in priority order):
1. Recruiters / hiring managers for relocation roles (Poland, Dubai, Europe) — need credibility: years, banks, stack, leadership.
2. Investors / founders — need proof of shipping: live products, Product Hunt launches, users.
3. Developers / Product Hunt / Reddit community — need demos and links.

## 2. Tech requirements

- Next.js (App Router) + TypeScript + Tailwind CSS. Static export friendly. Deploy target: Vercel.
- All content in one file: `content/site.ts` (typed data — profile, experience, projects, links). No hardcoded text in components.
- Fully responsive, mobile-first. Light + dark mode (respect system preference, toggle in nav).
- Lighthouse 95+ on all four scores. No heavy animation libraries; subtle CSS transitions only.
- SEO: proper `<title>`, meta description, Open Graph image (generate a simple OG card), `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema.
- YouTube videos: use a lite/facade embed (thumbnail + play button, load iframe on click) for speed.
- Accessible: semantic HTML, alt text, keyboard nav, AA contrast.

## 3. Design direction

- Clean, confident, engineer-built feel. Not a template look.
- Neutral base (off-white / near-black) with one accent color. Suggest deep green (ties to TapVoice brand) — keep it tweakable as a single CSS variable.
- Typography: one sans for UI (Inter or Geist), one mono for small labels/tags (JetBrains Mono / Geist Mono).
- Project cards with: logo/screenshot, name, one-liner, status badge (Live / Launched on Product Hunt / Building / Open source), stack tags, link buttons.
- Placeholders for screenshots in `public/projects/<slug>.png` — I'll drop real images in later.

## 4. Page structure (single page, anchored sections)

1. **Nav** — name, links: About · Experience · Products · Projects · Videos · Contact. Resume/CV download button (`/Kamlesh_Murdhariya_CV.pdf`, placeholder).
2. **Hero**
   - Eyebrow: "Senior Backend & Data Engineering Architect"
   - Headline: "I build backend and data systems for banks — and ship AI products on my own."
   - Sub: "Nearly 13 years with Java, Spring Boot, Spark and AWS across Crédit Agricole, FirstRand and Morningstar. Tech Lead for SSO and access-control services at Crédit Agricole. Founder and sole engineer of JobMatchApply and TapVoice — both launched on Product Hunt."
   - Badge line: "Mumbai · Open to remote and relocation · Immediate joiner"
   - CTAs: "See my products" (scroll) · "Download CV" · "LinkedIn" · "GitHub"
   - Stat row: 13 yrs (since 2013) · 7 companies · Led teams of 6–7 · 5 live products · 2 Product Hunt launches
3. **About** — short first-person paragraph (draft below, editable).
4. **Experience** — timeline.
5. **Featured products** — big cards for TapVoice and JobMatchApply (Product Hunt badges, demo video, live link).
6. **More projects** — grid of the rest, filterable by tag (Live / AI / Data / Tools / Open source).
7. **Videos** — YouTube demos grid.
8. **Skills / stack** — grouped chips.
9. **Contact** — email, LinkedIn, GitHub, X. Simple mailto, no form backend needed.
10. **Footer** — "Built with Next.js + Claude Code · Mumbai" + year.

## 5. Content

### Profile
- Name: Kamlesh Murdhariya
- Title: Senior Backend & Data Engineering Architect · Tech Lead at Crédit Agricole, Mumbai
- Location: Mumbai, India — open to remote and relocation (visa sponsorship required) · immediate joiner
- Looking for: staff/principal engineer, architect or hands-on tech lead roles in backend or data engineering
- Education: Master in Information Technology, University of Mumbai
- Languages: English (fluent), Hindi (native)
- Links:
  - LinkedIn: https://www.linkedin.com/in/kamlesh-murdhariya-833b71124/
  - GitHub: https://github.com/kmurdhar3 (also https://github.com/kmurdhar)
  - X: https://x.com/kmurdhar
  - Email: murdhariya.kamlesh2@gmail.com
  - Phone: do NOT show on the site (spam). Email + LinkedIn only.

### About (draft)
> I'm a hands-on backend and data engineering architect. Since December 2013 I've built backend systems, data platforms and identity tools for banking and financial services — Crédit Agricole, FirstRand, Morningstar — plus Accenture and Capgemini earlier on.
>
> Today I'm Tech Lead at Crédit Agricole, where my team of six builds and runs the internal authentication and authorization tools behind single sign-on for the bank's applications. Before that I led a team of seven as Chief Tech Lead at Remiges Technologies, rebuilding a legacy .NET stock-matching system as Java/Spring Boot microservices, and ran Spark pipelines on AWS for a South African client.
>
> Outside work, I build AI products end to end — idea, code, payments, launch. JobMatchApply (AI job matching for India) and TapVoice (voice dictation with screen-aware AI replies) are both live and launched on Product Hunt.

### Experience (from resume)
| Company | Role | Dates | Highlights |
|---|---|---|---|
| Crédit Agricole · Mumbai | Tech Lead | Jul 2025 – Present | Lead development, monitoring and maintenance of the bank's internal authentication/authorization tools powering SSO. Own feature design and delivery plus production support. Mentor 6 engineers; set coding, review and testing standards. Brought AI-assisted development into the team within enterprise code-quality controls. |
| JMM Infotech · South Africa (remote) | Data Engineer | Jan 2024 – Apr 2025 | Built and ran Spark pipelines on AWS for analytics and ML. Tuned jobs and clusters (partitioning, caching). Data-security controls across AWS; data governance and compliance. Planned and delegated team work. |
| Remiges Technologies · India | Chief Tech Lead | Mar 2023 – Jan 2024 | Designed target architecture for the whole product. Rebuilt legacy .NET stock-matching app as Java/Spring Boot microservices. Led 7 engineers (dev, QA, frontend). Set up dev/UAT/prod; ETL and REST data APIs. |
| FirstRand Solutions · India | Data Engineer | Aug 2020 – Jul 2022 | Big-data ETL pipelines on distributed systems for structured and unstructured banking data; performance tuning; production support. |
| Morningstar · India | Big Data Engineer | Jan 2019 – Aug 2020 | Built a Hadoop cluster from scratch. Hive/MapReduce analysis of financial data with custom Hive UDFs. Sqoop imports from Oracle; shell automation. |
| Accenture · India | Software Developer | Jan 2017 – Dec 2018 | Java and RTI components, SOAP/REST services, Grafana dashboards, Oracle SQL, JUnit. |
| Capgemini · India | Software Developer | Dec 2013 – Dec 2016 | Java, Liferay, Hibernate modules; specs; server migrations; production fixes. |

> Optional "International work" line under the timeline: onsite in Łódź, Poland (Commerzbank, 2022) and South Africa (2024). `TODO: confirm wording` — the resume doesn't list Commerzbank, so keep this only if I approve.

### Skills
- **Languages:** Java (12+ yrs), SQL, Scala, Python, TypeScript, Shell, Rust (TapVoice)
- **Backend:** Spring Boot, Spring, Hibernate/JPA, REST & SOAP, microservices, distributed systems, system design
- **Identity & access:** SSO, authentication & authorization tooling
- **Data engineering:** Spark (batch + Structured Streaming), Kafka, Hadoop/HDFS, Hive, Sqoop, Airflow, dbt, ETL/ELT, data modelling, governance
- **Cloud & DevOps:** AWS (S3, EMR, Glue), Docker, Kubernetes, Helm, Terraform, Jenkins, GitHub Actions, Bamboo
- **Databases:** PostgreSQL, Oracle, MySQL, Hive, Supabase
- **AI / LLM:** Claude & OpenAI APIs, structured outputs, prompt caching, LLM cost controls, prompt-injection safeguards, Whisper
- **Observability:** Grafana, Splunk, Control-M, SonarQube
- **Product stack:** Next.js, React, Tailwind, Tauri, Vercel, Razorpay, Dodo Payments, Playwright

### Featured products

**1. TapVoice** — `status: Live · Launched on Product Hunt`
- One-liner: Voice dictation for your desktop — talk instead of type, with AI that reads your screen to draft replies.
- Detail: Hotkey-driven desktop app (a Wispr Flow alternative).
  - **F8** — dictation with smart formatting (filler removal, grammar, lists), self-correction ("no wait…"), multi-language + translate to English.
  - **F9** — ask anything out loud; answer typed at your cursor (Claude or Groq).
  - **F7** — hold over an email/post; reads what's on screen and drafts a grounded reply. Local-first memory with on-device embeddings, encrypted at rest.
  - Free, bring-your-own API key (Groq / Claude).
- Stack: Tauri v2 (Rust + TypeScript), Whisper large-v3 via Groq, Claude/OpenAI, SQLite. Windows and Linux.
- Links: Site https://tapvoice.vercel.app/ · Product Hunt https://www.producthunt.com/products/tapvoice/launches/tapvoice
- Videos: F8 demo https://www.youtube.com/watch?v=ov8rF0m3EhM · F7 demo https://www.youtube.com/watch?v=grSLJx5bZ1A · F9 demo `TODO_YT_F9` (hide if not provided)

**2. JobMatchApply** — `status: Live · Launched on Product Hunt (3 Nov 2026)`
- One-liner: Honest AI job matching for India — real jobs from company career pages, a fit score you can trust, applications you submit yourself.
- Detail:
  - Collects 9,700+ open jobs daily from 130+ companies' own career sites via 5 public ATS APIs (Greenhouse, Lever, Ashby, SmartRecruiters, Workable) — no reposts or agencies. Python worker on scheduled GitHub Actions with rate limiting, retries, incremental sync.
  - Rule-based classification of remote eligibility, visa sponsorship (with the employer's evidence sentence), language and 175 skills.
  - Claude fit score (0–100) and AI-drafted application answers: structured JSON, prompt caching (~55% cheaper per call), per-plan cost ceilings, prompt-injection safeguards.
  - Cover letters and tailored CVs written only from the user's resume, with an honesty check that strips anything not in it.
  - Plans: Free · Pro ₹199 · Apply Assist ₹499.
  - Engineering: Supabase Postgres with row-level security; Razorpay + Dodo with HMAC-verified webhooks; Playwright E2E in CI; nightly encrypted backups with restore drill; uptime monitoring.
- Stack: Next.js 16, React 19, TypeScript, Tailwind, shadcn/ui, Vercel (Mumbai), Supabase, Python, GitHub Actions.
- Role: founder and sole engineer, 2026.
- Links: https://www.jobmatchapply.in/ · Product Hunt https://www.producthunt.com/products/jobmatchapply/launches/jobmatchapply

### More projects
| Name | Status | One-liner | Links |
|---|---|---|---|
| AdLaunch AI | Live | 4-stage Meta ad generator: brand context → competitor discovery → Claude analysis → ad concepts. Multi-brand, billing, admin panel. | https://smart-ai-adrunner.vercel.app/ · https://github.com/kmurdhar3/ads-ai-main |
| ReviewsToWebsite | Live | Turns Google/Trustpilot reviews into AI-designed, embeddable website widgets in ~60 seconds. | https://reviewstowebsites.com |
| get-youtube-transcripts.io | Live | Transcript extraction for single videos and whole channels. | https://get-youtube-transcripts.io/ |
| InviteApp | Building | India-first digital invitations + RSVP tracking (Next.js, Supabase, Razorpay). | https://github.com/kmurdhar3/InviteApp |
| PointSpeak | Open source | Chrome extension + local server for Linux screen recording with annotation, Whisper transcription and Claude-generated context notes. | https://github.com/kmurdhar3/point-speak |
| DIS Print Monitoring | Internal tool | SNMP printer monitoring for my printer-rental business (FastAPI, React, Supabase). | — |
| IG Context Chat | Building | Scrape Instagram channels, analyse videos (Gemini/Whisper/Claude), chat with the content. | — |
| SpeakIt / VoiceIt | Shipped | AI voice-to-polished-text mobile app (React Native/Expo) with fully configurable tones, plus web version. | https://github.com/kmurdhar3/Voice · https://github.com/kmurdhar3/VoiceUI · https://github.com/kmurdhar3/VoiceIt_Web |
| LinkedIn Automation | Open source | Job-apply engine behind JobMatchApply: multi-role/multi-location search, Claude/Gemini/Ollama LLM scoring. | https://github.com/kmurdhar3/LinkedInAutomation |
| AI-Jobs | Repo | `TODO_ONE_LINER` | https://github.com/kmurdhar3/AI-Jobs |
| Funeral Accounting | Repo | `TODO_ONE_LINER` | https://github.com/kmurdhar3/Funeral-Accounting- |
| LinkInBio | Repo | `TODO_ONE_LINER` | https://github.com/kmurdhar3/LinkInBio |
| GUI Transcript | Repo | Desktop GUI for YouTube transcript extraction (`TODO verify`) | https://github.com/kmurdhar3/GUI-Transcript |
| BeautyAI Studio | Built | AI product-photo studio for beauty brands. `TODO verify one-liner` | `TODO_URL` |
| LocalRank.in | Shipped | `TODO_ONE_LINER` | `TODO_URL` |
| NAAGRIK | Concept | Open-source civic accountability platform for India — geo-stamped reports, AI severity scoring. | — |
| Hamraah | Building | Hinglish-first voice AI companion app for Android. | — |

> Claude Code task: I have ~23 public repos at https://github.com/kmurdhar3?tab=repositories. Run `gh repo list kmurdhar3 --limit 50 --json name,description,url,homepageUrl,primaryLanguage,updatedAt,isFork` and read each repo's README to fill the `TODO_ONE_LINER`s and add any missing repos to the "More projects" grid. Skip forks and duplicates (e.g. GUI-Transcript vs GUI_Transcript — keep one). Show me the final list before writing it into `content/site.ts`.

### Videos section
Grid of YouTube demos with title + 1-line caption:
- TapVoice F8 — Dictation with zero editing — https://www.youtube.com/watch?v=ov8rF0m3EhM
- TapVoice F9 — Ask anything, answer at your cursor — `TODO_YT_F9` (hide card if missing)
- TapVoice F7 — AI replies grounded in what's on your screen — https://www.youtube.com/watch?v=grSLJx5bZ1A
- YouTube channel: `TODO_YT_CHANNEL`

## 6. Build steps for Claude Code

1. Scaffold Next.js + Tailwind + TS; set up `content/site.ts` with types `Profile`, `Experience`, `Project`, `Video`.
2. Fill content from this brief; fetch repo data with `gh` as described above and confirm with me.
3. Build sections in order; keep components small (`Hero`, `Stats`, `About`, `Timeline`, `FeaturedProduct`, `ProjectGrid`, `VideoGrid`, `Skills`, `Contact`).
4. Add Product Hunt badges for TapVoice and JobMatchApply (use the official PH embed badge if available, else a styled link).
5. SEO + OG image + JSON-LD Person.
6. Run `npm run build` and fix all errors/warnings; run Lighthouse and report scores.
7. Give me the list of every remaining `TODO_` placeholder so I can fill them.

## 7. CV file
Copy my resume PDF to `public/Kamlesh_Murdhariya_CV.pdf` and wire the "Download CV" buttons to it.

## 8. Don'ts
- No fake testimonials, user counts or metrics beyond what's written here.
- No stock photos of people. Use my photo at `public/me.jpg` (placeholder until I add it).
- Don't expose any API keys, internal URLs, or employer-confidential details.