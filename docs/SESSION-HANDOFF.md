# Session Handoff: complete the v1-to-v2 migration (#47), then #48-#50

Last updated: 2026-06-08. Repo: `main` @ `f9667ea` (Zod 4.4 / TypeScript 6 / Vitest 4), single worktree `~/repos/pipedrive-mcp-server`, clean.

## Done this session (do NOT redo)

- **P0 data-shape batch #42-#46 SHIPPED** via PRs #54-#58 (squash-merged to `main @ f9667ea`). Build green, **786 tests green**, CI green Node 20/22. Issues CLOSED (`status:done`). All worktrees/branches/locks cleaned up.
  - #42 persons `emails`/`phones` arrays · #43 projects `person_ids`/`org_ids`/`label_ids` · #44 orgs `address` object · #45 activities `location` object + `done` boolean · #46 deals dropped invalid `all_not_deleted`.

## Next action

Run **#47** through the firewalled pipeline. It is at `status:assess` - **no plan exists yet**, so this STARTS AT THE PLAN STAGE (policy: auto-plan, gate-merge). Re-run `gh issue list --state open` first.

**#47 = complete the v1-to-v2 migration (P1, pre-sunset critical):**
- search -> v2 `/{entity}/search` endpoints
- project tasks -> v2 `/tasks`
- product / activity / project fields -> v2 (finishes #10)
- archiveProject -> `POST /archive`

Authoritative spec: `docs/api/openapi-v2.yaml` (vendored v2). Bind every endpoint/shape to it - the P0 batch proved plans must verify against the spec, not memory.

Decide up front whether #47 is one PR or split per sub-area (search / tasks / fields / archive). Likely splittable into disjoint files for parallelism, but confirm footprints before parallelizing.

## Pipeline + gates (per memory [[backlog-orchestration-workflow]])

Per issue: plan(opus, writes+commits plan to `docs/plans/`, posts to issue) -> implement(sonnet, write-only, no build/test/self-review) -> verify(orchestrator runs `npm run build` + `npm test`) -> review(separate `code-reviewer` per diff vs spec) -> fix(fresh agent if needed) -> one PR (`Closes #N`), squash-merge, **STOP at the merge gate for the user**. Labels: assess -> plan -> implement -> review -> merge -> done. Worktree `.claude/menehune/worktrees/agent-N-slug` off `origin/main`, symlink `node_modules` (no dep changes), branch `agent/N-slug`, lock `.claude/menehune/locks/N.lock`. Denylist before push: `.env*`, `package-lock.json`, `bundle/`, `*.mcpb`, `node_modules`. After merge: `git worktree remove` BEFORE `git branch -D`; `git push origin --delete <branch>` (gh's `--delete-branch` fails to delete the local branch while the worktree holds it, and then skips the remote delete - delete the remote branch explicitly).

## Known gotchas (carried from P0)

- **Zod 4.4.3 on main** (NOT Zod 3 - older/auto-generated plan bodies may say "Zod 3.25 / do not migrate"; that is STALE). Match existing idioms: `z.email()`, `z.record(z.string(), z.unknown())`. Do NOT downgrade them. Brief implementers to override any Zod-3 note in the plan.
- **False-green hazard:** `tsconfig` excludes `**/*.test.ts` (tests are never type-checked) and per-entity/functional tests call handlers DIRECTLY (bypass the dispatcher's Zod). A green suite alone does NOT prove correctness. Real guards = UNIT schema tests (`Schema.parse`) + integration tests asserting the wire shape (`JSON.parse(options.body)` / the URL) + `dispatcher.test.ts`. Every plan must flip its false-greens and verify assertions vs `docs/api/openapi-v2.yaml`. Have each reviewer run the adversarial proof (revert src to origin/main with new tests kept -> confirm guards fail pre-fix).
- `tests/functional/crud-flows.test.ts:82` (persons `email`) + `:160` (orgs string `address`) carry latent v1-shape inputs left from P0 - cleanup tracked under **#49**, out of scope for #47.

## After #47

- **#48** param cleanup + leads gaps + mail pagination (P2).
- **#49** infra/test hardening: openapi contract tests, client `version` safety, document v1-only-no-v2 capabilities (notes/mail/users CRUD/leads CRUD), **VERIFY the 2026-07-31 sunset date**, crud-flows cleanup (P2).
- **#50** coverage expansion (Products entity first; deal/project sub-resources; followers; config writes) (P3).
- Tracker epic: **#51**.
