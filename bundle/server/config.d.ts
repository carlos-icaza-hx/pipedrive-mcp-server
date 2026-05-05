/**
 * Configuration and environment handling for Pipedrive MCP Server
 */
export interface Config {
    apiKey: string;
    baseUrlV1: string;
    baseUrlV2: string;
}
/**
 * Validates and returns the configuration from environment variables
 * @throws Error if required configuration is missing or invalid
 */
export declare function getConfig(): Config;
/**
 * Validates config without throwing - returns validation result
 */
export declare function validateConfig(): {
    valid: boolean;
    error?: string;
};
//# sourceMappingURL=config.d.ts.map