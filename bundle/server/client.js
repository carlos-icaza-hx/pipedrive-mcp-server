/**
 * Pipedrive API client wrapper
 * Handles both v1 and v2 API endpoints with proper authentication
 */
import { getConfig } from "./config.js";
import { handleApiError, createErrorResponse, formatErrorForMcp } from "./utils/errors.js";
/**
 * Pipedrive API client with support for both v1 and v2 endpoints
 */
export class PipedriveClient {
    config;
    initialized = false;
    constructor() {
        // Defer config loading to first use for better error handling
        this.config = null;
    }
    /**
     * Ensures the client is properly configured
     */
    ensureInitialized() {
        if (!this.initialized) {
            this.config = getConfig();
            this.initialized = true;
        }
    }
    /**
     * Gets the base URL for the specified API version
     */
    getBaseUrl(version) {
        this.ensureInitialized();
        return version === "v1" ? this.config.baseUrlV1 : this.config.baseUrlV2;
    }
    /**
     * Makes a GET request to the Pipedrive API
     */
    async get(endpoint, params, version = "v2") {
        return this.request("GET", endpoint, params, undefined, version);
    }
    /**
     * Makes a POST request to the Pipedrive API
     */
    async post(endpoint, body, version = "v2") {
        return this.request("POST", endpoint, undefined, body, version);
    }
    /**
     * Makes a PATCH request to the Pipedrive API
     */
    async patch(endpoint, body, version = "v2") {
        return this.request("PATCH", endpoint, undefined, body, version);
    }
    /**
     * Makes a PUT request to the Pipedrive API
     */
    async put(endpoint, body, version = "v2") {
        return this.request("PUT", endpoint, undefined, body, version);
    }
    /**
     * Makes a DELETE request to the Pipedrive API
     */
    async delete(endpoint, version = "v2") {
        return this.request("DELETE", endpoint, undefined, undefined, version);
    }
    /**
     * Core request method
     */
    async request(method, endpoint, params, body, version = "v2") {
        this.ensureInitialized();
        const baseUrl = this.getBaseUrl(version);
        const url = new URL(`${baseUrl}${endpoint}`);
        // Add API key as query parameter (Pipedrive's auth method)
        url.searchParams.set("api_token", this.config.apiKey);
        // Add additional query parameters
        if (params) {
            params.forEach((value, key) => {
                url.searchParams.set(key, value);
            });
        }
        const headers = {
            "Accept": "application/json",
        };
        if (body) {
            headers["Content-Type"] = "application/json";
        }
        try {
            // Log to stderr (not stdout) to avoid STDIO protocol corruption
            console.error(`[pipedrive-mcp] ${method} ${endpoint}`);
            const response = await fetch(url.toString(), {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });
            const responseData = await response.json();
            if (!response.ok) {
                return {
                    success: false,
                    error: handleApiError(response.status, responseData),
                };
            }
            // Pipedrive API wraps data differently in v1 vs v2
            // v1: { success: true, data: [...] }
            // v2: { success: true, data: [...] }
            // Both use similar structure but v2 may have different pagination
            return {
                success: true,
                data: responseData.data,
                additional_data: responseData.additional_data,
            };
        }
        catch (error) {
            console.error(`[pipedrive-mcp] Network error: ${error}`);
            return {
                success: false,
                error: createErrorResponse("NETWORK_ERROR", error instanceof Error ? error.message : "Unknown network error", "Check your internet connection and try again"),
            };
        }
    }
    /**
     * Test the API connection
     */
    async testConnection() {
        try {
            // Use the users endpoint as a simple connectivity test
            const response = await this.get("/users/me", undefined, "v1");
            if (response.success) {
                return { success: true, message: "Successfully connected to Pipedrive API" };
            }
            return {
                success: false,
                message: response.error ? formatErrorForMcp(response.error) : "Connection failed",
            };
        }
        catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Connection test failed",
            };
        }
    }
}
// Singleton instance for reuse across tools
let clientInstance = null;
export function getClient() {
    if (!clientInstance) {
        clientInstance = new PipedriveClient();
    }
    return clientInstance;
}
//# sourceMappingURL=client.js.map