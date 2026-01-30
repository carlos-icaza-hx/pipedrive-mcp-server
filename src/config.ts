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
export function getConfig(): Config {
  const apiKey = process.env.PIPEDRIVE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "PIPEDRIVE_API_KEY environment variable is required. " +
      "Get your API key from Pipedrive Settings > Personal preferences > API"
    );
  }

  if (apiKey.length !== 40) {
    throw new Error(
      `Invalid PIPEDRIVE_API_KEY format: expected 40 characters, got ${apiKey.length}. ` +
      "Verify your API key at Pipedrive Settings > Personal preferences > API"
    );
  }

  return {
    apiKey,
    baseUrlV1: "https://api.pipedrive.com/v1",
    baseUrlV2: "https://api.pipedrive.com/api/v2",
  };
}

/**
 * Validates config without throwing - returns validation result
 */
export function validateConfig(): { valid: boolean; error?: string } {
  try {
    getConfig();
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Unknown configuration error",
    };
  }
}
