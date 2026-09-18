# Nate Martinez Portfolio

Personal portfolio for software quality, systems support, practical automation, and developer tooling.

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

Preparing: `v0.2.0` — the completed visual redesign, branding/social metadata,
and tooling/pipeline foundation.
The package version is 0.2.0; this does not create a release or tag.

`v0.1.0` established the earlier public portfolio structure. The current resume is
available to download; final resume/content review remains part of v1.0.0.

## Features

- Responsive homepage
- Dark and light theme support based on system preference
- Data-driven featured project section showcasing Bun Burner
- Skills section
- Contact links
- Resume download
- Portfolio branding, favicon/touch-icon assets, and Open Graph/Twitter social preview
- Custom 404 with repeat-visit messages and storage-failure handling
- Reduced-motion support and atmospheric backgrounds

## Roadmap

### v0.2.0

- Visual redesign, responsive layouts, system-based themes, and custom 404
- Bun Burner featured project and resume download
- Branding, favicon assets, social metadata, and Open Graph preview image
- Node 24/npm tooling, reproducible checks, and CI/pipeline foundation

### v0.3.0

- Further metadata/SEO and social-preview verification
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

Install Playwright's versioned Chromium after dependency installation or a
Playwright upgrade, then run the full local gate:

```bash
npx playwright install chromium
npm run validate
```

On supported Linux CI runners, use `npx playwright install --with-deps chromium`
to install the browser and its system dependencies. A globally installed browser
is not required.

| Command                | Intended use                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| `npm run format`       | Intentionally fix formatting with Prettier write mode.                          |
| `npm run format:check` | Verify formatting without fixing files.                                         |
| `npm run lint`         | Verify formatting, then run ESLint without fixes.                               |
| `npm run check`        | Generate bindings and run Svelte/TypeScript checks.                             |
| `npm run check:watch`  | Watch Svelte/TypeScript diagnostics.                                            |
| `npm run build`        | Generate bindings and build the production Worker.                              |
| `npm run test`         | Build once, then run Playwright against the Worker preview.                     |
| `npm run validate`     | Run lint (including formatting), check, build/Playwright, and post-build check. |
| `npm run preview`      | Serve the existing production build at `http://127.0.0.1:8787`.                 |
| `npm run deploy`       | Run the full validation gate, then deploy only if it succeeds.                  |

Run `npm run build` before a standalone preview. Playwright starts the same preview
command without rebuilding or reusing another server. The existing tests cover
homepage rendering, project/contact actions, resume download, single-project
controls, custom 404 behavior, and unavailable localStorage. There are no unit tests.

Validation and deployment use `&&` to stop at the first failure. Neither command
runs formatting fixes or ESLint fixes. Checks/builds regenerate ignored tooling
and build output, but do not rewrite application source. Run `npm run format`
explicitly when formatting needs correction, then rerun validation.

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

The GitHub Actions workflow validates pull requests to `main`, pushes to `main`,
and manual runs. It uses Node 24, `npm ci`, Chromium with Linux dependencies,
and `npm run validate`. It does not deploy or require Cloudflare credentials.
Require the `validate` check in branch protection if desired.

### Workers Builds settings

Cloudflare Workers Builds handles production and preview deployment from the
connected Git repository.

Current build settings:

- Node: 24 via `.nvmrc`
- Build variable: `SKIP_DEPENDENCY_INSTALL=1`
- Build command:
  `npm ci && npm run lint && npm run check && npm run build`
- Production branch: `main`
- Production deploy command: `npx wrangler deploy`
- Other-branch preview command: `npx wrangler versions upload`

GitHub Actions owns the full browser-test validation gate, including Playwright
and its Linux system dependencies. Cloudflare runs formatting/lint checks,
Svelte/TypeScript checks, and the production build before deployment.

This separation is intentional: Cloudflare's build image does not provide the
system libraries required to run Playwright Chromium, while GitHub's Ubuntu
runner can install those dependencies with `npx playwright install --with-deps chromium`.

The first hosted Cloudflare build using this configuration has been verified successfully.

## Project structure

- `src/routes/+page.svelte`: homepage, skills, and social metadata
- `src/app.html`: document shell and favicon/touch-icon links
- `src/lib/data/projects.ts`: featured project data, including Bun Burner
- `src/lib/components/`: atmosphere and featured project rendering
- `src/routes/+error.svelte`: custom 404 and repeat-visit messages
- `src/app.css` and `src/routes/layout.css`: visual system and Tailwind entrypoint
- `static/assets/`: optimized backgrounds, favicon/touch icons, and `og-preview.png`
- `static/fonts/`: local font assets
- `static/resume.pdf`: downloadable resume
- `tests/`: homepage and 404 browser tests
- `scripts/cf-typegen.mjs`: generated application binding types
- `.github/workflows/validate.yml`: validation pipeline

## Purpose

This portfolio documents my work across software quality, systems support,
automation, developer tooling, and modern web development. It is designed to
grow alongside my projects and capture practical, hands-on technical work over time.
