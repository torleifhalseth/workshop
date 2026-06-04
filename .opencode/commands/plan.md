---
description: Explore the codebase and create an implementation plan (no implementation), save to .opencode/plan/
---
Investigate the codebase to find all code relevant to: $ARGUMENTS

Be thorough -- follow imports, read critical sections, identify types and key functions, and find existing precedents for similar patterns across the codebase.

Then, using the gathered context, create an implementation plan for "$ARGUMENTS". Do NOT implement anything.

Structure the plan as:

## Goal

One sentence summary of what needs to be done.

## Plan

Numbered steps, each small and actionable:

1. Step one - specific file/function to modify
2. Step two - what to add/change
3. ...

## Files to Modify

- `path/to/file.ts` - what changes

## New Files (if any)

- `path/to/new.ts` - purpose

## Risks

Anything to watch out for.

---

Save the plan as a markdown file in the `.opencode/plan/` folder. Derive the filename from the task description using kebab-case (e.g. `.opencode/plan/add-hero-block.md`). If a file with that name already exists, overwrite it with the new plan.

Return the plan to the user and mention where it was saved.
