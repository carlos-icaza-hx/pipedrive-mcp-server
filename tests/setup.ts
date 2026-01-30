/**
 * Global test setup for Pipedrive MCP Server tests
 */

import { vi, beforeEach, afterEach } from 'vitest';

// Store original environment
const originalEnv = { ...process.env };

// Reset environment before each test
beforeEach(() => {
  // Clear all environment variables that might affect tests
  delete process.env.PIPEDRIVE_API_KEY;

  // Reset all mocks
  vi.clearAllMocks();
});

// Restore original environment after each test
afterEach(() => {
  // Restore original environment
  process.env = { ...originalEnv };

  // Restore all mocks
  vi.restoreAllMocks();
});

// Mock console.error to suppress noise during tests (optional)
// Uncomment if you want quieter test output
// vi.spyOn(console, 'error').mockImplementation(() => {});
