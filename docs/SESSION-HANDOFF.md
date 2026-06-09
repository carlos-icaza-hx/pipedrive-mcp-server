# Session Handoff: #50 slice 2 shipped — next is #50 slice 3 (U5 product fields + U6 images), the FINAL slice

Last updated: 2026-06-09. Repo: `main` @ `010d54b` (Zod 4.4 / TypeScript 6 / Vitest 4), single worktree `~/repos/pipedrive-mcp-server`, clean. Build green, **1009 tests green**, CI green Node 20/22.

Since the prior handoff (`e976c9e`): **#50 slice 2** (U3 product variations + U4 product followers) shipped via PR **#65** (squash-merged → `main @ 010d54b`), +61 tests (948 → 1009). Issue **#50 is intentionally still OPEN** (PR used `Part of #50`, not `Closes #50`). After slice 3 lands, #50 closes and tracker **#51** closes with it.

## Done this session (do NOT redo)

- **#50 SLICE 2 — U3 variations + U4 followers SHIPPED** via PR **#65**. Added 8 tools to the existing `productTools` array in `src/tools/products.ts` (no `index.ts` edit — it already spreads `...productTools`):
  - **U3 variations:** `pipedrive_{list,add,update,delete}_product_variation` over v2 `/products/{id}/variations` and `/products/{id}/variations/{product_variation_id}` (PATCH/DELETE). `VariationPriceInputSchema = PriceInputSchema.extend({ notes })`. Delete gated; NOT a 30-day soft-delete (summary says only "deleted").
  - **U4 followers:** `pipedrive_list_product_followers`, `pipedrive_add_product_follower`, `pipedrive_get_product_followers_changelog`, `pipedrive_delete_product_follower` over v2 `/products/{id}/followers`, `/followers/changelog`, `/followers/{follower_id}` (DELETE). Add requires `user_id`; delete typed/returns `user_id`; delete gated.
  - Verify gate: tsc clean, 1009 tests green, `npx eslint src/` clean (the real CI gate). Independent `code-reviewer` APPROVE (no P0/P1). Adversarial revert-proof passed (revert `src/`→`origin/main` with new tests kept → 34 guards fail).

## Next action

**#50 slice 3 = U5 product-field list read + U6 product image get/delete (JSON only). This is the FINAL #50 slice.** The plan covers U5/U6 but the spec was re-verified this session and **U6's real shape differs from the plan body** (see correction below) — brief the implementer with the corrected shapes, not the plan's prose. #50 already carries `status:implement`.

U5 and U6 touch **disjoint files** (U5 = `fields.ts`/`schemas/fields.ts`; U6 = `products.ts`/`schemas/products.ts`), so they can be two parallel lanes in ONE shared worktree, or done sequentially. One PR, `Part of #50` → then this slice can use `Closes #50` ONLY if it is truly the last (U6 multipart PUT update stays deferred — see below — so decide whether "deferred multipart" blocks closing #50; recommended: ship U5+U6-json, then CLOSE #50 with a note that the multipart image PUT is a separate future item folded into R3/U6-multipart, and close #51).

### U5 — Product fields LIST read (verified v2)
- Endpoint: **GET `/productFields`** on **v2** (confirmed: `getField` in `src/tools/fields.ts:125` already maps `product: "/productFields"` on v2; spec `getProductFields` at openapi-v2.yaml line ~15282). Query params: `cursor`, `limit` (v2 cursor pagination), and `include_fields` enum `["ui_visibility"]` (optional). Response: `data[]` of field metadata (`field_name`, `field_code`, `field_type` enum, `is_custom_field`, …) + `additional_data.next_cursor`.
- Files: `src/schemas/fields.ts` add `ListProductFieldsSchema = PaginationParamsSchema.extend({ include_fields: z.enum(["ui_visibility"]).optional() })` + type export (the existing `ListOrganizationFieldsSchema`/`ListDealFieldsSchema`/`ListPersonFieldsSchema` are bare `PaginationParamsSchema` — mirror them but add `include_fields`). `src/tools/fields.ts` add `listProductFields` handler (mirror the existing org/deal/person list-field handlers: `buildPaginationParamsV2` + `client.get<unknown[]>("/productFields", qs, "v2")` + `extractPaginationV2` + `createListSummary("product field", …)`), append a `pipedrive_list_product_fields` entry to the `fieldTools` array (line ~187). Read-only; field WRITES are R4, out of scope.

### U6 — Product images GET + DELETE (JSON only) — PLAN BODY IS STALE, USE THESE SHAPES
Re-verified against `docs/api/openapi-v2.yaml` lines 15045–15280. The plan said "images **list**/delete" with `DELETE /products/{id}/images/{id}` — **both are wrong.** Real spec:
- **GET `/products/{id}/images`** = `getProductImage`, "Get image of a product" — returns a **SINGLE** image object `{ id, product_id, company_id, public_url, add_time }` (NOT a list, NO pagination, only `id` path param). Plain JSON, no client change. Name it `pipedrive_get_product_image` (a "get", not "list").
- **DELETE `/products/{id}/images`** = `deleteProductImage` — path is `/products/{id}/images` with **only the product `id`** (NO separate image id in the path). Returns `{ id }`. Plain JSON, gate with `destructiveOperationGuard()`. Name it `pipedrive_delete_product_image`.
- **PUT `/products/{id}/images`** = `updateProductImage` is **multipart/form-data** (binary `data` field). There is **NO POST upload operationId** in the spec — "upload" == this multipart PUT. **DEFERRED** (needs a `src/client.ts` multipart helper, e.g. `putMultipart`/`postMultipart`, which the JSON-only client lacks). Do NOT implement the PUT in slice 3.
- Files: `src/schemas/products.ts` add `GetProductImageSchema = IdParamSchema` and `DeleteProductImageSchema = IdParamSchema` (+ type exports). `src/tools/products.ts` add `getProductImage` + `deleteProductImage` handlers (mirror `getProduct`/`deleteProduct`) and two tool entries.

After U5+U6-json ship and merge: close #50 (note the deferred multipart image PUT), then #51 closes with it.

## Pipeline + gates (per memory [[backlog-orchestration-workflow]])

Per slice: implement(sonnet, write-only, no build/test/self-review — brief it with the CORRECTED U6 shapes above) -> verify(orchestrator runs `npm run build` + `npm test` + `npx eslint src/`) -> review(separate `code-reviewer` per diff vs spec; orchestrator runs the adversarial revert-proof) -> fix(fresh agent if needed) -> one PR `Part of #50` (or `Closes #50` if truly final), squash-merge, **STOP at the merge gate for the user**. Worktree `.claude/menehune/worktrees/agent-50-slice3-fields-images` off `origin/main`, branch `agent/50-slice3-fields-images`, lock `.claude/menehune/locks/50.lock`. Denylist before push: `.env*`, `package-lock.json`, `bundle/`, `*.mcpb`, `node_modules`. Re-run `gh issue list --state open` first to confirm the board.

## Known gotchas (carried)

- **MERGE-GATE GOTCHA (hit 3×: #48, #50-slice1, #50-slice2).** `gh pr merge <n> --squash --delete-branch` fails to delete the branch even from the MAIN repo root, because the **worktree** (not the shell CWD) still holds it — and gh then **skips the remote-branch delete too** (the GitHub merge itself still succeeds). Always finish by hand, in this order: `git worktree remove <path> --force` → `git branch -D <branch>` → `git push origin --delete <branch>` → `rm .claude/menehune/locks/N.lock` → `git checkout main && git pull --ff-only origin main`. Verify with `git ls-remote --heads origin <branch>` (empty) and `git worktree list` (only main).
- **Auth reality (supersedes CLAUDE.md prose):** v2 uses the **`x-api-token` HEADER** (`src/client.ts`), NOT the `api_token` query param — that's v1-only. Integration `not.toContain('api_token')` assertions on v2 URLs are meaningful.
- **Lint IS a CI gate** (`.github/workflows/ci.yml` runs `eslint src/`). The local RTK hook may rewrite `npm run lint` to also lint test files and report a spurious exit 1 from pre-existing test-file issues — NOT what CI does. Verify the real gate with `npx eslint src/`.
- **Adding a param means editing THREE places:** the Zod schema, the hand-written `inputSchema` JSON literal (NOT generated from Zod), and the handler's query/body/path forward line. A half-wired param is a defect.
- **Zod 4.4.3 on main** (NOT Zod 3 — stale plan bodies may say "Zod 3.25"). Idioms: `z.email()`/`z.uuid()`, `z.record(z.string(), z.unknown())`, `.extend(...shape)` (not `.merge`), `error.issues` (not `.errors`).
- **False-green hazard:** `tsconfig` excludes `**/*.test.ts` (tests never type-checked) and per-entity tests call handlers DIRECTLY (bypass the dispatcher's Zod). Real guards = UNIT schema tests (`Schema.parse`) + integration tests asserting the wire shape (`JSON.parse(options.body)` / the URL) + the `tests/contract/` OpenAPI harness. The orchestrator runs the adversarial proof (revert `src/` to origin/main with new tests kept → confirm guards FAIL pre-fix).
- **v2 search/pagination shape:** v2 `/{entity}/search` returns `data:{items:[...]}` + `additional_data.next_cursor` (NOT a flat array like list endpoints). `extractPaginationV2`'s `data` param is `unknown` (shape-agnostic) — do not re-narrow it.

## Deferred / after #50

- **Wire Products into the contract harness (deferred P2 since slice 1):** Products is NOT yet in `tests/contract/`. When touching products again (slice 3 touches `products.ts` for U6), add `getProducts`/`searchProducts` to `requestParams.contract.test.ts` and `addProduct`/`updateProduct` to `requestBody.contract.test.ts`. Consider folding the variation/follower/image handlers in too.
- **Deferred multipart:** U6 image PUT update (`updateProductImage`, multipart) and any other multipart upload (R3 person picture — v2 upload endpoint UNCONFIRMED in spec, verify first) all wait on a `src/client.ts` multipart helper.
- **#50 roadmap (separate future issues, NOT slice 3):** R1 deal sub-resources, R2 project sub-entities, R3 followers+picture for deals/persons/orgs, R4 config writes (pipelines/stages/fields create/update/delete with v2 field renames; product-field WRITE ops fold in here). Full detail in `docs/plans/2026-06-09-issue-50-expand-v2-coverage-plan.md`.
- Tracker epic: **#51** (closes when #50 fully lands).
