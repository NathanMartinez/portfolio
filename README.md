# Nate Martinez Portfolio

Personal portfolio site for my infrastructure, homelab, Linux, Docker, and web development work.

## Overview

This is the first public version of my portfolio site. The goal of this project is to create a clean, fast, and maintainable home for my projects, write-ups, and technical growth over time.

This site is built with:

- SvelteKit
- TypeScript
- Tailwind CSS
- Custom CSS variables for theming
- Cloudflare Pages for deployment

## Status

Current release: `v0.1.0`

This version is an MVP focused on getting a real portfolio live on my domain with a solid foundation for future iteration.

## Features

- Responsive homepage
- Dark and light theme support based on system preference
- Projects section with linked cards
- Skills section
- Contact links
- Versioned Git history with tagged releases

## Roadmap

### v0.2.0

- Resume download button
- Better project metadata
- Improved typography and spacing polish
- More refined mobile layout

### v0.3.0

- Dedicated project detail pages
- Technical write-ups and lessons learned
- Markdown-based project notes
- Better content hierarchy and section depth

### v0.4.0

- Theme toggle
- Analytics
- Improved accessibility pass
- SEO and social preview polish

### v1.0.0

- Stable public portfolio release
- Complete project case studies
- Resume and contact flow finalized
- Production-ready design system and content structure

## Development

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun run dev
```

## Build for production:

```bash
bun run build
```

## Validation and preview

```bash
bun run lint
bun run check
bun run build
bun run build
bunx playwright install chromium
bun run test
```

`bun run preview` builds once and starts the Cloudflare Worker locally at
`http://127.0.0.1:8787`. Playwright starts this same command and tests the homepage;
it does not reuse an existing server. Browser installation is explicit, rather
than part of dependency installation. There are currently no unit tests.

Cloudflare types are generated into ignored `.wrangler/types/` by `cf-typegen`
before development, builds, and type checks (and during dependency installation).
Do not commit these generated files: Wrangler includes `GlobalProps.mainModule`
only when the adapter's built Worker exists, so output differs between clean and
already-built checkouts. `wrangler.jsonc` and `bun.lock` are the inputs; regeneration
replaces committed-output checks and works in either state.

## Deployment

This site is intended to deploy through Cloudflare Pages with GitHub-based CI/CD.

## Purpose

This portfolio is part of my broader transition into infrastructure, systems administration, DevOps, SRE, and modern web engineering. It is designed to grow alongside my projects and document real hands-on work over time.
