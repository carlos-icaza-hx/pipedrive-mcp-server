# Session Handoff: P0 v1-to-v2 data-shape batch (#42-#46)

Last updated: 2026-06-08. Repo: `main` (Zod 4.4 / TypeScript 6 / Vitest 4), single worktree `~/repos/pipedrive-mcp-server`.

## Next action

Implement the 5 P0 data-shape bugs **#42-#46** off `main` via the firewalled pipeline. Each issue's full plan is posted as a comment on the issue and committed at `docs/plans/2026-06-08-issue-4{2..6}-*.md`. All five are at `status:plan-review`.

Re-run `gh issue list --state open` first in case anything changed.

## Already done (do not redo)

- **#16 deps** DONE (Zod 4 / TS 6 / Vitest 4 / MCP SDK) via PRs #41 + #52.
- **v1-to-v2 review** filed #42-#51 (tracker #51). Findings: `docs/residual-review-findings/v1-v2-migration-completeness-review.md`.
- **OpenAPI specs vendored**: `docs/api/openapi-v{1,2}.yaml` (authoritative source of truth).
- **P0 plan stage** DONE: 5 plans posted to #42-#46 + committed under `docs/plans/`; a Zod-4 correction comment is on each issue; the `review/v1-v2-migration` branch was merged via #53 and deleted.

## Per-issue summary (authoritative detail is in each issue's posted plan)

- **#42 persons** - KEY RENAME `email`->`emails`, `phone`->`phones` (schema fields + tool body + tool `inputSchema` + tests). Schema values are already arrays; this is not a scalar-to-array change. Sole owner of the shared test helpers (`tests/helpers/mockFetch.ts`, `fixtures.ts`) this batch.
- **#43 projects** - scalar `org_id`/`person_id` -> `org_ids`/`person_ids` integer arrays; `labels` -> `label_ids` (schema + tool body + `inputSchema` + tests). Regression from #14.
- **#44 organizations** - `address` string -> object (define a LOCAL `AddressSchema`, 10 optional string subfields, per openapi-v2.yaml 10780-10814). Not in `common.ts`.
- **#45 activities** - `location` string -> object (LOCAL `LocationSchema`, openapi 466-499); `done` send boolean not `1`/`0`; remove `.default(false)`; fix the list-filter serialization. Not in `common.ts`.
- **#46 deals** - remove `all_not_deleted` from `DealStatusSchema` (`common.ts:68`) + both deals `inputSchema` enums + 2 unit tests (`deals.test.ts:51`, `common.test.ts:223`). Handler already omits `status` when undefined (no logic change). Owns `common.ts` this batch.

## Parallel-safe (disjoint footprints)

Each issue touches only its own entity files + its own tests. `#46` owns `common.ts`; `#44`/`#45` define their object schemas locally; `#42` owns the shared test helpers. No issue touches `src/tools/index.ts`.

## False-green test caveat (important)

- `tsconfig` excludes `**/*.test.ts` and Vitest is transpile-only, so tests are never type-checked.
- Per-entity and functional tests call handlers DIRECTLY, bypassing the dispatcher's Zod validation.
- Therefore schema tightenings do NOT fail those tests on their own. The real guards: UNIT schema tests (`Schema.parse`) for Zod shape, integration tests for the handler body wire shape, `dispatcher.test.ts` for the boundary. Each plan flips its unit + integration false-greens; verify assertions against `docs/api/openapi-v2.yaml`, not just a green suite.
- `tests/functional/crud-flows.test.ts` has latent v1-shape inputs (`:82` persons `email`, `:160` orgs string `address`) that stay PASSING post-fix; leave out of scope, track cleanup under #49.

## Pipeline + gates (per [[backlog-orchestration-workflow]])

Per issue, in parallel: fresh worktree off `origin/main` (`.claude/menehune/worktrees/agent-N-slug`, branch `agent/N-slug`, symlink `node_modules` - no dep changes) -> implement (write-only, reads the posted plan, matches Zod 4 idioms: `z.email()`, `z.record(z.string(), z.unknown())`) -> verify (orchestrator runs `npm run build` + `npm test`) -> review (`code-reviewer` per diff vs the spec) -> fix (fresh agent) -> one PR each (`Closes #N`), squash-merge, **stop at each merge gate for the user**. Labels: `plan-review` -> `implement` -> ... -> `done`. Denylist before push: `.env*`, `package-lock.json`, `bundle/`, `*.mcpb`, `node_modules`.

## After P0

#47 complete migration (search/project-tasks/fields to v2, archiveProject), #48 polish, #49 infra/test hardening (OpenAPI contract tests, client version safety, v1-only docs, verify the 2026-07-31 sunset date, crud-flows cleanup), #50 coverage expansion (Products first).
