# Nate Martinez Portfolio

Personal portfolio showcasing my work in software quality engineering, systems engineering, developer tooling, automation, and open-source development.

🌐 **Live website:** [natemtz.dev](https://natemtz.dev)

## Overview

A responsive portfolio built with SvelteKit, TypeScript, and Cloudflare Workers.

The site highlights my professional experience, independent development projects, and open-source contributions. It also serves as a practical environment for exploring modern web development, automated testing, accessibility, and deployment workflows.

The project prioritizes maintainability, reproducible builds, responsive design, and reliable deployment.

### Technology stack

- Svelte 5, SvelteKit 2, Vite 8, and TypeScript 6
- Tailwind CSS 4 with CSS-first `@theme` configuration and custom CSS variables
- Cloudflare Workers, adapter-cloudflare 7, and Wrangler 4
- Node.js 24 and npm; Playwright Chromium, ESLint, and Prettier

`package-lock.json` records exact dependency versions. The current release candidate
uses SvelteKit 2.70.3, adapter-cloudflare 7.2.9, and Wrangler 4.149.0.

## Status

**Current milestone: v0.2.0 release candidate**

The v0.2.0 update introduces an expanded project showcase, refreshed professional positioning, responsive UI improvements, and refinements to the existing design system.

The application version is set to `0.2.0`. Local automated validation and browser
inspection passed on 2026-10-08. Commit review, Lighthouse audits, and deployment
verification remain pending; no release tag has been created by this stabilization.

Previous milestone:

- **v0.1.0:** Initial public portfolio structure and core functionality.

## Features

- Responsive homepage with mobile, tablet, and desktop layouts
- System-based dark and light themes
- Featured project carousel with keyboard-accessible navigation controls
- Data-driven project content using typed TypeScript definitions
- Featured projects:
  - **Bun Burner:** Source-preserving bidirectional synchronization and developer tooling
  - **Chora:** Open-source Android TV contributions, including three merged upstream pull requests
- Technical expertise section covering software development, quality engineering, and infrastructure
- Downloadable résumé
- GitHub, LinkedIn, and email contact links
- Custom portfolio branding, favicon, and touch icons
- Open Graph and Twitter social preview metadata
- Custom 404 page with repeat-visit messages and storage-failure handling
- Reduced-motion support and atmospheric responsive backgrounds

Interactive controls use native links/buttons, accessible labels, visible keyboard
focus, and live announcements for carousel selection and 404 messages. These are
implemented features, not a claim of accessibility compliance; a formal audit is pending.

## Featured Projects

### Bun Burner

**TypeScript · WebSockets · Developer Tooling · Automated Testing**

A source-preserving, bidirectional synchronization tool connecting external development environments to Bitburner's Remote API.

The project focuses on safe synchronization, conflict handling, recovery behavior, and cross-platform validation.

**Repository:** [NathanMartinez/bun-burner](https://github.com/NathanMartinez/bun-burner)

### Chora

**Kotlin · Android TV · Open Source · Quality Engineering**

Contributions to Chora, an open-source Android music application.

Three merged upstream pull requests address:

- [Navidrome provider initialization (#116)](https://github.com/CraftWorksMC/Chora/pull/116)
- [Pull-request debug-build validation (#118)](https://github.com/CraftWorksMC/Chora/pull/118)
- [Playlist deletion confirmation and remote-control input handling (#121)](https://github.com/CraftWorksMC/Chora/pull/121)

Testing included physical Fire TV hardware and Android emulators.

**Upstream repository:** [CraftWorksMC/Chora](https://github.com/CraftWorksMC/Chora)

## Roadmap

### v0.2.0 — Current milestone

- [x] Responsive visual redesign and refined glass UI
- [x] Updated professional positioning and technical expertise
- [x] Bun Burner featured project
- [x] Chora open-source contribution showcase
- [x] Redesigned project carousel and navigation controls
- [x] Improved mobile layout and keyboard accessibility
- [x] Portfolio branding, favicon assets, and social metadata
- [x] Node.js 24 tooling, reproducible validation, and CI foundation
- [x] Local automated validation (2026-10-08)
- [ ] Mobile and desktop Lighthouse audits
- [ ] Production deployment verification
- [ ] Git release tag

### v0.3.0 — Accessibility & discoverability

- Further accessibility testing and refinements
- SEO and social-preview verification
- Theme-toggle improvements
- Optional privacy-conscious analytics
- Expanded browser and responsive testing

### v0.4.0 — Project case studies

- Detailed engineering case studies
- Expanded project documentation
- Additional open-source contribution highlights
- Optional project filtering or categorization

### v1.0.0 — Stable release

- Finalized professional content and résumé
- Accessibility, performance, and SEO review
- Deployment hardening and documentation
- Stable public portfolio release

## Development

Use Node.js 24 LTS (`.nvmrc`; `nvm use` if you use nvm) and npm.
`package.json` requires `24.x`, and `.npmrc` enforces the Node engine requirement.
The current site needs no application secrets or `.env` file for local use; its
only configured binding is `ASSETS`, served locally by Wrangler. Deploying requires
separate Cloudflare account authorization.

Install the locked dependencies:

```bash
npm ci
```

Start the dev server:

```bash
npm run dev
```

## Build for production

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
| `npm run dev`          | Generate bindings, then start the Vite development server.                      |
| `npm run cf-typegen`   | Regenerate ignored application binding declarations from Wrangler config.       |
| `npm run prepare`      | Generate bindings and sync SvelteKit; also runs during dependency installation. |
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
homepage rendering, project/contact actions, resume download, carousel button and
keyboard navigation, custom 404 behavior, and unavailable localStorage. There are no unit tests.
The 11 Chromium tests include 1440px, 768px, and 390px layouts in both system themes,
with checks for console errors, failed assets, and horizontal overflow. Screenshots
are written to ignored `test-results/`. External project-link navigation is mocked
in the homepage test; it does not verify GitHub availability.

Stop a standalone preview before running tests, and run builds/validation serially:
they share generated `.svelte-kit` output and tests require port 8787.

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

Wrangler's environment output also includes Worker asset-import declarations for
text, HTML, SQL, binary, and Wasm files. The generator omits these six known
declarations from application types because Vite owns application asset imports.
It rejects malformed generated syntax, preserves binding interfaces and namespaces,
and stops for review if Wrangler introduces an unfamiliar string-literal module
declaration. This prevents ambient declarations
from becoming module augmentations under the module-scoped `Fetcher` import.

Previously Wrangler generated a `GlobalProps.mainModule` import when the built
Worker existed. That import pulled compiled JavaScript into application checking,
even through exclusions. The bindings-only config removes that dependency at its
source; checking does not delete build output or use `skipLibCheck`.

### Dependency security review

The 2026-10-08 npm audit reported three low-severity package findings from one
[cookie advisory](https://github.com/advisories/GHSA-pxg6-pf52-xh8x), with no
moderate, high, or critical findings. The affected path is
`@sveltejs/adapter-cloudflare -> @sveltejs/kit -> cookie@0.6.0`; Kit is also a direct
dependency. npm proposes SvelteKit 3 and adapter 8 upgrades, deferred beyond this
v0.2.0 stabilization. No forced audit fix or dependency override was applied.

The advisory concerns invalid characters in serialized cookie names, paths, and
domains. Application source currently sets no cookies, so it has no identified
user-controlled cookie serialization path; the bundled framework dependency
remains affected. Review this again when adding cookie-based features.

## Deployment

The Cloudflare adapter produces `.svelte-kit/cloudflare/_worker.js` and static
assets under `.svelte-kit/cloudflare`. `wrangler.jsonc` configures the `portfolio`
Worker, `natemtz.dev` custom domain, `ASSETS` binding, compatibility date
`2026-04-14`, `nodejs_compat`, observability, workers.dev, and preview URLs.
These are repository settings; they do not verify the currently deployed state.

The GitHub Actions workflow validates pull requests to `main`, pushes to `main`,
and manual runs. It uses Node 24, `npm ci`, Chromium with Linux dependencies,
and `npm run validate`. It does not deploy or require Cloudflare credentials.
Require the `validate` check in branch protection if desired.

### Workers Builds settings

The intended Workers Builds setup uses the connected Git repository for production
and preview builds. Branch behavior and build commands are dashboard settings,
not enforced by `wrangler.jsonc` or the GitHub workflow.

Intended dashboard settings (verify separately before deployment):

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

This separation keeps browser testing on GitHub's Ubuntu runner, where the workflow
explicitly installs Chromium and its system dependencies with
`npx playwright install --with-deps chromium`.

Earlier project notes record a successful hosted build. The dashboard settings and
hosted v0.2.0 candidate have not been reverified during this local stabilization.

## Project structure

- `src/routes/+page.svelte`: homepage, skills, and social metadata
- `src/app.html`: document shell and favicon/touch-icon links
- `src/lib/data/projects.ts`: typed featured project data for Bun Burner and Chora
- `src/lib/components/`: atmosphere and featured project rendering
- `src/routes/+error.svelte`: custom 404 and repeat-visit messages
- `src/app.css` and `src/routes/layout.css`: visual system and Tailwind entrypoint
- `static/assets/`: optimized backgrounds, favicon/touch icons, and `og-preview.png`
- `static/fonts/`: local font assets
- `static/resume.pdf`: downloadable resume
- `tests/`: homepage, 404, and responsive/theme browser tests
- `scripts/cf-typegen.mjs`: generated application binding types
- `.github/workflows/validate.yml`: validation pipeline

## Purpose

This portfolio documents my work across software quality engineering, systems engineering, developer tooling, automation, and open-source development. It serves as both a professional showcase and a continuously evolving software project.
