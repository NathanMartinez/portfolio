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
