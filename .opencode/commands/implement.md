---
description: Implements a saved plan using @general, then @review reviews in a loop until clean
---
Find the most recent or most relevant plan file in the `plan/` folder for: $ARGUMENTS

If multiple plans exist and it's ambiguous which one to use, list them and ask the user to choose. If no matching plan is found, tell the user to run `/plan` first.

Once the plan is identified, read it in full and store it as the "original plan".

## Workflow

Execute this loop using subagent calls:

### Step 1: Implement

Use the `@general` agent to implement the plan. Pass the full plan content as the task.

### Step 2: Review

Use the `@review` agent to review the implementation. Pass the general agent's output as context.

### Step 3: Evaluate and loop

Examine the reviewer's output. If the reviewer reported **critical** or **warning** issues:

- Use the `@general` agent to apply the feedback. Include BOTH the original plan AND the review feedback in the task:

```
## Original Plan
<the full plan>

## Review Feedback
<the reviewer's output>

Apply the review feedback above while keeping the original plan as context for intent and scope.
```

- Then go back to **Step 2** (review again).

If the reviewer reported **no issues** or only **suggestions**, the loop is done.

### Safety limit

Stop after **3 review cycles** maximum to avoid infinite loops. If issues remain after 3 cycles, present the remaining feedback to the user and let them decide how to proceed.
