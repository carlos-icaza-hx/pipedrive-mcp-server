/**
 * Response formatting utilities for Pipedrive MCP Server
 */

export function createListSummary(
  entityName: string,
  count: number,
  hasMore: boolean,
  additionalInfo?: string
): string {
  const parts = [`Found ${count} ${entityName}${count !== 1 ? "s" : ""}`];

  if (additionalInfo) {
    parts.push(`(${additionalInfo})`);
  }

  if (hasMore) {
    parts.push("More available with cursor pagination.");
  }

  return parts.join(". ") + ".";
}
