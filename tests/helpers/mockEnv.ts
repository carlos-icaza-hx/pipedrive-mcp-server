/**
 * Environment variable mocking utilities
 */

/**
 * Valid 40-character API key for testing
 */
export const VALID_API_KEY = 'a'.repeat(40);

/**
 * Sets up a valid test environment with API key
 */
export function setupValidEnv(): void {
  process.env.PIPEDRIVE_API_KEY = VALID_API_KEY;
}

/**
 * Sets up environment with a specific API key
 */
export function setupEnvWithApiKey(apiKey: string): void {
  process.env.PIPEDRIVE_API_KEY = apiKey;
}

/**
 * Clears the API key from environment
 */
export function clearApiKey(): void {
  delete process.env.PIPEDRIVE_API_KEY;
}

/**
 * Creates a function to restore environment after test
 */
export function withEnv(apiKey: string | undefined, fn: () => void | Promise<void>): () => Promise<void> {
  return async () => {
    const originalKey = process.env.PIPEDRIVE_API_KEY;
    try {
      if (apiKey === undefined) {
        delete process.env.PIPEDRIVE_API_KEY;
      } else {
        process.env.PIPEDRIVE_API_KEY = apiKey;
      }
      await fn();
    } finally {
      if (originalKey === undefined) {
        delete process.env.PIPEDRIVE_API_KEY;
      } else {
        process.env.PIPEDRIVE_API_KEY = originalKey;
      }
    }
  };
}

/**
 * Test API keys with various issues
 */
export const testApiKeys = {
  valid: VALID_API_KEY,
  tooShort: 'abc123',
  tooLong: 'a'.repeat(50),
  empty: '',
};
