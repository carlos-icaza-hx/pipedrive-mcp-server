# Session Handoff: #50 slice 1 shipped — next is #50 slice 2 (U3/U4)

Last updated: 2026-06-09. Repo: `main` @ `e6f357c` (Zod 4.4 / TypeScript 6 / Vitest 4), single worktree `~/repos/pipedrive-mcp-server`, clean. Build green, **948 tests green**, CI green Node 20/22.

Since the prior handoff (`4aaaf0e`): **#49** infra/test hardening shipped (PR #62), **#60** getField `field_code` fix shipped (PR #63), and now **#50 slice 1** (Products entity CRUD+search) shipped (PR #64). #51 tracker has only #50 remaining.

## Done this session (do NOT redo)

- **#50 SLICE 1 — Products entity (U1 read + U2 write) SHIPPED** via PR **#64** (squash-merged → `main @ e6f357c`). +100 tests (848 → 948). Issue **#50 is intentionally still OPEN** — the PR used `Part of #50`, not `Closes #50`, because #50 is being shipped in independently-shippable slices. Worktree/branch/lock cleaned up.
  - **U1 (read):** `src/schemas/products.ts` list/get/search schemas + `src/tools/products.ts` `pipedrive_list_products` / `pipedrive_get_product` / `pipedrive_search_products` over v2 `/products` + `/products/search`, v2 cursor pagination. Modeled exactly on `persons.ts`.
  - **U2 (write):** create/update/delete schemas + handlers. `visible_to` via `VisibilitySchema` (number enum 1/3/5/7, never string). `prices` is an array (each entry requires `price`). `billing_frequency` enum + nullable `billing_frequency_cycles` (max 208). `custom_fields` as `z.record(z.string(), CustomFieldValueSchema)`. `deleteProduct` gated by `PIPEDRIVE_ENABLE_DESTRUCTIVE`, surfaces the 30-day soft-delete in its summary (mirrors `deletePerson`).
  - Registered `productTools` in `src/tools/index.ts`. Tests: unit schema-rejection paths + integration read/write asserting outbound URL/method/body wire shape (v2 header auth → no `api_token` in product URLs).
  - **Review:** independent opus `code-reviewer` returned APPROVE (no P0/P1). Verify gate: build clean (tsc), 948 tests green, adversarial revert-proof passed.
  - The full multi-slice plan rode in with the squash and is now on main at `docs/plans/2026-06-09-issue-50-expand-v2-coverage-plan.md`.

## Next action

**#50 slice 2 = U3 variations + U4 followers.** The plan already covers all Products slices, so this goes **straight to implement — no re-plan**.

1. Flip #50's label: `gh issue edit 50 --add-label status:implement --remove-label status:merge` (the `status:merge` it carries now is stale — that slice already merged).
2. Run the implement pipeline for **U3 + U4 only**. **Scope the implementer explicitly to U3/U4** — U1/U2 already shipped on main, so a fresh worktree off main already contains `src/schemas/products.ts` + `src/tools/products.ts`. The implementer must EXTEND those files (add variation + follower schemas/handlers + new tool entries), NOT recreate them. ce-work derives unit progress from git; on a fresh branch it won't see U1/U2 as "done", so brief it directly: "U1/U2 are already on main; implement only U3 (variations) and U4 (followers)."
3. Per the plan: U3 variation path is `/products/{id}/variations/{product_variation_id}`. U4 followers mirror the existing follower pattern on deals/persons/orgs.
4. After U3/U4 ship, remaining #50 slices: **U5** product-field LIST read (lives in `src/tools/fields.ts` / `src/schemas/fields.ts`, disjoint from products — parallelizable) and **U6** images list/delete (plain JSON; multipart upload/update stays DEFERRED pending a `client.ts` `postMultipart` helper). Then #50 can close and #51 closes with it.

Re-run `gh issue list --state open` first to confirm the board.

## Pipeline + gates (per memory [[backlog-orchestration-workflow]])

Per issue: plan(opus, writes+commits plan to `docs/plans/`, posts to issue) -> implement(sonnet, write-only, no build/test/self-review) -> verify(orchestrator runs `npm run build` + `npm test` + `npm run lint`) -> review(separate `code-reviewer` per diff vs spec; orchestrator runs the adversarial revert-proof) -> fix(fresh agent if needed) -> one PR, squash-merge, **STOP at the merge gate for the user**. For a **multi-slice issue like #50**, each slice is its own PR referencing `Part of #N` (NOT `Closes #N`) so the issue stays open until the last slice; close it manually when the final slice merges. Multi-sub-area work within one slice → parallel intra-issue lanes in a SINGLE shared worktree (one per disjoint file-set; assign shared files to exactly one lane). Labels: assess -> plan -> plan-review -> implement -> monitor -> merge -> done. Worktree `.claude/menehune/worktrees/agent-N-slug` off `origin/main`, branch `agent/N-slug`, lock `.claude/menehune/locks/N.lock`. Denylist before push: `.env*`, `package-lock.json`, `bundle/`, `*.mcpb`, `node_modules`. The menehune `/backlog:*` commands ARE available this session as skills (assess/plan/review-plan/implement/monitor/merge) and drive the pipeline end-to-end.

## Known gotchas (carried)

- **Run `/backlog:merge` (or `gh pr merge --delete-branch`) from the MAIN repo root, NOT from inside the agent worktree.** If the shell sits in the worktree, gh's post-merge local checkout of `main` fails ("'main' is already used by worktree") and it then skips the remote-branch delete — the GitHub merge still succeeds, but you must finish cleanup by hand: `git push origin --delete <branch>` + verify with `git ls-remote --heads origin <branch>`, then `git worktree remove ... --force` BEFORE `git branch -D`. (Hit on both #48 and #50.)
- **Auth reality (supersedes CLAUDE.md prose):** v2 uses the **`x-api-token` HEADER** (`src/client.ts`), NOT the `api_token` query param — that's v1-only. Integration `not.toContain('api_token')` assertions on v2 URLs are therefore meaningful, not vacuous.
- **Lint IS a CI gate** (`.github/workflows/ci.yml` runs `eslint src/`). The local RTK hook may rewrite `npm run lint` to also lint test files and report exit 1 from pre-existing test-file issues — that is NOT what CI does. Verify the real gate with `npx eslint src/`.
- **A removal's integration `not.toContain(...)` is handler-line revert-proof ONLY if the test passes the param straight into the direct handler call** (cast `as Record<string, unknown>`, since direct calls bypass Zod). Dropping the param from the input makes the negative vacuous on a handler-only revert.
- **Adding/removing a param means editing THREE places:** the Zod schema, the hand-written `inputSchema` JSON literal (NOT generated from Zod), and the handler's query/body forward line. A half-wired param is a defect.
- **Zod 4.4.3 on main** (NOT Zod 3 — older/auto-generated plan bodies may say "Zod 3.25 / do not migrate"; STALE). Match existing idioms: `z.email()`/`z.uuid()`, `z.record(z.string(), z.unknown())`, `.extend(...shape)` (not `.merge`), `error.issues` (not `.errors`). Brief implementers to override any Zod-3 note in the plan.
- **False-green hazard:** `tsconfig` excludes `**/*.test.ts` (tests are never type-checked) and per-entity/functional tests call handlers DIRECTLY (bypass the dispatcher's Zod). A green suite alone does NOT prove correctness. Real guards = UNIT schema tests (`Schema.parse`) + integration tests asserting the wire shape (`JSON.parse(options.body)` / the URL) + the `tests/contract/` OpenAPI harness (added in #49 — drives real handlers through mocked fetch, asserts URL/body vs `docs/api/openapi-v2.yaml`). The orchestrator runs the adversarial proof (revert `src/` to origin/main with new tests kept -> confirm guards FAIL pre-fix).
- **Wire Products into the contract harness (deferred P2 from #50 slice 1):** Products is NOT yet in `tests/contract/`. When touching products again, add `getProducts`/`searchProducts` to `requestParams.contract.test.ts` and `addProduct`/`updateProduct` to `requestBody.contract.test.ts`. (P3 nit: `billing_frequency_cycles` has no `.min(1)` — currency-optional on price inputs is CORRECT, do not tighten.)
- **v2 search/pagination shape:** v2 `/{entity}/search` returns `data:{items:[...]}` + `additional_data.next_cursor` (NOT a flat array like list endpoints). `extractPaginationV2`'s `data` param is `unknown` (shape-agnostic) — do not re-narrow it. `searchProducts` follows this shape.

## After #50 slice 2

- **#50 slice 3:** U5 product-field LIST read (in `fields.ts`, disjoint/parallelizable) + U6 images list/delete (JSON only). Then close #50.
- **#50 roadmap (separate future issues, NOT this slice):** R1 deal sub-resources (followers/discounts/installments/line-item products+bulk/archived/convert-to-lead), R2 project sub-entities, R3 followers+picture for deals/persons/orgs (person-picture multipart endpoint UNCONFIRMED in spec — verify first), R4 config writes (pipelines/stages/fields create-update-delete with v2 field renames; product-field WRITE ops fold in here). Multipart upload/update (U6 upload, R3 pictures) all wait on a `client.ts` `postMultipart` helper.
- Tracker epic: **#51** (closes when #50 fully lands).
