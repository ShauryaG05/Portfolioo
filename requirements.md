# Requirements Document — Shaurya Gupta Portfolio

## Introduction

An interactive, single-owner portfolio website for Shaurya Gupta, a student and full-stack (backend-leaning) developer with interests in AI/ML and Web3. Visitors (recruiters, collaborators, peers) browse his work publicly; only the owner can sign in to manage content. Stack is fixed per CLAUDE.md: React + Shadcn + Tailwind, Node/Express, MongoDB + Firebase, OAuth 2.0 + JWT, Vercel (frontend) + Railway (backend).

## Glossary

- **Visitor**: Unauthenticated person viewing the public site.
- **Owner/Admin**: Shaurya, the only authenticated user.
- **Project**: A showcased piece of work (title, description, tags, links, images).
- **Content item**: Any owner-managed record: project, skill, experience, education, profile.
- **Asset**: Image or PDF stored in Firebase Storage.
- **Public endpoint**: API route intentionally open to unauthenticated callers (explicitly marked and tested).

## Scope

| Must have (MVP) | Nice to have (post-MVP) | Out of scope |
|---|---|---|
| Hero/About, Projects, Skills, Experience/Education, Contact, Resume, Admin login + content management, SEO, responsive + dark mode | AI "ask about me" chat widget, Blog, Web3 wallet-connect demo, Analytics | Multi-user accounts, comments, payments, i18n |

## Requirements

### REQ-1 Hero and About
**User Story:** As a visitor, I want a clear intro to who Shaurya is, so that I understand his focus within seconds.

1. WHEN the home page loads, THE site SHALL display name, role headline, short bio, and links (GitHub, LinkedIn, email).
2. THE site SHALL render the hero content within 2.5s Largest Contentful Paint on a simulated 4G connection.
3. IF profile data fails to load, THEN THE site SHALL show a static fallback hero rather than an error page.

### REQ-2 Projects showcase
**User Story:** As a visitor, I want to browse projects and filter by technology, so that I can find relevant work.

1. THE site SHALL list published projects with title, summary, tags, thumbnail, and live/source links.
2. WHEN a visitor selects a tag (e.g. AI, Web3, Backend), THE site SHALL show only matching projects within 200ms (client-side).
3. WHEN a visitor opens a project, THE site SHALL show a detail view with full description, images, and tech stack.
4. THE site SHALL NOT show unpublished (draft) projects to visitors.

### REQ-3 Skills
**User Story:** As a visitor, I want to see Shaurya's skills grouped by area, so that I can judge fit quickly.

1. THE site SHALL group skills by category (Backend, Frontend, AI/ML, Web3, Tools).
2. THE site SHALL display each skill with a level label (Learning / Comfortable / Strong) rather than a fake percentage.

### REQ-4 Experience and Education
**User Story:** As a recruiter, I want a timeline of experience and education, so that I can see his background.

1. THE site SHALL render entries in reverse-chronological order with title, organization, dates, and highlights.

### REQ-5 Contact form
**User Story:** As a visitor, I want to send Shaurya a message, so that I can reach him without leaving the site.

1. WHEN a visitor submits name, email, and message, THE API SHALL validate them (email format, message 10–2000 chars) and persist the message.
2. IF validation fails, THEN THE API SHALL return HTTP 400 with per-field errors and THE form SHALL display them inline.
3. THE API SHALL rate-limit submissions to 5 per IP per hour and return HTTP 429 beyond that.
4. WHERE a honeypot field is filled, THE API SHALL silently discard the submission.
5. WHEN a message is saved, THE system SHALL notify the owner by email (provider to be approved — see Open Questions).

### REQ-6 Resume download
**User Story:** As a recruiter, I want to download a resume PDF, so that I can share it internally.

1. WHEN a visitor clicks "Resume", THE site SHALL serve the current PDF from Firebase Storage.
2. WHEN the owner uploads a new resume, THE site SHALL serve the new file with no redeploy.

### REQ-7 Owner authentication
**User Story:** As the owner, I want to sign in securely, so that only I can change site content.

1. WHEN the owner signs in with Google (OAuth 2.0), THE API SHALL verify the identity token and compare the email against an allowlist in an environment variable.
2. IF the email is not on the allowlist, THEN THE API SHALL return HTTP 403 and issue no token.
3. THE API SHALL issue a JWT access token (≤15 min) and refresh token in `httpOnly`, `Secure`, `SameSite` cookies.
4. WHEN a token is expired or invalid, THE API SHALL return HTTP 401.

### REQ-8 Content management
**User Story:** As the owner, I want an admin area to create, edit, publish, and delete content, so that I never edit code or the database by hand.

1. THE admin UI SHALL provide create/read/update/delete for projects, skills, experience, education, and profile.
2. WHEN the owner toggles a project's published state, THE public site SHALL reflect it within 60s.
3. WHEN the owner uploads an image (≤5 MB, jpg/png/webp), THE API SHALL store it in Firebase Storage and save its URL on the record.
4. IF an upload exceeds limits or has a disallowed type, THEN THE API SHALL reject it with HTTP 400/413.
5. THE admin UI SHALL list received contact messages and allow marking them read or deleting them.

### REQ-9 Responsive design and theming
**User Story:** As a visitor on any device, I want a layout that fits my screen, so that the site is comfortable to read.

1. THE site SHALL be usable from 320px to 1920px widths without horizontal scrolling.
2. THE site SHALL support light and dark themes, defaulting to the OS preference and remembering the choice.

### REQ-10 Performance, SEO, accessibility
**User Story:** As the owner, I want the site to rank and load well, so that it reflects my engineering quality.

1. THE site SHALL score ≥90 on Lighthouse Performance, Accessibility, Best Practices, and SEO (mobile).
2. THE site SHALL provide per-page titles, meta descriptions, Open Graph tags, `sitemap.xml`, and `robots.txt`.
3. THE site SHALL meet WCAG 2.1 AA contrast and be fully keyboard navigable.

### REQ-11 Security and operations
**User Story:** As the owner, I want the system hardened by default, so that a public site doesn't become a liability.

1. THE repo SHALL contain no secrets; all are env vars documented in `.env.example`.
2. THE API SHALL use Helmet headers, a strict CORS allowlist (Vercel domain only), and request body size limits.
3. EVERY write endpoint SHALL require authentication AND authorization; read endpoints open to visitors SHALL be explicitly marked public.
4. THE API SHALL validate every input with a schema and never return stack traces in production.
5. THE API SHALL expose `GET /health` for Railway health checks.

### REQ-12 (Nice-to-have) AI "ask about me" widget
**User Story:** As a visitor, I want to ask questions about Shaurya's work, so that I get answers conversationally.

1. WHEN a visitor sends a question, THE API SHALL answer using only portfolio content as context.
2. THE API SHALL rate-limit the endpoint and cap tokens per request to control cost.
3. IF the model service is unavailable, THEN THE widget SHALL show a friendly fallback.

### REQ-13 (Nice-to-have) Blog
**User Story:** As the owner, I want to publish short posts about AI/Web3 learning, so that I show depth of understanding.

1. THE system SHALL support markdown posts with title, slug, tags, and draft/published state.

### REQ-14 Signature hero: interactive portrait (from user reference video)
**User Story:** As a visitor, I want a striking hero where a stylized portrait of Shaurya reacts to my cursor, so that the site feels memorable and shows his creative/technical range.

1. THE hero SHALL render a cut-out portrait layered in front of oversized background text (a headline word behind the head) and behind foreground UI (nav, copy, stat cards).
2. WHEN the pointer moves over the hero, THE portrait SHALL respond (head-turn via pre-rendered frame sequence or parallax) and a cyber-mask/circuit overlay SHALL glow or reveal near the cursor.
3. IF the device has no hover pointer (touch) or `prefers-reduced-motion` is set, THEN THE hero SHALL show a static portrait with a gentle idle animation at most.
4. THE hero assets SHALL total ≤ 600 KB on mobile (WebP/AVIF, lazy-loaded frames) and SHALL NOT reduce Lighthouse Performance below 90.
5. THE portrait SHALL be based on photos supplied by the owner; no third-party face assets SHALL be used.
