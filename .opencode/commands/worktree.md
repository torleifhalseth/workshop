---
description: Create a new git worktree from main using a Jira issue URL
---
Create a new git worktree from `main`.

## Input

Arguments: `$1` = Jira URL, `$2` = short description (multiple words joined as kebab-case)

## Steps

1. **Get initials** from git config:
   ```bash
   git config user.name
   ```
   Extract initials from the full name (e.g. "Torleif Halseth" -> `th`, "Ole Martin Berg" -> `omb`).

2. **Extract the task number** from the Jira URL (`$1`).
   - Look for the `selectedIssue=` query parameter (e.g. `TWEB-179`)
   - If not found, look for an issue key pattern like `TWEB-123` anywhere in the URL
   - If neither works, ask the user for the task number

3. **Build the branch name** from the parts:
   - Initials from step 1
   - Task: the extracted issue key (e.g. `TWEB-179`)
   - Description: remaining arguments (`$2`, `$3`, etc.) converted to lowercase kebab-case
   - Format: `<INITIALS>-<TASK>-<description>`
   - Initials and task key are UPPERCASE, description is lowercase
   - Example: `TH-TWEB-179-shared-cta`

4. **Determine the worktree base path**:
   - Get the project directory name from the repo root: `basename $(git rev-parse --show-toplevel)` (e.g. `sbnorge`)
   - The worktree parent is `../<project-name>.worktrees/` (e.g. `../sbnorge.worktrees/`)
   - Full worktree path: `../<project-name>.worktrees/<branch-name>`

5. **Create the worktree**:
   ```bash
   git fetch origin main
   mkdir -p ../<project-name>.worktrees
   git worktree add ../<project-name>.worktrees/<branch-name> -b <branch-name> origin/main
   ```

6. **Push branch to origin** so it's tracked remotely (not on main):
   ```bash
   cd ../<project-name>.worktrees/<branch-name>
   git push -u origin <branch-name>
   ```

7. **Copy environment files and certs** from the main repo to the new worktree:
   ```bash
   # Root .env files
   cp .env.local ../<project-name>.worktrees/<branch-name>/ 2>/dev/null || true

   # App-level .env files
   cp apps/studio/.env.* ../<project-name>.worktrees/<branch-name>/apps/studio/ 2>/dev/null || true
   cp apps/web/.env.* ../<project-name>.worktrees/<branch-name>/apps/web/ 2>/dev/null || true

   # TLS certificates
   cp -r cert ../<project-name>.worktrees/<branch-name>/cert
   ```

8. **Confirm** with a summary and a ready-to-copy `cd` command:
   ```
   Worktree created!
   Branch: <branch-name>
   Path:   ../<project-name>.worktrees/<branch-name>

   cd ../<project-name>.worktrees/<branch-name>
   ```

## Example

```
/worktree https://spvest.atlassian.net/jira/software/projects/TWEB/boards/950?selectedIssue=TWEB-179 shared cta
```

-> Branch: `TH-TWEB-179-shared-cta`
-> Path: `../sbnorge.worktrees/TH-TWEB-179-shared-cta`
