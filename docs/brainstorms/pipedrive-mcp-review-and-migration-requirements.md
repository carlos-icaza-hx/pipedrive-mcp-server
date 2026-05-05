# Pipedrive MCP Server: Review, Migration, and Expansion

**Date:** 2026-05-05
**Status:** Draft

## Problem

The Pipedrive MCP server ships 41 tools and is used by multiple team members. It has never had a formal code review. More urgently, Pipedrive's API v1 has a hard sunset date of **July 31, 2026** (~3 months away). Several server endpoints still call v1 for entities that now have v2 equivalents.

Left unaddressed:
- Pipelines, stages, and fields endpoints will break after July 31, 2026
- The team lacks Leads and Projects coverage, both of which are now in active use
- Dependencies have drifted significantly (MCP SDK, Zod major version, TypeScript major version)
- No linting or project-level AI guidance exists

## Goals

1. **Migrate v1 endpoints to v2** where v2 equivalents exist, before the July 31 sunset
2. **Add Leads and Projects tools** to expand entity coverage
3. **Code review and quality pass** across the entire server
4. **Update dependencies** to current versions

## Success Criteria

- All endpoints with v2 equivalents use v2 (pipelines, stages, fields)
- Auth uses `x-api-token` header for v2 calls (not query param)
- Leads tools: list, get, create, update, delete, search, convert-to-deal
- Projects tools: list, get, create, update, delete, search, archive, list-tasks
- All existing tests pass after migration
- New tools have test coverage matching existing patterns
- Dependencies updated without breaking changes
- ESLint configured and passing

## Non-Goals

- Rewriting the server architecture (current structure is sound)
- Adding products, webhooks, or other entities beyond leads/projects
- Changing the transport layer (STDIO is correct for MCP)
- Migrating notes, mail, or users CRUD to v2 (no v2 equivalents exist yet)

## Tiered Work Breakdown

### Tier 1: Quick Wins (low risk, high value)

- **Add CLAUDE.md** with project context, conventions, and common commands
- **Configure ESLint** with TypeScript rules
- **Update safe dependencies**: dotenv, @types/node, MCP SDK (minor bump 1.25 to 1.29)
- **Audit error handling** for consistency across all tool modules

### Tier 2: Moderate Investment (deadline-driven)

- **Migrate auth mechanism**: move from `?api_token=` query param to `x-api-token` header for v2 calls. The client already routes by version, so this change is localized to `src/client.ts`.
- **Migrate pipelines endpoints to v2**: `GET /api/v2/pipelines`, `GET /api/v2/pipelines/{id}`
- **Migrate stages endpoints to v2**: `GET /api/v2/stages`, `GET /api/v2/stages/{id}`
- **Migrate fields endpoints to v2**: `GET /api/v2/dealFields`, `GET /api/v2/personFields`, `GET /api/v2/organizationFields`. Note: v2 uses `field_code` not `field_id`.
- **Handle v2 breaking changes in responses**: `user_id` renamed to `owner_id`, `active_flag` to `is_deleted` (inverted), custom fields nested under `custom_fields` object, strict boolean types
- **Add Leads tools** (mostly v1): list, list-archived, get, create, update, delete, search (v2), convert-to-deal (v2 async with polling)
- **Add Projects tools** (v2): list, list-archived, get, create, update, delete, search, archive, list-tasks (v1 sub-resource), list-groups (v1 sub-resource)
- **Update Zod schemas** for migrated endpoints to reflect v2 field names and nesting
- **Update and add tests** for all migrated and new tools

### Tier 3: Deep Investment (quality and durability)

- **Major dependency upgrades**: Zod 3 to 4, TypeScript 5 to 6, Vitest 1 to 3. Each may require code changes.
- **Comprehensive code review**: architecture patterns, error handling, type safety, security (API key handling, input validation)
- **Pagination audit**: ensure all list endpoints handle pagination correctly for both v1 (offset) and v2 (cursor) patterns
- **Response normalization layer**: consider whether v1 and v2 responses should be normalized to a consistent shape before returning to the MCP client, so consumers don't need to know which API version backs each tool
- **Rate limiting awareness**: v2 uses 50% fewer rate-limit tokens. Consider adding rate-limit header monitoring/reporting
- **Future-proofing for remaining v1 endpoints**: structure notes, mail, and users code so migration to v2 is mechanical when Pipedrive ships those endpoints

## Key Technical Details

### API Version Split (current state)

| Entity | Current Version | Target Version | v2 Available? |
|--------|----------------|----------------|---------------|
| Deals | v2 | v2 (no change) | Yes |
| Persons | v2 | v2 (no change) | Yes |
| Organizations | v2 | v2 (no change) | Yes |
| Activities | v2 | v2 (no change) | Yes |
| Pipelines | **v1** | **v2** | Yes |
| Stages | **v1** | **v2** | Yes |
| Fields | **v1** | **v2** | Yes (Dec 2025) |
| Notes | v1 | v1 (no change) | No |
| Mail | v1 | v1 (no change) | No |
| Users | v1 | v1 (no change) | Partial |
| Leads | N/A | **v1 + v2** | Mixed |
| Projects | N/A | **v2** | Yes |

### v2 Breaking Changes to Handle

- **Auth**: `?api_token=` query param becomes `x-api-token` header
- **Custom fields**: flat root becomes nested `custom_fields` object
- **Pagination**: offset (`start`/`limit`) becomes cursor (`cursor`/`limit`)
- **Field renames**: `user_id` to `owner_id`, `active_flag` to `is_deleted` (inverted)
- **Booleans**: strict `true`/`false`, no `1`/`0` coercion
- **Timestamps**: RFC 3339 required
- **Update method**: `PUT` becomes `PATCH` for partial updates

### Lead-to-Deal Conversion (async pattern)

The v2 lead conversion endpoint is async:
1. `POST /api/v2/leads/{id}/convert/deal` returns a `conversion_id`
2. Poll `GET /api/v2/leads/{id}/convert/status/{conversion_id}` for status
3. Statuses: `not_started`, `running`, `completed`, `failed`, `rejected`

This is a new pattern for the server and will need specific handling.

## Dependencies and Risks

- **July 31, 2026 deadline** is firm. Tier 2 migration work is not optional.
- **Projects API is in public beta** (announced Oct 2023). Endpoints may change before GA. Worth building but should be flagged as beta-dependent.
- **Zod 4 migration** may require schema rewriting depending on breaking changes. Should be validated before committing.
- **Existing consumers** must not break. v2 response shape changes could affect downstream MCP tool consumers if field names change. Need to decide whether to normalize or document.

## Open Questions

1. Should the server normalize v1 and v2 response shapes to a consistent format, or pass through as-is and let consumers handle version differences?
2. Should the lead-to-deal conversion tool handle polling internally (blocking until complete) or return the conversion ID for the caller to poll?
3. Are there any team-specific custom fields or pipeline configurations that the migration needs to account for?
