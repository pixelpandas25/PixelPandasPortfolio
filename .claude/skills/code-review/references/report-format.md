# code-review reference: finding format, severity, and report structure

Load this when you're ready to write up findings, after the checklist review.

## Severity levels

Don't inflate severity — judge against realistic production impact.

- 🔴 **CRITICAL** — severe production failure, security vulnerability, data
  corruption, or major functionality break.
- 🟠 **HIGH** — significant bug, regression, or production-impacting issue.
- 🟡 **MEDIUM** — meaningful correctness, performance, maintainability, UX, or
  testing issue.
- 🔵 **LOW** — minor improvement or low-risk issue.
- ⚪ **INFO** — observation or optional improvement.

## Finding format

Every finding needs enough context to act on without re-deriving it. Never write
"this might cause issues" — always name the concrete failure scenario.

```
### <severity emoji> <SEVERITY> — <short title>

File:
<path>

Location:
<function/component/line>

Problem:
<what is actually wrong>

Why this matters:
<concrete consequence>

Failure scenario:
<specific inputs/state that trigger it>

Impact:
<who/what is affected, how badly>

Recommended fix:
<what to change>

Suggested implementation:
<code or approach, if it clarifies the fix>

Confidence:
High / Medium / Low
```

Classify every finding into exactly one of:

- **Bug** — something is actually incorrect.
- **Risk** — can fail under a realistic condition, not currently failing.
- **Improvement** — works, could be better.
- **Optional suggestion** — non-essential.

Never present a personal style preference as a bug.

## Final report structure

```markdown
# Code Review Report

## 1. Overall Assessment
✅ Safe to merge / ⚠️ Safe with minor fixes / 🟠 Changes recommended before merge
/ 🔴 Not ready to merge — with a short explanation why.

## 2. Change Summary
What the changes appear to accomplish.

## 3. Critical Findings
🔴 CRITICAL findings, or: "No critical issues identified."

## 4. High-Priority Findings
🟠 HIGH findings in the detailed format above.

## 5. Medium Findings
🟡 MEDIUM findings.

## 6. Low Findings
🔵 LOW findings.

## 7. Informational / Optional Improvements
⚪ INFO findings.

## 8. Bugs & Regression Risks
Concise prioritized summary (cross-reference sections 3-6, don't restate in full).

## 9. Simplification Opportunities
Current / Problem / Simpler approach / Benefit, per opportunity.

## 10. Performance Review
Issues found, potential impact, recommendations — or "No significant performance
issues identified."

## 11. Security Review
Issues found, impact, recommendation — or "No significant security issues
identified in the reviewed changes."

## 12. Accessibility Review
For UI changes — or "No significant accessibility issues identified."

## 13. Testing Review
Existing coverage, missing coverage, recommended tests, important regression
tests.

## 14. Validation Results
Only commands actually run, e.g.:
Lint: PASS
Typecheck: PASS
Tests: PASS
Build: PASS
Browser/E2E: NOT RUN — Playwright is not part of the existing project tooling.

## 15. Files Reviewed
The changed files, plus relevant surrounding files inspected for context.

## Final Recommendation
Recommendation: APPROVE / APPROVE WITH COMMENTS / CHANGES REQUESTED
Reason: <clear explanation>
Must fix before merge: <list only if applicable>
```

## Commit message

Generate alongside every review, from the actual diff:

```
<type>(<scope>): <short summary>

- Detailed change 1
- Detailed change 2
- Detailed change 3

Why:
<brief explanation>
```

`type` ∈ feat / fix / refactor / perf / style / test / docs / chore, chosen from
what actually changed. Subject: concise, imperative, describes the main change,
no unnecessary detail. Before finalizing, check whether the diff is actually one
logical change — if it bundles unrelated changes, say so and propose a commit
split instead of forcing everything into one message, e.g.:

```
Commit 1: fix(navbar): correct section navigation
Commit 2: refactor(navbar): simplify scroll visibility handling
Commit 3: test(navbar): add navigation regression coverage
```
