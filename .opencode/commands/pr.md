---
description: Commit all changes and open a pull request against main
---

Commit all changes in the current branch and open a new pull request against `main`.

## Instructions

1. Use conventional commits

- **Format**: `<type>(<scope>)[!]: <description>`
- **Scope**: MANDATORY. Use folder, component, or `(global)`.
- **Standards**: Imperative mood ("add", not "added"), lowercase type/scope, max 50 chars, no period.
- **Breaking Changes**: Add `!` after scope. Footer MUST start with `BREAKING CHANGE:`.
- **Completeness**: Analyze ALL staged files. List specific changes in the body with bullet points.

### Allowed Types

- **feat**: New feature | **fix**: Bug fix | **docs**: Documentation
- **style**: Formatting/CSS (no logic) | **refactor**: Code restructuring
- **perf**: Performance | **test**: Adding/fixing tests
- **build**: Dependencies/Build system | **ci**: GitHub Actions/Scripts
- **chore**: Maintenance/Config (.gitignore, etc.)

2. Run `git status` and `git diff --cached --stat` (stage all unstaged changes with `git add -A` first if needed).
3. Review the full diff with `git diff --cached` to understand every change.
4. Write a commit message following the rules:
   - Format: `<type>(<scope>)[!]: <description>` — scope is mandatory, imperative mood, max 50 chars, no period.
   - Body: list specific changes with bullet points, grouped by file.
   - If changes span multiple types, use the most significant one.
5. Commit and push the branch to `origin`.
6. Create a pull request with `gh pr create`:
   - `--base main`
   - `--head` set to the current branch name
   - `--title` matching the commit subject line
   - `--body` with a feature-focused description:
     - **Opening paragraph**: 1–3 sentences explaining **what** the PR does and **why** from the user/product perspective — lead with the feature, not implementation details
     - **How it works**: Summarize the approach in bullet points — group related changes together instead of listing every file individually
     - **Key files** (optional): A short table mapping areas (e.g., "Data layer", "Routing") to key files, only when the PR spans many directories
     - Do NOT list every file with a bullet point, describe minor code style tweaks, or repeat the diff in prose
7. Output the PR URL when done.
