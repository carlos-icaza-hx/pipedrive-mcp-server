## Residual Review Findings

Review run: `20260505-170259-9d037560`
Branch: `refactor/review-residuals-quick-wins`

### Filed

- **P1** `src/utils/errors.ts:90` -- Guard throws via getConfig() instead of returning MCP error when API key missing -- [#23](https://github.com/ckalima/pipedrive-mcp-server/issues/23)
- **P2** `src/index.ts:85` -- index.ts retains 3 inline error blocks not migrated to mcpErrorResult -- [#24](https://github.com/ckalima/pipedrive-mcp-server/issues/24)
- **P2** `tests/unit/utils/errors.test.ts:198,228` -- Strengthen mutation isolation and guard edge case tests -- [#25](https://github.com/ckalima/pipedrive-mcp-server/issues/25)
