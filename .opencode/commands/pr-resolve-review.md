---
description: Evaluate PR review comments, apply fixes, and resolve threads on GitHub
---

Evaluate the review feedback on the current pull request, present an actionable summary, and optionally apply fixes and resolve comment threads.

## Instructions

### 1. Identify the current PR

Run:

```bash
gh pr view --json number,url,headRefName,title
```

If no PR exists for the current branch, stop and tell the user.

### 2. Fetch all review comments

Collect **both** top-level review bodies and inline code comments:

```bash
# Inline code review comments (file-level)
gh api "repos/{owner}/{repo}/pulls/<NUMBER>/comments" \
  --jq '.[] | {id, node_id, user: .user.login, path, line, body, created_at}'

# Top-level review bodies (overall review summaries)
gh pr view <NUMBER> --json reviews \
  --jq '.reviews[] | {author: .author.login, state, body: (.body[:500]), submittedAt}'
```

Ignore bot-generated overview summaries (e.g. Copilot's "Pull request overview" section). Focus on **actionable comments** — suggestions, questions, or issues raised by reviewers.

### 3. Evaluate, classify, and summarise each comment

For every actionable comment, **read the referenced code and independently evaluate whether the comment is correct and worth acting on.** Do not assume reviewers are right — they may have missed context, misread the code, or suggested changes that introduce new problems.

For each comment, assess:

- **Is it factually correct?** Does the code actually have the problem described? Read the surrounding code, imports, and call sites to verify.
- **Is the suggested fix appropriate?** Would it actually improve the code, or would it introduce regressions, break conventions, or add unnecessary complexity?
- **Is it worth changing?** Even if technically valid, is the improvement meaningful enough to justify the churn? A correct but trivial nitpick on code that works fine may not be worth a commit.

Output a table row for each comment:

| #   | File | Line | Reviewer | Summary | Severity | Verdict |
| --- | ---- | ---- | -------- | ------- | -------- | ------- |

**Severity rules:**

- **Error** — Bug, security issue, data loss risk, or broken functionality. Must fix before merge.
- **Warning** — Code smell, performance concern, missing edge case, or deviation from project conventions. Should fix.
- **Suggestion** — Style preference, alternative approach, or nice-to-have improvement. Optional.

**Verdict values:**

- **Agree** — The comment is correct and worth fixing.
- **Partially agree** — The issue is real but the suggested fix is wrong, or the severity is overstated. Include a note on what you'd do differently.
- **Disagree** — The comment is incorrect, based on a misunderstanding, or the change would make things worse. Explain why.
- **Trivial** — Technically valid but not worth the churn. Explain the trade-off.

After the table, expand on any non-Agree verdicts with a brief explanation so the user can make an informed decision.

Then print a short **verdict**:

- Total counts per severity (e.g. "1 error, 3 warnings, 2 suggestions")
- Total counts per verdict (e.g. "4 agree, 1 partially agree, 1 disagree")
- A one-line recommendation: "Block merge until errors are resolved" / "Safe to merge after addressing warnings" / "All feedback is optional — merge when ready"

### 4. Ask the user what to apply

Prompt the user:

> Would you like me to apply the suggested changes? Based on my evaluation, I recommend addressing **N** of **M** comments. I can:
>
> - **Recommended** — apply only comments I marked Agree or Partially agree
> - **All** comments (including ones I disagreed with)
> - **Errors and warnings** only
> - **Specific comments** (by number from the table)
> - **None** — just wanted the summary

For any comment marked Disagree, briefly explain your reasoning so the user can override if they still want it applied.

Wait for the user's response before making any code changes.

### 5. Apply changes (if requested)

For each selected comment:

1. Read the relevant file and locate the code referenced by the comment.
2. Implement the fix or improvement described in the review comment.
3. Keep track of what was changed and why for each comment (used in step 6).
4. After all changes are applied, run any relevant lint/type-check commands:
   ```bash
   pnpm --filter web tsc --noEmit
   pnpm --filter studio tsc --noEmit
   ```
5. Stage and commit the changes following `.github/commit-instructions.md` rules.
   Use commit type `fix` or `refactor` with a message like: `fix(web): address PR review feedback`
6. Push to the current branch so the PR is updated.

### 6. Resolve comment threads

After pushing, immediately reply to each addressed comment and resolve its thread — no need to ask.

First, fetch the **review thread IDs** (prefix `PRRT_`). These are different from the comment `node_id` (prefix `PRRC_`) fetched in step 2 — comment node IDs cannot be used with `resolveReviewThread`.

```bash
# Fetch thread IDs mapped to their first comment's databaseId
gh api graphql -f query='query {
  repository(owner: "<OWNER>", name: "<REPO>") {
    pullRequest(number: <NUMBER>) {
      reviewThreads(first: 50) {
        nodes {
          id
          isResolved
          comments(first: 1) { nodes { databaseId path } }
        }
      }
    }
  }
}'
```

Then for each addressed comment, reply and resolve:

```bash
# Reply to the comment explaining the resolution
gh api "repos/{owner}/{repo}/pulls/<NUMBER>/comments/<COMMENT_ID>/replies" \
  -f body="<resolution description>"

# Resolve the review thread using the PRRT_ thread ID (NOT the PRRC_ comment node_id)
gh api graphql -f query='
  mutation {
    resolveReviewThread(input: { threadId: "<THREAD_NODE_ID>" }) {
      thread { isResolved }
    }
  }
'
```

**Resolution reply format (for applied fixes):**

> Resolved in `<commit-sha-short>` — <one-line description of what was changed>

**Resolution reply format (for comments declined after evaluation):**

> Reviewed — keeping current implementation. <brief explanation of why the comment was not applied>

After all threads are resolved, print a final summary:

- How many threads were resolved
- Link to the PR for verification
