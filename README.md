# Shaurya Gupta — Portfolio

A single-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, and a small isolated Three.js scene.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify or build

```bash
npm run typecheck
npm run lint
npm run build
npm run start
```

## Edit approved content

Update [`data/portfolio.ts`](./data/portfolio.ts) to change the name, role titles, project names and links, categorized technology list, experience, or contact links. Project visuals are abstract CSS compositions and are not represented as authentic screenshots.

The role titles, employer spelling, experience description, and technology names are preserved as supplied. Technology headings use the requested spelling `Data bases`; `stack`, `SkitLearn`, and `Rest API` remain unchanged and unconfirmed. `MD5` is listed separately under Security.

## Portrait artwork

The hero uses `public/images/shaurya-halftone-portrait.webp`, a gold halftone portrait illustration derived from the supplied photograph. The Experience section uses `public/images/shaurya-halftone-cartoon.webp` as a separate supporting character. The original photograph remains unchanged and is not included in the site's public image folder. Image paths, alt text, and dimensions are set in `data/portfolio.ts`. The Three.js orbit is a compact detail beside Selected Work and loads only as it approaches the viewport.

## Production URL and metadata

Set `NEXT_PUBLIC_SITE_URL` to the final site origin before deployment. See `.env.example`. Page title, description, and robots rules are available by default. A canonical URL, absolute sitemap entry, and Open Graph/Twitter image using the generated portrait are enabled once the production origin is configured; no real domain is prefilled.

## Project structure

- `app/` — App Router page, layout, global styles, metadata routes, and error/loading states.
- `components/` — navigation, portfolio sections, custom cursor, portrait scroll treatment, and deferred Three.js interaction.
- `data/portfolio.ts` — centralized owner-authorized content.
- `public/images/` — derived artwork; the current `shaurya-halftone-*` portrait and cartoon pair are used by the page.


