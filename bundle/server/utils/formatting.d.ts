/**
 * Response formatting utilities for Pipedrive MCP Server
 */
/**
 * Formats a currency value with symbol
 */
export declare function formatCurrency(value: number | null | undefined, currency?: string): string;
/**
 * Formats a date string to a readable format
 */
export declare function formatDate(date: string | null | undefined): string;
/**
 * Creates a summary line for a deal
 */
export declare function summarizeDeal(deal: {
    title: string;
    value?: number | null;
    currency?: string;
    stage_id?: number;
    status?: string;
    person_name?: string;
    org_name?: string;
}): string;
/**
 * Creates a summary line for a person
 */
export declare function summarizePerson(person: {
    name: string;
    email?: Array<{
        value: string;
    }> | string;
    phone?: Array<{
        value: string;
    }> | string;
    org_name?: string;
}): string;
/**
 * Creates a summary line for an organization
 */
export declare function summarizeOrganization(org: {
    name: string;
    address?: string | null;
    people_count?: number;
    open_deals_count?: number;
}): string;
/**
 * Creates a summary line for an activity
 */
export declare function summarizeActivity(activity: {
    subject: string;
    type: string;
    due_date?: string | null;
    due_time?: string | null;
    done?: boolean;
    person_name?: string;
    deal_title?: string;
}): string;
/**
 * Creates a list summary (e.g., "Found 25 deals ($1.2M total). 15 more available.")
 */
export declare function createListSummary(entityName: string, count: number, hasMore: boolean, additionalInfo?: string): string;
/**
 * Truncates text to a maximum length with ellipsis
 */
export declare function truncate(text: string | null | undefined, maxLength?: number): string;
//# sourceMappingURL=formatting.d.ts.map