# code-review reference: per-category checklist

Load this once you've read the diff and its surrounding context, before writing
findings. Only report what the actual code supports — this is a checklist of what
to *look for*, not a list of findings to manufacture.

## Correctness

Logical bugs, incorrect conditions/assumptions, incorrect state transitions, race
conditions, async/promise-handling bugs, incorrect calculations or data
transformations, incorrect API usage, lifecycle issues, null/undefined handling,
incorrect defaults, incorrect error paths, unreachable code, missing/incorrect
cleanup. For each real bug, state the exact failure scenario — concrete inputs or
state that reach the wrong output or a crash.

## Regressions

Could this break something that already worked? Check existing pages/routes,
shared components/utilities used elsewhere, APIs, mobile vs. desktop behavior,
navigation, animations, state management, existing user flows, page refresh,
direct URL navigation, browser back/forward. Trace who else calls the
code you changed before concluding it's safe.

## Edge cases

Empty/missing/null data, very large/very small values, slow network or failed
requests, rapid repeated clicks, simultaneous/concurrent actions, page refresh,
direct navigation, browser back/forward, mobile viewport, resize, first render,
component unmount mid-async, failed initialization. Only report the ones that are
actually plausible for this code path — don't list every generic edge case.

## Performance

Unnecessary re-renders, expensive or repeated calculations, inefficient loops,
excessive DOM operations, meaningful bundle-size impact, duplicate network
requests, unnecessary dependencies, uncleaned event listeners (scroll/mouse/resize),
timers/intervals left running, animation performance, memory leaks, duplicate API
calls, poor caching, N+1 patterns, excessive state updates. For React: `useEffect`/
`useMemo`/`useCallback` dependency arrays, component boundaries, state placement,
state that shouldn't be state. Don't recommend memoization reflexively — only where
there's a real, explainable cost being paid today.

## React / frontend

- **Components** — responsibility, reusability, prop design, size, duplicated
  logic, abstraction quality.
- **Hooks** — dependency arrays, cleanup functions, stale closures, effect
  lifecycle, effects that shouldn't be effects, state sync issues, listener
  cleanup on unmount.
- **Routing** — route correctness, deep linking, navigation, refresh behavior,
  browser history, hash navigation, scroll restoration/position.
- **Animations** — lifecycle, performance, layout shift, over-triggering,
  cleanup on unmount, `prefers-reduced-motion` behavior.
- **Responsive UI** — mobile/tablet/desktop, overflow, text wrapping,
  fixed/sticky element interactions, viewport edge cases.

## TypeScript

`any`, unsafe casts, unnecessary type assertions, incorrect or overly broad
interfaces, duplicate types, missing null handling, incorrect generics, incorrect
narrowing, runtime/type mismatches, unreachable branches implied by the types.
Prefer stronger typing where it would have caught a real bug — not for its own
sake.

## Error handling

Error propagation, error boundaries where relevant, API error handling,
user-facing error messaging, logging, silent failures, loading states, empty
states, retry behavior, cleanup after failure. Flag realistic cases where a
failure is swallowed or surfaces incorrectly.

## Security

XSS, injection, unsafe HTML insertion (`dangerouslySetInnerHTML` and equivalents),
exposed secrets, sensitive data in logs, unsafe URL handling (open redirects,
`javascript:` URLs, unsanitized `href`/`src`), authorization assumptions,
authentication issues, insecure client-side storage, risky new dependencies,
client-side-only security assumptions (anything that must actually be enforced
server-side). Only report realistic, code-supported concerns — don't invent
threat models that don't apply to this app.

## Accessibility

Semantic HTML, keyboard navigation and tab order, focus handling (including
elements hidden only via opacity/transform that stay focusable), ARIA usage,
accessible names, screen-reader behavior, color contrast where relevant,
`prefers-reduced-motion`, correct interactive-element semantics (button vs. div
vs. link), form accessibility.

## Code quality

Naming, duplication, oversized functions/components, high complexity, dead code,
unused imports/variables, magic numbers, hard-coded values that should be
config/constants, misleading or unnecessary comments, poor separation of
concerns, inconsistency with the rest of the codebase's established patterns.

## Simplification / over-engineering

Look for working code that's unnecessarily complicated: unneeded abstractions,
duplicated state/calculations, unneeded helpers, excessive configuration,
redundant wrappers, reimplementations of something the standard library / an
existing dependency / an existing project utility already does. For each real
opportunity:

```
Current approach:
Why it is unnecessarily complex:
Simpler approach:
Benefit:
```

Optimize for clarity > cleverness > fewer lines — don't simplify just to shrink
line count.

## Existing-code reuse

Before flagging "should introduce a new utility/hook/component," search the repo
for one that already does this. If one exists, name it and point to it instead of
proposing a new abstraction — e.g. "existing `useScrollVisibility` in
`src/hooks/` already handles this and could be reused here."

## Test coverage

Check existing tests and the project's testing conventions before asking for
more. Identify missing coverage for the actual risk introduced by this diff —
regression coverage, edge cases, integration behavior — not blanket "add tests"
for trivial changes. When you flag a gap, name the specific test that should
exist, e.g.:

```
Missing regression test:
When navigating from another route to /#testimonials, the Home page should
mount and scroll to the Testimonials section.
```

## Deep questions to run through before finalizing

Could this break existing functionality? Fail under a race condition? Behave
differently on mobile? Leak memory? Trigger unnecessary renders or duplicate
requests? Create stale state? Break navigation, refresh, direct URL access, or
back/forward? Cause an accessibility or security regression? Is the abstraction
actually necessary, or does something simpler/existing already cover it? Is error
handling correct? Is the code testable? Does the implementation actually match
its apparent intent? Only keep conclusions the code itself supports.
