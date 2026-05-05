/**
 * Error handling utilities for Pipedrive MCP Server
 */
/**
 * Creates a standardized error response
 */
export function createErrorResponse(code, message, suggestion) {
    return {
        error: {
            code,
            message,
            suggestion,
        },
    };
}
/**
 * Maps HTTP status codes to error responses
 */
export function handleApiError(status, body) {
    const bodyMessage = typeof body === "object" && body !== null && "error" in body
        ? String(body.error)
        : "Unknown error";
    switch (status) {
        case 400:
            return createErrorResponse("VALIDATION_ERROR", `Invalid request: ${bodyMessage}`, "Check your request parameters");
        case 401:
            return createErrorResponse("INVALID_API_KEY", "API key is invalid or expired", "Verify your API key at Pipedrive Settings > Personal preferences > API");
        case 403:
            return createErrorResponse("PERMISSION_DENIED", "Access denied to this resource", "Check your Pipedrive permissions or subscription plan");
        case 404:
            return createErrorResponse("NOT_FOUND", "Resource not found", "Verify the ID exists in your Pipedrive account");
        case 429:
            return createErrorResponse("RATE_LIMITED", "Rate limit exceeded", "Wait 60 seconds before retrying or reduce batch size");
        default:
            return createErrorResponse("API_ERROR", `Pipedrive API error (${status}): ${bodyMessage}`);
    }
}
/**
 * Formats an error for MCP tool response
 */
export function formatErrorForMcp(error) {
    const parts = [
        `Error [${error.error.code}]: ${error.error.message}`,
    ];
    if (error.error.suggestion) {
        parts.push(`Suggestion: ${error.error.suggestion}`);
    }
    return parts.join("\n");
}
//# sourceMappingURL=errors.js.map