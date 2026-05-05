/**
 * Error handling utilities for Pipedrive MCP Server
 */
export interface ErrorResponse {
    error: {
        code: string;
        message: string;
        suggestion?: string;
    };
}
export type ErrorCode = "MISSING_API_KEY" | "INVALID_API_KEY" | "VALIDATION_ERROR" | "NOT_FOUND" | "RATE_LIMITED" | "PERMISSION_DENIED" | "API_ERROR" | "NETWORK_ERROR";
/**
 * Creates a standardized error response
 */
export declare function createErrorResponse(code: ErrorCode, message: string, suggestion?: string): ErrorResponse;
/**
 * Maps HTTP status codes to error responses
 */
export declare function handleApiError(status: number, body: unknown): ErrorResponse;
/**
 * Formats an error for MCP tool response
 */
export declare function formatErrorForMcp(error: ErrorResponse): string;
//# sourceMappingURL=errors.d.ts.map