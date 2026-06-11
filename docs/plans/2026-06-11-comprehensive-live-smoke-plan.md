# Plan: comprehensive live smoke vs the Growth+ trial (TIME-SENSITIVE)

**Created 2026-06-11. Written as a cold-start brief for a FRESH session (no prior conversation context).**

## Why this exists / urgency

The user has a **transient Pipedrive Growth-plan TRIAL** account + API token, and will tear it down after the trial period. **This is a rare live-access window.** The entire MCP server is otherwise tested only against **mocked `fetch`** (even the `tests/contract/` OpenAPI harness validates only the *request* shape we send, never *real responses*). So every tool's response parsing, pagination extraction, and the server's acceptance of our write bodies are **unproven on the wire**. Goal: run a comprehensive live smoke NOW to catch real-shape / real-acceptance bugs that CI fundamentally cannot.

The user chose **"Comprehensive"** scope: read every entity (validate real response shapes + pagination, including the v1 notes/mail/users path) AND exercise the never-live write/sub-resource paths.

## What is already done (the pattern to copy)

`scripts/smoke-installments.ts` (run via `npm run smoke:installments`) is the proven pattern, merged via PR #78 (`674fd68`), and it closed #76. **Copy its structure.** Key mechanics:

- Imports the real dispatch path: `import { handleCallTool } from "../src/index.js";` then `call(name, args)` returns a `ToolResult` (`{ content:[{type,text}], isError? }`). This exercises Zod validation + handler + client exactly as production does.
- Helpers: `bodyText(r)`, `parseBody(r)` (JSON.parse of the text), `idOf(r)` (`p?.data?.id ?? p?.data?.data?.id`), `record(name, ok, detail)` PASS/FAIL, `block()` 🔒 BLOCKED (plan/permission not-entitled, NOT a bug), `skip()` ⏭️ SKIP, `isNotEntitled(r)` (`r.isError && (text includes "PERMISSION_DENIED" || /subscription plan/i)`).
- Safety: full/destructive mode is guarded behind a required `--confirm-sandbox` flag + a masked token-tail print (`…abcd (len 40)`). Teardown runs in `finally`, best-effort.
- Runs via `tsx` (already a dep). Lives OUTSIDE `src/`, so it is excluded from `tsc` (`include: ["src/**/*"]`), `eslint src/`, and the vitest glob (`tests/**/*.test.ts`) — build/lint/tests stay unaffected.

### Token / env mechanics (critical)

- `src/index.ts` does `import "dotenv/config"`, so importing `handleCallTool` auto-loads the repo's gitignored `.env`. **dotenv does NOT override an already-set var**, so an explicit `PIPEDRIVE_API_KEY=… npm run …` on the command line WINS over `.env`. Always pass the trial token explicitly.
- Full/destructive mode requires `PIPEDRIVE_ENABLE_DESTRUCTIVE=true` (the server's delete guard) AND the harness's own `--confirm-sandbox`.
- Auth reality: v2 uses the `x-api-token` HEADER; v1 (notes/mail/fields/pipelines/users) uses the `api_token` QUERY param. Both auth paths get live coverage here.

## What to build

New script `scripts/smoke-coverage.ts` + npm script `"smoke:coverage": "tsx scripts/smoke-coverage.ts"`. Same helpers/safety as the installments harness. Structure into sections; `--confirm-sandbox` + DESTRUCTIVE required only for Sections C+ (writes).

Run:
```bash
PIPEDRIVE_API_KEY=<trial-growth-token> PIPEDRIVE_ENABLE_DESTRUCTIVE=true \
  npm run smoke:coverage -- --confirm-sandbox
```

### Section A — broad READS (read-only, low risk)

List every entity, assert `!isError`, parse `{summary,data,pagination}`, and where a list returns items, grab the first `id` and `get` it (validates list + get response shapes + pagination live). Cover BOTH v2 and v1.

- v2: list_deals, list_persons, list_organizations, list_activities, list_products, list_projects, list_tasks (needs nothing? verify), list_boards, list_phases (REQUIRES `board_id` — get one from list_boards first), list_pipelines, list_stages, list_leads, list_archived_deals, list_archived_leads, list_archived_projects, list_project_templates.
- v1: list_notes, list_mail_threads (+ get_mail_thread, get_mail_message if any), list_users, get_current_user.
- Pagination: confirm v2 returns cursor (`next_cursor`/`has_more`) and v1 returns offset-derived shape without crashing the extractors.

### Section B — #60 `field_code` live confirmation (read-only; CLOSES an open follow-up)

`list_deal_fields`, `list_person_fields`, `list_organization_fields`, `list_product_fields`, `list_project_fields`. For each: assert items carry `field_code`, and RECORD whether they also carry `key`. The #60 fix made `getField` match `field_code || key`; this confirms the real v2 shape (if responses are `field_code`-only, the pre-#60 code was broken for all field entities — fix is correct either way, but record the finding). Also call `get_field` for one field and confirm it resolves by `field_code`.

### Section C — WRITES / sub-resources (create throwaway, exercise, TEARDOWN in finally)

Read the exact required params from the Zod schemas before calling (source of truth for the dispatcher):

- **Field CRUD + bulk options** (`src/schemas/fields.ts`): `create_deal_field` with an `enum`/`set` type so options exist → confirm response `field_code` is a 40-char hash → `update_deal_field` → `update_deal_field_options` (PATCH array body) → `delete_deal_field_options` (body-bearing DELETE array body) → `delete_deal_field`. The v2 renames to verify on the wire: write uses `field_name`/`field_type` (NOT v1 `name`/`field_type`). Repeat lightly for person/org/product field if cheap.
- **Pipeline/stage CRUD** (`src/schemas/pipelines.ts`): `create_pipeline` (`is_deal_probability_enabled`) → `create_stage` (`is_deal_rot_enabled`/`days_to_rotten`, `pipeline_id`) → `update_pipeline`/`update_stage` → delete both. Confirm the v2 rename fields are accepted.
- **Deal sub-resources** (`src/schemas/deals.ts`): `create_deal` + `create_product` + `add_deal_product` → `bulk_add_deal_products` → `add_deal_discount` (returns UUID `discount_id`) / `list_deal_discounts` / `update_deal_discount` / `delete_deal_discount` → `list_deal_products`. Then on a SEPARATE throwaway deal: `convert_deal_to_lead` (async; marks the deal DELETED, destructive/gated) → poll `get_deal_conversion_status` (status-derived summary). Teardown.
- **Multipart product image** (`src/schemas/products.ts`): `create_product` → `upload_product_image` (hybrid `file_path` | `base64_data`; supply a tiny in-memory 1x1 PNG via base64 — see constant below — plus `file_name` + `mime_type: image/png`) → `update_product_image` → `get_product_image` → `delete_product_image` → `delete_product`. This is the riskiest never-live path (binary + multipart boundary).
- **Product variations + followers** (`src/schemas/{products,deals,persons,organizations}.ts`): quick exercise of `add/list/update/delete_product_variation` and one follower add/list/delete per entity (deal/person/org/product).
- **Projects/tasks/boards/phases (#68)** (`src/schemas/{projects,tasks,boards}.ts`): `create_project` → `create_task` (needs `project_id`; `done`/`milestone` write as int `0|1`) → `create_board` → `create_phase` (needs `board_id`) → exercise list/get/changelog/permitted_users → teardown. NOTE: Projects may be a separate plan feature; if 402/403, record as 🔒 BLOCKED, not FAIL.

Tiny 1x1 PNG (base64) for the image upload, no external file needed:
```
iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==
```

### Reporting + outcome

PASS/FAIL/BLOCKED/SKIP per probe; print the RAW response for any shape surprise. Summary maps which surfaces are now live-verified. **Any real-shape discrepancy (response keyed differently, a write body rejected, a pagination field absent) → file a GitHub issue with the raw response and fix the handler/schema.** Plan-gated 402/403 → BLOCKED (expected for features the trial tier lacks), not a bug.

If time runs short before the trial expires, prioritize: **Section B (#60)** → **multipart image** → **field CRUD + bulk options** → the rest.

## Tool inventory (gathered 2026-06-11, so the fresh session need not re-grep)

- activities(5): list/get/create/update/delete_activity
- boards(10): list/get/create/update/delete_board, list/get/create/update/delete_phase
- deals(26): list/get/create/update/search/delete_deal; {list/add/delete}_deal_follower + get_deal_followers_changelog; list/add/update/delete_deal_product + bulk_add_deal_products; list/add/update/delete_deal_discount; list/add/update/delete_deal_installment; list_archived_deals; convert_deal_to_lead + get_deal_conversion_status
- fields(26): list_{organization,deal,person,product,project}_fields; get_field; {create,update,delete}_{deal,person,organization,product}_field; {update,delete}_{deal,person,organization,product}_field_options
- leads(9): list/list_archived/get/create/update/search/delete_lead; convert_lead_to_deal; get_lead_conversion_status
- mail(5): get_person_emails, get_deal_emails, list_mail_threads, get_mail_thread, get_mail_message
- notes(5): list/get/create/update/delete_note
- organizations(10): list/get/create/update/search/delete_organization; {list/add/delete}_organization_follower + changelog
- persons(11): list/get/create/update/search/delete_person; {list/add/delete}_person_follower + changelog; get_person_picture
- pipelines(9): list_pipelines; list/get_stage(s); create/update/delete_pipeline; create/update/delete_stage
- products(18): list/get/search/create/update/delete_product; {list/add/update/delete}_product_variation; {list/add/delete}_product_follower + changelog; get/delete/upload/update_product_image
- projects(13): list/get/create/update/delete/search_project; archive_project; list_project_tasks; list/get_project_template(s); list_archived_projects; get_project_permitted_users; get_project_changelog
- tasks(5): list/get/create/update/delete_task
- users(3): list_users, get_user, get_current_user

Total ~155 tools. CLAUDE.md "Adding a New Entity" + the gotchas in `docs/SESSION-HANDOFF.md` still apply.
