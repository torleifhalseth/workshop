---
description: Create a new git worktree from main with a given branch name
---
Create a new git worktree from `main`.

## Input

Arguments: `$1` (and remaining args) = branch name. Multiple words are joined with `-` to form a single branch name.

## Steps

1. **Build the branch name** from all arguments joined with `-`.
   - Example: `/worktree TWEB-179 shared cta` -> `TWEB-179-shared-cta`

2. **Determine the worktree base path**:
   - Get the project directory name from the repo root: `basename $(git rev-parse --show-toplevel)` (e.g. `todo-app`)
   - The worktree parent is `../<project-name>.worktrees/` (e.g. `../todo-app.worktrees/`)
   - Full worktree path: `../<project-name>.worktrees/<branch-name>`

3. **Create the worktree**:
   ```bash
   git fetch origin main
   mkdir -p ../<project-name>.worktrees
   git worktree add ../<project-name>.worktrees/<branch-name> -b <branch-name> origin/main
   ```

4. **Push branch to origin** so it's tracked remotely (not on main):
   ```bash
   cd ../<project-name>.worktrees/<branch-name>
   git push -u origin <branch-name>
   ```

5. **Copy environment files and certs** from the main repo to the new worktree:
   ```bash
   # Root .env files
   cp .env.local ../<project-name>.worktrees/<branch-name>/ 2>/dev/null || true

   # App-level .env files
   cp apps/studio/.env.* ../<project-name>.worktrees/<branch-name>/apps/studio/ 2>/dev/null || true
   cp apps/frontend/.env.* ../<project-name>.worktrees/<branch-name>/apps/frontend/ 2>/dev/null || true

   # TLS certificates
   cp -r cert ../<project-name>.worktrees/<branch-name>/cert
   ```

6. **Confirm** with a summary. The `cd` command must be the very last line of your response, as **plain unformatted text** (no backticks, no code block, no markdown) so the user can triple-click to select it:
   ```
   Worktree created!
   Branch: <branch-name>
   Path:   ../<project-name>.worktrees/<branch-name>

   To navigate to the worktree, copy and run:
   ```
   Then output this as the final line with NO formatting:
   cd ../<project-name>.worktrees/<branch-name>

## Example

```
/worktree TWEB-179 shared cta
```

-> Branch: `TWEB-179-shared-cta`
-> Path: `../todo-app.worktrees/TWEB-179-shared-cta`
