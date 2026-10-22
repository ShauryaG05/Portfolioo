# Design Document — Shaurya Gupta Portfolio

## Overview

A three-tier app: a React SPA on Vercel talks to a stateless Express API on Railway over HTTPS/JSON. MongoDB holds structured content; Firebase Storage holds binary assets (images, resume). The owner authenticates with Google OAuth 2.0; the API verifies the identity token and issues its own short-lived JWT in `httpOnly` cookies. Public pages are read-only and cache-friendly; all writes live behind auth + authorization. Priorities: small reviewable modules, security by default, fast first paint.

## System Architecture

### Component Map

| ID | Name | Type | Responsibility | Interfaces With |
|---|---|---|---|---|
| COMP-1 | Public Site (React) | Frontend | Hero, projects, skills, timeline, contact, theme | COMP-3 |
| COMP-2 | Admin Panel (React, `/admin`) | Frontend | Login, content CRUD, uploads, message inbox | COMP-3 |
| COMP-3 | API (Express) | Backend | Routing, validation, authN/authZ, business logic | COMP-4, 5, 6, 7 |
| COMP-4 | Auth Module | Backend module | Verify Google token, allowlist, issue/refresh JWT | Google, COMP-3 |
| COMP-5 | MongoDB | Database | Content + messages persistence | COMP-3 |
| COMP-6 | Firebase Storage | Storage | Images and resume PDF | COMP-3 |
| COMP-7 | Email Notifier | Service adapter | Notify owner on new message | external provider |
| COMP-8 | CI/CD | DevOps | Lint, typecheck, test, deploy | GitHub, Vercel, Railway |

### Architecture Diagram

```
        Visitor                         Owner
           │                              │
           ▼                              ▼
 ┌───────────────────── Vercel ─────────────────────┐
 │  COMP-1 Public Site        COMP-2 Admin Panel    │
 │  (React+Shadcn+Tailwind)   (protected routes)    │
 └───────────────────────┬──────────────────────────┘
                         │ HTTPS / JSON (CORS allowlist)
                         ▼
 ┌───────────────────── Railway ────────────────────┐
 │  COMP-3 Express API                               │
 │  helmet → cors → rate-limit → validate → authN    │
 │         → authZ → controller → service → repo     │
 │  COMP-4 Auth     COMP-7 Email adapter             │
 └──────┬──────────────────┬─────────────────┬──────┘
        ▼                  ▼                 ▼
   COMP-5 MongoDB   COMP-6 Firebase    Google OAuth /
   (content, msgs)  Storage (assets)   Email provider
```

## Data Flow Specifications

### 1. Public page load
```
1. Visitor → COMP-1: opens /projects
2. COMP-1 → COMP-3: GET /api/projects?published=true (public endpoint)
3. COMP-3 → COMP-5: query published projects, projection (no admin fields)
4. COMP-3 → COMP-1: JSON + Cache-Control: public, max-age=60
```

### 2. Owner sign-in
```
1. Owner → COMP-2: clicks "Sign in with Google"
2. COMP-2 → Google: OAuth 2.0 consent → returns ID token
3. COMP-2 → COMP-3: POST /api/auth/google { idToken }
4. COMP-4: verifies signature/audience, checks email ∈ ADMIN_EMAILS
5. COMP-3 → COMP-2: Set-Cookie access (15m) + refresh (7d), httpOnly/Secure
```

### 3. Create project with image
```
1. COMP-2 → COMP-3: POST /api/uploads (multipart, cookie auth)
2. COMP-3: authN → authZ(admin) → validate type/size
3. COMP-3 → COMP-6: store file; returns public URL
4. COMP-2 → COMP-3: POST /api/projects { ..., imageUrl }
5. COMP-3 → COMP-5: insert document; respond 201
```

### 4. Contact submission
```
1. Visitor → COMP-1: submits form
2. COMP-1 → COMP-3: POST /api/contact (public, rate-limited)
3. COMP-3: schema validate, honeypot check
4. COMP-3 → COMP-5: insert message
5. COMP-3 → COMP-7: send notification (failure logged, does not fail request)
```

## Integration Points

| Source | Target | Protocol | Format | Purpose |
|---|---|---|---|---|
| Frontends | API | HTTPS/REST | JSON | All data |
| API | MongoDB | Driver | BSON | Persistence |
| API | Firebase Storage | firebase-admin SDK | Binary | Assets |
| Admin Panel | Google | OAuth 2.0 | ID token | Sign-in |
| API | Email provider | HTTPS/SMTP | JSON | Notifications |

**Error handling:** Storage/email failures degrade gracefully (message still saved; upload returns 502 with retry hint). DB outage → 503 + `/health` fails so Railway restarts.

## API Contract

`P` = public, `A` = auth + admin authorization required.

| Method | Path | Access | Purpose |
|---|---|---|---|
| GET | `/health` | P | Health check |
| GET | `/api/profile` | P | Profile/bio |
| GET | `/api/projects`, `/api/projects/:slug` | P | Published projects |
| GET | `/api/skills`, `/api/experience`, `/api/education` | P | Public lists |
| GET | `/api/resume` | P | Current resume URL |
| POST | `/api/contact` | P (rate-limited) | Send message |
| POST | `/api/auth/google` | P | Exchange Google token for session |
| POST | `/api/auth/refresh`, `/api/auth/logout` | cookie | Rotate / clear session |
| PUT | `/api/profile` | A | Update profile |
| POST/PUT/DELETE | `/api/projects`, `/api/skills`, `/api/experience`, `/api/education` | A | CRUD |
| POST | `/api/uploads` | A | Upload asset |
| GET/PATCH/DELETE | `/api/messages` | A | Inbox |

Error shape: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": { "email": "Invalid" } } }`

## Data Models (MongoDB)

```
Profile    { name, headline, bio, avatarUrl, resumeUrl, links{github,linkedin,email}, updatedAt }
Project    { _id, slug (unique), title, summary, description(md), tags[], stack[],
             images[], liveUrl?, repoUrl?, published, order, createdAt, updatedAt }
Skill      { _id, name, category, level('learning'|'comfortable'|'strong'), order }
Experience { _id, role, org, start, end?, highlights[], order }
Education  { _id, school, degree, start, end?, notes? }
Message    { _id, name, email, body, read, createdAt, ipHash }
```
Indexes: `Project.slug` unique, `Project(published, order)`, `Message(createdAt)`.

## Frontend Structure

```
src/
  components/ui/      # Shadcn primitives
  components/         # Section components (Hero, ProjectCard, Timeline…)
  pages/              # Home, ProjectDetail, admin/*
  lib/api.ts          # typed fetch wrapper (credentials: 'include')
  hooks/              # useProjects, useAuth, useTheme
```
State: TanStack Query would be ideal for caching, but is a **new dependency** → needs your approval. Fallback: plain hooks + `fetch`.

## Error Handling

- **Validation:** schema errors → 400 with field map.
- **AuthN/AuthZ:** 401 (no/expired token), 403 (not allowlisted).
- **Abuse:** 429 with `Retry-After`.
- **Unexpected:** central error middleware logs server-side, returns generic 500.
- **Frontend:** error boundary per route, skeleton loaders, static fallbacks for hero.

## Testing Strategy

- **Unit:** validators, services, auth token logic (target ≥80% on API).
- **Integration:** every endpoint — happy path, invalid input, unauthenticated, unauthorized (per CLAUDE.md rule), using an in-memory/test Mongo.
- **Frontend:** component tests for forms/filters; one E2E smoke (home → project → contact) if Playwright is approved.
- **Gate:** `npm run lint && npm run typecheck && npm test` in CI on every PR.

## Deployment

**Vercel (frontend):** `VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`
**Railway (API):** health check `/health`, auto-deploy from `main`

`.env.example` (API):
```
NODE_ENV=production
PORT=
MONGODB_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
GOOGLE_CLIENT_ID=
ADMIN_EMAILS=            # comma-separated allowlist
CORS_ORIGIN=             # Vercel URL(s)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_STORAGE_BUCKET=
EMAIL_PROVIDER_KEY=      # pending decision
```

## Performance Targets

- API p95 read latency < 200ms; contact POST < 500ms
- LCP < 2.5s, CLS < 0.1, initial JS < 200 KB gzip (route-level code splitting, lazy images)

## Security Considerations

- Google ID token verified server-side; allowlist enforced; tokens in `httpOnly` cookies with CSRF mitigation (`SameSite=Lax` + origin check on writes).
- Helmet, strict CORS, body-size limits, rate limiting on contact and auth.
- Uploads: MIME + size check, randomized filenames, no executable types.
- Secrets only via env; `.env` git-ignored; dependency audit in CI.

## Decisions Needing Your Input

1. **Migrations vs MongoDB.** CLAUDE.md says `npx prisma migrate dev`, but Prisma does not support `migrate` for MongoDB (it uses `prisma db push`, which creates no migration files). That conflicts with the "every DB change goes through a migration file" rule. Options: (a) Prisma + `db push` for schema plus versioned seed/data scripts, (b) `migrate-mongo` (new dependency) for real migration files, (c) Mongoose with `migrate-mongo`. I recommend **(b) with Mongoose or the native driver**, but this is your call. I'll log it in `/docs/decisions/`.
2. **Role of Firebase.** I've assumed Storage only. Say so if you want Firebase Auth or Firestore involved.
3. **Public vs "every endpoint needs auth".** Public GETs and the contact form can't require auth. I've assumed they're explicitly marked public and still validated and tested.

## Hero Portrait Effect (REQ-14)

**Reference analysis (from the supplied screen recording):** warm orange gradient background; giant word ("CREATIVE") behind a cut-out portrait so the head overlaps the letters; a cyber-mask with red glowing circuitry over the lower face; the head pose and mask visibility change as the cursor moves; glass-style stat cards and a pill CTA sit above everything.

**Layer stack (z-order, back to front):**
```
1. Gradient background (CSS)
2. Giant background word (HTML text)
3. Portrait cut-out (transparent WebP) — pose chosen by cursor X/Y
4. Mask/circuit overlay (transparent WebP, blend-mode: screen) — opacity/glow driven by cursor distance
5. UI: nav, headline, stat cards (glass: backdrop-filter blur)
```

**Approach:** CSS/JS only, no new dependency. Pre-render ~5–9 head poses (left/center/right × up/down) as WebP; swap or cross-fade by pointer position via `requestAnimationFrame`. Mask overlay is one transparent layer whose glow follows a CSS variable (`--mx`, `--my`). Fallback: single static portrait. Optional later: Framer Motion (needs approval).

**Asset pipeline (owner-supplied photos → stylized portrait):**
1. Owner provides 5–9 well-lit photos at different head angles (plain background, same distance/lighting).
2. Background removal → transparent PNG.
3. Colour-grade to match the orange palette; optional stylization/mask compositing in an image editor.
4. Export WebP/AVIF at 1x/2x; store in Firebase Storage or `/client/public/hero/`.

**Risk:** the mask/circuit look must be created with design tools or an image generator the owner chooses; consistency across poses is the hard part. Mitigation: start with one pose + parallax (MVP), add the frame sequence later.
