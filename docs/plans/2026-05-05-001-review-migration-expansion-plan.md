# Pipedrive MCP Server: Review, Migration, and Expansion

**Date:** 2026-05-05
**Requirements:** `docs/brainstorms/pipedrive-mcp-review-and-migration-requirements.md`
**Deadline:** Pipedrive API v1 sunset July 31, 2026

## Overview

Three streams of work in priority order:

1. **Quick wins** - Delete gating, dead code, error handling, CLAUDE.md, ESLint (no API changes)
2. **v1-to-v2 migration** - Auth mechanism, pipelines, stages, fields (deadline-driven)
3. **Entity expansion** - Leads and Projects tools (new coverage)

Dependency upgrades (Zod 4, TypeScript 6, Vitest 3) are deferred to a separate effort after the migration ships - they risk destabilizing the codebase during the critical migration window.

---

## Phase 1: Quick Wins

No API changes. Each step is independently shippable.

### 1A. Gate destructive operations

Add `PIPEDRIVE_ENABLE_DESTRUCTIVE` env var (default `false`). When disabled, all delete tool handlers return an error explaining the operation is gated.

**Files to change:**
- `src/config.ts` - Add `enableDestructive: boolean` to `Config`, read from env
- `src/tools/deals.ts` - Guard `deleteDeal`
- `src/tools/persons.ts` - Guard `deletePerson`
- `src/tools/organizations.ts` - Guard `deleteOrganization`
- `src/tools/activities.ts` - Guard `deleteActivity`
- `src/tools/notes.ts` - Guard `deleteNote`
- `src/utils/errors.ts` - Add `DESTRUCTIVE_DISABLED` error code

**Implementation:**
- Add a shared guard function in `src/utils/errors.ts`:
  ```typescript
  export function destructiveOperationGuard(): McpToolResult | null
  ```
  Returns an error MCP response if destructive ops are disabled, `null` if allowed.
- Each delete handler calls this at the top and returns early if non-null.
- Update `.env.example` with `PIPEDRIVE_ENABLE_DESTRUCTIVE=false`

**Tests:**
- Unit test the guard function (enabled/disabled)
- Integration tests for each delete tool with the flag disabled
- Verify existing delete tests still pass when flag is enabled

### 1B. Remove dead code

**Files to change:**
- `src/utils/formatting.ts` - Remove `summarizeDeal`, `summarizePerson`, `summarizeOrganization`, `summarizeActivity`, `formatCurrency`, `formatDate`, `truncate` (if it exists). Keep only `createListSummary`.
- `src/tools/index.ts` - Remove unused re-exports of individual tool arrays (lines 63-72)

**Tests:**
- Remove corresponding unit tests for deleted functions from `tests/unit/utils/formatting.test.ts`
- Verify `createListSummary` tests remain and pass

### 1C. Standardize error handling

Every tool handler has this repeated fallback pattern:
```typescript
response.error || { error: { code: "API_ERROR", message: "Unknown error", suggestion: "..." } }
```

**Files to change:**
- `src/utils/errors.ts` - Add `DEFAULT_API_ERROR` constant and a helper:
  ```typescript
  export const DEFAULT_API_ERROR: ErrorResponse = createErrorResponse(
    "API_ERROR", "Unknown API error", "Check your API key and try again"
  );
  export function getErrorResponse(response: ApiResponse<unknown>): ErrorResponse {
    return response.error ?? DEFAULT_API_ERROR;
  }
  ```
- All tool files (`deals.ts`, `persons.ts`, `organizations.ts`, `activities.ts`, `notes.ts`, `mail.ts`, `fields.ts`, `pipelines.ts`, `users.ts`) - Replace inline fallback with `getErrorResponse(response)`
- All tool files - Add `isError: true` to error response objects (currently missing)

**Tests:**
- Unit test `getErrorResponse`
- Verify all integration tests still pass

### 1D. Fix `visible_to` type inconsistency

`src/schemas/persons.ts` uses `z.number()` for `visible_to` in `CreatePersonSchema` but `z.enum(['1','3','5','7'])` (strings) in `UpdatePersonSchema`.

**Files to change:**
- `src/schemas/persons.ts` - Standardize both to `z.number().optional()` with `.pipe(z.coerce.number())` or pick one consistent type. Check which the Pipedrive API actually expects (v2 uses numeric).

### 1E. Add CLAUDE.md

Create `CLAUDE.md` at project root with:
- Project description (MCP server for Pipedrive CRM)
- Common commands: `npm run build`, `npm test`, `npm run dev`
- Architecture: `src/client.ts` (API client), `src/tools/*.ts` (tool handlers), `src/schemas/*.ts` (Zod validation), `src/utils/*.ts` (shared helpers)
- Conventions: tools return `{content: [{type: "text", text: ...}]}`, error responses include `isError: true`, all tool inputs validated with Zod
- API version notes: which entities use v1 vs v2

### 1F. Configure ESLint

**Files to create:**
- `eslint.config.js` - Flat config with `@typescript-eslint/recommended`

**Install:**
- `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `typescript-eslint`

**Add script:** `"lint": "eslint src/"` to `package.json`

Fix any lint errors that surface. Likely candidates: the `as any` casts in `index.ts` and the `null as unknown as Config` in `client.ts`.

---

## Phase 2: v1-to-v2 Migration

These changes are deadline-driven (July 31, 2026). Each step depends on 2A (auth) being done first.

### 2A. Migrate auth mechanism for v2 calls

v2 endpoints require `x-api-token` header instead of `?api_token=` query param. v1 endpoints still use the query param.

**Files to change:**
- `src/client.ts` - In the `request()` method, branch on `version`:
  ```typescript
  if (version === "v2") {
    headers["x-api-token"] = this.config.apiKey;
  } else {
    url.searchParams.set("api_token", this.config.apiKey);
  }
  ```
  Remove the unconditional `url.searchParams.set("api_token", ...)` on line 124.

**Tests:**
- Update `tests/integration/client.test.ts` to verify v2 requests use header auth and v1 requests use query param auth
- Run full test suite to verify no regressions

**Risk:** Low. The existing v2 tools (deals, persons, organizations, activities) currently work with query param auth because Pipedrive still accepts it. After migration, they'll use the header. No behavioral change until Pipedrive drops query param support for v2.

### 2B. Migrate pipelines to v2

Currently in `src/tools/pipelines.ts`, `listPipelines` calls `/pipelines` with `"v1"`.

**Files to change:**
- `src/tools/pipelines.ts`:
  - `listPipelines`: Change to v2, add cursor pagination via `buildPaginationParamsV2`/`extractPaginationV2`, accept `cursor` and `limit` params
  - Update response handling for v2 field renames (`user_id` to `owner_id`, `active_flag` to `is_deleted`)
- `src/schemas/pipelines.ts` - Update `ListPipelinesSchema` to add `cursor` and `limit` params

**Tests:**
- Update `tests/integration/tools/pipelines.test.ts` for v2 response shapes
- Update `tests/unit/schemas/pipelines.test.ts` for new schema params

### 2C. Migrate stages to v2

Stages are also in `src/tools/pipelines.ts`. Currently `listStages` and `getStage` use `"v1"`.

**Files to change:**
- `src/tools/pipelines.ts`:
  - `listStages`: Change to v2 endpoint `/stages`, add cursor pagination
  - `getStage`: Change to v2 endpoint `/stages/{id}`
  - Handle v2 field renames
- `src/schemas/pipelines.ts` - Update stage schemas for v2 params

**Tests:** Same as 2B, stages section of the test file.

### 2D. Migrate fields to v2

Currently in `src/tools/fields.ts`, all three list handlers use v1 with offset pagination. v2 field endpoints became available December 2025.

**Files to change:**
- `src/tools/fields.ts`:
  - `listDealFields`, `listPersonFields`, `listOrganizationFields`: Change to v2 endpoints (`/dealFields`, `/personFields`, `/organizationFields`), switch from `buildPaginationParamsV1`/`extractPaginationV1` to v2 pagination
  - `getField`: Currently fetches first page and filters client-side. Check if v2 has a direct get-by-key endpoint. If not, implement proper pagination to search all pages. Note: v2 uses `field_key` not `field_id`.
  - Handle v2 response shape changes (custom fields may be nested differently)
- `src/schemas/fields.ts` - Update schemas for v2 params (replace `start: z.number()` with `cursor: z.string()`)

**Tests:**
- Update `tests/integration/tools/fields.test.ts` for v2 response shapes
- Update `tests/unit/schemas/fields.test.ts`
- Add test for `getField` pagination (currently untested edge case where field is beyond page 1)

### 2E. Clean up pagination utilities

After all v1 tools that have v2 equivalents are migrated, check if `buildPaginationParamsV1` and `extractPaginationV1` are still needed. They will be - notes, mail, and users still use v1. But verify and remove unused code if any.

**Files to check:**
- `src/utils/pagination.ts` - Verify v1 helpers are still imported
- Remove `PaginatedResponse<T>` interface if still unused after migration

---

## Phase 3: Entity Expansion

New tools. Can be worked in parallel with Phase 2 since they touch new files.

### 3A. Add Leads tools

Leads use a mix of v1 and v2 endpoints.

**Files to create:**
- `src/tools/leads.ts`
- `src/schemas/leads.ts`

**Files to modify:**
- `src/tools/index.ts` - Import and register lead tools

**Tools to implement:**

| Tool | Endpoint | Version | Notes |
|------|----------|---------|-------|
| `pipedrive_list_leads` | `GET /leads` | v1 | Offset pagination, returns active leads |
| `pipedrive_list_archived_leads` | `GET /leads` | v1 | Filter by `archived_status=archived` |
| `pipedrive_get_lead` | `GET /leads/{id}` | v1 | |
| `pipedrive_create_lead` | `POST /leads` | v1 | Required: `title`. Optional: `owner_id`, `person_id`, `organization_id`, `value`, `expected_close_date`, `label_ids` |
| `pipedrive_update_lead` | `PATCH /leads/{id}` | v1 | Same fields as create |
| `pipedrive_delete_lead` | `DELETE /leads/{id}` | v1 | Gated by destructive ops flag |
| `pipedrive_search_leads` | `GET /leads/search` | v2 | Uses v2 search with `term` param |

**Lead value schema:** Leads have a `value` object (`{amount, currency}`) instead of a flat number. Schema needs to handle this.

**Tests:**
- `tests/integration/tools/leads.test.ts` - Integration tests matching existing patterns
- `tests/unit/schemas/leads.test.ts` - Schema validation tests

### 3B. Add lead-to-deal conversion

This is a separate step because it introduces a new async polling pattern.

**Files to change:**
- `src/tools/leads.ts` - Add `convertLeadToDeal` handler

**Tool:** `pipedrive_convert_lead_to_deal`

**Implementation:**
1. `POST /api/v2/leads/{id}/convert/deal` returns `{conversion_id}`
2. Poll `GET /api/v2/leads/{id}/convert/status/{conversion_id}` until status is `completed` or `failed`
3. Return the created deal ID on success, error on failure
4. Cap polling at ~30 seconds with exponential backoff (500ms, 1s, 2s, 4s, 8s, 16s)
5. If still running after timeout, return the `conversion_id` and status so the caller can check later

**Decision:** Handle polling internally (blocking). Returning a conversion ID for the caller to poll would require a second tool and adds complexity for the MCP consumer. The conversion typically completes in under 5 seconds.

**Tests:**
- Mock the polling sequence (not_started -> running -> completed)
- Test timeout behavior
- Test failure status

### 3C. Add Projects tools

Projects use v2 endpoints. Requires the Projects add-on in Pipedrive (still in public beta).

**Files to create:**
- `src/tools/projects.ts`
- `src/schemas/projects.ts`

**Files to modify:**
- `src/tools/index.ts` - Import and register project tools

**Tools to implement:**

| Tool | Endpoint | Version | Notes |
|------|----------|---------|-------|
| `pipedrive_list_projects` | `GET /projects` | v2 | Cursor pagination |
| `pipedrive_get_project` | `GET /projects/{id}` | v2 | |
| `pipedrive_create_project` | `POST /projects` | v2 | Required: `title`, `board_id`, `phase_id` |
| `pipedrive_update_project` | `PATCH /projects/{id}` | v2 | |
| `pipedrive_delete_project` | `DELETE /projects/{id}` | v2 | Gated by destructive ops flag |
| `pipedrive_search_projects` | `GET /projects/search` | v2 | |
| `pipedrive_archive_project` | `PATCH /projects/{id}` | v2 | Set `status=archived` |
| `pipedrive_list_project_tasks` | `GET /projects/{id}/tasks` | v1 | Sub-resource, v1 only |

**Beta caveat:** Projects API is in public beta. Endpoints may change before GA. Tool descriptions should note this.

**Tests:**
- `tests/integration/tools/projects.test.ts`
- `tests/unit/schemas/projects.test.ts`

---

## Phase 4: Post-Migration Cleanup

After Phases 1-3 are merged and stable.

### 4A. Fix remaining code review findings

- **Remove `null as unknown as Config` type hole** in `src/client.ts` line 33. Use `Config | null` with a proper null check in `ensureInitialized`.
- **Remove API key length from error message** in `src/config.ts` line 27. Change to "Invalid PIPEDRIVE_API_KEY format" without leaking the length.
- **Remove API key from logged URLs** - `src/client.ts` line 143 logs the endpoint (not the full URL), so this is actually fine. Verify `error` object on line 125 of `src/index.ts` doesn't contain the URL with key. If it does, sanitize before logging.
- **Add `isError: true`** to all error responses in tool handlers (may already be done in 1C).
- **Add fetch timeout** in `src/client.ts` using `AbortSignal.timeout(30_000)`.
- **Fix `SortDirectionSchema` default** in `src/schemas/common.ts` - remove `.default('desc')` so `sort_direction` is only sent when the caller provides `sort_by`.

### 4B. Dependency upgrades (separate PR per upgrade)

These are lower priority and each carries risk. Do them one at a time after the migration is stable.

1. **MCP SDK** `^1.0.0` to latest 1.x - Should be safe, minor bump
2. **dotenv** `^17.2.3` to latest 17.x - Safe
3. **Zod** `^3.25.0` to 4.x - Breaking changes likely. Validate schema syntax still works. May need to rewrite `.transform()` or `.refine()` calls.
4. **TypeScript** `^5.0.0` to 6.x - Check for breaking config changes in `tsconfig.json`
5. **Vitest** `^1.0.0` to 3.x - Check for breaking test API changes

---

## Execution Order

```
Phase 1 (parallel, ~1-2 sessions each):
  1A. Delete gating
  1B. Dead code removal
  1C. Error handling standardization
  1D. visible_to fix
  1E. CLAUDE.md
  1F. ESLint setup

Phase 2 (sequential, 2A first):
  2A. Auth mechanism (prerequisite for 2B-2D)
  2B. Pipelines migration
  2C. Stages migration
  2D. Fields migration
  2E. Pagination cleanup

Phase 3 (parallel with Phase 2):
  3A. Leads tools
  3B. Lead-to-deal conversion
  3C. Projects tools

Phase 4 (after Phases 1-3 stable):
  4A. Remaining code fixes
  4B. Dependency upgrades (one at a time)
```

Phase 1 items are all independent and can be done in any order. Phase 2 must start with 2A, then 2B-2D can be done in any order. Phase 3 can run in parallel with Phase 2 since it creates new files. Phase 4 waits until everything else is merged.

---

## Open Decisions

1. **Response normalization**: Should v2 responses be transformed to match v1 field names (e.g. `owner_id` back to `user_id`) for backward compatibility? Or ship v2 field names and let MCP consumers adapt? **Recommendation:** Ship v2 field names. The MCP consumers are AI models that read field names dynamically. Normalizing adds a maintenance layer with no real benefit.

2. **Projects beta risk**: The Projects API may change before GA. **Recommendation:** Build it, note beta status in tool descriptions, and accept the risk of a breaking change requiring updates. The alternative (not building it) means the team has no Projects coverage.
