# Session Handoff: #50 Products entity COMPLETE & CLOSED — next is the R1-R4 coverage roadmap (#67-#70)

Last updated: 2026-06-09. Repo: `main` @ `420b416` (Zod 4.4 / TypeScript 6 / Vitest 4), single worktree `~/repos/pipedrive-mcp-server`, clean. Build green, **1037 tests green**, CI green Node 20/22.

Since the prior handoff (`833d01b`): **#50 slice 3** (U5 product-field list + U6 product-image get/delete, JSON) shipped via PR **#66** (squash-merged → `main @ 420b416`), +28 tests (1009 → 1037). **Issue #50 is now CLOSED** (`status:done`) — the Products entity is fully covered. The four non-Products checklist areas were split into their own issues **#67-#70** under epic **#51** (which now closes when #67-#70 land, not when #50 lands).

## Done this session (do NOT redo)

- **#50 SLICE 3 — U5 product fields + U6 product images (JSON) SHIPPED** via PR **#66**:
  - **U5:** `pipedrive_list_product_fields` over **GET `/productFields`** (v2), cursor pagination + optional `include_fields=ui_visibility`. Mirrors the existing `list_{deal,person,organization}_fields` tools; appended to `fieldTools` (no `index.ts` edit).
  - **U6 (JSON):** `pipedrive_get_product_image` (GET `/products/{id}/images` — a **single** image object, not a list, no pagination) and `pipedrive_delete_product_image` (DELETE `/products/{id}/images` — no `/images/{id}` subpath; gated; plain hard delete, no 30-day soft-delete). The plan's U6 prose was wrong about both; the implementer was briefed against the spec.
  - Verify gate: tsc clean, **1037 tests green**, `npx eslint src/` clean. Independent `code-reviewer` APPROVE (P2 misplaced unit test → moved to `tests/unit/schemas/`; P3 fixture `company_id` number→string). Adversarial revert-proof passed (revert `src/`→`origin/main`, new tests kept → 22 guards fail, zero false-greens).
- **#50 CLOSED** `status:done` (closed by hand after the user chose "close #50 + file R1-R4 follow-ups"; PR used `Part of #50`). Products coverage = U1-U6 across PRs #64/#65/#66.
- **R1-R4 roadmap split into 4 new issues** (all `enhancement` / `P3: low` / `status:assess`, under epic #51) — see Next action.
- **#51 epic updated:** Phase 3 (#50) ticked, new **Phase 3b (#67-#70)** added; close condition changed to "#51 closes when #67-#70 land".

## Next action

**Work the coverage-expansion roadmap: #67-#70.** These are **P3, NOT v1-sunset-critical**, and the #50 plan doc (`docs/plans/2026-06-09-issue-50-expand-v2-coverage-plan.md`) only sketches them at **roadmap resolution** — so each needs a real `assess → plan → review-plan → implement` pass, NOT straight-to-implement. Re-verify EVERY endpoint/param/response against `docs/api/openapi-v2.yaml` at plan time (the U6 plan-vs-spec drift this session is the cautionary tale — roadmap prose contains shape guesses).

- **#67 — Deal sub-resources** (files `src/{schemas,tools}/deals.ts`, additive): `/deals/{id}/followers`, `/discounts`, `/installments`, `/products` (+bulk), `/deals/archived`, deal→lead convert. Line-items + installments are the meatiest (likely 2 sub-slices).
- **#68 — Project sub-entities** (files `src/{schemas,tools}/projects.ts`, maybe new `tasks`/`boards` files): `/tasks` CRUD, `/boards`, `/phases`, `/projectTemplates`, `/projectFields` (list), `/projects/archived`, `/projects/{id}/permittedUsers`, changelog.
- **#69 — Cross-entity followers + multipart media** (files `deals.ts`/`persons.ts`/`organizations.ts`/`products.ts` + `src/client.ts`): follower mgmt for deals/persons/orgs; person picture; **+ the deferred product-image upload (POST) / update (PUT)** — grouped here because all need a new `src/client.ts` `postMultipart`/`putMultipart` helper. **Person-picture v2 upload endpoint is UNCONFIRMED in the spec — verify before planning;** if absent, follower mgmt has no multipart dependency and can ship independently. **Disjointness caveat: #69 spans many entity files + `client.ts`, so check overlap before parallelizing it with #67/#68/#70.**
- **#70 — Config writes** (files `fields.ts`/`pipelines.ts`/stages, `area: migration`): pipelines/stages/fields CRUD with v2 renames (`active→is_deleted`, `selected→is_selected`, `deal_probability→is_deal_probability_enabled`; stages `rotten_flag→is_deal_rot_enabled`, `rotten_days→days_to_rotten`); **+ the deferred product-field write ops** (`add/update/deleteProductField` + options). All deletes gated.

**Disjoint-file parallelism:** #67 (deals), #68 (projects), #70 (fields/pipelines) have largely disjoint footprints and could run in parallel; #69 overlaps `products.ts` + `client.ts` and several entity files — serialize or scope carefully. Re-run `gh issue list --state open` first to confirm the board.

## Pipeline + gates (per memory [[backlog-orchestration-workflow]])

Per issue: plan(opus, writes+commits plan to `docs/plans/`, posts to issue, → `status:plan-review`) -> implement(sonnet, write-only, no build/test/self-review) -> verify(orchestrator runs `npm run build` + `npm test` + `npx eslint src/`) -> review(separate `code-reviewer` per diff vs spec; orchestrator runs the adversarial revert-proof) -> fix(fresh agent if needed) -> one PR `Closes #N`, squash-merge, **STOP at the merge gate for the user**. Per-issue worktree `.claude/menehune/worktrees/agent-N-slug` off `origin/main`, symlink `node_modules` (don't `npm ci` — no dep changes expected), branch `agent/N-slug`, lock `.claude/menehune/locks/N.lock`. Denylist before push: `.env*`, `package-lock.json`, `bundle/`, `*.mcpb`, `node_modules`. The menehune `/backlog:*` commands are NOT on disk — drive the pipeline directly with the Agent tool.

## Known gotchas (carried)

- **MERGE-GATE GOTCHA — and how slice 3 dodged it.** `gh pr merge <n> --squash --delete-branch` fails to delete the branch (the **worktree**, not the shell CWD, still holds it) AND then skips the remote-branch delete (the GitHub merge still succeeds). **This session avoided it cleanly by NOT passing `--delete-branch`**: `gh pr merge 66 --squash` → `git worktree remove <path> --force` → `git branch -D <branch>` → `git push origin --delete <branch>` → `rm .claude/menehune/locks/N.lock` → `git checkout main && git pull --ff-only origin main`. Use this order every time. Verify with `git worktree list` (only main) + `git ls-remote --heads origin <branch>` (empty).
- **Spec-vs-plan shape drift:** roadmap-level plan prose contains endpoint/shape guesses. The #50 U6 plan said "image *list* + delete `/images/{id}`" but the spec has a *single* image per product (`getProductImage` one object, `deleteProductImage` at `/products/{id}/images`). Always re-verify against `docs/api/openapi-v2.yaml` at plan + implement time. (Note: the spec DOES have both a POST `uploadProductImage` and a PUT `updateProductImage`, both multipart — both deferred to #69.)
- **Auth reality (supersedes CLAUDE.md prose):** v2 uses the **`x-api-token` HEADER** (`src/client.ts`), NOT the `api_token` query param — that's v1-only. Integration `not.toContain('api_token')` assertions on v2 URLs are meaningful.
- **Lint IS a CI gate** (`.github/workflows/ci.yml` runs `npm run lint` = `eslint src/` — test files are NOT linted in CI). The local RTK hook may lint test files and report a spurious failure — NOT what CI does. Verify the real gate with `npx eslint src/`. (Still worth fixing test-file lint nits; slice 3 fixed an unused-import in a new test file.)
- **Adding a param means editing THREE places:** the Zod schema, the hand-written `inputSchema` JSON literal (NOT generated from Zod), and the handler's query/body/path forward line. A half-wired param is a defect.
- **Zod 4.4.3 on main** (NOT Zod 3 — stale plan bodies may say "Zod 3.25"). Idioms: `z.email()`/`z.uuid()`, `z.record(z.string(), z.unknown())`, `.extend(...shape)` (not `.merge`), `error.issues` (not `.errors`).
- **False-green hazard:** `tsconfig` excludes `**/*.test.ts` (tests never type-checked) and per-entity tests call handlers DIRECTLY (bypass the dispatcher's Zod). Real guards = UNIT schema tests (`Schema.parse`) + integration tests asserting the wire shape (`JSON.parse(options.body)` / the URL) + the `tests/contract/` OpenAPI harness. The orchestrator runs the adversarial proof (revert `src/` to origin/main with new tests kept → confirm guards FAIL pre-fix).
- **Unit schema tests live in `tests/unit/schemas/`** (3-level import `../../../src/...`), integration handler tests in `tests/integration/tools/`. A new schema test placed at `tests/unit/` top-level still runs but is misfiled (slice 3 review caught this).
- **v2 search/pagination shape:** v2 `/{entity}/search` returns `data:{items:[...]}` + `additional_data.next_cursor` (NOT a flat array like list endpoints). `extractPaginationV2`'s `data` param is `unknown` (shape-agnostic) — do not re-narrow it.

## Deferred / context

- **Deferred multipart (folded into #69):** product-image upload (POST `uploadProductImage`) + update (PUT `updateProductImage`), and R3 person picture (v2 upload endpoint UNCONFIRMED — verify first). All wait on a `src/client.ts` multipart helper. Get + delete (JSON) already shipped in slice 3.
- **Deferred product-field WRITES (folded into #70):** `add/update/deleteProductField` + options. Only the field LIST read shipped (U5).
- **Wire Products into the contract harness (deferred P2 since slice 1):** Products is NOT yet in `tests/contract/`. When next touching products (#69 image upload), add `getProducts`/`searchProducts` to `requestParams.contract.test.ts` and `addProduct`/`updateProduct` to `requestBody.contract.test.ts`; consider folding the variation/follower/image handlers in too.
- **Tracker epic: #51** — Phases 0-3 done (#42-#50 + #60); Phase 3b (#67-#70) remains; closes when #67-#70 land.
