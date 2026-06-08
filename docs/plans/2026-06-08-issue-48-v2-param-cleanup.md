# Plan — Issue #48: v2 param cleanup and tool polish (invalid params, leads gaps, mail pagination)

Spec (authoritative, vendored): `docs/api/openapi-v2.yaml` (v2) and `docs/api/openapi-v1.yaml` (v1). Where spec ≠ issue text, **spec wins** — discrepancies are flagged inline.

This is **ONE issue / ONE PR** split into THREE write-disjoint intra-issue lanes (A / B / C). The lanes run in parallel inside a SINGLE shared worktree, so the per-lane file manifests in §6 are file-disjoint. Read your lane top-to-bottom; do NOT edit files outside your lane's manifest.

---

## 0. GLOBAL RULES (every lane MUST obey)

### 0.1 Zod is 4.4.3 / TS 6.0.3 / Vitest 4 (override any stale "Zod 3" note)
`package.json` pins `"zod": "^4.4.3"`, `"typescript": "^6.0.3"`, `"vitest": "^4.1.8"`. `engines.node >= 20`; CI matrix Node 20 & 22. Any memory/old-plan saying "Zod 3.25 / do not migrate" is **STALE — ignore it**. Match existing repo idioms:
- `z.email()` / `z.uuid()` (top-level, not `.string().email()`)
- `z.record(z.string(), z.unknown())` (explicit key schema)
- `Schema.extend({...})` (NOT `.merge`)
- `z.enum([...])`, `.optional()`, `.default(...)`, `.describe(...)`
- error inspection uses `error.issues` (not `.errors`)
Do NOT downgrade or "modernize" anything outside your assigned edits.

### 0.2 FALSE-GREEN HAZARD — why a green suite does NOT prove correctness
Two structural reasons this suite stays green while code is wrong (verified):
1. **`tsconfig.json:19` excludes `**/*.test.ts`** → test files are NEVER type-checked. A test can pass a param the Zod type forbids and `tsc` never complains.
2. **Per-entity + functional tests call handlers DIRECTLY** (e.g. `await searchDeals({term:'x'})`), bypassing the MCP dispatcher's `Schema.parse(...)`. So a handler test does NOT exercise the Zod schema, and a schema tightening does NOT fail those tests.

Consequence for THIS issue:
- **"Remove invalid query param"** → the authoritative guard is an **INTEGRATION** test asserting the param is NOT in the outgoing `fetch` URL/body (`expect(url).not.toContain('...')`). A UNIT "schema strips unknown key" test is WEAK alone (Zod strips unknowns on both old and new schemas), so it is NOT revert-proof by itself — pair it with the integration negative assertion.
- **"Add a param"** → UNIT test asserting `Schema.parse({...})` ACCEPTS it and returns it (revert-proof: old schema strips it → `expect(result.x).toBe(...)` fails on old src), PLUS an INTEGRATION test asserting it IS on the wire.
- **"Tighten enum / raise cap"** → UNIT test asserting the OLD-but-now-invalid value is REJECTED and the NEW valid value/limit is ACCEPTED (revert-proof: behavior differs between old and new schema).

### 0.3 Client method reference (read-only, all lanes)
`src/client.ts`: `get<T>(endpoint, params?: URLSearchParams, version="v2")`, `post<T>(endpoint, body, version="v2")`, `patch`, `delete`. v2 URL contains `/api/v2/`; v1 URL contains `/v1/`. `extractPaginationV1`/`extractPaginationV2` live in `src/utils/pagination.ts` (READ-ONLY — do not modify).

---

## 1. CLAIM-VERIFICATION TABLE (claim → spec verdict → exact citation)

All line numbers are in the vendored specs.

| # | Claim (from issue) | Verdict | Spec evidence |
|---|---|---|---|
| 1a | persons list `first_char` invalid in v2 | **CONFIRMED** | `first_char` has **0 matches** in all of `openapi-v2.yaml`. persons GET list params (`openapi-v2.yaml:7600`+, param block lines ~7616-7700) do not include it. |
| 1b | orgs list `first_char` invalid in v2 | **CONFIRMED** | Same: zero `first_char` anywhere in v2; orgs GET list (`openapi-v2.yaml:10487`+) lacks it. |
| 1c | activities `type` invalid in v2 | **CONFIRMED** | activities GET param block `openapi-v2.yaml:94-184` lists filter_id, ids, owner_id, deal_id, lead_id, person_id, org_id, done, updated_since, updated_until, sort_by, sort_direction, include_fields(enum=`attendees`), limit, cursor. **No `type`.** |
| 1d | activities `project_id` invalid in v2 | **CONFIRMED** | Not in `openapi-v2.yaml:94-184`. (NB: `project_id` exists on the activity *response* item line 243 and on the *create body*, but NOT as a list query param.) |
| 1e | activities `start_date` invalid in v2 | **CONFIRMED** | Not in `openapi-v2.yaml:94-184`. |
| 1f | activities `end_date` invalid in v2 | **CONFIRMED** | Not in `openapi-v2.yaml:94-184`. |
| 1g | projects list `board_id` invalid in v2 | **CONFIRMED** | projects GET param block `openapi-v2.yaml:19416-19459` = filter_id, status, phase_id, deal_id, person_id, org_id, limit, cursor. **No `board_id`.** |
| 1h | projects list `include_fields` invalid in v2 | **CONFIRMED** | Not in `openapi-v2.yaml:19416-19459`. |
| 1i | deals **create** `add_time` invalid in v2 | **CONFIRMED** | addDeal requestBody properties `openapi-v2.yaml:2156-2226` (title, owner_id, person_id, org_id, pipeline_id, stage_id, value, currency, is_deleted, is_archived, archive_time, status, probability, lost_reason, visible_to, close_time, won_time, lost_time, expected_close_date, label_ids, custom_fields). **No `add_time`.** |
| 1i-keep | persons POST `add_time` IS valid (do NOT remove) | **CONFIRMED (keep)** | addPerson body `openapi-v2.yaml:7967` has `add_time:`. |
| 1i-keep | orgs POST `add_time` IS valid (do NOT remove) | **CONFIRMED (keep)** | addOrganization body `openapi-v2.yaml:10766` has `add_time:`. |
| 2a | leads search `limit` cap 100→500 | **CONFIRMED** | `/leads/search` GET `limit` desc: "a maximum value of 500 is allowed" (`openapi-v2.yaml:16394-16398`). |
| 2b | leads search `include_fields` enum = `lead.was_seen` | **CONFIRMED** | `/leads/search` `include_fields` enum has exactly `lead.was_seen` (`openapi-v2.yaml:16386-16392`). |
| 2c | leads search add `fields` filter | **CONFIRMED** | `/leads/search` `fields` enum = `custom_fields, notes, title` (`openapi-v2.yaml:16362-16370`). |
| 2d | leads search add `person_id`, `organization_id` filters | **CONFIRMED** | `/leads/search` has `person_id` (`:16376`) and `organization_id` (`:16381`). Spec uses **`organization_id`** (not `org_id`). |
| 2e | lead convert forward `stage_id`/`pipeline_id` | **CONFIRMED** | `POST /leads/{id}/convert/deal` requestBody (`additionalProperties: false`) accepts EXACTLY `stage_id` and `pipeline_id` (`openapi-v2.yaml:16556-16568`). |
| 2f | optional standalone `get_lead_conversion_status` tool | **CONFIRMED (exists)** | `GET /leads/{id}/convert/status/{conversion_id}`, operationId `getLeadConversionStatus`, status enum `not_started,running,completed,failed,rejected` (`openapi-v2.yaml:16630-16702`). |
| 3 | mail returns remapped `next_start` instead of `extractPaginationV1` directly | **CONFIRMED** | `mail.ts:50-55,86-90,123-127` build `{next_start: parseInt(...), has_more}`; `notes.ts:65` returns `pagination` (raw `extractPaginationV1` = `{next_cursor, has_more}`) directly. |
| 4a | deals `include_fields` description is v1-style/wrong | **CONFIRMED** | Code says "deal_participants, products, followers, notes" (`deals.ts:269,283`; `schemas/deals.ts:46,56`). v2 deals-list enum (`openapi-v2.yaml:1888`+) and get-deal enum (`:2746`+ block) = `next_activity_id,last_activity_id,first_won_time,products_count,files_count,notes_count,followers_count,…,source_lead_id`. The string `deal_participants` is not a v2 value. |
| 4b | persons `include_fields` description v1-style | **NEEDS-LIVE-CHECK / minor** | Current persons text is generic ("Include additional data in response"), not strictly v1-wrong. v2 persons enum (`openapi-v2.yaml:7670`+ and get-person `:8290`+) = `next_activity_id,…,open_deals_count,…,doi_status,smart_bcc_email`. Recommend tightening the description to name real v2 values; low-risk. |

### REFUTED items
**None.** Every issue bullet is supported by the v2 spec. Nothing is dropped for being spec-contradicted.

### BONUS spec findings (out of strict scope — see §7)
- **projects SEARCH `include_fields` is ALSO invalid in v2.** `/projects/search` params (`openapi-v2.yaml:20483`, block lines ~20500-20540) = term, fields(enum custom_fields/notes/title/description), exact_match, person_id, organization_id, limit, cursor. **No `include_fields`.** Current `searchProjects` sends `include_fields` (`projects.ts:227`) and the test at `tests/integration/tools/projects.test.ts:408-415` asserts `include_fields=tasks` — a FALSE-GREEN. This lives in the SAME files as Lane A's projects work; see §3.4-OPT for an optional, spec-backed extension.
- **projects LIST supports `deal_id`/`person_id`/`org_id` filters** the code does not expose (`openapi-v2.yaml:19433-19447`). Additive only; NOT in scope for #48.
- **leads search currently extracts NO pagination** (`leads.ts:234-259` never calls `extractPaginationV2`), unlike deals/persons/orgs search. Adding it is in-scope-adjacent for Lane B and recommended (see §3.B.4).

---

## 2. CURRENT CODE PATH per param — the (a) Zod schema / (b) hand-written inputSchema JSON / (c) handler forward

> Reminder: inputSchema JSON literals in `src/tools/*.ts` are hand-maintained and NOT generated from Zod. All three of (a)(b)(c) must change to truly remove/add a param.

### 2.1 persons `first_char` (Lane A)
- (a) `src/schemas/persons.ts:44-45` — `first_char: z.string().length(1).optional()...`
- (b) `src/tools/persons.ts:244` — `first_char: { type: "string", description: "Filter by first character of name" },`
- (c) `src/tools/persons.ts:36` — `if (params.first_char) queryParams.set("first_char", params.first_char);` **(currently SENT)**

### 2.2 organizations `first_char` (Lane A)
- (a) `src/schemas/organizations.ts:54-55`
- (b) `src/tools/organizations.ts:235`
- (c) `src/tools/organizations.ts:35` **(currently SENT)**

### 2.3 activities `type` (Lane A)
- (a) `src/schemas/activities.ts:61-62` — `type: z.string().optional()...`
- (b) `src/tools/activities.ts:235`
- (c) `src/tools/activities.ts:38` — `if (params.type) queryParams.set("type", params.type);` **(SENT)**
- NB: `type` is ALSO a CREATE/UPDATE body field (`activities.ts:106,154`, schema `:95,145`) — that is the `ActivityTypeSchema` and is **valid for create/update**. Do NOT touch create/update `type`. Only the **list** filter `type` is invalid.

### 2.4 activities `project_id` (Lane A)
- (a) `src/schemas/activities.ts:59-60`
- (b) `src/tools/activities.ts:234`
- (c) `src/tools/activities.ts:37` **(SENT)**
- NB: `project_id` is also a valid create/update body field (`activities.ts:117,163`). Keep those. Remove only the **list** filter.

### 2.5 activities `start_date` / `end_date` (Lane A)
- (a) `src/schemas/activities.ts:65-68` — both `OptionalDateSchema`
- (b) `src/tools/activities.ts:237-238`
- (c) `src/tools/activities.ts:40-41` **(SENT)**

### 2.6 projects list `board_id` (Lane A)
- (a) `src/schemas/projects.ts:23-24`
- (b) `src/tools/projects.ts:291`
- (c) `src/tools/projects.ts:42` **(SENT)**
- NB: `board_id` is a valid create/update body field (`projects.ts:97,138`, schema `:40,71`). Keep those. Remove only the **list** filter.

### 2.7 projects list `include_fields` (Lane A)
- (a) `src/schemas/projects.ts:25-26`
- (b) `src/tools/projects.ts:292`
- (c) `src/tools/projects.ts:43` **(SENT)**

### 2.8 deals **create** `add_time` (Lane A)
- (a) `src/schemas/deals.ts:89-90` (`CreateDealSchema.add_time`)
- (b) `src/tools/deals.ts:310` (`pipedrive_create_deal` inputSchema)
- (c) `src/tools/deals.ts:120` — `if (params.add_time) body.add_time = params.add_time;` **(SENT in create body)**
- NB: do NOT touch persons (`schemas/persons.ts:87`, `tools/persons.ts:112,309`) or orgs (`schemas/organizations.ts:93`, `tools/organizations.ts:108,288`) `add_time` — valid per spec (claim 1i-keep).

### 2.9 deals `include_fields` descriptions (Lane A, item 4a)
- deals list: (a) `src/schemas/deals.ts:45-46`, (b) `src/tools/deals.ts:269`
- get-deal: (a) `src/schemas/deals.ts:55-56`, (b) `src/tools/deals.ts:283`
- These are description-only edits (the param itself stays valid). No handler change.

### 2.10 persons `include_fields` descriptions (Lane A, item 4b — minor)
- persons list: (a) `src/schemas/persons.ts:54-55`, (b) `src/tools/persons.ts:249`
- get-person: (a) `src/schemas/persons.ts:64-65`, (b) `src/tools/persons.ts:263`
- Description-only.

### 2.11 leads search `limit` cap + `include_fields` enum + new `fields`/`person_id`/`organization_id` (Lane B)
- (a) `src/schemas/leads.ts:114-125` (`SearchLeadsSchema`)
- (b) `src/tools/leads.ts:477-486` (`pipedrive_search_leads` inputSchema)
- (c) `src/tools/leads.ts:234-259` (`searchLeads` handler) — currently sets term, exact_match, limit, cursor, include_fields. Does NOT forward fields/person_id/organization_id (they don't exist yet) and does NOT call `extractPaginationV2`.

### 2.12 lead convert `stage_id`/`pipeline_id` (Lane B)
- (a) `src/schemas/leads.ts:109` (`ConvertLeadToDealSchema = LeadIdSchema`) — id only.
- (b) `src/tools/leads.ts:507-512` (`pipedrive_convert_lead_to_deal` inputSchema) — id only.
- (c) `src/tools/leads.ts:279-283` (`convertLeadToDeal`) — POSTs `{}` (empty body). Must forward stage_id/pipeline_id when present.

### 2.13 optional `get_lead_conversion_status` tool (Lane B)
- New schema in `src/schemas/leads.ts`, new handler + tool object appended to `leadsTools` in `src/tools/leads.ts`.
- `src/tools/index.ts` spreads `...leadsTools` (`index.ts:15,27`) → **appending to the `leadsTools` array needs NO `index.ts` edit. CONFIRMED.**

### 2.14 mail pagination output (Lane C, item 3)
- (c only) `src/tools/mail.ts:50-55` (getPersonEmails), `:86-90` (getDealEmails), `:123-127` (listMailThreads). Replace the `pagination: { next_start: ..., has_more }` object with `pagination` (the raw `extractPaginationV1` result) — exactly as `notes.ts:65`. No schema/inputSchema change (mail stays v1; `start`/`limit` inputs are unaffected).

---

## 3. PER-PARAM CHANGE INSTRUCTIONS

### LANE A — entity params + descriptions
Owns: `src/schemas/{persons,organizations,activities,projects,deals}.ts`, `src/tools/{persons,organizations,activities,projects,deals}.ts`, and their unit + integration test files. Covers issue items 1 and 4.

#### 3.1 Remove `first_char` (persons + orgs)
- DELETE schema key: `src/schemas/persons.ts:44-45` and `src/schemas/organizations.ts:54-55`.
- DELETE inputSchema line: `src/tools/persons.ts:244` and `src/tools/organizations.ts:235`.
- DELETE handler forward: `src/tools/persons.ts:36` and `src/tools/organizations.ts:35`.

#### 3.2 Remove activities list filters `type`, `project_id`, `start_date`, `end_date`
- DELETE schema keys: `src/schemas/activities.ts:59-60` (project_id), `:61-62` (type), `:65-68` (start_date, end_date). **Leave** create/update `type` (`:95,145`) and `project_id` (`:113,163`).
- DELETE inputSchema lines: `src/tools/activities.ts:234` (project_id), `:235` (type), `:237-238` (start_date, end_date) — in the `pipedrive_list_activities` block only. **Leave** create/update inputSchema entries for `type`/`project_id`.
- DELETE handler forwards: `src/tools/activities.ts:37` (project_id), `:38` (type), `:40-41` (start_date, end_date).
- IMPORT note: `OptionalDateSchema` is still used by create/update (`:97,147`) → keep the import in `schemas/activities.ts`. No unused-import risk.

#### 3.3 Remove projects list `board_id` + `include_fields`
- DELETE schema keys: `src/schemas/projects.ts:23-24` (board_id), `:25-26` (include_fields). **Leave** create/update `board_id` (`:40,71`).
- DELETE inputSchema lines: `src/tools/projects.ts:291` (board_id), `:292` (include_fields) — `pipedrive_list_projects` block only.
- DELETE handler forwards: `src/tools/projects.ts:42` (board_id), `:43` (include_fields).

#### 3.3-OPT (recommended, spec-backed) projects SEARCH `include_fields`
projects SEARCH `include_fields` is invalid in v2 (BONUS finding §1). Same files as 3.3. If included:
- DELETE `src/schemas/projects.ts:110-111` (`SearchProjectsSchema.include_fields`).
- DELETE `src/tools/projects.ts:380` (search inputSchema `include_fields`).
- DELETE `src/tools/projects.ts:227` (search handler forward).
- FIX the false-green test `tests/integration/tools/projects.test.ts:408-415` (see §4 Lane A guards).
This is OPTIONAL but strongly recommended (clean, in-file, spec-supported). If the implementer prefers to keep #48 strictly to the issue's literal bullets, defer this to a follow-up issue and leave `searchProjects` untouched — but then DO NOT change the §4 projects-search guard either.

#### 3.4 Remove deals **create** `add_time`
- DELETE schema key: `src/schemas/deals.ts:89-90` (`CreateDealSchema.add_time`).
- DELETE inputSchema line: `src/tools/deals.ts:310` (`pipedrive_create_deal`).
- DELETE handler forward: `src/tools/deals.ts:120`.
- DO NOT touch persons/orgs `add_time`.

#### 3.5 Fix `include_fields` descriptions (item 4)
Description-only; no handler/param change. Replace the v1-style text. Suggested copy (use a representative subset of the real v2 enum to keep it short):
- deals list `src/schemas/deals.ts:46` + `src/tools/deals.ts:269`: e.g. `"Comma-separated extra fields (v2 enum, e.g. next_activity_id, last_activity_id, products_count, files_count, notes_count, followers_count)"`.
- get-deal `src/schemas/deals.ts:56` + `src/tools/deals.ts:283`: same v2 wording.
- (minor) persons list `src/schemas/persons.ts:55` + `src/tools/persons.ts:249` and get-person `src/schemas/persons.ts:65` + `src/tools/persons.ts:263`: e.g. `"Comma-separated extra fields (v2 enum, e.g. next_activity_id, open_deals_count, won_deals_count, notes_count, followers_count)"`.
No test asserts these description strings (verified) — safe to edit.

### LANE B — leads
Owns: `src/schemas/leads.ts`, `src/tools/leads.ts`, `tests/unit/schemas/leads.test.ts`, `tests/integration/tools/leads.test.ts`. Covers issue item 2.

#### 3.B.1 `SearchLeadsSchema` — raise cap, tighten enum, add filters
Replace `src/schemas/leads.ts:114-125` with:
```ts
export const SearchLeadsSchema = z.object({
  term: SearchTermSchema
    .describe("Search term for lead title, notes, or custom fields"),
  fields: z.string().optional()
    .describe("Comma-separated fields to search (allowed: title, notes, custom_fields). Defaults to all."),
  person_id: z.number().int().positive().optional()
    .describe("Filter leads by linked person ID"),
  organization_id: z.number().int().positive().optional()
    .describe("Filter leads by linked organization ID"),
  include_fields: z.enum(["lead.was_seen"]).optional()
    .describe("Optional extra fields to include (v2: only 'lead.was_seen')"),
  exact_match: z.boolean().optional().default(false)
    .describe("Use exact match instead of fuzzy search"),
  limit: z.number().min(1).max(500).optional().default(50)
    .describe("Number of results to return (1-500, default 50)"),
  cursor: z.string().optional()
    .describe("Cursor for pagination (from previous response)"),
});
```
Rationale per spec citation 2a-2d: cap 500, `include_fields` enum `lead.was_seen`, add `fields`/`person_id`/`organization_id`, keep default 50 (repo convention; spec default is 100 but our list helpers default 50 — keeping 50 is consistent and the issue says "align default", which we read as "keep default ≤ cap"; do NOT set default 500).

#### 3.B.2 `searchLeads` handler — forward new params + add pagination
Replace `src/tools/leads.ts:234-259` body with:
```ts
export async function searchLeads(params: SearchLeadsParams) {
  const client = getClient();

  const queryParams = new URLSearchParams();
  queryParams.set("term", params.term);
  if (params.fields) queryParams.set("fields", params.fields);
  if (params.person_id) queryParams.set("person_id", String(params.person_id));
  if (params.organization_id) queryParams.set("organization_id", String(params.organization_id));
  if (params.include_fields) queryParams.set("include_fields", params.include_fields);
  if (params.exact_match) queryParams.set("exact_match", "true");
  if (params.limit) queryParams.set("limit", String(params.limit));
  if (params.cursor) queryParams.set("cursor", params.cursor);

  const response = await client.get<{ items?: unknown[] }>("/leads/search", queryParams, "v2");

  if (!response.success || !response.data) {
    return mcpErrorResult(response);
  }

  const pagination = extractPaginationV2(response);

  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        summary: `Search results for "${params.term}"`,
        data: response.data,
        pagination,
      }, null, 2),
    }],
  };
}
```
IMPORTANT IMPORT EDIT: `extractPaginationV2` is NOT currently imported in `leads.ts` (line 24 imports only V1 helpers). ADD it: change `src/tools/leads.ts:24` to
`import { buildPaginationParamsV1, extractPaginationV1, extractPaginationV2 } from "../utils/pagination.js";`
(V1 helpers stay — still used by list/archived list.)

#### 3.B.3 `pipedrive_search_leads` inputSchema
Replace `src/tools/leads.ts:477-486` `properties` with:
```ts
        term: { type: "string", description: "Search term (required)" },
        fields: { type: "string", description: "Comma-separated fields to search (title, notes, custom_fields). Defaults to all." },
        person_id: { type: "number", description: "Filter by linked person ID" },
        organization_id: { type: "number", description: "Filter by linked organization ID" },
        include_fields: { type: "string", enum: ["lead.was_seen"], description: "Optional extra field: only 'lead.was_seen'" },
        exact_match: { type: "boolean", description: "Use exact match instead of fuzzy search" },
        limit: { type: "number", description: "Number of results (1-500, default 50)" },
        cursor: { type: "string", description: "Cursor for pagination" },
```

#### 3.B.4 `ConvertLeadToDealSchema` — add stage_id/pipeline_id
Replace `src/schemas/leads.ts:104-109` (the comment + schema) with:
```ts
/**
 * Convert lead to deal parameters (v2 POST /leads/{id}/convert/deal).
 * stage_id/pipeline_id are the only body fields the v2 convert endpoint accepts
 * (openapi-v2.yaml:16556-16568, additionalProperties:false). Per spec, if both are
 * sent pipeline_id is ignored in favor of stage_id; we forward whatever is provided.
 */
export const ConvertLeadToDealSchema = LeadIdSchema.extend({
  stage_id: z.number().int().positive().optional()
    .describe("Stage ID for the created deal (a pipeline is inferred from the stage)"),
  pipeline_id: z.number().int().positive().optional()
    .describe("Pipeline ID for the created deal (ignored if stage_id is also given)"),
});
```

#### 3.B.5 `convertLeadToDeal` handler — forward body
In `src/tools/leads.ts:279-283`, replace the empty-body POST with a built body:
```ts
  const convertBody: Record<string, unknown> = {};
  if (params.stage_id) convertBody.stage_id = params.stage_id;
  if (params.pipeline_id) convertBody.pipeline_id = params.pipeline_id;

  // 1. Kick off the async conversion.
  const startResponse = await client.post<{ conversion_id?: string }>(
    `/leads/${params.id}/convert/deal`,
    convertBody,
    "v2",
  );
```
(When neither is supplied the body is `{}` — preserves current behavior and keeps the existing empty-body test green.)

#### 3.B.6 `pipedrive_convert_lead_to_deal` inputSchema
Replace `src/tools/leads.ts:509-512` `properties` with:
```ts
        id: { type: "string", description: "Lead UUID to convert" },
        stage_id: { type: "number", description: "Stage ID for the created deal (pipeline inferred from stage)" },
        pipeline_id: { type: "number", description: "Pipeline ID for the created deal (ignored if stage_id is given)" },
```
(`required: ["id"]` stays.)

#### 3.B.7 (OPTIONAL, recommended) standalone `get_lead_conversion_status` tool
The endpoint exists (citation 2f). Add:
- Schema in `src/schemas/leads.ts` (after `ConvertLeadToDealSchema`):
```ts
/**
 * Get lead conversion status (v2 GET /leads/{id}/convert/status/{conversion_id}).
 */
export const GetLeadConversionStatusSchema = LeadIdSchema.extend({
  conversion_id: z.uuid().describe("Conversion job UUID returned by the convert call"),
});
```
and a type export: `export type GetLeadConversionStatusParams = z.infer<typeof GetLeadConversionStatusSchema>;`
- Handler in `src/tools/leads.ts` (after `convertLeadToDeal`):
```ts
export async function getLeadConversionStatus(params: GetLeadConversionStatusParams) {
  const client = getClient();
  const response = await client.get<Record<string, unknown>>(
    `/leads/${params.id}/convert/status/${params.conversion_id}`,
    undefined,
    "v2",
  );
  if (!response.success || !response.data) {
    return mcpErrorResult(response);
  }
  return {
    content: [{
      type: "text" as const,
      text: JSON.stringify({
        summary: `Conversion ${params.conversion_id} status: ${String(response.data.status ?? "unknown")}`,
        data: response.data,
      }, null, 2),
    }],
  };
}
```
- Import the new schema + type at the top of `leads.ts`, and APPEND a tool object to the `leadsTools` array (name `pipedrive_get_lead_conversion_status`, inputSchema with `id` + `conversion_id`, both required, `handler: getLeadConversionStatus`, `schema: GetLeadConversionStatusSchema`).
- **No `src/tools/index.ts` edit** (it spreads `...leadsTools`). If a smoke test asserts an exact tool COUNT, bump it (search for it; see §4 Lane B note). If implementer wants to keep the PR minimal, this whole sub-item may be deferred — it is explicitly "optional" in the issue. If deferred, also skip its guard test.

### LANE C — mail pagination
Owns: `src/tools/mail.ts`, `tests/integration/tools/mail.test.ts`. Covers issue item 3.

#### 3.C.1 Return `extractPaginationV1` result directly (3 sites)
In `src/tools/mail.ts`, in `getPersonEmails` (`:50-53`), `getDealEmails` (`:86-89`), and `listMailThreads` (`:123-126`), replace:
```ts
        pagination: {
          next_start: pagination.next_cursor ? parseInt(pagination.next_cursor) : undefined,
          has_more: pagination.has_more,
        },
```
with:
```ts
        pagination,
```
exactly as `notes.ts:65`. The local `const pagination = extractPaginationV1(response);` already exists in each function (`:42,78,115`). No other change. (`getMailThread`/`getMailMessage` have no pagination — leave them.)

> Output contract change: the JSON `pagination` field shifts from `{next_start?: number, has_more}` to `{next_cursor?: string, has_more}`. `extractPaginationV1` maps v1 `next_start` (number) → `next_cursor` (string). This standardizes mail with notes/leads. Document in the PR.

---

## 4. GUARD TESTS per lane (the real regression gates)

### LANE A guards

**persons** — `tests/integration/tools/persons.test.ts:40-55` ("should pass filter parameters") is FALSE-GREEN (asserts `first_char=A` IS sent). FIX: remove `first_char: 'A'` from the input object and replace `expect(url).toContain('first_char=A')` (line 54) with `expect(url).not.toContain('first_char')`. Keep owner_id/org_id assertions.
- UNIT `tests/unit/schemas/persons.test.ts`: remove `first_char: 'A'` from the params object at `:82` and the assertion `expect(result.first_char).toBe('A')` at `:92`; DELETE the whole `should validate first_char is single character` test (`:96-100`). (These FAIL after removal — `result.first_char` becomes undefined.) ADD: `it('should strip first_char (invalid in v2)', () => { const r = ListPersonsSchema.parse({ first_char: 'A' } as Record<string, unknown>); expect((r as Record<string, unknown>).first_char).toBeUndefined(); });` (weak alone; the strong guard is the integration `not.toContain`).

**organizations** — `tests/integration/tools/organizations.test.ts:39-53` FALSE-GREEN. FIX: remove `first_char: 'A'` from input, replace `expect(url).toContain('first_char=A')` (`:52`) with `expect(url).not.toContain('first_char')`.
- UNIT `tests/unit/schemas/organizations.test.ts`: remove `first_char: 'A'` (`:31`) + `expect(result.first_char).toBe('A')` (`:41`); DELETE `should validate first_char` test (`:45-46`). ADD a strip assertion as above.

**activities** — `tests/integration/tools/activities.test.ts:39-61` FALSE-GREEN (passes `type`/`start_date`/`end_date`, asserts `type=call` at `:58`). FIX: remove `type/start_date/end_date` from the input object; replace `expect(url).toContain('type=call')` (`:58`) with negatives:
```ts
      expect(url).not.toContain('type=');
      expect(url).not.toContain('start_date');
      expect(url).not.toContain('end_date');
      expect(url).not.toContain('project_id');
```
Keep owner_id/deal_id/person_id/done assertions.
- UNIT `tests/unit/schemas/activities.test.ts`: remove `start_date`/`end_date`/`type`/`project_id` from the "accept all filter parameters" params (`:30,34,35,37,38`) and the `expect(result.type).toBe('call')` assertion (`:49`); DELETE the LIST-schema date tests `should validate date format for start_date and end_date` (`:66-73`) and `should reject invalid date format` (`:75-77`). (Both FAIL after removal.) ADD: `it('should strip removed v2 list filters', () => { const r = ListActivitiesSchema.parse({ type: 'call', start_date: '2024-01-01', project_id: 1 } as Record<string, unknown>); const o = r as Record<string, unknown>; expect(o.type).toBeUndefined(); expect(o.start_date).toBeUndefined(); expect(o.project_id).toBeUndefined(); });`
- NB: create/update activity tests that use `type`/`project_id` in the BODY are unaffected — do not touch them.

**projects** — `tests/integration/tools/projects.test.ts:74-85` ("should pass filter parameters to API") FALSE-GREEN (asserts `board_id=1`). FIX: remove `board_id: 1` from the input (`:78`), replace `expect(url).toContain('board_id=1')` (`:81`) with `expect(url).not.toContain('board_id')` and add `expect(url).not.toContain('include_fields')`. Keep phase_id/status/filter_id assertions.
- UNIT `tests/unit/schemas/projects.test.ts:26-44` ("should accept all filter parameters"): remove `board_id: 3` (`:33`) and `include_fields: 'tasks,activities'` (`:34`) from params; DELETE assertions `expect(result.board_id).toBe(3)` (`:42`) and `expect(result.include_fields).toBe('tasks,activities')` (`:43`). ADD a strip assertion for board_id/include_fields on `ListProjectsSchema`.
- create/update project tests using `board_id` (`:33,42,89-191`) are VALID — do not touch.
- If §3.3-OPT (projects SEARCH include_fields) is done: FIX `tests/integration/tools/projects.test.ts:408-415` — replace the body with `await searchProjects({ term: 'test', include_fields: 'tasks' } as Record<string, unknown>); ... expect(url).not.toContain('include_fields');`. If §3.3-OPT is NOT done, leave that test as-is.

**deals create add_time** — `tests/unit/schemas/deals.test.ts:115-141` ("should accept all create parameters") passes `add_time` (`:131`) but asserts nothing on it → stays green (false-green). FIX: remove `add_time: '2024-01-01T00:00:00Z'` from the params (`:131`). ADD: `it('should strip add_time (not a v2 create field)', () => { const r = CreateDealSchema.parse({ title: 'x', add_time: '2024-01-01T00:00:00Z' } as Record<string, unknown>); expect((r as Record<string, unknown>).add_time).toBeUndefined(); });`
- INTEGRATION (strong guard) `tests/integration/tools/deals.test.ts` createDeal describe: ADD a test asserting `add_time` is NOT in the POST body:
```ts
    it('should not send add_time in the create body (invalid in v2)', async () => {
      const mockFn = mockApiSuccess(fixtures.deal);
      const { createDeal } = await getDealsTools();
      await createDeal({ title: 'X', add_time: '2024-01-01T00:00:00Z' } as Record<string, unknown>);
      const [, options] = mockFn.mock.calls[0];
      expect(JSON.parse(options.body)).not.toHaveProperty('add_time');
    });
```
(Match the file's existing createDeal harness — it already imports `getDealsTools`/`mockApiSuccess`/`fixtures`. Verify the local accessor name before writing.)
- deals/persons/orgs `add_time` for persons/orgs create stays valid — no negative test there.

> **Lane A revert-proof** (reviewer keeps new tests, `git checkout origin/main -- <Lane A src>`, re-runs): the integration `not.toContain('first_char')` / `not.toContain('type=')` / `not.toContain('board_id')` and the deal-create `not.toHaveProperty('add_time')` MUST FAIL on old src (old handlers DO send those). The unit "strip" tests are weak (pass on both); they are documentation, not the gate.

### LANE B guards (leads)

UNIT `tests/unit/schemas/leads.test.ts`:
- `SearchLeadsSchema` block (`:338-380`): the "accept all optional fields" test (`:358-372`) passes `include_fields: 'person,organization'` (now INVALID) → it will THROW on parse → FAILS. FIX: change to `include_fields: 'lead.was_seen'` and assert `expect(result.include_fields).toBe('lead.was_seen')`. The "should reject limit over 100" test (`:378-379`) is now WRONG (cap is 500) → FIX to:
```ts
    it('should accept limit up to 500', () => {
      expect(SearchLeadsSchema.parse({ term: 't', limit: 500 }).limit).toBe(500);
      expect(SearchLeadsSchema.parse({ term: 't', limit: 101 }).limit).toBe(101);
    });
    it('should reject limit over 500', () => {
      expect(() => SearchLeadsSchema.parse({ term: 't', limit: 501 })).toThrow();
    });
```
  (Revert-proof: `parse({limit:101})` SUCCEEDS on new schema but `parse({limit:501})` THROWS only on new schema; on old schema `limit:101` THROWS → `accept limit up to 500` FAILS on old src.)
- ADD acceptance for new filters + enum:
```ts
    it('should accept fields, person_id, organization_id (v2 search filters)', () => {
      const r = SearchLeadsSchema.parse({ term: 'x', fields: 'title,notes', person_id: 1, organization_id: 2 });
      expect(r.fields).toBe('title,notes');
      expect(r.person_id).toBe(1);
      expect(r.organization_id).toBe(2);
    });
    it('should reject an include_fields value other than lead.was_seen', () => {
      expect(() => SearchLeadsSchema.parse({ term: 'x', include_fields: 'person' })).toThrow();
    });
```
  (Revert-proof: `expect(r.fields).toBe('title,notes')` fails on old schema which strips `fields`; the enum-reject fails on old schema which accepted any string.)
- `ConvertLeadToDealSchema` block (`:319-336`): ADD:
```ts
    it('should accept optional stage_id and pipeline_id', () => {
      const r = ConvertLeadToDealSchema.parse({ id: VALID_UUID, stage_id: 3, pipeline_id: 4 });
      expect(r.stage_id).toBe(3);
      expect(r.pipeline_id).toBe(4);
    });
```
  (Revert-proof: old schema strips them → `expect(r.stage_id).toBe(3)` fails.)
- If §3.B.7 added: ADD a `GetLeadConversionStatusSchema` describe asserting it requires `id` (UUID) + `conversion_id` (UUID) and rejects a non-UUID `conversion_id`.

INTEGRATION `tests/integration/tools/leads.test.ts`:
- `searchLeads` "should pass include_fields when provided" (`:385-393`) asserts the INVALID `include_fields=person%2Corganization`. FIX: change input to `include_fields: 'lead.was_seen'` and assert `expect(url).toContain('include_fields=lead.was_seen')` (URL-encodes the dot? No — `.` is safe; `lead.was_seen` encodes as `lead.was_seen`). Then ADD:
```ts
    it('should pass fields, person_id, organization_id on the wire', async () => {
      const mockFn = mockApiSuccess({ items: [] });
      const { searchLeads } = await getLeadsTools();
      await searchLeads({ term: 't', fields: 'title,notes', person_id: 1, organization_id: 2 });
      const [url] = mockFn.mock.calls[0];
      expect(url).toContain('fields=title%2Cnotes');
      expect(url).toContain('person_id=1');
      expect(url).toContain('organization_id=2');
    });
    it('should parse next_cursor from v2 leads search response', async () => {
      mockFetch({ data: { items: [] }, additional_data: { next_cursor: 'NEXT' } });
      const { searchLeads } = await getLeadsTools();
      const result = await searchLeads({ term: 'x' });
      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.pagination.next_cursor).toBe('NEXT');
      expect(parsed.pagination.has_more).toBe(true);
    });
```
  (Revert-proof: old handler never sets `fields/person_id/organization_id` and never builds `pagination` → both new tests FAIL on old src. The pagination test would throw on `parsed.pagination` being undefined on old src.)
- `convertLeadToDeal` "should POST ... with an empty body" (`:426-440`) STAYS green (no-arg case still `{}`). ADD a positive body test:
```ts
    it('should forward stage_id/pipeline_id in the convert body', async () => {
      const mockFn = mockFetch([
        { status: 200, data: { conversion_id: 'c1' } },
        { status: 200, data: { status: 'completed', deal_id: 7 } },
      ]);
      const { convertLeadToDeal } = await getLeadsTools();
      await convertLeadToDeal({ id: VALID_UUID, stage_id: 3, pipeline_id: 4 }, noSleep);
      const [, postOptions] = mockFn.mock.calls[0];
      expect(JSON.parse(postOptions.body)).toEqual({ stage_id: 3, pipeline_id: 4 });
    });
```
  (Revert-proof: old handler always sends `{}` → `toEqual({stage_id:3,pipeline_id:4})` FAILS on old src.)
- If §3.B.7 added: ADD a `getLeadConversionStatus` describe asserting it GETs `/api/v2/leads/{id}/convert/status/{conversion_id}` and returns the status from `data`.
- **Tool-count smoke test (LOCATED):** `tests/integration/tools/leads.test.ts:539-554` ("should have all 8 leads tools registered in allTools") lists 8 lead tool names in `leadToolNames` and asserts each is in `allTools`. This file IS in Lane B's manifest. If §3.B.7 adds `pipedrive_get_lead_conversion_status`: update the test title to "all 9 leads tools" and append `'pipedrive_get_lead_conversion_status'` to the `leadToolNames` array (`:541-550`). If §3.B.7 is deferred, leave this test as-is. No `src/tools/index.ts` change either way.

> **Lane B revert-proof:** the `fields/person_id/organization_id` wire assertions, the `limit ≤ 500` acceptance, the `lead.was_seen`-only enum reject, and the convert positive-body `toEqual` all FAIL on origin/main src.

### LANE C guards (mail)
There is currently **NO** test asserting mail's output `pagination` shape (`mail.test.ts` only checks `start=`/`limit=` on the URL). So nothing breaks, but the fix needs NEW guards. ADD to `tests/integration/tools/mail.test.ts` (it already imports `mockFetch`/`mockApiSuccess`/`paginationFixtures`/`getMailTools`):
```ts
    it('getPersonEmails returns extractPaginationV1 shape (next_cursor, not next_start)', async () => {
      mockFetch({ data: [fixtures? /* any array */], additional_data: paginationFixtures.v1WithMore });
      const { getPersonEmails } = await getMailTools();
      const result = await getPersonEmails({ id: 1 });
      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.pagination.has_more).toBe(true);
      expect(parsed.pagination.next_cursor).toBe('50');   // v1 next_start=50 → string "50"
      expect(parsed.pagination).not.toHaveProperty('next_start');
    });
```
Add an equivalent for `getDealEmails` and `listMailThreads` (use `paginationFixtures.v1WithMore`; for listMailThreads pass `{ folder: 'inbox' }`). Use a small inline array like `[{ id: 1 }]` for `data` (do NOT add to `tests/helpers/*`).
> **Lane C revert-proof:** `expect(parsed.pagination.next_cursor).toBe('50')` and `not.toHaveProperty('next_start')` FAIL on old src (old code emits `{next_start: 50}` and no `next_cursor`).

### FALSE-GREEN WATCH (consolidated — every existing assertion that LIES and must be flipped)
| File:line | Currently asserts (WRONG after fix) | Lane | Action |
|---|---|---|---|
| `tests/integration/tools/persons.test.ts:54` | `first_char=A` IS sent | A | → `not.toContain('first_char')` |
| `tests/unit/schemas/persons.test.ts:92,96-100` | `first_char` valid/length-checked | A | remove key + delete length test |
| `tests/integration/tools/organizations.test.ts:52` | `first_char=A` IS sent | A | → `not.toContain('first_char')` |
| `tests/unit/schemas/organizations.test.ts:41,45-46` | `first_char` valid | A | remove key + delete test |
| `tests/integration/tools/activities.test.ts:58` | `type=call` IS sent | A | → negative asserts for type/start_date/end_date/project_id |
| `tests/unit/schemas/activities.test.ts:49,66-77` | list `type`/dates valid | A | remove key/asserts + delete LIST date tests |
| `tests/integration/tools/projects.test.ts:81` | `board_id=1` IS sent | A | → `not.toContain('board_id')` + `not.toContain('include_fields')` |
| `tests/unit/schemas/projects.test.ts:42-43` | list `board_id`/`include_fields` valid | A | remove keys + delete asserts |
| `tests/integration/tools/projects.test.ts:408-415` | search `include_fields=tasks` sent | A (only if §3.3-OPT) | flip to `not.toContain('include_fields')` ELSE leave |
| `tests/unit/schemas/deals.test.ts:131` | create accepts `add_time` (silent) | A | remove key + add strip test + integration `not.toHaveProperty` |
| `tests/unit/schemas/leads.test.ts:361,371` | search `include_fields:'person,organization'` valid | B | → `'lead.was_seen'` |
| `tests/unit/schemas/leads.test.ts:378-379` | rejects limit>100 | B | → rejects limit>500, accepts ≤500 |
| `tests/integration/tools/leads.test.ts:385-393` | `include_fields=person,organization` sent | B | → `lead.was_seen` |

---

## 5. BUILD / VERIFY (all lanes)
```
npm run build      # tsc — does NOT type-check tests (tsconfig:19 excludes **/*.test.ts)
npm test           # vitest run — green is necessary but NOT sufficient (see §0.2)
npm run lint       # eslint src/ — catch unused imports after param removals
```
Lint/`tsc` watch-outs after removals:
- Lane A: `schemas/activities.ts` keeps `OptionalDateSchema` import (create/update still use it). No import becomes unused from the removals (all removed keys reuse already-needed imports). Verify `tsc` `noUnusedLocals` clean.
- Lane B: ADD `extractPaginationV2` to the `leads.ts` import (§3.B.2). `z.uuid()` already used in leads.ts (for label_ids) so no new import.
- Lane C: no import changes (`extractPaginationV1` still used).

A green `npm test` is necessary but not sufficient — the gate is each lane's revert-proof: reviewer keeps the new tests, `git checkout origin/main -- <lane src>`, re-runs; the named integration negatives/positives MUST fail on old src.

---

## 6. PER-LANE FILE MANIFEST (write-disjoint — NO file in two lanes)

| File | Lane A | Lane B | Lane C |
|---|:--:|:--:|:--:|
| `src/schemas/persons.ts` | ✏️ | | |
| `src/schemas/organizations.ts` | ✏️ | | |
| `src/schemas/activities.ts` | ✏️ | | |
| `src/schemas/projects.ts` | ✏️ | | |
| `src/schemas/deals.ts` | ✏️ | | |
| `src/tools/persons.ts` | ✏️ | | |
| `src/tools/organizations.ts` | ✏️ | | |
| `src/tools/activities.ts` | ✏️ | | |
| `src/tools/projects.ts` | ✏️ | | |
| `src/tools/deals.ts` | ✏️ | | |
| `tests/unit/schemas/{persons,organizations,activities,projects,deals}.test.ts` | ✏️ | | |
| `tests/integration/tools/{persons,organizations,activities,projects,deals}.test.ts` | ✏️ | | |
| `src/schemas/leads.ts` | | ✏️ | |
| `src/tools/leads.ts` | | ✏️ | |
| `tests/unit/schemas/leads.test.ts` | | ✏️ | |
| `tests/integration/tools/leads.test.ts` | | ✏️ | |
| `src/tools/mail.ts` | | | ✏️ |
| `tests/integration/tools/mail.test.ts` | | | ✏️ |
| `src/schemas/common.ts` | ❌ READ-ONLY | ❌ | ❌ |
| `src/tools/index.ts` | ❌ (no edit; spreads arrays) | ❌ (no edit) | ❌ |
| `src/utils/pagination.ts` | ❌ READ-ONLY | ❌ READ-ONLY | ❌ READ-ONLY |
| `tests/helpers/*` (fixtures, mockFetch) | ❌ | ❌ | ❌ |

**Disjointness confirmation:** No source/test file appears in two lanes. Shared files (`common.ts`, `index.ts`, `pagination.ts`, `tests/helpers/*`) are touched by NO lane:
- `index.ts` is NOT edited even by Lane B's optional new tool, because `leadsTools` is spread (`index.ts:15,27`) — appending to the array suffices. The only tool-count smoke test is `tests/integration/tools/leads.test.ts:539-554` (verified — no separate global-count smoke-test file exists), and it is already in Lane B's manifest; Lane B updates it only if §3.B.7 is implemented (see §4 Lane B note). Disjointness is unaffected.
- No lane needs `tests/helpers/*`: all guard tests use existing helpers (`mockFetch`, `mockApiSuccess`, `paginationFixtures.v1WithMore`, `fixtures.deal`) plus test-file-local inline objects. **Lane C specifically uses the pre-existing `paginationFixtures.v1WithMore`** (mockFetch.ts:229) — no helper edit needed.

The three lanes are write-disjoint and SAFE TO IMPLEMENT IN PARALLEL.

---

## 7. RISK / ROLLBACK

- **Breaking but correctness-positive:** removing invalid params (`first_char`, activities `type`/dates/`project_id`, projects `board_id`/`include_fields`, deal-create `add_time`) is a breaking change only for callers that were sending values v2 silently ignores (no working behavior relied on them; v2 dropped them server-side). Tightening leads `include_fields` to `lead.was_seen` and capping search `limit` at 500 likewise only rejects values v2 would not honor. Document in PR.
- **Output-shape change (mail):** `pagination.next_start` (number) → `pagination.next_cursor` (string). Any downstream consumer reading `next_start` from mail tools must switch to `next_cursor`. This intentionally aligns mail with notes/leads. Call out in PR notes.
- **Convert body:** forwarding `stage_id`/`pipeline_id` is purely additive; the no-arg path still sends `{}`.
- **Optional items (§3.3-OPT, §3.B.7):** if either is skipped to keep the PR tight, also skip its guard test and leave the corresponding existing test unchanged. They are clearly labeled OPTIONAL so the implementer can decide.
- **Rollback:** each lane is a self-contained set of files; reverting any single lane's src+test files restores prior behavior without touching the others (disjoint manifest). No shared file or migration is involved.
- **NEEDS-LIVE-CHECK:** none are blocking. The only non-CONFIRMED row is 4b (persons `include_fields` description is generic, not wrong) — purely cosmetic; safe to tighten or leave. All param/enum/endpoint claims are CONFIRMED against the vendored v2 spec.
