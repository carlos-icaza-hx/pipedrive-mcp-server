# Session Handoff: #47 shipped — next is #48, then #49/#50

Last updated: 2026-06-08. Repo: `main` @ `8672fcd` (Zod 4.4 / TypeScript 6 / Vitest 4), single worktree `~/repos/pipedrive-mcp-server`, clean.

## Done this session (do NOT redo)

- **#47 complete v1→v2 migration SHIPPED** via PR **#59** (squash-merged to `main @ 8672fcd`). Build green, **795 tests green** (was 786; +9 guards), CI green Node 20/22. Issue CLOSED (`status:done`). Worktree/branch/lock cleaned up.
  - **Search → v2:** `/itemSearch` → `/{deals,persons,organizations}/search` + cursor pagination; persons dropped `search_by_email`/`search_by_phone` for a single comma-separated `fields`; `org_id` → `organization_id`.
  - **Projects:** `archiveProject` → `POST /projects/{id}/archive` (empty body); `listProjectTasks` → v2 `GET /tasks?project_id=` + cursor.
  - **Fields (finishes #10):** `FIELDS_V2_ENTITY_TYPES` → all six; `getField` collapsed to always-v2 (v1 branch removed). All three v2 field endpoints confirmed in spec; v1 had no `/projectFields` (old path hit a nonexistent endpoint).
  - **Type fix the firewall caught:** v2 search returns `data:{items}` (not a flat array); the build gate failed because `extractPaginationV2` was typed `data:unknown[]`. Widened to `data:unknown` (shape-agnostic; the extractor only reads `additional_data`). Behavior-neutral.
- **Filed #60** (from the #47 review): `getField` matches `.key` but the v2 spec property is `field_code` — pre-existing, affects all six field entities. `bug`/P2/`status:assess`. Verify against the live API (could be P1 if `field_code`-only).

## Next action

Run **#48** through the firewalled pipeline. It is at `status:assess` - **no plan exists yet**, so this STARTS AT THE PLAN STAGE (policy: auto-plan, gate-merge). Re-run `gh issue list --state open` first.

**#48 = v2 param cleanup + tool polish (P2, `area: migration`):** invalid params, leads gaps, mail pagination. Read the issue body for the exact checklist; bind every change to `docs/api/openapi-v2.yaml` (vendored v2). Decide up front whether it is one PR or splits into disjoint-file lanes (confirm footprints before parallelizing).

## Pipeline + gates (per memory [[backlog-orchestration-workflow]])

Per issue: plan(opus, writes+commits plan to `docs/plans/`, posts to issue) -> implement(sonnet, write-only, no build/test/self-review) -> verify(orchestrator runs `npm run build` + `npm test`) -> review(separate `code-reviewer` per diff vs spec; runs the adversarial revert-proof) -> fix(fresh agent if needed) -> one PR (`Closes #N`), squash-merge, **STOP at the merge gate for the user**. Labels: assess -> plan -> implement -> review -> merge -> done. Worktree `.claude/menehune/worktrees/agent-N-slug` off `origin/main`, symlink `node_modules` (no dep changes), branch `agent/N-slug`, lock `.claude/menehune/locks/N.lock`. Denylist before push: `.env*`, `package-lock.json`, `bundle/`, `*.mcpb`, `node_modules`. After merge: `git worktree remove` BEFORE `git branch -D`; `git push origin --delete <branch>` (gh's `--delete-branch` fails to delete the local branch while the worktree holds it, then skips the remote delete - delete the remote branch explicitly). The menehune `/backlog:*` commands are NOT on disk - drive the pipeline directly with the Agent tool (general-purpose for plan/implement/fix, `code-reviewer` for review); the orchestrator runs the verify gate + all git/label/gate ops.

## Known gotchas (carried)

- **Zod 4.4.3 on main** (NOT Zod 3 - older/auto-generated plan bodies may say "Zod 3.25 / do not migrate"; that is STALE). Match existing idioms: `z.email()`, `z.record(z.string(), z.unknown())`, `.extend(...shape)` (not `.merge`). Brief implementers to override any Zod-3 note in the plan.
- **False-green hazard:** `tsconfig` excludes `**/*.test.ts` (tests are never type-checked) and per-entity/functional tests call handlers DIRECTLY (bypass the dispatcher's Zod). A green suite alone does NOT prove correctness. Real guards = UNIT schema tests (`Schema.parse`) + integration tests asserting the wire shape (`JSON.parse(options.body)` / the URL) + `dispatcher.test.ts`. Every plan must flip its false-greens and verify assertions vs `docs/api/openapi-v2.yaml`. Have each reviewer run the adversarial proof (revert `src/` to origin/main with new tests kept -> confirm guards FAIL pre-fix). On #47 this proof failed 22 guard tests on revert (zero false-greens).
- **v2 search/pagination shape:** v2 `/{entity}/search` returns `data:{items:[...]}` + `additional_data.next_cursor` (NOT a flat array like list endpoints). `extractPaginationV2`'s `data` param is now `unknown` (shape-agnostic) - do not re-narrow it.
- `tests/functional/crud-flows.test.ts:82` (persons `email`) + `:160` (orgs string `address`) STILL carry latent v1-shape inputs (direct calls keep them green) - cleanup tracked under **#49**, untouched by #47.
- **#60 (field_code):** the `getField` `.key` vs `field_code` mismatch affects all six field entities - fix once, across all, when #60/#49 is worked.

## After #48

- **#49** infra/test hardening: openapi contract tests (would catch **#60**), client `version` safety, document v1-only-no-v2 capabilities (notes/mail/users CRUD/leads CRUD), **VERIFY the 2026-07-31 sunset date**, crud-flows cleanup (:82/:160) (P2).
- **#50** coverage expansion (Products entity first; deal/project sub-resources; followers; config writes) (P3).
- **#60** getField `field_code` fix (P2, verify severity vs live API).
- Tracker epic: **#51**.
