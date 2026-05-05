/**
 * Pagination utilities for Pipedrive API responses
 */
/**
 * Extracts pagination info from Pipedrive v2 API response
 */
export function extractPaginationV2(response) {
    return {
        next_cursor: response.additional_data?.next_cursor,
        has_more: !!response.additional_data?.next_cursor,
    };
}
/**
 * Extracts pagination info from Pipedrive v1 API response
 */
export function extractPaginationV1(response) {
    const pagination = response.additional_data?.pagination;
    return {
        next_cursor: pagination?.next_start?.toString(),
        has_more: pagination?.more_items_in_collection ?? false,
    };
}
/**
 * Builds pagination query parameters for v2 API
 */
export function buildPaginationParamsV2(cursor, limit = 50) {
    const params = new URLSearchParams();
    params.set("limit", String(Math.min(limit, 100)));
    if (cursor) {
        params.set("cursor", cursor);
    }
    return params;
}
/**
 * Builds pagination query parameters for v1 API
 */
export function buildPaginationParamsV1(start, limit = 50) {
    const params = new URLSearchParams();
    params.set("limit", String(Math.min(limit, 500)));
    if (start !== undefined) {
        params.set("start", String(start));
    }
    return params;
}
//# sourceMappingURL=pagination.js.map