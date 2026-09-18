# Nate Martinez Portfolio

Personal portfolio site for my infrastructure, homelab, Linux, Docker, and web development work.

## Overview

This repository is preparing the v0.2.0 portfolio release. The goal of this project is to create a clean, fast, and maintainable home for my projects, write-ups, and technical growth over time.

This site is built with:

- Svelte 5 and SvelteKit 2 with Vite 8
- TypeScript 6
- Tailwind CSS v4 (CSS-first `@theme` configuration)
- Custom CSS variables for theming
- Cloudflare Workers with `@sveltejs/adapter-cloudflare` and local Wrangler v4
- Node.js 24 LTS and npm for development/tooling
- Playwright Chromium tests, ESLint, and Prettier

## Status

Preparing: `v0.2.0` — the completed visual redesign and tooling/pipeline foundation.
The package version is 0.2.0; this does not create a release or tag.

`v0.1.0` established the earlier public portfolio structure. The final resume and
production-content review remain part of the future v1.0.0 milestone.

## Features

- Responsive homepage
- Dark and light theme support based on system preference
- Data-driven featured project section showcasing Bun Burner
- Skills section
- Contact links
- Resume download
- Custom 404 with repeat-visit messages and storage-failure handling
- Reduced-motion support and atmospheric backgrounds

## Roadmap

### v0.2.0

- Visual redesign, responsive layouts, system-based themes, and custom 404
- Bun Burner featured project and resume download
- Node 24/npm tooling, reproducible checks, and CI/pipeline foundation

### v0.3.0

- Open Graph/social preview image and metadata/SEO
- Theme-toggle polish and accessibility pass
- Optional lightweight analytics

### v0.4.0

- Additional project/case study and richer project presentation
- Possible project/skill filtering

### v1.0.0

- Final resume and finalized production content
- Final accessibility, performance, SEO, and deployment hardening
- Stable public portfolio release

## Development

Use Node.js 24 LTS (`.nvmrc`; `nvm use` if you use nvm) and npm.

Install the locked dependencies:

```bash
npm ci
```

Start the dev server:

```bash
npm run dev
```

## Build for production:

```bash
npm run build
```

## Validation and preview

```bash
npm run lint
npm run check
npm run build
npm run check
npx playwright install chromium
npm run test
```

`npm run preview` serves the existing production build at `http://127.0.0.1:8787`;
run `npm run build` first. `npm test` builds once, then Playwright starts this
Worker preview without rebuilding or reusing another server. The existing tests
cover homepage rendering, project/contact actions, resume download, single-project
controls, custom 404 behavior, and unavailable localStorage. There are no unit tests.

Chromium installation is explicit and uses Playwright's versioned browser, not a
global browser. After installing or upgrading Playwright, run:

```bash
npx playwright install chromium
```

On supported Linux CI runners, install browser system dependencies too:

```bash
npx playwright install --with-deps chromium
```

`npm run validate` runs lint, check, build/E2E, and another check after the build.
`npm run format` formats files; `npm run check:watch` watches source diagnostics.

### Cloudflare environment types

`npm run cf-typegen` runs before development, builds, checks, and during install.
It derives an ignored bindings-only config from `wrangler.jsonc`, omitting only
its compiled `main` entrypoint, and generates `Env` into `.wrangler/types/`.
The deployment config itself is unchanged. `src/app.d.ts` imports this `Env`;
the adapter supplies the other platform fields.

The generator uses Wrangler's `experimental_generateTypes` API with runtime globals
excluded and imports the current `Fetcher` binding type from
`@cloudflare/workers-types`. Worker types stay module-scoped, avoiding conflicts
with browser DOM types. If new binding kinds are added, add their type imports to
`scripts/cf-typegen.mjs`. Review this experimental API when upgrading Wrangler.

Previously Wrangler generated a `GlobalProps.mainModule` import when the built
Worker existed. That import pulled compiled JavaScript into application checking,
even through exclusions. The bindings-only config removes that dependency at its
source; checking does not delete build output or use `skipLibCheck`.

## Deployment

This site uses Cloudflare Workers Builds, `@sveltejs/adapter-cloudflare`, and
`wrangler.jsonc`. Production deploys from `main`; other branches upload preview
versions. The Worker name, domain, runtime compatibility settings, assets, and
observability are preserved.

The added GitHub Actions workflow is configured to validate pull requests to `main`,
pushes to `main` and `chore/tooling-cleanup`, and manual runs once published. It uses Node 24, `npm ci`, Chromium with
Linux dependencies, and `npm run validate`. It does not deploy or need Cloudflare
credentials. Require the `validate` check in branch protection if desired.

### Workers Builds settings to apply with the npm migration

The existing dashboard triggers still use `bun run build`. Coordinate these changes
when publishing the npm migration; they have not been applied by this local pass:

- Node: 24 via `.nvmrc` (remove/update any conflicting `NODE_VERSION` override).
- Build variable: `SKIP_DEPENDENCY_INSTALL=1`, so the explicit `npm ci` is authoritative.
- Build command, on both production and preview triggers:
  `npm ci && npx playwright install --with-deps chromium && npm run validate`
- Keep production branch `main` and deploy command `npx wrangler deploy`.
- Keep other-branch preview command `npx wrangler versions upload`.

This makes validation a prerequisite in the same Cloudflare build before either
upload/deploy command. A separate GitHub check alone does not gate Workers Builds.
Confirm the first hosted run, including browser OS-dependency installation, before
considering the remote pipeline verified. See the
[Workers Builds image/settings reference](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/).

For an intentional manual deployment after browser installation and Cloudflare
authentication, `npm run deploy` runs the full validation first, then the local
Wrangler deploy command. No deployment is performed by installation or validation.

## Project structure

- `src/routes/+page.svelte`: homepage and skills
- `src/lib/data/projects.ts`: featured project data, including Bun Burner
- `src/lib/components/`: atmosphere and featured project rendering
- `src/routes/+error.svelte`: custom 404 and repeat-visit messages
- `src/app.css` and `src/routes/layout.css`: visual system and Tailwind entrypoint
- `static/`: fonts, optimized backgrounds, favicon, and downloadable resume
- `tests/`: homepage and 404 browser tests
- `scripts/cf-typegen.mjs`: generated application binding types
- `.github/workflows/validate.yml`: validation pipeline

## Purpose

This portfolio is part of my broader transition into infrastructure, systems administration, DevOps, SRE, and modern web engineering. It is designed to grow alongside my projects and document real hands-on work over time.
