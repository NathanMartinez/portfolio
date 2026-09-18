# AGENTS.md

## Git workflow

- Keep changes small, focused, and scoped to the requested task.
- Do not bundle unrelated refactors or cleanup into the same change.
- Use clear conventional commit messages when asked to commit.
- Create a feature/refactor branch when a change is architectural, high-risk,
  or large enough that isolated review or rollback would be useful.
- Do not merge branches without explicit user authorization.
- Do not push to any remote. The user handles pushes.
- Do not force-push.
- Do not rewrite published history.
- Do not create tags or releases unless explicitly requested.

## Scope

- Do not refactor outside the requested scope.
- Prefer the smallest change that solves the problem cleanly.
- Preserve existing behavior unless the task explicitly changes it.
- Avoid adding dependencies unless they clearly earn their cost.

## Validation

- Run relevant lint, type/check, build, and tests after changes.
- Report failures instead of hiding or suppressing them.
- Keep generated files and build artifacts out of commits unless the project
  intentionally tracks them.

## Repository conventions

- Use Conventional Commits for commit messages:
  - `feat:` for user-visible features
  - `fix:` for bug fixes
  - `test:` for test coverage or test-only changes
  - `chore:` for tooling, dependency, CI, and maintenance work
  - `docs:` for documentation-only changes
  - `refactor:` only when behavior is intentionally unchanged

- Keep commits logically scoped and independently understandable.
- Do not combine visual/product work with tooling or infrastructure cleanup.

- Follow Semantic Versioning for release planning:
  - `v0.2.0` — visual redesign and tooling/pipeline foundation
  - `v0.3.0` — discoverability/presentation improvements such as social preview,
    metadata/SEO, theme polish, accessibility work, and optional analytics
  - `v0.4.0` — portfolio depth such as additional projects, case studies,
    richer project presentation, and optional project/skill filtering
  - `v1.0.0` — stable public release with finalized resume/content and
    production-ready validation

- Do not create or move version tags unless explicitly requested.
- The README should reflect the current planned release/version state.
