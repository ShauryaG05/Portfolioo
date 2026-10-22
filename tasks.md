# Implementation Plan — Shaurya Gupta Portfolio

Conventions (from CLAUDE.md): one feature per branch, small PRs, every endpoint ships with validation + auth check + authorization check + tests, run `npm run lint && npm run typecheck && npm test` before marking done, ask before adding any dependency, no secrets in git.

Estimated total for MVP: ~55–70 hours. Phases 0–6 are MVP; Phase 7 is optional.

- [x] **0. Decisions and approvals (blocking)**
  - [x] 0.1 Resolve migration tooling vs MongoDB (see design.md)
    - Record outcome in `/docs/decisions/001-migrations.md`
    - _Requirements: REQ-11_
  - [x] 0.2 Approve dependency list
    - Frontend: react-router, (optional) TanStack Query, react-hook-form + zod, lucide-react
    - Backend: express, helmet, cors, express-rate-limit, zod, jsonwebtoken, cookie-parser, firebase-admin, multer, mongoose/driver, vitest/jest + supertest
    - _Dependencies: none_
  - [x] 0.3 Decide email provider for notifications and confirm Firebase scope
    - _Requirements: REQ-5_

- [ ] **1. Infrastructure setup** (~5h)
  - [x] 1.1 Repo structure: `/client`, `/server`, `/docs/decisions`
    - Root scripts so `npm run dev|test|lint|typecheck` work from the root
    - _Requirements: REQ-11_ · _Dependencies: Phase 0_
  - [x] 1.2 Tooling: TypeScript, ESLint, Prettier, git hooks
  - [x] 1.3 `.env.example` files, `.gitignore`, secret hygiene check
    - _Requirements: REQ-11.1_
  - [ ] 1.4 CI workflow (lint, typecheck, test on PR)
    - _Dependencies: 1.2_
  - [ ] 1.5 Provision MongoDB, Firebase project/bucket, Google OAuth client, Vercel and Railway projects
    - _Dependencies: 1.1_

- [ ] **2. Backend foundation and data layer** (~8h)
  - [ ] 2.1 Express app skeleton: helmet, CORS allowlist, body limits, central error handler, `/health`
    - _Requirements: REQ-11.2, 11.4, 11.5_ · _Dependencies: 1.1_
  - [ ] 2.2 Validation middleware (zod) and standard error shape
    - _Requirements: REQ-11.4_
  - [ ] 2.3 Mongo connection + models + indexes via migration files
    - _Requirements: REQ-2, 3, 4, 5, 8_ · _Dependencies: 0.1, 1.5_
  - [ ] 2.4 Seed script with sample content for local dev
    - _Dependencies: 2.3_

- [ ] **3. Auth and authorization** (~7h)
  - [ ] 3.1 `POST /api/auth/google`: verify token, allowlist, issue JWT cookies
    - Tests: valid owner, non-allowlisted (403), bad token (401)
    - _Requirements: REQ-7.1–7.3_ · _Dependencies: 2.1, 2.2_
  - [ ] 3.2 Refresh and logout endpoints with rotation
    - _Requirements: REQ-7.3, 7.4_
  - [ ] 3.3 `requireAuth` + `requireAdmin` middleware, plus a test that fails if any write route lacks them
    - _Requirements: REQ-11.3_ · _Dependencies: 3.1_
  - [ ] 3.4 CSRF mitigation (SameSite + origin check on writes)
    - _Requirements: REQ-11_

- [ ] **4. Content API** (~10h)
  - [ ] 4.1 Public read endpoints: profile, projects (+slug), skills, experience, education
    - Draft projects never leak
    - _Requirements: REQ-1–4_ · _Dependencies: 2.3_
  - [ ] 4.2 Admin CRUD endpoints for all content types
    - Each: validation, authN, authZ, unit + integration tests
    - _Requirements: REQ-8.1, 8.2_ · _Dependencies: 3.3_
  - [ ] 4.3 Upload endpoint → Firebase Storage (type/size checks)
    - _Requirements: REQ-6, REQ-8.3, 8.4_ · _Dependencies: 3.3_
  - [ ] 4.4 Contact endpoint: validation, honeypot, rate limit, persist, notify
    - _Requirements: REQ-5_ · _Dependencies: 2.3, 0.3_
  - [ ] 4.5 Messages admin endpoints (list, mark read, delete)
    - _Requirements: REQ-8.5_

- [ ] **5. Frontend public site** (~16h)
  - [x] 5.1 Vite + React + Tailwind + Shadcn setup, design tokens, theme toggle
    - _Requirements: REQ-9_ · _Dependencies: 1.1_
  - [x] 5.2 App shell: navbar, footer, routing, error boundary, skeletons
  - [ ] 5.3 API client + hooks with typed responses
    - _Dependencies: 4.1_
  - [x] 5.4 Hero/About section with static fallback
    - _Requirements: REQ-1_
  - [x] 5.5 Projects grid, tag filters, detail page
    - _Requirements: REQ-2_
  - [x] 5.6 Skills and Experience/Education sections
    - _Requirements: REQ-3, REQ-4_
  - [x] 5.7 Contact form with inline errors and success state
    - _Requirements: REQ-5_ · _Dependencies: 4.4_
  - [x] 5.8 Resume download button
    - _Requirements: REQ-6_
  - [x] 5.9 Responsive pass (320–1920px) and accessibility pass
    - _Requirements: REQ-9, REQ-10.3_

- [x] **5A. Signature hero portrait** (~10h, after 5.1; assets owner-supplied)
  - [x] 5A.1 Collect owner photos (5–9 angles) and agree the stylization/mask look
    - _Requirements: REQ-14.5_ · _Dependencies: none (start early, it blocks the final look)_
  - [x] 5A.2 Asset prep: background removal, colour grade, WebP/AVIF export, size budget check
    - _Requirements: REQ-14.4_ · _Dependencies: 5A.1_
  - [x] 5A.3 Layered hero build: gradient, background word, portrait, UI cards (static version first)
    - _Requirements: REQ-14.1_ · _Dependencies: 5.1, 5A.2_
  - [x] 5A.4 Pointer-driven pose swap/parallax + mask glow overlay
    - _Requirements: REQ-14.2_ · _Dependencies: 5A.3_
  - [x] 5A.5 Touch / reduced-motion fallback and Lighthouse check
    - _Requirements: REQ-14.3, 14.4, REQ-10.1_ · _Dependencies: 5A.4_

- [ ] **6. Admin panel, SEO, and launch** (~14h)
  - [ ] 6.1 Login page + protected route guard + session refresh handling
    - _Requirements: REQ-7_ · _Dependencies: 3.1_
  - [ ] 6.2 Content management screens (projects, skills, experience, education, profile)
    - _Requirements: REQ-8_ · _Dependencies: 4.2_
  - [ ] 6.3 Image/resume upload UI
    - _Requirements: REQ-8.3_ · _Dependencies: 4.3_
  - [ ] 6.4 Messages inbox UI
    - _Requirements: REQ-8.5_
  - [ ] 6.5 SEO: meta tags, Open Graph, sitemap, robots
    - _Requirements: REQ-10.2_
  - [ ] 6.6 Performance pass: code splitting, image optimization, Lighthouse ≥90
    - _Requirements: REQ-10.1_
  - [ ] 6.7 Deploy: Railway API + Vercel frontend, env vars, custom domain, HTTPS check
    - _Requirements: REQ-11_ · _Dependencies: 6.1–6.6_
  - [ ] 6.8 README + decision log + deployment guide
  - [ ] 6.9 Final QA checklist: security headers, rate limits, no secrets in history, all tests green

- [ ] **7. Post-MVP (optional, each on its own branch)**
  - [ ] 7.1 AI "ask about me" widget (needs new dependency/API key approval; rate-limited)
    - _Requirements: REQ-12_
  - [ ] 7.2 Markdown blog
    - _Requirements: REQ-13_
  - [ ] 7.3 Web3 wallet-connect demo section
  - [ ] 7.4 Privacy-friendly analytics

## Dependency Graph (summary)

```
0 → 1 → 2 → 3 ──┬→ 4 ──┬→ 6
          │     │      │
          └─────┘      │
        1 → 5 ─────────┘   (5.3+ needs 4.1; 5.7 needs 4.4)
```

## Suggested Milestones

| Milestone | Done when |
|---|---|
| M1 Foundation | Phases 0–2 complete; API runs locally against Mongo with seed data |
| M2 Secure API | Phases 3–4 complete; all endpoints tested including auth failures |
| M3 Public site live (staging) | Phase 5 complete; Lighthouse ≥ 85 |
| M4 Launch | Phase 6 complete; Lighthouse ≥ 90; deployed on custom domain |
