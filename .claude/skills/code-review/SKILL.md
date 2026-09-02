---
name: code-review
description: "Deep, production-level engineering review of pending code changes (working tree, staged changes, a branch, or a PR). Trigger on: 'review my changes', 'do a code review', 'review this PR', 'review my current branch', 'check my changes', 'find bugs in my changes', 'do a detailed PR review', 'analyze my PR'. Review-only by default — never modifies source unless the user explicitly asks for fixes ('review and fix', 'apply the fixes')."
---

# code-review

A senior/staff-engineer-level review of pending changes: correctness, regressions, edge
cases, performance, security, accessibility, code quality, over-engineering, test
coverage — evidence-based, not style preference. Framework-agnostic: every fact about
this repo (language, package manager, test/lint/build commands, conventions) is
discovered fresh each run, never assumed from a prior review.

## Mode: review-only vs review + fix

Default is **review-only**. Do not modify source, refactor, fix bugs, rewrite
components, change dependencies, or touch config unless the user's request clearly
asks for it ("review and fix", "apply the HIGH and MEDIUM fixes", "fix what you
found"). When fixing, still produce the full review report first, then apply only
the approved-severity fixes, then re-validate (lint/typecheck/build/tests again) and
report fixed vs. skipped vs. remaining per finding.

## Workflow

Follow in order; don't skip a stage because the diff looks small — a two-line change
can still be a regression, a race condition, or an accessibility break.

```
READ → UNDERSTAND REPOSITORY → UNDERSTAND GIT STATE → UNDERSTAND INTENT
  → INSPECT DIFF → TRACE DEPENDENCIES → INSPECT SURROUNDING CODE
  → REVIEW (correctness, regressions, edge cases, performance, security,
            accessibility, code quality, simplification, test coverage)
  → VALIDATE WITH EXISTING TOOLING → REPORT → COMMIT MESSAGE
```

### 1. Understand the repository

Don't read everything — start high-value, expand only as needed:
`package.json`/equivalent manifest → config files (tsconfig, eslint, build config,
CI) → the directories the diff touches → related source (parent/child components,
callers, shared hooks/utils) → existing tests. Identify framework, language, package
manager, build system, routing, state management, styling system, and existing
project conventions (naming, file layout, how similar problems are already solved
elsewhere in the repo) so findings can be judged against *this* codebase's norms,
not generic best practice.

### 2. Understand git state

```bash
git status
git branch --show-current
git log --oneline -15
git diff              # unstaged
git diff --cached     # staged
```

Diff against the right base: for a branch/PR review, diff against the merge-base
with the base branch, not just `HEAD~1`. Note added/deleted/renamed files — a rename
that also changes content needs the same scrutiny as a new file.

### 3. Understand intent

For each significant change, work out: prior behavior → new behavior → why
(commit messages, comments, naming, related tests/docs). If intent genuinely can't
be determined from available context, say so explicitly rather than guessing:
"Intent could not be fully determined from the available repository context." Never
invent a requirement to judge the code against.

### 4. Context-aware inspection — not just changed lines

For every changed file, read enough surrounding code to know how it actually
behaves in the system: parents/children, hooks/utils it calls or is called by,
routing, state flow, styling/animation dependents, and existing tests. For an
API/backend change: callers, request/response contracts, auth, error/retry
handling, related endpoints. For a schema/DB change: queries, indexes,
transactions, connection handling, callers, perf implications. See
`references/checklist.md` for the full per-category review checklist (correctness,
regressions, edge cases, performance, React/frontend, TypeScript, error handling,
security, accessibility, code quality, simplification/over-engineering, existing-code
reuse, test coverage) — load it before writing findings.

### 5. Validate with existing tooling only

Inspect `package.json` scripts (or the repo's actual build system) for what really
exists — don't assume `npm run lint`/`test`/`build` exist just because they're
common. Run only what's there, report each as `PASS` / `FAIL` / `NOT AVAILABLE`,
and for any failure determine whether it's caused by the reviewed change, a
pre-existing failure, or an environment issue — never hide an unrelated failure.

**Strict tooling policy — do not violate this even if it would make the review
easier:**
- Never install packages (npm/pip/system), browsers, browser extensions, CLI
  tools, or external binaries to perform a review.
- Never download Playwright (or any other browser automation tool) or its
  browsers, never add a testing framework, screenshot tool, visual-regression
  tool, a11y tool, or perf tool, and never modify `package.json`,
  `package-lock.json`/`yarn.lock`/`pnpm-lock.yaml`/equivalent, purely to enable
  review.
- If Playwright (or another browser/E2E tool) is already a real project
  dependency with its own scripts, you may use it via the project's existing
  scripts — don't reinstall it, don't stand up a second config.
- If browser/E2E validation would genuinely help but the tooling isn't already
  there, do not install it — report the limitation and continue with
  static/code-level analysis:
  `Browser/E2E validation was not performed because Playwright is not currently
  part of the repository's tooling.`
- If some other tool is genuinely required and isn't present, report it instead
  of installing it: name the tool, why it's needed, that it's not installed, and
  that you did not install it automatically. Only install on the user's explicit
  authorization.
- Never create or configure external services (cloud/SaaS testing platforms,
  browser farms, monitoring) merely to review.

### 6. Report

Use `references/report-format.md` for the exact finding template, severity
levels, and the final report structure — load it before writing the report.
Every finding needs: where, what, why it matters, a concrete failure scenario
(not "this might cause issues"), impact, recommended fix, and confidence. Separate
**bugs** (actually incorrect) from **risks** (can fail under a realistic condition)
from **improvements** (works, could be better) from **optional suggestions**. Don't
inflate severity, and don't manufacture findings to pad the report — an empty
category gets "No significant issues identified," not filler.

### 7. Commit message

Always generate one alongside the review, based on the actual diff — not
assumptions. Conventional Commits format when appropriate
(`feat`/`fix`/`refactor`/`perf`/`style`/`test`/`docs`/`chore`), imperative subject,
body as a short bullet list of what changed plus a one-line "Why:". If the diff
contains multiple logically distinct changes that shouldn't ship as one commit,
say so and propose the split instead of forcing one message over everything.

## Principles

Correctness first over stylistic perfection. Context over diff — understand how a
change interacts with the rest of the system before judging it. Evidence over
assumption — never invent a bug or a requirement. Simplicity over cleverness.
Reuse over duplication — search for an existing utility/hook/component before
flagging "should have used X" as a suggestion to introduce X. Production mindset —
real users, real failure modes, real maintenance cost. Minimal disruption — don't
recommend a rewrite when a fix will do. Never touch source in review-only mode.
