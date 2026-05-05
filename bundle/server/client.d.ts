/**
 * Pipedrive API client wrapper
 * Handles both v1 and v2 API endpoints with proper authentication
 */
import { type ErrorResponse } from "./utils/errors.js";
export type ApiVersion = "v1" | "v2";
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: ErrorResponse;
    additional_data?: {
        pagination?: {
            more_items_in_collection?: boolean;
            next_start?: number;
        };
        next_cursor?: string;
    };
}
/**
 * Pipedrive API client with support for both v1 and v2 endpoints
 */
export declare class PipedriveClient {
    private config;
    private initialized;
    constructor();
    /**
     * Ensures the client is properly configured
     */
    private ensureInitialized;
    /**
     * Gets the base URL for the specified API version
     */
    private getBaseUrl;
    /**
     * Makes a GET request to the Pipedrive API
     */
    get<T>(endpoint: string, params?: URLSearchParams, version?: ApiVersion): Promise<ApiResponse<T>>;
    /**
     * Makes a POST request to the Pipedrive API
     */
    post<T>(endpoint: string, body: Record<string, unknown>, version?: ApiVersion): Promise<ApiResponse<T>>;
    /**
     * Makes a PATCH request to the Pipedrive API
     */
    patch<T>(endpoint: string, body: Record<string, unknown>, version?: ApiVersion): Promise<ApiResponse<T>>;
    /**
     * Makes a PUT request to the Pipedrive API
     */
    put<T>(endpoint: string, body: Record<string, unknown>, version?: ApiVersion): Promise<ApiResponse<T>>;
    /**
     * Makes a DELETE request to the Pipedrive API
     */
    delete<T>(endpoint: string, version?: ApiVersion): Promise<ApiResponse<T>>;
    /**
     * Core request method
     */
    private request;
    /**
     * Test the API connection
     */
    testConnection(): Promise<{
        success: boolean;
        message: string;
    }>;
}
export declare function getClient(): PipedriveClient;
//# sourceMappingURL=client.d.ts.map