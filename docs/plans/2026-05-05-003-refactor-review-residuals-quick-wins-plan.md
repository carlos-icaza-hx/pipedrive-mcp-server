---
title: "refactor: Review Residual Quick Wins (#17-#21)"
type: refactor
status: active
date: 2026-05-05
---

# refactor: Review Residual Quick Wins (#17-#21)

## Summary

Addresses 5 code review residual findings from the Phase 1 PR: consolidate env-var reading in the destructive guard, flatten the double-nested ErrorResponse type, extract a shared error-result helper across 43 call sites, freeze the mutable DEFAULT_API_ERROR constant, and fix a double-period formatting bug.

---

## Problem Frame

The Phase 1 code review (run `20260505-163107-phase1-quickwins`) surfaced 5 actionable findings that were deferred from autofix due to blast radius, type complexity, or behavioral gating. Each is a P2 with high confidence from multiple reviewers.

---

## Requirements

- R1. `destructiveOperationGuard` reads `enableDestructive` from `getConfig()` instead of `process.env` directly (#17)
- R2. `ErrorResponse` type is flat (`{ code, message, suggestion? }`) with no `.error` wrapper nesting (#18)
- R3. A shared `mcpErrorResult` helper replaces the 43 identical 7-line error blocks across 9 tool files (#19)
- R4. `DEFAULT_API_ERROR` cannot be mutated by callers (#20)
- R5. `createListSummary` produces exactly one trailing period regardless of `hasMore` or `additionalInfo` combinations (#21)

---

## Scope Boundaries

- No changes to MCP tool behavior, API call patterns, or schema validation
- No changes to the `as const` pattern (advisory finding #9, out of scope)
- No changes to the PipedriveClient null cast (pre-existing, #8)
- No new tool handlers or entity support

---

## Context & Research

### Relevant Code and Patterns

- `src/utils/errors.ts` - ErrorResponse type (L5-11), createErrorResponse (L27), handleApiError (L44), destructiveOperationGuard (L91), DEFAULT_API_ERROR (L108), getErrorResponse (L116), formatErrorForMcp (L123)
- `src/config.ts` - Config interface (L5-10), getConfig() (L16-39)
- `src/client.ts` - ApiResponse type (L11-22), ErrorResponse usage in error assignments (L155-158, L172-177)
- `src/utils/formatting.ts` - createListSummary (L5-22)
- `src/tools/*.ts` - 9 tool files with 43 identical error blocks
- `tests/unit/utils/errors.test.ts` - guard tests (L207-271), getErrorResponse tests (L182-205)
- `tests/unit/utils/formatting.test.ts` - createListSummary tests (L8-42)

---

## Key Technical Decisions

- **Flatten ErrorResponse rather than rename**: Removing the `.error` wrapper gives clean `response.error.code` access. Renaming to `ApiErrorEnvelope` preserves confusing nesting. Flattening is the smaller change surface.
- **Guard reads getConfig() directly**: `getConfig()` validates `PIPEDRIVE_API_KEY` and throws if missing, but by the time a delete handler runs, the server has already started via `getConfig()` in `index.ts`. Safe to call in the guard. Test setup needs `setupValidEnv()`.
- **Freeze DEFAULT_API_ERROR with `as const satisfies`**: Provides compile-time immutability. Combined with returning a shallow copy from `getErrorResponse`, provides runtime safety too.
- **mcpErrorResult returns the full MCP error object**: The `if (!response.success || !response.data)` check stays at call sites since it's a control-flow decision. The helper handles the formatting.

---

## Implementation Units

- U1. **Fix createListSummary double period**

**Goal:** Eliminate double trailing period when `hasMore=true`

**Requirements:** R5

**Dependencies:** None

**Files:**
- Modify: `src/utils/formatting.ts`
- Test: `tests/unit/utils/formatting.test.ts`

**Approach:**
Remove the trailing period from the hasMore message string (`"More available with cursor pagination."` becomes `"More available with cursor pagination"`). The `+ "."` at the end of the join handles the final period for all cases.

**Patterns to follow:**
- Existing test structure in `tests/unit/utils/formatting.test.ts`

**Test scenarios:**
- Happy path: `hasMore=false`, no additionalInfo produces `"Found 3 deals."`
- Happy path: `hasMore=false`, with additionalInfo produces `"Found 3 deals. ($1.2M total)."`
- Edge case: `hasMore=true`, no additionalInfo produces exactly one period at end (not `..`)
- Edge case: `hasMore=true`, with additionalInfo produces exactly one period at end
- Edge case: count=0 produces `"Found 0 deals."` (singular/plural boundary)
- Edge case: count=1 produces `"Found 1 deal."` (singular)

**Verification:**
- All formatting tests pass with exact string assertions (not `toContain`)
- No double periods in any combination of hasMore and additionalInfo

---

- U2. **Consolidate destructiveOperationGuard to use getConfig()**

**Goal:** Single source of truth for `enableDestructive` setting

**Requirements:** R1

**Dependencies:** None

**Files:**
- Modify: `src/utils/errors.ts`
- Test: `tests/unit/utils/errors.test.ts`

**Approach:**
Replace `process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE === "true"` on line 92 with `getConfig().enableDestructive`. Add `getConfig` import from `../config.js`. Update guard unit tests to use `setupValidEnv()` so `getConfig()` doesn't throw, then set/unset `PIPEDRIVE_ENABLE_DESTRUCTIVE` as before.

**Patterns to follow:**
- `src/tools/*.ts` handlers already call `getConfig()` indirectly via `getClient()`
- `tests/helpers/mockEnv.ts` `setupValidEnv()` pattern

**Test scenarios:**
- Happy path: guard returns null when `PIPEDRIVE_ENABLE_DESTRUCTIVE=true` with valid env
- Error path: guard returns error when env var is unset (with valid API key)
- Error path: guard returns error for `"false"`, `"TRUE"`, `"1"`, `"yes"` values
- Edge case: suggestion text includes instructions to set the env var

**Verification:**
- No direct `process.env.PIPEDRIVE_ENABLE_DESTRUCTIVE` reads remain outside `config.ts`
- All guard tests pass
- Integration tests for delete handlers still pass

---

- U3. **Flatten ErrorResponse type**

**Goal:** Remove `.error` wrapper nesting so access is `response.error.code` not `response.error.error.code`

**Requirements:** R2

**Dependencies:** None

**Files:**
- Modify: `src/utils/errors.ts`
- Modify: `src/client.ts`
- Test: `tests/unit/utils/errors.test.ts`

**Approach:**
1. Change `ErrorResponse` from `{ error: { code, message, suggestion? } }` to `{ code: string; message: string; suggestion?: string }`
2. Update `createErrorResponse` to return flat structure (remove `.error` wrapper)
3. Update `DEFAULT_API_ERROR` to flat structure
4. Update `formatErrorForMcp` to access `error.code` instead of `error.error.code`
5. `getErrorResponse` signature and return type stay the same (returns `ErrorResponse`)
6. `ApiResponse.error` in `client.ts` remains `ErrorResponse` - no change needed there
7. Update `handleApiError` return in `client.ts` error assignments if needed
8. Update all test assertions that reference the `.error.error` nesting

**Patterns to follow:**
- Keep `ErrorResponse` as the type name (not rename)
- Keep `getErrorResponse` and `formatErrorForMcp` function signatures stable

**Test scenarios:**
- Happy path: `createErrorResponse` returns `{ code, message, suggestion }` directly
- Happy path: `formatErrorForMcp` formats `{ code, message }` into `"Error [CODE]: message"`
- Happy path: `formatErrorForMcp` includes suggestion when present
- Happy path: `handleApiError` returns flat ErrorResponse for each status code (400, 401, 403, 404, 429, default)
- Integration: tool handlers still produce correct MCP error output through the full chain

**Verification:**
- No `.error.error` access patterns remain in the codebase
- All unit and integration tests pass
- TypeScript compilation succeeds with no type errors

---

- U4. **Freeze DEFAULT_API_ERROR**

**Goal:** Prevent callers from mutating the shared default error constant

**Requirements:** R4

**Dependencies:** U3 (DEFAULT_API_ERROR shape changes with the flatten)

**Files:**
- Modify: `src/utils/errors.ts`
- Test: `tests/unit/utils/errors.test.ts`

**Approach:**
1. Declare `DEFAULT_API_ERROR` with `as const satisfies ErrorResponse` for compile-time immutability
2. Have `getErrorResponse` return a shallow copy (`{ ...DEFAULT_API_ERROR }`) when falling back to the default, so callers get their own object

**Patterns to follow:**
- TypeScript `as const satisfies` pattern for typed constants

**Test scenarios:**
- Happy path: `getErrorResponse` with error present returns the error object
- Happy path: `getErrorResponse` with no error returns the default shape
- Edge case: two calls to `getErrorResponse({})` return equal but not identical objects (mutation isolation)

**Verification:**
- `DEFAULT_API_ERROR` cannot be assigned to at compile time
- Mutating a returned default does not affect subsequent calls

---

- U5. **Extract mcpErrorResult helper**

**Goal:** Replace 43 identical 7-line error blocks with a one-line helper call

**Requirements:** R3

**Dependencies:** U3 (uses the flattened ErrorResponse type)

**Files:**
- Modify: `src/utils/errors.ts`
- Modify: `src/tools/activities.ts`
- Modify: `src/tools/deals.ts`
- Modify: `src/tools/fields.ts`
- Modify: `src/tools/mail.ts`
- Modify: `src/tools/notes.ts`
- Modify: `src/tools/organizations.ts`
- Modify: `src/tools/persons.ts`
- Modify: `src/tools/pipelines.ts`
- Modify: `src/tools/users.ts`
- Test: `tests/unit/utils/errors.test.ts`

**Approach:**
1. Add `mcpErrorResult` function to `src/utils/errors.ts` that takes `{ error?: ErrorResponse }` and returns `{ content: [{ type: "text", text: string }], isError: true }`
2. Replace all 43 error blocks across 9 tool files with `return mcpErrorResult(response)`
3. Update imports in each tool file: replace `formatErrorForMcp, getErrorResponse` with `mcpErrorResult`
4. The `if (!response.success || !response.data)` check remains at each call site

**Patterns to follow:**
- `destructiveOperationGuard()` already returns the same `{ content, isError }` shape
- Tool files import from `../utils/errors.js`

**Test scenarios:**
- Happy path: `mcpErrorResult` with an error response returns `{ content: [{ type: "text", text: "Error [CODE]: msg" }], isError: true }`
- Happy path: `mcpErrorResult` with no error returns default error format
- Integration: each tool file's error path still produces correct MCP error output (covered by existing integration tests)

**Verification:**
- No inline `formatErrorForMcp(getErrorResponse(...))` patterns remain in tool files
- All 534+ tests pass
- `npm run build` succeeds

---

## System-Wide Impact

- **Error formatting chain:** U3 changes the internal type shape but `formatErrorForMcp` output (the string format) stays identical, so MCP clients see no change
- **Tool handler return type:** U5 changes implementation but not the return shape - all handlers still return `{ content: [...], isError?: true }`
- **Guard behavior:** U2 consolidates the env-var reading path but the boolean logic is identical - no behavioral change
- **API surface parity:** No external API changes

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| U3 type flatten touches many assertion sites in tests | Methodical find/replace of `.error.error` to `.error` in test files |
| U5 blast radius across 9 files | Mechanical replacement with grep verification; existing integration tests catch regressions |
| U2 guard calling getConfig() may throw in edge cases | Server startup already validates config; guard only runs after startup |

---

## Sources & References

- Related issues: #17, #18, #19, #20, #21
- Review artifact: `/tmp/compound-engineering/ce-code-review/20260505-163107-phase1-quickwins/review-summary.md`
- Residual findings: `docs/residual-review-findings/feat-phase1-quick-wins.md`
