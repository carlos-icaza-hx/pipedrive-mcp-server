/**
 * Pagination utilities for Pipedrive API responses
 */
export interface PaginationInfo {
    next_cursor?: string;
    has_more: boolean;
}
export interface PaginatedResponse<T> {
    summary: string;
    data: T[];
    pagination: PaginationInfo;
}
/**
 * Extracts pagination info from Pipedrive v2 API response
 */
export declare function extractPaginationV2(response: {
    additional_data?: {
        next_cursor?: string;
    };
    data?: unknown[];
}): PaginationInfo;
/**
 * Extracts pagination info from Pipedrive v1 API response
 */
export declare function extractPaginationV1(response: {
    additional_data?: {
        pagination?: {
            more_items_in_collection?: boolean;
            next_start?: number;
        };
    };
}): PaginationInfo;
/**
 * Builds pagination query parameters for v2 API
 */
export declare function buildPaginationParamsV2(cursor?: string, limit?: number): URLSearchParams;
/**
 * Builds pagination query parameters for v1 API
 */
export declare function buildPaginationParamsV1(start?: number, limit?: number): URLSearchParams;
//# sourceMappingURL=pagination.d.ts.map